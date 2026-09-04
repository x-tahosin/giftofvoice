import { useEffect } from 'react';

/**
 * Custom hook for bidirectional smooth scroll reveal animations.
 * Observes all text elements, headers, and cards. As they enter the viewport
 * from either top or bottom, 'is-revealed' is attached for a smooth glide & fade.
 * As they scroll out of view, 'is-revealed' is reset so scrolling back re-triggers
 * the animation smoothly.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selector = [
      '.reveal-on-scroll',
      '.scroll-reveal',
      '.scroll-reveal-text',
      '.scroll-reveal-scale',
      '.scroll-reveal-card',
      '.scroll-reveal-left',
      '.scroll-reveal-right',
      '.section-title',
      '.section-desc',
      '.section-tag',
      '.hero-title',
      '.hero-subtitle',
      '.hero-cta-row',
      '.metric-item',
      '.stepper-nav-bar',
      '.stepper-card-container',
      '.quick-preset-card',
      '.case-tab-card',
      '.donor-profile-card',
      '.mic-studio-card',
      '.ascii-code-box',
    ].join(', ');

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Check if element has actually left the viewport (scrolled off top or bottom)
          const rect = entry.target.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.bottom < -20 || rect.top > windowHeight + 20) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px 0px -25px 0px',
      threshold: 0.08,
    });

    const observedSet = new WeakSet();

    const scanAndObserve = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!observedSet.has(el)) {
          observedSet.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial scan
    scanAndObserve();

    // Periodic scan for dynamic mounts
    const interval = setInterval(scanAndObserve, 500);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
}

