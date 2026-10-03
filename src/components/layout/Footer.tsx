import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link
            href="https://github.com/eatulrajput"
            target="_blank"
            className="footer-link"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/eatulrajput"
            target="_blank"
            className="footer-link"
          >
            LinkedIn
          </Link>
          <Link href="mailto:hello@atulrajput.com" className="footer-link">
            Email
          </Link>
        </div>
        <p className="footer-text">
          © {new Date().getFullYear()} Atul Rajput. Designed with Apple HIG
          principles.
        </p>
      </div>
    </footer>
  );
}
