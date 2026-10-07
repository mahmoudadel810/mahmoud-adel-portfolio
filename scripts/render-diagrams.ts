/**
 * Renders every project's architecture diagram from src/content/profile.ts to static SVG.
 *
 *   npm run diagrams
 *
 * Mermaid runs once, here, in headless Chromium (Playwright) — the site ships plain SVG and no
 * Mermaid bundle. Colours are rendered as sentinel hex values and then rewritten to the site's
 * CSS variables, so each diagram follows the light/dark theme. Output: src/generated/diagrams.ts
 * (committed, so Vercel builds need no browser).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { chromium } from "playwright";
import { projectsMeta, type ArchitectureSpec } from "../src/content/profile";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

// Sentinel colours → CSS variables. Sentinels are unlikely to appear by accident.
const TOKENS: Record<string, string> = {
  "#0a0a01": "var(--surface)",
  "#0a0a02": "var(--border-strong)",
  "#0a0a03": "var(--text)",
  "#0a0a04": "var(--muted)",
  "#0a0a05": "var(--bg)",
  "#0a0a06": "var(--accent)",
  "#0a0a07": "var(--accent-soft)",
};

function toMermaid(spec: ArchitectureSpec): string {
  const lines = [`flowchart ${spec.direction}`];
  for (const n of spec.nodes) {
    const shape = n.kind === "data" ? [`[(`, `)]`] : n.kind === "client" ? [`(`, `)`] : [`[`, `]`];
    lines.push(`  ${n.id}${shape[0]}"${n.label}"${shape[1]}`);
  }
  for (const e of spec.edges) {
    const arrow = e.dashed ? "-.->" : "-->";
    lines.push(e.label ? `  ${e.from} ${arrow}|"${e.label}"| ${e.to}` : `  ${e.from} ${arrow} ${e.to}`);
  }
  lines.push("  classDef service fill:#0a0a07,stroke:#0a0a06,color:#0a0a03,stroke-width:1px");
  lines.push("  classDef external fill:#0a0a01,stroke:#0a0a02,color:#0a0a03,stroke-width:1px,stroke-dasharray:4 3");
  const services = spec.nodes.filter((n) => n.kind === "service").map((n) => n.id);
  const externals = spec.nodes.filter((n) => n.kind === "external").map((n) => n.id);
  if (services.length) lines.push(`  class ${services.join(",")} service`);
  if (externals.length) lines.push(`  class ${externals.join(",")} external`);
  return lines.join("\n");
}

/** Drop Mermaid's default CSS rules that target classes this SVG never uses (keeps the page payload small). */
function pruneStyle(svg: string): string {
  const used = new Set<string>();
  for (const m of svg.replace(/<style>[\s\S]*?<\/style>/, "").matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) used.add(c);
  }
  return svg.replace(/<style>([\s\S]*?)<\/style>/, (_, css: string) => {
    const withoutKeyframes = css.replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, "");
    const rules = withoutKeyframes.match(/[^{}]+\{[^{}]*\}/g) ?? [];
    const kept = rules.filter((rule) => {
      const selector = rule.slice(0, rule.indexOf("{"));
      if (selector.includes(":root")) return false;
      return selector.split(",").some((part) => {
        const classes = [...part.matchAll(/\.([\w-]+)/g)].map((m) => m[1]);
        return classes.every((c) => used.has(c));
      });
    });
    return `<style>${kept.join("")}</style>`;
  });
}

function themeSvg(svg: string): string {
  let out = pruneStyle(svg);
  for (const [hex, cssVar] of Object.entries(TOKENS)) {
    out = out.replace(new RegExp(hex, "gi"), cssVar);
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    out = out.replace(new RegExp(`rgba?\\(${r},\\s*${g},\\s*${b}(,\\s*1)?\\)`, "g"), cssVar);
  }
  out = out.replace(/font-family:\s*"?Geist"?[^;"]*;/g, "font-family:var(--font-sans);");
  out = out.replace(/font-family="[^"]*Geist[^"]*"/g, 'font-family="var(--font-sans)"');
  // Let the container size the diagram.
  out = out.replace(/<svg([^>]*?)\sstyle="max-width:\s*[\d.]+px;?"/, "<svg$1");
  out = out.replace(/<svg([^>]*?)\swidth="100%"/, "<svg$1");
  // Error-icon, KaTeX and "neo" look rules carry Mermaid defaults but never apply to these flowcharts.
  const leftovers = out.match(/rgb\(10,[^)]*\)/gi) ?? [];
  if (leftovers.length) console.warn("  unmapped colours:", [...new Set(leftovers)].join(" "));
  return out;
}

async function main() {
  const mermaidJs = readFileSync(require.resolve("mermaid/dist/mermaid.min.js"), "utf8");
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(
      `<!doctype html><html><head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=block">
      </head><body></body></html>`,
      { waitUntil: "networkidle" },
    );
    await page.addScriptTag({ content: mermaidJs });
    await page.evaluate(async () => {
      await document.fonts.load('14px "Geist"');
      await document.fonts.load('500 14px "Geist"');
    });
    const init = (fontSize: number) =>
      page.evaluate((fontSize) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const m = (window as any).mermaid;
      m.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        flowchart: { curve: "basis", padding: 14, nodeSpacing: 36, rankSpacing: 48, htmlLabels: true },
        themeVariables: {
          fontFamily: "Geist",
          fontSize: `${fontSize}px`,
          background: "#0a0a05",
          primaryColor: "#0a0a01",
          primaryBorderColor: "#0a0a02",
          primaryTextColor: "#0a0a03",
          secondaryColor: "#0a0a01",
          tertiaryColor: "#0a0a01",
          mainBkg: "#0a0a01",
          nodeBorder: "#0a0a02",
          clusterBkg: "#0a0a01",
          clusterBorder: "#0a0a02",
          lineColor: "#0a0a04",
          textColor: "#0a0a03",
          nodeTextColor: "#0a0a03",
          edgeLabelBackground: "#0a0a05",
          titleColor: "#0a0a03",
        },
      });
    }, fontSize);

    const result: Record<string, { full: string; compact: string }> = {};
    for (const project of projectsMeta) {
      const entry = { full: "", compact: "" };
      for (const variant of ["full", "compact"] as const) {
        const spec = variant === "full" ? project.architecture : project.compactArchitecture;
        // Compact diagrams are shown small on project cards, so they get a larger font.
        await init(variant === "full" ? 14 : 22);
        const id = `arch-${project.slug.replace(/[^a-z0-9]/g, "")}-${variant}`;
        const svg = await page.evaluate(
          async ({ id, def }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { svg } = await (window as any).mermaid.render(id, def);
            return svg as string;
          },
          { id, def: toMermaid(spec) },
        );
        console.log(`${project.slug}/${variant}`);
        entry[variant] = themeSvg(svg);
        // Also written as a static file, so below-the-fold cards can load it lazily.
        mkdirSync(path.join(root, "public/diagrams"), { recursive: true });
        writeFileSync(path.join(root, `public/diagrams/${project.slug}-${variant}.svg`), entry[variant]);
      }
      result[project.slug] = entry;
    }

    mkdirSync(path.join(root, "src/generated"), { recursive: true });
    const file = path.join(root, "src/generated/diagrams.ts");
    writeFileSync(
      file,
      `// Generated by scripts/render-diagrams.ts — do not edit. Run \`npm run diagrams\` after changing profile.ts.\n` +
        `import type { ProjectSlug } from "@/content/profile";\n\n` +
        `export const diagrams: Record<ProjectSlug, { full: string; compact: string }> = ${JSON.stringify(result, null, 2)};\n`,
    );
    console.log(`Wrote ${path.relative(root, file)}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
