import { experience } from '@/lib/content';

export function Experience() {
  return (
    <section id="experience" className="section-shell experience-section">
      <div className="experience-intro">
        <div>
          <p className="eyebrow">{experience.heading}</p>
          <h2>
            {experience.title}
            <span> · {experience.company}</span>
          </h2>
          <p className="case-year">{experience.period}</p>
        </div>
        <ul className="experience-list">
          {experience.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
