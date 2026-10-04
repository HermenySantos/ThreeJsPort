import Image from 'next/image';

import type { CaseStudy } from '@/lib/content';
import { ArrowRightIcon } from './icons';
import { TransitionLink } from './transition-link';

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article
      id={`case-${study.slug}`}
      data-reveal
      data-glow
      className="relative scroll-mt-24 rounded-[28px] border border-white/10 px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="text-[13px] text-white/60">
            {study.id}
            <span className="mx-3 text-white/20">—</span>
            {study.year}
            {study.prototype ? (
              <>
                <span className="mx-3 text-white/20">—</span>
                Working prototype
              </>
            ) : null}
          </p>
          <h3
            style={{ viewTransitionName: `case-title-${study.slug}` }}
            className="mt-3 max-w-[16ch] text-[1.85rem] font-medium leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-[2.15rem]">
            {study.title}
          </h3>
          <p className="mt-3 max-w-[22rem] text-[14px] leading-6 text-white/60 sm:mt-5">{study.label}</p>
          <TransitionLink
            href={study.href}
            tabIndex={-1}
            aria-hidden="true"
            className="group mt-6 block overflow-hidden rounded-2xl border border-white/10 sm:mt-8">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              width={study.cover.width}
              height={study.cover.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </TransitionLink>
        </div>

        <div>
          <p className="text-[15px] leading-7 text-mute">
            {study.summary.split('**').map((part, i) =>
              i % 2 === 1 ? (
                <strong key={i} className="font-medium text-white">
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </p>
          <p className="mt-5 text-[11px] uppercase tracking-label text-white/60 sm:mt-6">What I delivered</p>
          {study.scale ? <p className="mt-3 text-[15px] leading-7 text-mute">Scale: {study.scale}</p> : null}
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-mute">
            {study.delivered.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {study.stack.map((chip) => (
              <li key={chip} className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/65">
                {chip}
              </li>
            ))}
          </ul>
          <TransitionLink
            href={study.href}
            className="mt-5 inline-flex items-center gap-2 text-[13px] text-white/70 transition-colors hover:text-white sm:mt-6">
            {study.cta}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </TransitionLink>
        </div>
      </div>
    </article>
  );
}
