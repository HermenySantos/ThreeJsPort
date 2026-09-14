import { cases, work } from '@/lib/content';
import { CaseCard } from './case-card';
export function Work() {
  return (
    <section id="work" className="section-shell work-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work / 01—03</p>
          <h2>{work.heading}</h2>
        </div>
        <p>{work.intro}</p>
      </div>
      <CaseCard study={cases[0]} featured />
      <div className="supporting-grid">
        {cases.slice(1).map((study) => (
          <CaseCard key={study.id} study={study} />
        ))}
      </div>
      <p className="discretion-note">
        Selected work, shared with discretion. Client identities and operational details are intentionally limited.
      </p>
    </section>
  );
}
