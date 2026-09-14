import { about } from '@/lib/content';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{about.heading}</h2>
        <div className="max-w-xl space-y-5 text-[16px] leading-7 text-mute">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-[13px] text-white/40">{about.location}</p>
        </div>
      </div>
    </section>
  );
}
