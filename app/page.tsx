"use client";

import React from "react";

export default function Home() {
  const cases = [
    {
      id: "CASO-001",
      modelo: "HB20",
      tipo: "Roubo",
      perda: "Itaquera",
      recuperacao: "Poá",
      status: "Recuperado",
      eixo: "Leste",
    },
    {
      id: "CASO-002",
      modelo: "Onix",
      tipo: "Furto",
      perda: "Santo Amaro",
      recuperacao: "Capão Redondo",
      status: "Recuperado",
      eixo: "Sul",
    },
    {
      id: "CASO-003",
      modelo: "Argo",
      tipo: "Roubo",
      perda: "São Mateus",
      recuperacao: "Suzano",
      status: "Recuperado",
      eixo: "Leste",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09131b",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          minHeight: "100vh",
        }}
      >
        <aside
          style={{
            borderRight: "1px solid #1e293b",
            padding: 20,
            background: "#071018",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 12,
                color: "#22d3ee",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Mapa de Inteligência
            </div>
            <h1 style={{ margin: "10px 0 8px 0", fontSize: 28 }}>
              Painel Operacional
            </h1>
            <div style={{ color: "#94a3b8", fontSize: 14 }}>
              Correlação entre perda, recuperação e eixo de recorrência.
            </div>
          </div>

          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 14,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
              Busca rápida
            </div>
            <input
              placeholder="Caso, modelo, bairro..."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 10,
                border: "1px solid #334155",
                background: "#020617",
                color: "white",
              }}
            />
          </div>

          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 14,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
              Filtros
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <select style={selectStyle} defaultValue="Todos">
                <option>Todos</option>
                <option>HB20</option>
                <option>Onix</option>
                <option>Argo</option>
              </select>
              <select style={selectStyle} defaultValue="Todas as ocorrências">
                <option>Todas as ocorrências</option>
                <option>Roubo</option>
                <option>Furto</option>
              </select>
              <select style={selectStyle} defaultValue="Todos os eixos">
                <option>Todos os eixos</option>
                <option>Leste</option>
                <option>Sul</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <StatCard label="Casos" value="03" color="#22d3ee" />
            <StatCard label="Recuperados" value="03" color="#34d399" />
            <StatCard label="Eixo mais recorrente" value="Leste" color="#facc15" />
          </div>
        </aside>

        <main style={{ padding: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.9fr",
              gap: 20,
            }}
          >
            <section
              style={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 20,
                minHeight: 620,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderBottom: "1px solid #1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Mapa tático</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>
                    Protótipo visual da próxima versão do sistema.
                  </div>
                </div>
                <div style={{ color: "#22d3ee", fontSize: 13 }}>
                  Perda x Recuperação
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  height: 560,
                  background: "linear-gradient(180deg, #0b1220 0%, #0a1622 100%)",
                }}
              >
                <GridBackground />

                <PathLine x1="22%" y1="34%" x2="48%" y2="52%" color="#22d3ee" />
                <PathLine x1="48%" y1="52%" x2="61%" y2="42%" color="#facc15" />
                <PathLine x1="30%" y1="58%" x2="70%" y2="30%" color="#64748b" />

                <Point x="22%" y="34%" label="Perda" color="#22d3ee" />
                <Point x="48%" y="52%" label="Recup." color="#34d399" />
                <Point x="61%" y="42%" label="Descarte" color="#facc15" />
                <Point x="30%" y="58%" label="Perda" color="#22d3ee" />
                <Point x="70%" y="30%" label="Recup." color="#34d399" />

                <Area
                  left="55%"
                  top="20%"
                  width="24%"
                  height="30%"
                  color="rgba(239,68,68,0.18)"
                  border="#ef4444"
                  title="Área sensível"
                />
                <Area
                  left="24%"
                  top="46%"
                  width="22%"
                  height="20%"
                  color="rgba(245,158,11,0.16)"
                  border="#f59e0b"
                  title="Destino recorrente"
                />

                <div
                  style={{
                    position: "absolute",
                    left: 16,
                    top: 16,
                    background: "rgba(2,6,23,0.9)",
                    border: "1px solid #334155",
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 12,
                    lineHeight: 1.8,
                  }}
                >
                  <div style={{ color: "#22d3ee", fontWeight: 700 }}>Legenda</div>
                  <div>🔵 Perda</div>
                  <div>🟢 Recuperação</div>
                  <div>🟡 Descarte</div>
                  <div>🔴 Área sensível</div>
                </div>
              </div>
            </section>

            <section style={{ display: "grid", gap: 20 }}>
              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: 20,
                  padding: 18,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  Leitura automática
                </div>
                <div style={{ color: "#cbd5e1", lineHeight: 1.7, fontSize: 14 }}>
                  Foram identificados 3 casos no painel, com predominância do eixo
                  Leste e recorrência de recuperação em áreas periféricas. O padrão
                  sugere correlação territorial entre perda do contato e destino final.
                </div>
              </div>

              <div
                style={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: 20,
                  padding: 18,
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
                  Casos recentes
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                  {cases.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#020617",
                        border: "1px solid #1e293b",
                        borderRadius: 14,
                        padding: 14,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <strong>{item.id}</strong>
                        <span style={{ color: "#22d3ee" }}>{item.eixo}</span>
                      </div>
                      <div style={{ fontSize: 14, color: "#cbd5e1" }}>
                        {item.modelo} • {item.tipo}
                      </div>
                      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
                        {item.perda} → {item.recuperacao}
                      </div>
                      <div style={{ fontSize: 12, color: "#34d399", marginTop: 8 }}>
                        {item.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 14,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color }}>{value}</div>
    </div>
  );
}

function GridBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "36px 36px",
      }}
    />
  );
}

function PathLine({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  color: string;
}) {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray="8 8"
      />
    </svg>
  );
}

function Point({
  x,
  y,
  label,
  color,
}: {
  x: string;
  y: string;
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: color,
          boxShadow: 0 0 18px ${color},
          margin: "0 auto 6px auto",
        }}
      />
      <div
        style={{
          background: "rgba(2,6,23,0.9)",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "4px 8px",
          fontSize: 11,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Area({
  left,
  top,
  width,
  height,
  color,
  border,
  title,
}: {
  left: string;
  top: string;
  width: string;
  height: string;
  color: string;
  border: string;
  title: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        borderRadius: 26,
        background: color,
        border: 2px dashed ${border},
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "rgba(2,6,23,0.9)",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: "4px 8px",
          fontSize: 11,
        }}
      >
        {title}
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};
