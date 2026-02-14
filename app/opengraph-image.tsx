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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B0F19",
        }}
      >
        <div
          style={{
            fontSize: 72,
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
            fontSize: 32,
            color: "white",
            marginTop: 24,
          }}
        >
          Financial Strategy Suite
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
