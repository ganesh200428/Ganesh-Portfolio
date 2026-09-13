import { highwayMonitorStats } from "../../../data/portfolio";

// Road edges interpolated between the top vanishing point (138–162 @ y=8) and the
// bottom edge (50–250 @ y=140), used to keep markers and rungs aligned to the corridor.
const roadLeft = (y: number) => 138 + ((y - 8) / 132) * (50 - 138);
const roadRight = (y: number) => 162 + ((y - 8) / 132) * (250 - 162);

const RUNGS = [118, 96, 74, 52, 30];

const DISTRICTS = [
  { y: 112, r: 5 },
  { y: 74, r: 4 },
  { y: 40, r: 3 },
];

export default function InfraViz() {
  return (
    <div className="glass relative flex h-72 w-full flex-col overflow-hidden rounded-2xl sm:h-96">
      <svg viewBox="0 0 300 140" className="h-44 w-full flex-1 sm:h-64">
        <defs>
          <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#243049" />
            <stop offset="100%" stopColor="#0c1120" />
          </linearGradient>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d1f3a" />
            <stop offset="100%" stopColor="#070a18" />
          </linearGradient>
          <radialGradient id="horizonGlow" cx="50%" cy="0%" r="60%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="300" height="140" fill="url(#skyGrad)" />
        <ellipse cx="150" cy="8" rx="90" ry="40" fill="url(#horizonGlow)" />

        {/* Receding highway toward a vanishing point, evoking the GIS-mapped road corridor */}
        <polygon points="138,8 162,8 250,140 50,140" fill="url(#roadGrad)" stroke="#f97316" strokeOpacity="0.3" />

        {/* Perspective distance rungs across the corridor */}
        {RUNGS.map((y, i) => (
          <line
            key={y}
            x1={roadLeft(y)}
            y1={y}
            x2={roadRight(y)}
            y2={y}
            stroke="#f97316"
            strokeWidth="1"
            opacity={0.14 + i * 0.02}
          />
        ))}

        {/* Center lane markings animating toward the viewer */}
        <line
          x1="150"
          y1="8"
          x2="150"
          y2="140"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeDasharray="10 14"
          strokeLinecap="round"
          opacity="0.8"
        >
          <animate attributeName="stroke-dashoffset" values="0;-48" dur="1.4s" repeatCount="indefinite" />
        </line>

        {/* District checkpoints tracked beside the corridor */}
        {DISTRICTS.map((d, i) => {
          const edgeX = roadRight(d.y);
          const markerX = edgeX + 16;
          return (
            <g key={i}>
              <line x1={edgeX} y1={d.y} x2={markerX - d.r} y2={d.y} stroke="#f97316" strokeWidth="1" opacity="0.4" />
              <circle cx={markerX} cy={d.y} r={d.r} fill="#f97316">
                <animate attributeName="opacity" values="1;0.55;1" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={markerX} cy={d.y} r={d.r} fill="none" stroke="#f97316" strokeWidth="1.2">
                <animate attributeName="r" values={`${d.r};${d.r + 7};${d.r}`} dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2.2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}

        {/* Live GIS tracking pulses travelling the highway */}
        {[0, 1.2, 2.4].map((delay, i) => (
          <circle key={i} r="3" fill="#22d3ee">
            <animateMotion path="M148,140 L150,8" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.85;1" dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      <div className="flex flex-col gap-2 border-t border-white/10 p-4 sm:flex-row sm:justify-around">
        {highwayMonitorStats.map((k) => (
          <div key={k.label} className="text-center">
            <p className="font-display text-lg font-bold text-orange-300">{k.value}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/50">{k.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
