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
    <header className={`mb-10 flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex rounded-full border border-accent-gold/40 bg-deep-blue-soft/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl text-sm text-text-muted">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default SectionHeading;
