import { ImageResponse } from 'next/og';

export const alt = 'Hermenegildo Santos — Full-Stack AI Engineer. I ship production AI and live-event systems end to end.';
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
          <span>FULL-STACK AI ENGINEER · PORTUGAL</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 58,
            letterSpacing: '-3px',
            lineHeight: 1.05,
            fontWeight: 500,
          }}>
          <span>I ship production AI</span>
          <span>and live-event systems</span>
          <span>end to end.</span>
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
          <span>TypeScript · React · Node · Azure OpenAI</span>
          <span>hermenegildosantos.com</span>
        </div>
      </div>
    ),
    size,
  );
}
