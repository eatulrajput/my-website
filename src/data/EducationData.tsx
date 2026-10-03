import { GraduationCap } from "lucide-react";
import Link from "next/link";

interface educationDataProps {
  icon?: React.ReactNode;
  id?: number;
  degree?: string;
  institutionName?: string;
  location: string;
  duration?: string;
  grade?: string;
  details?: React.ReactNode;
  viewDetails?: React.ReactNode;
  institutionLogo?: string;
  institutionLink?: string;
}

export const educationData: educationDataProps[] = [
  {
    icon: (
      <GraduationCap className="text-primary mt-0 h-6 w-6 shrink-0 md:h-8 md:w-8" />
    ),
    id: 1,
    degree: "Bachelor of Technology in Electronics and Computer Science",
    institutionName: "KIIT University",
    location: "Bhubaneshwar, Odisha",
    duration: "2022-2026",
    grade: "7.64 CGPA",
    institutionLogo: "/logo/kiit.webp",
    details: (
      <p>
        Relevant Coursework: Data Structures & Algorithms, Machine Learning,
        Database Management Systems.
      </p>
    ),
    institutionLink: "https://kiit.ac.in/",
  },
];
