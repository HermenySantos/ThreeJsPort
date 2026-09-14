import { ImageResponse } from 'next/og';

export const alt = 'Hermenegildo Santos — Full-Stack AI Engineer. Built for the moment it has to work.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px',
        background: '#111411',
        color: '#eeeae1',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, color: '#bfceb2' }}>
        <span>HERMENEGILDO SANTOS</span>
        <span>FULL-STACK AI ENGINEER</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 83, letterSpacing: '-4px', lineHeight: 1.08 }}>
        <span>Built for the moment</span>
        <span style={{ color: '#bfceb2' }}>it has to work.</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 26,
          borderTop: '1px solid #454c40',
          fontSize: 20,
        }}
      >
        <span>Production AI · Visitor platforms · Live experiences</span>
        <span>hermenegildosantos.com</span>
      </div>
    </div>,
    size,
  );
}
