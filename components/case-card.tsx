import type { CaseStudy } from '@/lib/content';

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className="rounded-[28px] border border-white/10 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="text-[13px] text-white/40">
            {study.id}
            <span className="mx-3 text-white/20">—</span>
            {study.year}
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-label text-white/40">{study.kicker}</p>
          <h3 className="mt-4 max-w-[16ch] text-[1.85rem] font-medium leading-[1.15] tracking-tight text-white sm:text-[2.15rem]">
            {study.title}
          </h3>
          <p className="mt-5 max-w-[22rem] text-[14px] leading-6 text-white/45">{study.role}</p>
        </div>

        <div>
          <p className="text-[15px] leading-7 text-mute">{study.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {study.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] text-white/65">
                {chip}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[11px] uppercase tracking-label text-white/35">Outcome</p>
          <p className="mt-3 text-[15px] leading-7 text-mute">{study.outcome}</p>
          <p className="mt-6 text-[13px] text-white/35">{study.cta}</p>
        </div>
      </div>
    </article>
  );
}
