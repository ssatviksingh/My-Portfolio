import React from 'react';

interface ProjectPhoneFrameProps {
  image?: string;
  title: string;
  slug: string;
  className?: string;
}

const placeholderCopy: Record<string, { emoji: string; label: string; hint: string }> = {
  'personal-finance-companion': {
    emoji: '📊',
    label: 'Finance App',
    hint: 'React Native · Charts',
  },
  'calm-companion': {
    emoji: '🧘',
    label: 'CalmCompanion',
    hint: 'Expo Audio · Relax',
  },
};

export const ProjectPhoneFrame: React.FC<ProjectPhoneFrameProps> = ({
  image,
  title,
  slug,
  className = '',
}) => {
  const placeholder = placeholderCopy[slug] ?? {
    emoji: '📱',
    label: title.split(' ')[0],
    hint: 'React Native',
  };

  return (
    <div className={`px-4 pt-4 ${className}`}>
      <div className="relative mx-auto max-w-[230px] aspect-[9/16] rounded-[2rem] border-4 border-slate-300 bg-slate-200 p-2 shadow-inner transition-colors dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute left-1/2 top-3.5 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-slate-400 dark:bg-slate-800" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.3rem] border border-slate-200/80 bg-slate-50 dark:border-slate-800/80 dark:bg-slate-900">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="relative flex h-full w-full select-none flex-col items-center justify-center space-y-2 bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center dark:from-slate-900 dark:to-slate-950">
              <span className="text-2xl" aria-hidden>
                {placeholder.emoji}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-blue-light">
                {placeholder.label}
              </span>
              <span className="text-[9px] text-text-light-muted dark:text-text-dark-muted">
                {placeholder.hint}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPhoneFrame;
