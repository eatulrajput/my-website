// skillsData.ts
import { Code2, Database, Library, Smartphone, Wrench } from "lucide-react";
import type { SkillCategory } from "./types";

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    icon: Code2,
    items: [
      {
        name: "JavaScript",
        level: "Advanced",

        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        level: "Intermediate",

        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Java",
        level: "Beginner",

        link: "https://www.oracle.com/java/",
      },
    ],
  },
  {
    category: "Frameworks & Core",
    icon: Smartphone,
    items: [
      {
        name: "React Native",
        level: "Advanced",

        link: "https://reactnative.dev/",
      },
      {
        name: "Expo",
        level: "Advanced",

        link: "https://expo.dev/",
      },
      {
        name: "React",
        level: "Advanced",

        link: "https://react.dev/",
      },
      {
        name: "Next.js",
        level: "Advanced",

        link: "https://nextjs.org/",
      },
    ],
  },
  {
    category: "Libraries",
    icon: Library,
    items: [
      {
        name: "React Navigation",
        level: "Advanced",

        link: "https://reactnavigation.org/",
      },
      {
        name: "Redux",
        level: "Advanced",

        link: "https://redux.js.org/",
      },
      {
        name: "Zustand",
        level: "Advanced",

        link: "https://zustand-demo.pmnd.rs/",
      },
      {
        name: "Reanimated",
        level: "Beginner",

        link: "https://docs.swmansion.com/react-native-reanimated/",
      },
      {
        name: "Axios",
        level: "Intermediate",

        link: "https://axios-http.com/",
      },
    ],
  },
  {
    category: "Databases & BaaS",
    icon: Database,
    items: [
      {
        name: "SQLite",
        level: "Intermediate",

        link: "https://www.sqlite.org/",
      },
      {
        name: "Firebase",
        level: "Beginner",

        link: "https://firebase.google.com/",
      },
      {
        name: "Supabase",
        level: "Beginner",

        link: "https://supabase.com/",
      },
      {
        name: "Realm",
        level: "Beginner",

        link: "https://realm.io/",
      },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    items: [
      {
        name: "Git",
        level: "Advanced",

        link: "https://git-scm.com/",
      },
      {
        name: "Android Studio",
        level: "Beginner",

        link: "https://developer.android.com/studio",
      },
      {
        name: "Fastlane",
        level: "Beginner",

        link: "https://fastlane.tools/",
      },
      {
        name: "Postman",
        level: "Intermediate",

        link: "https://www.postman.com/",
      },
      {
        name: "VS Code",
        level: "Advanced",

        link: "https://code.visualstudio.com/",
      },
    ],
  },
];
