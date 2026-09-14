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

test('WebAR metric figures stay inline and attributed to WebAR, not UN', () => {
  assert.equal(metrics.items[0]?.value, '~2,100');
  assert.equal(metrics.items[0]?.label, 'participants');
  assert.equal(metrics.items[1]?.value, '12');
  assert.equal(metrics.items[1]?.label, 'locations');
  assert.equal(metrics.items[2]?.value, '5');
  assert.equal(metrics.items[2]?.label, 'weeks');
  assert.equal(metrics.attribution, 'Same-day global WebAR event');
  assert.equal(metrics.attribution.includes('UN'), false);
});

test('case order, layouts, and locked fields', () => {
  assert.equal(cases.length, 3);
  assert.deepEqual(
    cases.map((item) => item.id),
    ['01', '02', '03'],
  );
  assert.deepEqual(
    cases.map((item) => item.layout),
    ['spread', 'twin', 'twin'],
  );
  assert.equal(
    cases.every((item) => !item.image),
    true,
    'media slots stay empty for Claude stills',
  );

  assert.equal(cases[0]?.kicker, 'UN Geneva Visitor Center · Dorier');
  assert.equal(cases[0]?.title, 'Immersive visitor platform — Audio Guide, Docent & tour systems');
  assert.equal(cases[0]?.role, 'Core engineer across clients, CMS, and Go tour services · 2025–2026');
  assert.deepEqual(cases[0]?.chips, ['TypeScript', 'React Native', 'Payload CMS', 'Go', 'MQTT']);
  assert.equal(
    cases[0]?.summary,
    'The Visitor Center runs as a multi-device production system: Audio Guides, docent tablets, and interactive kiosks stay in sync with a content CMS and Go tour/state services over live messaging. Over ~10 months I worked across that stack end-to-end — React Native clients, CMS scheduling and content, TMS APIs and state hardening, observe/ops tooling, and the verified technical documentation used for handover — not a one-off feature.',
  );
  assert.equal(
    cases[0]?.outcome,
    'Shipped and hardened work across the live platform: multi-language and RTL support, tour integrity (single-controller and ghost-tour paths), cross-app flight recorder/observe, E3 kiosk content, and school/group tour flows. The proximity “Gathering” flash was one Audio Guide moment inside that system, not the engagement.',
  );
  assert.equal(cases[0]?.cta, 'Walkthrough on request · no public monorepo link');

  assert.equal(cases[1]?.title, 'Major gaming brand — Same-day global WebAR event');
  assert.equal(cases[1]?.role, 'End-to-end ownership · 2025');
  assert.deepEqual(cases[1]?.chips, ['Zappar', 'Azure Functions', 'Cosmos DB', 'React']);
  assert.equal(
    cases[1]?.summary,
    'Owned the same-day global WebAR activation end to end: WebAR (Zappar), Azure Functions, Cosmos DB partitioned by location, and React admin — delivered in five weeks for a multi-hub live day.',
  );
  assert.equal(
    cases[1]?.outcome,
    '~2,100 participants across 12 locations, sustained without incident on event day.',
  );

  assert.equal(cases[2]?.title, 'Live-event AI Moderator');
  assert.equal(cases[2]?.role, 'Owned production HITL AI · 2025–2026');
  assert.deepEqual(cases[2]?.chips, ['Azure OpenAI', 'FastAPI', 'React', 'WebRTC']);
  assert.equal(
    cases[2]?.summary,
    'Owned a production human-in-the-loop live-event AI system: Azure OpenAI generates and voices responses in real time; operators stay in control via conversation, panel, workshop, and audience Q&A modes — with WebRTC/WebSockets and a Three.js stage visualiser on the audience-facing surface.',
  );
  assert.equal(cases[2]?.outcome, 'Production AI in a live-event setting with operator tooling, not a demo chatbot.');
});

test('also shipped row is locked', () => {
  assert.deepEqual(
    alsoShipped.items.map((item) => `${item.name} (${item.blurb})`),
    ['Seezy (eye-care)', 'InvoFlow (invoice SaaS)', 'NexTool (edge developer API)'],
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
    'LinkedIn Featured',
    'available Q1',
  ];

  for (const token of forbidden) {
    assert.equal(blob.includes(token), false, `forbidden token still present: ${token}`);
  }
});
