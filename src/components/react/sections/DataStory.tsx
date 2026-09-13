import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataStorySteps } from "../../../data/portfolio";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function DataStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(dataStorySteps.length - 1, Math.floor(self.progress * dataStorySteps.length));
          setActive(idx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="data-story" ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-aurora px-6 py-24 md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">Data Tells A Story</p>
        <h2 className="font-display mb-14 text-3xl font-semibold text-white md:text-5xl">
          From raw numbers to real decisions
        </h2>

        <div className="relative overflow-x-auto overflow-y-hidden pb-6 [perspective:1400px] md:overflow-visible">
          <div className="flex min-w-max items-center justify-center gap-1 md:gap-2">
            {dataStorySteps.map((step, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              const rotateY = offset === 0 ? 0 : offset > 0 ? -30 : 30;
              const translateZ = offset === 0 ? 50 : -abs * 40;
              const scale = offset === 0 ? 1.12 : Math.max(0.72, 1 - abs * 0.12);
              const opacity = offset === 0 ? 1 : Math.max(0.25, 1 - abs * 0.28);

              return (
                <div key={step} className="relative flex flex-col items-center px-2 md:px-3" style={{ zIndex: 10 - abs }}>
                  <div
                    className="w-28 rounded-2xl border px-3 py-5 text-center font-display text-xs font-semibold transition-all duration-500 ease-out sm:w-36 md:w-40 md:px-4 md:py-6 md:text-base"
                    style={{
                      transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
                      transformStyle: "preserve-3d",
                      opacity,
                      borderColor: offset === 0 ? "#22d3ee" : "rgba(255,255,255,0.12)",
                      color: offset === 0 ? "#e0fbff" : "rgba(255,255,255,0.45)",
                      background: offset === 0 ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.03)",
                      boxShadow: offset === 0 ? "0 20px 45px -10px rgba(34,211,238,0.55)" : "none",
                    }}
                  >
                    <span
                      className="mx-auto mb-2 flex h-6 w-6 items-center justify-center rounded-full border text-[10px]"
                      style={{ borderColor: offset === 0 ? "#22d3ee" : "rgba(255,255,255,0.2)" }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative mx-auto mt-8 h-1 w-full max-w-2xl overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 transition-all duration-500 ease-out"
              style={{ width: `${((active + 1) / dataStorySteps.length) * 100}%` }}
            />
            <span
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out"
              style={{ left: `${((active + 1) / dataStorySteps.length) * 100}%`, animation: "flowDot 1.6s ease-in-out infinite" }}
            />
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-white/60">
          Every dashboard I build follows this exact journey: messy source data becomes a validated model, a clear
          visualization, and finally a decision a stakeholder can act on.
        </p>
      </div>
    </section>
  );
}
