'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ComponentProps } from 'react';

// Resolved once the router has rendered the destination, so the browser
// captures the "after" snapshot of the new page rather than the old one.
let finishTransition: (() => void) | null = null;

/** Ends a pending view transition when the route changes. Mounted once in the layout. */
export function ViewTransitionBridge() {
  const pathname = usePathname();
  useEffect(() => {
    finishTransition?.();
    finishTransition = null;
  }, [pathname]);
  return null;
}

/**
 * A Link that morphs shared elements (named with `view-transition-name`)
 * between pages where the browser supports view transitions. Elsewhere, and
 * under reduced motion, it behaves exactly like a normal Link.
 */
export function TransitionLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.button !== 0 ||
          !('startViewTransition' in document) ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          return;
        }
        event.preventDefault();
        document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              finishTransition = resolve;
              router.push(href);
              // Never leave the page frozen if navigation stalls.
              window.setTimeout(resolve, 1500);
            }),
        );
      }}
      {...props}
    />
  );
}
