import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}) => {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <header className={`mb-14 flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex border-b border-accent-gold pb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-text-light-muted dark:text-text-dark-muted">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-text-light-main sm:text-4xl lg:text-5xl dark:text-text-dark-main">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-sm leading-relaxed text-text-light-muted dark:text-text-dark-muted">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default SectionHeading;
