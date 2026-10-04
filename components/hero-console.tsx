'use client';

import { useEffect, useRef, useState } from 'react';

type Scene = {
  kind: 'approve' | 'silent' | 'expire';
  speaker: string;
  line: string;
  draft?: string;
};

const SCENES: readonly Scene[] = [
  {
    kind: 'approve',
    speaker: 'Moderator',
    line: 'Ovee, what is the one thing this room keeps coming back to?',
    draft: 'Ownership. Six tables raised it and none named an owner. Who takes it by Friday?',
  },
  {
    kind: 'silent',
    speaker: 'Panellist',
    line: 'Like Ovee showed this morning, ownership keeps coming up.',
  },
  {
    kind: 'expire',
    speaker: 'Moderator',
    line: 'Ovee, anything to add before the break?',
    draft: 'One thing: the room agreed on the goal, but not on the first step.',
  },
];

const EXPIRY_S = 12;
const LINE_START = 300;
const LINE_MS_PER_CHAR = 26;
const DRAFT_MS_PER_CHAR = 20;
// The expiring scene runs its countdown faster and says so, rather than making
// a visitor watch twelve real seconds of nothing.
const EXPIRE_SPEEDUP = 4;

type Frame = {
  lineChars: number;
  gate: 'listening' | 'addressed' | 'silent';
  draftChars: number;
  remaining: number | null;
  approved: boolean;
  outcome: 'none' | 'spoken' | 'expired' | 'silent';
  done: boolean;
};

function frameAt(scene: Scene, t: number): Frame {
  const lineEnd = LINE_START + scene.line.length * LINE_MS_PER_CHAR;
  const lineChars = Math.max(0, Math.min(scene.line.length, Math.floor((t - LINE_START) / LINE_MS_PER_CHAR)));
  const gateAt = lineEnd + 400;
  const base: Frame = {
    lineChars,
    gate: 'listening',
    draftChars: 0,
    remaining: null,
    approved: false,
    outcome: 'none',
    done: false,
  };
  if (t < gateAt) return base;

  if (scene.kind === 'silent') {
    return { ...base, gate: 'silent', outcome: t > gateAt + 700 ? 'silent' : 'none', done: t > gateAt + 3200 };
  }

  const draft = scene.draft ?? '';
  const draftStart = gateAt + 500;
  const draftEnd = draftStart + draft.length * DRAFT_MS_PER_CHAR;
  const draftChars = Math.max(0, Math.min(draft.length, Math.floor((t - draftStart) / DRAFT_MS_PER_CHAR)));
  const addressed = { ...base, gate: 'addressed' as const, draftChars };
  if (t < draftEnd) return addressed;

  const speed = scene.kind === 'expire' ? EXPIRE_SPEEDUP : 1;
  const elapsed = ((t - draftEnd) / 1000) * speed;

  if (scene.kind === 'approve') {
    const approveAfter = 2.6;
    if (elapsed < approveAfter) return { ...addressed, remaining: EXPIRY_S - elapsed };
    return {
      ...addressed,
      remaining: EXPIRY_S - approveAfter,
      approved: true,
      outcome: elapsed > approveAfter + 0.3 ? 'spoken' : 'none',
      done: elapsed > approveAfter + 3.4,
    };
  }

  if (elapsed < EXPIRY_S) return { ...addressed, remaining: EXPIRY_S - elapsed };
  return { ...addressed, remaining: 0, outcome: 'expired', done: (t - draftEnd) / 1000 > EXPIRY_S / speed + 2.6 };
}

const STATIC_FRAME: Frame = {
  lineChars: SCENES[0].line.length,
  gate: 'addressed',
  draftChars: SCENES[0].draft?.length ?? 0,
  remaining: EXPIRY_S - 2.6,
  approved: true,
  outcome: 'spoken',
  done: false,
};

export function HeroConsole() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [frame, setFrame] = useState<Frame>(STATIC_FRAME);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;

    let visible = true;
    let raf = 0;
    let index = 0;
    let sceneStart = performance.now();
    let pausedAt: number | null = null;

    const tick = (now: number) => {
      const scene = SCENES[index];
      const next = frameAt(scene, now - sceneStart);
      if (next.done) {
        index = (index + 1) % SCENES.length;
        sceneStart = now;
        setSceneIndex(index);
        setFrame(frameAt(SCENES[index], 0));
      } else {
        setFrame(next);
      }
      raf = requestAnimationFrame(tick);
    };

    const pause = () => {
      if (pausedAt !== null) return;
      pausedAt = performance.now();
      cancelAnimationFrame(raf);
    };
    const resume = () => {
      if (pausedAt === null) return;
      sceneStart += performance.now() - pausedAt;
      pausedAt = null;
      raf = requestAnimationFrame(tick);
    };
    const sync = () => (visible && !document.hidden ? resume() : pause());

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    if (rootRef.current) observer.observe(rootRef.current);
    document.addEventListener('visibilitychange', sync);

    setFrame(frameAt(SCENES[0], 0));
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const scene = SCENES[sceneIndex];
  const hasDraft = scene.kind !== 'silent' && frame.gate === 'addressed';
  const remaining = frame.remaining;
  const ringProgress = remaining === null ? 1 : remaining / EXPIRY_S;
  const low = remaining !== null && remaining < 4 && !frame.approved;

  return (
    <figure ref={rootRef} className="w-full">
      <div
        role="img"
        aria-label="Illustration of Ovee's operator gate. The AI listens to the stage, drafts a reply only when it is addressed, and a person approves it before it is spoken. Unapproved drafts expire after 12 seconds."
        className="rounded-[28px] border border-white/10 bg-[#0f0f0f] p-4 shadow-[0_30px_80px_-40px_rgba(127,224,191,0.25)] sm:p-5">
        <div aria-hidden className="space-y-3">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-label text-white/55">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Live stage
            </span>
            <span>Operator view</span>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="text-[10px] uppercase tracking-label text-white/55">Transcript</p>
            <p className="mt-2 text-[12px] font-medium text-white/70">{scene.speaker}</p>
            <p className="mt-1 min-h-[2.5rem] text-[14px] leading-5 text-white">
              {scene.line.slice(0, frame.lineChars)}
              {frame.lineChars < scene.line.length && (
                <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-white/70" />
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 text-[12px]">
            <span className="text-[10px] uppercase tracking-label text-white/55">Gate</span>
            <span
              className={`rounded-full border px-2.5 py-0.5 transition-colors duration-300 ${
                frame.gate === 'addressed'
                  ? 'border-[#7fe0bf]/40 text-[#7fe0bf]'
                  : frame.gate === 'silent'
                    ? 'border-white/20 text-white/70'
                    : 'border-white/10 text-white/55'
              }`}>
              {frame.gate === 'addressed'
                ? frame.draftChars < (scene.draft?.length ?? 0)
                  ? 'Addressed · drafting'
                  : 'Addressed'
                : frame.gate === 'silent'
                  ? 'Mentioned, not addressed · stays silent'
                  : 'Listening'}
            </span>
          </div>

          <div
            className={`rounded-2xl border p-3.5 transition-[border-color,opacity] duration-300 ${
              hasDraft ? 'border-white/[0.12] opacity-100' : 'border-white/[0.05] opacity-40'
            } ${frame.approved ? 'border-[#7fe0bf]/40' : ''} ${frame.outcome === 'expired' ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-label text-white/55">
                {frame.approved ? 'Approved' : frame.outcome === 'expired' ? 'Expired' : 'Draft · awaiting approval'}
              </p>
              <span className="flex items-center gap-1.5 text-[11px] tabular-nums text-white/55">
                {scene.kind === 'expire' && remaining !== null && frame.outcome !== 'expired' && (
                  <span className="rounded border border-white/10 px-1 text-[9px] text-white/55">{EXPIRE_SPEEDUP}×</span>
                )}
                {remaining !== null && !frame.approved && `${Math.max(0, Math.ceil(remaining))} s`}
                <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    fill="none"
                    stroke={frame.approved ? '#7fe0bf' : low ? '#f5c46b' : 'rgba(255,255,255,0.6)'}
                    strokeWidth="2"
                    strokeDasharray={2 * Math.PI * 8}
                    strokeDashoffset={2 * Math.PI * 8 * (1 - ringProgress)}
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
            <p className={`mt-2 min-h-[2.5rem] text-[14px] leading-5 ${frame.outcome === 'expired' ? 'text-white/55 line-through' : 'text-white/85'}`}>
              {hasDraft ? (scene.draft ?? '').slice(0, frame.draftChars) : ''}
            </p>
            <div className="mt-3 flex justify-end gap-2 text-[12px]">
              <span className="rounded-full border border-white/10 px-3 py-1 text-white/55">Discard</span>
              <span
                className={`rounded-full px-3 py-1 font-medium transition-colors duration-200 ${
                  frame.approved ? 'bg-[#7fe0bf] text-black' : 'bg-white/10 text-white/70'
                }`}>
                Approve
              </span>
            </div>
          </div>

          <div className="flex h-7 items-center justify-between rounded-full bg-white/[0.03] px-3.5 text-[12px]">
            <span className="text-[10px] uppercase tracking-label text-white/55">Room</span>
            {frame.outcome === 'spoken' ? (
              <span className="flex items-center gap-2 text-[#7fe0bf]">
                <span className="flex h-3 items-end gap-[2px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="w-[2px] animate-[wave_0.9s_ease-in-out_infinite] rounded-full bg-[#7fe0bf] motion-reduce:animate-none"
                      style={{ height: '100%', animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </span>
                Spoken to the room
              </span>
            ) : frame.outcome === 'expired' ? (
              <span className="text-white/55">Expired · nothing reached the room</span>
            ) : frame.outcome === 'silent' ? (
              <span className="text-white/55">Not addressed · nothing reached the room</span>
            ) : (
              <span className="text-white/55">Waiting</span>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 px-1 text-[12px] leading-5 text-white/55">
        Illustration of Ovee’s operator gate: the AI drafts, a person decides. Drafts nobody approves expire after 12 seconds.
      </figcaption>
    </figure>
  );
}
