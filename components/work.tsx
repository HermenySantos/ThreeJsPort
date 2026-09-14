import { alsoShipped, cases, work } from '@/lib/content';
import { CaseCard } from './case-card';

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8 lg:pb-28">
      <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-16 sm:pt-20 lg:flex-row lg:items-end">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{work.heading}</h2>
        <p className="max-w-md text-[14px] leading-6 text-white/45 lg:text-right">{work.intro}</p>
      </div>

      <div className="mt-12 space-y-4">
        {cases.map((study) => (
          <CaseCard key={study.id} study={study} />
        ))}
      </div>

      <div className="mt-6 rounded-[28px] border border-white/10 px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="text-[15px] text-white">{alsoShipped.heading}</h3>
          <p className="text-[14px] leading-6 text-white/45">
            {alsoShipped.items.map((item, index) => (
              <span key={item.name}>
                {index > 0 ? <span className="text-white/25"> · </span> : null}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white">
                  {item.name}
                </a>
                <span> ({item.blurb})</span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
