import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Vantos | El Simulador de Estrategia Hipotecaria Inteligente",
  description: "No uses un Excel. Vantos es la herramienta visual gratuita para decidir si amortizar hipoteca, reducir plazo o invertir tu capital. Calcula tu ahorro real hoy.",
  keywords: ["simulador hipoteca", "amortizar o invertir", "calculadora hipotecaria visual", "estrategia financiera", "ahorro hipoteca"],
  authors: [{ name: "Vantos Financial Tech" }],
  openGraph: {
    title: "Vantos | ¿Amortizar hipoteca o invertir?",
    description: "Descubre en segundos la estrategia financiera que te hará ahorrar miles de euros en tu hipoteca.",
    url: "https://vantos.vercel.app",
    siteName: "Vantos Simulador",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantos | El Simulador Hipotecario Visual",
    description: "Decide tu futuro financiero: ¿Amortizar cuota, plazo o invertir? Calcúlalo ahora.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={geistSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
