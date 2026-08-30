import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Hero = () => {
  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/eatulrajput",
      icon: <IconBrandGithub className="size-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/eatulrajput",
      icon: <IconBrandLinkedin className="size-5" />,
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/eatulrajput",
      icon: <IconBrandX className="size-5" />,
    },
    {
      name: "Email",
      href: "mailto:eatulrajput@gmail.com",
      icon: <IconMail className="size-5" />,
    },
  ];

  return (
    <section id="home" className="flex flex-col gap-6 pt-4 sm:pt-8 text-left">
      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-900 border border-brand-accent text-xs font-mono font-medium text-brand-accent w-fit">
        <span className="size-2 rounded-full bg-brand-accent animate-pulse" />
        <span>Available for Full Stack Engineering</span>
      </div>

      {/* Name Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-black dark:text-white font-sans">
          Atul Rajput
        </h1>
        <p className="text-xl sm:text-2xl font-medium text-brand-accent leading-snug">
          Full Stack Software Developer & Engineer
        </p>
      </div>

      {/* Bio Description */}
      <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal max-w-2xl">
        I engineer scalable web applications, robust backend architectures, and high-performance user interfaces. Specialized in Next.js, TypeScript, Node.js, Python, PostgreSQL, and modern cloud infrastructure.
      </p>

      {/* Social Links Row */}
      <div className="flex items-center gap-4 pt-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="text-neutral-500 dark:text-neutral-400 hover-text-brand-accent transition-colors p-1"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
