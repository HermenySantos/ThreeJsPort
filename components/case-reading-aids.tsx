'use client';

import { useEffect, useRef, useState } from 'react';

type TocItem = { anchor: string; heading: string };

/**
 * Reading aids for long case studies: a thin progress bar under the header on
 * every screen size, and a contents list in the left margin on wide screens
 * that highlights the section being read.
 */
export function CaseReadingAids({ items }: { items: readonly TocItem[] }) {
  const [active, setActive] = useState(items[0]?.anchor ?? '');
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    let raf = 0;
    const headings = items
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => el !== null);

    const update = () => {
      raf = 0;
      // The current section is the last heading that has passed the top third.
      const line = window.innerHeight / 3;
      let current = headings[0]?.id ?? '';
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= line) current = heading.id;
        else break;
      }
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar) bar.style.transform = `scaleX(${progress})`;
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
  }, [items]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px]">
        <div ref={barRef} className="h-full origin-left scale-x-0 bg-[#7fe0bf]" />
      </div>
      <nav
        aria-label="On this page"
        className="fixed top-28 hidden w-[200px] min-[1380px]:block"
        style={{ left: 'calc(50% - 670px)' }}>
        <p className="text-[11px] uppercase tracking-label text-white/55">On this page</p>
        <ol className="mt-4 space-y-2 border-l border-white/10">
          {items.map((item) => (
            <li key={item.anchor}>
              <a
                href={`#${item.anchor}`}
                aria-current={active === item.anchor ? 'true' : undefined}
                className={`-ml-px block border-l py-0.5 pl-3 text-[12px] leading-5 transition-colors ${
                  active === item.anchor
                    ? 'border-[#7fe0bf] text-white'
                    : 'border-transparent text-white/55 hover:text-white/80'
                }`}>
                {item.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
