import { readFileSync } from 'node:fs';
import path from 'node:path';

import Image from 'next/image';

import type { CaseFigure } from '@/lib/case-layout';

import { LiveDiagram } from './live-diagram';

export function CaseMediaList({
  figures,
  priorityFirst = false,
  constrainPortraits = false,
}: {
  figures: readonly CaseFigure[];
  priorityFirst?: boolean;
  constrainPortraits?: boolean;
}) {
  return (
    <div className="mt-4 space-y-4">
      {figures.map((figure, index) => (
        <CaseMedia
          key={figure.src}
          figure={figure}
          priority={priorityFirst && index === 0}
          constrainPortraits={constrainPortraits}
        />
      ))}
    </div>
  );
}

function CaseMedia({
  figure,
  priority = false,
  constrainPortraits = false,
}: {
  figure: CaseFigure;
  priority?: boolean;
  constrainPortraits?: boolean;
}) {
  const openLabel = figure.kind === 'diagram' ? 'Open full-size diagram' : 'Open full-size image';
  const portraitShot =
    !figure.mobile &&
    constrainPortraits &&
    figure.kind === 'screenshot' &&
    figure.layout !== 'article' &&
    (figure.layout === 'portrait' || figure.height > figure.width);
  const linkClass = 'mt-3 block text-[13px] text-white/55 transition-colors hover:text-white';

  return (
    <figure
      className={
        portraitShot
          ? 'mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/10 bg-[#111]'
          : 'overflow-hidden rounded-[28px] border border-white/10 bg-[#111]'
      }>
      {figure.label ? (
        <p className="border-b border-white/10 px-5 py-3 text-[13px] font-medium text-white">{figure.label}</p>
      ) : null}
      {figure.live ? (
        <div className="hidden bg-ink md:block">
          <LiveDiagram svg={inlineSvg(figure.live)} />
        </div>
      ) : null}
      {figure.mobile ? (
        <picture className={figure.live ? 'block w-full md:hidden' : 'block w-full'}>
          <source
            media="(max-width: 767px)"
            srcSet={figure.mobile.src}
            width={figure.mobile.width}
            height={figure.mobile.height}
          />
          {/* Art direction needs a native img so the source can swap the SVG. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            className="block h-auto w-full"
            fetchPriority={priority && !figure.live ? 'high' : undefined}
            loading={figure.live ? 'lazy' : undefined}
          />
        </picture>
      ) : (
        <Image
          src={figure.src}
          alt={figure.alt}
          width={figure.width}
          height={figure.height}
          priority={priority}
          sizes={portraitShot ? '(min-width: 480px) 440px, 100vw' : '(min-width: 860px) 860px, 100vw'}
          className="block h-auto w-full bg-ink"
        />
      )}
      <figcaption className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-white/55">
        {figure.caption}
        {figure.mobile ? (
          <>
            <a href={figure.mobile.src} className={`${linkClass} md:hidden`}>
              {openLabel}
            </a>
            <a href={figure.src} className={`${linkClass} hidden md:block`}>
              {openLabel}
            </a>
          </>
        ) : (
          <a href={figure.src} className={linkClass}>
            {openLabel}
          </a>
        )}
      </figcaption>
    </figure>
  );
}

/** Reads a diagram from /public and namespaces its ids so two inline SVGs on one page cannot collide. */
function inlineSvg(src: string): string {
  const raw = readFileSync(path.join(process.cwd(), 'public', src), 'utf8');
  const prefix = path.basename(src, '.svg').replace(/[^a-z0-9]/gi, '');
  return raw
    .replace(/\bid="([^"]+)"/g, `id="${prefix}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);
}
