'use client';

import { useState } from 'react';

import { nav, site } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 sm:px-8 md:grid md:grid-cols-3">
        <a href="#top" className="justify-self-start text-[15px] tracking-tight text-white">
          {site.name}
        </a>

        <nav className="hidden items-center justify-center gap-8 text-[13px] text-white/55 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <SocialLinks className="hidden sm:flex" />
          <button
            type="button"
            className="inline-flex h-9 items-center rounded-full border border-white/15 px-3 text-[13px] text-white/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-5 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3 text-sm text-white/70">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 hover:text-white"
                onClick={() => setOpen(false)}>
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
