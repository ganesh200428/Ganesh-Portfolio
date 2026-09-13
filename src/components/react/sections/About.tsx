import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";
import { aboutFocusAreas, aboutStats, profile } from "../../../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

function ProfilePhoto() {
  return (
    <div className="relative mx-auto h-56 w-56 shrink-0 sm:mx-0 sm:h-64 sm:w-64">
      <div className="glow-border absolute inset-0 rounded-3xl text-cyan-400" />
      <TiltCard intensity={8} className="h-full w-full overflow-hidden rounded-3xl border border-white/15">
        <img
          src="/profile.png"
          alt={`${profile.name}, Data Analyst`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </TiltCard>
    </div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
        onUpdate: () => {
          el.textContent = `${Number.isInteger(value) ? Math.round(obj.val) : obj.val.toFixed(1)}${suffix}`;
        },
      });
    });
    return () => ctx.revert();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <Section id="about" eyebrow="01. About Me" className="bg-aurora">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            <ProfilePhoto />
            <div>
              <p className="font-display text-2xl leading-relaxed text-white md:text-3xl">
                I am a <span className="text-cyan-300">Data Analyst</span> focused on transforming raw data into
                meaningful insights, interactive dashboards, and practical business solutions.
              </p>
              <p className="mt-6 max-w-xl text-white/60">
                {profile.experienceYears} years turning stakeholder requirements into production-ready Power BI &
                Tableau dashboards, with SQL, Python, and a growing focus on AI-assisted analytics.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {aboutStats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center">
                <p className="font-display text-3xl font-bold text-cyan-300">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {aboutFocusAreas.map((area, i) => (
            <Reveal key={area} delay={i * 0.03} y={24}>
              <div
                data-cursor="object"
                className="glass group flex h-full items-center justify-center rounded-xl p-3 text-center text-xs font-medium text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-200 hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.6)]"
              >
                {area}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
