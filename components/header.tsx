'use client';

import { useState } from 'react';

import { nav, site } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 sm:px-10 md:grid md:grid-cols-3">
        <a href="#top" className="justify-self-start font-display text-[22px] tracking-tight text-paper">
          {site.name}
        </a>

        <nav
          className="hidden items-center justify-center gap-8 font-mono text-[11px] uppercase tracking-label text-paper/50 md:flex"
          aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ice">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <SocialLinks className="hidden sm:flex" />
          <button
            type="button"
            className="font-mono text-[11px] uppercase tracking-label text-paper/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/[0.06] px-6 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3 font-mono text-[12px] uppercase tracking-label text-paper/70">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="py-1 hover:text-ice" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
          <SocialLinks className="mt-4 sm:hidden" />
        </nav>
      ) : null}
    </header>
  );
}
