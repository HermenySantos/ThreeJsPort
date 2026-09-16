import Link from 'next/link';

import { type CaseStudy } from '@/lib/content';
import { ArrowUpRightIcon } from './icons';
import { SystemIllustration } from './system-illustration';

function CaseVisual({ study, featured }: { study: CaseStudy; featured?: boolean }) {
  if (featured && study.slug === 'ai') {
    return <SystemIllustration />;
  }

  if (study.slug === 'webar') {
    return (
      <div className="support-visual" aria-hidden="true">
        <span className="small-index">CONNECTED ACROSS LOCATIONS</span>
        <div className="location-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i}>
              <i />
              <small>{String(i + 1).padStart(2, '0')}</small>
            </span>
          ))}
        </div>
        <span className="visual-note">Conceptual illustration</span>
      </div>
    );
  }

  if (study.slug === 'visitor') {
    return (
      <div className="support-visual" aria-hidden="true">
        <span className="small-index">ONE CONNECTED EXPERIENCE</span>
        <div className="operator-flow">
          <span>Audio</span>
          <i />
          <span>Tablet</span>
          <i />
          <span>Kiosk</span>
        </div>
        <span className="visual-note">Conceptual illustration</span>
      </div>
    );
  }

  return (
    <div className="support-visual support-visual-03" aria-hidden="true">
      <span className="small-index">{study.prototype ? 'WORKING PROTOTYPE' : 'THE OPERATOR STAYS IN CONTROL'}</span>
      <div className="operator-flow">
        <span>Source</span>
        <i />
        <span className="operator-node">Concierge</span>
        <i />
        <span>Cockpit</span>
      </div>
      <span className="visual-note">Conceptual illustration</span>
    </div>
  );
}

export function CaseCard({
  study,
  featured = false,
  compact = false,
}: {
  study: CaseStudy;
  featured?: boolean;
  compact?: boolean;
}) {
  const variant = featured ? 'case-featured' : compact ? 'case-supporting case-compact' : 'case-supporting';

  return (
    <article id={`case-${study.slug}`} className={`case-study ${variant}`}>
      {compact ? (
        <div className="prototype-bar">
          <span className="small-index">04 / Working prototype</span>
          <span className="visual-note">Visible secondary case</span>
        </div>
      ) : (
        <CaseVisual study={study} featured={featured} />
      )}
      <div className="case-body">
        <div className="case-heading">
          <p className="eyebrow">
            <span>{study.id} / </span>
            {study.prototype ? 'Working prototype' : 'Dorier'}
          </p>
          <span className="case-year">{study.year}</span>
        </div>
        <h3>{study.title}</h3>
        <p className="case-role">{study.label}</p>
        <div className="case-narrative">
          <p>{study.summary}</p>
          <div className="delivered">
            {study.scale ? <p className="case-scale">Scale: {study.scale}</p> : null}
            <span className="eyebrow">What I delivered</span>
            <ul>
              {study.delivered.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="tech-list">
          {study.stack.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <Link className="text-link" href={study.href}>
          {study.cta}
          <ArrowUpRightIcon />
        </Link>
      </div>
    </article>
  );
}
