# 🚀 **Satvik Singh — Mobile App Developer**
### **React Native | TypeScript | Expo | Animations | UI/UX**

📱 Building smooth, modern and production-ready mobile apps  

---

## 🚀 **Live Portfolio**
🔗 https://ssatviksingh.github.io/My-Portfolio/

---


## ✨ **Projects Included in This Portfolio**

### 📅 **Google Calendar Clone (Mobile)**
A complete calendar app built with React Native & Expo featuring:
- Monthly / Weekly / Daily views  
- Animations + smooth transitions  
- Reminder system  
- Event creation  
- Polished UI  

**Tech:** React Native, TypeScript, Expo, MongoDB, Node.js  

---

### 🎬 **Netflix Clone (Mobile)**
A fully functional Netflix-style mobile app:
- Authentication  
- Category browsing  
- Video streaming layout  
- Custom carousels  
- Advanced UI animations  

**Tech:** React Native, TypeScript, TMDB API, Expo  

---

### 🎉 **Virtual Event Platform (Mobile App)**
A mobile app for events, RSVPs, favorites, notifications & real-time updates.

**Tech:** React Native, Node.js, MongoDB, Expo  

---

## 🧰 **Tech Stack**


| Category | Technologies |
|---------|--------------|
| **Mobile** | React Native, Expo, TypeScript |
| **Backend** | Node.js, Express, MongoDB |
| **UI/UX** | Animations, Tailwind CSS (NativeWind) |
| **Tools** | Git, GitHub, GSAP, REST APIs |


---

## 🚀 **How to Run the Portfolio Locally**

```sh
git clone https://github.com/ssatviksingh/My-Portfolio
cd My-Portfolio
npm install
npm run dev

## 📬 Contact

If you'd like to collaborate or have a project idea:

Email: satviksingh164@gmail.com

LinkedIn: https://www.linkedin.com/in/satvik-singh-785337287/

GitHub: https://github.com/ssatviksingh
```

---

🚀 Deploying to GitHub Pages

This project uses HashRouter and the gh-pages package.

To deploy:
npm run build
npm run deploy

---

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


<div align="center">
⭐ If you like this portfolio, give the repo a star!
</div> ```