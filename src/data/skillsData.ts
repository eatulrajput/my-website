// skillsData.ts
import { Code2, Database, Library, Server, Wrench } from "lucide-react";
import type { SkillCategory } from "./types";

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    icon: Code2,
    items: [
      {
        name: "Python",
        logo: "/logos/python.svg",
        link: "https://www.python.org/",
      },
      {
        name: "Java",
        logo: "/logos/java.svg",
        link: "https://www.oracle.com/java/",
      },
      {
        name: "JavaScript",
        logo: "/logos/js.svg",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        logo: "/logos/typescript.svg",
        link: "https://www.typescriptlang.org/",
      },
      {
        name: "Yaml",
        logo: "/logos/yaml.svg",
        link: "https://yaml.org/",
      }
    ],
  },
  {
    category: "Libraries",
    icon: Library,
    items: [

      {
        name: "React",
        logo: "/logos/react.svg",
        link: "https://react.dev/"
      },
      {
        name: "Shadcn UI",
        logo: "/logos/shadcnui.svg",
        link: "https://ui.shadcn.com/",
      },
      {
        name: "Motion",
        logo: "/logos/motion.svg",
        link: "https://motion.dev/",
      },
      {
        name: "Radix UI",
        logo: "/logos/radixui.svg",
        link: "https://radixui.com/",
      },
      {
        name: "Aceternity UI",
        logo: "/logos/aceternityui.svg",
        link: "https://ui.aceternity.com/",
      },
      {
        name: "React Native",
        logo: "/logos/react.svg",
        link: "https://reactnative.dev/",
      }

    ],
  },
  {
    category: "Frameworks",
    icon: Server,
    items: [
      {
        name: "Django",
        logo: "/logos/django.svg",
        link: "https://www.djangoproject.com/",
      },
      {
        name: "Flask",
        logo: "/logos/flask.svg",
        link: "https://flask.palletsprojects.com/",
      },
      {
        name: "FastAPI",
        logo: "/logos/fastapi.svg",
        link: "https://fastapi.tiangolo.com/",
      },

      { name: "React", logo: "/logos/react.svg", link: "https://react.dev/" },
      {
        name: "NextJS",
        logo: "/logos/nextjs.svg",
        link: "https://nextjs.org/",
      },
      {
        name: "Shadcn UI",
        logo: "/logos/shadcnui.svg",
        link: "https://ui.shadcn.com/",
      },
      {
        name: "Motion",
        logo: "/logos/motion.svg",
        link: "https://motion.dev/",
      },
      {
        name: "Radix UI",
        logo: "/logos/radixui.svg",
        link: "https://radixui.com/",
      },
    ],
  },
  {
    category: "Databases",
    icon: Database,
    items: [
      {
        name: "MySQL",
        logo: "/logos/mysql.svg",
        link: "https://www.mysql.com/",
      },
      {
        name: "MongoDB",
        logo: "/logos/mongodb.svg",
        link: "https://www.mongodb.com/",
      },
      {
        name: "PostgreSQL",
        logo: "/logos/postgresql.svg",
        link: "https://www.postgresql.org/",
      },
      {
        name: "SQLite",
        logo: "/logos/sqlite.svg",
        link: "https://www.sqlite.org/",
      }
    ],
  },
  {
    category: "Tools",
    icon: Wrench,
    items: [
      { name: "Git", logo: "/logos/git.svg", link: "https://git-scm.com/" },
      {
        name: "Postman",
        logo: "/logos/postman.svg",
        link: "https://www.postman.com/",
      },
      {
        name: "Docker",
        logo: "/logos/docker.svg",
        link: "https://www.docker.com/",
      },
      {
        name: "VS Code",
        logo: "/logos/vscode.svg",
        link: "https://code.visualstudio.com/",
      },
      {
        name: "GitHub",
        logo: "/logos/github.svg",
        link: "https://github.com/",
      },
      {
        name: "Linux",
        logo: "/logos/linux.svg",
        link: "https://linux.org/",
      },
      {
        name: "Fedora",
        logo: "/logos/fedora.svg",
        link: "https://fedoraproject.org/",
      },
      {
        name: "Bash Terminal",
        logo: "/logos/bash.svg",
        link: "https://bash.org/",
      }
    ],
  },
];
