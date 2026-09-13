import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const STAGES = ["Natural Language", "AI", "SQL", "Database", "Result", "Chart"];
const QUERY = "Show me monthly sales for the last 6 months.";
const SQL = "SELECT month, SUM(sales)\nFROM orders\nGROUP BY month\nORDER BY month;";
const RESULT = [
  { month: "Apr", sales: 42 },
  { month: "May", sales: 58 },
  { month: "Jun", sales: 51 },
  { month: "Jul", sales: 67 },
  { month: "Aug", sales: 73 },
  { month: "Sep", sales: 81 },
];

export default function NLSQLDemo() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  const run = () => {
    if (running) return;
    setRunning(true);
    setStep(0);
    let s = 0;
    const interval = setInterval(() => {
      s += 1;
      setStep(s);
      if (s >= STAGES.length - 1) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 650);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#070a18] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {STAGES.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
                i <= step ? "border-cyan-300 bg-cyan-400/10 text-cyan-200" : "border-white/15 text-white/40"
              }`}
            >
              {s}
            </span>
            {i < STAGES.length - 1 && <span className="text-white/20">→</span>}
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <div className="rounded-xl bg-black/30 p-4 font-mono text-sm text-white/80">
            <span className="text-white/40">$ </span>
            {QUERY}
          </div>
          {step >= 2 && (
            <pre className="whitespace-pre-wrap rounded-xl bg-black/30 p-4 font-mono text-xs text-emerald-300">{SQL}</pre>
          )}
          <button
            data-cursor="button"
            onClick={run}
            disabled={running}
            className="rounded-full bg-cyan-300 px-5 py-2 text-xs font-semibold text-[#05060f] transition-transform hover:scale-105 disabled:opacity-50"
          >
            {running ? "Running…" : "Run Query"}
          </button>
        </div>

        <div className="h-48 rounded-xl bg-black/20 p-3">
          {step >= 5 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESULT}>
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "#0d1224", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Bar dataKey="sales" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-white/30">Chart appears after query runs</div>
          )}
        </div>
      </div>
    </div>
  );
}
