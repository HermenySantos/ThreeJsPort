import { experience } from '@/lib/content';

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{experience.heading}</h2>
          <p className="mt-5 text-[15px] text-white/70">
            {experience.title}
            <span className="text-white/40"> · {experience.company}</span>
          </p>
          <p className="mt-2 text-[13px] text-white/40">{experience.period}</p>
        </div>
        <ul className="max-w-xl list-disc space-y-4 pl-5 text-[16px] leading-7 text-mute">
          {experience.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
