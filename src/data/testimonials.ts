export interface Testimonial {
    id: string;
    name: string;
    role: string;
    company: string;
    quote: string;
}

export const testimonials: Testimonial[] = [
    {
        id: 'client-1',
        name: 'Product Manager',
        role: 'PM',
        company: 'Startup (Mobile SaaS)',
        quote:
            'Satvik quickly turned our rough wireframes into a smooth React Native app. The navigation and animations felt polished from the very first build.',
    },
    {
        id: 'client-2',
        name: 'Tech Lead',
        role: 'Tech Lead',
        company: 'Remote Team',
        quote:
            'He has a strong understanding of mobile UX and performance. API integration, state management, and error handling were all handled very cleanly.',
    },
    {
        id: 'client-3',
        name: 'Founder',
        role: 'Founder',
        company: 'Early-stage product',
        quote:
            'Our prototype mobile app went from idea to TestFlight build in a short time. Satvik was proactive, communicative, and cared about details.',
    },
];
