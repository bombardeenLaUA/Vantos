import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import JsonLd from "../components/JsonLd";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vantoshq.com"),
  title: {
    default: "Vantos | Suite de Estrategia Financiera Inteligente",
    template: "%s | Vantos",
  },
  description:
    "Simula, planifica y optimiza tu patrimonio. Herramientas avanzadas de amortización hipotecaria, inversión y ahorro. Sin registros ni comisiones.",
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
    title: "Vantos | Suite de Estrategia Financiera Inteligente",
    description:
      "Simula, planifica y optimiza tu patrimonio. Herramientas avanzadas de amortización hipotecaria, inversión y ahorro. Sin registros ni comisiones.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "VANTOS - Financial Strategy Suite" }],
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
      <body className="font-sans bg-vantos-dark text-white antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 relative w-full">
          {children}
        </main>
        <Footer />
        <JsonLd />
        <GoogleAnalytics gaId="G-NVGJLSV03C" />
      </body>
    </html>
  );
}
