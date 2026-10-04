import { readFileSync } from 'node:fs';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { getFullCase, isCaseSlug } from '@/lib/cases';
import { cases } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Case study by Hermenegildo Santos';

export function generateStaticParams() {
  return cases.map((study) => ({ slug: study.slug }));
}

function coverDataUrl(src: string): string {
  const file = readFileSync(path.join(process.cwd(), 'public', src));
  const type = src.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${type};base64,${file.toString('base64')}`;
}

export default async function CaseOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = cases.find((item) => item.slug === slug) ?? cases[0];
  const title = isCaseSlug(slug) ? getFullCase(slug).title : study.title;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0a0a', color: '#f5f5f5' }}>
        <div
          style={{
            width: 560,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 48px 56px 56px',
          }}>
          <div style={{ display: 'flex', fontSize: 17, letterSpacing: '3px', color: '#7fe0bf' }}>
            CASE STUDY {study.id} · {study.year}
          </div>
          <div style={{ display: 'flex', fontSize: 50, lineHeight: 1.06, letterSpacing: '-2px', fontWeight: 500 }}>
            {title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 18, color: 'rgba(255,255,255,0.5)' }}>
            <span>Hermenegildo Santos · Software Engineer</span>
            <span>hermenegildosantos.com</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverDataUrl(study.cover.src)}
          alt=""
          width={640}
          height={630}
          style={{
            width: 640,
            height: 630,
            // Diagrams and designed covers must stay whole; photos and screenshots can fill the frame.
            objectFit: study.cover.src.startsWith('/architecture/') || study.cover.src.endsWith('-cover.png') ? 'contain' : 'cover',
            background: '#0e1412',
            borderLeft: '1px solid rgba(255,255,255,0.1)',
          }}
        />
      </div>
    ),
    size,
  );
}
