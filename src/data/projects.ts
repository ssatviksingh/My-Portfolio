import wayGoodImg1 from '../assets/WayGoodHelpStudyAbroad1.png';
import wayGoodImg2 from '../assets/WayGoodHelpStudyAbroad2.png';
import wayGoodImg3 from '../assets/WayGoodHelpStudyAbroad3.png';
import disasterAlertImg from '../assets/DisasterSOS.png';
import virtualEventImg from '../assets/VirtualEvent.png';

/**
 * Single source of truth for portfolio projects.
 * Add a new project by appending one object to `projects`.
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  tech: string[];
  problem: string;
  role: string;
  features: string[];
  metrics?: string[];
  liveUrl?: string;
  repo?: string;
  storeUrl?: string;
  images: string[];
  year: string;
  platform: string;
  featured?: boolean;
  /** @deprecated use tagline / problem — kept for gradual migration */
  description?: string;
  /** @deprecated use metrics[0] */
  outcome?: string;
  /** @deprecated use tech */
  tools?: string[];
  /** Cover image — defaults to images[0] via helpers */
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'waygood-help-study-abroad',
    slug: 'waygood-helpstudyabroad',
    title: 'WayGood HelpStudyAbroad',
    tagline: 'Study-abroad mobile app built screen-by-screen from Figma to store-ready React Native.',
    year: '2024 - 2025',
    platform: 'Android & iOS · React Native CLI',
    role: 'Sole React Native developer — owned UI implementation, theming, auth flows, and API integration.',
    problem:
      'Students needed a trustworthy mobile companion for university discovery, counseling tracking, and program exploration — with pixel-accurate branding and dual themes.',
    features: [
      '20+ production screens mapped from Figma with consistent spacing and components',
      'Custom light/dark theme system with reusable primitive components',
      'Auth + secure storage wired to live REST APIs',
      'Path-alias architecture and React Navigation flows for global student UX',
    ],
    metrics: ['20+ screens shipped', 'Dual theme system', 'Play Store launch support'],
    tech: [
      'React Native CLI',
      'TypeScript',
      'Figma-to-code',
      'REST API',
      'Custom Theme System',
      'AsyncStorage',
      'React Navigation',
    ],
    images: [wayGoodImg1, wayGoodImg2, wayGoodImg3],
    featured: true,
    repo: 'https://github.com/ssatviksingh/waygood-study-abroad',
    liveUrl: 'https://play.google.com/store/search?q=WayGood&c=apps',
  },
  {
    id: 'disaster-alert-sos',
    slug: 'disaster-alert-sos-mobile',
    title: 'Disaster Alert & SOS',
    tagline: 'Offline-first emergency app with SOS queueing, location sharing, and accessibility-first UX.',
    year: '2025',
    platform: 'Android & iOS · React Native',
    role: 'Full-stack mobile developer (React Native frontend + Node/Express/Mongo backend).',
    problem:
      'During disasters, connectivity fails. Users still need a reliable way to send SOS messages, share location, and receive alerts.',
    features: [
      'Offline-first SOS composer with retry queue when network returns',
      'Live location sharing and attachment support for emergency context',
      'Real-time disaster alert surfaces tuned for stressful scenarios',
      'Accessibility-minded UI for high-stress, one-handed use',
    ],
    metrics: ['15+ screens', 'Offline SOS queue', 'Shipped in 14 days'],
    tech: [
      'React Native',
      'TypeScript',
      'Expo',
      'Zustand',
      'AsyncStorage',
      'React Navigation',
      'Node.js',
      'Express',
      'MongoDB',
    ],
    images: [disasterAlertImg],
    featured: true,
    repo: 'https://github.com/ssatviksingh/disaster-alert-sos',
  },
  {
    id: 'virtual-event-platform',
    slug: 'virtual-event-platform',
    title: 'Virtual Event Platform',
    tagline: 'Mobile-first event experience for browsing, RSVP, favorites, and real-time updates.',
    year: '2025',
    platform: 'Android & iOS · React Native',
    role: 'Mobile engineer — owned event discovery UI, RSVP flows, and notification-ready architecture.',
    problem:
      'Event organizers needed a polished mobile experience for discovery, RSVPs, and favorites — not a desktop site squeezed onto a phone.',
    features: [
      'Event discovery with category browsing and detail screens',
      'RSVP and favorites flows with clear empty/loading states',
      'Notification-ready structure for schedule and status updates',
      'Motion-aware UI patterns for a product-quality feel',
    ],
    metrics: ['RSVP + favorites flows', 'Real-time-ready data model', 'Mobile-first event UX'],
    tech: ['React Native', 'TypeScript', 'Expo', 'Node.js', 'MongoDB', 'REST API'],
    images: [virtualEventImg],
    featured: true,
    repo: 'https://github.com/ssatviksingh/virtual-event-platform',
  },
  {
    id: 'personal-finance-companion',
    slug: 'personal-finance-companion',
    title: 'Personal Finance Companion',
    tagline: 'Expense tracking and budgeting with interactive charts and local-first storage.',
    year: '2025',
    platform: 'Android & iOS · React Native',
    role: 'Independent mobile developer — product UI, charts, and local persistence.',
    problem:
      'People abandon finance apps that feel heavy. They need fast logging, clear budgets, and charts that make habits obvious.',
    features: [
      'Expense logging with custom categories',
      'Budget views backed by local AsyncStorage',
      'Interactive charts for spending patterns',
      'Clean navigation for daily quick-check usage',
    ],
    metrics: ['Local-first data', 'Custom budget charts', 'Production-ready repo'],
    tech: ['React Native', 'TypeScript', 'AsyncStorage', 'React Navigation', 'Zustand'],
    images: [],
    featured: true,
    repo: 'https://github.com/ssatviksingh/personal-finance-companion',
  },
  {
    id: 'calm-companion',
    slug: 'calm-companion',
    title: 'CalmCompanion',
    tagline: 'Wellness app for breathing exercises, mood logging, and calming soundscapes.',
    year: '2025',
    platform: 'Android & iOS · React Native',
    role: 'Independent mobile developer — audio playback, offline caches, and micro-interactions.',
    problem:
      'Anxiety tools fail when they feel clinical. CalmCompanion needed soft motion, reliable audio, and offline access.',
    features: [
      'Guided breathing micro-interactions',
      'Mood logging with local state caching',
      'Soundscape player via Expo Audio',
      'Offline-capable session flows',
    ],
    metrics: ['Custom audio player', 'Breathing micro-interactions', 'Offline-capable'],
    tech: ['React Native', 'TypeScript', 'Expo', 'Zustand', 'AsyncStorage', 'Expo Audio'],
    images: [],
    featured: false,
    repo: 'https://github.com/ssatviksingh/CalmCompanion',
  },
];

/** Prefer cover image, else first gallery image */
export function getProjectCover(project: Project): string {
  return project.image || project.images[0] || '';
}

export function getProjectTech(project: Project): string[] {
  return project.tech?.length ? project.tech : project.tools ?? [];
}

export function getProjectOutcome(project: Project): string {
  return project.outcome || project.metrics?.[0] || project.tagline;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
