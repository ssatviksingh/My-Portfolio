// src/pages/BlogPost.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { gsap } from 'gsap';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  // scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  // fade-in animation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      );
    }, el);

    return () => ctx.revert();
  }, [slug]);

  // reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, value)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <p className="mb-4 text-sm text-text-muted">
          This article could not be found. It may have been moved or renamed.
        </p>
        <button
          className="text-sm text-accent-gold hover:text-accent-orange"
          onClick={() => navigate('/blog')}
        >
          ← Back to blog
        </button>
      </div>
    );
  }

  const readTime = '7–10 min read';

  return (
    <MouseParallaxWrapper intensity={24}>
    <div className="px-6 pt-10 pb-16">
      <div ref={containerRef} className="mx-auto max-w-6xl">
        {/* Back link */}
        <Link
          to="/blog"
          className="mb-4 inline-block text-sm text-accent-gold hover:text-accent-orange"
        >
          ← Back to blog
        </Link>

        {/* STICKY HEADER + PROGRESS */}
        <div className="sticky top-20 z-20 mb-2">
          <header className="rounded-3xl bg-gradient-to-r from-deep-blue-soft/90 via-bg-dark/90 to-deep-blue-soft/90 px-5 py-6 sm:px-7 sm:py-7 border border-slate-800/80 shadow-soft-glow">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">
              {new Date(post.date).toLocaleDateString()}
            </p>

            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold leading-tight text-white">
              {post.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
              <span className="rounded-full bg-black/40 px-3 py-1 text-text-main/80">
                {readTime}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-black/40 px-2 py-1 text-text-main/80"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* reading progress bar */}
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-slate-800/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </header>
        </div>

        {/* MAIN LAYOUT: article + sidebar */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.2fr)]">
          {/* Article card */}
          <div className="mt-0 rounded-3xl border border-slate-800 bg-deep-blue-soft/80 p-6 sm:p-8 shadow-soft-glow">
            {/* 🔥 NO IMAGE BLOCK ANYMORE – DIRECTLY START CONTENT */}

            <article
              className="
                prose prose-invert max-w-none
                prose-p:text-[0.95rem] sm:prose-p:text-[1rem]
                prose-li:text-[0.95rem] sm:prose-li:text-[1rem]
                prose-p:leading-relaxed prose-li:leading-relaxed
                prose-p:my-3 prose-ul:my-3 prose-ol:my-3
                prose-headings:font-display prose-headings:text-white
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-6 prose-h2:mb-4
                prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2
                prose-ul:list-disc prose-ul:pl-5
                prose-code:text-xs sm:prose-code:text-sm
                prose-pre:bg-[#020617] prose-pre:border prose-pre:border-slate-800
                prose-pre:rounded-2xl prose-pre:p-4
                [&>*:first-child]:mt-0
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-deep-blue-soft/70 p-5 text-sm text-text-muted shadow-soft-glow">
              <h2 className="mb-2 font-display text-base text-white">
                About this article
              </h2>
              <p className="text-xs text-text-muted mb-3">
                You&apos;re reading a piece from my React Native mobile development
                blog. I write about architecture, animations, Expo, and building
                production-ready apps.
              </p>
              <dl className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <dt className="text-text-muted/80">Published</dt>
                  <dd>{new Date(post.date).toLocaleDateString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted/80">Read time</dt>
                  <dd>{readTime}</dd>
                </div>
                <div>
                  <dt className="text-text-muted/80 mb-1">Topics</dt>
                  <dd className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-black/40 px-2 py-1 text-[11px] text-text-main/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-deep-blue-soft/50 p-5 text-sm text-text-muted shadow-soft-glow">
              <h2 className="mb-2 font-display text-base text-white">
                More you might like
              </h2>
              <ul className="space-y-3 text-xs">
                {relatedPosts.map((rp) => (
                  <li key={rp.id}>
                    <Link
                      to={`/blog/${rp.slug}`}
                      className="text-text-main hover:text-accent-gold"
                    >
                      {rp.title}
                    </Link>
                    <p className="text-text-muted/80">
                      {new Date(rp.date).toLocaleDateString()} · {rp.tags[0]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </MouseParallaxWrapper>
  );
};

export default BlogPost;
