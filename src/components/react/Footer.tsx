import { profile } from "../../data/portfolio";

export default function Footer() {
  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
    { label: "Email", href: `mailto:${profile.email}` },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-void px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-white">{profile.name}, Data Analyst</p>
          <p className="text-sm text-white/50">Turning data into insights.</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-white/60">
          {links.map((l, i) => (
            <span key={l.label} className="flex items-center gap-2">
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-cyan-300"
              >
                {l.label}
              </a>
              {i < links.length - 1 && <span className="text-white/20">|</span>}
            </span>
          ))}
        </nav>

        <p className="text-xs text-white/30">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
