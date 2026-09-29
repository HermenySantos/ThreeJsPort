import Image from 'next/image';

import type { CaseFigure } from '@/lib/case-layout';

export function CaseMediaList({
  figures,
  priorityFirst = false,
}: {
  figures: readonly CaseFigure[];
  priorityFirst?: boolean;
}) {
  return (
    <div className="mt-4 space-y-4">
      {figures.map((figure, index) => (
        <CaseMedia key={figure.src} figure={figure} priority={priorityFirst && index === 0} />
      ))}
    </div>
  );
}

function CaseMedia({ figure, priority = false }: { figure: CaseFigure; priority?: boolean }) {
  const openLabel = figure.kind === 'diagram' ? 'Open full-size diagram' : 'Open full-size image';

  return (
    <figure className="overflow-hidden rounded-[28px] border border-white/10 bg-[#111]">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        priority={priority}
        sizes="(min-width: 860px) 860px, 100vw"
        className="block h-auto w-full bg-ink"
      />
      <figcaption className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-white/55">
        {figure.caption}
        <a href={figure.src} className="mt-3 block text-[13px] text-white/55 transition-colors hover:text-white">
          {openLabel}
        </a>
      </figcaption>
    </figure>
  );
}
