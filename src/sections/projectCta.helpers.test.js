import test from 'node:test';
import assert from 'node:assert/strict';

import { myProjects } from '../constants/index.js';
import { getProjectCtaLabel } from './projectCta.helpers.js';

test('returns null for missing, empty, hash, and invalid hrefs', () => {
  assert.equal(getProjectCtaLabel(undefined), null);
  assert.equal(getProjectCtaLabel(null), null);
  assert.equal(getProjectCtaLabel(''), null);
  assert.equal(getProjectCtaLabel('#'), null);
  assert.equal(getProjectCtaLabel('   '), null);
  assert.equal(getProjectCtaLabel('not-a-url'), null);
});

test('returns View repo for GitHub repository URLs', () => {
  assert.equal(getProjectCtaLabel('https://github.com/HermenySantos/totem-proximity-flash'), 'View repo');
  assert.equal(getProjectCtaLabel('https://github.com/HermenySantos/invoflow'), 'View repo');
  assert.equal(getProjectCtaLabel('https://www.github.com/HermenySantos/nextool-api'), 'View repo');
});

test('hides GitHub profile and homepage links', () => {
  assert.equal(getProjectCtaLabel('https://github.com/HermenySantos'), null);
  assert.equal(getProjectCtaLabel('https://github.com/HermenySantos/'), null);
  assert.equal(getProjectCtaLabel('https://github.com'), null);
});

test('returns Visit site for real product URLs', () => {
  assert.equal(getProjectCtaLabel('https://www.seezy.care'), 'Visit site');
  assert.equal(getProjectCtaLabel('https://www.nomadengenuity.eu'), 'Visit site');
});

test('myProjects hrefs never look like a live site for GitHub or missing demos', () => {
  assert.deepEqual(
    myProjects.map((project) => project.title),
    [
      'Major gaming brand — global WebAR event',
      'Live-event AI Moderator',
      'UN Geneva Visitor Center',
      'Seezy - Comprehensive Eye Health Care Platform',
      'InvoFlow — Invoice Management SaaS',
      'NexTool API — Developer Utilities at the Edge',
    ],
  );

  const labels = Object.fromEntries(myProjects.map((project) => [project.title, getProjectCtaLabel(project.href)]));

  assert.equal(labels['Major gaming brand — global WebAR event'], null);
  assert.equal(labels['Live-event AI Moderator'], null);
  assert.equal(labels['UN Geneva Visitor Center'], 'View repo');
  assert.equal(labels['Seezy - Comprehensive Eye Health Care Platform'], 'Visit site');
  assert.equal(labels['InvoFlow — Invoice Management SaaS'], 'View repo');
  assert.equal(labels['NexTool API — Developer Utilities at the Edge'], 'View repo');

  for (const project of myProjects) {
    const label = getProjectCtaLabel(project.href);
    assert.notEqual(label, 'Check Live Site');
    if (project.href && String(project.href).includes('github.com')) {
      assert.notEqual(label, 'Visit site');
    }
  }
});
