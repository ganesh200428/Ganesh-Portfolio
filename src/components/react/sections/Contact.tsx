import { lazy, Suspense, useEffect, useState } from "react";
import Reveal from "../ui/Reveal";
import { profile } from "../../../data/portfolio";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { useIsMobile } from "../../../hooks/useIsMobile";

const ContactSphere = lazy(() => import("../contact/ContactSphere"));

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => setMounted(true), []);

  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <section id="contact" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-aurora" />
      {mounted && !reducedMotion && (
        <Suspense fallback={null}>
          <ContactSphere isMobile={isMobile} />
        </Suspense>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

      <Reveal className="relative z-10 mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">Get In Touch</p>
        <h2 className="font-display text-3xl font-bold text-white sm:text-5xl">Let&apos;s build something with data</h2>
        <p className="mt-5 text-white/70">
          Have a dataset, dashboard idea, analytics problem, or AI-powered data concept? Let&apos;s connect.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              data-cursor="button"
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="glass rounded-full px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:border-cyan-300/50 hover:text-cyan-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/40">
          {profile.email} · {profile.location} · Ph: {profile.phone}
        </p>
      </Reveal>
    </section>
  );
}
