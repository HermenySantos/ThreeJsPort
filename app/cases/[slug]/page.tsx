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
      <main className="mx-auto max-w-[860px] px-5 pb-24 pt-12 sm:px-8 lg:pb-32">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[13px] text-white/45 transition-colors hover:text-white">
          Selected work
        </Link>
        <p className="mt-10 text-[11px] uppercase tracking-label text-white/40">
          {study ? `${study.id} / ${study.prototype ? 'Working prototype' : 'Engineering case'}` : 'Engineering case'}
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight text-white sm:text-5xl">{full.title}</h1>
        <p className="mt-5 max-w-[40rem] text-[15px] leading-7 text-white/45">{full.roleLine}</p>
        <CaseMarkdown markdown={full.body} />
        <p className="mt-12 text-[11px] uppercase tracking-label text-white/40">Architecture</p>
        <figure className="mt-4 rounded-[28px] border border-white/10 bg-[#111]">
          <div className="overflow-x-auto">
            <Image
              src={full.architecture.src}
              alt={full.architecture.alt}
              width={1800}
              height={1120}
              priority
              sizes="1800px"
              className="block h-auto w-[1800px] max-w-none bg-ink"
            />
          </div>
          <figcaption className="border-t border-white/10 px-5 py-4 text-[13px] leading-6 text-white/55">
            {full.architecture.caption}
          </figcaption>
        </figure>
        <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium text-black transition-colors hover:bg-white/90">
            Get in touch
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
          <Link href="/#work" className="text-[13px] text-white/45 transition-colors hover:text-white">
            Back to selected work
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
