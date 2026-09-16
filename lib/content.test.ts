import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import test from 'node:test';

import { about, cases, contact, experience, hero, site } from './content.ts';

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

test('hero uses locked V4.1 copy', () => {
  assert.equal(hero.headline, 'I build the product—and the systems that make it work.');
  assert.equal(hero.headlineLead + hero.headlineEm, hero.headline);
  assert.equal(
    hero.lede,
    'I work across interfaces, backend services and AI to turn complex requirements into working software. My experience spans operator-controlled AI for live events, a multi-device visitor platform and a global WebAR experience.',
  );
  assert.equal(
    hero.proof,
    'Live-event AI with an operator in the approval loop. Separately: a WebAR experience used by approximately 2,100 participants across 12 locations (core build in five weeks, then refinement).',
  );
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

  assert.match(files.ai, /An AI response is not ready just because the model finished/);
  assert.match(files.visitor, /One tour, several devices, shared state/);
  assert.match(files.webar, /Approximately 2,100 participants/);
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

test('source tree does not reintroduce forbidden media, clients, or claims', () => {
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
  ];

  for (const token of forbidden) {
    assert.equal(sourceBlob.includes(token), false, `forbidden token still present: ${token}`);
  }

  const homepage = readFileSync('lib/content.ts', 'utf8');
  assert.equal(homepage.includes('TimescaleDB'), false, 'TimescaleDB must not appear in homepage content');
  assert.equal(homepage.includes('PMI'), false);
});
