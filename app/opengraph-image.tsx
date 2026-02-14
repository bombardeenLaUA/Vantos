import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VANTOS - Suite de Estrategia Financiera";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F19",
          backgroundImage: "radial-gradient(circle at center, #1e293b 0%, #0B0F19 100%)",
        }}
      >
        <div
          style={{
            fontSize: 80,
            color: "#C6A87C",
            fontFamily: "serif",
            letterSpacing: "-2px",
            fontWeight: "bold",
          }}
        >
          VANTOS
        </div>
        <div
          style={{
            fontSize: 30,
            color: "white",
            marginTop: 20,
            opacity: 0.8,
          }}
        >
          Suite de Estrategia Financiera
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
