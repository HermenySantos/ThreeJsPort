import { hero } from '@/lib/content';
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
          {hero.headlineLead}
          <br />
          <em>{hero.headlineEm}</em>
        </h1>
        <div className="hero-aside">
          <p className="hero-role">{hero.role}</p>
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
          <span className="eyebrow">{hero.proofLabel}</span>
          <a href="#case-webar">
            Global WebAR experience
            <ArrowUpRightIcon />
          </a>
        </div>
        <p className="proof-copy">{hero.proof}</p>
      </div>
    </section>
  );
}
