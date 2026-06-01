// Topic cards, exam paper list, and top-level tabs.
function openPaperPath(file) {
    if (typeof gefaExternalPaperUrl === "function") return gefaExternalPaperUrl(file);
    return "gefa%20uprasanja/" + encodeURIComponent(file);
}

function renderTopicFilters(active = "all") {
    const target = document.getElementById("topicFilters");
    if (!target) return;
    target.innerHTML = topicCategories.map(category => `
        <button class="topic-filter mode-btn ${active === category.id ? "active" : ""} px-3 py-2 rounded border border-slate-300 text-sm font-bold bg-white" data-topic="${category.id}">${category.label}</button>
    `).join("");
    document.querySelectorAll(".topic-filter").forEach(btn => btn.addEventListener("click", () => renderStudyTopics(btn.dataset.topic)));
}

function renderStudyTopics(filter = "all") {
    renderTopicFilters(filter);
    const target = document.getElementById("studyTopics");
    if (!target) return;
    const visible = studyTopics.filter(topic => filter === "all" || topic.category === filter);
    target.innerHTML = visible.map(topic => `
        <article class="study-card">
            <div class="flex items-center justify-between gap-2">
                <div class="text-xs uppercase tracking-wider font-black text-blue-700">${topic.tag}</div>
                <div class="text-xs font-black px-2 py-1 rounded bg-slate-100">${topic.source}</div>
            </div>
            <h3 class="text-lg font-black mt-2">${topic.title}</h3>
            <p class="mt-2 text-sm text-slate-700 leading-relaxed">${topic.summary}</p>
            <div class="mt-3 text-xs uppercase tracking-wider font-black text-slate-500">Kaj znati</div>
            <ul class="mt-2 space-y-1 text-sm text-slate-700">
                ${topic.points.map(point => `<li>• ${point}</li>`).join("")}
            </ul>
            <div class="mt-3 text-sm bg-amber-50 border border-amber-200 rounded p-2"><strong>Matura:</strong> ${topic.exam}</div>
            <div class="mt-2 text-sm bg-blue-50 border border-blue-200 rounded p-2"><strong>Vaja:</strong> ${topic.map}</div>
        </article>
    `).join("");
}

function renderExamPapers(filter = "all") {
    const target = document.getElementById("paperList");
    if (!target) return;
    const visible = examPapers.filter(paper => filter === "all" || paper.type === filter);
    const typeLabel = { world: "Svet/Evropa", slovenia: "Slovenija", answers: "Resitve" };
    const done = JSON.parse(localStorage.getItem("gefaDonePapers") || "[]");
    target.innerHTML = visible.map(paper => `
        <article class="paper-card ${paper.type} ${done.includes(paper.file) ? "bg-green-50" : ""}">
            <div class="flex items-center justify-between gap-2">
                <div class="text-xs uppercase tracking-wider font-black text-slate-500">${paper.year} · ${paper.term}</div>
                <div class="text-xs font-black px-2 py-1 rounded bg-slate-100">${done.includes(paper.file) ? "Reseno" : typeLabel[paper.type]}</div>
            </div>
            <h3 class="font-black mt-2">${paper.title}</h3>
            <div class="text-xs text-slate-500 mt-1">${paper.file}</div>
            <div class="mt-3 flex gap-2">
                <a class="px-3 py-2 rounded bg-slate-900 text-white text-sm font-bold" href="${openPaperPath(paper.file)}" target="_blank">Odpri PDF</a>
                ${paper.type !== "answers" && matchingAnswer(paper) ? `<a class="px-3 py-2 rounded bg-purple-700 text-white text-sm font-bold" href="${openPaperPath(matchingAnswer(paper).file)}" target="_blank">Resitve</a>` : ""}
                <button class="px-3 py-2 rounded border border-slate-300 bg-white text-sm font-bold" onclick="markPaperDone('${paper.file}')">Oznaci</button>
            </div>
        </article>
    `).join("");
}

function matchingAnswer(paper) {
    return examPapers.find(candidate => candidate.type === "answers" && candidate.year === paper.year && candidate.term === paper.term)
        || examPapers.find(candidate => candidate.type === "answers" && candidate.year === paper.year && candidate.term.includes(paper.term.split(" ")[0]));
}

function markPaperDone(file) {
    const done = JSON.parse(localStorage.getItem("gefaDonePapers") || "[]");
    if (!done.includes(file)) done.push(file);
    localStorage.setItem("gefaDonePapers", JSON.stringify(done));
    if (typeof feedbackDiv !== "undefined") feedbackDiv.textContent = "Oznaceno kot reseno: " + file;
    renderExamPapers(document.querySelector(".paper-filter.active")?.dataset.filter || "all");
}

function switchTab(tabName) {
    document.querySelectorAll(".top-tab").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tabName));
    document.querySelectorAll(".view-screen").forEach(screen => screen.classList.toggle("hidden", screen.dataset.view !== tabName));
    if (tabName === "map" && typeof map !== "undefined" && map) setTimeout(() => map.invalidateSize(), 80);
}
