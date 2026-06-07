// src/data/projects.ts

import wayGoodImg1 from '../assets/WayGoodHelpStudyAbroad1.png';
import wayGoodImg2 from '../assets/WayGoodHelpStudyAbroad2.png';
import wayGoodImg3 from '../assets/WayGoodHelpStudyAbroad3.png';
import disasterAlertImg from '../assets/DisasterSOS.png';

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
    images?: string[];
    repo?: string;
    liveUrl?: string;
    storeUrl?: string;
    outcome: string;
    featured?: boolean;
}

export const projects: Project[] = [
    // 1️⃣ WayGood HelpStudyAbroad App
    {
        id: 'waygood-help-study-abroad',
        slug: 'waygood-helpstudyabroad',
        title: 'WayGood HelpStudyAbroad App',
        year: '2024 - 2025',
        platform: 'Android & iOS · React Native CLI',
        role: 'Sole React Native developer on a study-abroad mobile app. Built 20+ screens from Figma, implemented custom light/dark theme system, reusable component library, authentication flows with live backend APIs, and path alias architecture.',
        description:
            'A comprehensive study-abroad platform mobile application designed to assist students with university applications, counseling tracker, and program explorations. Implemented pixel-perfect Figma screens, automated state integration, live REST API calls, secure storage, and customized navigation flows optimized for global student users.',
        tools: [
            'React Native CLI',
            'TypeScript',
            'Figma-to-code',
            'REST API',
            'Custom Theme System',
            'AsyncStorage',
            'React Navigation',
        ],
        image: wayGoodImg1,
        images: [wayGoodImg1, wayGoodImg2, wayGoodImg3],
        outcome: 'Built 20+ screens & custom dual-theming for Play Store launch.',
        featured: true,
        repo: 'https://github.com/ssatviksingh/waygood-study-abroad',
        liveUrl: 'https://play.google.com/store/search?q=WayGood&c=apps',
    },

    // 2️⃣ Disaster Alert & SOS App
    {
        id: 'disaster-alert-sos',
        slug: 'disaster-alert-sos-mobile',
        title: 'Disaster Alert & SOS App',
        year: '2025',
        platform: 'Android & iOS · React Native',
        role: 'Full-stack mobile app developer (frontend + backend)',
        description:
            'A safety-focused mobile application that provides real-time disaster alerts and an offline-first SOS system with live location sharing, file attachments, retry queueing, and accessibility features designed for emergency scenarios.',
        tools: [
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
        image: disasterAlertImg,
        images: [disasterAlertImg],
        outcome: 'Implemented 15+ screens and offline SOS queue in 14 days.',
        featured: true,
        repo: 'https://github.com/ssatviksingh/disaster-alert-sos',
    },

    // 3️⃣ Personal Finance Companion
    {
        id: 'personal-finance-companion',
        slug: 'personal-finance-companion',
        title: 'Personal Finance Companion',
        year: '2025',
        platform: 'Android & iOS · React Native',
        role: 'Independent mobile developer',
        description:
            'A Personal Finance Companion App built using React Native to track expenses, manage budgets, and improve financial habits. Features clean interactive charts, customized categories, and local data storage via AsyncStorage.',
        tools: [
            'React Native',
            'TypeScript',
            'AsyncStorage',
            'React Navigation',
            'Zustand',
        ],
        image: '',
        outcome: 'Implemented custom budgeting charts & local expense tracking.',
        featured: true,
        repo: 'https://github.com/ssatviksingh/personal-finance-companion',
    },

    // 4️⃣ CalmCompanion
    {
        id: 'calm-companion',
        slug: 'calm-companion',
        title: 'CalmCompanion Mobile App',
        year: '2025',
        platform: 'Android & iOS · React Native',
        role: 'Independent mobile developer',
        description:
            'A mental wellness mobile application offering breathing exercises, mood logging, and soundscapes designed to alleviate anxiety. Utilizes local state caching for offline capabilities and sound managers for audio playback.',
        tools: [
            'React Native',
            'TypeScript',
            'Expo',
            'Zustand',
            'AsyncStorage',
            'Expo Audio',
        ],
        image: '',
        outcome: 'Built custom audio player & breathing micro-interactions.',
        featured: false,
        repo: 'https://github.com/ssatviksingh/CalmCompanion',
    }
];
