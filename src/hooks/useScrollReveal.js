import { useEffect } from 'react';

/**
 * Custom hook for bidirectional smooth scroll reveal animations.
 * Observes all text elements, headers, cards, and interactive studio panels.
 * As they enter the viewport from either top or bottom, 'is-revealed' is attached
 * for a pronounced, elegant glide & fade transition.
 * As they scroll out of view, 'is-revealed' resets so scrolling back smoothly re-triggers.
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
      '.quick-presets-container',
      '.case-tab-card',
      '.case-selector-strip',
      '.carousel-outer-wrapper',
      '.donor-profile-card',
      '.donor-card',
      '.mic-studio-card',
      '.ascii-code-box',
      '.studio-card-panel',
      '.soundboard-container',
      '.custom-concept-bar',
    ].join(', ');

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Check if element has actually left the viewport (scrolled off top or bottom)
          const rect = entry.target.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          if (rect.bottom < -40 || rect.top > windowHeight + 40) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05,
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
    const interval = setInterval(scanAndObserve, 400);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);
}
