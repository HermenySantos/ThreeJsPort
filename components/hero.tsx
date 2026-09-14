import { hero, metrics } from '@/lib/content';

export function Hero() {
  return (
    <section className="mx-auto flex min-h-[40vh] max-w-page flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[48vh] lg:py-24">
      <p className="font-mono text-[11px] uppercase tracking-label text-paper/45">{hero.eyebrow}</p>
      <h1 className="mt-4 max-w-[13ch] font-display text-[clamp(2.5rem,6.2vw,4.5rem)] leading-[0.96] tracking-[-0.02em] text-paper">
        {hero.headline}
      </h1>
      <p className="mt-8 font-mono text-[11px] uppercase tracking-label text-paper/40">{hero.stack}</p>

      <p className="mt-10 max-w-3xl font-display text-[1.35rem] leading-snug text-paper/90 sm:text-[1.65rem]">
        {metrics.items.map((item, index) => (
          <span key={item.label}>
            {index > 0 ? <span className="mx-2 text-paper/25 sm:mx-3">·</span> : null}
            <span className="text-ice">{item.value}</span>
            <span className="text-paper/55"> {item.label}</span>
          </span>
        ))}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-label text-ice">{metrics.attribution}</p>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
        <a
          href={hero.primaryCta.href}
          className="font-mono text-[11px] uppercase tracking-label text-paper transition-colors hover:text-ice">
          {hero.primaryCta.label} →
        </a>
        <a
          href={hero.secondaryCta.href}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-label text-paper/45 transition-colors hover:text-ice">
          {hero.secondaryCta.label}
        </a>
      </div>
    </section>
  );
}
