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

  // Cursor parallax
  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;

      gsap.to(el, { x, y, duration: 0.6, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!sectionRef.current) return;

    const blocks = sectionRef.current.querySelectorAll(".about-block");

    gsap.fromTo(
      blocks,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.1,
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
    <main className="relative px-6 pt-24 pb-20 overflow-hidden bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 bg-brand-blue-light/10 dark:bg-brand-blue-light/15 rounded-full blur-3xl" />

      <div ref={motionRef}>
        <div ref={sectionRef} className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="Profile"
            title="Who I am & How I Build"
            subtitle="React Native developer focused on Figma-to-code pixel-accurate mobile UI implementations."
          />

          {/* Story Card */}
          <div className="about-block rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm text-text-light-muted dark:text-text-dark-muted text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              I am a focused **React Native Developer** specializing in creating highly responsive, pixel-accurate mobile user interfaces from Figma specifications. Currently, I serve as the **Sole React Native Developer** at **WayGood Edtech Private Limited**, where I own the HelpStudyAbroad mobile app development lifecycle, targeting the Google Play Store launch.
            </p>
            <p>
              My engineering approach is driven by a B.Tech degree in **Computer Science & Engineering (Artificial Intelligence and Machine Learning)** from **SRM Institute of Science and Technology**. I leverage strong algorithmic foundations to manage application state, caching layers, and responsive UI layout efficiency.
            </p>
            <p>
              I specialize in creating custom component libraries, dual (light/dark) theme systems, offline SOS queues, and clean REST API integrations that run smoothly on real-world Android and iOS devices.
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid gap-6 mt-8 sm:grid-cols-3">
            {[
              { label: "Mobile App Screens Built", value: 35 },
              { label: "B.Tech CSE (AI & ML) SRM", value: 2025 },
              { label: "Freelance Direct Channels", value: 5 },
            ].map((stat) => (
              <div
                key={stat.label}
                className="about-block rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 text-center shadow-sm"
              >
                <p className="stat-number font-display text-3xl font-extrabold text-brand-blue dark:text-brand-blue-light" data-value={stat.value}>
                  0
                </p>
                <p className="mt-2 text-xs font-semibold text-text-light-muted dark:text-text-dark-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Timeline Section */}
          <div className="mt-16">
            <h2 className="font-display text-xl font-bold mb-6 border-b border-slate-200 dark:border-slate-800 pb-2">
              Timeline & Journey
            </h2>

            <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 space-y-8">
              {[
                {
                  year: "2024 - Present",
                  title: "Sole React Native Developer (Intern) — WayGood Edtech",
                  description: "Took complete ownership of HelpStudyAbroad mobile application. Translated 20+ Figma mockups into a responsive, modular app utilizing React Native CLI and TypeScript. Implemented a custom dark/light theme toggle system and live REST APIs."
                },
                {
                  year: "2021 - 2025",
                  title: "B.Tech CSE (AI & ML) — SRM Institute of Science and Technology",
                  description: "Rigorous coursework in core computer science, software design, mathematical logic, and machine learning architectures."
                },
                {
                  year: "2023",
                  title: "Independent Mobile CLI Engineer",
                  description: "Designed multi-device compatible, performance-optimized clone applications and personal tools to master React Native CLI navigation and AsyncStorage."
                }
              ].map((item) => (
                <div key={item.title} className="relative pl-6 about-block">
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-blue dark:bg-brand-blue-light" />
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light">
                    {item.year}
                  </span>
                  <h3 className="text-sm font-bold text-text-light-main dark:text-text-dark-main mt-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                    {item.description}
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

export default About;
