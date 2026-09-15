import { useEffect, useState } from "react";
import { navLinks } from "../../data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 w-[94%] max-w-6xl -translate-x-1/2 transition-all duration-500 md:top-6 ${
        scrolled ? "scale-[0.97]" : "scale-100"
      }`}
    >
      <nav className="glass-nav flex items-center justify-between rounded-full px-4 py-2.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] md:px-6 md:py-3">
        <a
          href="#home"
          data-cursor="button"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="font-display text-sm font-semibold tracking-wide text-white md:text-base"
        >
          GS<span className="text-cyan-300">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                  active === link.href ? "bg-white/10 text-cyan-300" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          data-cursor="button"
          onClick={() => setOpen((o) => !o)}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-white transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span className={`absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-white transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="glass-nav mt-3 rounded-3xl p-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className={`block rounded-xl px-4 py-2.5 text-sm font-medium ${
                    active === link.href ? "bg-white/10 text-cyan-300" : "text-white/70"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
