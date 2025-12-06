// src/data/skills.ts

export interface Skill {
    name: string;
    category: string;
    level: number; // percentage 0–100
}

export const skills: Skill[] = [
    {
        name: 'React Native',
        category: 'Core Mobile',
        level: 90,
    },
    {
        name: 'Expo & EAS',
        category: 'Core Mobile',
        level: 85,
    },
    {
        name: 'TypeScript',
        category: 'Language',
        level: 88,
    },
    {
        name: 'React Navigation',
        category: 'Navigation',
        level: 86,
    },
    {
        name: 'State Management (Zustand / Redux)',
        category: 'Architecture',
        level: 80,
    },
    {
        name: 'Node.js & Express',
        category: 'Backend & APIs',
        level: 78,
    },
    {
        name: 'MongoDB / NoSQL',
        category: 'Databases',
        level: 75,
    },
    {
        name: 'REST APIs & Integration',
        category: 'Backend & APIs',
        level: 82,
    },
    {
        name: 'Git & GitHub',
        category: 'Tooling',
        level: 88,
    },
    {
        name: 'UI / UX & Motion',
        category: 'Design & Animations',
        level: 84,
    },
];
