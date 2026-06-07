// src/data/skills.ts

export interface SkillGroup {
    category: string;
    items: string[];
}

export const skills: SkillGroup[] = [
    {
        category: 'Mobile Development',
        items: [
            'React Native CLI',
            'Flutter',
            'TypeScript',
            'Expo',
            'React Navigation',
            'AsyncStorage',
            'Redux Toolkit'
        ]
    },
    {
        category: 'UI & Design',
        items: [
            'Figma-to-code',
            'Custom theme systems (light/dark)',
            'Component libraries',
            'Responsive layouts',
            'Animations (Animated API, Reanimated)'
        ]
    },
    {
        category: 'Web',
        items: [
            'React.js',
            'JavaScript',
            'HTML/CSS',
            'REST APIs'
        ]
    },
    {
        category: 'Tools',
        items: [
            'Git',
            'GitHub',
            'VS Code',
            'Android Studio',
            'Xcode'
        ]
    }
];
