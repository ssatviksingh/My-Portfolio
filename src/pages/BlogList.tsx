
import React from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import { blogPosts } from '../data/blogPosts';
import { Link } from 'react-router-dom';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';

const BlogList: React.FC = () => {
  return (
    <MouseParallaxWrapper intensity={20}>
    <AnimatedSection id="blog">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blog"
          title="Writing about mobile development"
          subtitle="Notes, experiments, and lessons learned while building React Native apps."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {blogPosts.map(post => (
            <article
              key={post.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-deep-blue-soft/80 shadow-soft-glow transition hover:-translate-y-2 hover:border-accent-gold/70"
            >
              {post.image && (
                <div
                  className="h-44 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              )}

              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-text-muted">
                  {new Date(post.date).toLocaleDateString()}
                </p>

                <h3 className="mb-2 font-display text-xl font-semibold text-white group-hover:text-accent-gold">
                  {post.title}
                </h3>

                <p className="mb-3 text-sm text-text-muted">{post.excerpt}</p>

                <div className="mb-4 flex flex-wrap gap-2 text-[11px]">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full bg-black/40 px-2 py-1 text-text-main/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-sm font-medium text-accent-gold hover:text-accent-orange"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default BlogList;
