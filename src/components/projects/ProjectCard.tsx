import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  getProjectCover,
  getProjectOutcome,
  getProjectTech,
  type Project,
} from '../../data/projects';
import ProjectPhoneFrame from './ProjectPhoneFrame';
import { fadeUp } from '../motion/variants';
import { isPrerenderEnv } from '../../utils/prerender';

export type ProjectCardVariant = 'showcase' | 'compact' | 'featured';

interface ProjectCardProps {
  project: Project;
  variant?: ProjectCardVariant;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'showcase',
}) => {
  const cover = getProjectCover(project);
  const tech = getProjectTech(project);
  const outcome = getProjectOutcome(project);
  const visibleTech =
    variant === 'compact' ? tech.slice(0, 4) : variant === 'featured' ? tech.slice(0, 8) : tech.slice(0, 6);
  const reduceMotion = useReducedMotion();
  const prerender = isPrerenderEnv();
  const MotionTag = prerender ? 'article' : motion.article;
  const hoverMotion =
    reduceMotion || prerender
      ? {}
      : {
          whileHover: {
            y: -6,
            transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
          },
        };
  const motionProps = prerender
    ? {}
    : {
        variants: fadeUp,
        ...hoverMotion,
      };

  if (variant === 'compact') {
    return (
      <MotionTag
        {...motionProps}
        className="group relative flex flex-1 flex-col overflow-hidden border border-ink/10 bg-white/70 p-6 shadow-sm transition-shadow duration-300 hover:border-accent-gold/50 hover:shadow-lift dark:border-chalk/10 dark:bg-ink-soft/80 dark:hover:border-accent-gold/40"
        data-cursor="card"
        data-cursor-label="VIEW"
      >
        <div className="mb-3 flex items-center justify-between gap-3 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          <span className="font-medium tracking-wide">{project.year}</span>
          <span className="border border-ink/10 px-2.5 py-1 font-semibold dark:border-chalk/15">
            {project.platform.split('·')[0].trim()}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight text-text-light-main transition-colors group-hover:text-ink dark:text-text-dark-main dark:group-hover:text-chalk">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-text-light-muted line-clamp-2 dark:text-text-dark-muted">
          {project.tagline}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.metrics.slice(0, 2).map((metric) => (
              <span
                key={metric}
                className="border border-accent-gold/35 bg-accent-gold/8 px-2 py-1 text-[10px] font-semibold text-text-light-main dark:text-text-dark-main"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-ink/8 pt-4 dark:border-chalk/10">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-text-light-main underline decoration-accent-gold decoration-2 underline-offset-4 dark:text-text-dark-main"
            data-cursor="button"
          >
            Case study →
          </Link>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-text-light-muted transition hover:text-text-light-main dark:text-text-dark-muted dark:hover:text-text-dark-main"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </MotionTag>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <MotionTag
      {...motionProps}
      className={`group relative flex flex-col overflow-hidden border border-ink/10 bg-white shadow-sm transition-shadow duration-300 hover:border-accent-gold/45 hover:shadow-lift dark:border-chalk/10 dark:bg-ink-soft/70 dark:hover:border-accent-gold/35 ${
        isFeatured ? 'lg:min-h-full' : ''
      }`}
      data-cursor="card"
      data-cursor-label="VIEW"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-accent-gold/10 to-transparent" />
        <ProjectPhoneFrame
          image={cover}
          title={project.title}
          slug={project.slug}
          large={isFeatured}
        />
      </div>

      <div className={`flex flex-1 flex-col ${isFeatured ? 'p-7 pt-3' : 'p-6 pt-2'}`}>
        <div className="mb-2 flex items-center justify-between gap-2 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          <span>{project.year}</span>
          {isFeatured && (
            <span className="border-b border-accent-gold text-[10px] font-semibold uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted">
              Featured
            </span>
          )}
          {!isFeatured && (
            <span className="max-w-[55%] truncate border border-ink/10 px-2.5 py-1 font-semibold dark:border-chalk/15">
              {project.platform}
            </span>
          )}
        </div>

        <h3
          className={`font-display font-bold tracking-tight transition-colors ${
            isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mt-2 leading-relaxed text-text-light-muted dark:text-text-dark-muted ${
            isFeatured ? 'text-sm line-clamp-3' : 'text-xs line-clamp-2'
          }`}
        >
          {project.tagline}
        </p>

        <p className="mt-3 border-l-2 border-accent-gold pl-2.5 text-[11px] font-semibold text-text-light-main dark:text-text-dark-main">
          {outcome}
        </p>

        <ul className="mt-3 space-y-1.5 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          {project.features.slice(0, isFeatured ? 4 : 3).map((feature) => (
            <li key={feature} className="flex gap-2 leading-snug">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-gold" />
              <span className={isFeatured ? '' : 'line-clamp-1'}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleTech.map((item) => (
            <span
              key={item}
              className="border border-ink/10 bg-paper/80 px-2 py-1 text-[10px] text-text-light-muted dark:border-chalk/10 dark:bg-ink dark:text-text-dark-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-ink/8 pt-4 dark:border-chalk/10">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-text-light-main underline decoration-accent-gold decoration-2 underline-offset-4 dark:text-text-dark-main"
            data-cursor="button"
          >
            Case study →
          </Link>
          <div className="flex items-center gap-3 text-xs font-semibold">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="text-text-light-muted transition hover:text-text-light-main dark:text-text-dark-muted dark:hover:text-text-dark-main"
              >
                Code ↗
              </a>
            )}
            {(project.liveUrl || project.storeUrl) && (
              <a
                href={project.liveUrl || project.storeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-text-light-muted transition hover:text-text-light-main dark:text-text-dark-muted dark:hover:text-text-dark-main"
              >
                Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </MotionTag>
  );
};

export default ProjectCard;
