import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dataStorySteps } from "../../../data/portfolio";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useIsMobile } from "../../../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function DataStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Desktop: pinned scrollytelling driven by page scroll (mouse wheel handles this fine).
  useEffect(() => {
    if (reducedMotion || isMobile) return;
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
  }, [reducedMotion, isMobile]);

  // Mobile: ditch scroll-jacking entirely. A native swipeable card carousel drives the
  // active step, so the page's vertical scroll is never hijacked or fought over.
  useEffect(() => {
    if (!isMobile) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cardWidth = track.scrollWidth / dataStorySteps.length;
        const idx = Math.round(track.scrollLeft / cardWidth);
        setActive(Math.max(0, Math.min(dataStorySteps.length - 1, idx)));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const goTo = (i: number) => {
    setActive(i);
    const card = trackRef.current?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="data-story" ref={sectionRef} className="relative flex min-h-screen w-full items-center overflow-hidden bg-aurora px-6 py-24 md:px-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="eyebrow mb-3">Data Tells A Story</p>
        <h2 className="font-display mb-14 text-3xl font-semibold text-white md:text-5xl">
          From raw numbers to real decisions
        </h2>

        {isMobile ? (
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {dataStorySteps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => goTo(i)}
                  className="flex w-36 shrink-0 snap-center flex-col items-center gap-3 rounded-2xl border px-4 py-6 text-center font-display text-sm font-semibold transition-all duration-300"
                  style={{
                    borderColor: isActive ? "#22d3ee" : "rgba(255,255,255,0.12)",
                    color: isActive ? "#e0fbff" : "rgba(255,255,255,0.45)",
                    background: isActive ? "rgba(34,211,238,0.14)" : "rgba(255,255,255,0.03)",
                    boxShadow: isActive ? "0 20px 45px -10px rgba(34,211,238,0.55)" : "none",
                    transform: isActive ? "scale(1.05)" : "scale(0.94)",
                  }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full border text-xs"
                    style={{ borderColor: isActive ? "#22d3ee" : "rgba(255,255,255,0.2)" }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="relative overflow-visible pb-6 [perspective:1400px]">
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
          </div>
        )}

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

        <p className="mt-10 max-w-2xl text-white/60">
          Every dashboard I build follows this exact journey: messy source data becomes a validated model, a clear
          visualization, and finally a decision a stakeholder can act on.
        </p>
        {isMobile && <p className="mt-2 text-xs text-white/30">Swipe the cards above to explore the pipeline →</p>}
      </div>
    </section>
  );
}
