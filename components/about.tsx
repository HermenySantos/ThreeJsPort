import { about } from '@/lib/content';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-page scroll-mt-24 px-6 pb-24 sm:px-10">
      <div className="grid gap-8 border-t border-white/[0.06] pt-16 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-20">
        <h2 className="font-mono text-[11px] uppercase tracking-label text-paper/40">{about.heading}</h2>
        <div className="max-w-xl space-y-5 text-[16px] leading-8 text-mute">
          {about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="font-mono text-[11px] uppercase tracking-label text-paper/40">{about.location}</p>
        </div>
      </div>
    </section>
  );
}
