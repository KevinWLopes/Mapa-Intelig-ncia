"use client";

import { useState } from "react";

const cases = [
  {
    id: "001",
    modelo: "HB20",
    tipo: "Roubo",
    perda: "Itaquera",
    recuperacao: "Poá",
    eixo: "Leste",
    risco: "Alto",
  },
  {
    id: "002",
    modelo: "Onix",
    tipo: "Furto",
    perda: "Santo Amaro",
    recuperacao: "Capão Redondo",
    eixo: "Sul",
    risco: "Médio",
  },
  {
    id: "003",
    modelo: "Argo",
    tipo: "Roubo",
    perda: "São Mateus",
    recuperacao: "Suzano",
    eixo: "Leste",
    risco: "Alto",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredCases = cases.filter((item) =>
    `${item.id} ${item.modelo} ${item.perda} ${item.recuperacao}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09131b",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 20,
          minHeight: "100vh",
        }}
      >
        <aside
          style={{
            background: "#071018",
            border: "1px solid #1e293b",
            borderRadius: 18,
            padding: 20,
          }}
        >
          <h1 style={{ fontSize: 26, marginBottom: 10 }}>
            Painel Operacional
          </h1>

          {/* 🔍 BUSCA */}
          <Card>
            <SmallLabel>Busca</SmallLabel>
            <input
              placeholder="Buscar caso, modelo, bairro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #334155",
                background: "#020617",
                color: "white",
              }}
            />
          </Card>

          {/* 📋 CASOS */}
          <Card>
            <SmallLabel>Casos</SmallLabel>

            <div style={{ display: "grid", gap: 10 }}>
              {filteredCases.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: 12,
                    padding: 12,
                  }}
                >
                  <strong>CASO {item.id}</strong>

                  <div style={{ fontSize: 13, marginTop: 5 }}>
                    {item.modelo} • {item.tipo}
                  </div>

                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {item.perda} → {item.recuperacao}
                  </div>
                </div>
              ))}

              {filteredCases.length === 0 && (
                <div style={{ color: "#94a3b8", fontSize: 12 }}>
                  Nenhum resultado encontrado
                </div>
              )}
            </div>
          </Card>
        </aside>

        <main
          style={{
            background: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1hIr4nwyACFmscQKrAmJZcaLBELN8Tzs"
            width="100%"
            height="100%"
            style={{ border: 0 }}
          />
        </main>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function SmallLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>{children}</div>;
}