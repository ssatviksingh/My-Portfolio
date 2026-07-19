import React from 'react';

interface ProjectPhoneFrameProps {
  image?: string;
  title: string;
  slug: string;
  className?: string;
  large?: boolean;
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
  large = false,
}) => {
  const placeholder = placeholderCopy[slug] ?? {
    emoji: '📱',
    label: title.split(' ')[0],
    hint: 'React Native',
  };

  return (
    <div className={`px-4 pt-4 ${className}`}>
      <div
        className={`relative mx-auto aspect-[9/16] rounded-[2rem] border-4 border-ink/15 bg-paper-soft p-2 shadow-inner transition-colors dark:border-chalk/15 dark:bg-ink ${
          large ? 'max-w-[280px]' : 'max-w-[230px]'
        }`}
      >
        <div className="absolute left-1/2 top-3.5 z-10 h-3 w-16 -translate-x-1/2 rounded-full bg-ink/20 dark:bg-chalk/20" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.3rem] border border-ink/10 bg-paper dark:border-chalk/10 dark:bg-ink-soft">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="relative flex h-full w-full select-none flex-col items-center justify-center space-y-2 bg-gradient-to-br from-paper to-paper-soft p-4 text-center dark:from-ink-soft dark:to-ink">
              <span className="text-2xl" aria-hidden>
                {placeholder.emoji}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-light-main dark:text-text-dark-main">
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
