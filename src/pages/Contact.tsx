// src/pages/Contact.tsx
import React, { useState } from 'react';
import AnimatedSection from '../components/common/AnimatedSection';
import SectionHeading from '../components/common/SectionHeading';
import MouseParallaxWrapper from '../components/common/MouseParallaxWrapper';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = 'idle' | 'loading';

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [status, setStatus] = useState<Status>('idle');
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMessage('Please fill in all fields.');
      return false;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(form.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 1) basic validation
    if (!validate()) {
      e.preventDefault();
      return;
    }

    // 2) simple rate limiting (client-side)
    const now = Date.now();
    if (lastSentAt && now - lastSentAt < 60_000) {
      e.preventDefault();
      setErrorMessage('Please wait a moment before sending another message.');
      return;
    }

    // 3) mark as loading and remember time
    setStatus('loading');
    setLastSentAt(now);
    // IMPORTANT: do NOT preventDefault here → browser will POST to Web3Forms
  };

  return (
    <MouseParallaxWrapper intensity={20}>
      <AnimatedSection id="contact">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk about your next mobile app"
            subtitle="Whether you’re exploring ideas, need help with a React Native app, or want to collaborate, feel free to reach out."
            align="center"
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* FORM */}
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4 rounded-3xl border border-slate-800 bg-deep-blue-soft/80 p-6 shadow-soft-glow"
            >
              {/* Web3Forms config */}
              <input
                type="hidden"
                name="access_key"
                value="ff1246f2-be4d-48f7-8561-dff2bcb0bada"
              />
              <input
                type="hidden"
                name="from_name"
                value="Portfolio Contact Form"
              />
              <input
                type="hidden"
                name="subject"
                value="New Message from Portfolio"
              />
              {/* redirect to a dedicated thank-you page on your domain */}
              <input
                type="hidden"
                name="redirect"
                value="https://satviksingh.com/thank-you"
              />
              {/* simple anti-bot honeypot (Web3Forms supports this) */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-xs uppercase tracking-[0.2em] text-text-muted"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-bg-dark px-3 py-2 text-sm text-text-main outline-none transition focus:border-accent-gold"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-xs uppercase tracking-[0.2em] text-text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-bg-dark px-3 py-2 text-sm text-text-main outline-none transition focus:border-accent-gold"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-xs uppercase tracking-[0.2em] text-text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-slate-700 bg-bg-dark px-3 py-2 text-sm text-text-main outline-none transition focus:border-accent-gold"
                  placeholder="Tell me about your project…"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-400">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-accent-orange via-accent-gold to-muted-green px-6 py-3 text-sm font-medium text-bg-dark shadow-soft-glow transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
            </form>

            {/* CONTACT INFO / SOCIALS */}
            <aside className="space-y-5 text-sm text-text-muted">
              <div className="rounded-3xl border border-slate-800 bg-deep-blue-soft/60 p-5">
                <h3 className="mb-2 font-display text-lg text-white">
                  Prefer email or social?
                </h3>
                <p className="mb-3 text-xs">
                  You can also reach me directly using the details below if you
                  prefer not to use the form.
                </p>

                <ul className="space-y-2 text-xs">
                  <li>
                    <span className="text-text-main">Email:</span>{' '}
                    <a
                      href="mailto:satviksingh164@gmail.com"
                      className="text-accent-gold hover:text-accent-orange"
                    >
                      satviksingh164@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="text-text-main">LinkedIn:</span>{' '}
                    <a
                      href="https://www.linkedin.com/in/satvik-singh-785337287/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-gold hover:text-accent-orange"
                    >
                      linkedin.com/in/satvik-singh-785337287/
                    </a>
                  </li>
                  <li>
                    <span className="text-text-main">GitHub:</span>{' '}
                    <a
                      href="https://github.com/ssatviksingh"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent-gold hover:text-accent-orange"
                    >
                      github.com/ssatviksingh
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-deep-blue-soft/40 p-5 text-xs">
                <p className="mb-2 text-text-main">What I can help with:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>React Native app development (Android &amp; iOS)</li>
                  <li>UI implementation from Figma or rough ideas</li>
                  <li>Integrating APIs, auth, and real-time features</li>
                  <li>Improving UX, performance, and animations</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </AnimatedSection>
    </MouseParallaxWrapper>
  );
};

export default Contact;
