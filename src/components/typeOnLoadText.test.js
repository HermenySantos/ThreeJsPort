import test from 'node:test';
import assert from 'node:assert/strict';

import { getTypedLength } from './typeOnLoadText.helpers.js';

test('getTypedLength starts with no visible characters', () => {
  assert.equal(getTypedLength({ textLength: 10, elapsedMs: 0, stepMs: 40 }), 0);
});

test('getTypedLength reveals one character per step', () => {
  assert.equal(getTypedLength({ textLength: 10, elapsedMs: 39, stepMs: 40 }), 0);
  assert.equal(getTypedLength({ textLength: 10, elapsedMs: 40, stepMs: 40 }), 1);
  assert.equal(getTypedLength({ textLength: 10, elapsedMs: 120, stepMs: 40 }), 3);
});

test('getTypedLength caps at the full text length', () => {
  assert.equal(getTypedLength({ textLength: 10, elapsedMs: 9999, stepMs: 40 }), 10);
});
