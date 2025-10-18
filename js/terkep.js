const mapsData = [
    { id: "map1", coords: [-3.4653, -62.2159], title: "Amazonas esőerdő", info: "A világ legnagyobb trópusi esőerdeje Dél-Amerikában." },
    { id: "map2", coords: [-1.4419, 15.5560], title: "Kongó-medence", info: "Afrika legnagyobb esőerdeje, a Föld tüdeje." },
    { id: "map3", coords: [2.5, 112.5], title: "Délkelet-Ázsia esőerdei", info: "Malajzia és Indonézia őserdei elképesztő élővilággal." }
];

const popupContent = document.getElementById("popup-content");
const popupClose = document.getElementById("popup-close");

function initMap() {
    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
    });

    mapsData.forEach(({ id, coords, title, info }) => {
        const map = L.map(id).setView(coords, 4);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        }).addTo(map);

        const popup = document.createElement("div");
        popup.id = "custom-popup";
        popup.className = "animate__animated";
        popup.innerHTML = `<button id="popup-close">✖</button><div id="popup-content"></div>`;
        map.getContainer().appendChild(popup);

        const popupContentLocal = popup.querySelector("#popup-content");
        const popupCloseLocal = popup.querySelector("#popup-close");

        const marker = L.marker(coords, { icon: greenIcon }).addTo(map);

        function updatePopupPosition() {
            if (popup.style.display === "block") {
                const mapPos = map.latLngToContainerPoint(coords);
                popup.style.left = (mapPos.x + 20) + "px";
                popup.style.top = (mapPos.y - 20) + "px";
            }
        }

        marker.on('click', () => {
            map.flyTo(coords, 7, { duration: 1.5 });

            popupContentLocal.innerHTML = `<b>${title}</b><br>${info}`;
            popup.classList.remove("animate__fadeOut");
            popup.classList.add("animate__zoomIn");
            popup.style.display = "block";

            updatePopupPosition();
        });

        popupCloseLocal.addEventListener("click", () => {
            popup.classList.remove("animate__zoomIn");
            popup.classList.add("animate__fadeOut");
            popup.addEventListener("animationend", () => {
                popup.style.display = "none";
            }, { once: true });
        });

        window.addEventListener("resize", updatePopupPosition);
    });

}

document.addEventListener("DOMContentLoaded", initMap);