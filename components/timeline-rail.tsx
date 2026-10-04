'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Wraps a timeline list and draws a glowing line down its rail as the reader
 * scrolls. Each item marked `data-timeline-item` is flagged as reached once
 * the line passes its dot. Under reduced motion the rail stays plain.
 */
export function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    const fill = fillRef.current;
    if (!host || !fill) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    host.dataset.animated = 'true';

    const items = Array.from(host.querySelectorAll<HTMLElement>('[data-timeline-item]'));
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = host.getBoundingClientRect();
      // The line's tip follows a point 60% down the viewport.
      const reach = Math.max(0, Math.min(rect.height, window.innerHeight * 0.6 - rect.top));
      fill.style.height = `${reach}px`;
      for (const item of items) {
        const dot = item.querySelector<HTMLElement>('[data-timeline-dot]');
        const dotY = dot ? dot.getBoundingClientRect().top - rect.top : item.offsetTop;
        item.toggleAttribute('data-reached', reach >= dotY);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="group/rail relative">
      <div
        ref={fillRef}
        aria-hidden
        className="pointer-events-none absolute -left-px top-0 hidden w-[2px] rounded-full bg-gradient-to-b from-[#7fe0bf]/10 via-[#7fe0bf]/70 to-[#7fe0bf] group-data-[animated=true]/rail:block">
        <span className="absolute -bottom-[3px] -left-[2px] h-[6px] w-[6px] rounded-full bg-[#7fe0bf] shadow-[0_0_12px_3px_rgba(127,224,191,0.7)]" />
      </div>
      {children}
    </div>
  );
}
