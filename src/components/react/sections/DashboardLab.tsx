import { useRef, useState } from "react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { dashboards } from "../../../data/portfolio";

const PULSE_PATH = "M0,20 L14,20 L20,6 L28,34 L34,20 L40,20 L46,12 L52,20 L120,20";

function DashboardCard({ d }: { d: (typeof dashboards)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      data-cursor="object"
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className="glass relative flex h-64 flex-col overflow-hidden rounded-2xl p-5 transition-all duration-500"
      style={{
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px -18px ${d.accent}66` : "0 0 0 0 transparent",
        borderColor: hovered ? `${d.accent}55` : "rgba(255,255,255,0.08)",
      }}
    >
      {/* Cursor-tracked spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), ${d.accent}22, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-center justify-between">
        <span
          className="inline-block rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{ borderColor: `${d.accent}66`, color: d.accent }}
        >
          {d.category}
        </span>

        {/* Scanning radial indicator */}
        <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke={d.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="23 71"
            style={{ animation: "ringSpin 3.2s linear infinite", transformOrigin: "18px 18px" }}
          />
        </svg>
      </div>

      <h3 className="font-display relative mt-4 text-lg font-semibold text-white">{d.name}</h3>
      <p className="relative mt-2 text-sm text-white/60">{d.description}</p>

      {/* Live signal readout */}
      <div className="relative mt-auto flex items-center gap-2 border-t border-white/10 pt-3">
        <span className="text-[10px] uppercase tracking-wider text-white/40">Live feed</span>
        <svg viewBox="0 0 120 40" className="h-8 flex-1 overflow-visible" preserveAspectRatio="none">
          <path
            d={PULSE_PATH}
            fill="none"
            stroke={d.accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="14 10"
            style={{ animation: "sweep 2.8s linear infinite" }}
          />
        </svg>
      </div>
    </div>
  );
}

export default function DashboardLab() {
  return (
    <Section
      id="dashboards"
      eyebrow="04. Dashboard Lab"
      title="A futuristic analytics control room"
      description="20+ Power BI dashboards and 100+ dashboard pages across six business domains."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboards.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.06} y={30}>
            <DashboardCard d={d} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex flex-wrap justify-center gap-10">
        <div className="text-center">
          <p className="font-display text-4xl font-bold text-cyan-300">20+</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/50">Power BI Dashboards</p>
        </div>
        <div className="text-center">
          <p className="font-display text-4xl font-bold text-violet-300">100+</p>
          <p className="mt-1 text-xs uppercase tracking-wider text-white/50">Dashboard Pages Worked On</p>
        </div>
      </Reveal>
    </Section>
  );
}
