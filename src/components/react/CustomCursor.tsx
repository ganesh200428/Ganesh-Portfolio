import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(900);
  const [variant, setVariant] = useState<"default" | "button" | "project" | "object">("default");

  useEffect(() => {
    if (isMobile) return;
    document.documentElement.classList.add("cursor-enabled");

    let ringX = 0;
    let ringY = 0;
    let targetX = 0;
    let targetY = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      const attr = target?.getAttribute("data-cursor") as typeof variant | undefined;
      setVariant(attr && ["button", "project", "object"].includes(attr) ? attr : "default");
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-enabled");
    };
  }, [isMobile]);

  if (isMobile) return null;

  const ringSize = variant === "default" ? 32 : variant === "button" ? 56 : variant === "project" ? 90 : 48;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_2px_rgba(34,211,238,0.9)]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor:
            variant === "project" ? "rgba(236,72,153,0.7)" : variant === "button" ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.35)",
          willChange: "transform",
        }}
      >
        {variant === "project" && <span className="text-[10px] uppercase tracking-widest text-white/80">View</span>}
      </div>
    </div>
  );
}
