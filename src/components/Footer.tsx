import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200/80 dark:border-neutral-800/80 py-8 mt-16 bg-white dark:bg-black transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <div>
          <span>© {year} Atul Rajput</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/status"
            className="hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
          >
            Status
          </Link>
          <span>•</span>
          <a
            href="https://github.com/eatulrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href="https://linkedin.com/in/eatulrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href="https://x.com/eatulrajput"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
          >
            X
          </a>
          <span>•</span>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#f34213] dark:hover:text-[#FF8800] transition-colors"
          >
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
