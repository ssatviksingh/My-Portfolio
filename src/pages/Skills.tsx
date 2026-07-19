import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import SectionHeading from '../components/common/SectionHeading';
import { skills } from '../data/skills';
import { Stagger } from '../components/motion/Reveal';
import { fadeUp } from '../components/motion/variants';

const Skills: React.FC = () => {
  const motionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = motionRef.current;
    if (!el) return;

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
  }, []);

  return (
    <main className="relative overflow-hidden bg-bg-light px-6 pb-20 pt-24 text-text-light-main transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark-main">
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl dark:bg-brand-blue/20" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-brand-blue-light/10 blur-3xl dark:bg-brand-blue-light/15" />

      <div ref={motionRef}>
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Expertise"
            title="Technical Skills & Competence"
            subtitle="Categorized list of frameworks, methodologies, and toolsets I use to build mobile apps."
          />

          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2">
            {skills.map((group) => (
              <motion.div
                key={group.category}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-brand-blue/50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-blue-light/50"
                data-cursor="card"
                data-cursor-label="STACK"
              >
                <h3 className="mb-4 border-l-2 border-brand-blue pl-2 font-display text-base font-bold text-text-light-main dark:border-brand-blue-light dark:text-text-dark-main">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.94 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.28, delay: Math.min(index * 0.03, 0.3), ease: 'easeOut' }}
                      whileHover={{ scale: 1.04 }}
                      className="rounded-xl border border-slate-200/50 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-text-light-muted transition-colors hover:border-brand-blue/20 hover:text-brand-blue dark:border-slate-800/50 dark:bg-slate-900 dark:text-text-dark-muted dark:hover:border-brand-blue-light/20 dark:hover:text-brand-blue-light"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </Stagger>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h2 className="mb-4 font-display text-lg font-bold text-text-light-main dark:text-text-dark-main">
              My Engineering Philosophy
            </h2>
            <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3 dark:border-slate-800 dark:bg-slate-900/30">
              {[
                {
                  title: 'Figma-to-Code Accuracy',
                  desc: 'Designing and scaling layout components to match high-fidelity screen designs without compromise across varied aspect ratios.',
                },
                {
                  title: 'CLI & Performance Optimization',
                  desc: 'Using React Native CLI and native layouts to avoid bundle bloating, ensuring quick boot speeds and smooth re-renders.',
                },
                {
                  title: 'Production Focused',
                  desc: 'Testing directly on physical devices to debug layout bottlenecks, offline-first behaviors, and dark mode transitions.',
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h4 className="text-xs font-bold text-brand-blue dark:text-brand-blue-light">
                    {item.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Skills;
