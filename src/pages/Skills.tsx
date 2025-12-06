// src/pages/Skills.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Cursor-based motion (KEEP)
  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;

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

     // Scroll reveal — only slide, no fade
  useEffect(() => {
    if (!sectionRef.current) return;

    const blocks = sectionRef.current.querySelectorAll(".skill-block");

    gsap.fromTo(
      blocks,
      { y: 40 },
      {
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);



  return (
    <main className="relative px-6 pt-24 pb-20 overflow-hidden bg-bg-dark">
      {/* background blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent-orange/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-muted-green/15 blur-3xl" />

      <div ref={motionRef}>
        <div ref={sectionRef} className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Skills"
            title="Tech I work with every day"
            subtitle="A curated set of tools and frameworks I use to build modern mobile apps."
          />

          {/* Tech I Use Daily */}
          <div className="mt-10 mb-14">
            <h2 className="font-display text-xl text-white mb-4">Tech I Use Daily</h2>

            <div className="flex gap-3 overflow-auto pb-3 rounded-xl border border-slate-800 bg-deep-blue-soft/60 p-4 shadow-soft-glow">
              {[
                "React Native",
                "TypeScript",
                "Expo",
                "Reanimated",
                "React Navigation",
                "Node.js",
                "MongoDB",
                "VS Code",
                "Postman",
              ].map((tech) => (
                <span
                  key={tech}
                  className="whitespace-nowrap rounded-full bg-black/40 px-4 py-2 text-sm text-text-main/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"] },
              {
                title: "Mobile Development",
                items: [
                  "React Native",
                  "Expo",
                  "Reanimated",
                  "Gesture Handler",
                  "Animations",
                  "UI/UX",
                ],
              },
              { title: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
              { title: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"] },
              { title: "Release", items: ["EAS Build", "OTA Updates", "Play Store", "App Store"] },
            ].map((sec) => (
              <div
                key={sec.title}
                className="skill-block rounded-3xl border border-slate-800 bg-deep-blue-soft/70 p-6 shadow-soft-glow"
              >
                <h3 className="font-display text-lg text-white mb-3">{sec.title}</h3>
                <ul className="text-sm text-text-muted space-y-1">
                  {sec.items.map((i) => (
                    <li key={i}>• {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Fun Facts */}
          <div className="mt-16">
            <h2 className="font-display text-xl text-white mb-4">Fun Facts</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 rounded-3xl border border-slate-800 bg-deep-blue-soft/60 p-6 shadow-soft-glow">
              {[
                "I’ve built 5+ React Native apps.",
                "I love crafting tiny animations in UI.",
                "I prefer Expo for 80% of projects.",
                "I design UI & write backend both.",
                "I test everything on real devices.",
                "I like building polished micro-interactions.",
              ].map((fact) => (
                <p key={fact} className="text-sm text-text-muted">• {fact}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Skills;
