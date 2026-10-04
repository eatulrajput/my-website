// Project Data

export interface ProjectItem {
  projectIcon?: string;
  title: string;
  description: string;
  techStack: string[];
  codeLink?: string;
  liveLink?: string;
  participationType?: string;
  projectCategory?: string;
  projectStatus?: string;
  date?: string;
  sortDate?: string; // YYYY-MM for exact chronological sorting
  showInProjects?: boolean;
}

export const rawProjects: ProjectItem[] = [

  {
    title: "Clock",
    description:
      "A simple clock desktop application.",
    techStack: ["TypeScript", "Tauri"],
    codeLink: "",
    liveLink: "/project/clock",
    participationType: "solo",
    projectCategory: "hobby",
    projectStatus: "In Progress",
    date: "Jan 2026",
    sortDate: "2026-01",
    showInProjects: true,

  },
  {
    title: "Git Pie",
    description:
      "A GitHub utility tracking tool designed to compile and discover hosted GitHub pages links for any user.",
    techStack: ["JavaScript", "GitHub API", "Netlify"],
    codeLink: "https://github.com/eatulrajput/github-page-tracker",
    liveLink: "https://gitpie.netlify.app/",
    participationType: "solo",
    projectCategory: "hobby",
    projectStatus: "Completed",
    date: "Jan 2026",
    sortDate: "2026-01",
    showInProjects: false,
  },
  {
    title: "Crato",
    description:
      "A healthcare app prototype created under tight time constraints during the MIT HackNation hackathon.",
    techStack: ["API", "JavaScript", "React"],
    codeLink: "https://github.com/eatulrajput/crato",
    liveLink: "",
    participationType: "solo",
    projectCategory: "hackathon",
    projectStatus: "In Progress",
    date: "Aug 2025",
    sortDate: "2025-08",
    showInProjects: false,
  },
  {
    title: "2025 Solution Challenge",
    description:
      "A real-world problem-solving prototype built for the 2025 Google Community Solution Challenge.",
    techStack: ["TypeScript", "React", "AI APIs"],
    codeLink: "",
    liveLink: "https://vision.hack2skill.com/event/solutionschallenge2025",
    participationType: "team",
    projectCategory: "challenge",
    projectStatus: "In Progress",
    date: "Jan - Jul 2025",
    sortDate: "2025-07",
    showInProjects: false,
  },
  {
    title: "Workflow",
    description:
      "An n8n and Python based agent workflow automation developed for the Product Space AI Hackathon.",
    techStack: ["Python", "n8n", "FastAPI"],
    codeLink: "",
    liveLink: "",
    participationType: "solo",
    projectCategory: "hackathon",
    projectStatus: "In Progress",
    date: "Jun 2025",
    sortDate: "2025-06",
    showInProjects: false,
  },
  {
    title: "Astra AI",
    description:
      "A RAG-based intelligent AI chatbot designed for accurate question answering and context retrieval.",
    techStack: ["FastAPI", "Python", "RAG", "Vector DB"],
    codeLink: "",
    liveLink: "/project/astra-ai",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "In Progress",
    date: "May 2025",
    sortDate: "2025-05",
    showInProjects: false,
  },
  {
    title: "Test Forge",
    description:
      "An automated unit test generator developed to build Google Test suites for C++ projects via LLMs.",
    techStack: [
      "Python (FastAPI)",
      "C++",
      "Groq API",
      "YAML",
      "Google Test",
      "GitHub Actions",
    ],
    codeLink: "https://github.com/eatulrajput/TestForge",
    liveLink: "",
    participationType: "solo",
    projectCategory: "hobby",
    projectStatus: "Completed",
    date: "Apr 2025",
    sortDate: "2025-04",
    showInProjects: false,
  },
  {
    title: "Appoint Ease",
    description:
      "A comprehensive booking and appointment management system designed for patient and doctor scheduling.",
    techStack: ["JavaScript", "Node.js", "MongoDB"],
    codeLink: "https://github.com/AritraBanerjee-09/SE-Project",
    liveLink: "",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "In Progress",
    date: "Jan 2025",
    sortDate: "2025-01",
    showInProjects: false,
  },
  {
    title: "Hapocalypse",
    description:
      "An AI-powered submission for the MLSA Hackocalypse hackathon event at KIIT University.",
    techStack: ["Python", "OpenAI API", "Streamlit"],
    codeLink: "",
    liveLink: "",
    participationType: "solo",
    projectCategory: "hackathon",
    projectStatus: "In Progress",
    date: "Dec 2024",
    sortDate: "2024-12",
    showInProjects: false,
  },
  {
    title: "GitHub Copilot Challenge",
    description:
      "An app development prototype utilizing GitHub Copilot tools to accelerate and optimize coding velocity.",
    techStack: ["TypeScript", "GitHub Copilot", "Next.js"],
    codeLink: "",
    liveLink: "",
    participationType: "solo",
    projectCategory: "challenge",
    projectStatus: "Completed",
    date: "Nov 2024 - Jan 2025",
    sortDate: "2024-11.5",
    showInProjects: false,
  },
  {
    title: "Google's Deepdream Project",
    description:
      "A Computer Vision course group project utilizing convolutional neural networks to visualize image patterns.",
    techStack: ["Python", "PyTorch", "OpenCV"],
    codeLink: "https://github.com/eatulrajput/cpvr-final-group-project",
    liveLink: "",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "Completed",
    date: "Nov 2024",
    sortDate: "2024-11",
    showInProjects: false,
  },
  {
    title: "Harmony Bot",
    description:
      "An interactive automated bot prototype developed for the Women Techmakers She Builds AI hackathon.",
    techStack: ["Python", "Discord API", "OpenAI"],
    codeLink: "",
    liveLink: "",
    participationType: "solo",
    projectCategory: "hackathon",
    projectStatus: "Completed",
    date: "Oct - Nov 2024",
    sortDate: "2024-10.5",
    showInProjects: false,
  },
  {
    title: "Distance Measurement Using HC-SR04",
    description:
      "IIoT research lab project utilizing ultrasonic sensors for real-time distance tracking and measurement.",
    techStack: ["C", "Electronics", "NodeMCU"],
    codeLink: "https://github.com/eatulrajput/cpvr-final-group-project",
    liveLink: "",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "Completed",
    date: "Oct 2024",
    sortDate: "2024-10.2",
    showInProjects: false,
  },
  {
    title: "Dharavi Mapping",
    description:
      "A community GIS layout that creates solutions using NASA's open source geography metadata.",
    techStack: ["GIS", "JavaScript", "Leaflet"],
    codeLink: "",
    liveLink: "/project/community-mapping",
    participationType: "team",
    projectCategory: "competition",
    projectStatus: "Completed",
    date: "Oct 2024",
    sortDate: "2024-10",
    showInProjects: false,
  },
  {
    title: "Finfy",
    description:
      "An AI-powered loan approval application that utilizes machine learning models to check eligibility.",
    techStack: ["Python", "Linear Regression", "Scikit-Learn", "Render"],
    codeLink: "https://finfy-app-04of.onrender.com/",
    liveLink: "https://finfy-app-04of.onrender.com/",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "Completed",
    date: "May 2024",
    sortDate: "2024-05",
    showInProjects: false,
  },
  {
    title: "Weather App",
    description:
      "A weather intelligence platform developed for the Google community Developer Student Clubs solution challenge.",
    techStack: ["JavaScript", "OpenWeather API", "HTML/CSS"],
    codeLink: "",
    liveLink: "https://developers.google.com/community/gdsc-solution-challenge",
    participationType: "solo",
    projectCategory: "challenge",
    projectStatus: "Completed",
    date: "Apr - Jun 2024",
    sortDate: "2024-04",
    showInProjects: false,
  },
  {
    title: "Calculator App",
    description:
      "A simple, clean calculator application created during the Application Development Lab using Android Studio.",
    techStack: ["Java", "Android Studio"],
    codeLink:
      "https://github.com/eatulrajput/android_app/tree/master/calculator_app",
    liveLink: "",
    participationType: "solo",
    projectCategory: "academic",
    projectStatus: "Completed",
    date: "Mar 2024",
    sortDate: "2024-03",
    showInProjects: false,
  },
  {
    title: "Breakout Game",
    description:
      "A classic arcade-style brick-breaker game built with Java and Python, requiring quick reflexes.",
    techStack: ["Python", "Java", "Pygame"],
    codeLink: "https://github.com/eatulrajput/Break-Out-Game",
    liveLink: "",
    participationType: "team",
    projectCategory: "academic",
    projectStatus: "Completed",
    date: "Nov 2023",
    sortDate: "2023-11",
    showInProjects: false,
  },
];

/**
 * Sorts project items by latest date (descending order).
 */
export const getSortedProjects = (items: ProjectItem[]): ProjectItem[] => {
  return [...items].sort((a, b) => {
    const dateA = a.sortDate || "0000-00";
    const dateB = b.sortDate || "0000-00";
    return dateB.localeCompare(dateA);
  });
};

export const projects = getSortedProjects(
  rawProjects.filter((p) => p.showInProjects !== false),
);
