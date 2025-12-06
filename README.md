```
## 🚀 Satvik Singh — Mobile App Developer Portfolio

Welcome to the source code of my personal developer portfolio.
This website showcases my React Native projects, skills, experience, and blogs.

## 🛠 Tech Stack

Vite + React + TypeScript

Tailwind CSS

Framer Motion

GSAP Animations

React Router

Custom reusable components

Dark Mode themes

##📱 Featured Projects
📅 Google Calendar Clone (Mobile)

A complete Google Calendar app with:

Monthly / Weekly / Daily views

Events, reminders

Smooth animations

Built using React Native + Expo + TypeScript


🎬 Netflix Clone (Mobile)

A modern Netflix-style mobile app featuring:

Authentication

Movie categories

Custom carousel & animations

TMDB API integration

Complete mobile-first UI


🎉 Virtual Event Platform

A mobile app with:

Event discovery

RSVPs + Favorites

Real-time updates

Push notifications

Node.js backend support

## 📄 Blog System Included

The portfolio includes a full blog with:

Markdown support

Read-time estimator

Smooth transitions

Progress bar while reading

## 🧰 Folder Structure
src/
 ├── components/
 ├── pages/
 ├── data/
 ├── styles/
 ├── hooks/
 ├── assets/
 └── App.tsx

🌐 Live Website

Coming soon…

## 📬 Contact

If you'd like to collaborate or have a project idea:

Email: satviksingh164@gmail.com

LinkedIn: https://www.linkedin.com/in/satvik-singh-785337287/

GitHub: https://github.com/ssatviksingh
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
