import type { CaseStudy } from '@/lib/content';
import { CaseReveal } from './case-reveal';
import { ChipList } from './chip-list';
import { MediaSlot } from './media-slot';

export function CaseSpread({ study }: { study: CaseStudy }) {
  return (
    <article>
      <CaseReveal id={study.id} title={study.title} kicker={study.kicker} variant="spread" />

      <div className="mt-10">
        <MediaSlot title={study.title} src={study.image} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="max-w-sm text-[15px] leading-7 text-mute">{study.role}</p>
          <div className="mt-6">
            <ChipList chips={study.chips} />
          </div>
        </div>
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-[16px] leading-8 text-paper/75 sm:text-[17px]">{study.summary}</p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-label text-paper/35">Outcome</p>
          <p className="mt-3 max-w-2xl text-[16px] leading-8 text-paper/70">{study.outcome}</p>
          {study.cta ? <p className="mt-6 font-mono text-[11px] text-paper/40">{study.cta}</p> : null}
        </div>
      </div>
    </article>
  );
}
