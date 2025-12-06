export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
  tags: string[];
  image?: string;
  content: string; // HTML string for now
}

export const blogPosts: BlogPost[] = [
  {
    id: 'rn-architecture',
    slug: 'react-native-architecture-for-real-apps',
    title: 'React Native Architecture for Real-World Mobile Apps',
    date: '2025-02-01',
    excerpt:
      'How I design React Native app architecture for scalability: navigation, state, APIs, performance, and clean folder structures.',
    tags: ['React Native', 'Architecture', 'TypeScript'],
    image: '/images/blog/rn-architecture.jpg',
    content: `
      <p>
        Building a high-quality mobile application involves much more than rendering screens.
        A solid architecture is what allows an app to scale, stay maintainable, perform well,
        and grow with new features over time. React Native gives developers an excellent
        foundation, but it’s the architectural choices you make that determine how well
        your app handles real-world complexity.
      </p>

      <p>
        In this article, I’ll walk through the practical architecture I use when building
        production-ready React Native applications—covering folder structure, navigation,
        state management, API design, native modules, performance, and DevOps practices.
      </p>

      <h2>1. Understanding Modern React Native Architecture</h2>

      <p>
        React Native uses a hybrid model where JavaScript talks to native platform APIs.
        With the New Architecture, that communication is faster, more predictable, and
        better suited to complex apps.
      </p>

      <h3>How React Native Works (Simplified)</h3>
      <ul>
        <li><strong>JavaScript Thread</strong> – Runs your app logic and UI updates.</li>
        <li><strong>Native/UI Threads</strong> – Render components, animations, and heavy tasks.</li>
        <li><strong>JSI (JavaScript Interface)</strong> – Modern bridge for direct JS ↔ native calls.</li>
        <li><strong>Fabric Renderer</strong> – New renderer for faster UI updates.</li>
        <li><strong>TurboModules</strong> – Lazily-loaded native modules for better performance.</li>
      </ul>

      <p>
        Together, these pieces give you smoother animations, lower latency for interactions,
        and better compatibility with modern libraries like Reanimated and Gesture Handler.
      </p>

      <h2>2. Scalable Folder Structure</h2>

      <p>A clear folder structure makes a massive difference as your app grows:</p>

      <pre><code>src/
  ├── api/
  ├── components/
  ├── hooks/
  ├── navigation/
  ├── screens/
  ├── store/
  ├── services/
  ├── utils/
  ├── assets/
  └── types/
      </code></pre>

      <h3>Why this works</h3>
      <ul>
        <li>Responsibilities are clearly separated.</li>
        <li>New contributors can quickly understand the layout.</li>
        <li>Reusable building blocks live in predictable places.</li>
        <li>Logic becomes easier to test and maintain over time.</li>
      </ul>

      <h2>3. Navigation Architecture</h2>

      <p>
        Navigation can become messy quickly if not planned. I typically rely on React Navigation
        and use a layered approach that mirrors user flows.
      </p>

      <h3>Recommended setup</h3>
      <ul>
        <li><strong>Root Navigator</strong> – Decides between auth flow and main app.</li>
        <li><strong>Auth Navigator</strong> – Login, signup, forgot password, onboarding.</li>
        <li><strong>App Navigator</strong> – Main tabs and stacks for core features.</li>
        <li><strong>Tab Navigator</strong> – Home, Search, Profile, Settings, etc.</li>
        <li><strong>Stacks inside tabs</strong> – Detail screens and sub-flows.</li>
        <li><strong>Modal Screens</strong> – Overlays, sheets, confirmation dialogs.</li>
      </ul>

      <p>
        This structure keeps navigation predictable and makes deep linking, authentication,
        and nested flows much easier to manage.
      </p>

      <h2>4. State Management Architecture</h2>

      <p>
        Not all state is equal. Mixing UI state, server state, and app-wide data in one tool
        often leads to complexity. I prefer splitting them by responsibility.
      </p>

      <h3>Local UI state</h3>
      <p>Use the built-in hooks for small, screen-specific concerns:</p>
      <ul>
        <li><code>useState</code> – Simple toggles and local form values.</li>
        <li><code>useReducer</code> – Slightly more complex UI flows.</li>
        <li><code>useContext</code> – Shared state in very small areas.</li>
      </ul>

      <h3>Global app state</h3>
      <ul>
        <li><strong>Zustand</strong> – Lightweight, minimal boilerplate, scales nicely.</li>
        <li><strong>Redux Toolkit</strong> – Great for large teams and very big apps.</li>
      </ul>

      <h3>Server state (API data)</h3>
      <p><strong>React Query</strong> is my go-to for:</p>
      <ul>
        <li>Data fetching, caching, and background revalidation.</li>
        <li>Retries, pagination, and optimistic updates.</li>
        <li>Keeping client data in sync with backend changes.</li>
      </ul>

      <p>
        My favorite combo is: <strong>React Query + Zustand (or Redux Toolkit)</strong>.
        API data is handled by React Query; app logic and UI state are handled by the store.
      </p>

      <h2>5. API Architecture</h2>

      <p>
        Instead of calling <code>fetch</code> or <code>axios</code> directly from screens,
        I always use a dedicated API layer.
      </p>

      <h3>Recommended pattern</h3>

      <pre><code>api/
  ├── client.ts      // axios/fetch instance with interceptors
  ├── auth.ts        // login, logout, refresh, profile
  ├── user.ts        // user-specific operations
  ├── events.ts      // feature-specific modules
  └── ...
      </code></pre>

      <h3>Benefits</h3>
      <ul>
        <li>Cleaner screens with less networking code.</li>
        <li>Easier to test API logic in isolation.</li>
        <li>Simple to swap or update the HTTP client.</li>
      </ul>

      <h2>6. Component Architecture</h2>

      <p>I classify components into three main categories:</p>

      <h3>UI components</h3>
      <ul>
        <li>Buttons, inputs, text, cards, badges.</li>
        <li>Purely presentational, no business logic.</li>
      </ul>

      <h3>Feature components</h3>
      <ul>
        <li>LoginForm, EventCard, ProfileHeader.</li>
        <li>Use hooks to handle logic but remain reusable.</li>
      </ul>

      <h3>Screen components</h3>
      <ul>
        <li>LoginScreen, HomeScreen, SettingsScreen.</li>
        <li>Orchestrate hooks, navigation, and feature components.</li>
      </ul>

      <p>
        The main rule: <strong>screens orchestrate, hooks and services handle logic, UI
        components render</strong>.
      </p>

      <h2>7. Custom Hooks</h2>

      <p>
        Custom hooks are where most of my business logic lives.
      </p>

      <pre><code>hooks/
  ├── useAuth.ts
  ├── useEvents.ts
  ├── useNetwork.ts
  ├── useTheme.ts
  └── ...
      </code></pre>

      <ul>
        <li>They keep components lean and readable.</li>
        <li>They let you reuse logic across multiple screens.</li>
        <li>They are straightforward to test in isolation.</li>
      </ul>

      <h2>8. Performance Architecture</h2>

      <p>
        Performance is not just about “optimizing at the end.” It’s part of the architecture.
      </p>

      <h3>Key practices</h3>
      <ul>
        <li>Enable the <strong>Hermes</strong> engine.</li>
        <li>Use <code>FlatList</code> or <code>SectionList</code> for lists.</li>
        <li>Memoize list items with <code>React.memo</code>.</li>
        <li>Use <code>useCallback</code> and <code>useMemo</code> wisely.</li>
        <li>Use <strong>Reanimated</strong> + <strong>Gesture Handler</strong> for complex animations.</li>
      </ul>

      <p>
        A lot of user-perceived performance comes from smooth transitions, stable FPS, and
        avoiding unnecessary re-renders.
      </p>

      <h2>9. Native Modules &amp; Platform Layer</h2>

      <p>
        Sometimes JavaScript alone is not enough. For heavy or hardware-level tasks, you may
        need native code.
      </p>

      <h3>When I consider native modules</h3>
      <ul>
        <li>Heavy or time-sensitive computations.</li>
        <li>Bluetooth, sensors, biometrics, low-level hardware access.</li>
        <li>AR, image processing, or custom ML models.</li>
      </ul>

      <p>
        With TurboModules and JSI, you can build native extensions that feel tightly integrated
        with your JavaScript logic.
      </p>

      <h2>10. DevOps &amp; Build Architecture</h2>

      <p>
        A production app lives or dies by how consistently you can build, test, and ship it.
      </p>

      <h3>Recommended practices</h3>
      <ul>
        <li>
          Use CI/CD (GitHub Actions, Bitrise, App Center) for automated builds and basic tests.
        </li>
        <li>
          Use over-the-air updates (Expo Updates or CodePush where appropriate) for small fixes.
        </li>
        <li>
          Store secrets and environment variables in <code>.env</code> files and never commit them.
        </li>
      </ul>

      <h2>11. Best Practices Summary</h2>

      <ul>
        <li>Use the New Architecture when possible.</li>
        <li>Maintain a clear, scalable folder structure.</li>
        <li>Separate UI, business logic, API, and navigation responsibilities.</li>
        <li>Use React Query for server state and caching.</li>
        <li>Use Zustand or Redux Toolkit for app/global state.</li>
        <li>Keep screens thin—most logic belongs in hooks or services.</li>
        <li>Optimize lists, images, and animations early.</li>
        <li>Use TypeScript across the codebase.</li>
        <li>Invest in CI/CD and a reliable release pipeline.</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
        A well-designed React Native architecture transforms a simple prototype into a stable,
        scalable product. By combining a clean folder structure, modern state tools, the New
        Architecture, and thoughtful performance practices, your app can comfortably handle
        real-world complexity.
      </p>

      <p>
        React Native gives you powerful tools—the architecture you choose is what turns them
        into a long-lasting, production-grade application.
      </p>
    `,
  },

  {
    id: 'animations',
    slug: 'animations-and-ux-in-react-native',
    title: 'Using Animations to Improve UX in React Native Apps',
    date: '2025-01-10',
    excerpt:
      'How thoughtful animations in React Native can improve UX, guide users, and make apps feel smooth and modern.',
    tags: ['Animations', 'UX', 'React Native'],
    image: '/images/blog/rn-animations.jpg',
    content: `
      <p>
        Animations are one of the fastest ways to make a mobile app feel polished, modern,
        and intuitive. They guide attention, provide feedback, and help users understand how
        the interface responds to their actions. In React Native, we have powerful tools like
        Reanimated, Gesture Handler, and Layout Animations to build fluid, native-feeling motion.
      </p>

      <p>
        In this article, I’ll break down why animations matter for UX, the types of patterns
        that make the biggest impact, and which libraries I reach for in real projects.
      </p>

      <h2>1. Why Animations Matter in UX</h2>

      <p>Good animations are not just visual candy—they should serve a clear purpose:</p>

      <ul>
        <li><strong>Make the UI feel alive</strong> – elements respond directly to user input.</li>
        <li><strong>Clarify navigation</strong> – transitions show how screens are related.</li>
        <li><strong>Provide instant feedback</strong> – users see that their actions are registered.</li>
        <li><strong>Reduce cognitive load</strong> – motion helps users track what changed.</li>
        <li><strong>Increase delight and satisfaction</strong> – apps feel premium and intentional.</li>
      </ul>

      <h2>2. Types of UX-Enhancing Animations</h2>

      <h3>1. Micro-interactions</h3>
      <p>
        Micro-interactions are small, focused animations tied to a single action. For example:
      </p>
      <ul>
        <li>Buttons that slightly scale or change color on press.</li>
        <li>Like/heart icons that “pop” when toggled.</li>
        <li>Switches that glide smoothly between states.</li>
      </ul>
      <p>These details make the interface feel reactive and responsive to the user.</p>

      <h3>2. Screen transitions</h3>
      <p>
        Transitions between screens do more than look nice—they explain position and direction:
      </p>
      <ul>
        <li>Sliding in a new screen from the right or bottom.</li>
        <li>Fading content as a modal appears.</li>
        <li>Subtle scaling when stacking or dismissing screens.</li>
      </ul>
      <p>
        React Navigation combined with Reanimated allows you to customize these transitions
        while keeping everything running at 60fps.
      </p>

      <h3>3. Layout and element transitions</h3>
      <p>
        When elements move or re-order, abrupt jumps can feel jarring. Instead, you can:
      </p>
      <ul>
        <li>Animate cards as filters change.</li>
        <li>Make list items slide into new positions.</li>
        <li>Fade items in/out on insert or removal.</li>
      </ul>
      <p>
        Layout animations make the interface feel more coherent and easier to follow.
      </p>

      <h3>4. Gesture-driven animations</h3>
      <p>
        Gesture-based interactions combine touch input with smooth motion. Common patterns:
      </p>
      <ul>
        <li>Swipe to delete or archive list items.</li>
        <li>Drag and drop cards between columns.</li>
        <li>Pull-to-refresh interactions.</li>
        <li>Bottom sheets that respond to drag gestures.</li>
      </ul>
      <p>
        Using React Native Gesture Handler together with Reanimated makes these feel
        as smooth as native apps.
      </p>

      <h3>5. Loading and progress states</h3>
      <p>
        Instead of a simple spinner, you can use:
      </p>
      <ul>
        <li>Skeleton screens that hint at upcoming content.</li>
        <li>Lottie animations that match your brand.</li>
        <li>Animated progress bars during uploads or sync.</li>
      </ul>
      <p>
        These reduce perceived wait time and keep users engaged while the app works.
      </p>

      <h2>3. Animation Libraries in React Native</h2>

      <h3>1. Reanimated 3</h3>
      <p>
        Reanimated is my first choice for complex or performance-critical animations.
        It runs animations on the UI thread, which keeps motion smooth and responsive,
        even under heavy load.
      </p>
      <ul>
        <li>Great for gestures and interactive elements.</li>
        <li>Supports springs, timing, delays, and shared values.</li>
        <li>Pairs perfectly with Gesture Handler.</li>
      </ul>

      <h3>2. Built-in Animated API</h3>
      <p>
        React Native’s built-in Animated API is still useful for smaller cases:
      </p>
      <ul>
        <li>Simple fades and scales.</li>
        <li>Basic transitions on mount/unmount.</li>
        <li>One-off animations that don’t involve gestures.</li>
      </ul>

      <h3>3. Lottie</h3>
      <p>
        Lottie renders vector animations exported from After Effects. It’s ideal for:
      </p>
      <ul>
        <li>Onboarding flows and hero animations.</li>
        <li>Custom loading indicators.</li>
        <li>Success and error states.</li>
      </ul>

      <h3>4. Moti</h3>
      <p>
        Moti is a friendlier abstraction on top of Reanimated. It trades some low-level
        control for a much nicer developer experience.
      </p>
      <ul>
        <li>Declarative syntax.</li>
        <li>Great for quickly adding micro-interactions.</li>
        <li>Perfect for developers new to advanced animations.</li>
      </ul>

      <h2>4. UX Patterns Where Animations Shine</h2>

      <h3>Interactive buttons</h3>
      <p>
        A floating action button that expands into multiple actions, or a button that responds
        with a smooth scale and color change, can completely change how engaging your UI feels.
      </p>

      <h3>Onboarding screens</h3>
      <p>
        Animated illustrations, progressive reveals, and smooth transitions between steps help
        users understand your app’s value and reduce drop-off during onboarding.
      </p>

      <h3>Collapsible sections and accordions</h3>
      <p>
        FAQ blocks, settings categories, or filter panels feel much better when they expand and
        collapse with smooth motion instead of abruptly popping open or closed.
      </p>

      <h3>Swipeable list items</h3>
      <p>
        Swiping to delete or archive feels natural and efficient. Animated backgrounds, icons,
        and thresholds give users clear feedback about what will happen.
      </p>

      <h3>Bottom sheets and drawers</h3>
      <p>
        Sliding panels that appear from the bottom or side of the screen are everywhere in modern apps.
        Animations make them feel like part of the screen instead of a separate layer.
      </p>

      <h2>5. Best Practices for UX-Friendly Animations</h2>

      <ul>
        <li><strong>Keep them short:</strong> 150–300ms is usually enough.</li>
        <li><strong>Use easing:</strong> ease-in/ease-out feels more natural than linear.</li>
        <li><strong>Don’t overdo it:</strong> too much motion is distracting and tiring.</li>
        <li><strong>Focus on clarity:</strong> animations should explain changes, not hide them.</li>
        <li><strong>Test on real devices:</strong> simulators can hide performance issues.</li>
      </ul>

      <h2>6. Example: Simple Fade-in with Reanimated</h2>

      <p>Here’s a minimal fade-in wrapper component using Reanimated:</p>

      <pre><code>import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export function FadeInView({ children }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return &lt;Animated.View style={style}&gt;{children}&lt;/Animated.View&gt;;
}
      </code></pre>

      <p>
        Wrap any element with <code>FadeInView</code>, and it will smoothly fade into view
        when mounted, with almost no extra code in your screens.
      </p>

      <h2>Conclusion</h2>

      <p>
        Animations are no longer optional if you want your React Native app to feel modern and
        intuitive. Whether it’s a tiny button interaction or a complex gesture-driven bottom sheet,
        well-designed animations can dramatically improve user satisfaction and engagement.
      </p>

      <p>
        React Native gives you a rich toolbox—Reanimated, Gesture Handler, Lottie, Moti, and more.
        The key is using them with intention, so every animation makes the experience clearer,
        smoother, and more enjoyable.
      </p>
    `,
  },

  {
    id: 'expo-vs-bare',
    slug: 'expo-vs-bare-react-native-when-to-choose-what',
    title: 'Expo vs Bare React Native: How I Decide for New Projects',
    date: '2024-12-20',
    excerpt:
      'How I choose between Expo and Bare React Native for new projects—based on performance, native modules, deadlines, team size, and long-term scalability.',
    tags: ['Expo', 'React Native', 'Tooling'],
    image: '/images/blog/expo-vs-bare.jpg',
    content: `
      <p>
        When I start a new React Native project, one of the first big decisions is whether
        to use <strong>Expo</strong> or the <strong>Bare React Native</strong> workflow.
        Both are capable of shipping great apps, but they shine in different situations.
      </p>

      <p>
        In this post, I’ll walk through how I personally decide between Expo and Bare:
        looking at performance needs, native integrations, deadlines, team skills, and how
        much long-term flexibility the project requires.
      </p>

      <h2>1. Understanding the Two Approaches</h2>

      <h3>Expo (Managed Workflow)</h3>
      <p>Expo bundles a lot of decisions and tools for you:</p>
      <ul>
        <li>Preconfigured iOS and Android build environments.</li>
        <li>Access to many device APIs (camera, location, notifications, etc.).</li>
        <li>Expo Go for instant previewing during development.</li>
        <li>EAS Build and EAS Submit for cloud builds and store deployment.</li>
        <li>Over-the-air (OTA) updates for shipping small changes fast.</li>
      </ul>

      <p>
        Expo hides most of the native complexity so you can focus on writing JavaScript
        and TypeScript. It is especially good for teams that want speed and stability.
      </p>

      <h3>Bare React Native</h3>
      <p>
        The Bare workflow exposes the underlying native projects directly:
      </p>
      <ul>
        <li>Full access to Xcode and Android Studio projects.</li>
        <li>Ability to add any native library or SDK you want.</li>
        <li>Deeper performance tuning at the platform level.</li>
        <li>Unlimited customization of build pipelines and configurations.</li>
      </ul>

      <p>
        Bare is ideal for apps that need heavy native integrations or unusual system-level behavior.
      </p>

      <h2>2. When I Choose Expo</h2>

      <p>I lean toward Expo when:</p>
      <ul>
        <li>The app does not require unusual or custom native modules.</li>
        <li>Most required features are already covered by Expo SDK or JS libraries.</li>
        <li>Speed of development is a high priority.</li>
        <li>The team is more comfortable with JS/TS than native code.</li>
        <li>Over-the-air updates are valuable for quickly patching UI or minor logic.</li>
      </ul>

      <p>
        Expo is perfect for MVPs, startup apps, internal tools, event apps, educational
        projects, side projects, and portfolios. When I want to get something into people’s
        hands fast and keep build complexity low, Expo is usually my first choice.
      </p>

      <h2>3. When I Choose Bare React Native</h2>

      <p>On the other hand, I go with Bare when:</p>
      <ul>
        <li>I need to integrate heavyweight or highly custom native SDKs.</li>
        <li>I need extremely fine-grained performance tuning at the native level.</li>
        <li>The app must access OS features that Expo doesn’t support or expose yet.</li>
        <li>There are strict enterprise or platform-specific requirements.</li>
      </ul>

      <p>Some typical examples:</p>
      <ul>
        <li>AR/VR apps with custom rendering pipelines.</li>
        <li>Apps that use advanced camera or image-processing SDKs.</li>
        <li>IoT/Bluetooth-heavy applications with special hardware.</li>
        <li>Apps that integrate with proprietary or closed-source native libraries.</li>
      </ul>

      <h2>4. The Hybrid Middle Ground: Expo Prebuild + Custom Dev Client</h2>

      <p>
        There’s a powerful hybrid option: keep using the Expo ecosystem, but generate the
        native projects and add your own modules.
      </p>

      <ul>
        <li>Use <code>expo prebuild</code> to create iOS/Android projects.</li>
        <li>Add custom native modules as needed.</li>
        <li>Still build with EAS and use many Expo tools.</li>
      </ul>

      <p>
        I choose this approach when Expo covers 90% of what I need, but the app requires
        one or two extra native integrations that aren’t available in the managed workflow.
      </p>

      <h2>5. Performance: Expo vs Bare</h2>

      <p>
        With the New Architecture (JSI, Fabric, TurboModules), the performance gap between
        Expo and Bare has shrunk significantly.
      </p>

      <ul>
        <li>Both can use the Hermes engine for faster startup and better memory usage.</li>
        <li>Both support Reanimated, Gesture Handler, and other advanced libraries.</li>
        <li>Both can feel as fast and smooth as fully native apps.</li>
      </ul>

      <p>
        In most typical apps, performance alone is not a strong enough reason to avoid Expo.
        I only go Bare for performance when I know I’ll be writing or tuning native code anyway.
      </p>

      <h2>6. Cost and Maintainability</h2>

      <h3>Expo</h3>
      <ul>
        <li>Less time spent on build configuration and troubleshooting.</li>
        <li>Upgrades are usually smoother thanks to Expo’s tooling and documentation.</li>
        <li>Easier for new developers to onboard into the project.</li>
      </ul>

      <h3>Bare React Native</h3>
      <ul>
        <li>More responsibility for native build issues (Gradle, Pods, Xcode settings).</li>
        <li>Library upgrades can be more fragile and time-consuming.</li>
        <li>Requires someone on the team who is comfortable with iOS and Android tooling.</li>
      </ul>

      <h2>7. How I Make the Final Call</h2>

      <h3>I choose Expo when:</h3>
      <ul>
        <li>The feature set matches what Expo already offers.</li>
        <li>Time-to-market is critical.</li>
        <li>The app is content-focused, social, or productivity-oriented.</li>
        <li>The team wants to stay in JavaScript/TypeScript as much as possible.</li>
      </ul>

      <h3>I choose Bare when:</h3>
      <ul>
        <li>The app depends heavily on custom or proprietary native code.</li>
        <li>It needs niche OS integrations or tight platform control.</li>
        <li>The product roadmap clearly includes features that Expo would struggle with.</li>
      </ul>

      <h2>Conclusion</h2>

      <p>
        For most of my new projects, I reach for Expo first—often 70–80% of the time. Its
        ecosystem, tooling, and developer experience have matured to the point where it
        handles a large portion of real-world use cases without friction.
      </p>

      <p>
        Bare React Native, however, remains an essential option when full native access and
        deep customization are non-negotiable. The key is not to think of Expo vs Bare as a
        “good vs bad” choice, but as two different tools you pick based on your project’s
        constraints, your team’s skills, and your long-term goals.
      </p>
    `,
  },
];
