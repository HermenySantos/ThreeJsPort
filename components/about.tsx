import { about, alsoShipped } from '@/lib/content';
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
          <span className="small-index">{about.location}</span>
        </div>
      </div>
      <div className="elsewhere">
        <p className="eyebrow">{alsoShipped.heading}</p>
        <div>
          {alsoShipped.items.map((item) => (
            <a key={item.name} href={item.href} target="_blank" rel="noreferrer">
              <span>{item.name} ↗</span>
              <small>{item.blurb}</small>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
