import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import AnimatedSection from '../components/common/AnimatedSection';

const ThankYou: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection id="thank-you">
        <div className="mx-auto max-w-xl text-center pt-24 pb-20">
          <h1 className="font-display text-3xl sm:text-4xl text-white mb-3">
            Message sent successfully 🎉
          </h1>
          <p className="text-sm text-text-muted mb-6">
            Thanks for reaching out. I&apos;ll read your message and get back to you as soon as I can.
          </p>
          <p className="text-xs text-text-muted/70">
            You can also ping me directly at{' '}
            <a
              href="mailto:satviksingh164@gmail.com"
              className="text-accent-gold hover:text-accent-orange"
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
