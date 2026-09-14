import { alsoShipped, cases, work } from '@/lib/content';
import { CaseSpread } from './case-spread';
import { CaseTwin } from './case-twin';

export function Work() {
  const featured = cases.find((study) => study.layout === 'spread');
  const twins = cases.filter((study) => study.layout === 'twin');

  return (
    <section id="work" className="mx-auto max-w-page scroll-mt-24 px-6 pb-24 sm:px-10 lg:pb-32">
      <p className="font-mono text-[11px] uppercase tracking-label text-paper/40">{work.heading}</p>

      {featured ? (
        <div className="mt-10">
          <CaseSpread study={featured} />
        </div>
      ) : null}

      <div data-layout="twins" className="mt-20 grid gap-x-10 gap-y-16 border-t border-white/[0.06] pt-16 lg:grid-cols-2">
        {twins.map((study) => (
          <CaseTwin key={study.id} study={study} />
        ))}
      </div>

      <div data-layout="also-shipped" className="mt-20 border-t border-white/[0.06] pt-8">
        <p className="font-mono text-[11px] uppercase tracking-label text-paper/40">{alsoShipped.heading}</p>
        <p className="mt-4 text-[15px] leading-7 text-paper/65">
          {alsoShipped.items.map((item, index) => (
            <span key={item.name}>
              {index > 0 ? <span className="text-paper/25"> · </span> : null}
              <a href={item.href} target="_blank" rel="noreferrer" className="text-paper transition-colors hover:text-ice">
                {item.name}
              </a>
              <span className="text-paper/45"> ({item.blurb})</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
