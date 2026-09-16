import { hero, metrics } from '@/lib/content';
import { ArrowRightIcon, ArrowUpRightIcon } from './icons';

export function Hero() {
  return (
    <section className="mx-auto min-h-[calc(100svh-72px)] max-w-page px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
      <div className="grid items-start gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
        <div>
          <p className="text-[11px] uppercase tracking-label text-white/45">{hero.eyebrow}</p>
          <h1 className="mt-5 max-w-[13.5em] text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:max-w-[9.6em] lg:text-[4.35rem]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-[36rem] text-[17px] leading-7 text-mute">{hero.lede}</p>
          <p className="mt-6 text-[13px] text-white/45">{hero.stack}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-white/90">
              {hero.primaryCta.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-white/85 transition-colors hover:border-white/40 hover:text-white">
              {hero.secondaryCta.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <aside aria-label="Most recent delivery" className="lg:pt-1">
          <p className="text-[11px] uppercase tracking-label text-white/40">{metrics.kicker}</p>
          <dl className="mt-8 space-y-7">
            {metrics.items.map((item) => (
              <div key={item.label} className="grid grid-cols-[auto_1fr] items-center gap-x-6">
                <dt className="sr-only">{item.label}</dt>
                <dd className="text-[2.75rem] font-medium leading-none tracking-tight text-white sm:text-[3.15rem]">
                  {item.value}
                </dd>
                <span className="text-[13px] text-white/40">{item.label}</span>
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-[16rem] text-[13px] leading-5 text-white/35">{metrics.footnote}</p>
        </aside>
      </div>
    </section>
  );
}
