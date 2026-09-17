import { cases, work } from '@/lib/content';
import { CaseCard } from './case-card';

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-page scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-28 lg:pb-28">
      <div className="border-t border-white/10 pt-6 sm:pt-20">
        <p className="text-[11px] uppercase tracking-label text-white/40">{work.eyebrow}</p>
        <h2 className="mt-3 text-4xl font-medium tracking-tight text-white sm:mt-4 sm:text-5xl">{work.heading}</h2>
      </div>

      <div className="mt-6 space-y-3 sm:mt-12 sm:space-y-4">
        {cases.map((study) => (
          <CaseCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}
