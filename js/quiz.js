// Quiz state, search, saved progress, and app bootstrap.
let map;
let currentRegion = "asia";
let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let attempts = 0;
let currentTargetName = "";
let canAnswer = true;
let gameFinished = false;
let geoJsonLayer = null;
let featureLayers = [];
let hitboxLayers = [];
let appMode = "quiz";
let allCurrentNames = [];
let debugEditMode = false;
let editMarkers = [];

const targetSpan = document.getElementById("currentTarget");
const modeLabel = document.getElementById("modeLabel");
const scoreSpan = document.getElementById("scoreCount");
const attemptsSpan = document.getElementById("attemptsCount");
const remainingSpan = document.getElementById("remainingCount");
const feedbackDiv = document.getElementById("feedbackMsg");
const resetBtn = document.getElementById("resetGameBtn");
const regionListDiv = document.getElementById("region-list");
const learnModeBtn = document.getElementById("learnModeBtn");
const quizModeBtn = document.getElementById("quizModeBtn");
const mistakesModeBtn = document.getElementById("mistakesModeBtn");
const clearMistakesBtn = document.getElementById("clearMistakesBtn");
const editUnitsBtn = document.getElementById("editUnitsBtn");
const copyFeaturesBtn = document.getElementById("copyFeaturesBtn");
const skipBtn = document.getElementById("skipBtn");
const hintBtn = document.getElementById("hintBtn");
const questionListDiv = document.getElementById("questionList");
const progressBar = document.getElementById("progressBar");
const regionTitle = document.getElementById("regionTitle");
const regionMeta = document.getElementById("regionMeta");
const unitSearch = document.getElementById("unitSearch");
const searchResults = document.getElementById("searchResults");
const globalSearch = document.getElementById("globalSearch");
const globalSearchResults = document.getElementById("globalSearchResults");

function progressKey(regionId = currentRegion) { return `gefaProgress:${regionId}`; }
function mistakesKey(regionId = currentRegion) { return `gefaMistakes:${regionId}`; }
function readJson(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
}
function getMistakes(regionId = currentRegion) { return readJson(mistakesKey(regionId), []); }
function setMistakes(items, regionId = currentRegion) { localStorage.setItem(mistakesKey(regionId), JSON.stringify([...new Set(items)])); }
function recordMistake(name) { setMistakes([...getMistakes(), name]); }
function removeMistake(name) { setMistakes(getMistakes().filter(item => item !== name)); }
function saveProgress() {
    if (appMode !== "quiz") return;
    localStorage.setItem(progressKey(), JSON.stringify({ currentQuestions, currentIndex, score, attempts, gameFinished }));
}
function clearProgress(regionId = currentRegion) { localStorage.removeItem(progressKey(regionId)); }
function restoreProgress(regionId) {
    const saved = readJson(progressKey(regionId), null);
    if (!saved || !Array.isArray(saved.currentQuestions) || saved.currentQuestions.length === 0) return false;
    currentQuestions = saved.currentQuestions.filter(name => allCurrentNames.includes(name));
    if (currentQuestions.length === 0) return false;
    currentIndex = Math.min(saved.currentIndex || 0, currentQuestions.length);
    score = saved.score || 0;
    attempts = saved.attempts || 0;
    gameFinished = !!saved.gameFinished || currentIndex >= currentQuestions.length;
    canAnswer = true;
    if (gameFinished) {
        targetSpan.textContent = "Konec kviza";
        feedbackDiv.textContent = "Shranjeni kviz je zakljucen. Za novo rundo klikni Nova igra.";
    } else loadNextQuestion();
    return true;
}

function allUnitsForRegion(regionId) {
    const data = regionData[regionId];
    if (!data) return [];
    const countries = (data.countries || []).map(country => data.translations?.[country] || country);
    const features = (data.features || []).map(feature => feature.name);
    return [...countries, ...features];
}
function allSearchUnits() {
    return regions.flatMap(region => allUnitsForRegion(region.id).map(name => ({ name, regionId: region.id, regionName: region.name })));
}
function renderSearchResults(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        searchResults.classList.add("hidden");
        searchResults.innerHTML = "";
        return;
    }
    const matches = allSearchUnits().filter(item => item.name.toLowerCase().includes(q)).slice(0, 18);
    if (matches.length === 0) {
        searchResults.innerHTML = `<div class="p-3 text-sm text-slate-500">Ni zadetkov.</div>`;
        searchResults.classList.remove("hidden");
        return;
    }
    searchResults.innerHTML = matches.map(item => `
        <button class="search-result" data-region="${item.regionId}" data-name="${item.name}">
            <div class="font-black text-sm">${item.name}</div>
            <div class="text-xs text-slate-500">${item.regionName}</div>
        </button>
    `).join("");
    searchResults.classList.remove("hidden");
    document.querySelectorAll(".search-result").forEach(btn => btn.addEventListener("click", async () => {
        searchResults.classList.add("hidden");
        unitSearch.value = btn.dataset.name;
        if (btn.dataset.region !== currentRegion) await loadRegion(btn.dataset.region, { restore: true });
        highlightCorrectFeature(btn.dataset.name, 1800, true);
        feedbackDiv.textContent = "Najdeno: " + btn.dataset.name;
    }));
}

function regionCount(regionId) {
    return allUnitsForRegion(regionId).length;
}
function buildSidebar() {
    regionListDiv.innerHTML = "";
    regions.forEach(reg => {
        const mistakeCount = getMistakes(reg.id).length;
        const btn = document.createElement("div");
        btn.className = `sidebar-item px-4 py-3 text-sm font-bold text-slate-700 ${currentRegion === reg.id ? "sidebar-active" : ""}`;
        btn.innerHTML = `<div class="flex items-center justify-between gap-3"><span>${reg.name}</span><span class="text-xs font-black text-slate-400">${regionCount(reg.id)}${mistakeCount ? ` · ${mistakeCount} napak` : ""}</span></div>`;
        btn.onclick = () => loadRegion(reg.id, { restore: true });
        regionListDiv.appendChild(btn);
    });
}

function handleFeatureClick(clickedName) {
    if (appMode === "learn") {
        targetSpan.textContent = clickedName;
        feedbackDiv.textContent = "To je: " + clickedName;
        highlightCorrectFeature(clickedName, 1200);
        return;
    }
    if (gameFinished || !canAnswer) return;
    attempts++;
    if (clickedName === currentTargetName) {
        score++;
        if (appMode === "mistakes") removeMistake(clickedName);
        feedbackDiv.textContent = appMode === "mistakes" ? "Pravilno. Enota je odstranjena iz napak." : "Pravilno. Nadaljujem na naslednje vprasanje.";
        canAnswer = false;
        highlightCorrectFeature(clickedName, 900);
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= currentQuestions.length) finishQuiz();
            else loadNextQuestion();
            updateUI();
            renderQuestionList();
            buildSidebar();
            saveProgress();
            canAnswer = true;
        }, 350);
    } else {
        recordMistake(currentTargetName);
        feedbackDiv.textContent = `Napacno. Kliknil si: ${clickedName}. Shranujem za vajo napak.`;
    }
    updateUI();
    renderQuestionList();
    buildSidebar();
    saveProgress();
}
function finishQuiz() {
    gameFinished = true;
    currentTargetName = "";
    targetSpan.textContent = "Konec kviza";
    feedbackDiv.textContent = `Rezultat: ${score} / ${currentQuestions.length} (${Math.round(score / currentQuestions.length * 100)}%).`;
}
function loadNextQuestion() {
    currentTargetName = currentQuestions[currentIndex] || "";
    targetSpan.textContent = currentTargetName || "Ni vprasanj";
    feedbackDiv.textContent = currentTargetName ? "Poisci in klikni pravilno enoto na karti." : "Za ta nacin ni podatkov.";
}
function updateUI() {
    scoreSpan.textContent = score;
    attemptsSpan.textContent = attempts;
    const remaining = appMode === "learn" ? allCurrentNames.length : Math.max(currentQuestions.length - currentIndex, 0);
    remainingSpan.textContent = remaining;
    const done = currentQuestions.length ? Math.min(currentIndex, currentQuestions.length) : 0;
    progressBar.style.width = currentQuestions.length ? Math.round(done / currentQuestions.length * 100) + "%" : "0%";
    modeLabel.textContent = appMode === "quiz" ? "Kviz" : appMode === "mistakes" ? "Vaja napak" : "Ucenje";
    learnModeBtn.classList.toggle("active", appMode === "learn");
    quizModeBtn.classList.toggle("active", appMode === "quiz");
    mistakesModeBtn.classList.toggle("active", appMode === "mistakes");
    hintBtn.disabled = appMode === "learn" || gameFinished;
    skipBtn.disabled = appMode === "learn" || gameFinished;
    hintBtn.classList.toggle("opacity-40", hintBtn.disabled);
    skipBtn.classList.toggle("opacity-40", skipBtn.disabled);
}
function renderQuestionList() {
    questionListDiv.innerHTML = "";
    const mistakes = getMistakes();
    const names = appMode === "learn" ? allCurrentNames : currentQuestions;
    names.forEach((name, index) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "question-chip";
        if (mistakes.includes(name)) chip.classList.add("mistake");
        if (appMode !== "learn" && index < currentIndex) chip.classList.add("done");
        if (appMode !== "learn" && index === currentIndex && !gameFinished) chip.classList.add("current");
        chip.textContent = name;
        chip.onclick = () => {
            targetSpan.textContent = name;
            feedbackDiv.textContent = appMode === "learn" ? "Izbrano iz seznama: " + name : "Namig iz seznama: " + name;
            highlightCorrectFeature(name, 1600, true);
        };
        questionListDiv.appendChild(chip);
    });
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function startNewQuiz() {
    appMode = "quiz";
    clearProgress();
    currentQuestions = shuffleArray([...allCurrentNames]);
    currentIndex = 0;
    score = 0;
    attempts = 0;
    gameFinished = false;
    canAnswer = true;
    loadNextQuestion();
    updateUI();
    renderQuestionList();
    saveProgress();
}
function setMode(mode) {
    appMode = mode;
    if (mode === "learn") {
        targetSpan.textContent = "Klikni katerokoli enoto";
        feedbackDiv.textContent = "Ucni nacin: karta ti pove ime kliknjene enote.";
        updateUI();
        renderQuestionList();
        return;
    }
    if (mode === "mistakes") {
        const mistakes = getMistakes().filter(name => allCurrentNames.includes(name));
        if (mistakes.length === 0) {
            feedbackDiv.textContent = "Za to regijo se ni shranjenih napak.";
            appMode = "quiz";
            updateUI();
            renderQuestionList();
            return;
        }
        currentQuestions = shuffleArray([...mistakes]);
        currentIndex = 0;
        score = 0;
        attempts = 0;
        gameFinished = false;
        canAnswer = true;
        loadNextQuestion();
        updateUI();
        renderQuestionList();
        return;
    }
    appMode = "quiz";
    if (!restoreProgress(currentRegion)) startNewQuiz();
    updateUI();
    renderQuestionList();
}

async function loadRegion(regionId, options = { restore: true }) {
    currentRegion = regionId;
    buildSidebar();
    const data = regionData[regionId];
    if (!data) return;
    document.getElementById("status-indicator").textContent = data.name + " - nalagam";
    let allNames = [];
    const countriesGeo = await loadCountriesForRegion(regionId);
    if (geoJsonLayer) map.removeLayer(geoJsonLayer);
    geoJsonLayer = L.geoJSON(countriesGeo, {
        style: { fillColor: "#22c55e", color: "#14532d", weight: 1.8, fillOpacity: 0.34 },
        onEachFeature: (feat, layer) => {
            const engName = feat.properties.name;
            const sloName = data.translations[engName] || engName;
            layer.bindTooltip(sloName, { sticky: true, className: "custom-tooltip" });
            layer.featureName = sloName;
            layer.on("click", () => handleFeatureClick(sloName));
            layer.on("mouseover", () => layer.setStyle({ fillOpacity: 0.68, weight: 2.8 }));
            layer.on("mouseout", () => geoJsonLayer.resetStyle(layer));
            allNames.push(sloName);
        }
    }).addTo(map);
    if (data.features) {
        allNames.push(...data.features.map(f => f.name));
        addPhysicalFeatures(data.features);
    }
    allCurrentNames = allNames;
    regionTitle.textContent = data.name;
    regionMeta.textContent = `${(data.countries || []).length} drzav + ${(data.features || []).length} fizicnih enot = ${allNames.length} vprasanj · ${getMistakes(regionId).length} napak`;
    map.setView(data.center, data.zoom);
    document.getElementById("status-indicator").textContent = data.name + " - pripravljeno";
    if (appMode === "learn") setMode("learn");
    else if (appMode === "mistakes") setMode("mistakes");
    else if (options.restore && restoreProgress(regionId)) {
        appMode = "quiz";
        feedbackDiv.textContent = gameFinished ? "Shranjeni kviz je zakljucen. Za novo rundo klikni Nova igra." : "Nadaljujes shranjeni kviz za to regijo.";
    } else startNewQuiz();
    updateUI();
    renderQuestionList();
    buildSidebar();
    if (debugEditMode) setEditMode(true);
}

resetBtn.addEventListener("click", () => startNewQuiz());
learnModeBtn.addEventListener("click", () => setMode("learn"));
quizModeBtn.addEventListener("click", () => setMode("quiz"));
mistakesModeBtn.addEventListener("click", () => setMode("mistakes"));
clearMistakesBtn.addEventListener("click", () => {
    setMistakes([]);
    feedbackDiv.textContent = "Napake za trenutno regijo so pociscene.";
    buildSidebar();
    updateUI();
    renderQuestionList();
});
editUnitsBtn.addEventListener("click", () => setEditMode(!debugEditMode));
copyFeaturesBtn.addEventListener("click", () => copyUpdatedFeatureJson());
skipBtn.addEventListener("click", () => {
    if (appMode === "learn" || gameFinished) return;
    currentIndex++;
    if (currentIndex >= currentQuestions.length) finishQuiz();
    else loadNextQuestion();
    updateUI();
    renderQuestionList();
    saveProgress();
});
hintBtn.addEventListener("click", () => {
    if (appMode === "learn" || !currentTargetName) return;
    feedbackDiv.textContent = "Namig: pravilna enota je za kratek cas oznacena zeleno.";
    highlightCorrectFeature(currentTargetName, 1800, true);
});
unitSearch.addEventListener("input", () => renderSearchResults(unitSearch.value));
globalSearch.addEventListener("input", () => renderGlobalSearch(globalSearch.value));
document.addEventListener("click", event => {
    if (!event.target.closest("#unitSearch") && !event.target.closest("#searchResults")) searchResults.classList.add("hidden");
    if (!event.target.closest("#globalSearch") && !event.target.closest("#globalSearchResults")) globalSearchResults.classList.add("hidden");
});
document.querySelectorAll(".top-tab").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
document.querySelectorAll(".paper-filter").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".paper-filter").forEach(other => other.classList.remove("active"));
    btn.classList.add("active");
    renderExamPapers(btn.dataset.filter);
}));

renderStudyTopics();
renderExamPapers();
renderNotes();
initMap();
buildSidebar();
loadRegion("asia", { restore: true });
