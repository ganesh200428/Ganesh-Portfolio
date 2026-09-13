import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import TiltCard from "../ui/TiltCard";

const QUESTIONS = [
  "What's our finance run-rate this quarter?",
  "Show workforce cost by department.",
  "Which region is over budget?",
];

const ROLES = ["Executive", "Finance", "Workforce"];

const SPARK_POINTS = "0,26 10,20 20,23 30,12 40,16 50,6 60,10 70,4";

function KpiCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 2,
      repeat: -1,
      repeatDelay: 1.4,
      yoyo: true,
      ease: "power1.inOut",
      onUpdate: () => {
        el.textContent = `${prefix}${obj.val.toFixed(1)}${suffix}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [target, prefix, suffix]);

  return (
    <p ref={ref} className="font-display text-base font-bold text-cyan-200">
      {prefix}0{suffix}
    </p>
  );
}

export default function FinanceWorkspaceViz() {
  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQIndex((i) => (i + 1) % QUESTIONS.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative flex h-72 w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#070a18] p-5 sm:h-96 sm:p-6">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 animate-[float_6s_ease-in-out_infinite] rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-14 -left-10 h-40 w-40 animate-[float_7s_ease-in-out_infinite] rounded-full bg-violet-400/10 blur-3xl"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      />

      <div className="relative">
        <p className="mb-2 text-[10px] uppercase tracking-wider text-white/40">Natural Language Query</p>
        <div className="glass relative overflow-hidden rounded-xl px-4 py-3 font-mono text-sm text-cyan-200">
          <span
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"
            style={{ animation: "sweep 2.6s ease-in-out infinite" }}
            aria-hidden="true"
          />
          &ldquo;{QUESTIONS[qIndex]}&rdquo;
          <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-cyan-300 align-middle" />
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-3">
        <TiltCard intensity={12} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <KpiCounter target={2.4} prefix="$" suffix="M" />
          <p className="mt-1 text-[10px] uppercase tracking-wider text-white/50">KPI</p>
        </TiltCard>

        <TiltCard intensity={12} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <svg viewBox="0 0 70 30" className="mx-auto mb-1 h-8 w-full overflow-visible">
            <polyline
              points={SPARK_POINTS}
              fill="none"
              stroke="url(#sparkGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ strokeDasharray: 100, strokeDashoffset: 100, animation: "draw 2.4s ease-in-out infinite" }}
            />
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <p className="text-[10px] uppercase tracking-wider text-white/50">Trend</p>
        </TiltCard>

        <TiltCard intensity={12} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
          <div className="mx-auto mb-2 flex h-8 w-full flex-col justify-center gap-1">
            {[70, 45, 60].map((w, i) => (
              <span
                key={i}
                className="h-1 rounded-full bg-gradient-to-r from-cyan-300/70 to-violet-300/70"
                style={{
                  width: `${w}%`,
                  animation: `growWidth 2.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-white/50">Report</p>
        </TiltCard>
      </div>

      <div className="relative flex flex-wrap justify-center gap-2">
        {ROLES.map((role) => (
          <span
            key={role}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
          >
            {role} view
          </span>
        ))}
      </div>
    </div>
  );
}
