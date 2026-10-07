import type { HighlightId } from "@/content/profile";

/*
 * Small connector-line diagrams for the "Engineering highlights" cards.
 * Diagrams are never mirrored in RTL (dir="ltr" on the wrapper).
 */

const line = "stroke-border-strong hl-line";
const node = "fill-surface stroke-border-strong";
const label = "fill-muted font-mono";
const accent = "stroke-accent";

function Dot({ cx, cy, on = false }: { cx: number; cy: number; on?: boolean }) {
  return <circle cx={cx} cy={cy} r={2.5} className={on ? "fill-accent" : "fill-border-strong"} />;
}

function Idempotent() {
  return (
    <>
      {/* two identical events */}
      <rect x="6" y="18" width="64" height="26" rx="6" className={node} />
      <rect x="6" y="76" width="64" height="26" rx="6" className={node} />
      <text x="38" y="35" textAnchor="middle" fontSize="10" className={label}>evt #42</text>
      <text x="38" y="93" textAnchor="middle" fontSize="10" className={label}>evt #42</text>
      <path d="M70 31 C 96 31, 100 60, 122 60" fill="none" className={line} />
      <path d="M70 89 C 96 89, 100 60, 122 60" fill="none" className={line} />
      <Dot cx={70} cy={31} />
      <Dot cx={70} cy={89} />
      {/* consumer */}
      <rect x="122" y="44" width="72" height="32" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="158" y="64" textAnchor="middle" fontSize="10" className="fill-text font-mono">consumer</text>
      {/* exactly one record */}
      <path d="M194 60 H 222" fill="none" className={accent} />
      <Dot cx={222} cy={60} on />
      <rect x="226" y="47" width="48" height="26" rx="6" className={node} />
      <text x="250" y="64" textAnchor="middle" fontSize="10" className="fill-text font-mono">×1</text>
    </>
  );
}

function Agents() {
  const subs = [28, 98, 182, 252];
  return (
    <>
      <rect x="104" y="8" width="72" height="28" rx="6" className="fill-accent-soft stroke-accent" />
      <text x="140" y="26" textAnchor="middle" fontSize="11" className="fill-text font-mono">parent</text>
      <text x="140" y="70" textAnchor="middle" fontSize="10" className={label}>domain sub-agents</text>
      <Dot cx={140} cy={36} on />
      {subs.map((x) => (
        <g key={x}>
          <path d={`M140 36 C 140 58, ${x} 50, ${x} 80`} fill="none" className={line} />
          <Dot cx={x} cy={80} />
          <rect x={x - 22} y="82" width="44" height="22" rx="6" className={node} />
          <circle cx={x} cy={93} r={3} className="fill-border-strong" />
        </g>
      ))}
    </>
  );
}

function Tenants() {
  return (
    <>
      <rect x="10" y="22" width="100" height="70" rx="8" className={node} />
      <rect x="170" y="22" width="100" height="70" rx="8" className={node} />
      <text x="60" y="44" textAnchor="middle" fontSize="10" className={label}>tenant A</text>
      <text x="220" y="44" textAnchor="middle" fontSize="10" className={label}>tenant B</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={26 + i * 24} y="56" width="18" height="22" rx="3" className="fill-bg stroke-border-strong" />
          <rect x={186 + i * 24} y="56" width="18" height="22" rx="3" className="fill-bg stroke-border-strong" />
        </g>
      ))}
      {/* the wall */}
      <path d="M140 8 V 106" className={accent} strokeWidth="2" />
      <path d="M130 57 H 150" className={line} strokeDasharray="2 3" />
      <path d="M134 51 l12 12 M146 51 l-12 12" className={accent} strokeWidth="1.5" />
    </>
  );
}

function Grading() {
  return (
    <>
      <rect x="8" y="30" width="86" height="56" rx="8" className={node} />
      <text x="51" y="62" textAnchor="middle" fontSize="10" className={label}>client</text>
      <rect x="186" y="30" width="86" height="56" rx="8" className="fill-accent-soft stroke-accent" />
      <text x="229" y="52" textAnchor="middle" fontSize="10" className="fill-text font-mono">server</text>
      {/* lock */}
      <rect x="221" y="62" width="16" height="12" rx="2" className="fill-none stroke-accent" />
      <path d="M224 62 v-4 a5 5 0 0 1 10 0 v4" fill="none" className={accent} />
      <path d="M94 48 H 186" className={line} />
      <path d="M180 44 l6 4 -6 4" fill="none" className={line} />
      <path d="M186 68 H 94" className={line} />
      <path d="M100 64 l-6 4 6 4" fill="none" className={line} />
      <text x="140" y="42" textAnchor="middle" fontSize="9" className={label}>submission</text>
      <text x="140" y="82" textAnchor="middle" fontSize="9" className={label}>score only</text>
    </>
  );
}

const DIAGRAMS: Record<HighlightId, () => React.JSX.Element> = {
  idempotent: Idempotent,
  agents: Agents,
  tenants: Tenants,
  grading: Grading,
};

export function HighlightDiagram({ id, label: aria }: { id: HighlightId; label: string }) {
  const Diagram = DIAGRAMS[id];
  return (
    <div dir="ltr" className="latin">
      <svg viewBox="0 0 280 114" role="img" aria-label={aria} className="h-auto w-full max-w-[340px]" strokeWidth="1">
        <Diagram />
      </svg>
    </div>
  );
}
