import React from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { projects } from '../data/projects';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';
import ProjectCard from '../components/projects/ProjectCard';

const Portfolio: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection
        id="portfolio"
        className="bg-bg-light text-text-light-main transition-colors duration-300 dark:bg-bg-dark dark:text-text-dark-main"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Mobile projects I've engineered"
            subtitle="Case studies across EdTech, emergency tooling, events, and wellness — built with React Native."
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="showcase" />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default Portfolio;
