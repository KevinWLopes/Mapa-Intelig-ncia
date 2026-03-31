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
            <StatCard label="Casos" value="03" color="#22d
