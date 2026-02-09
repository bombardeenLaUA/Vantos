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
  title: "Simulador de Estrategia Hipotecaria | ¿Amortizar o Invertir?",
  description: "Herramienta gratuita para calcular si te interesa más amortizar hipoteca o invertir. Visualiza tu ahorro real y optimiza tus finanzas en segundos.",
  keywords: ["amortizar hipoteca", "simulador hipoteca", "amortizar o invertir", "calculadora financiera", "ahorro intereses"],
  openGraph: {
    title: "Vantos | Tu Estrategia Hipotecaria Inteligente",
    description: "Deja de perder dinero. Calcula en segundos la estrategia óptima para tu hipoteca.",
    type: "website",
  },
  icons: {
    icon: '/icono.ico',
    shortcut: '/icono.ico',
    apple: '/images/vantos.png'
  }
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
