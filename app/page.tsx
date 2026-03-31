"use client";

export default function Home() {
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09131b",
        color: "white",
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
            background: "#071018",
            borderRight: "1px solid #1e293b",
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
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 14 }}>
              Perda x recuperação com leitura territorial.
            </p>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>Busca rápida</div>
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

          <div style={cardStyle}>
            <div style={labelStyle}>Filtros</div>
            <div style={{ display: "grid", gap: 10 }}>
              <select style={selectStyle}>
                <option>Todos os modelos</option>
                <option>HB20</option>
                <option>Onix</option>
                <option>Argo</option>
              </select>
              <select style={selectStyle}>
                <option>Todas as ocorrências</option>
                <option>Roubo</option>
                <option>Furto</option>
              </select>
              <select style={selectStyle}>
                <option>Todos os eixos</option>
                <option>Leste</option>
                <option>Sul</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            <StatCard label="Casos" value="03" color="#22d3ee" />
            <StatCard label="Eixo principal" value="Leste" color="#facc15" />
            <StatCard label="Status" value="Ativo" color="#34d399" />
          </div>
        </aside>

        <main style={{ padding: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 0.9fr",
              gap: 20,
            }}
          >
            <section style={panelStyle}>
              <div style={panelHeaderStyle}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>Mapa tático</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>
                    Visual de correlação entre perda, recuperação e área sensível.
                  </div>
                </div>
                <div style={{ color: "#22d3ee", fontSize: 13 }}>
                  Sistema em evolução
                </div>
              </div>

              <div
                style={{
                  position: "relative",
                  height: 560,
                  background: "linear-gradient(180deg, #0b1220 0%, #0a1622 100%)",
                  overflow: "hidden",
                }}
              >
                <GridBackground />

                <Area
                  left="56%"
                  top="18%"
                  width="24%"
                  height="28%"
                  color="rgba(239,68,68,0.18)"
                  border="#ef4444"
                  title="Área sensível"
                />
                <Area
                  left="22%"
                  top="48%"
                  width="20%"
                  height="18%"
                  color="rgba(245,158,11,0.16)"
                  border="#f59e0b"
                  title="Destino recorrente"
                />

                <PathLine x1="22%" y1="34%" x2="48%" y2="52%" color="#22d3ee" />
                <PathLine x1="30%" y1="58%" x2="70%" y2="30%" color="#64748b" />
                <PathLine x1="48%" y1="52%" x2="61%" y2="42%" color="#facc15" />

                <Point x="22%" y="34%" label="Perda" color="#22d3ee" />
                <Point x="48%" y="52%" label="Recup." color="#34d399" />
                <Point x="61%" y="42%" label="Descarte" color="#facc15" />
                <Point x="30%" y="58%" label="Perda" color="#22d3ee" />
                <Point x="70%" y="30%" label="Recup." color="#34d399" />

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
              <div style={panelStyle}>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  Leitura automática
                </div>
                <div style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.7 }}>
                  Há predominância do eixo Leste, com recuperação em regiões periféricas
                  e indício de concentração territorial em área sensível.
                </div>
              </div>

              <div style={panelStyle}>
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
                        <strong>CASO {item.id}</strong>
                        <span
                          style={{
                            color: item.risco === "Alto" ? "#f87171" : "#facc15",
                          }}
                        >
                          {item.risco}
                        </span>
                      </div>
                      <div style={{ fontSize: 14, color: "#cbd5e1" }}>
                        {item.modelo} • {item.tipo}
                      </div>
                      <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 6 }}>
                        {item.perda} → {item.recuperacao}
                      </div>
                      <div style={{ fontSize: 12, color: "#22d3ee", marginTop: 8 }}>
                        Eixo {item.eixo}
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

function StatCard(props) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 14,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 8 }}>
        {props.label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: props.color }}>
        {props.value}
      </div>
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

function PathLine(props) {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <line
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        stroke={props.color}
        strokeWidth="3"
        strokeDasharray="8 8"
      />
    </svg>
  );
}

function Point(props) {
  return (
    <div
      style={{
        position: "absolute",
        left: props.x,
        top: props.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: props.color,
          boxShadow: 0 0 18px ${props.color},
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
        {props.label}
      </div>
    </div>
  );
}

function Area(props) {
  return (
    <div
      style={{
        position: "absolute",
        left: props.left,
        top: props.top,
        width: props.width,
        height: props.height,
        borderRadius: 26,
        background: props.color,
        border: 2px dashed ${props.border},
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
        {props.title}
      </div>
    </div>
  );
}

const selectStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 10,
  border: "1px solid #334155",
  background: "#020617",
  color: "white",
};

const cardStyle = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 14,
  padding: 14,
  marginBottom: 14,
};

const labelStyle = {
  fontSize: 12,
  color: "#94a3b8",
  marginBottom: 8,
};

const panelStyle = {
  background: "#0f172a",
  border: "1px solid #1e293b",
  borderRadius: 20,
  padding: 18,
};

const panelHeaderStyle = {
  padding: 16,
  borderBottom: "1px solid #1e293b",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
