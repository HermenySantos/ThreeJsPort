'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { nav, site } from '@/lib/content';
import { SocialLinks } from './social-links';

export function Header() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState('');
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuToggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 sm:px-8 md:grid md:grid-cols-3">
        <Link href="/#top" className="justify-self-start" aria-label={`${site.name}, home`}>
          {/* Outlined SVG wordmark; the green dot is the same accent used across the site. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gildo-wordmark.svg" alt={site.name} width={58} height={27} className="block h-[27px] w-auto" />
        </Link>

        <nav
          className="hidden items-center justify-center gap-5 whitespace-nowrap text-[13px] text-white/70 md:flex lg:gap-8"
          aria-label="Primary"
        >
          {nav.map((item) => {
            const active = hash !== '' && item.href.endsWith(hash);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-white ${active ? 'text-white' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <SocialLinks className="hidden sm:flex" />
          <a
            href={site.cv}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
          >
            Résumé
          </a>
          <button
            ref={menuToggleRef}
            type="button"
            className="inline-flex h-9 items-center rounded-full border border-white/15 px-3 text-[13px] text-white/70 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 px-5 py-4 md:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-3 text-sm text-white/70">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-1 hover:text-white" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <SocialLinks className="mt-4 sm:hidden" />
        </nav>
      ) : null}
    </header>
  );
}
