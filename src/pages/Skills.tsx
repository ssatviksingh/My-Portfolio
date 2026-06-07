// src/pages/Skills.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/common/SectionHeading";
import { skills } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Cursor-based motion
  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;

      gsap.to(el, {
        x,
        y,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const blocks = sectionRef.current.querySelectorAll(".skill-block");

    gsap.fromTo(
      blocks,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <main className="relative px-6 pt-24 pb-20 overflow-hidden bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-brand-blue-light/10 dark:bg-brand-blue-light/15 blur-3xl" />

      <div ref={motionRef}>
        <div ref={sectionRef} className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Expertise"
            title="Technical Skills & Competence"
            subtitle="Categorized list of frameworks, methodologies, and toolsets I use to build mobile apps."
          />

          {/* Grouped Skills Grid */}
          <div className="grid gap-6 sm:grid-cols-2 mt-8">
            {skills.map((group) => (
              <div
                key={group.category}
                className="skill-block rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-brand-blue/50 dark:hover:border-brand-blue-light/50"
                data-cursor="card"
                data-cursor-label="STACK"
              >
                <h3 className="font-display text-base font-bold text-text-light-main dark:text-text-dark-main mb-4 border-l-2 border-brand-blue dark:border-brand-blue-light pl-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-xl bg-slate-100 dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-text-light-muted dark:text-text-dark-muted border border-slate-200/50 dark:border-slate-800/50 transition-colors hover:text-brand-blue dark:hover:text-brand-blue-light hover:border-brand-blue/20 dark:hover:border-brand-blue-light/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Core Philosophy Section */}
          <div className="mt-12 skill-block">
            <h2 className="font-display text-lg font-bold text-text-light-main dark:text-text-dark-main mb-4">
              My Engineering Philosophy
            </h2>
            <div className="grid gap-6 md:grid-cols-3 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-6 shadow-sm">
              {[
                {
                  title: "Figma-to-Code Accuracy",
                  desc: "Designing and scaling layout components to match high-fidelity screen designs without compromise across varied aspect ratios."
                },
                {
                  title: "CLI & Performance Optimization",
                  desc: "Using React Native CLI and native layouts to avoid bundle bloating, ensuring quick boot speeds and smooth re-renders."
                },
                {
                  title: "Production Focused",
                  desc: "Testing directly on physical devices to debug layout bottlenecks, offline-first behaviors, and dark mode transitions."
                }
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-blue dark:text-brand-blue-light">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Skills;
