"use client";

import { useMemo, useState } from "react";

type CaseItem = {
  id: string;
  modelo: string;
  tipo: string;
  perda: string;
  recuperacao: string;
  descarte: string;
  eixo: string;
  risco: "Alto" | "Médio" | "Baixo";
  perdaPos: { left: string; top: string };
  recPos: { left: string; top: string };
  descartePos: { left: string; top: string };
};

const CASES: CaseItem[] = [
  {
    id: "001",
    modelo: "HB20",
    tipo: "Roubo",
    perda: "Itaquera",
    recuperacao: "Poá",
    descarte: "Guaianases",
    eixo: "Leste",
    risco: "Alto",
    perdaPos: { left: "22%", top: "34%" },
    recPos: { left: "48%", top: "52%" },
    descartePos: { left: "61%", top: "42%" },
  },
  {
    id: "002",
    modelo: "Onix",
    tipo: "Furto",
    perda: "Santo Amaro",
    recuperacao: "Capão Redondo",
    descarte: "Jardim São Luís",
    eixo: "Sul",
    risco: "Médio",
    perdaPos: { left: "30%", top: "58%" },
    recPos: { left: "70%", top: "30%" },
    descartePos: { left: "58%", top: "46%" },
  },
  {
    id: "003",
    modelo: "Argo",
    tipo: "Roubo",
    perda: "São Mateus",
    recuperacao: "Suzano",
    descarte: "Itaim Paulista",
    eixo: "Leste",
    risco: "Alto",
    perdaPos: { left: "18%", top: "24%" },
    recPos: { left: "44%", top: "36%" },
    descartePos: { left: "54%", top: "30%" },
  },
  {
    id: "004",
    modelo: "Kwid",
    tipo: "Furto",
    perda: "Vila Maria",
    recuperacao: "Guarulhos",
    descarte: "Cumbica",
    eixo: "Norte",
    risco: "Médio",
    perdaPos: { left: "26%", top: "20%" },
    recPos: { left: "62%", top: "20%" },
    descartePos: { left: "50%", top: "26%" },
  },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState("001");
  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState("Todos");
  const [typeFilter, setTypeFilter] = useState("Todas");
  const [axisFilter, setAxisFilter] = useState("Todos");

  const filteredCases = useMemo(() => {
    return CASES.filter((item) => {
      const matchSearch =
        search.trim() === "" ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.modelo.toLowerCase().includes(search.toLowerCase()) ||
        item.perda.toLowerCase().includes(search.toLowerCase()) ||
        item.recuperacao.toLowerCase().includes(search.toLowerCase());

      const matchModel = modelFilter === "Todos" || item.modelo === modelFilter;
      const matchType = typeFilter === "Todas" || item.tipo === typeFilter;
      const matchAxis = axisFilter === "Todos" || item.eixo === axisFilter;

      return matchSearch && matchModel && matchType && matchAxis;
    });
  }, [search, modelFilter, typeFilter, axisFilter]);

  const selected =
    filteredCases.find((item) => item.id === selectedId) || filteredCases[0] || CASES[0];

  const totalCases = filteredCases.length;
  const highRiskCount = filteredCases.filter((item) => item.risco === "Alto").length;
  const mainAxis = filteredCases.length > 0 ? filteredCases[0].eixo : "-";

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
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                color: "#22d3ee",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Mapa de Inteligência
            </div>
            <h1 style={{ margin: "10px 0 8px 0", fontSize: 28 }}>
              Painel Operacional
            </h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>
              Correlação entre perda, recuperação, descarte e eixo de recorrência.
            </p>
          </div>

          <Card>
            <SmallLabel>Busca rápida</SmallLabel>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caso, modelo, bairro..."
              style={inputStyle}
            />
          </Card>

          <Card>
            <SmallLabel>Filtros</SmallLabel>
            <div style={{ display: "grid", gap: 10 }}>
              <select style={selectStyle} value={modelFilter} onChange={(e) => setModelFilter(e.target.value)}>
                <option>Todos</option>
                <option>HB20</option>
                <option>Onix</option>
                <option>Argo</option>
                <option>Kwid</option>
              </select>

              <select style={selectStyle} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option>Todas</option>
                <option>Roubo</option>
                <option>Furto</option>
              </select>

              <select style={selectStyle} value={axisFilter} onChange={(e) => setAxisFilter(e.target.value)}>
                <option>Todos</option>
                <option>Leste</option>
                <option>Sul</option>
                <option>Norte</option>
              </select>
            </div>
          </Card>

          <div style={{ display: "grid", gap: 12, marginBottom: 14 }}>
            <StatCard label="Casos filtrados" value={String(totalCases).padStart(2, "0")} color="#22d3ee" />
            <StatCard label="Risco alto" value={String(highRiskCount).padStart(2, "0")} color="#f87171" />
            <StatCard label="Eixo principal" value={mainAxis} color="#facc15" />
          </div>

          <Card>
            <SmallLabel>Casos</SmallLabel>
            <div style={{ display: "grid", gap: 10 }}>
              {filteredCases.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{
                    textAlign: "left",
                    background: selected.id === item.id ? "#122033" : "#020617",
                    border:
                      selected.id === item.id ? "1px solid #22d3ee" : "1px solid #1e293b",
                    borderRadius: 12,
                    padding: 12,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <strong>CASO {item.id}</strong>
                    <span
                      style={{
                        color:
                          item.risco === "Alto"
                            ? "#f87171"
                            : item.risco === "Médio"
                            ? "#facc15"
                            : "#34d399",
                        fontSize: 12,
                      }}
                    >
                      {item.risco}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#cbd5e1" }}>
                    {item.modelo} • {item.tipo}
                  </div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                    {item.perda} → {item.recuperacao}
                  </div>
                </button>
              ))}

              {filteredCases.length === 0 && (
                <div
                  style={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: 12,
                    padding: 12,
                    color: "#94a3b8",
                    fontSize: 13,
                  }}
                >
                  Nenhum caso encontrado.
                </div>
              )}
            </div>
          </Card>
        </aside>

        <main style={{ display: "grid", gap: 20 }}>
          <section
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 20,
              overflow: "hidden",
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
                  Caso selecionado em destaque.
                </div>
              </div>
              <div style={{ color: "#22d3ee", fontSize: 13 }}>
                CASO {selected.id}
              </div>
            </div>

            <div
              style={{
                position: "relative",
                height: 500,
                background: "linear-gradient(180deg, #0b1220 0%, #0a1622 100%)",
                overflow: "hidden",
              }}
            >
              <GridBackground />

              <DangerArea
                left="56%"
                top="18%"
                width="24%"
                height="28%"
                bg="rgba(239,68,68,0.18)"
                border="#ef4444"
                title="Área sensível"
              />
              <DangerArea
                left="22%"
                top="48%"
                width="20%"
                height="18%"
                bg="rgba(245,158,11,0.16)"
                border="#f59e0b"
                title="Destino recorrente"
              />

              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <line
                  x1={selected.perdaPos.left}
                  y1={selected.perdaPos.top}
                  x2={selected.recPos.left}
                  y2={selected.recPos.top}
                  stroke="#22d3ee"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                />
                <line
                  x1={selected.descartePos.left}
                  y1={selected.descartePos.top}
                  x2={selected.recPos.left}
                  y2={selected.recPos.top}
                  stroke="#facc15"
                  strokeWidth="3"
                  strokeDasharray="8 8"
                />
              </svg>

              <MapPoint
                left={selected.perdaPos.left}
                top={selected.perdaPos.top}
                color="#22d3ee"
                label={`Perda • ${selected.perda}`}
              />
              <MapPoint
                left={selected.recPos.left}
                top={selected.recPos.top}
                color="#34d399"
                label={`Recup. • ${selected.recuperacao}`}
              />
              <MapPoint
                left={selected.descartePos.left}
                top={selected.descartePos.top}
                color="#facc15"
                label={`Descarte • ${selected.descarte}`}
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <section style={panelStyle}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                Detalhes do caso
              </div>
              <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.9 }}>
                <div><strong>ID:</strong> {selected.id}</div>
                <div><strong>Modelo:</strong> {selected.modelo}</div>
                <div><strong>Ocorrência:</strong> {selected.tipo}</div>
                <div><strong>Perda:</strong> {selected.perda}</div>
                <div><strong>Recuperação:</strong> {selected.recuperacao}</div>
                <div><strong>Descarte:</strong> {selected.descarte}</div>
                <div><strong>Eixo:</strong> {selected.eixo}</div>
                <div><strong>Risco:</strong> {selected.risco}</div>
              </div>
            </section>

            <section style={panelStyle}>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                Leitura automática
              </div>
              <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>
                O caso {selected.id} apresenta deslocamento no eixo{" "}
                <strong>{selected.eixo}</strong>, com perda em{" "}
                <strong>{selected.perda}</strong> e recuperação em{" "}
                <strong>{selected.recuperacao}</strong>. O descarte em{" "}
                <strong>{selected.descarte}</strong> sugere correlação territorial e
                necessidade de cruzamento com áreas sensíveis, recorrência regional e
                possíveis pontos de retenção.
              </div>
            </section>
          </div>
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
  return <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>{children}</div>;
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

function DangerArea({
  left,
  top,
  width,
  height,
  bg,
  border,
  title,
}: {
  left: string;
  top: string;
  width: string;
  height: string;
  bg: string;
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
        background: bg,
        border: `2px dashed ${border}`,
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

function MapPoint({
  left,
  top,
  color,
  label,
}: {
  left: string;
  top: string;
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 18px ${color}`,
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const panelStyle: React.CSSProperties = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 20,
  padding: 18,
};