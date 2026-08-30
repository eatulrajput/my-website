import { GraduationCap } from "lucide-react";
import Link from "next/link";;

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
    icon: <GraduationCap className="text-primary mt-0 h-6 w-6 shrink-0 md:h-8 md:w-8" />,
    id: 1,
    degree: "Bachelor of Technology in Electronics and Computer Science",
    institutionName: "KIIT University",
    location: "Bhubaneshwar, Odisha, India",
    duration: "2022-2026",
    grade: "7.64 CGPA",
    institutionLogo: "/logos/kiit.webp",
    details: (
      <p>
        Relevant Coursework: Data Structures & Algorithms, Database Management
        Systems, Software Engineering, Machine Learning, Computer Networks
      </p>
    ),
    viewDetails: (<Link href={'/eng'} >View More</Link>),
    institutionLink: "https://kiit.ac.in/"
  },

  {
    icon: <GraduationCap className="text-primary mt-0 h-6 w-6 shrink-0 md:h-8 md:w-8" />,
    id: 2,
    degree: "Class 12th",
    institutionName: "Gurukul Vidyapeeth",
    location: 'Hajipur, Bihar, India',
    duration: "2021",
    grade: "80.6 %",
    institutionLogo: "/logos/gvp.webp",
    institutionLink: "https://gurukulvidyapeethhajipur.org/"
  },

  {
    icon: <GraduationCap className="text-primary mt-0 h-6 w-6 shrink-0 md:h-8 md:w-8" />,
    id: 2,
    degree: "Class 10th",
    institutionName: "Gurukul Vidyapeeth",
    location: 'Hajipur, Bihar, India',
    duration: "2019",
    grade: "77.2 %",
    institutionLogo: "/logos/gvp.webp",
    institutionLink: "https://gurukulvidyapeethhajipur.org/"
  },
];
