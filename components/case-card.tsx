import Link from 'next/link';

import type { CaseStudy } from '@/lib/content';
import { ArrowRightIcon } from './icons';

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article
      id={`case-${study.slug}`}
      className="scroll-mt-24 rounded-[28px] border border-white/10 px-5 py-6 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="text-[13px] text-white/40">
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
          <h3 className="mt-3 max-w-[16ch] text-[1.85rem] font-medium leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-[2.15rem]">
            {study.title}
          </h3>
          <p className="mt-3 max-w-[22rem] text-[14px] leading-6 text-white/45 sm:mt-5">{study.label}</p>
        </div>

        <div>
          <p className="text-[15px] leading-7 text-mute">{study.summary}</p>
          <p className="mt-5 text-[11px] uppercase tracking-label text-white/35 sm:mt-6">What I delivered</p>
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
          <Link
            href={study.href}
            className="mt-5 inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white sm:mt-6">
            {study.cta}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
