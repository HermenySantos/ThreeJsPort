import { Fragment } from 'react';

import { CaseMarkdown } from '@/components/case-markdown';
import { CaseMediaList } from '@/components/case-media';
import type { CaseArticle as CaseArticleModel, CaseDisclosure } from '@/lib/case-layout';

export function CaseArticle({
  article,
  constrainPortraits = false,
}: {
  article: CaseArticleModel;
  constrainPortraits?: boolean;
}) {
  let priorityAssigned = false;

  return (
    <>
      {article.preamble ? <CaseMarkdown markdown={article.preamble} /> : null}
      {article.sections.map((section) => {
        const priorityFirst = !priorityAssigned && section.figures.length > 0;
        if (priorityFirst) priorityAssigned = true;
        const anchoredDisclosure =
          article.disclosure?.afterHeading === section.heading ? article.disclosure : undefined;
        return (
          <Fragment key={section.anchor}>
            <section aria-labelledby={section.anchor}>
              <CaseMarkdown markdown={section.markdown} />
              {section.figures.length > 0 ? (
                <CaseMediaList
                  figures={section.figures}
                  priorityFirst={priorityFirst}
                  constrainPortraits={constrainPortraits}
                />
              ) : null}
            </section>
            {anchoredDisclosure ? (
              <CaseDisclosureBlock disclosure={anchoredDisclosure} constrainPortraits={constrainPortraits} />
            ) : null}
          </Fragment>
        );
      })}
      {article.disclosure && !article.disclosure.afterHeading ? (
        <CaseDisclosureBlock disclosure={article.disclosure} constrainPortraits={constrainPortraits} />
      ) : null}
    </>
  );
}

function CaseDisclosureBlock({
  disclosure,
  constrainPortraits,
}: {
  disclosure: CaseDisclosure;
  constrainPortraits: boolean;
}) {
  return (
    <details className="mt-12 border-t border-white/10 pt-6">
      <summary className="cursor-pointer text-[15px] text-white">{disclosure.label}</summary>
      <CaseMediaList figures={disclosure.figures} constrainPortraits={constrainPortraits} />
    </details>
  );
}
