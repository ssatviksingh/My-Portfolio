// src/data/projects.ts

// 👇 Import images so Vite can fingerprint + serve them correctly
import googleCalendarImg from '../assets/GoogleCalendar.png';
import netflixCloneImg from '../assets/NetflixClone.png';
import virtualEventImg from '../assets/VirtualEvent.png';

export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    role: string;
    year: string;
    platform: string;
    tools: string[];
    image: string;
    repo?: string;
    liveUrl?: string;
    storeUrl?: string;
}

export const projects: Project[] = [
    // 1️⃣ Google Calendar Clone App
    {
        id: 'google-calendar-app',
        slug: 'google-calendar-clone',
        title: 'Google Calendar Clone (Mobile)',
        year: '2025',
        platform: 'Android & iOS · React Native',
        role: 'Full-stack mobile app development',
        description:
            'A complete Google Calendar clone built using React Native (Expo) with monthly, weekly, and daily views, event creation, reminders, animations, and a polished UI optimized for mobile use.',
        tools: [
            'React Native',
            'TypeScript',
            'Expo',
            'React Navigation',
            'Tailwind CSS (NativeWind)',
            'Node.js',
            'MongoDB',
        ],
        image: googleCalendarImg,
        repo: 'https://github.com/ssatviksingh/google-calendar-clone',
    },

    // 2️⃣ Netflix Clone App
    {
        id: 'netflix-clone',
        slug: 'netflix-clone-mobile',
        title: 'Netflix Clone (Mobile)',
        year: '2024',
        platform: 'Android & iOS · React Native',
        role: 'Full UI + streaming integration',
        description:
            'A modern Netflix clone app with authentication, movie categories, detailed pages, video streaming, custom carousels, and interactive animations designed for mobile screens.',
        tools: [
            'React Native',
            'TypeScript',
            'Expo',
            'TMDB API',
            'AsyncStorage',
            'React Navigation',
        ],
        image: netflixCloneImg,
        repo: 'https://github.com/ssatviksingh/netflix-clone',
    },

    // 3️⃣ Virtual Event Platform Mobile App
    {
        id: 'virtual-events',
        slug: 'virtual-event-platform',
        title: 'Virtual Event Platform (Mobile App)',
        year: '2025',
        platform: 'Android · React Native',
        role: 'Feature development & UI/UX',
        description:
            'A mobile app for event discovery, RSVPs, favorites, authentication, notifications, and real-time updates — built with React Native and a Node.js backend.',
        tools: ['React Native', 'TypeScript', 'Expo', 'Node.js', 'MongoDB'],
        image: virtualEventImg,
        repo: 'https://github.com/ssatviksingh/virtual-event-platform',
    },
];
