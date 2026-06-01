// Leaflet map rendering and feature helpers.
function initMap() {
    map = L.map("map-container", { worldCopyJump: true }).setView([20, 0], 2);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri",
        maxZoom: 9
    }).addTo(map);
}

async function loadCountriesForRegion(regionId) {
    const data = regionData[regionId];
    if (!data || !data.countries) return { type: "FeatureCollection", features: [] };
    const url = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json";
    try {
        const response = await fetch(url);
        const worldTopo = await response.json();
        const countriesGeo = topojson.feature(worldTopo, worldTopo.objects.countries);
        const filtered = countriesGeo.features.filter(f => data.countries.includes(f.properties.name));
        return { type: "FeatureCollection", features: filtered };
    } catch (error) {
        console.warn("Napaka pri nalaganju drzav", error);
        feedbackDiv.textContent = "Drzave se niso nalozile. Preveri internetno povezavo; fizicne enote so se vedno na karti.";
        return { type: "FeatureCollection", features: [] };
    }
}

function isModernFeature(feat) {
    return Array.isArray(feat.labelPoint) && typeof feat.hitRadiusKm === "number";
}

function categoryStyle(category = "") {
    if (category.includes("reka")) return { color: "#0284c7", fill: "#38bdf8", weight: 4, dashArray: null };
    if (category.includes("morje") || category.includes("jezero") || category.includes("zaliv")) return { color: "#0ea5e9", fill: "#7dd3fc", weight: 2, dashArray: null };
    if (category.includes("tok")) return { color: "#0369a1", fill: "#7dd3fc", weight: 3, dashArray: "8 8" };
    if (category.includes("gor") || category.includes("višav") || category.includes("gora")) return { color: "#92400e", fill: "#d97706", weight: 4, dashArray: "8 6" };
    if (category.includes("pušč")) return { color: "#f59e0b", fill: "#fbbf24", weight: 2, dashArray: null };
    if (category.includes("niž") || category.includes("kotl")) return { color: "#65a30d", fill: "#bef264", weight: 2, dashArray: null };
    if (category.includes("planota") || category.includes("regija")) return { color: "#a16207", fill: "#d6d3d1", weight: 2, dashArray: null };
    return { color: "#64748b", fill: "#cbd5e1", weight: 2, dashArray: null };
}

function baseStyleForFeature(feat) {
    if (isModernFeature(feat)) {
        const style = categoryStyle(feat.category);
        return { color: style.color, weight: style.weight, opacity: 0.95, dashArray: style.dashArray, fillColor: style.fill, fillOpacity: 0.28 };
    }
    const color = feat.color || "#b45309";
    if (feat.type === "LineString") return { color, weight: (feat.weight || 5) + 1, opacity: 0.95 };
    if (feat.type === "Point") return { radius: 10, color, weight: 3, fillColor: color, fillOpacity: 0.9 };
    return { fillColor: color, color: "#78350f", weight: 2, fillOpacity: 0.42 };
}

function coordsToLatLngs(coords) {
    return coords.map(c => [c[1], c[0]]);
}

function ellipseLatLngs(feat, geom) {
    const [lat, lng] = feat.labelPoint;
    const latRadius = geom.latRadius || 2;
    const lngRadius = geom.lngRadius || 2;
    const points = [];
    for (let i = 0; i < 40; i++) {
        const angle = (Math.PI * 2 * i) / 40;
        points.push([lat + Math.sin(angle) * latRadius, lng + Math.cos(angle) * lngRadius]);
    }
    return points;
}

function modernLabelLatLng(feat) {
    return [feat.labelPoint[0], feat.labelPoint[1]];
}

function addArrowHead(latlngs, style) {
    const end = latlngs[latlngs.length - 1];
    const marker = L.circleMarker(end, { radius: 5, color: style.color, fillColor: style.color, fillOpacity: 0.95, weight: 1, interactive: false });
    marker.addTo(map);
    featureLayers.push(marker);
}

function createModernDisplayLayer(feat) {
    const style = categoryStyle(feat.category);
    const geom = feat.displayGeometry;
    if (geom?.type === "LineString" || geom?.type === "ArrowLineString") {
        const latlngs = coordsToLatLngs(geom.coords);
        const line = L.polyline(latlngs, { color: style.color, weight: style.weight, opacity: 0.92, dashArray: style.dashArray, interactive: false });
        if (geom.type === "ArrowLineString") setTimeout(() => addArrowHead(latlngs, style), 0);
        return line;
    }
    if (geom?.type === "Ellipse") {
        return L.polygon(ellipseLatLngs(feat, geom), {
            color: style.color,
            weight: style.weight,
            fillColor: style.fill,
            fillOpacity: 0.24,
            opacity: 0.75,
            interactive: false
        });
    }
    const radius = Math.max(45000, feat.hitRadiusKm * 1000 * 0.65);
    return L.circle(modernLabelLatLng(feat), {
        radius,
        color: style.color,
        weight: style.weight,
        fillColor: style.fill,
        fillOpacity: 0.24,
        opacity: 0.75,
        interactive: false
    });
}

function addModernFeature(feat) {
    const style = categoryStyle(feat.category);
    const name = feat.name;
    const displayLayer = createModernDisplayLayer(feat);
    const label = L.circleMarker(modernLabelLatLng(feat), {
        radius: 5,
        color: "#0f172a",
        weight: 2,
        fillColor: style.fill,
        fillOpacity: 0.95,
        interactive: false
    });
    const hitbox = L.circle(modernLabelLatLng(feat), {
        radius: feat.hitRadiusKm * 1000,
        color: "#000",
        weight: 1,
        opacity: 0,
        fillOpacity: 0,
        interactive: true
    });
    [displayLayer, label].forEach(layer => {
        layer.featureName = name;
        layer.baseFeature = feat;
        layer.addTo(map);
        featureLayers.push(layer);
    });
    hitbox.featureName = name;
    hitbox.baseFeature = feat;
    hitbox.bindTooltip(`${name} (${feat.category})`, { sticky: true, className: "custom-tooltip" });
    hitbox.on("click", () => handleFeatureClick(name));
    hitbox.addTo(map);
    hitboxLayers.push(hitbox);
}

function addPhysicalFeatures(featuresArray) {
    featureLayers.forEach(layer => map.removeLayer(layer));
    hitboxLayers.forEach(layer => map.removeLayer(layer));
    featureLayers = [];
    hitboxLayers = [];
    featuresArray.forEach(feat => {
        if (isModernFeature(feat)) {
            addModernFeature(feat);
            return;
        }
        let layer;
        let hitbox;
        const coords = feat.coords;
        const name = feat.name;
        const icon = feat.icon || "";
        if (feat.type === "Point") layer = L.circleMarker([coords[1], coords[0]], baseStyleForFeature(feat));
        else if (feat.type === "LineString") {
            const latlngs = coords.map(c => [c[1], c[0]]);
            layer = L.polyline(latlngs, baseStyleForFeature(feat));
            hitbox = L.polyline(latlngs, { color: "#000", weight: Math.max(18, (feat.weight || 5) + 12), opacity: 0, interactive: true });
        } else if (feat.type === "Polygon") {
            layer = L.polygon(coords.map(c => [c[1], c[0]]), baseStyleForFeature(feat));
        }
        if (!layer) return;
        layer.featureName = name;
        layer.baseFeature = feat;
        layer.bindTooltip(`${icon} ${name}`, { sticky: true, className: "custom-tooltip" });
        layer.on("click", () => handleFeatureClick(name));
        layer.on("mouseover", () => { if (layer.setStyle) layer.setStyle({ weight: (feat.weight || 4) + 2, color: "#2563eb", fillOpacity: 0.6 }); });
        layer.on("mouseout", () => { if (layer.setStyle) layer.setStyle(baseStyleForFeature(feat)); });
        layer.addTo(map);
        featureLayers.push(layer);
        if (hitbox) {
            hitbox.featureName = name;
            hitbox.bindTooltip(`${icon} ${name}`, { sticky: true, className: "custom-tooltip" });
            hitbox.on("click", () => handleFeatureClick(name));
            hitbox.addTo(map);
            hitboxLayers.push(hitbox);
        }
    });
}

function modernFeaturesForCurrentRegion() {
    return (regionData[currentRegion]?.features || []).filter(isModernFeature);
}

function clearEditMarkers() {
    editMarkers.forEach(marker => map.removeLayer(marker));
    editMarkers = [];
}

function logUpdatedFeatureJson() {
    const json = JSON.stringify(modernFeaturesForCurrentRegion(), null, 2);
    console.log(`Updated feature JSON for ${currentRegion}:`, json);
    return json;
}

function setEditMode(enabled) {
    debugEditMode = enabled;
    clearEditMarkers();
    copyFeaturesBtn.classList.toggle("hidden", !enabled);
    editUnitsBtn.classList.toggle("active", enabled);
    editUnitsBtn.textContent = enabled ? "Zapri urejanje" : "Uredi enote";
    if (!enabled) return;
    modernFeaturesForCurrentRegion().forEach(feat => {
        const marker = L.marker(modernLabelLatLng(feat), {
            draggable: true,
            title: feat.name
        }).addTo(map);
        marker.bindTooltip(`${feat.name} (${feat.category})`, { permanent: false, className: "custom-tooltip" });
        marker.on("dragend", () => {
            const pos = marker.getLatLng();
            feat.labelPoint = [Number(pos.lat.toFixed(4)), Number(pos.lng.toFixed(4))];
            logUpdatedFeatureJson();
            addPhysicalFeatures(regionData[currentRegion].features || []);
            setEditMode(true);
        });
        editMarkers.push(marker);
    });
    console.log("Edit mode active. Drag labelPoint markers, then use Copy updated feature JSON.");
    logUpdatedFeatureJson();
}

async function copyUpdatedFeatureJson() {
    const json = logUpdatedFeatureJson();
    try {
        await navigator.clipboard.writeText(json);
        feedbackDiv.textContent = "Updated feature JSON copied to clipboard.";
    } catch {
        feedbackDiv.textContent = "Clipboard ni na voljo; JSON je izpisan v console.";
    }
}

function findLayerByName(name) {
    const physical = featureLayers.find(layer => layer.featureName === name);
    if (physical) return physical;
    let countryLayer = null;
    if (geoJsonLayer) geoJsonLayer.eachLayer(layer => {
        if (layer.featureName === name) countryLayer = layer;
    });
    return countryLayer;
}

function focusLayer(layer) {
    if (!layer) return;
    if (layer.getBounds) {
        const bounds = layer.getBounds();
        if (bounds && bounds.isValid()) map.fitBounds(bounds.pad(1.4), { maxZoom: 6, animate: true });
    } else if (layer.getLatLng) {
        map.setView(layer.getLatLng(), Math.max(map.getZoom(), 5), { animate: true });
    }
}

function highlightCorrectFeature(name, duration = 1400, focus = false) {
    const layer = findLayerByName(name);
    if (!layer || !layer.setStyle) return;
    if (focus) focusLayer(layer);
    layer.setStyle({ fillColor: "#22c55e", color: "#16a34a", fillOpacity: 0.72, weight: 5 });
    if (layer.bringToFront) layer.bringToFront();
    setTimeout(() => {
        if (layer.baseFeature) layer.setStyle(baseStyleForFeature(layer.baseFeature));
        else if (geoJsonLayer) geoJsonLayer.resetStyle(layer);
    }, duration);
}
