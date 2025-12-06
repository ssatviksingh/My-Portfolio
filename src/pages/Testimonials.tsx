import React, { useCallback, useEffect, useRef, useState } from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { testimonials } from '../data/testimonials';
import { gsap } from 'gsap';

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const show = useCallback(
    (nextIndex: number, direction: 'left' | 'right') => {
      const el = cardRef.current;
      if (!el) return;

      const offset = direction === 'left' ? -40 : 40;

      gsap.to(el, {
        autoAlpha: 0,
        x: offset,
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          setIndex(nextIndex);
          gsap.fromTo(
            el,
            { autoAlpha: 0, x: -offset },
            { autoAlpha: 1, x: 0, duration: 0.3, ease: 'power2.out' },
          );
        },
      });
    },
    [],
  );

  const next = useCallback(() => {
    show((index + 1) % testimonials.length, 'right');
  }, [index, show]);

  const prev = useCallback(() => {
    show(index === 0 ? testimonials.length - 1 : index - 1, 'left');
  }, [index, show]);

  // optional autoplay
  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, [next]);

  const testimonial = testimonials[index];

  return (
    <AnimatedSection id="testimonials">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say about working with me"
          subtitle="A few notes from collaborators and clients I’ve built mobile apps with."
          align="center"
        />

        <div
          ref={cardRef}
          className="relative rounded-3xl border border-slate-800 bg-deep-blue-soft/90 p-8 text-sm text-text-muted shadow-soft-glow"
        >
          <p className="mb-5 text-base text-text-main">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex flex-col gap-3 items-start justify-between sm:flex-row sm:items-center text-xs text-text-muted">
            <div>
              <p className="font-semibold text-text-main">{testimonial.name}</p>
              <p>
                {testimonial.role} · {testimonial.company}
              </p>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={prev}
                className="rounded-full border border-slate-700 bg-black/30 px-3 py-1 hover:border-accent-gold text-text-main text-xs"
              >
                ← Prev
              </button>
              <button
                onClick={next}
                className="rounded-full border border-slate-700 bg-black/30 px-3 py-1 hover:border-accent-gold text-text-main text-xs"
              >
                Next →
              </button>
            </div>
          </div>

          {/* dots */}
          <div className="mt-4 flex justify-center gap-1">
            {testimonials.map((t, i) => (
              <span
                key={t.id}
                className={`h-1.5 w-5 rounded-full transition-colors ${
                  i === index ? 'bg-accent-gold' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Testimonials;
