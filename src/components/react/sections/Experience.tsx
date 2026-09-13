import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { experience, education } from "../../../data/portfolio";

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02. Professional Experience"
      title="Where the data work happens"
      description="An interactive timeline of the roles, dashboards, and production support behind the numbers."
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-violet-400/40 to-transparent md:left-1/2" />

        <div className="flex flex-col gap-16">
          {experience.map((item, i) => (
            <div key={item.id} className={`relative flex flex-col gap-6 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_4px_rgba(34,211,238,0.6)] md:left-1/2" />

              <div className="w-full pl-10 md:w-1/2 md:pl-0">
                <Reveal y={40} className={i % 2 === 1 ? "md:pl-12" : "md:pr-12 md:text-right"}>
                  <div className="glass rounded-2xl p-6 md:p-8">
                    <p className="font-display text-xs uppercase tracking-widest text-cyan-300">{item.period}</p>
                    <h3 className="font-display mt-2 text-xl font-semibold text-white md:text-2xl">{item.role}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {item.org} · {item.location}
                    </p>
                    <p className="mt-4 text-sm text-white/70">{item.summary}</p>

                    <ul className={`mt-5 space-y-2 text-sm text-white/60 ${i % 2 === 1 ? "" : "md:text-right"}`}>
                      {item.points.map((point, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}

          {education.map((edu) => (
            <Reveal key={edu.institution} className="relative pl-10 md:mx-auto md:w-1/2 md:pl-0 md:text-center">
              <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/40 md:left-1/2" />
              <div className="glass mt-1 rounded-2xl p-6">
                <p className="font-display text-xs uppercase tracking-widest text-white/40">{edu.period}</p>
                <h3 className="font-display mt-2 text-lg font-semibold text-white">{edu.degree}</h3>
                <p className="mt-1 text-sm text-white/60">{edu.institution}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
