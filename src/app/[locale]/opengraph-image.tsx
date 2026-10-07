import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getContent } from "@/content/profile";
import { isLocale, locales } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mahmoud Adel Abdulwahab — Software Engineer (Full Stack)";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Satori's bidi support is limited: lay Arabic words out right-to-left explicitly. */
function ArabicLine({ text, style }: { text: string; style: CSSProperties }) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", gap: "0.3em", ...style }}>
      {text.split(" ").map((word, i) => (
        <span key={i}>{word}</span>
      ))}
    </div>
  );
}

const asset = (p: string) => readFile(path.join(process.cwd(), "src/assets", p));

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  const t = getContent(locale);
  const isAr = locale === "ar";

  const [photo, sans, sansBold, mono, arabic, arabicBold] = await Promise.all([
    asset("og-photo.jpg"),
    asset("fonts/Geist-Regular.ttf"),
    asset("fonts/Geist-SemiBold.ttf"),
    asset("fonts/GeistMono-Regular.ttf"),
    asset("fonts/PlexArabic-Regular.ttf"),
    asset("fonts/PlexArabic-SemiBold.ttf"),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const textFont = isAr ? "Plex Arabic" : "Geist";

  // Arabic lines are kept purely Arabic; Latin tokens get their own elements (satori is weak on mixed direction).
  const titleLines = isAr ? ["مهندس برمجيات"] : [t.identity.title]; // review-ar

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: isAr ? "row-reverse" : "row",
          alignItems: "center",
          gap: 64,
          padding: "0 80px",
          background: "#0A0F1A",
          color: "#E5E7EB",
          fontFamily: textFont,
        }}
      >
        <img
          src={photoSrc}
          width={300}
          height={300}
          alt=""
          style={{ borderRadius: 48, border: "2px solid #1F2937", objectFit: "cover" }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: isAr ? "flex-end" : "flex-start", flex: 1 }}>
          {!isAr && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 22, color: "#34D399", letterSpacing: 3 }}>
              <div style={{ width: 10, height: 10, borderRadius: 10, background: "#34D399" }} />
              SOFTWARE ENGINEER
            </div>
          )}
          {isAr ? (
            <ArabicLine text={t.identity.name} style={{ fontSize: 66, fontWeight: 600, lineHeight: 1.3 }} />
          ) : (
            <div style={{ display: "flex", fontSize: 62, fontWeight: 600, lineHeight: 1.15, marginTop: 18 }}>{t.identity.name}</div>
          )}
          <div style={{ display: "flex", flexDirection: isAr ? "row-reverse" : "row", gap: 14, alignItems: "baseline", marginTop: 18, fontSize: 34, color: "#9CA3AF" }}>
            {isAr ? <ArabicLine text={titleLines[0]} style={{}} /> : <span>{titleLines[0]}</span>}
            {isAr && <span style={{ fontFamily: "Geist" }}>(Full Stack)</span>}
          </div>
          <div style={{ display: "flex", width: 380, height: 1, background: "#1F2937", marginTop: 40 }} />
          <div style={{ display: "flex", marginTop: 24, fontSize: 24, color: "#9CA3AF", fontFamily: "Geist Mono" }}>
            Node.js · TypeScript · Cairo, EG
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist", data: sansBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Plex Arabic", data: arabic, weight: 400, style: "normal" },
        { name: "Plex Arabic", data: arabicBold, weight: 600, style: "normal" },
      ],
    },
  );
}
