import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import test from 'node:test';

import { about, cases, contact, experience, hero, metrics, site } from './content.ts';

const SOURCE_ROOTS = ['app', 'components', 'lib', 'content'];
const SOURCE_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.json']);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (SOURCE_EXTS.has(extname(full)) && !full.endsWith('.test.ts')) {
      files.push(full);
    }
  }
  return files;
}

const sourceBlob = SOURCE_ROOTS.flatMap((root) => walk(root))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');

test('hero keeps the locked headline and a short WebAR proof line', () => {
  assert.equal(hero.headline, 'I build the product—and the systems that make it work.');
  assert.equal(hero.headlineLead + hero.headlineEm, hero.headline);
  assert.equal(
    hero.lede,
    'I work across interfaces, backend services and AI to turn complex requirements into working software. That includes live-event AI with an operator in the approval loop, a multi-device visitor platform and a global WebAR experience.',
  );
  assert.match(hero.lede, /approval loop/);
  assert.equal(
    hero.proof,
    'Approximately 2,100 participants across 12 locations. Core WebAR build in five weeks, then refinement.',
  );
  assert.equal(hero.proof.includes('Live-event AI'), false);
  assert.equal(hero.primaryCta.label, 'Explore selected work');
  assert.equal(hero.primaryCta.href, '#work');
  assert.equal(hero.secondaryCta.label, 'Get in touch');
  assert.equal(hero.secondaryCta.href, '#contact');
});

test('selected work order is AI, visitor, WebAR, concierge', () => {
  assert.deepEqual(
    cases.map((item) => item.slug),
    ['ai', 'visitor', 'webar', 'concierge'],
  );
  assert.deepEqual(
    cases.map((item) => item.id),
    ['01', '02', '03', '04'],
  );
  assert.deepEqual(
    cases.map((item) => item.href),
    ['/cases/ai', '/cases/visitor', '/cases/webar', '/cases/concierge'],
  );
});

test('homepage cards keep V4.1 anatomy and titles', () => {
  assert.equal(cases[0].title, 'Operator-controlled AI for live events');
  assert.equal(cases[1].title, 'Multi-device visitor platform');
  assert.equal(cases[2].title, 'Global WebAR experience');
  assert.equal(cases[3].title, 'Museum AI concierge');
  for (const study of cases) {
    assert.equal(study.delivered.length, 3);
    assert.ok(study.label);
    assert.ok(study.summary);
    assert.ok(study.stack.length >= 5);
    assert.match(study.cta, /Explore the (engineering|architecture)/);
  }
  assert.equal(cases[3].prototype, true);
  assert.match(cases[3].label, /working prototype/);
  assert.match(cases[2].label, /within wider event delivery/);
  assert.equal(cases[2].scale, 'approximately 2,100 participants across 12 locations.');
  assert.match(cases[0].delivered[1], /empty drafts/);
  assert.match(cases[0].delivered[1], /second click/);
  assert.match(cases[0].delivered[2], /notify\/replay race/);
  assert.equal(
    cases[0].delivered.includes(
      'Real-time voice and audience communication using WebRTC and WebSockets.',
    ),
    false,
  );
});

test('visitor homepage stack omits TimescaleDB', () => {
  assert.deepEqual(cases[1].stack, [
    'React Native',
    'TypeScript',
    'Go',
    'Payload CMS',
    'MQTT',
    'PostgreSQL',
  ]);
  assert.equal(cases[1].stack.includes('TimescaleDB'), false);
});

test('metrics strip is V4.1-honest, not WebAR-only #18 copy', () => {
  assert.equal(metrics.kicker, hero.proofLabel);
  assert.equal(metrics.kicker, 'Delivery proof');
  assert.deepEqual(
    metrics.items.map((item) => [item.value, item.label]),
    [
      ['~2,100', 'WebAR participants'],
      ['12', 'Locations'],
      ['5', 'Weeks (core build)'],
    ],
  );
  assert.equal(metrics.footnote, hero.proof);
  assert.match(metrics.footnote, /2,100 participants/);
  assert.match(metrics.footnote, /WebAR/);
  assert.equal(metrics.footnote.includes('Live-event AI'), false);
  assert.equal(metrics.footnote.includes('Separately'), false);
  assert.equal(metrics.kicker.includes('Most recent'), false);
  assert.equal(metrics.footnote.includes('Same-day'), false);
  assert.equal(metrics.footnote.includes('briefed to live'), false);
});

test('about, experience and contact match V4.1', () => {
  assert.equal(about.body[0], 'I’m Hermenegildo—Gildo for short—a full-stack engineer based in Portugal.');
  assert.equal(experience.title, 'Full Stack Engineer');
  assert.equal(experience.company, 'Dorier');
  assert.equal(experience.period, '2025–present');
  assert.match(experience.items[2], /within the wider event delivery/);
  assert.equal(contact.heading, 'Let’s talk about what you’re building.');
  assert.equal(site.email, 'hermeny7@hotmail.com');
  assert.equal(site.github, 'https://github.com/HermenySantos');
  assert.equal(site.linkedin, 'https://www.linkedin.com/in/hermenegildosantos');
  assert.equal(site.title, 'Hermenegildo Santos | Full-Stack Engineer · AI & Real-Time Systems');
  assert.equal(
    site.description,
    'Full-stack engineer in Portugal building AI products, real-time systems and interactive platforms. Explore delivered work and the engineering decisions behind it.',
  );
});

test('full cases load locked markdown with conceptual caveats', () => {
  const slugs = ['ai', 'visitor', 'webar', 'concierge'] as const;
  const files = Object.fromEntries(
    slugs.map((slug) => [slug, readFileSync(join('content/cases', `${slug}.md`), 'utf8')]),
  );

  assert.match(files.ai, /Ovee — AI for live event moderation and workshop synthesis/);
  assert.match(files.ai, /four live events/);
  assert.match(files.ai, /600 participants across 60 roundtables/);
  assert.match(files.ai, /approximately five seconds/);
  assert.match(files.ai, /primary implementation responsibility/);
  assert.equal(files.ai.includes('An AI response is not ready just because the model finished'), false);
  assert.equal(files.ai.includes('A live-event AI system has several participants'), false);
  assert.match(files.visitor, /One tour, several devices, shared state/);
  assert.match(files.webar, /Approximately 2,100 participants/);
  assert.match(files.webar, /within the wider event delivery/);
  assert.match(files.webar, /Participants joined a WebAR experience from their own phones/);
  assert.equal(files.webar.includes('A global event needs a common experience'), false);
  assert.match(files.concierge, /Working prototype/);
  assert.match(files.concierge, /A public museum rollout remains a separate milestone/);
  assert.equal(files.visitor.includes('TimescaleDB'), true);

  const caseModule = readFileSync('lib/cases.ts', 'utf8');
  assert.match(caseModule, /Conceptual diagram/);
  assert.match(caseModule, /does not promise universal device support/);
  assert.match(caseModule, /development-branch flight recorder/);
  for (const slug of slugs) {
    assert.equal(statSync(join('public/architecture', `${slug}-architecture.png`)).isFile(), true);
  }
});

test('source tree does not reintroduce forbidden media, clients, or #18 copy', () => {
  const forbidden = [
    'DemoComputer',
    'react-globe',
    '@react-three/fiber',
    'totem-proximity-flash',
    'scopely-character-hunt',
    'pmi-ai-moderator',
    '/terms',
    '/privacy',
    'CTDorier',
    'Scopely',
    'Olympic',
    'gaia-nervous',
    'incident-free',
    'no reported incidents',
    'universal devices',
    'UN Geneva',
    'Walkthrough on request',
    'Most recent delivery',
    'I ship production AI',
    'SystemIllustration',
  ];

  for (const token of forbidden) {
    assert.equal(sourceBlob.includes(token), false, `forbidden token still present: ${token}`);
  }

  const homepage = readFileSync('lib/content.ts', 'utf8');
  assert.equal(homepage.includes('TimescaleDB'), false, 'TimescaleDB must not appear in homepage content');
  assert.equal(homepage.includes('PMI'), false);

  const ink = readFileSync('tailwind.config.ts', 'utf8');
  assert.match(ink, /ink: '#0a0a0a'/);
  assert.equal(readFileSync('app/globals.css', 'utf8').includes('background: #0a0a0a'), true);
  assert.equal(readFileSync('components/hero.tsx', 'utf8').includes('metrics.items'), true);
  assert.equal(readFileSync('components/case-card.tsx', 'utf8').includes('rounded-[28px]'), true);
  assert.equal(cases[0].title.includes('UN'), false);
});

test('homepage cards scan scope, then bullets, then stack, then link', () => {
  const card = readFileSync('components/case-card.tsx', 'utf8');
  const summaryAt = card.indexOf('study.summary');
  const deliveredAt = card.indexOf('study.delivered');
  const stackAt = card.indexOf('study.stack');
  const ctaAt = card.indexOf('study.cta');
  assert.ok(summaryAt > 0 && deliveredAt > summaryAt);
  assert.ok(stackAt > deliveredAt);
  assert.ok(ctaAt > stackAt);
});

test('r5 selected visuals are public and blocked assets stay out', () => {
  const shipped = [
    'public/cases/ai/02b-stage-ambient-readable.png',
    'public/cases/ai/02c-stage-speaking-intentional.png',
    'public/cases/ai/04b-stage-poll-takeover-readable.png',
    'public/cases/ai/04c-stage-poll-with-speaking.png',
    'public/cases/ai/05-p0-stage-return-ambient-after-takeover.png',
    'public/cases/ai/06a-operator-context-transcript-present.png',
    'public/cases/ai/06b-operator-pending-draft-awaiting-approval.png',
    'public/cases/ai/06c-operator-after-approve-ovee-output.png',
    'public/cases/ai/06c-audience-wall-during-approved-output.png',
    'public/cases/ai/01-p0-home-ovee-reference-entry.png',
    'public/architecture/ovee-runtime-flow.png',
    'public/architecture/ovee-wall-decision-paths.png',
    'public/architecture/ai-control-desktop.png',
    'public/architecture/ai-playback-desktop.png',
    'public/architecture/webar-data-desktop.png',
    'public/architecture/visitor-system-overview-02.png',
    'public/architecture/visitor-docent-controller-01.png',
    'public/architecture/concierge-turn-desktop.png',
    'public/cases/concierge/concierge-04-monitor-gate-quiet.png',
    'public/cases/concierge/concierge-05-strategy-carryover.png',
    'public/cases/concierge/concierge-spark-livetest.png',
  ];
  for (const file of shipped) {
    assert.equal(statSync(file).isFile(), true, file);
  }

  const publicNames: string[] = [];
  function walkPublic(dir: string) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walkPublic(full);
      else publicNames.push(entry);
    }
  }
  walkPublic('public');
  const blocked = [
    'webar-event-17',
    'docent-running',
    'kiosk-priority',
    'visitor-language-selection',
    'visitor-tour-takeover',
    'ai-workshop-operator',
  ];
  for (const name of publicNames) {
    for (const token of blocked) {
      assert.equal(name.includes(token), false, `${name} is not cleared for the public path`);
    }
  }

  const caseModule = readFileSync('lib/cases.ts', 'utf8');
  assert.match(caseModule, /02b-stage-ambient-readable\.png/);
  assert.match(caseModule, /Synthetic 120 votes — not event scale/);
  assert.match(caseModule, /webar-data-desktop\.png/);
  assert.match(caseModule, /colleague-owned/);
  assert.match(caseModule, /Pending brand clearance/);
  assert.match(caseModule, /concierge-turn-desktop\.png/);
  assert.equal(caseModule.includes('webar-event'), false);
  assert.equal(caseModule.toLowerCase().includes('narrated'), false);
  assert.equal(caseModule.includes('docent-running'), false);
  assert.equal(caseModule.includes('kiosk-priority'), false);
});

test('case pages put architecture after product, ownership and delivery', () => {
  const page = readFileSync('app/cases/[slug]/page.tsx', 'utf8');
  const titleAt = page.indexOf('full.title');
  const roleAt = page.indexOf('full.roleLine');
  const markdownAt = page.indexOf('<CaseMarkdown');
  const architectureAt = page.indexOf('full.architecture.src');
  assert.ok(titleAt > 0 && roleAt > titleAt);
  assert.ok(markdownAt > roleAt);
  assert.ok(architectureAt > markdownAt);
  assert.match(page, /w-\[1800px\]/);
  assert.equal(page.includes('aspect-video'), false);
  assert.match(page, /priority/);
});
