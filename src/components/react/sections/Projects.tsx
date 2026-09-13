import { lazy, Suspense } from "react";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import TiltCard from "../ui/TiltCard";
import TNJobMarketViz from "../projects/TNJobMarketViz";
import NLSQLDemo from "../projects/NLSQLDemo";
import InfraViz from "../projects/InfraViz";
import FinanceWorkspaceViz from "../projects/FinanceWorkspaceViz";
import { githubProjects } from "../../../data/portfolio";

const GlobeViz = lazy(() => import("../projects/GlobeViz"));

const GITHUB_ACCENTS = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399"];

const scrollToContact = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

function Tag({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "amber" }) {
  const colors = tone === "amber" ? "border-orange-400/40 text-orange-300 bg-orange-400/10" : "border-cyan-400/40 text-cyan-300 bg-cyan-400/10";
  return <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${colors}`}>{children}</span>;
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03. Project Universe"
      title="Each project is its own data world"
      description="From live analytics products to AI-powered demos. Portfolio work is clearly separated from professional experience."
    >
      <div className="flex flex-col gap-20">
        {/* Project 1: TN Job Market Pulse (dominant) */}
        <Reveal>
          <TiltCard intensity={4} className="glass overflow-hidden rounded-3xl p-6 md:p-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Tag>Portfolio / Educational Analytics Project</Tag>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="font-display text-3xl font-bold text-white md:text-4xl">TN Job Market Pulse</h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-cyan-300">
                  Tamil Nadu Private Job Market Analytics
                </p>
                <p className="mt-4 text-white/70">
                  An interactive analytics project exploring private-sector job demand across Tamil Nadu: district
                  analysis, sector analysis, salary analysis, fresher opportunities, qualification analysis, company
                  insights and an AI exposure outlook.
                </p>
                <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/5 p-3 text-xs text-amber-200/90">
                  Job postings represent observed postings, not total employment. AI exposure does not mean job
                  replacement. Scenario analysis is not a prediction.
                </p>
                <a
                  data-cursor="project"
                  href="https://tnjobmarketpulse.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-border mt-6 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-[#05060f] transition-transform hover:scale-105"
                >
                  Explore Dashboard ↗
                </a>
              </div>
              <TNJobMarketViz />
            </div>
          </TiltCard>
        </Reveal>

        {/* Project 2: Tech Workforce Intelligence */}
        <Reveal>
          <TiltCard intensity={3} className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <Tag>Portfolio / Educational Analytics Project</Tag>
              <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">Tech Workforce Intelligence</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-violet-300">
                Global Layoffs &amp; Workforce Trends
              </p>
              <p className="mt-4 text-white/70">
                A visualization exploring technology workforce layoffs and employment trends across companies,
                industries, countries and time, built to practice global-scale data storytelling.
              </p>
              <a
                data-cursor="project"
                href="https://tech-workforce-intelligence.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-border mt-6 inline-flex rounded-full bg-violet-300 px-6 py-3 text-sm font-semibold text-[#05060f] transition-transform hover:scale-105"
              >
                View Analysis ↗
              </a>
            </div>
            <Suspense fallback={<div className="h-72 w-full animate-pulse rounded-2xl border border-white/10 bg-[#070a18] sm:h-96" />}>
              <GlobeViz />
            </Suspense>
          </TiltCard>
        </Reveal>

        {/* Project 3: NL to SQL */}
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-10">
            <Tag>Portfolio / Educational Analytics Project</Tag>
            <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">
              AI-Powered Natural Language SQL Analytics
            </h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-emerald-300">
              Python · FastAPI · MySQL · Azure OpenAI · SQL
            </p>
            <p className="mt-4 max-w-3xl text-white/70">
              A demonstration of how natural language can query a database: type a question, watch it flow from
              language to AI to SQL to the database, then straight into a chart.
            </p>
            <div className="mt-6">
              <NLSQLDemo />
            </div>
          </div>
        </Reveal>

        {/* Project 4: Highway Monitor */}
        <Reveal>
          <TiltCard intensity={3} className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">Highway Monitor</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-orange-300">
                Road Construction Dashboard
              </p>
              <p className="mt-4 text-white/70">
                Built as a prototype as part of my professional data analytics work: a $443M road construction
                dashboard combining GIS mapping, financial KPIs and compliance scorecards, enabling real-time
                executive oversight across 765 km and 3 districts.
              </p>
              <button
                data-cursor="button"
                onClick={scrollToContact}
                className="glass mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Ask About This Work
              </button>
            </div>
            <InfraViz />
          </TiltCard>
        </Reveal>

        {/* Project 5: Finance Workspace */}
        <Reveal>
          <TiltCard intensity={3} className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">Finance Workspace</h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-wider text-cyan-300">
                AI-Powered Finance Analytics Platform
              </p>
              <p className="mt-4 text-white/70">
                Delivered as part of my professional data analytics work: an AI-powered finance analytics
                platform with natural language querying, executive KPI dashboards and role-based reporting, enabling
                leadership self-service on financial and workforce data.
              </p>
              <button
                data-cursor="button"
                onClick={scrollToContact}
                className="glass mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              >
                Ask About This Work
              </button>
            </div>
            <FinanceWorkspaceViz />
          </TiltCard>
        </Reveal>

        {/* More portfolio projects on GitHub */}
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-10">
            <Tag>Portfolio / Educational Analytics Project</Tag>
            <h3 className="font-display mt-4 text-2xl font-bold text-white md:text-3xl">More on GitHub</h3>
            <p className="mt-2 max-w-3xl text-white/70">
              A few additional analytics projects I've built to practice end-to-end data work, from cleaning to
              modeling to insight.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {githubProjects.map((p, i) => {
                const accent = GITHUB_ACCENTS[i % GITHUB_ACCENTS.length];
                return (
                  <TiltCard key={p.repo} intensity={6} className="h-full">
                    <a
                      data-cursor="project"
                      href={`https://github.com/ganesh200428/${p.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/25"
                      style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.03)` }}
                    >
                      <div
                        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                        style={{ background: accent }}
                        aria-hidden="true"
                      />

                      <div className="flex items-start justify-between gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors group-hover:border-white/30 group-hover:text-white"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path d="M12 .5A11.5 11.5 0 0 0 8.37 22.94c.57.1.78-.25.78-.55v-1.94c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.64 1.6.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.17v3.22c0 .3.2.66.79.55A11.5 11.5 0 0 0 12 .5Z" />
                          </svg>
                        </span>
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-cyan-300/50 group-hover:text-cyan-300"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M7 17 17 7M7 7h10v10" />
                          </svg>
                        </span>
                      </div>

                      <h4 className="font-display mt-4 text-sm font-semibold text-white">{p.name}</h4>
                      <p className="mt-2 text-xs text-white/60">{p.description}</p>
                    </a>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
