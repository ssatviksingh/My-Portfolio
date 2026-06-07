// src/pages/Portfolio.tsx
import React from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { projects } from '../data/projects';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import { Link } from 'react-router-dom';

const ProjectThumbnail: React.FC<{ image?: string; title: string; slug: string }> = ({
  image,
  title,
  slug,
}) => {
  return (
    <div className="px-4 pt-4">
      {/* Phone frame */}
      <div className="relative mx-auto max-w-[230px] rounded-[2rem] border-4 border-slate-300 dark:border-slate-800 bg-slate-200 dark:bg-slate-950 p-2 shadow-inner aspect-[9/16] transition-colors">
        {/* Top notch */}
        <div className="absolute left-1/2 top-3.5 h-3 w-16 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-slate-800 z-10" />

        {/* Screen */}
        <div className="relative w-full h-full overflow-hidden rounded-[1.3rem] bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-200/80 dark:border-slate-800/80">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 h-full w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 select-none">
              <span className="text-2xl">
                {slug === 'personal-finance-companion' ? '📊' : '🧘'}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-brand-blue dark:text-brand-blue-light uppercase">
                {title.split(' ')[0]} App
              </span>
              <span className="text-[9px] text-text-light-muted dark:text-text-dark-muted">
                {slug === 'personal-finance-companion' ? 'React Native · Charts' : 'Expo Audio · Relax'}
              </span>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] font-bold bg-brand-blue/10 dark:bg-brand-blue-light/10 text-brand-blue dark:text-brand-blue-light px-2.5 py-0.5 rounded-full uppercase whitespace-nowrap">
                Production-Ready Repo
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection id="portfolio" className="bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Mobile Projects I've Engineered"
            subtitle="Explore study-abroad applications, offline safety tools, and animation clones engineered using React Native."
          />

          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-250 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue/60 dark:hover:border-brand-blue-light/60"
                data-cursor="card"
                data-cursor-label="VIEW"
              >
                {/* App mock thumbnail */}
                <ProjectThumbnail image={project.image} title={project.title} slug={project.slug} />

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center justify-between text-xs text-text-light-muted dark:text-text-dark-muted">
                    <span>{project.year}</span>
                    <span className="rounded bg-slate-100 dark:bg-slate-850 px-2 py-0.5 font-semibold">
                      {project.platform}
                    </span>
                  </div>

                  <h3 className="mb-1 font-display text-lg font-bold text-text-light-main dark:text-text-dark-main group-hover:text-brand-blue dark:group-hover:text-brand-blue-light transition-colors">
                    {project.title}
                  </h3>

                  <p className="mb-3.5 text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="mb-4 text-xs font-semibold text-brand-blue dark:text-brand-blue-light border-l-2 border-brand-blue/30 pl-2">
                    {project.outcome}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1.5 text-[10px]">
                    {project.tools.map(tool => (
                      <span
                        key={tool}
                        className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1 text-text-light-muted dark:text-text-dark-muted border border-slate-200/50 dark:border-slate-800/30"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Links footer */}
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="font-bold text-brand-blue dark:text-brand-blue-light hover:underline"
                      data-cursor="button"
                    >
                      Case study →
                    </Link>
                    
                    <div className="flex gap-3 items-center">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-text-light-muted dark:text-text-dark-muted hover:text-brand-blue dark:hover:text-brand-blue-light"
                        >
                          Code ↗
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-text-light-muted dark:text-text-dark-muted hover:text-brand-blue dark:hover:text-brand-blue-light"
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default Portfolio;
