import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blogPosts';
import { MagneticButton } from '../components/common/MagneticButton';
import ProjectCard from '../components/projects/ProjectCard';
import { Stagger } from '../components/motion/Reveal';
import { heroContainer, heroItem } from '../components/motion/variants';
import HeroVisual from '../components/hero/HeroVisual';
import wayGoodScreen from '../assets/WayGoodHelpStudyAbroad1.png';
import { isPrerenderEnv } from '../utils/prerender';
import { usePrerenderReady } from '../hooks/usePrerenderReady';

const Home: React.FC = () => {
  usePrerenderReady();
  const motionRef = useRef<HTMLDivElement | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const prerender = isPrerenderEnv();
  const skipEntrance = Boolean(reduceMotion || prerender);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (skipEntrance) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.2s ease-out';
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    e.currentTarget.style.transition = 'transform 0.35s ease-out';
  };

  useEffect(() => {
    const floatingEl = floatingRef.current;
    if (!floatingEl || skipEntrance) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled || !floatingRef.current) return;
      ctx = gsap.context(() => {
        gsap.to(floatingRef.current, {
          y: -8,
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [skipEntrance]);

  useEffect(() => {
    const el = motionRef.current;
    if (!el || skipEntrance) return;

    let cancelled = false;
    let gsapMod: typeof import('gsap') | null = null;

    (async () => {
      gsapMod = await import('gsap');
    })();

    const handleMove = (e: MouseEvent) => {
      if (!gsapMod || cancelled) return;
      const x = (e.clientX - window.innerWidth / 2) / 50;
      const y = (e.clientY - window.innerHeight / 2) / 50;
      gsapMod.gsap.to(el, {
        x,
        y,
        duration: 0.45,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      cancelled = true;
      window.removeEventListener('mousemove', handleMove);
    };
  }, [skipEntrance]);

  const handleScrollToProjects = () => {
    const projectsSec = document.getElementById('projects');
    if (projectsSec) {
      const offset = 72;
      const top = window.scrollY + projectsSec.getBoundingClientRect().top - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <main className="relative overflow-hidden bg-atmosphere text-text-light-main transition-colors duration-300 dark:text-text-dark-main">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-accent-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-ink/5 blur-3xl dark:bg-accent-gold/8" />

      <div ref={motionRef} className="relative z-10">
        <section id="hero" className="relative flex min-h-[85vh] items-center px-6 pt-12 pb-16 sm:px-10 lg:px-20">
          <HeroVisual />
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:flex-row lg:items-center">
            <motion.div
              className="flex-[1.2] space-y-6"
              variants={heroContainer}
              initial={skipEntrance ? false : 'hidden'}
              animate="show"
            >
              <motion.p
                variants={heroItem}
                className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-text-light-muted dark:text-text-dark-muted"
              >
                Satvik Singh
              </motion.p>

              <motion.h1
                variants={heroItem}
                className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              >
                React Native apps,{' '}
                <span className="underline decoration-accent-gold decoration-[3px] underline-offset-8">
                  Figma to store-ready
                </span>
                .
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="max-w-xl text-sm leading-relaxed text-text-light-muted sm:text-base dark:text-text-dark-muted"
              >
                I build pixel-accurate, high-performance mobile interfaces for EdTech and SaaS —
                specializing in Figma-to-code, custom component systems, and live API integrations.
              </motion.p>

              <motion.div variants={heroItem} className="flex flex-wrap gap-4">
                <MagneticButton
                  className="rounded-none bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-md transition-colors hover:bg-ink-soft dark:bg-accent-gold dark:text-ink dark:hover:bg-accent-gold-bright"
                  data-cursor-label="WORK"
                  onClick={handleScrollToProjects}
                >
                  View My Work
                </MagneticButton>
                <MagneticButton
                  className="rounded-none border border-ink/20 bg-transparent px-7 py-3.5 text-sm font-semibold text-text-light-main transition-colors hover:border-accent-gold dark:border-chalk/25 dark:text-text-dark-main"
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
                <span className="inline-flex items-center gap-1.5 border border-ink/10 px-3.5 py-1 dark:border-chalk/15">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-muted-green" />
                  Available for freelance projects
                </span>
                <span>· React Native CLI · TypeScript</span>
              </motion.div>
            </motion.div>

            <div
              ref={floatingRef}
              className="flex flex-1 justify-center will-change-transform lg:justify-end"
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <div className="gradient-border max-w-sm rounded-none shadow-xl">
                <div className="relative rounded-none bg-paper p-5 dark:bg-ink-soft">
                  <div className="mb-4 flex items-center justify-between text-xs text-text-light-muted dark:text-text-dark-muted">
                    <span className="font-semibold text-text-light-main dark:text-text-dark-main">
                      Featured proof of work
                    </span>
                    <span className="inline-flex items-center gap-1 border border-accent-gold/50 px-2 py-0.5 font-medium">
                      Live
                    </span>
                  </div>

                  <div className="relative mx-auto aspect-[9/16] w-full max-w-[240px] overflow-hidden border-4 border-ink/15 bg-black shadow-md dark:border-chalk/15">
                    <img
                      src={wayGoodScreen}
                      alt="WayGood App UI"
                      className="h-full w-full object-cover"
                      width={240}
                      height={426}
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>

                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-text-light-main dark:text-text-dark-main">
                    WayGood HelpStudyAbroad
                  </p>
                  <p className="mt-1 text-[11px] text-text-light-muted dark:text-text-dark-muted">
                    Built 20+ Figma screens, custom dual theme system, and core app architecture for
                    Play Store launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection
          id="about"
          className="border-t border-slate-200/50 dark:border-slate-800/50"
          variant="slide-right"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-center">
            <div className="flex-[1.2]">
              <SectionHeading
                eyebrow="About Me"
                title="Specialized Mobile App Developer"
                subtitle="I combine pixel-accurate frontend implementations with robust native CLI builds."
              />

              <p className="mt-4 text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                Currently, I serve as the **Sole React Native Developer** at **WayGood Edtech Private
                Limited**, where I built the HelpStudyAbroad mobile app from the ground up (React
                Native CLI + TypeScript). I specialize in Figma-to-code implementations, custom
                system themes (light/dark transitions), reusable component libraries, and
                integration with live REST APIs.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                Graduating with a B.Tech in CSE (Artificial Intelligence & Machine Learning) from
                **SRM Institute of Science and Technology**, I bring strong mathematical
                fundamentals and algorithms to client application performance.
              </p>
            </div>

            <div className="flex-1 border border-ink/10 bg-white/60 p-6 text-sm text-text-light-muted shadow-sm dark:border-chalk/10 dark:bg-ink-soft/60 dark:text-text-dark-muted">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-text-light-main dark:text-text-dark-main">
                Professional Competency
              </p>

              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent-gold" aria-hidden>
                    •
                  </span>
                  <span>Figma-to-code pixel-accurate layouts for mobile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent-gold" aria-hidden>
                    •
                  </span>
                  <span>React Native CLI, Expo, & Flutter implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent-gold" aria-hidden>
                    •
                  </span>
                  <span>Custom light/dark design theme systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent-gold" aria-hidden>
                    •
                  </span>
                  <span>REST API integration & state management (Zustand/Redux)</span>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

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
                'Git & GitHub',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-slate-200 bg-white px-4.5 py-2 text-xs font-medium text-text-light-main shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-text-dark-main"
                  data-cursor="card"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/skills"
                className="text-sm font-semibold text-text-light-main underline decoration-accent-gold decoration-2 underline-offset-4 dark:text-text-dark-main"
                data-cursor="button"
              >
                View categorized skillset →
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="slide-left">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Work"
              title="Featured Mobile Applications"
              subtitle="Selected React Native apps engineered for production."
            />

            <Stagger className="mt-10 grid gap-8 lg:grid-cols-12">
              {projects.slice(0, 1).map((project) => (
                <div key={project.id} className="lg:col-span-7">
                  <ProjectCard project={project} variant="featured" />
                </div>
              ))}
              <div className="flex flex-col gap-6 lg:col-span-5">
                {projects.slice(1, 3).map((project) => (
                  <ProjectCard key={project.id} project={project} variant="compact" />
                ))}
              </div>
            </Stagger>

            <div className="mt-10 text-left">
              <Link
                to="/portfolio"
                className="inline-flex border border-ink/15 px-6 py-2.5 text-xs font-bold transition-colors hover:border-accent-gold dark:border-chalk/20"
                data-cursor="button"
              >
                Browse all projects
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="blog" className="border-t border-slate-200/50 dark:border-slate-800/50" variant="fade-up">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Blog"
              title="Mobile Development Writing"
              subtitle="Notes on React Native performance, custom themes, and styling mobile interfaces."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {blogPosts.slice(0, 2).map((post) => (
                <article
                  key={post.id}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50"
                  data-cursor="card"
                  data-cursor-label="READ"
                >
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted">
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="mb-2 font-display text-base font-bold text-text-light-main transition-colors dark:text-text-dark-main">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-xs leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-text-light-main underline decoration-accent-gold decoration-2 underline-offset-4 dark:text-text-dark-main"
                    data-cursor="button"
                  >
                    Read Article →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>

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
                className="rounded-none bg-ink px-8 py-3.5 text-sm font-semibold text-paper shadow-md transition-colors hover:bg-ink-soft dark:bg-accent-gold dark:text-ink dark:hover:bg-accent-gold-bright"
                data-cursor-label="CONTACT"
              >
                <Link to="/contact">Get in Touch</Link>
              </MagneticButton>
              <MagneticButton
                asChild
                className="rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-text-light-main transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-text-dark-main dark:hover:bg-slate-800"
                data-cursor-label="CONTRA"
              >
                <a href="mailto:satviksingh164@gmail.com">Email Me</a>
              </MagneticButton>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
};

export default Home;
