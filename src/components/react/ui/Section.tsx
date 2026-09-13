import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, eyebrow, title, description, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`relative w-full px-6 py-24 md:px-12 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(eyebrow || title) && (
          <div className="mb-12 md:mb-16">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {title}
              </h2>
            )}
            {description && <p className="mt-4 max-w-2xl text-base text-white/60 md:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
