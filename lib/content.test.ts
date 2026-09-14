import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import test from 'node:test';

import { alsoShipped, cases, hero, metrics, site } from './content.ts';

const SOURCE_ROOTS = ['app', 'components', 'lib'];
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

test('locked hero copy is verbatim', () => {
  assert.equal(hero.eyebrow, 'Full-Stack AI Engineer · Portugal');
  assert.equal(hero.headline, 'I ship production AI and live-event systems end to end.');
  assert.equal(hero.stack, 'TypeScript · React · Node · Azure OpenAI');
});

test('WebAR metric strip uses locked figures', () => {
  assert.equal(metrics.items[0]?.value, '~2,100');
  assert.equal(metrics.items[1]?.value, '12');
  assert.equal(metrics.items[2]?.value, '5');
  assert.match(metrics.footnote, /WebAR/);
});

test('case order and locked fields', () => {
  assert.equal(cases.length, 3);
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

  assert.equal(cases[1]?.kicker, 'Major gaming brand');
  assert.equal(cases[1]?.title, 'Same-day global WebAR event');
  assert.equal(cases[1]?.role, 'End-to-end ownership — live experience + backend');
  assert.deepEqual(cases[1]?.chips, ['Zappar', 'Azure Functions', 'Cosmos DB', 'React']);
  assert.equal(cases[1]?.cta, 'Walkthrough on request · no Scopely-named repo');

  assert.equal(cases[2]?.kicker, 'Live-event AI Moderator');
  assert.equal(cases[2]?.role, 'Owned production HITL AI system');
  assert.deepEqual(cases[2]?.chips, ['Azure OpenAI', 'FastAPI', 'React', 'WebRTC']);
  assert.equal(cases[2]?.cta, 'Walkthrough on request · no fake live URL');
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

test('source tree does not reintroduce forbidden shop-window content', () => {
  const files = SOURCE_ROOTS.flatMap((root) => walk(root));
  const blob = files.map((file) => readFileSync(file, 'utf8')).join('\n');

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
  ];

  for (const token of forbidden) {
    assert.equal(blob.includes(token), false, `forbidden token still present: ${token}`);
  }
});
