import { lazy, Suspense, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "../../../data/portfolio";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useIsMobile } from "../../../hooks/useIsMobile";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
      scrollProgress.current = progress;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [mounted]);

  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" ref={sectionRef} className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-void">
      <div className="absolute inset-0">
        {mounted && (
          <Suspense fallback={null}>
            <HeroScene scrollProgress={scrollProgress} reducedMotion={reducedMotion || isMobile} isMobile={isMobile} />
          </Suspense>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 38% at 50% 46%, rgba(5,6,15,0.55) 0%, rgba(5,6,15,0.2) 55%, transparent 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <h1 className="hero-reveal font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl md:text-8xl">
          {profile.name}
        </h1>
        <h2 className="hero-reveal font-display mt-3 text-xl font-medium tracking-[0.3em] text-cyan-300 sm:text-2xl">
          {profile.role.toUpperCase()}
        </h2>
        <p className="hero-reveal mt-6 max-w-2xl text-base text-white/70 sm:text-lg">{profile.tagline}</p>

        <div className="hero-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            data-cursor="button"
            onClick={() => scrollTo("#projects")}
            className="glow-border rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#05060f] transition-transform hover:scale-105"
          >
            Explore My Work
          </button>
          <button
            data-cursor="button"
            onClick={() => scrollTo("#contact")}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-cyan-300 hover:text-cyan-300"
          >
            Let&apos;s Connect
          </button>
        </div>
      </div>

      <div className="hero-reveal absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <div className="mx-auto h-9 w-6 rounded-full border border-white/30 p-1">
          <div className="mx-auto h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" />
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</p>
      </div>
    </section>
  );
}
