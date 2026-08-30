import { IconBriefcase } from "@tabler/icons-react";

export interface ExperienceItem {
  id: string | number;
  position: string;
  OrganisationName: string;
  duration: string;
  startDate: string; // YYYY-MM format for comparison
  endDate?: string;   // YYYY-MM format or "Present"
  OrgWebsiteLink?: string;
  OrganizationLogo?: string;
  icon?: React.ReactNode;
  details?: React.ReactNode;
}

export const rawExperienceData: ExperienceItem[] = [
  {
    id: "keploy-2025",
    icon: <IconBriefcase className="text-primary mt-1 h-6 w-6 shrink-0 md:h-8 md:w-8" />,
    position: "API Fellow",
    OrganisationName: "Keploy",
    duration: "June 2025 - July 2025",
    startDate: "2025-06",
    endDate: "2025-07",
    OrgWebsiteLink: "https://keploy.io/",
    OrganizationLogo: "/logos/keploy.svg",
    details: (
      <div>
        <ul className="text-muted-foreground list-disc space-y-1.5 pl-4 text-sm md:space-y-2 md:text-lg">
          <li>
            Gained hands-on experience in the full lifecycle of API development:
            Design, Testing, Deployment, and Version control using Git and GitHub.
          </li>
          <li>
            Worked with automation tools to enhance API testing efficiency and
            reliability: GitHub Actions, Keploy Tester.
          </li>
          <li>Learned how to host Chrome extensions.</li>
          <li>
            Explored various testing methodologies for robust and maintainable code.
          </li>
          <li>
            Developed a unit test generator for C++ code using local large
            language models, improving testing automation and code quality.
          </li>
          <li>
            Strengthened abilities in: Cross-team collaboration, Workflow
            automation, Building scalable, well-documented software solutions.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "gssoc-2024",
    icon: <IconBriefcase />,
    position: "Open Source Contributor",
    OrganisationName: "GirlScript Summer Of Code",
    duration: "May 2024 - Aug 2024",
    startDate: "2024-05",
    endDate: "2024-08",
    OrgWebsiteLink: "https://gssoc.girlscript.org/",
    OrganizationLogo: "/logos/gssoc.svg",
    details: (
      <div>
        <ul className="text-muted-foreground list-disc space-y-1.5 pl-4 text-sm md:space-y-2 md:text-base">
          <li>
            Engaged with open source through the GirlScript Summer of Code
            (GSSoC) program 2024.
          </li>
          <li>
            Gained hands-on experience with API testing tools like Postman.
          </li>
          <li>
            Took initiative to start building a community website, exploring:
            Frontend development, Collaboration workflows.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "hacktoberfest-2023",
    icon: <IconBriefcase />,
    position: "Open Source Contributor",
    OrganisationName: "Hacktoberfest",
    duration: "Oct 2023",
    startDate: "2023-10",
    endDate: "2023-10",
    OrgWebsiteLink: "https://hacktoberfest.com/",
    OrganizationLogo: "/logos/hacktoberfest.svg",
    details: (
      <div>
        <ul className="text-muted-foreground list-disc space-y-1.5 pl-4 text-sm md:space-y-2 md:text-base">
          <li>
            Participated in Hacktoberfest 2023 by contributing to a React repository.
          </li>
          <li>
            Strengthened understanding of Git and GitHub workflows, including: Forking repositories, Making pull requests.
          </li>
          <li>
            Built a simple portfolio website using React (Create React App).
          </li>
        </ul>
      </div>
    ),
  },
];

/**
 * Utility function to sort experiences chronologically (latest first).
 * Handles "Present" or ongoing roles as highest priority.
 */
export const getSortedExperienceData = (items: ExperienceItem[]): ExperienceItem[] => {
  return [...items].sort((a, b) => {
    // Treat "Present" or missing endDate as current (infinity)
    const endA = a.endDate === "Present" || !a.endDate ? "9999-99" : a.endDate;
    const endB = b.endDate === "Present" || !b.endDate ? "9999-99" : b.endDate;

    if (endA !== endB) {
      return endB.localeCompare(endA);
    }
    // Fallback to start date comparison
    return b.startDate.localeCompare(a.startDate);
  });
};

export const experienceData = getSortedExperienceData(rawExperienceData);
