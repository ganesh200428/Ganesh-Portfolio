import { useEffect, useState } from "react";
import { tnJobMarketStats } from "../../../data/portfolio";

const DISTRICT_NODES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 15 + ((i * 37) % 80),
  y: 12 + ((i * 53) % 76),
  delay: i * 0.18,
}));

export default function TNJobMarketViz() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % DISTRICT_NODES.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070a18] sm:h-96">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        {DISTRICT_NODES.map((n, i) => {
          const next = DISTRICT_NODES[(i + 1) % DISTRICT_NODES.length];
          return (
            <line
              key={`l-${n.id}`}
              x1={n.x}
              y1={n.y}
              x2={next.x}
              y2={next.y}
              stroke="#22d3ee"
              strokeWidth={0.25}
              opacity={0.25}
            />
          );
        })}
        {DISTRICT_NODES.map((n, i) => (
          <circle
            key={n.id}
            cx={n.x}
            cy={n.y}
            r={active === i ? 2.6 : 1.4}
            fill={active === i ? "#22d3ee" : "#8b5cf6"}
            opacity={active === i ? 1 : 0.6}
            style={{ transition: "all 0.4s ease" }}
          >
            {active === i && <animate attributeName="r" values="1.4;3;1.4" dur="0.9s" />}
          </circle>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-x-6 gap-y-2 bg-gradient-to-t from-[#070a18] via-[#070a18]/90 to-transparent p-4">
        {tnJobMarketStats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-lg font-bold text-cyan-300">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
