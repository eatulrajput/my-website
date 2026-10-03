"use client";

import { useEffect } from "react";

type Props = {
  src?: string;
  alt?: string;
  showDarkOverlay?: boolean | string;
  glassmorphism?: boolean | string;
};

export default function CoverImage({
  src,
  showDarkOverlay,
  glassmorphism,
}: Props) {
  useEffect(() => {
    if (!src) return;

    // By default, the overlay is enabled unless explicitly set to false
    const isOverlayEnabled =
      showDarkOverlay === undefined
        ? true
        : showDarkOverlay === true || showDarkOverlay === "true";
    const isGlass = glassmorphism === true || glassmorphism === "true";

    // Apply the image to the BlogTitle header
    const header = document.querySelector(".blog-title-header") as HTMLElement;
    if (header) {
      header.classList.add("blog-title-header--has-image");
      if (isGlass) header.classList.add("blog-title-header--glassmorphism");

      let bgValue = `url('${src}')`;
      if (!isOverlayEnabled || isGlass) {
        // No overlay, no blur
      } else {
        // Overlay + blur
        bgValue = `var(--cover-overlay), url('${src}')`;
        header.classList.add("blog-title-header--blurred");
      }

      header.style.setProperty("--header-bg-image", bgValue);
      header.style.setProperty("--parallax-y", "0px");
    }

    // Smooth JS Parallax Effect (works everywhere including iOS)
    const handleScroll = () => {
      if (header) {
        // Move the background down at 40% of the scroll speed
        const scrolled = window.scrollY;
        header.style.setProperty("--parallax-y", `${scrolled * 0.4}px`);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Cleanup when unmounted
      if (header) {
        header.classList.remove("blog-title-header--has-image");
        header.classList.remove("blog-title-header--glassmorphism");
        header.classList.remove("blog-title-header--blurred");
        header.style.removeProperty("--header-bg-image");
        header.style.removeProperty("--parallax-y");
      }
    };
  }, [src, showDarkOverlay, glassmorphism]);

  // Render nothing, it acts as a meta modifier for the header
  return null;
}
