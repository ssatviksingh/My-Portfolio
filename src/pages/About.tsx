// src/pages/About.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../components/common/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  // Cursor parallax — KEEP
  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 40;
      const y = (e.clientY - window.innerHeight / 2) / 40;

      gsap.to(el, { x, y, duration: 0.6, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

    // Scroll reveal — ONLY slight slide, no fade
  useEffect(() => {
    if (!sectionRef.current) return;

    const blocks = sectionRef.current.querySelectorAll(".about-block");

    gsap.fromTo(
      blocks,
      { y: 40 },
      {
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);


  // Stats counter animation
  useEffect(() => {
    if (!statsRef.current) return;
    const numbers = statsRef.current.querySelectorAll(".stat-number");

    numbers.forEach((n) => {
      const end = Number(n.getAttribute("data-value"));

      gsap.fromTo(
        n,
        { innerText: 0 },
        {
          innerText: end,
          duration: 1.5,
          ease: "power1.out",
          snap: { innerText: 1 },
          scrollTrigger: { trigger: n, start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <main className="relative px-6 pt-24 pb-20 overflow-hidden bg-bg-dark">
      {/* background glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 bg-accent-orange/15 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 bg-muted-green/15 rounded-full blur-3xl" />

      <div ref={motionRef}>
        <div ref={sectionRef} className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="About"
            title="Who I am & how I build"
            subtitle="A developer focused on smooth, thoughtful mobile app experiences."
          />

          {/* Story */}
          <div className="about-block rounded-3xl bg-deep-blue-soft/70 border border-slate-800 p-6 shadow-soft-glow text-text-muted text-sm leading-relaxed">
            I build mobile apps that feel smooth, polished, and reliable. My focus is React
            Native + TypeScript, where I combine animations, performance techniques, and clean
            architecture to create modern user-first experiences.
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid gap-6 mt-10 sm:grid-cols-3">
            {[
              { label: "Apps Built", value: 6 },
              { label: "Tech Stack Items", value: 10 },
              { label: "Years Experience", value: 3 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="about-block rounded-3xl bg-deep-blue-soft/60 border border-slate-800 p-6 text-center shadow-soft-glow"
              >
                <p className="stat-number font-display text-3xl text-white" data-value={stat.value}>
                  0
                </p>
                <p className="mt-2 text-xs text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <h2 className="font-display text-xl text-white mb-4">Journey Timeline</h2>

            <div className="space-y-6">
              {[
                { year: "2022", text: "Started learning React Native." },
                { year: "2023", text: "Built several apps, focused on UI/UX and animations." },
                { year: "2024", text: "Shifted to TS, backend APIs, and DevOps (EAS)." },
                { year: "2025", text: "Building polished apps with advanced UI interactions." },
              ].map((item) => (
                <div
                  key={item.year}
                  className="about-block rounded-3xl bg-deep-blue-soft/60 border border-slate-800 p-5 shadow-soft-glow"
                >
                  <p className="text-accent-gold text-sm">{item.year}</p>
                  <p className="mt-1 text-sm text-text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
