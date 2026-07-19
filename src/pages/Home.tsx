// src/pages/Home.tsx
import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../data/projects';
import { blogPosts } from '../data/blogPosts';
import { MagneticButton } from '../components/common/MagneticButton';
import ProjectCard from '../components/projects/ProjectCard';
import { Stagger } from '../components/motion/Reveal';
import { heroContainer, heroItem } from '../components/motion/variants';
import HeroVisual from '../components/hero/HeroVisual';
import wayGoodScreen from '../assets/WayGoodHelpStudyAbroad1.png';

const Home: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      transformOrigin: 'center',
      duration: 0.35,
      ease: 'power2.out',
    });
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  useEffect(() => {
    const floatingEl = floatingRef.current;
    if (!floatingEl || reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(floatingEl, {
        y: -8,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const el = motionRef.current;
    if (!el || reduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;

      gsap.to(el, {
        x,
        y,
        duration: 0.45,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reduceMotion]);

  const handleScrollToProjects = () => {
    const projectsSec = document.getElementById('projects');
    if (projectsSec) {
      const offset = 72;
      const top = window.scrollY + projectsSec.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative overflow-hidden bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
      {/* Background glow blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-brand-blue-light/10 dark:bg-brand-blue-light/15 blur-3xl" />
      
      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#07478205_1px,transparent_1px),linear-gradient(to_bottom,#07478205_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0747820b_1px,transparent_1px),linear-gradient(to_bottom,#0747820b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Cursor movement wrapper */}
      <div ref={motionRef} className="relative z-10">
        {/* HERO SECTION */}
        <section id="hero" className="relative flex min-h-[85vh] items-center px-6 pt-12 pb-16 sm:px-10 lg:px-20">
          <HeroVisual />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
            <motion.div
              className="flex-[1.2] space-y-6"
              variants={heroContainer}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
            >
              <motion.p
                variants={heroItem}
                className="inline-flex rounded-full border border-brand-blue/30 bg-brand-blue/5 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue dark:border-brand-blue/40 dark:bg-brand-blue/10 dark:text-brand-blue-light"
              >
                React Native & Mobile Developer
              </motion.p>

              <motion.h1
                variants={heroItem}
                className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
              >
                React Native Developer —{' '}
                <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent dark:from-brand-blue-light dark:to-accent-gold">
                  Figma to production-ready
                </span>{' '}
                mobile apps.
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="max-w-xl text-sm leading-relaxed text-text-light-muted sm:text-base dark:text-text-dark-muted"
              >
                I build pixel-accurate, high-performance mobile user interfaces for EdTech and SaaS startups. Specializing in Figma-to-code implementations, custom component systems, and live API integrations.
              </motion.p>

              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <MagneticButton
                  className="rounded-2xl bg-brand-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-light dark:bg-brand-blue-light dark:hover:bg-brand-blue"
                  data-cursor-label="WORK"
                  onClick={handleScrollToProjects}
                >
                  View My Work
                </MagneticButton>
                <MagneticButton
                  className="rounded-2xl border border-slate-200 bg-white/50 px-7 py-3.5 text-sm font-semibold text-text-light-main transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-text-dark-main dark:hover:bg-slate-800"
                  data-cursor-label="UPWORK"
                  onClick={() =>
                    window.open(
                      'https://www.upwork.com/freelancers/~0152c1a5b9ab135976?mp_source=share',
                      '_blank',
                      'noreferrer',
                    )
                  }
                >
                  Hire Me on Upwork
                </MagneticButton>
              </motion.div>

              <motion.div
                variants={heroItem}
                className="flex flex-wrap items-center gap-3 text-xs font-medium text-text-light-muted dark:text-text-dark-muted"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/50 bg-slate-100 px-3.5 py-1 dark:border-slate-800/50 dark:bg-slate-900">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Available for freelance projects
                </span>
                <span>• React Native CLI · Flutter · TypeScript</span>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE – APP PREVIEW CARD */}
            <div
              ref={floatingRef}
              className="flex-1 flex justify-center will-change-transform lg:justify-end"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div className="gradient-border max-w-sm rounded-[2rem] shadow-xl">
                <div className="relative rounded-[2rem] bg-slate-50 dark:bg-slate-950 p-5">
                  <div className="mb-4 flex items-center justify-between text-xs text-text-light-muted dark:text-text-dark-muted">
                    <span className="font-semibold text-brand-blue dark:text-brand-blue-light">Featured Proof of Work</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 font-medium">
                      Live Project
                    </span>
                  </div>

                  {/* Phone Screen Mockup inside Card */}
                  <div className="relative mx-auto w-full max-w-[240px] rounded-[1.8rem] border-4 border-slate-300 dark:border-slate-800 overflow-hidden bg-black aspect-[9/16] shadow-md">
                    <img 
                      src={wayGoodScreen} 
                      alt="WayGood App UI" 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light">
                    WayGood HelpStudyAbroad
                  </p>
                  <p className="mt-1 text-[11px] text-text-light-muted dark:text-text-dark-muted">
                    Built 20+ Figma screens, custom dual theme system, and core app architecture for Play Store launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEASER ABOUT SECTION */}
        <AnimatedSection
          id="about"
          className="border-t border-slate-200/50 dark:border-slate-800/50"
          variant="slide-right"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
            {/* LEFT SIDE — ABOUT TEXT */}
            <div className="flex-[1.2]">
              <SectionHeading
                eyebrow="About Me"
                title="Specialized Mobile App Developer"
                subtitle="I combine pixel-accurate frontend implementations with robust native CLI builds."
              />

              <p className="mt-4 text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                Currently, I serve as the **Sole React Native Developer** at **WayGood Edtech Private Limited**, where I built the HelpStudyAbroad mobile app from the ground up (React Native CLI + TypeScript). I specialize in Figma-to-code implementations, custom system themes (light/dark transitions), reusable component libraries, and integration with live REST APIs.
              </p>
              
              <p className="mt-3 text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                Graduating with a B.Tech in CSE (Artificial Intelligence & Machine Learning) from **SRM Institute of Science and Technology**, I bring strong mathematical fundamentals and algorithms to client application performance.
              </p>
            </div>

            {/* RIGHT SIDE — KEY HIGHLIGHTS */}
            <div className="flex-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-6 text-sm text-text-light-muted dark:text-text-dark-muted shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light">
                Professional Competency
              </p>

              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>Figma-to-code pixel-accurate layouts for mobile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>React Native CLI, Expo, & Flutter implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>Custom light/dark design theme systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>REST API integration & state management (Zustand/Redux)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* SKILLS PREVIEW */}
        <AnimatedSection id="skills" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="scale">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Skills"
              title="Technical Stack"
              subtitle="The languages, frameworks, and UI toolsets I rely on."
            />
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                'React Native CLI',
                'Flutter',
                'TypeScript',
                'Expo',
                'React Navigation',
                'Figma-to-code',
                'Custom theme systems',
                'Animations (Reanimated)',
                'Redux Toolkit / Zustand',
                'REST APIs',
                'Android Studio / Xcode',
                'Git & GitHub'
              ].map(skill => (
                <span
                  key={skill}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4.5 py-2 text-xs font-medium text-text-light-main dark:text-text-dark-main shadow-sm"
                  data-cursor="card"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/skills"
                className="text-sm font-semibold text-brand-blue dark:text-brand-blue-light hover:underline"
                data-cursor="button"
              >
                View categorized skillset →
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* PROJECTS PREVIEW */}
        <AnimatedSection id="projects" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="slide-left">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Work"
              title="Featured Mobile Applications"
              subtitle="Selected React Native apps engineered for production."
            />
            
            <Stagger className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {getFeaturedProjects().map((project) => (
                <ProjectCard key={project.id} project={project} variant="compact" />
              ))}
            </Stagger>

            <div className="mt-8 text-center">
              <Link
                to="/portfolio"
                className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-2.5 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                data-cursor="button"
              >
                Browse All Projects
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* BLOG PREVIEW */}
        <AnimatedSection id="blog" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="fade-up">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Blog"
              title="Mobile Development Writing"
              subtitle="Notes on React Native performance, custom themes, and styling mobile interfaces."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {blogPosts.slice(0, 2).map(post => (
                <article
                  key={post.id}
                  className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  data-cursor="card"
                  data-cursor-label="READ"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted mb-2">
                    {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <h3 className="font-display text-base font-bold text-text-light-main dark:text-text-dark-main mb-2 group-hover:text-brand-blue dark:group-hover:text-brand-blue-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-light-muted dark:text-text-dark-muted line-clamp-3 mb-4 leading-relaxed">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-blue dark:text-brand-blue-light hover:underline"
                    data-cursor="button"
                  >
                    Read Article →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CONTACT PREVIEW */}
        <AnimatedSection id="contact" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="scale">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <SectionHeading
              eyebrow="Hire Me"
              title="Let's build your next mobile application"
              subtitle="Available for React Native and Flutter freelance projects. Response within 24 hours."
              align="center"
            />
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <MagneticButton
                asChild
                className="rounded-2xl bg-brand-blue hover:bg-brand-blue-light dark:bg-brand-blue-light dark:hover:bg-brand-blue text-white px-8 py-3.5 text-sm font-semibold shadow-md transition-colors"
                data-cursor-label="CONTACT"
              >
                <Link to="/contact">Get in Touch</Link>
              </MagneticButton>
              <MagneticButton
                asChild
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-8 py-3.5 text-sm font-semibold text-text-light-main dark:text-text-dark-main hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                data-cursor-label="CONTRA"
              >
                <a href="https://contra.com/satvik_singh_bz2tq3zn" target="_blank" rel="noreferrer">Contra Profile</a>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Home;
