import Image from 'next/image';

import type { CaseFigure } from '@/lib/cases';

export function CaseMediaList({
  figures,
  priorityFirst = false,
}: {
  figures: readonly CaseFigure[];
  priorityFirst?: boolean;
}) {
  return (
    <div className="mt-4 space-y-4">
      {figures.map((figure, index) => {
        const previousGroup = index > 0 ? figures[index - 1]?.group : undefined;
        const showGroup = Boolean(figure.group) && figure.group !== previousGroup;
        return (
          <div key={figure.src} className="space-y-4">
            {showGroup ? (
              <p className="text-[11px] uppercase tracking-label text-white/40">{figure.group}</p>
            ) : null}
            <CaseMedia figure={figure} priority={priorityFirst && index === 0} />
          </div>
        );
      })}
    </div>
  );
}

function CaseMedia({ figure, priority = false }: { figure: CaseFigure; priority?: boolean }) {
  const frame =
    figure.layout === 'diagram' ? (
      <div className="overflow-x-auto">
        <div style={{ width: figure.width }}>
          <Image
            src={figure.src}
            alt={figure.alt}
            width={figure.width}
            height={figure.height}
            priority={priority}
            sizes={`${figure.width}px`}
            className="block h-auto w-full bg-ink"
          />
        </div>
      </div>
    ) : (
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        priority={priority}
        sizes="(min-width: 860px) 860px, 100vw"
        className={
          figure.height > figure.width
            ? 'mx-auto block h-auto w-full max-w-[440px] bg-ink'
            : 'block h-auto w-full bg-ink'
        }
      />
    );

  return (
    <figure className="rounded-[28px] border border-white/10 bg-[#111]">
      {figure.pendingClearance ? (
        <p className="border-b border-white/10 px-5 py-3 text-[11px] uppercase tracking-label text-white/55">
          Pending brand clearance
        </p>
      ) : null}
      {frame}
      <figcaption className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-white/55">
        {figure.caption}
        {figure.layout === 'diagram' ? (
          <a href={figure.src} className="mt-3 block text-[13px] text-white/55 transition-colors hover:text-white">
            Open diagram
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
