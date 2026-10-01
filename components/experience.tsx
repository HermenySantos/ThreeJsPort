import { experience } from '@/lib/content';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{experience.heading}</h2>
        <div className="max-w-xl">
          <p className="text-[15px] text-white/70">
            {experience.title}
            <span className="text-white/60"> · {experience.company}</span>
          </p>
          <p className="mt-2 text-[13px] text-white/60">{experience.period}</p>
          <ul className="mt-5 list-disc space-y-4 pl-5 text-[16px] leading-7 text-mute">
            {experience.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <ol className="mt-12 space-y-8 border-t border-white/10 pt-10">
            {experience.earlier.map((role) => (
              <li key={`${role.company}-${role.period}`}>
                <p className="text-[15px] text-white/70">
                  {role.title}
                  <span className="text-white/60"> · {role.company}</span>
                </p>
                <p className="mt-1 text-[13px] text-white/60">{role.period}</p>
                <p className="mt-3 text-[15px] leading-6 text-mute">{role.summary}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 text-[11px] uppercase tracking-label text-white/60">Education</h3>
          <ul className="mt-4 space-y-3">
            {experience.education.map((item) => (
              <li key={item.title} className="text-[15px] text-white/70">
                {item.title}
                <span className="text-white/60">
                  {' '}
                  · {item.school} · {item.period}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
