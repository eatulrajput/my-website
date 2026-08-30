interface certificateDataProps {
  id?: number;
  degree?: string;
  degreeType?: string,
  institutionName?: string;
  Platform?: string;
  certifedOn?: string;
  grade?: string;
  details?: React.ReactNode;
  certificateLink?: string;
  organizationLogo?: string;
}

export const certificateData: certificateDataProps[] = [

  {
    certifedOn: "May 13, 2023",
    id: 1,
    degree: "Get Started with Git and GitHub",
    degreeType: "Course",
    institutionName: "IBM",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/KH8U53D7P5EQ",
    organizationLogo: "/logos/ibm.svg",
  },

  {
    certifedOn: "May 26, 2023",
    id: 2,
    degree: "Introduction to Cloud Computing",
    degreeType: "Course",
    institutionName: "IBM",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/TMMXZR3FFZ3Q",
    organizationLogo: "/logos/ibm.svg",
  },

  {
    certifedOn: "May 1, 2024",
    id: 3,
    degree: "Data Privacy Fundamentals",
    degreeType: "Course",
    institutionName: "Northeastern University",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/78FBW3DE7PUQ",
    organizationLogo: "/logos/northeastern_university.svg",
  },

  {
    certifedOn: "Sept 6, 2024",
    id: 4,
    degree: "Google Cybersecurity",
    degreeType: "Specialization",
    institutionName: "Google",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/professional-cert/DHUFNTQV8S1K",
    organizationLogo: "/logos/google.svg",
  },

  {
    certifedOn: "Sept 6, 2024",
    id: 5,
    degree: "Google AI Essentials",
    degreeType: "Course",
    institutionName: "Google",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/41MSEUTCQIDM",
    organizationLogo: "/logos/google.svg",

  },
  {
    certifedOn: "Oct 7, 2025",
    id: 6,
    degree: "Project Initiation: Starting a Successful Project",
    degreeType: "Course",
    institutionName: "Google",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/NDHZFFSW3Q0F",
    organizationLogo: "/logos/google.svg",
  },
  {
    certifedOn: "Oct 10, 2025",
    id: 7,
    degree: "Project Planning: Putting It All Together",
    degreeType: "Course",
    institutionName: "Google",
    Platform: "Coursera",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/T1SPUJJYV6CA",
    organizationLogo: "/logos/google.svg",
  },
  {
    certifedOn: "Apr 24, 2024",
    id: 8,
    degree: "Certificate of Merit : Green Olympiad for Youth (GO4Youth)",
    degreeType: "Achievement",
    institutionName: "The Energy and Resources Institute (TERI)",
    Platform: "GO4Youth Olympiad",
    organizationLogo: "/logos/teri.svg"
  },
  {
    certifedOn: "Nov 3, 2025",
    id: 9,
    degree: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    degreeType: "Course",
    institutionName: "Krish Naik (Instructor)",
    Platform: "Udemy",
    organizationLogo: "/logos/udemy.svg",
  },
  {
    certifedOn: "Jan 23, 2025",
    id: 10,
    degree: "APIs Made Easy with Python and Flask",
    degreeType: "Learning Path",
    institutionName: "Code Signal",
    Platform: "Code Signal",
    certificateLink: "https://codesignal.com/learn/certificates/cm4ua9avi00057fivt77r86h0/course-paths/74",
    organizationLogo: "/logos/codesignal.svg",
  },

];
