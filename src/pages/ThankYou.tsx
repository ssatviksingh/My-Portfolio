import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import AnimatedSection from '../components/common/AnimatedSection';
import { usePrerenderReady } from '../hooks/usePrerenderReady';

const ThankYou: React.FC = () => {
  usePrerenderReady();
  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection id="thank-you" className="bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
        <div className="mx-auto max-w-xl text-center pt-24 pb-20 px-6">
          <h1 className="font-display text-3xl font-extrabold text-text-light-main dark:text-text-dark-main mb-3">
            Message sent successfully 🎉
          </h1>
          <p className="text-sm text-text-light-muted dark:text-text-dark-muted mb-6">
            Thanks for reaching out. I&apos;ll read your message and get back to you as soon as possible.
          </p>
          <p className="text-xs text-text-light-muted/70 dark:text-text-dark-muted/70">
            You can also ping me directly at{' '}
            <a
              href="mailto:satviksingh164@gmail.com"
              className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
            >
              satviksingh164@gmail.com
            </a>
            .
          </p>
        </div>
      </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default ThankYou;
