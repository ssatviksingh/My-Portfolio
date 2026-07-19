import React, { useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  getProjectBySlug,
  getProjectCover,
  getProjectTech,
} from '../data/projects';
import ProjectPhoneFrame from '../components/projects/ProjectPhoneFrame';
import { isPrerenderEnv } from '../utils/prerender';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isPrerenderEnv()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 15 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
      );
    }, el);

    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <main className="bg-bg-light px-6 pb-20 pt-24 text-text-light-main transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark-main">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="text-sm text-text-light-muted dark:text-text-dark-muted">
            This project could not be found. It may have been moved or renamed.
          </p>
          <button
            onClick={() => navigate('/portfolio')}
            className="text-sm font-semibold text-brand-blue hover:underline dark:text-brand-blue-light"
            data-cursor="button"
          >
            ← Back to portfolio
          </button>
        </div>
      </main>
    );
  }

  const cover = getProjectCover(project);
  const tech = getProjectTech(project);
  const gallery = project.images.length > 0 ? project.images : cover ? [cover] : [];

  return (
    <main className="bg-bg-light px-6 pb-20 pt-24 text-text-light-main transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark-main">
      <div ref={containerRef} className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
          <Link
            to="/portfolio"
            className="text-xs font-bold text-brand-blue hover:underline dark:text-brand-blue-light"
            data-cursor="button"
          >
            ← Back to all apps
          </Link>
          <span className="text-xs font-medium text-text-light-muted dark:text-text-dark-muted">
            {project.year} · {project.platform}
          </span>
        </div>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light">
                Project case study
              </p>
              <h1 className="mb-3 font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                {project.title}
              </h1>
              <p className="text-sm font-medium text-text-light-main dark:text-text-dark-main">
                {project.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                {project.problem}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="mb-3 border-l-2 border-brand-blue pl-2 font-display text-base font-bold dark:border-brand-blue-light">
                My role
              </h2>
              <p className="text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">
                {project.role}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="mb-3 border-l-2 border-brand-blue pl-2 font-display text-base font-bold dark:border-brand-blue-light">
                Key features
              </h2>
              <ul className="space-y-2 text-sm text-text-light-muted dark:text-text-dark-muted">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="text-brand-blue dark:text-brand-blue-light">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.metrics && project.metrics.length > 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                <h2 className="mb-3 border-l-2 border-brand-blue pl-2 font-display text-base font-bold dark:border-brand-blue-light">
                  Outcomes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full bg-brand-blue/10 px-3 py-1.5 text-xs font-semibold text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {gallery.length > 1 ? (
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                <h3 className="font-display text-sm font-bold">App screenshots</h3>
                <div className="flex snap-x gap-4 overflow-x-auto pb-2">
                  {gallery.map((img, index) => (
                    <div
                      key={`${project.id}-${index}`}
                      className="aspect-[9/16] w-[160px] flex-shrink-0 snap-center overflow-hidden rounded-[1.6rem] border-4 border-slate-300 bg-slate-200 p-1.5 dark:border-slate-800 dark:bg-slate-950"
                    >
                      <img
                        src={img}
                        alt={`${project.title} screen ${index + 1}`}
                        className="h-full w-full rounded-[1.1rem] object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                <ProjectPhoneFrame image={cover} title={project.title} slug={project.slug} />
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="mb-3 font-display text-sm font-bold text-text-light-main dark:text-text-dark-main">
                Tech stack
              </h2>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200/50 bg-slate-100 px-2.5 py-1 font-medium text-text-light-muted dark:border-slate-800/40 dark:bg-slate-800 dark:text-text-dark-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
              <h2 className="mb-3 font-display text-sm font-bold text-text-light-main dark:text-text-dark-main">
                Links
              </h2>
              <ul className="space-y-2 font-medium">
                {project.repo ? (
                  <li>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-brand-blue hover:underline dark:text-brand-blue-light"
                    >
                      View GitHub repository ↗
                    </a>
                  </li>
                ) : (
                  <li className="italic text-text-light-muted/60 dark:text-text-dark-muted/60">
                    Source code is private under NDA
                  </li>
                )}
                {project.liveUrl && (
                  <li>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-brand-blue hover:underline dark:text-brand-blue-light"
                    >
                      Live demo / store ↗
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
