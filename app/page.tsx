"use client";

export default function Home() {
  const cases = [
    { id: "001", modelo: "HB20", tipo: "Roubo", local: "Itaquera → Poá" },
    { id: "002", modelo: "Onix", tipo: "Furto", local: "Santo Amaro → Capão" },
    { id: "003", modelo: "Argo", tipo: "Roubo", local: "São Mateus → Suzano" },
  ];

  return (
    <div style={{ padding: 20, background: "#0b1220", minHeight: "100vh", color: "white" }}>
      <h1 style={{ marginBottom: 20 }}>🚔 Mapa de Inteligência</h1>

      <div style={{ display: "grid", gap: 12 }}>
        {cases.map((c) => (
          <div
            key={c.id}
            style={{
              background: "#111827",
              padding: 15,
              borderRadius: 10,
              border: "1px solid #1f2937",
            }}
          >
            <strong>CASO {c.id}</strong>
            <div>{c.modelo} • {c.tipo}</div>
            <div style={{ color: "#9ca3af" }}>{c.local}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
