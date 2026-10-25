/**
 * Smooth scroll-reveal animation with staggered entrance.
 * Observes elements with `.reveal` and adds `.visible` once when entering viewport.
 * Disables automatically under `prefers-reduced-motion`.
 */
export function initReveal() {
  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll<HTMLElement>('.reveal');

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12,
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Auto-initialize when loaded in browser or on page swap
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
  document.addEventListener('astro:page-load', initReveal);
}
