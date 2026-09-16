import { cases, work } from '@/lib/content';
import { CaseCard } from './case-card';

export function Work() {
  const featured = cases[0];
  const visitor = cases[1];
  const webar = cases[2];
  const concierge = cases[3];

  if (!featured || !visitor || !webar || !concierge) {
    return null;
  }

  return (
    <section id="work" className="section-shell work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{work.eyebrow}</p>
          <h2>{work.heading}</h2>
        </div>
      </div>
      <CaseCard study={featured} featured />
      <div className="supporting-grid">
        <CaseCard study={visitor} />
        <CaseCard study={webar} />
      </div>
      <CaseCard study={concierge} compact />
      <p className="discretion-note">
        Selected work, shared with discretion. Client identities and operational details are intentionally limited.
      </p>
    </section>
  );
}
