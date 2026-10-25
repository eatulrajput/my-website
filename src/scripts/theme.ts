export type ThemePreference = 'light' | 'dark' | 'system';
export type EffectiveTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export function getStoredPreference(): ThemePreference {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === 'light' || val === 'dark' || val === 'system') {
      return val;
    }
  } catch (e) {
    // blocked storage fallback
  }
  return 'system';
}

export function getSystemTheme(): EffectiveTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveEffectiveTheme(pref: ThemePreference): EffectiveTheme {
  if (pref === 'system') {
    return getSystemTheme();
  }
  return pref;
}

export function updateDOMTheme(pref: ThemePreference, effective: EffectiveTheme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', effective);
  root.setAttribute('data-theme-preference', pref);
  root.style.colorScheme = effective;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', effective === 'dark' ? '#0B1120' : '#FAFAF9');
  }

  updateAllSwitchersUI(pref);
}

export function updateAllSwitchersUI(pref: ThemePreference) {
  const switchers = document.querySelectorAll<HTMLElement>('.theme-switcher');

  switchers.forEach((switcher) => {
    const buttons = switcher.querySelectorAll<HTMLButtonElement>('.theme-btn');
    const indicator = switcher.querySelector<HTMLElement>('.theme-indicator');

    let activeBtn: HTMLButtonElement | null = null;

    buttons.forEach((btn) => {
      const val = btn.getAttribute('data-theme-value') as ThemePreference;
      const isActive = val === pref;

      btn.setAttribute('aria-checked', String(isActive));
      btn.setAttribute('tabindex', isActive ? '0' : '-1');

      if (isActive) {
        activeBtn = btn;
        btn.classList.add('text-text', 'font-semibold');
        btn.classList.remove('text-muted');
      } else {
        btn.classList.remove('text-text', 'font-semibold');
        btn.classList.add('text-muted');
      }
    });

    if (activeBtn && indicator) {
      const btn = activeBtn as HTMLButtonElement;
      const left = btn.offsetLeft;
      const width = btn.offsetWidth;
      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.width = `${width}px`;
    }
  });
}

export function setTheme(
  newPref: ThemePreference,
  originCoordinates?: { x: number; y: number }
) {
  try {
    localStorage.setItem(STORAGE_KEY, newPref);
  } catch (e) {
    // ignore storage errors
  }

  const effective = resolveEffectiveTheme(newPref);
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reduced motion: instant switch
  if (isReducedMotion) {
    updateDOMTheme(newPref, effective);
    return;
  }

  // Circular reveal via View Transitions API
  if (originCoordinates && typeof document.startViewTransition === 'function') {
    const { x, y } = originCoordinates;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      updateDOMTheme(newPref, effective);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
    return;
  }

  // Fallback: 300ms color crossfade
  document.documentElement.classList.add('theme-transition');
  updateDOMTheme(newPref, effective);
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transition');
  }, 300);
}

export function initThemeSwitchers() {
  const currentPref = getStoredPreference();
  updateAllSwitchersUI(currentPref);

  const switchers = document.querySelectorAll<HTMLElement>('.theme-switcher');

  switchers.forEach((switcher) => {
    // Avoid re-attaching listeners multiple times
    if (switcher.dataset.themeInitialized === 'true') {
      return;
    }
    switcher.dataset.themeInitialized = 'true';

    const buttons = Array.from(switcher.querySelectorAll<HTMLButtonElement>('.theme-btn'));

    buttons.forEach((btn, idx) => {
      // Click handler
      btn.addEventListener('click', (e) => {
        const val = btn.getAttribute('data-theme-value') as ThemePreference;
        const rect = btn.getBoundingClientRect();
        const coords = {
          x: e.clientX || rect.left + rect.width / 2,
          y: e.clientY || rect.top + rect.height / 2,
        };
        setTheme(val, coords);
      });

      // Keyboard arrow navigation
      btn.addEventListener('keydown', (e) => {
        let targetIdx: number | null = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIdx = (idx + 1) % buttons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIdx = (idx - 1 + buttons.length) % buttons.length;
        } else if (e.key === 'Home') {
          targetIdx = 0;
        } else if (e.key === 'End') {
          targetIdx = buttons.length - 1;
        }

        if (targetIdx !== null) {
          e.preventDefault();
          const targetBtn = buttons[targetIdx];
          targetBtn.focus();
          const val = targetBtn.getAttribute('data-theme-value') as ThemePreference;
          const rect = targetBtn.getBoundingClientRect();
          setTheme(val, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        }
      });
    });
  });
}

// Global setup
let listenersInitialized = false;

export function setupThemeListeners() {
  if (typeof window === 'undefined') return;

  initThemeSwitchers();

  if (listenersInitialized) return;
  listenersInitialized = true;

  // Listen to OS prefers-color-scheme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    const pref = getStoredPreference();
    if (pref === 'system') {
      // Crossfade fallback on OS change (no click origin)
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const effective = getSystemTheme();
      if (isReduced) {
        updateDOMTheme('system', effective);
      } else {
        document.documentElement.classList.add('theme-transition');
        updateDOMTheme('system', effective);
        setTimeout(() => {
          document.documentElement.classList.remove('theme-transition');
        }, 300);
      }
    }
  });

  // Cross-tab synchronization
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      const pref = getStoredPreference();
      const effective = resolveEffectiveTheme(pref);
      updateDOMTheme(pref, effective);
    }
  });
}

// Auto-run when imported
if (typeof window !== 'undefined') {
  setupThemeListeners();
  document.addEventListener('astro:page-load', initThemeSwitchers);
  window.addEventListener('resize', () => {
    updateAllSwitchersUI(getStoredPreference());
  });
}
