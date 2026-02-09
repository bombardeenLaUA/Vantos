import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
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
  title: "Simulador de Estrategia Hipotecaria | ¿Amortizar o Invertir?",
  description: "Herramienta gratuita para calcular si te interesa más amortizar hipoteca o invertir. Visualiza tu ahorro real y optimiza tus finanzas en segundos.",
  keywords: ["amortizar hipoteca", "simulador hipoteca", "amortizar o invertir", "calculadora financiera", "ahorro intereses"],
  openGraph: {
    title: "Vantos | Tu Estrategia Hipotecaria Inteligente",
    description: "Deja de perder dinero. Calcula en segundos la estrategia óptima para tu hipoteca.",
    type: "website",
  },
  icons: {
    icon: '/images/icono.ico',
    shortcut: '/images/icono.ico',
    apple: '/images/vantos.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
