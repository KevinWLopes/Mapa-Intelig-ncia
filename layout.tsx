export const metadata = {
  title: "Mapa de Inteligência",
  description: "Sistema rodando",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
