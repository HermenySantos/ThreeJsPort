import { CaseMarkdown } from '@/components/case-markdown';
import { CaseMediaList } from '@/components/case-media';
import type { CaseArticle as CaseArticleModel } from '@/lib/case-layout';

export function CaseArticle({ article }: { article: CaseArticleModel }) {
  let priorityAssigned = false;

  return (
    <>
      {article.preamble ? <CaseMarkdown markdown={article.preamble} /> : null}
      {article.sections.map((section) => {
        const priorityFirst = !priorityAssigned && section.figures.length > 0;
        if (priorityFirst) priorityAssigned = true;
        return (
          <section key={section.anchor} aria-labelledby={section.anchor}>
            <CaseMarkdown markdown={section.markdown} />
            {section.figures.length > 0 ? <CaseMediaList figures={section.figures} priorityFirst={priorityFirst} /> : null}
          </section>
        );
      })}
      {article.disclosure ? (
        <details className="mt-12 border-t border-white/10 pt-6">
          <summary className="cursor-pointer text-[15px] text-white">{article.disclosure.label}</summary>
          <CaseMediaList figures={article.disclosure.figures} />
        </details>
      ) : null}
    </>
  );
}
