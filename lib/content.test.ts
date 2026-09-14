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

test('hero directs visitors to work and contact', () => {
  assert.equal(hero.primaryCta.href, '#work');
  assert.equal(hero.secondaryCta.href, '#contact');
});

test('WebAR metric strip uses locked figures', () => {
  assert.equal(metrics.items[0]?.value, '~2,100');
  assert.equal(metrics.items[1]?.value, '12');
  assert.equal(metrics.items[2]?.value, '5');
  assert.match(metrics.footnote, /WebAR/);
});

test('three case studies retain distinct anchors and evidence', () => {
  assert.equal(cases.length, 3);
  assert.deepEqual(
    cases.map((item) => item.id),
    ['01', '02', '03'],
  );
  for (const study of cases) {
    assert.ok(study.role && study.challenge && study.decision && study.outcome);
  }
  assert.match(cases[0].role, /Core engineer/);
  assert.match(cases[1].outcome, /2,100.*12 locations/);
});

test('public case copy omits client identities and internal handover details', () => {
  const copy = JSON.stringify(cases);
  for (const token of ['Scopely', 'UN Geneva', 'ghost-tour', 'E3 kiosk', 'monorepo', 'fake live URL']) {
    assert.equal(copy.includes(token), false, `Internal or client detail in public copy: ${token}`);
  }
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
