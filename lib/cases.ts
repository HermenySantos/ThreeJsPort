import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { cases, type CaseSlug } from './content';

export const caseSlugs = ['ai', 'visitor', 'webar', 'concierge'] as const;

export type { CaseSlug };

export type ArchitectureFigure = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseFigure = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  layout: 'screen' | 'diagram';
  group?: string;
  pendingClearance?: boolean;
};

export type FullCase = {
  slug: CaseSlug;
  title: string;
  roleLine: string;
  body: string;
  markdown: string;
  leadLabel?: string;
  leads: readonly CaseFigure[];
  diagrams: readonly CaseFigure[];
  architecture: ArchitectureFigure;
};

const leads: Record<CaseSlug, readonly CaseFigure[]> = {
  ai: [
    {
      src: '/cases/ai/02b-stage-ambient-readable.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Stage',
      alt: 'Full-bleed stage wall titled Live Insights with three key-message cards; voice overlay idle.',
      caption:
        'Unified stage wall showing ambient insight cards. Synthetic demo session; voice overlay idle. Not event footage.',
    },
    {
      src: '/cases/ai/02c-stage-speaking-intentional.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Stage',
      alt: 'Stage wall with a speak-bloom overlay; content dimmed under the voice pin during an intentional broadcast.',
      caption:
        'Wall speak bloom during an intentional text-to-speech broadcast. Synthetic demo session. The dimmed text is the speaking state, kept separate from the resting wall.',
    },
    {
      src: '/cases/ai/04b-stage-poll-takeover-readable.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Stage',
      alt: 'Live poll takeover with percentage bars, a synthetic vote count, and a scan-to-vote code.',
      caption:
        'Takeover pins the wall: live poll results override the ambient cards. Synthetic 120 votes — not event scale.',
    },
    {
      src: '/cases/ai/04c-stage-poll-with-speaking.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Stage',
      alt: 'Poll takeover with a speak-bloom overlay active.',
      caption:
        'Poll takeover with an intentional speaking bloom. Synthetic demo session and synthetic votes, separate from the readable resting poll.',
    },
    {
      src: '/cases/ai/05-p0-stage-return-ambient-after-takeover.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Stage',
      alt: 'Stage wall back on quote cards after a poll takeover closed.',
      caption:
        'After the takeover closes, the wall returns to ambient quote cards. Observed in a synthetic demo session; not a latency measurement.',
    },
    {
      src: '/cases/ai/06a-operator-context-transcript-present.png',
      width: 1440,
      height: 900,
      layout: 'screen',
      group: 'Operator',
      alt: 'Operator view marked live, with transcript lines and an active brief. Nothing is awaiting approval yet.',
      caption:
        'Live Stage operator with a brief applied and room transcript turns present. Synthetic demo with injected turns, not a client case study.',
    },
    {
      src: '/cases/ai/06b-operator-pending-draft-awaiting-approval.png',
      width: 1440,
      height: 900,
      layout: 'screen',
      group: 'Operator',
      alt: 'Operator approvals panel showing an addressed line, a draft, and an approve control.',
      caption: 'A draft is awaiting operator approval before it can be spoken. Synthetic demo session.',
    },
    {
      src: '/cases/ai/06c-operator-after-approve-ovee-output.png',
      width: 1440,
      height: 900,
      layout: 'screen',
      group: 'Operator',
      alt: 'Transcript showing the approved response and a recent log entry that it was spoken.',
      caption: 'The approved line appears in the transcript after the operator approves it. Synthetic demo session.',
    },
    {
      src: '/cases/ai/06c-audience-wall-during-approved-output.png',
      width: 1920,
      height: 1080,
      layout: 'screen',
      group: 'Operator',
      alt: 'Stage wall speak bloom concurrent with an approved broadcast.',
      caption:
        'Audience wall speak bloom during the approved output. Synthetic demo and text-to-speech broadcast, paired with the operator still.',
    },
    {
      src: '/cases/ai/01-p0-home-ovee-reference-entry.png',
      width: 1440,
      height: 900,
      layout: 'screen',
      group: 'Product home',
      alt: 'Ovee home with the wordmark and curated mode tiles.',
      caption: 'Ovee home: product wordmark and curated mode entry. Supporting identity still from a demo instance.',
    },
  ],
  visitor: [],
  webar: [
    {
      src: '/architecture/webar-data-desktop.png',
      width: 2240,
      height: 1990,
      layout: 'diagram',
      alt: 'Diagram from browser AR through score validation and location-partitioned storage to staff reads of a local leaderboard.',
      caption:
        'Browser gameplay feeds validated scores into location-scoped leaderboards. Portfolio diagram of the score path, shown in place of event photography, which is not cleared. It does not depict the participant count.',
    },
  ],
  concierge: [
    {
      src: '/cases/concierge/concierge-04-monitor-gate-quiet.png',
      width: 1036,
      height: 1716,
      layout: 'screen',
      pendingClearance: true,
      alt: 'Diagnostic cockpit panels for an engagement estimate, guide output, monitor channels, and a quiet strategy gate.',
      caption:
        'Pending brand clearance. The cockpit shows monitoring estimates while the adaptation gate stays quiet. Prototype still; estimates are not validated psychology.',
    },
    {
      src: '/cases/concierge/concierge-05-strategy-carryover.png',
      width: 1036,
      height: 1716,
      layout: 'screen',
      pendingClearance: true,
      alt: 'Cockpit banner that a strategy is carrying over, with the monitor showing no new trigger.',
      caption:
        'Pending brand clearance. A prior strategy remains visible while this turn’s gate is quiet. Prototype still; a partial view of carryover, not proof that a new trigger fired.',
    },
    {
      src: '/cases/concierge/concierge-spark-livetest.png',
      width: 2560,
      height: 1724,
      layout: 'screen',
      pendingClearance: true,
      alt: 'Guide interface stating that no grounded source fits the question, with a suggested next step.',
      caption:
        'Pending brand clearance. When no grounded source fits, the guide declines to guess and can still offer a next-step suggestion. Prototype livetest; not a measured latency or cost result.',
    },
  ],
};

const diagrams: Record<CaseSlug, readonly CaseFigure[]> = {
  ai: [
    {
      src: '/architecture/ovee-runtime-flow.png',
      width: 1400,
      height: 640,
      layout: 'diagram',
      alt: 'Flow diagram linking the stage wall, operator, participant, and backend over HTTP, WebSocket, and WebRTC.',
      caption:
        'Runtime connections among the stage wall, operator, participant, and backend. Portfolio diagram of the captured paths.',
    },
    {
      src: '/architecture/ovee-wall-decision-paths.png',
      width: 1400,
      height: 620,
      layout: 'diagram',
      alt: 'Decision-path diagram for the wall: ambient cards, a pinned takeover, or a voice bloom.',
      caption: 'How the wall chooses ambient cards, a pinned takeover, or a voice bloom. Portfolio diagram of those paths.',
    },
    {
      src: '/architecture/ai-control-desktop.png',
      width: 2240,
      height: 1916,
      layout: 'diagram',
      alt: 'Diagram of draft generation, operator review, approval or discard, and audience delivery.',
      caption:
        'The operator reviews a draft before approved speech reaches the audience. Logical flow, read with the operator stills above.',
    },
    {
      src: '/architecture/ai-playback-desktop.png',
      width: 2240,
      height: 1926,
      layout: 'diagram',
      alt: 'Diagram of a playback guard that suppresses a duplicate start of the same clip version inside a short window.',
      caption:
        'Clip identity and a short time window protect playback when a fresh-audio notification and a replay overlap. Logical flow.',
    },
  ],
  visitor: [
    {
      src: '/architecture/visitor-system-overview-02.png',
      width: 1951,
      height: 1961,
      layout: 'diagram',
      alt: 'Logical connectivity diagram of the docent, kiosk, audio guide, content tools, messaging, and external show systems.',
      caption:
        'Applications, APIs, state services, messaging and external integrations share one platform. Documentation diagram. Pixera, Quuppa and device-management boundaries were colleague-owned; this is not sole implementation of every box.',
    },
    {
      src: '/architecture/visitor-docent-controller-01.png',
      width: 2118,
      height: 975,
      layout: 'diagram',
      alt: 'Sequence diagram of a takeover request, a database update, a message to the previous controller, and confirmation to the new one.',
      caption:
        'Tour takeover updates ownership, notifies the previous device, then confirms the new controller. Documentation sequence of that contract, not a before-and-after of a later fix.',
    },
  ],
  webar: [],
  concierge: [
    {
      src: '/architecture/concierge-turn-desktop.png',
      width: 2240,
      height: 2372,
      layout: 'diagram',
      alt: 'Turn-flow diagram from the visitor app through the guide, a finalized transcript, the monitor, and rule-based adaptation.',
      caption:
        'The turn finalizes the visitor and guide transcript before monitoring. Adaptation rules run only when that turn produces a trigger. Working prototype; those rules are not separate model agents.',
    },
  ],
};

const leadLabels: Partial<Record<CaseSlug, string>> = {
  webar: 'Score path',
  concierge: 'Prototype stills',
};

const architecture: Record<CaseSlug, ArchitectureFigure> = {
  ai: {
    src: '/architecture/ai-architecture.png',
    alt: 'Conceptual diagram of live-event AI control and delivery, showing draft review, approval, and audience playback as logical responsibilities.',
    caption:
      'Conceptual diagram. Logical responsibilities; realtime media and stored clips use different paths across versions.',
  },
  visitor: {
    src: '/architecture/visitor-architecture.png',
    alt: 'Conceptual diagram of the visitor platform’s shared state, separating tour-control implementation from a development-branch flight recorder.',
    caption:
      'Conceptual diagram. Top: tour-control implementation. Bottom: development-branch flight recorder, not a verified production rollout.',
  },
  webar: {
    src: '/architecture/webar-architecture.png',
    alt: 'Conceptual diagram of the global WebAR product across participant interface, score API, and staff tools. It does not promise universal device support.',
    caption:
      'Conceptual diagram. Current sensor snapshot disables synthetic fallback movement; this diagram does not promise universal device support.',
  },
  concierge: {
    src: '/architecture/concierge-architecture.png',
    alt: 'Conceptual diagram of the museum AI concierge turn flow. Logical components in a development/demo application, not separately deployed services.',
    caption:
      'Conceptual diagram. Development/demo. Logical components, not four separately deployed services. Strategy and intervention selection are rule-based; scores are estimates, not validated psychology.',
  },
};

export function isCaseSlug(value: string): value is CaseSlug {
  return (caseSlugs as readonly string[]).includes(value);
}

export function loadCaseMarkdown(slug: CaseSlug): string {
  return readFileSync(join(process.cwd(), 'content/cases', `${slug}.md`), 'utf8');
}

export function parseCaseMarkdown(markdown: string): { title: string; roleLine: string; body: string } {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const title = lines[0]?.replace(/^#\s+/, '') ?? '';
  let index = 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  const roleLine = (lines[index] ?? '').replace(/^\*\*|\*\*$/g, '');
  index += 1;
  while (index < lines.length && lines[index].trim() === '') {
    index += 1;
  }
  return {
    title,
    roleLine,
    body: lines.slice(index).join('\n'),
  };
}

export function getFullCase(slug: CaseSlug): FullCase {
  const markdown = loadCaseMarkdown(slug);
  const parsed = parseCaseMarkdown(markdown);
  return {
    slug,
    title: parsed.title || cases.find((item) => item.slug === slug)?.title || slug,
    roleLine: parsed.roleLine,
    body: parsed.body,
    markdown,
    leadLabel: leadLabels[slug],
    leads: leads[slug],
    diagrams: diagrams[slug],
    architecture: architecture[slug],
  };
}
