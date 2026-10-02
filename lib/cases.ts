import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { buildArticle, parseCaseMarkdown, type CaseArticle } from './case-layout';
import { cases, type CaseSlug } from './content';

export const caseSlugs = ['ai', 'visitor', 'webar', 'concierge', 'seezy'] as const;

export type { CaseSlug };
export type { CaseArticle, CaseFigure } from './case-layout';

export type FullCase = {
  slug: CaseSlug;
  title: string;
  roleLine: string;
  body: string;
  markdown: string;
  article: CaseArticle;
};

export function isCaseSlug(value: string): value is CaseSlug {
  return (caseSlugs as readonly string[]).includes(value);
}

export function loadCaseMarkdown(slug: CaseSlug): string {
  return readFileSync(join(process.cwd(), 'content/cases', `${slug}.md`), 'utf8');
}

export { parseCaseMarkdown } from './case-layout';

export function getFullCase(slug: CaseSlug): FullCase {
  const markdown = loadCaseMarkdown(slug);
  const parsed = parseCaseMarkdown(markdown);
  return {
    slug,
    title: parsed.title || cases.find((item) => item.slug === slug)?.title || slug,
    roleLine: parsed.roleLine,
    body: parsed.body,
    markdown,
    article: buildArticle(slug, parsed.body),
  };
}
