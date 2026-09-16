import { ImageResponse } from 'next/og';

export const alt =
  'Hermenegildo Santos | Full-Stack Engineer · AI & Real-Time Systems. I build the product—and the systems that make it work.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: '#0a0a0a',
          color: '#f5f5f5',
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: 'rgba(255,255,255,0.45)' }}>
          <span>HERMENEGILDO SANTOS</span>
          <span>FULL-STACK ENGINEER</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 64, letterSpacing: '-3px', lineHeight: 1.05, fontWeight: 500 }}>
          <span>I build the product—</span>
          <span>and the systems that make it work.</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 26,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            fontSize: 18,
            color: 'rgba(255,255,255,0.45)',
          }}>
          <span>AI products · Real-time systems · Interactive platforms</span>
          <span>hermenegildosantos.com</span>
        </div>
      </div>
    ),
    size,
  );
}
