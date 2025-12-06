// src/pages/Home.tsx
import React, { useEffect, useRef } from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);

  // HERO animations (stagger + floating)
  useEffect(() => {
    const heroEl = heroRef.current;
    const floatingEl = floatingRef.current;
    if (!heroEl || !floatingEl) return;

    const ctx = gsap.context(() => {
      // Stagger hero headline + text
      gsap.fromTo(
        heroEl.querySelectorAll('.hero-line'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
        },
      );

      // Gentle floating motion for the stack card
      gsap.to(floatingEl, {
        y: -10,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  // ABOUT section scroll-in animation
  useEffect(() => {
    const aboutEl = aboutRef.current;
    if (!aboutEl) return;

    const ctx = gsap.context(() => {
      const targets = aboutEl.querySelectorAll('.about-animate');
      if (!targets.length) return;

      gsap.from(targets, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutEl,
          start: 'top 85%',
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  // Shared parallax for hero + about container
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
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <main className="relative overflow-hidden bg-bg-dark">
      {/* shared background glow blobs for BOTH hero + about */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-accent-orange/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-muted-green/20 blur-3xl" />

      {/* everything that moves slightly with cursor */}
      <div ref={motionRef} className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex min-h-[80vh] items-center px-6 pt-24 sm:px-10 lg:px-20">
          <div
            ref={heroRef}
            className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center"
          >
            {/* LEFT SIDE – TEXT */}
            <div className="flex-1 space-y-6">
              <p className="hero-line inline-flex rounded-full border border-accent-gold/40 bg-deep-blue-soft/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-gold">
                Portfolio · Mobile · Developer
              </p>

              <h1 className="hero-line font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
                Crafting immersive mobile{' '}
                <span className="bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green bg-clip-text text-transparent">
                  experiences
                </span>
                .
              </h1>

              <p className="hero-line max-w-xl text-sm sm:text-base text-text-muted">
                I design and build performant mobile apps for <b>Android</b> and <b>iOS</b>{' '}
                using React Native, TypeScript, and modern tooling — with a focus on smooth
                animations, clean architecture, and a polished user experience.
              </p>

              <div className="hero-line flex flex-wrap gap-4">
                <Link
                  to="/portfolio"
                  className="rounded-2xl bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green px-6 py-3 text-sm font-medium text-bg-dark shadow-soft-glow transition hover:brightness-110 hover:-translate-y-0.5"
                >
                  View my apps
                </Link>
                <Link
                  to="/contact"
                  className="rounded-2xl border border-slate-600 bg-deep-blue-soft/70 px-6 py-3 text-sm font-medium text-text-main transition hover:border-accent-orange hover:text-accent-orange hover:-translate-y-0.5"
                >
                  Let&apos;s build your idea
                </Link>
              </div>

              <div className="hero-line flex flex-wrap items-center gap-3 text-[11px] text-text-muted">
                <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  Available for freelance & roles
                </span>
                <span>• React Native · Expo · TypeScript · Node.js</span>
              </div>
            </div>

            {/* RIGHT SIDE – FLOATING STACK CARD */}
            <div
              ref={floatingRef}
              className="mt-8 flex-1 lg:mt-0 flex justify-center"
            >
              <div className="gradient-border max-w-sm rounded-3xl">
                <div className="relative rounded-3xl bg-gradient-to-br from-deep-blue to-bg-dark p-6 shadow-soft-glow">
                  <div className="mb-4 flex items-center justify-between text-xs text-text-muted">
                    <span>Currently building</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Production-ready apps</span>
                    </span>
                  </div>

                  <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-accent-gold">
                    FEATURED MOBILE STACK
                  </p>
                  <ul className="mb-4 flex flex-wrap gap-2 text-[11px]">
                    {[
                      'React Native',
                      'TypeScript',
                      'Expo',
                      'React Navigation',
                      'Node.js',
                      'MongoDB',
                    ].map(tool => (
                      <li
                        key={tool}
                        className="rounded-full bg-black/40 px-3 py-1 text-text-main/80"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-text-muted">
                    Smooth navigation, responsive layouts, offline-ready features, and
                    integrations with APIs & backend services — all tuned for real users on
                    real devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEASER ABOUT SECTION BELOW HERO */}
        <AnimatedSection
          id="about"
          className="border-none"
        >
          <div
            ref={aboutRef}
            className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-center py-20"
          >
            {/* LEFT SIDE — ABOUT TEXT */}
            <div className="flex-1 about-animate">
              <SectionHeading
                eyebrow="About"
                title="Designing apps that feel native and thoughtful"
                subtitle="I build mobile experiences that look sharp, feel smooth, and respect the constraints of real devices."
              />

              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                From navigation flows and onboarding screens to offline states and push
                notifications, I care about how every part of an app comes together. My
                focus is on React Native + TypeScript, with experience using Expo,
                custom animations, and backend APIs to ship features quickly without
                sacrificing quality.
              </p>
            </div>

            {/* RIGHT SIDE — SNAPSHOT CARD */}
            <div className="flex-1 rounded-3xl border border-slate-800 bg-deep-blue-soft/70 p-6 text-sm text-text-muted shadow-soft-glow about-animate">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-accent-gold">
                Snapshot
              </p>

              <ul className="space-y-2 text-xs leading-relaxed">
                <li>• Building cross-platform apps with React Native & Expo</li>
                <li>• Comfortable integrating REST/GraphQL APIs & real-time features</li>
                <li>• Focused on performance, accessibility, and smooth animations</li>
                <li>• Experience with Node.js backends & database integrations</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Home;
