import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cases, type CaseSlug } from './content';

export const caseSlugs = ['ai', 'visitor', 'webar', 'concierge'] as const;

export type ArchitectureFigure = {
  src: string;
  alt: string;
  caption: string;
};

export type FullCase = {
  slug: CaseSlug;
  title: string;
  roleLine: string;
  body: string;
  markdown: string;
  architecture: ArchitectureFigure;
};

const architecture: Record<CaseSlug, ArchitectureFigure> = {
  ai: {
    src: '/architecture/ai-architecture.png',
    alt: 'Conceptual diagram of live-event AI control and delivery, showing draft review, approval, and audience playback as logical responsibilities.',
    caption:
      'Conceptual diagram. Logical responsibilities; realtime media and stored clips use different paths across versions.',
  },
  visitor: {
    src: '/architecture/visitor-architecture.png',
    alt: 'Conceptual diagram of the visitor platform’s shared state, separating tour-control implementation from a development-branch flight recorder.',
    caption:
      'Conceptual diagram. Top: tour-control implementation. Bottom: development-branch flight recorder, not a verified production rollout.',
  },
  webar: {
    src: '/architecture/webar-architecture.png',
    alt: 'Conceptual diagram of the global WebAR product across participant interface, score API, and staff tools. It does not promise universal device support.',
    caption:
      'Conceptual diagram. Current sensor snapshot disables synthetic fallback movement; this diagram does not promise universal device support.',
  },
  concierge: {
    src: '/architecture/concierge-architecture.png',
    alt: 'Conceptual diagram of the museum AI concierge turn flow. Logical components in a development/demo application, not separately deployed services.',
    caption:
      'Conceptual diagram. Development/demo. Logical components, not four separately deployed services. Strategy and intervention selection are rule-based; scores are estimates, not validated psychology.',
  },
};

export function isCaseSlug(value: string): value is CaseSlug {
  return (caseSlugs as readonly string[]).includes(value);
}

export function loadCaseMarkdown(slug: CaseSlug): string {
  return readFileSync(join(process.cwd(), 'content/cases', `${slug}.md`), 'utf8');
}

export function parseCaseMarkdown(markdown: string): { title: string; roleLine: string; body: string } {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines[0]?.replace(/^#\s+/, '') ?? '';
  let index = 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  const roleLine = (lines[index] ?? '').replace(/^\*\*|\*\*$/g, '');
  index += 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  return {
    title,
    roleLine,
    body: lines.slice(index).join('\n'),
  };
}

export function getFullCase(slug: CaseSlug): FullCase {
  const markdown = loadCaseMarkdown(slug);
  const parsed = parseCaseMarkdown(markdown);
  const title = parsed.title || cases.find((item) => item.slug === slug)?.title || slug;
  return {
    slug,
    title,
    roleLine: parsed.roleLine,
    body: parsed.body,
    markdown,
    architecture: architecture[slug],
  };
}

