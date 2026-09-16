import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import test from 'node:test';

import { alsoShipped, cases, hero, metrics, site } from './content.ts';
import { caseSlugs } from './cases.ts';

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

test('hero matches the locked black shop-window screenshot', () => {
  assert.equal(site.name, 'Hermenegildo');
  assert.equal(hero.eyebrow, 'Full-Stack AI Engineer · Portugal');
  assert.equal(hero.headline, 'I ship production AI and live-event systems end to end.');
  assert.equal(
    hero.lede,
    'From the first architecture sketch to the person on the headset at 3am on event day. Realtime pipelines, human-in-the-loop AI, and the unglamorous infrastructure that has to hold under load.',
  );
  assert.equal(hero.stack, 'TypeScript · React · Node · Azure OpenAI');
  assert.equal(hero.primaryCta.label, 'View selected work');
  assert.equal(hero.primaryCta.href, '#work');
  assert.equal(hero.secondaryCta.label, 'LinkedIn');
  assert.equal(hero.secondaryCta.href, site.linkedin);
});

test('WebAR metric strip uses locked figures', () => {
  assert.equal(metrics.kicker, 'Most recent delivery');
  assert.equal(metrics.items[0]?.value, '~2,100');
  assert.equal(metrics.items[1]?.value, '12');
  assert.equal(metrics.items[2]?.value, '5');
  assert.equal(metrics.items[2]?.label, 'Weeks, briefed to live');
  assert.match(metrics.footnote, /WebAR/);
});

test('case 01 matches the UN shop-window card', () => {
  assert.deepEqual(
    cases.map((item) => item.id),
    ['01', '02', '03'],
  );
  assert.equal(cases[0]?.kicker, 'UN Geneva Visitor Center · Dorier');
  assert.equal(cases[0]?.title, 'Immersive visitor platform — Audio Guide, Docent & tour systems');
  assert.equal(cases[0]?.role, 'Core engineer across clients, CMS, and Go tour services');
  assert.equal(cases[0]?.year, '2025–2026');
  assert.deepEqual(cases[0]?.chips, ['TypeScript', 'React Native', 'Payload CMS', 'Go', 'MQTT']);
  assert.match(cases[0]?.summary ?? '', /not a one-off feature/);
  assert.match(cases[0]?.outcome ?? '', /not the engagement/);
  assert.equal(cases[0]?.cta, 'Walkthrough on request · no public monorepo link');
});

test('also shipped row is locked', () => {
  assert.deepEqual(
    alsoShipped.items.map((item) => `${item.name} (${item.blurb})`),
    ['Seezy (eye-care platform)', 'InvoFlow (invoice SaaS)', 'NexTool (edge developer API)'],
  );
});

test('site links stay on the known profiles', () => {
  assert.equal(site.github, 'https://github.com/HermenySantos');
  assert.equal(site.linkedin, 'https://www.linkedin.com/in/hermenegildosantos');
  assert.equal(site.email, 'hermeny7@hotmail.com');
  assert.equal(site.url, 'https://www.hermenegildosantos.com');
});

test('full cases still load locked markdown with conceptual caveats', () => {
  const files = Object.fromEntries(
    caseSlugs.map((slug) => [slug, readFileSync(join('content/cases', `${slug}.md`), 'utf8')]),
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
  for (const slug of caseSlugs) {
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
  assert.match(readFileSync('components/case-card.tsx', 'utf8'), /Outcome/);
});
