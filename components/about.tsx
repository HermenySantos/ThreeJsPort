import { about } from '@/lib/content';

export function About() {
  return (
    <section id="about" className="section-shell about-section">
      <div className="about-intro">
        <div>
          <p className="eyebrow">The person behind the work</p>
          <h2>{about.heading}</h2>
          <span className="signature">Gildo.</span>
        </div>
        <div className="about-copy">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
