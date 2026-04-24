import test from 'node:test';
import assert from 'node:assert/strict';

import { getNextIndex, getPreviousIndex } from './projectSlideshow.helpers.js';

test('getNextIndex advances by one within range', () => {
  assert.equal(getNextIndex(0, 3), 1);
  assert.equal(getNextIndex(1, 3), 2);
});

test('getNextIndex wraps to zero at the end', () => {
  assert.equal(getNextIndex(2, 3), 0);
});

test('getPreviousIndex steps back by one within range', () => {
  assert.equal(getPreviousIndex(2, 3), 1);
  assert.equal(getPreviousIndex(1, 3), 0);
});

test('getPreviousIndex wraps to last index at the start', () => {
  assert.equal(getPreviousIndex(0, 3), 2);
});

test('both helpers return 0 when total is zero', () => {
  assert.equal(getNextIndex(0, 0), 0);
  assert.equal(getPreviousIndex(0, 0), 0);
});
