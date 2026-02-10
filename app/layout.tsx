import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "../components/JsonLd";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vantoshq.com"),
  title: {
    default: "Vantos | Tu Futuro Financiero Inteligente",
    template: "%s | Vantos",
  },
  description:
    "Simula, planifica y optimiza tu patrimonio. Herramientas financieras avanzadas para decidir si amortizar hipoteca o invertir.",
  keywords: [
    "amortizar hipoteca",
    "simulador hipoteca",
    "amortizar o invertir",
    "calculadora financiera",
    "ahorro intereses",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.vantoshq.com",
    siteName: "Vantos",
    title: "Vantos | Tu Futuro Financiero Inteligente",
    description:
      "Simula, planifica y optimiza tu patrimonio. Herramientas financieras avanzadas para decidir si amortizar hipoteca o invertir.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vantoshq",
  },
  icons: {
    icon: "/images/icono.ico",
    shortcut: "/images/icono.ico",
    apple: "/images/vantos.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans text-slate-900 antialiased">
        <Header />
        <main className="min-h-screen bg-vantos-gray">
          {children}
        </main>
        <Footer />
        <JsonLd />
        <GoogleAnalytics gaId="G-NVGJLSV03C" />
      </body>
    </html>
  );
}
