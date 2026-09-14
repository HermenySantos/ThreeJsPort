import type { CaseStudy } from '@/lib/content';
import { CaseReveal } from './case-reveal';
import { ChipList } from './chip-list';
import { MediaSlot } from './media-slot';

export function CaseTwin({ study }: { study: CaseStudy }) {
  return (
    <article>
      <MediaSlot title={study.title} src={study.image} />
      <div className="mt-6">
        <CaseReveal id={study.id} title={study.title} kicker={study.kicker} variant="twin" />
      </div>
      <p className="mt-4 text-[13px] leading-6 text-mute">{study.role}</p>
      <div className="mt-4">
        <ChipList chips={study.chips} />
      </div>
      <p className="mt-5 text-[14px] leading-7 text-paper/70">{study.summary}</p>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-paper/35">Outcome</p>
      <p className="mt-2 text-[14px] leading-7 text-paper/65">{study.outcome}</p>
    </article>
  );
}
