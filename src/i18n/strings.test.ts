import { test } from 'node:test';
import assert from 'node:assert/strict';
import { el } from './el.ts';
import { en } from './en.ts';

// The type of en.ts already fails the type check when a string is missing; this also catches one left in Greek.
const GREEK = /[Ͱ-Ͽ]/;
const leaves = (value: unknown, path = ''): [string, string][] =>
  typeof value === 'string'
    ? [[path, value]]
    : typeof value === 'object' && value !== null
      ? Object.entries(value).flatMap(([k, v]) => leaves(v, path ? `${path}.${k}` : k))
      : [];

test('every English string is written, and none is still Greek', () => {
  const english = leaves(en);
  assert.deepEqual(english.map(([k]) => k).sort(), leaves(el).map(([k]) => k).sort(), 'the same strings in both languages');
  // Greek names of the site\'s own pages and buttons are given in brackets on purpose (the site is in Greek).
  const stillGreek = english.filter(([, v]) => GREEK.test(v.replace(/\([^)]*\)/g, '')));
  assert.deepEqual(stillGreek, []);
});
