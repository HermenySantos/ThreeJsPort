import { hero, metrics } from '@/lib/content';
import { ArrowRightIcon, ArrowUpRightIcon } from './icons';

export function Hero() {
  return (
    <section className="hero section-shell">
      <div className="hero-topline">
        <p className="eyebrow">{hero.eyebrow}</p>
        <span className="location">
          <i />
          Portugal
        </span>
      </div>
      <div className="hero-main">
        <h1>
          Built for the moment
          <br />
          <em>it has to work.</em>
        </h1>
        <div className="hero-aside">
          <span className="small-index">ENGINEERING / DELIVERY / OWNERSHIP</span>
          <p>{hero.lede}</p>
          <a className="text-link" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
            <ArrowUpRightIcon />
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <a className="primary-button" href={hero.primaryCta.href}>
          {hero.primaryCta.label}
          <ArrowRightIcon />
        </a>
        <p>
          Selected work <span>2025 — 2026</span>
        </p>
        <span className="down-mark" aria-hidden="true">
          ↓
        </span>
      </div>
      <div className="proof-strip">
        <div className="proof-caption">
          <span className="eyebrow">{metrics.kicker}</span>
          <a href="#case-02">
            {metrics.footnote}
            <ArrowUpRightIcon />
          </a>
        </div>
        <dl>
          {metrics.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
