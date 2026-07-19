import React from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { getFeaturedProjects, projects, type Project } from '../data/projects';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import ProjectCard from '../components/projects/ProjectCard';
import { Stagger } from '../components/motion/Reveal';
import { usePrerenderReady } from '../hooks/usePrerenderReady';

const Portfolio: React.FC = () => {
  usePrerenderReady();

  const featured = getFeaturedProjects()[0] ?? projects[0];
  const secondary: Project[] = projects.filter((p) => p.id !== featured.id);
  const sideProjects = secondary.slice(0, 2);
  const remaining = secondary.slice(2);

  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection
        id="portfolio"
        className="bg-atmosphere text-text-light-main transition-colors duration-300 dark:text-text-dark-main"
      >
        <div className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected mobile work"
            subtitle="Case studies across EdTech, emergency tooling, events, and wellness — built with React Native."
          />

          {/* Asymmetric featured + side stack */}
          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <ProjectCard project={featured} variant="featured" />
            </div>
            <Stagger className="flex flex-col gap-8 lg:col-span-5">
              {sideProjects.map((project) => (
                <ProjectCard key={project.id} project={project} variant="compact" />
              ))}
            </Stagger>
          </div>

          {remaining.length > 0 && (
            <Stagger className="mt-16 grid gap-10 sm:grid-cols-2">
              {remaining.map((project) => (
                <ProjectCard key={project.id} project={project} variant="showcase" />
              ))}
            </Stagger>
          )}
        </div>
      </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default Portfolio;
