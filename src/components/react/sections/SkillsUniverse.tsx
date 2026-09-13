import { useEffect, useMemo, useRef, useState } from "react";
import Section from "../ui/Section";
import { skillCategories, skills, type SkillNode } from "../../../data/portfolio";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

function fibonacciSphere(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push({ x: x * radius, y: y * radius, z: z * radius });
  }
  return points;
}

export default function SkillsUniverse() {
  const reducedMotion = useReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<SkillNode | null>(null);
  const rotation = useRef({ x: -14, y: 0 });
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const autoSpin = useRef(!reducedMotion);

  const positions = useMemo(() => fibonacciSphere(skills.length, 190), []);
  const colorFor = (cat: SkillNode["category"]) => skillCategories.find((c) => c.key === cat)?.color ?? "#22d3ee";

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (autoSpin.current && !dragging.current) {
        rotation.current.y += 0.12;
      }
      if (groupRef.current) {
        groupRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    rotation.current.y += dx * 0.3;
    rotation.current.x = Math.max(-70, Math.min(70, rotation.current.x - dy * 0.3));
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };
  const endDrag = () => (dragging.current = false);

  return (
    <Section
      id="skills"
      eyebrow="Skills Universe"
      title="A universe of tools I work with"
      description="Drag to rotate. Hover any node to see how it connects to my analytics work."
    >
      <div className="mb-8 flex flex-wrap gap-4">
        {skillCategories.map((c) => (
          <div key={c.key} className="flex items-center gap-2 text-xs text-white/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
            {c.key}
          </div>
        ))}
      </div>

      <div
        className="relative mx-auto h-[420px] w-full max-w-2xl select-none md:h-[520px]"
        style={{ perspective: "1000px" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <div
          ref={groupRef}
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(-14deg) rotateY(0deg)" }}
        >
          {skills.map((skill, i) => {
            const p = positions[i];
            const color = colorFor(skill.category);
            const isRelated = hovered?.category === skill.category;
            const dim = hovered && !isRelated;
            return (
              <div
                key={skill.name}
                data-cursor="object"
                onPointerEnter={() => setHovered(skill)}
                onPointerLeave={() => setHovered(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300"
                style={{
                  transform: `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, ${p.z.toFixed(1)}px) translate(-50%, -50%)`,
                  background: isRelated ? `${color}33` : "rgba(255,255,255,0.06)",
                  border: `1px solid ${isRelated ? color : "rgba(255,255,255,0.15)"}`,
                  color: isRelated ? "#fff" : "rgba(255,255,255,0.8)",
                  opacity: dim ? 0.25 : 1,
                  boxShadow: isRelated ? `0 0 18px ${color}` : "none",
                }}
              >
                {skill.name}
              </div>
            );
          })}
        </div>

        {hovered && (
          <div className="glass pointer-events-none absolute bottom-0 left-1/2 w-[90%] -translate-x-1/2 rounded-xl p-4 text-center sm:w-80">
            <p className="font-display text-sm font-semibold" style={{ color: colorFor(hovered.category) }}>
              {hovered.name}
            </p>
            <p className="mt-1 text-xs text-white/60">{hovered.description}</p>
          </div>
        )}
      </div>
    </Section>
  );
}
