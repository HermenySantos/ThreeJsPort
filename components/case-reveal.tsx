'use client';

import { useEffect, useRef, useState } from 'react';

type CaseRevealProps = {
  id: string;
  title: string;
  kicker?: string;
  variant: 'spread' | 'twin';
};

export function CaseReveal({ id, title, kicker, variant }: CaseRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (variant === 'spread') {
    return (
      <div ref={ref} data-shown={shown} className="case-reveal flex items-start gap-6 sm:gap-8">
        <span className="case-index font-display text-[5.5rem] leading-none text-paper/15 sm:text-[7.5rem] lg:text-[8.5rem]">
          {id}
        </span>
        <div className="min-w-0 pt-3 sm:pt-5">
          {kicker ? <p className="font-mono text-[11px] uppercase tracking-label text-paper/40">{kicker}</p> : null}
          <h3 className="case-title mt-3 max-w-[18ch] font-display text-[2rem] leading-[1.08] tracking-[-0.02em] text-paper sm:text-[2.75rem] lg:text-[3.25rem]">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} data-shown={shown} className="case-reveal">
      <p className="case-index font-mono text-[11px] uppercase tracking-label text-ice">{id}</p>
      {kicker ? <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-paper/40">{kicker}</p> : null}
      <h3 className="case-title mt-3 max-w-[20ch] font-display text-[1.65rem] leading-[1.12] tracking-[-0.02em] text-paper sm:text-[1.85rem]">
        {title}
      </h3>
    </div>
  );
}
