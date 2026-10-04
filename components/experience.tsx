import { experience } from '@/lib/content';

import { TimelineRail } from './timeline-rail';

type Role = {
  title: string;
  company: string;
  period: string;
  summary?: string;
  bullets?: readonly string[];
  current?: boolean;
};

const roles: readonly Role[] = [
  {
    title: experience.title,
    company: experience.company,
    period: experience.period,
    bullets: experience.items,
    current: true,
  },
  ...experience.earlier.map((role) => ({
    title: role.title,
    company: role.company,
    period: role.period,
    summary: role.summary,
    bullets: 'bullets' in role ? role.bullets : undefined,
  })),
];

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-page scroll-mt-24 px-5 pb-24 sm:px-8">
      <div
        data-reveal
        className="grid gap-8 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-20"
      >
        <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">{experience.heading}</h2>
        <div className="max-w-xl">
          {/* A timeline: one rail, one dot per role, the same header shape for every job. */}
          <TimelineRail>
            <ol className="relative border-l border-white/10">
              {roles.map((role, index) => (
                <li
                  key={`${role.company}-${role.period}`}
                  data-timeline-item
                  className={`group/item relative pl-6 sm:pl-8 ${index > 0 ? 'mt-10 border-t border-white/10 pt-10' : ''}`}
                >
                  <span
                    aria-hidden
                    data-timeline-dot
                    className={`absolute -left-[5px] transition-[background-color,box-shadow] duration-500 h-[9px] w-[9px] rounded-full ${index > 0 ? 'top-[49px]' : 'top-[9px]'} ${
                      role.current
                        ? 'bg-[#7fe0bf] shadow-[0_0_0_4px_rgba(127,224,191,0.15)]'
                        : 'bg-white/30 group-data-[reached]/item:bg-[#7fe0bf] group-data-[reached]/item:shadow-[0_0_10px_2px_rgba(127,224,191,0.5)]'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[19px] font-medium tracking-tight text-white">{role.company}</h3>
                    <p className="text-[13px] tabular-nums text-white/60">
                      {role.current ? (
                        <span className="mr-2 rounded-full border border-[#7fe0bf]/40 px-2 py-0.5 text-[11px] text-[#7fe0bf]">
                          Current
                        </span>
                      ) : null}
                      {role.period}
                    </p>
                  </div>
                  <p className="mt-1 text-[14px] text-white/60">{role.title}</p>
                  {role.summary ? <p className="mt-4 text-[15px] leading-7 text-mute">{role.summary}</p> : null}
                  {role.bullets ? (
                    <ul className="mt-4 list-disc space-y-3 pl-5 text-[15px] leading-7 text-mute">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ol>
          </TimelineRail>

          <div className="mt-16 border-t border-white/10 pt-10">
            <h3 className="text-[11px] uppercase tracking-label text-white/60">Education</h3>
            <ul className="mt-6 space-y-6">
              {experience.education.map((item) => (
                <li key={item.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="text-[17px] font-medium tracking-tight text-white">{item.title}</p>
                    <p className="text-[13px] tabular-nums text-white/60">{item.period}</p>
                  </div>
                  <p className="mt-1 text-[14px] text-white/60">{item.school}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
