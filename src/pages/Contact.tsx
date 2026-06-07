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
    if (!validate()) {
      e.preventDefault();
      return;
    }

    const now = Date.now();
    if (lastSentAt && now - lastSentAt < 60_000) {
      e.preventDefault();
      setErrorMessage('Please wait a moment before sending another message.');
      return;
    }

    setStatus('loading');
    setLastSentAt(now);
  };

  return (
    <MouseParallaxWrapper intensity={15}>
      <AnimatedSection id="contact" className="bg-bg-light dark:bg-bg-dark text-text-light-main dark:text-text-dark-main transition-colors duration-300">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk about your next mobile app"
            subtitle="Available for React Native and Flutter freelance projects. Response within 24 hours."
            align="center"
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* FORM */}
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm"
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
              {/* Correct redirect path on GitHub Pages */}
              <input
                type="hidden"
                name="redirect"
                value="https://ssatviksingh.github.io/My-Portfolio/#/thank-you"
              />
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
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted"
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
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none transition focus:border-brand-blue dark:focus:border-brand-blue-light"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted"
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
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none transition focus:border-brand-blue dark:focus:border-brand-blue-light"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-text-light-muted dark:text-text-dark-muted"
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
                  className="w-full resize-none rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 px-4 py-2.5 text-sm outline-none transition focus:border-brand-blue dark:focus:border-brand-blue-light"
                  placeholder="Tell me about your project or application needs..."
                />
              </div>

              {errorMessage && (
                <p className="text-xs font-semibold text-red-500">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto mt-2 inline-flex items-center justify-center rounded-2xl bg-brand-blue hover:bg-brand-blue-light dark:bg-brand-blue-light dark:hover:bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>

            {/* CONTACT INFO & DIRECT SOCIAL CHANNELS */}
            <aside className="space-y-6 text-sm text-text-light-muted dark:text-text-dark-muted">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                <h3 className="mb-3 font-display text-base font-bold text-text-light-main dark:text-text-dark-main">
                  Direct Outreach Channels
                </h3>
                <p className="mb-4 text-xs leading-relaxed">
                  Feel free to use the form or reach out directly through any of my official workspace profiles below:
                </p>

                <ul className="space-y-3 text-xs">
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-text-light-main dark:text-text-dark-main w-20">Email:</span>
                    <a
                      href="mailto:satviksingh164@gmail.com"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
                    >
                      satviksingh164@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-text-light-main dark:text-text-dark-main w-20">LinkedIn:</span>
                    <a
                      href="https://www.linkedin.com/in/satvik-singh-785337287/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
                    >
                      linkedin.com/in/satvik-singh-785337287/
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-text-light-main dark:text-text-dark-main w-20">GitHub:</span>
                    <a
                      href="https://github.com/ssatviksingh"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
                    >
                      github.com/ssatviksingh
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-text-light-main dark:text-text-dark-main w-20">Upwork:</span>
                    <a
                      href="https://www.upwork.com/freelancers/~0152c1a5b9ab135976?mp_source=share"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
                    >
                      Upwork Profile
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-bold text-text-light-main dark:text-text-dark-main w-20">Contra:</span>
                    <a
                      href="https://contra.com/satvik_singh_bz2tq3zn"
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-blue dark:text-brand-blue-light hover:underline font-semibold"
                    >
                      Contra Profile
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/35 p-6 text-xs shadow-sm">
                <p className="mb-2.5 font-bold text-text-light-main dark:text-text-dark-main">EdTech & SaaS Project Competency:</p>
                <ul className="list-inside list-disc space-y-1.5 leading-relaxed text-text-light-muted/80 dark:text-text-dark-muted/80">
                  <li>Custom mobile visual states from pixel Figma specs.</li>
                  <li>Light/Dark design theme logic integrations.</li>
                  <li>Secure credentials caching & API routing setups.</li>
                  <li>React Native CLI compilation error resolution.</li>
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
