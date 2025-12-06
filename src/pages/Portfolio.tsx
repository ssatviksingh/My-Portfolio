// src/pages/Portfolio.tsx
import React from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { projects } from '../data/projects';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';

// Nice uniform thumbnail for all project cards
// Somewhere near the top of Portfolio.tsx
const ProjectThumbnail: React.FC<{ image?: string; title: string }> = ({
  image,
  title,
}) => {
  if (!image) return null;

  return (
    <div className="px-4 pt-4">
      {/* Phone frame */}
      <div className="relative mx-auto max-w-[260px] rounded-[2rem] border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900 shadow-inner">
        {/* Top speaker / notch hint */}
        <div className="pointer-events-none absolute left-1/2 top-2 h-1 w-14 -translate-x-1/2 rounded-full bg-slate-700/70" />

        {/* Screen */}
        <div className="mt-4 overflow-hidden rounded-[1.6rem] bg-black">
          <img
            src={image}
            alt={title}
            className="h-[340px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
};




const Portfolio: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={26}>
    <AnimatedSection
      id="portfolio"
      className="bg-bg-dark"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Apps"
          title="Mobile projects I've shipped & explored"
          subtitle="A selection of mobile apps and prototypes I’ve built using React Native, Expo, and modern backend stacks."
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800/80 bg-deep-blue-soft/90 shadow-soft-glow transition-transform duration-300 hover:-translate-y-2 hover:border-accent-gold/70 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
            >
              {/* App thumbnail */}
              <ProjectThumbnail image={project.image} title={project.title} />


              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between text-[11px] text-text-muted">
                  <span>{project.year}</span>
                  <span className="rounded-full bg-black/40 px-2 py-1">
                    {project.platform}
                  </span>
                </div>

                <h3 className="mb-1 font-display text-lg font-semibold text-white group-hover:text-accent-gold">
                  {project.title}
                </h3>

                <p className="mb-3 text-xs text-text-muted line-clamp-3">
                  {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2 text-[11px]">
                  {project.tools.map(tool => (
                    <span
                      key={tool}
                      className="rounded-full bg-black/40 px-2 py-1 text-text-main/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Links row */}
                <div className="mt-auto flex items-center justify-between text-[11px] text-text-muted">
                  <div className="flex gap-2">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-gold hover:text-accent-orange"
                      >
                        Code ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-gold hover:text-accent-orange"
                      >
                        Demo ↗
                      </a>
                    )}
                    {project.storeUrl && (
                      <a
                        href={project.storeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent-gold hover:text-accent-orange"
                      >
                        Store ↗
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted/70">
                    Mobile · React Native
                  </span>
                </div>
              </div>

              {/* Optional soft overlay ONLY on hover, not by default */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default Portfolio;
