import { IconMail, IconMapPin } from "@tabler/icons-react";

const Contact = () => {
  return (
    <section id="contact" className="flex flex-col gap-4 text-left border-t border-neutral-200 dark:border-neutral-800 pt-10">
      <h2 className="text-2xl font-medium tracking-tight text-black dark:text-white font-sans">
        Get in Touch
      </h2>

      <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl">
        I&apos;m always interested in full-stack software development opportunities, open-source projects, and technical collaborations. Feel free to reach out directly.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 font-mono text-xs">
        <a
          href="mailto:eatulrajput@gmail.com"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-accent text-white dark:text-black font-bold hover:opacity-90 transition-opacity w-fit shadow-sm"
        >
          <IconMail className="size-4" />
          <span>eatulrajput@gmail.com</span>
        </a>

        <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
          <IconMapPin className="size-4 text-brand-accent" />
          <span>India (IST / UTC +5:30)</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
