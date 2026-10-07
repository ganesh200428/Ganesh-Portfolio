import { useState } from "react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { dashboards } from "../../../data/portfolio";

// Decorative chart shapes for the previews, not real data.
const SERIES = [
  [38, 52, 46, 64, 58, 76, 70, 88],
  [62, 58, 70, 66, 78, 72, 84, 80],
  [30, 42, 55, 50, 63, 71, 68, 82],
  [48, 70, 60, 82, 74, 90, 86, 94],
  [56, 50, 64, 60, 70, 66, 74, 78],
  [34, 46, 44, 60, 66, 62, 78, 86],
];
const DONUT = [0.68, 0.74, 0.61, 0.82, 0.57, 0.7];
const CHART_TYPES = ["bars", "area", "line"] as const;

const line = (rgba: number) => `rgba(var(--fg-rgb),${rgba})`;

function MiniChart({ type, data, accent, active }: { type: (typeof CHART_TYPES)[number]; data: number[]; accent: string; active: boolean }) {
  const w = 160;
  const h = 64;
  const step = w / (data.length - 1);
  const pts = data.map((v, i) => [i * step, h - (v / 100) * h] as const);
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const gradId = `grad-${accent.slice(1)}-${type}`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} style={{ stroke: line(0.07) }} strokeWidth="0.6" />
      ))}

      {type === "bars" &&
        data.map((v, i) => {
          const bw = (w / data.length) * 0.56;
          const x = i * (w / data.length) + ((w / data.length) - bw) / 2;
          const bh = (v / 100) * h;
          return (
            <rect
              key={i}
              x={x}
              y={h - bh}
              width={bw}
              height={bh}
              rx="1.5"
              fill={accent}
              opacity={i === data.length - 1 ? 1 : 0.55}
              style={{
                transformOrigin: `${x + bw / 2}px ${h}px`,
                transform: `scaleY(${active ? 1 : 0.82})`,
                transition: `transform 0.5s cubic-bezier(.2,.8,.2,1) ${i * 35}ms`,
              }}
            />
          );
        })}

      {type !== "bars" && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={type === "area" ? 0.35 : 0.12} />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${path} L${w},${h} L0,${h} Z`} fill={`url(#${gradId})`} />
          <path
            d={path}
            fill="none"
            stroke={accent}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={active ? 3.2 : 2.4} fill={accent} style={{ transition: "r 0.3s ease" }} />
        </>
      )}
    </svg>
  );
}

function Donut({ value, accent }: { value: number; accent: string }) {
  const c = 2 * Math.PI * 14;
  return (
    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
      <circle cx="18" cy="18" r="14" fill="none" style={{ stroke: line(0.08) }} strokeWidth="5" />
      <circle cx="18" cy="18" r="14" fill="none" stroke={accent} strokeWidth="5" strokeDasharray={`${c * value} ${c}`} />
    </svg>
  );
}

function DashboardCard({ d, index }: { d: (typeof dashboards)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const data = SERIES[index % SERIES.length];
  const type = CHART_TYPES[index % CHART_TYPES.length];

  return (
    <article
      data-cursor="object"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500"
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 28px 60px -24px ${d.accent}80` : undefined,
        borderColor: hovered ? `${d.accent}66` : line(0.08),
      }}
    >
      {/* Report window chrome */}
      <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: line(0.08) }}>
        <div className="flex items-center gap-1.5">
          {[0.18, 0.12, 0.08].map((o) => (
            <span key={o} className="h-2 w-2 rounded-full" style={{ background: line(o) }} />
          ))}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: d.accent }}>
          {d.category}
        </span>
      </div>

      {/* Mini report canvas */}
      <div className="p-4" style={{ background: line(0.02) }}>
        <div className="grid grid-cols-3 gap-2">
          {[0.9, 0.65, 0.78].map((wd, i) => (
            <div key={i} className="rounded-lg border px-2.5 py-2" style={{ borderColor: line(0.08), background: line(0.025) }}>
              <span className="block h-1 w-8 rounded-full" style={{ background: line(0.15) }} />
              <span
                className="mt-2 block h-2 rounded-full transition-all duration-500"
                style={{ width: `${(hovered ? wd : wd * 0.75) * 100}%`, background: i === 0 ? d.accent : line(0.3) }}
              />
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
          <div className="h-24 rounded-lg border p-2.5" style={{ borderColor: line(0.08), background: line(0.025) }}>
            <MiniChart type={type} data={data} accent={d.accent} active={hovered} />
          </div>
          <div
            className="flex w-20 flex-col items-center justify-center gap-1.5 rounded-lg border p-2"
            style={{ borderColor: line(0.08), background: line(0.025) }}
          >
            <div className="h-12 w-12">
              <Donut value={DONUT[index % DONUT.length]} accent={d.accent} />
            </div>
            <span className="h-1 w-8 rounded-full" style={{ background: line(0.15) }} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t p-5" style={{ borderColor: line(0.08) }}>
        <h3 className="font-display text-lg font-semibold text-white">{d.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{d.description}</p>
      </div>
    </article>
  );
}

export default function DashboardLab() {
  return (
    <Section
      id="dashboards"
      eyebrow="04. Dashboard Lab"
      title="Dashboards across six business domains"
      description="A preview of the reporting I build in Power BI: KPI cards, trend visuals and multi-page reports, delivered from requirements through production."
    >
      <Reveal className="mb-10 grid grid-cols-2 gap-4 sm:max-w-md">
        <div className="glass rounded-2xl px-5 py-4">
          <p className="font-display text-3xl font-bold text-cyan-300">20+</p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Power BI Dashboards</p>
        </div>
        <div className="glass rounded-2xl px-5 py-4">
          <p className="font-display text-3xl font-bold text-violet-300">100+</p>
          <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">Dashboard Pages</p>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06} y={30} className="h-full">
            <DashboardCard d={d} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
