import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CaseMarkdown } from '@/components/case-markdown';
import { getFullCase, isCaseSlug } from '@/lib/cases';
import { cases, site } from '@/lib/content';
import { ArrowRightIcon } from '@/components/icons';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) {
    return { title: 'Case not found' };
  }
  const study = cases.find((item) => item.slug === slug);
  const full = getFullCase(slug);
  const title = `${full.title} | ${site.fullName}`;
  const description = study?.summary ?? site.description;
  return {
    title,
    description,
    alternates: { canonical: `/cases/${slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/cases/${slug}`,
      type: 'article',
    },
  };
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = await params;
  if (!isCaseSlug(slug)) {
    notFound();
  }

  const study = cases.find((item) => item.slug === slug);
  const full = getFullCase(slug);

  return (
    <div>
      <Header />
      <main className="section-shell case-page">
        <Link className="text-link case-back" href="/#work">
          Selected work
        </Link>
        <p className="eyebrow case-page-kicker">
          {study ? `${study.id} / ${study.prototype ? 'Working prototype' : 'Engineering case'}` : 'Engineering case'}
        </p>
        <h1 className="case-page-title">{full.title}</h1>
        <p className="case-role">{full.roleLine}</p>
        <figure className="case-architecture">
          <Image
            src={full.architecture.src}
            alt={full.architecture.alt}
            width={1600}
            height={900}
            sizes="(max-width: 860px) 100vw, 860px"
          />
          <figcaption>{full.architecture.caption}</figcaption>
        </figure>
        <CaseMarkdown markdown={full.body} />
        <div className="case-page-footer">
          <Link className="primary-button" href="/#contact">
            Get in touch
            <ArrowRightIcon />
          </Link>
          <Link className="text-link" href="/#work">
            Back to selected work
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
