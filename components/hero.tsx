import { hero, metrics } from '@/lib/content';
import { CountUp } from './count-up';
import { HeroConsole } from './hero-console';
import { ArrowRightIcon } from './icons';

export function Hero() {
  return (
    <section className="mx-auto max-w-page px-5 pb-8 pt-8 sm:min-h-[calc(100svh-72px)] sm:px-8 sm:pb-28 sm:pt-20 lg:pb-32 lg:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <div>
          <p className="text-[11px] uppercase tracking-label text-white/60">{hero.eyebrow}</p>
          <h1 className="mt-4 max-w-[13.5em] text-[2.75rem] font-medium leading-[0.98] tracking-[-0.035em] text-white sm:mt-5 sm:text-6xl lg:max-w-[9.6em] lg:text-[4.35rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-[36rem] text-[17px] leading-7 text-mute sm:mt-7">{hero.lede}</p>
          <p className="mt-4 text-[13px] text-white/60 sm:mt-6">{hero.stack}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-white/90">
              {hero.primaryCta.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-white/85 transition-colors hover:border-white/40 hover:text-white">
              {hero.secondaryCta.label}
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        <HeroConsole />
      </div>
      <aside data-reveal aria-label={metrics.kicker} className="mt-14 border-t border-white/10 pt-8 sm:mt-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          <div>
            <p className="text-[11px] uppercase tracking-label text-white/60">{metrics.kicker}</p>
            <dl className="mt-5 grid grid-cols-3 gap-x-4">
              {metrics.items.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end gap-2">
                  <dt className="text-[11px] leading-4 text-white/60 sm:text-[13px]">{item.label}</dt>
                  <dd className="text-[1.65rem] font-medium leading-none tracking-tight text-white sm:text-[3.15rem]">
                    <CountUp value={item.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="self-end text-[13px] leading-5 text-white/60">{metrics.footnote}</p>
        </div>
      </aside>
    </section>
  );
}
