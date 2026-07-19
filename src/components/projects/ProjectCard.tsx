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

export type ProjectCardVariant = 'showcase' | 'compact';

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
  const visibleTech = variant === 'compact' ? tech.slice(0, 4) : tech.slice(0, 6);
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
        className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:border-brand-blue/50 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.45)] dark:border-slate-800 dark:from-slate-900/80 dark:to-slate-950/80 dark:hover:border-brand-blue-light/40"
        data-cursor="card"
        data-cursor-label="VIEW"
      >
        <div className="mb-3 flex items-center justify-between gap-3 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          <span className="font-medium tracking-wide">{project.year}</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold dark:bg-slate-800">
            {project.platform.split('·')[0].trim()}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight text-text-light-main transition-colors group-hover:text-brand-blue dark:text-text-dark-main dark:group-hover:text-brand-blue-light">
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
                className="rounded-md bg-brand-blue/8 px-2 py-1 text-[10px] font-semibold text-brand-blue dark:bg-brand-blue-light/10 dark:text-brand-blue-light"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/70">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-brand-blue dark:text-brand-blue-light"
            data-cursor="button"
          >
            Case study →
          </Link>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-text-light-muted transition hover:text-brand-blue dark:text-text-dark-muted dark:hover:text-brand-blue-light"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </MotionTag>
    );
  }

  return (
    <MotionTag
      {...motionProps}
      className="group relative flex flex-col overflow-hidden rounded-[1.85rem] border border-slate-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:border-brand-blue/45 hover:shadow-[0_28px_60px_-32px_rgba(37,99,235,0.55)] dark:border-slate-800/90 dark:bg-slate-900/55 dark:hover:border-brand-blue-light/40"
      data-cursor="card"
      data-cursor-label="VIEW"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-brand-blue/10 to-transparent dark:from-brand-blue-light/10" />
        <ProjectPhoneFrame image={cover} title={project.title} slug={project.slug} />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-2">
        <div className="mb-2 flex items-center justify-between gap-2 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          <span>{project.year}</span>
          <span className="max-w-[55%] truncate rounded-full bg-slate-100 px-2.5 py-1 font-semibold dark:bg-slate-800">
            {project.platform}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold tracking-tight transition-colors group-hover:text-brand-blue dark:group-hover:text-brand-blue-light">
          {project.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-text-light-muted line-clamp-2 dark:text-text-dark-muted">
          {project.tagline}
        </p>

        <p className="mt-3 border-l-2 border-brand-blue/35 pl-2.5 text-[11px] font-semibold text-brand-blue dark:border-brand-blue-light/40 dark:text-brand-blue-light">
          {outcome}
        </p>

        <ul className="mt-3 space-y-1.5 text-[11px] text-text-light-muted dark:text-text-dark-muted">
          {project.features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex gap-2 leading-snug">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-blue dark:bg-brand-blue-light" />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {visibleTech.map((item) => (
            <span
              key={item}
              className="rounded-lg border border-slate-200/60 bg-slate-50 px-2 py-1 text-[10px] text-text-light-muted dark:border-slate-800 dark:bg-slate-950/60 dark:text-text-dark-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/70">
          <Link
            to={`/portfolio/${project.slug}`}
            className="text-xs font-bold text-brand-blue dark:text-brand-blue-light"
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
                className="text-text-light-muted transition hover:text-brand-blue dark:text-text-dark-muted dark:hover:text-brand-blue-light"
              >
                Code ↗
              </a>
            )}
            {(project.liveUrl || project.storeUrl) && (
              <a
                href={project.liveUrl || project.storeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-text-light-muted transition hover:text-brand-blue dark:text-text-dark-muted dark:hover:text-brand-blue-light"
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
