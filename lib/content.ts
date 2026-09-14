export const site = {
  name: 'Hermenegildo',
  fullName: 'Hermenegildo Santos',
  title: 'Hermenegildo Santos — Full-Stack AI Engineer',
  description:
    'Full-Stack AI Engineer in Portugal. Ships production AI and live-event systems end to end — TypeScript, React, Node, Azure OpenAI.',
  url: 'https://www.hermenegildosantos.com',
  email: 'hermeny7@hotmail.com',
  github: 'https://github.com/HermenySantos',
  linkedin: 'https://www.linkedin.com/in/hermenegildosantos',
  ogImage: '/assets/og-image.png',
} as const;

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const hero = {
  eyebrow: 'Full-Stack AI Engineer · Portugal',
  headline: 'I ship production AI and live-event systems end to end.',
  stack: 'TypeScript · React · Node · Azure OpenAI',
  primaryCta: { label: 'View selected work', href: '#work' },
  secondaryCta: { label: 'LinkedIn', href: site.linkedin },
} as const;

export const metrics = {
  attribution: 'Same-day global WebAR event',
  items: [
    { value: '~2,100', label: 'participants' },
    { value: '12', label: 'locations' },
    { value: '5', label: 'weeks' },
  ],
} as const;

export const work = {
  heading: 'Selected work',
} as const;

export type CaseStudy = {
  id: string;
  layout: 'spread' | 'twin';
  kicker?: string;
  title: string;
  role: string;
  chips: readonly string[];
  summary: string;
  outcome: string;
  cta?: string;
  /** Local still path. Leave empty for Claude’s assets. */
  image?: string;
};

export const cases: readonly CaseStudy[] = [
  {
    id: '01',
    layout: 'spread',
    kicker: 'UN Geneva Visitor Center · Dorier',
    title: 'Immersive visitor platform — Audio Guide, Docent & tour systems',
    role: 'Core engineer across clients, CMS, and Go tour services · 2025–2026',
    chips: ['TypeScript', 'React Native', 'Payload CMS', 'Go', 'MQTT'],
    summary:
      'The Visitor Center runs as a multi-device production system: Audio Guides, docent tablets, and interactive kiosks stay in sync with a content CMS and Go tour/state services over live messaging. Over ~10 months I worked across that stack end-to-end — React Native clients, CMS scheduling and content, TMS APIs and state hardening, observe/ops tooling, and the verified technical documentation used for handover — not a one-off feature.',
    outcome:
      'Shipped and hardened work across the live platform: multi-language and RTL support, tour integrity (single-controller and ghost-tour paths), cross-app flight recorder/observe, E3 kiosk content, and school/group tour flows. The proximity “Gathering” flash was one Audio Guide moment inside that system, not the engagement.',
    cta: 'Walkthrough on request · no public monorepo link',
  },
  {
    id: '02',
    layout: 'twin',
    title: 'Major gaming brand — Same-day global WebAR event',
    role: 'End-to-end ownership · 2025',
    chips: ['Zappar', 'Azure Functions', 'Cosmos DB', 'React'],
    summary:
      'Owned the same-day global WebAR activation end to end: WebAR (Zappar), Azure Functions, Cosmos DB partitioned by location, and React admin — delivered in five weeks for a multi-hub live day.',
    outcome: '~2,100 participants across 12 locations, sustained without incident on event day.',
  },
  {
    id: '03',
    layout: 'twin',
    title: 'Live-event AI Moderator',
    role: 'Owned production HITL AI · 2025–2026',
    chips: ['Azure OpenAI', 'FastAPI', 'React', 'WebRTC'],
    summary:
      'Owned a production human-in-the-loop live-event AI system: Azure OpenAI generates and voices responses in real time; operators stay in control via conversation, panel, workshop, and audience Q&A modes — with WebRTC/WebSockets and a Three.js stage visualiser on the audience-facing surface.',
    outcome: 'Production AI in a live-event setting with operator tooling, not a demo chatbot.',
  },
];

export const alsoShipped = {
  heading: 'Also shipped',
  items: [
    { name: 'Seezy', blurb: 'eye-care', href: 'https://www.seezy.care' },
    { name: 'InvoFlow', blurb: 'invoice SaaS', href: 'https://github.com/HermenySantos/invoflow' },
    { name: 'NexTool', blurb: 'edge developer API', href: 'https://github.com/HermenySantos/nextool-api' },
  ],
} as const;

export const about = {
  heading: 'About',
  body: [
    'Full-stack AI engineer based in Portugal. I take live-event and production AI systems from first architecture through event-day operations — clients, backends, and the infrastructure that has to hold under load.',
    'Recent work includes a multi-device visitor platform at the UN Geneva Visitor Center (Dorier), a same-day global WebAR activation, and a human-in-the-loop live-event AI system. Earlier: healthcare platforms, invoice SaaS, and edge developer APIs.',
  ],
  location: 'Portugal · Remote',
} as const;

export const contact = {
  heading: 'Contact',
  lede: 'Walkthroughs, roles, and collaborations.',
} as const;
