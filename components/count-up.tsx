'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION_MS = 1100;

/**
 * Counts the number inside a metric like "4" or "~5 s" up from zero the first
 * time it scrolls into view. The server renders the final value, so the figure
 * is correct without JavaScript and under reduced motion.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const [shown, setShown] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!match || target === 0 || !el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    setShown(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION_MS);
          setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // match is derived from value; target covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!match) return <>{value}</>;
  return (
    <span ref={ref} className="tabular-nums">
      {match[1]}
      {shown}
      {match[3]}
    </span>
  );
}
