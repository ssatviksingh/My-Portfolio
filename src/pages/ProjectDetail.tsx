// src/pages/ProjectDetail.tsx
import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { gsap } from 'gsap';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      );
    }, el);

    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <main className="px-6 pt-24 pb-20 bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <p className="text-sm text-text-light-muted dark:text-text-dark-muted">
            This project could not be found. It may have been moved or renamed.
          </p>
          <button
            onClick={() => navigate('/portfolio')}
            className="text-sm font-semibold text-brand-blue dark:text-brand-blue-light hover:underline"
            data-cursor="button"
          >
            ← Back to portfolio
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 pt-24 pb-20 bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
      <div ref={containerRef} className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <Link
            to="/portfolio"
            className="text-xs font-bold text-brand-blue dark:text-brand-blue-light hover:underline"
            data-cursor="button"
          >
            ← Back to all apps
          </Link>
          <span className="text-xs text-text-light-muted dark:text-text-dark-muted font-medium">
            {project.year} · {project.platform}
          </span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT – narrative */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light mb-2">
                Project Case Study
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 leading-tight">
                {project.title}
              </h1>
              <p className="text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
              <h2 className="font-display text-base font-bold mb-3 pl-2 border-l-2 border-brand-blue dark:border-brand-blue-light">
                Role & Focus
              </h2>
              <p className="text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                {project.role}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
              <h2 className="font-display text-base font-bold mb-3 pl-2 border-l-2 border-brand-blue dark:border-brand-blue-light">
                Outcomes & Highlights
              </h2>
              <ul className="text-sm text-text-light-muted dark:text-text-dark-muted space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span><strong>Metric Outcome:</strong> {project.outcome}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>Pixel-accurate layout mapping matching exact Figma margins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                  <span>Tested across physical testing devices for responsiveness.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT – visual gallery + tech */}
          <aside className="space-y-6">
            {/* Gallery View */}
            {project.images && project.images.length > 1 ? (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm space-y-4">
                <h3 className="font-display text-sm font-bold text-text-light-main dark:text-text-dark-main">
                  App Screenshot Gallery
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin snap-x">
                  {project.images.map((img, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 snap-center rounded-[1.6rem] border-4 border-slate-350 dark:border-slate-800 bg-slate-200 dark:bg-slate-950 p-1.5 w-[160px] aspect-[9/16] overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screen ${index + 1}`}
                        className="w-full h-full object-cover rounded-[1.1rem]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              project.image && (
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 shadow-sm flex justify-center">
                  <div className="relative w-full max-w-[200px] rounded-[1.8rem] border-4 border-slate-300 dark:border-slate-800 p-1.5 bg-slate-200 dark:bg-slate-950 overflow-hidden aspect-[9/16]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-[1.2rem]"
                      loading="lazy"
                    />
                  </div>
                </div>
              )
            )}

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 text-xs text-text-light-muted dark:text-text-dark-muted shadow-sm">
              <h2 className="mb-3 font-display text-sm font-bold text-text-light-main dark:text-text-dark-main">Tech Stack</h2>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tools.map(tool => (
                  <span
                    key={tool}
                    className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800/40 px-2.5 py-1 font-medium text-text-light-muted dark:text-text-dark-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <p className="text-[11px] leading-relaxed text-text-light-muted/80 dark:text-text-dark-muted/80 border-t border-slate-100 dark:border-slate-850 pt-2.5">
                Engineered for maximum typing safety, layout responsiveness, and seamless asynchronous state updates.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 text-xs text-text-light-muted dark:text-text-dark-muted shadow-sm">
              <h2 className="mb-3 font-display text-sm font-bold text-text-light-main dark:text-text-dark-main">Project Deliverables</h2>
              <ul className="space-y-2 font-medium">
                {project.repo ? (
                  <li>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline flex items-center gap-1"
                    >
                      View GitHub Repository ↗
                    </a>
                  </li>
                ) : (
                  <li className="text-text-light-muted/60 dark:text-text-dark-muted/60 italic">
                    Source code is private under NDA
                  </li>
                )}
                {project.liveUrl && (
                  <li>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline flex items-center gap-1"
                    >
                      Search on Google Play Store ↗
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
