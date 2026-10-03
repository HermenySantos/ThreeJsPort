'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Progressive enhancement for scroll reveals and the card glow.
 *
 * Content is visible by default; the `motion` class on <html> is what lets the
 * CSS hide `[data-reveal]` elements before they enter the viewport. Without
 * JavaScript, or with reduced motion requested, nothing is ever hidden.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('motion');

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>('[data-glow]');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
      card.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
    };
  }, [pathname]);

  return null;
}
