import { useReducedMotion, setManualReducedMotion } from "../../hooks/useReducedMotion";

export default function MotionToggle() {
  const reduced = useReducedMotion();

  return (
    <button
      data-cursor="button"
      onClick={() => setManualReducedMotion(!reduced)}
      className="glass fixed bottom-5 right-5 z-40 rounded-full px-4 py-2 text-[11px] font-semibold text-white/70 transition-colors hover:text-cyan-300"
      aria-pressed={reduced}
    >
      {reduced ? "Motion: Reduced" : "Motion: Full"}
    </button>
  );
}
