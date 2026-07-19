export const SITE_URL = 'https://my-portfolio-coral-seven-61.vercel.app';
export const SITE_NAME = 'Satvik Singh';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;
export const DEFAULT_DESCRIPTION =
  'Satvik Singh - React Native Developer. Pixel-accurate Figma-to-code mobile UI for EdTech and SaaS startups.';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string;
}

/** Static pages - keep paths in sync with AppRouter */
export const staticRouteMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'Satvik Singh - React Native Developer',
    description: DEFAULT_DESCRIPTION,
    keywords: 'React Native, TypeScript, mobile developer, portfolio, Expo',
  },
  {
    path: '/about',
    title: 'About',
    description:
      'About Satvik Singh - React Native developer focused on pixel-accurate mobile UI, animations, and production apps.',
    keywords: 'about, React Native developer, mobile engineer',
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    description:
      'Selected React Native case studies: study-abroad apps, disaster SOS, finance tools, and wellness products.',
    keywords: 'portfolio, React Native projects, case studies',
  },
  {
    path: '/skills',
    title: 'Skills',
    description:
      'Mobile stack: React Native, TypeScript, Expo, animations, API integration, and product-minded UI engineering.',
    keywords: 'skills, React Native, TypeScript, Expo',
  },
  {
    path: '/blog',
    title: 'Blog',
    description:
      'Practical notes on React Native architecture, animations, Expo vs bare workflow, and shipping mobile apps.',
    keywords: 'blog, React Native, mobile development',
  },
  {
    path: '/contact',
    title: 'Contact',
    description:
      'Get in touch with Satvik Singh for React Native / mobile frontend work and startup collaborations.',
    keywords: 'contact, hire React Native developer',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy',
    description: 'Privacy policy for Satvik Singh’s portfolio site.',
  },
  {
    path: '/thank-you',
    title: 'Thank You',
    description: 'Thanks for reaching out - your message was sent successfully.',
  },
];

/** Project pages - slugs must match src/data/projects.ts */
export const projectRouteMeta: RouteMeta[] = [
  {
    path: '/portfolio/waygood-helpstudyabroad',
    title: 'WayGood HelpStudyAbroad App',
    description:
      'Study-abroad React Native app: 20+ Figma screens, auth, live REST APIs, and a custom light/dark theme system.',
    keywords: 'React Native, study abroad, Figma, case study',
  },
  {
    path: '/portfolio/disaster-alert-sos-mobile',
    title: 'Disaster Alert & SOS App',
    description:
      'Offline-first SOS mobile app with live location sharing, retry queueing, and emergency-focused UX.',
    keywords: 'React Native, SOS, offline-first, case study',
  },
  {
    path: '/portfolio/personal-finance-companion',
    title: 'Personal Finance Companion',
    description:
      'React Native finance companion for budgets, expenses, and interactive charts with local storage.',
    keywords: 'React Native, fintech, budgeting, case study',
  },
  {
    path: '/portfolio/calm-companion',
    title: 'CalmCompanion Mobile App',
    description:
      'Mental wellness React Native app with breathing exercises, mood logging, and soundscapes.',
    keywords: 'React Native, wellness, Expo, case study',
  },
];

/** Blog posts - slugs must match src/data/blogPosts.ts */
export const blogRouteMeta: RouteMeta[] = [
  {
    path: '/blog/react-native-architecture-for-real-apps',
    title: 'React Native Architecture for Real-World Mobile Apps',
    description:
      'How to design React Native architecture for scale: navigation, state, APIs, performance, and folder structure.',
    keywords: 'React Native, architecture, TypeScript',
  },
  {
    path: '/blog/animations-and-ux-in-react-native',
    title: 'Animations and UX in React Native',
    description:
      'Practical animation and UX patterns for React Native apps that feel polished without hurting performance.',
    keywords: 'React Native, animations, UX',
  },
  {
    path: '/blog/expo-vs-bare-react-native-when-to-choose-what',
    title: 'Expo vs Bare React Native',
    description:
      'When to choose Expo or bare React Native - tradeoffs for startups shipping production mobile apps.',
    keywords: 'Expo, React Native, mobile workflow',
  },
];

export const allRouteMeta: RouteMeta[] = [
  ...staticRouteMeta,
  ...projectRouteMeta,
  ...blogRouteMeta,
];

export function resolveRouteMeta(pathname: string): RouteMeta {
  const exact = allRouteMeta.find((route) => route.path === pathname);
  if (exact) return exact;

  return {
    path: pathname,
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist on Satvik Singh’s portfolio.',
  };
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function formatPageTitle(title: string): string {
  if (title.includes(SITE_NAME)) return title;
  return `${title} | ${SITE_NAME}`;
}
