export const site = {
  name: 'Gildo Santos',
  fullName: 'Hermenegildo Santos',
  title: 'Hermenegildo Santos | Full-Stack Engineer · AI & Real-Time Systems',
  description:
    'Full-stack engineer in Portugal building AI products, real-time systems and interactive platforms. Explore delivered work and the engineering decisions behind it.',
  url: 'https://www.hermenegildosantos.com',
  email: 'hermeny7@hotmail.com',
  github: 'https://github.com/HermenySantos',
  linkedin: 'https://www.linkedin.com/in/hermenegildosantos',
  ogImage: '/opengraph-image',
} as const;

export const nav = [
  { label: 'Selected work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Get in touch', href: '/#contact' },
] as const;

export const hero = {
  eyebrow: 'Hermenegildo Santos / Full-stack engineer',
  role: 'Full-stack engineer · AI products & real-time systems · Portugal',
  headline: 'I build the product—and the systems that make it work.',
  headlineLead: 'I build the product—',
  headlineEm: 'and the systems that make it work.',
  lede: 'I work across interfaces, backend services and AI to turn complex requirements into working software. My experience spans operator-controlled AI for live events, a multi-device visitor platform and a global WebAR experience.',
  proofLabel: 'Delivery proof',
  proof:
    'Live-event AI with an operator in the approval loop. Separately: a WebAR experience used by approximately 2,100 participants across 12 locations (core build in five weeks, then refinement).',
  stack: 'Based in Portugal · Working across the stack',
  primaryCta: { label: 'Explore selected work', href: '#work' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
} as const;

export const metrics = {
  kicker: hero.proofLabel,
  items: [
    { value: '~2,100', label: 'Participants' },
    { value: '12', label: 'Locations' },
    { value: '5', label: 'Weeks' },
  ],
  footnote: hero.proof,
} as const;

export const work = {
  heading: 'Selected work',
  eyebrow: 'Selected work / 01—04',
} as const;

export type CaseSlug = 'ai' | 'visitor' | 'webar' | 'concierge';

export type CaseStudy = {
  id: string;
  slug: CaseSlug;
  year: string;
  title: string;
  label: string;
  summary: string;
  delivered: readonly string[];
  stack: readonly string[];
  cta: string;
  href: string;
  scale?: string;
  prototype?: boolean;
};

export const cases: readonly CaseStudy[] = [
  {
    id: '01',
    slug: 'ai',
    year: '2026',
    title: 'Operator-controlled AI for live events',
    label: 'Primary engineer across AI, operator tools and audience delivery · Dorier · 2026',
    summary:
      'In a live room, generating a response is only part of the job. Someone has to decide whether it should be heard. I built the workflows connecting real-time AI, backstage review and audience audio, with safeguards around approval and playback.',
    delivered: [
      'Operator workflows for reviewing, approving and discarding AI contributions before stage delivery.',
      'Real-time voice and audience communication using WebRTC and WebSockets.',
      'Playback coordination that blocks empty drafts, double-approval races and duplicate audience audio.',
    ],
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Azure OpenAI', 'WebRTC', 'WebSockets'],
    cta: 'Explore the engineering',
    href: '/cases/ai',
  },
  {
    id: '02',
    slug: 'visitor',
    year: '2025–2026',
    title: 'Multi-device visitor platform',
    label: 'Core engineer across mobile apps, content management and Go services · Dorier · 2025–2026',
    summary:
      'Audio guides, staff tablets and interactive kiosks share one visitor experience. As a core engineer on the delivery team, I carried changes through React Native apps, content tools and Go services — including the server-side tour-ownership checks and the staff-app integration that uses them.',
    delivered: [
      'Tour-control safeguards that connect staff-device identity to server-side ownership checks.',
      'Group-tour changes spanning applications, CMS fields, shared types, Go services and database migrations.',
      'Multilingual caption integration and technical handover material for the team operating the platform.',
    ],
    stack: ['React Native', 'TypeScript', 'Go', 'Payload CMS', 'MQTT', 'PostgreSQL'],
    cta: 'Explore the engineering',
    href: '/cases/visitor',
  },
  {
    id: '03',
    slug: 'webar',
    year: '2025',
    title: 'Global WebAR experience',
    label:
      'End-to-end engineering across the browser experience, backend and admin tools · within wider event delivery · Dorier · 2025',
    summary:
      'Participants joined from their own phones in the browser — no app install — across twelve event locations. I owned the core implementation (five weeks) plus refinement within the wider event delivery: interaction layer, score APIs, location-scoped leaderboards and React administration.',
    delivered: [
      'A WebAR experience participants could enter without installing an app.',
      'An Azure Functions backend and Cosmos DB data model organised around event locations.',
      'React administration, sensor-permission handling and gameplay refinements informed by testing and client feedback.',
    ],
    stack: ['TypeScript', 'Mattercraft / Zappar', 'Azure Functions', 'Cosmos DB', 'React'],
    cta: 'Explore the engineering',
    href: '/cases/webar',
    scale: 'approximately 2,100 participants across 12 locations.',
  },
  {
    id: '04',
    slug: 'concierge',
    year: '2026',
    title: 'Museum AI concierge',
    label: 'Primary engineer · working prototype · Dorier · 2026',
    summary:
      'An AI answer can sound convincing while drawing on the wrong source. I built a concierge for voice, text and camera input, connecting source selection, conversation monitoring and explicit adaptation rules. An operator view shows how the conversation is being assessed and adapted.',
    delivered: [
      'A visitor web app supporting voice, text and camera input in English and French.',
      'Catalog retrieval and relevance checks to assess whether a source fits the question.',
      'A diagnostic cockpit showing monitoring estimates, adaptation decisions and strategy carried between turns.',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Azure AI Search', 'Azure Speech', 'Vitest'],
    cta: 'Explore the architecture',
    href: '/cases/concierge',
    prototype: true,
  },
];

export const about = {
  heading: 'About',
  body: [
    'I’m Hermenegildo—Gildo for short—a full-stack engineer based in Portugal.',
    'I like work that connects a usable product to the engineering underneath it: a mobile interface to a shared state model, an AI response to an operator’s decision, or an event experience to its backend and delivery tools.',
    'At Dorier, I work across interactive platforms, live-event AI and automation. I’m comfortable contributing to an established team and architecture, or carrying a defined product from its first implementation through delivery. I value clear ownership, practical testing and documentation that helps the next person understand the system.',
  ],
} as const;

export const experience = {
  heading: 'Experience',
  title: 'Full Stack Engineer',
  company: 'Dorier',
  period: '2025–present',
  items: [
    'Contribute across React Native applications, content management and Go services for a multi-device visitor platform.',
    'Build operator-controlled AI workflows, real-time voice interfaces and audience delivery for live events.',
    'Delivered end-to-end engineering for a global WebAR experience (browser, Azure backend, React admin) within the wider event delivery.',
    'Build video-delivery automation and the interfaces needed to operate it.',
  ],
} as const;

export const contact = {
  heading: 'Let’s talk about what you’re building.',
  lede: 'For senior full-stack and product engineering roles, product collaborations, or a closer look at the decisions behind this work, get in touch.',
} as const;
