"use client";

export default function Home() {
  return (
    <div style={{ height: "100vh", background: "#0b1220" }}>
      <h2 style={{ color: "white", padding: 10 }}>
        Mapa Inteligência (Seu Mapa Real)
      </h2>

      <iframe
        src="https://www.google.com/maps/d/embed?mid=1hIr4nwyACFmscQKrAmJZcaLBELN8Tzs"
        width="100%"
        height="90%"
        style={{ border: 0, borderRadius: 12 }}
      ></iframe>
    </div>
  );
}