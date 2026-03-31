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

