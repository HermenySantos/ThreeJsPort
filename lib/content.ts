export const site = {
  name: 'Gildo Santos',
  fullName: 'Hermenegildo Santos',
  title: 'Hermenegildo Santos — Full-Stack AI Engineer',
  description:
    'Full-stack AI engineer in Portugal. Visitor platforms, global WebAR experiences, and operator-controlled AI. Selected shipped work by Hermenegildo Santos.',
  url: 'https://www.hermenegildosantos.com',
  email: 'hermeny7@hotmail.com',
  github: 'https://github.com/HermenySantos',
  linkedin: 'https://www.linkedin.com/in/hermenegildosantos',
  ogImage: '/opengraph-image',
} as const;
export const nav = [
  { label: 'Selected work', href: '#work' },
  { label: 'Approach', href: '#about' },
  { label: 'Get in touch', href: '#contact' },
] as const;
export const hero = {
  eyebrow: 'Hermenegildo Santos / Full-Stack AI Engineer',
  headline: 'Built for the moment it has to work.',
  lede: 'I build production AI and live experiences—from the interfaces people touch to the systems behind them. Architecture, delivery, and the day it goes live.',
  stack: 'Based in Portugal · Working across the stack',
  primaryCta: { label: 'Explore the work', href: '#work' },
  secondaryCta: { label: 'Start a conversation', href: '#contact' },
} as const;
export const metrics = {
  kicker: 'One delivery, in numbers',
  items: [
    { value: '~2,100', label: 'participants' },
    { value: '12', label: 'locations' },
    { value: '5', label: 'weeks to live' },
  ],
  footnote: 'Same-day global WebAR event',
} as const;
export const work = {
  heading: 'The work behind the words.',
  intro: 'One platform. Two live experiences. Responsibility beyond the interface.',
} as const;
export type CaseStudy = {
  id: string;
  year: string;
  kicker: string;
  title: string;
  role: string;
  chips: readonly string[];
  summary: string;
  outcome: string;
  cta: string;
  challenge: string;
  decision: string;
};
export const cases: readonly CaseStudy[] = [
  {
    id: '01',
    year: '2025–2026',
    kicker: 'Visitor experience · Delivered with Dorier',
    title: 'Many devices. One visitor experience.',
    role: 'Core engineer across apps, content, and tour services',
    chips: ['React Native', 'TypeScript', 'Payload CMS', 'Go'],
    summary:
      'Audio guides, docent tablets, and interactive kiosks need to work as one experience. Over approximately ten months, I contributed across the visitor platform—from its apps and content tools to tour services and operational handover.',
    outcome:
      'Delivered multilingual experiences, more resilient tour flows, and operational tools that helped the team support the live platform.',
    challenge: 'Keep the visitor experience coherent across different devices, languages, and guided-tour flows.',
    decision:
      'Work across the boundaries between apps, content, and services. Pair feature delivery with diagnostics and documentation so the team can understand and support the system.',
    cta: 'Discuss this project',
  },
  {
    id: '02',
    year: '2025',
    kicker: 'Global WebAR activation',
    title: 'Twelve locations. One live day.',
    role: 'End-to-end ownership of the experience and backend',
    chips: ['Zappar', 'Azure Functions', 'Cosmos DB', 'React'],
    summary:
      'A browser-based AR experience, a backend serving multiple locations, and an admin interface. I owned delivery from the brief to the live event in five weeks.',
    outcome: 'Approximately 2,100 participants across 12 locations, with no reported incidents on event day.',
    challenge: 'Deliver a coordinated experience across multiple locations against a fixed event date.',
    decision:
      'Connect the WebAR experience, location-based data, and React administration in a single delivery scope, carrying responsibility through the live day.',
    cta: 'Discuss this project',
  },
  {
    id: '03',
    year: '2025–2026',
    kicker: 'AI for live events',
    title: 'Live AI. Human judgment.',
    role: 'Owned the production AI system and operator tooling',
    chips: ['Azure OpenAI', 'FastAPI', 'React', 'WebRTC'],
    summary:
      'Real-time AI responses and voice for a live audience, with an operator in control. I built the system connecting the AI, the operator interface, and the audience experience.',
    outcome: 'Delivered a production system supporting moderated conversations, panels, workshops, and audience Q&A.',
    challenge: 'Make generative AI usable in a live setting where people need control over the conversation.',
    decision:
      'Put the operator at the centre of the experience, with tools for different event formats and real-time communication between the control interface and the stage.',
    cta: 'Discuss this project',
  },
];
export const alsoShipped = {
  heading: 'Elsewhere in my work',
  items: [
    { name: 'Seezy', blurb: 'eye-care platform', href: 'https://www.seezy.care' },
    { name: 'InvoFlow', blurb: 'invoice SaaS', href: 'https://github.com/HermenySantos/invoflow' },
    { name: 'NexTool', blurb: 'edge developer API', href: 'https://github.com/HermenySantos/nextool-api' },
  ],
} as const;
export const about = {
  heading: 'Own the work.\nSee it through.',
  body: [
    'I’m Hermenegildo—Gildo for short. A full-stack AI engineer based in Portugal, working where software meets real people, real places, and a date that cannot move.',
    'My work spans interfaces, backend services, AI, and delivery. I care about the connections between them: how a system behaves, how a team operates it, and what happens after launch.',
  ],
  location: 'Portugal / TypeScript · React · Node · Python · Go',
} as const;
export const contact = {
  heading: 'What needs\nto work next?',
  lede: 'For engineering roles, product work, or a closer look at a project—let’s talk.',
} as const;
