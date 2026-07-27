import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#0B0C0E",
          position: "relative",
        }}
      >
        {/* Stratigraphic bar — left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#F0C868" }} />
          <div style={{ flex: 1, backgroundColor: "#C9962C" }} />
          <div style={{ flex: 1, backgroundColor: "#8C6516" }} />
          <div style={{ flex: 4, backgroundColor: "#1a2530" }} />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "60px 80px 64px 100px",
            flex: 1,
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              fontSize: "13px",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              color: "#C9962C",
              letterSpacing: "0.3em",
              marginBottom: "32px",
              textTransform: "uppercase",
            }}
          >
            SOGA
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "60px",
              fontFamily: "Georgia, serif",
              fontWeight: 600,
              color: "#F6F4EF",
              lineHeight: 1.05,
              marginBottom: "24px",
              maxWidth: "820px",
            }}
          >
            Senegal Oil
            <br />
            and Gas Academy
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: "56px",
              height: "2px",
              backgroundColor: "#C9962C",
              marginBottom: "20px",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "rgba(246,244,239,0.45)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Former l&apos;élite africaine de l&apos;énergie · Dakar, Sénégal
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
