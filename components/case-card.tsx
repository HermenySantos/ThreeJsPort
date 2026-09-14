import { site, type CaseStudy } from '@/lib/content';
import { ArrowUpRightIcon } from './icons';
import { SystemIllustration } from './system-illustration';

export function CaseCard({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  return (
    <article id={`case-${study.id}`} className={`case-study ${featured ? 'case-featured' : 'case-supporting'}`}>
      {featured ? (
        <SystemIllustration />
      ) : (
        <div className={`support-visual support-visual-${study.id}`} aria-hidden="true">
          <span className="small-index">
            {study.id === '02' ? 'CONNECTED ACROSS LOCATIONS' : 'THE OPERATOR STAYS IN CONTROL'}
          </span>
          {study.id === '02' ? (
            <div className="location-grid">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i}>
                  <i />
                  <small>{String(i + 1).padStart(2, '0')}</small>
                </span>
              ))}
            </div>
          ) : (
            <div className="operator-flow">
              <span>AI</span>
              <i />
              <span className="operator-node">Operator</span>
              <i />
              <span>Audience</span>
            </div>
          )}
          <span className="visual-note">Conceptual illustration</span>
        </div>
      )}
      <div className="case-body">
        <div className="case-heading">
          <p className="eyebrow">
            <span>{study.id} / </span>
            {study.kicker}
          </p>
          <span className="case-year">{study.year}</span>
        </div>
        <h3>{study.title}</h3>
        <p className="case-role">{study.role}</p>
        <div className="case-narrative">
          <p>{study.summary}</p>
          <div className="outcome">
            <span className="eyebrow">Delivered</span>
            <p>{study.outcome}</p>
          </div>
        </div>
        <details className="case-details">
          <summary>
            The challenge & my contribution<span aria-hidden="true">+</span>
          </summary>
          <div>
            <h4>The challenge</h4>
            <p>{study.challenge}</p>
            <h4>My contribution</h4>
            <p>{study.decision}</p>
            <ul className="tech-list">
              {study.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
        </details>
        <a
          className="text-link"
          href={`mailto:${site.email}?subject=${encodeURIComponent(`Let’s talk: ${study.title}`)}`}
        >
          {study.cta}
          <ArrowUpRightIcon />
        </a>
      </div>
    </article>
  );
}
