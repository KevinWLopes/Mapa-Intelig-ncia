"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      const L = (window as any).L;

      const map = L.map("map").setView([-23.5505, -46.6333], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      const perda = [-23.5505, -46.6333];
      const recuperacao = [-23.5400, -46.6000];
      const descarte = [-23.5600, -46.5800];

      L.marker(perda).addTo(map).bindPopup("🔵 Perda");
      L.marker(recuperacao).addTo(map).bindPopup("🟢 Recuperação");
      L.marker(descarte).addTo(map).bindPopup("🟡 Descarte");

      L.polyline([perda, recuperacao], { color: "blue" }).addTo(map);
      L.polyline([descarte, recuperacao], { color: "yellow" }).addTo(map);
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ height: "100vh", background: "#0b1220" }}>
      <h2 style={{ color: "white", padding: 10 }}>
        Mapa Inteligência (Real)
      </h2>

      <div
        id="map"
        style={{
          height: "90%",
          margin: 10,
          borderRadius: 12,
        }}
      ></div>

      {/* CSS do Leaflet */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
    </div>
  );
}