export const site = {
  name: 'Gildo Santos',
  fullName: 'Hermenegildo Santos',
  title: 'Hermenegildo Santos | Software Engineer · Full-Stack AI, Real-Time & Human-in-the-Loop Systems',
  description:
    'Software engineer in Portugal building full-stack AI: real-time, human-in-the-loop systems and interactive platforms. Explore delivered work and the engineering decisions behind it.',
  url: 'https://www.hermenegildosantos.com',
  email: 'hermeny7@hotmail.com',
  github: 'https://github.com/HermenySantos',
  linkedin: 'https://www.linkedin.com/in/hermenegildosantos',
  cv: '/Hermenegildo-Santos-CV.pdf',
  ogImage: '/opengraph-image',
} as const;

export const nav = [
  { label: 'Selected work', href: '/#work' },
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Get in touch', href: '/#contact' },
] as const;

export const hero = {
  eyebrow: 'Hermenegildo Santos / Software engineer, full-stack AI',
  role: 'Software engineer · Full-stack AI · Real-time & human-in-the-loop systems · Portugal',
  headline: 'I build AI systems that can’t afford a second take.',
  headlineLead: 'I build AI systems ',
  headlineEm: 'that can’t afford a second take.',
  lede: 'I build real-time AI systems people can trust in the room—live-event AI with an operator in the approval loop, and the product around it. Five years shipping web, mobile and cloud, most recently AI that runs live in front of an audience.',
  proofLabel: 'Delivery proof',
  proof: 'Ovee, live-event AI: cleared by a Fortune-500 client’s IT, privacy and data-control review; synthesised 60 roundtables for 600 leaders in seconds.',
  stack: 'Based in Portugal · Working across the stack',
  primaryCta: { label: 'Explore selected work', href: '#work' },
  secondaryCta: { label: 'Get in touch', href: '#contact' },
} as const;

export const metrics = {
  kicker: hero.proofLabel,
  items: [
    { value: '4', label: 'Live events, Asia & Europe' },
    { value: '0', label: 'Off-message incidents on stage' },
    { value: '~5 s', label: 'Workshop synthesis across 60 tables' },
  ],
  footnote: hero.proof,
} as const;

export const work = {
  heading: 'Selected work',
  eyebrow: 'Selected work / 01—05',
} as const;

export type CaseSlug = 'ai' | 'visitor' | 'webar' | 'concierge' | 'seezy';

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
  cover: { src: string; alt: string; width: number; height: number };
  scale?: string;
  prototype?: boolean;
};

export const cases: readonly CaseStudy[] = [
  {
    id: '01',
    slug: 'ai',
    year: '2026',
    title: 'Ovee — AI for live events.',
    label: 'Primary engineer across AI, operator tools and audience delivery · Dorier · Fortune-500 tour and mci group’s CheckedIn · 2026',
    summary:
      'Ovee turns stage discussions and workshop contributions into questions, themes and reports. I was the primary engineer across the operator interfaces, Python services, model integration and audience delivery. Delivered at 4 live events across Asia and Europe: a three-summit leadership tour for a Fortune-500 multinational, plus mci group’s CheckedIn 2026 in Geneva, where Ovee was billed as a panellist alongside the group CEO. In the moderated stage workflow, an operator approves each AI contribution before it is spoken.',
    delivered: [
      'Operator workflows for reviewing, approving and discarding AI contributions before stage delivery.',
      'Workshop synthesis that turned 60 roundtables into themes on the main display in about five seconds.',
      'Session services, playback guards and recovery paths connecting AI output to the live audience experience.',
    ],
    stack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Azure OpenAI', 'WebRTC', 'WebSockets'],
    cta: 'Explore the engineering',
    href: '/cases/ai',
    cover: {
      src: '/cases/ai/checkedin-main-stage-recurring-themes.jpg',
      alt: 'Panel on a lit stage in front of a large LED wall showing recurring themes generated live by Ovee.',
      width: 2000,
      height: 1333,
    },
  },
  {
    id: '02',
    slug: 'visitor',
    year: '2025–2026',
    title: 'Immersive visitor platform.',
    label: 'Software engineer across mobile apps, native Android and Go services · Dorier for the UN Geneva Visitor Centre · 2025–2026',
    summary:
      'UN Geneva’s new visitor centre, open since June 2026 for an expected 200,000 visitors a year. Visitors explore with location-aware audio guides while staff control the tour and kiosks host a shared voting experience. As a core engineer on the team, I built across React Native apps, native Android modules, Go services and content tools to make that journey work.',
    delivered: [
      'Native positioning and headphone-reconnection handling, plus audio drift and playback fixes.',
      'Device-aware tour control and group-tour language flows across applications, CMS and backend services.',
      'Multilingual content integration, operator tools and the platform’s technical documentation.',
    ],
    stack: ['React Native', 'TypeScript', 'Kotlin', 'Go', 'MQTT', 'Payload CMS', 'PostgreSQL'],
    cta: 'Explore the engineering',
    href: '/cases/visitor',
    cover: {
      src: '/cases/visitor/together-voting-chamber.jpg',
      alt: 'Visitors seated in the curved negotiation chamber of the Together experience, voting at kiosks.',
      width: 2000,
      height: 1333,
    },
  },
  {
    id: '03',
    slug: 'webar',
    year: '2025',
    title: 'Global WebAR experience.',
    label:
      'Sole engineer: browser AR, backend and admin tools · Dorier for Scopely · 2025',
    summary:
      'Participants joined from their own phones in the browser — no app install — across twelve event locations. I built the core in five weeks, then refined it through testing and client feedback: interaction layer, score APIs, location-scoped leaderboards and React administration.',
    delivered: [
      'A WebAR experience participants could enter without installing an app.',
      'An Azure Functions backend and Cosmos DB data model organised around event locations.',
      'React administration, sensor-permission handling and gameplay refinements informed by testing and client feedback.',
    ],
    stack: ['TypeScript', 'Mattercraft / Zappar', 'Azure Functions', 'Cosmos DB', 'React'],
    cta: 'Explore the engineering',
    href: '/cases/webar',
    cover: {
      src: '/cases/webar/webar-event-lead-phone-ar.jpg',
      alt: 'Close-up of hands holding a smartphone displaying a game character in browser AR outdoors.',
      width: 2000,
      height: 1333,
    },
    scale: '12 hubs on one day, designed for ~2,100 players.',
  },
  {
    id: '04',
    slug: 'concierge',
    year: '2026',
    title: 'Museum AI concierge.',
    label: 'Primary engineer · working prototype · Dorier · 2026',
    summary:
      'A voice, text and camera guide that answers only from sources it can stand behind, and says “I don’t have that” when it can’t. Two model agents talk and watch engagement; deterministic rules decide how to adapt. Before the demo I attacked the deployed system with 101 probes and fixed most of what broke, test-first.',
    delivered: [
      'A grounding ladder: museum catalogue, then a cited allow-listed web source, then established facts, then an honest refusal.',
      'A relevance gate that stopped keyword search binding unrelated questions to the wrong exhibit, found by live probes.',
      'An operator cockpit showing every engagement score, trigger and strategy behind the conversation, backed by 474 automated tests.',
    ],
    stack: ['React', 'TypeScript', 'Express', 'Azure AI Search', 'Azure Speech', 'Vitest'],
    cta: 'Explore the architecture',
    href: '/cases/concierge',
    cover: {
      src: '/cases/concierge/concierge-04-monitor-gate-quiet.png',
      alt: 'Operator cockpit: the Monitor scores engagement at 68 and rising while the strategy and gamification agents stay asleep.',
      width: 1036,
      height: 1716,
    },
    prototype: true,
  },
  {
    id: '05',
    slug: 'seezy',
    year: '2024–2025',
    title: 'Seezy — one process, five partners.',
    label: 'Co-architect, then sole engineer to delivery · NomadEngenuity · 2024–2025',
    summary:
      'A multi-partner eye-care plan platform: sales partners, optical stores, labs, insurers and administrators working one shared process, from the first lead to the client collecting their glasses. I co-designed the architecture, then took over the whole system and carried it, front end to back end, to delivery.',
    delivered: [
      'An orchestrator service that owns a 21-state process, with every other service reporting its state changes back.',
      'Two administrator approval gates before vouchers, insurance and lab orders are released.',
      'Multi-tenant partner access with Auth0: admins, managers, users and branches per organisation, with rollback on failed registration.',
    ],
    stack: ['TypeScript', 'Next.js', 'NestJS', 'Azure API Management', 'Azure Container Apps', 'MongoDB', 'Auth0'],
    cta: 'Explore the architecture',
    href: '/cases/seezy',
    cover: {
      src: '/architecture/seezy-orchestrator-card.png',
      alt: 'Architecture diagram: services report state changes to one orchestrator that owns a process with two administrator approval gates.',
      width: 3200,
      height: 2000,
    },
  },
];

export const about = {
  heading: 'About',
  body: [
    'I’m Hermenegildo—Gildo for short—a software engineer in Portugal who builds full-stack AI systems.',
    'Most of what I build runs live, in front of people: a conference stage, a visitor centre, twelve event venues on the same day. There is no second take, so I design for a person in the loop where judgement matters, and a safe fallback for when something fails.',
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
    'Primary engineer on Ovee, live-event AI with an operator approving each AI contribution, delivered at four events across Asia and Europe.',
    'Software engineer on the UN Geneva visitor centre’s tour system, from a nine-week takeover to the June 2026 public opening.',
    'Sole engineer on a browser AR character hunt run at 12 Scopely hubs on the same day.',
    'Primary engineer on a museum AI concierge prototype with grounded answers and a live stress-testing campaign.',
    'Built CT Project Pulse, an internal hours and budget dashboard (Entra sign-in, SharePoint via Microsoft Graph, a Teams bot), now rolling out to the 11-person Creative Technology team.',
    'Built video-delivery automation now in production for Galderma: a Python tool with GUI and CLI, Dropbox API with OAuth2 token refresh, and cross-platform builds with GitHub Actions.',
  ],
  earlier: [
    {
      title: 'Project Development Manager / Full Stack Developer',
      company: 'NomadEngenuity',
      period: '2024–2025',
      summary: 'Led a team of four as project manager: client conversations, sprint planning and hiring.',
      bullets: [
        'Seezy, a multi-partner eye-care plan platform: co-designed the architecture, then took over the whole system and carried it, front end to back end, to delivery. About ten NestJS microservices, an orchestrator owning a 21-state care-plan process and Auth0 multi-tenant partner roles.',
        'PharmaSee, a staffing platform for pharmacy, optical and audiology professionals: delivered as project manager; now live.',
        'FactorAI, an industrial AI venture for small manufacturers: co-pitched at the INNOCUP competition at UBI Medical in November 2024; then incubated, and its first prospective client, ROPRE, is now a client partner.',
      ],
    },
    {
      title: 'Software Developer',
      company: 'DC Tech',
      period: '2023',
      summary: 'Built an award-winning environmental disaster-prevention prototype (React, Node.js, flood and wildfire prediction models) that secured incubator funding.',
    },
    {
      title: 'Programming Teacher',
      company: 'Conservatório de Música da Covilhã',
      period: '2022–2023',
      summary: 'Designed a programming curriculum for 100+ students and built a browser-based code editor with live preview.',
    },
    {
      title: 'Software Developer',
      company: '2GF Innovation Technology',
      period: '2021–2022',
      summary: 'Built React and TypeScript interfaces, WebRTC video calling and an offline-first Flutter app for a cross-border family platform; Node.js middleware for SAP integration.',
    },
  ],
  education: [
    { title: 'MBA, ESG focus', school: 'University of Beira Interior', period: '2024–2025' },
    { title: 'BSc Computer Science', school: 'University of Beira Interior', period: '2018–2021' },
  ],
} as const;

export const contact = {
  heading: 'Let’s talk about what you’re building.',
  lede: 'For full-stack AI and product engineering roles, product collaborations, or a closer look at the decisions behind this work, get in touch.',
} as const;
