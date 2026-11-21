import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pageHref } from './links.ts';
import { localizeSample } from './samples.ts';

test('the default language has no prefix, the others have theirs', () => {
  assert.equal(pageHref('getStarted'), '/connect/get-started/');
  assert.equal(pageHref('getStarted', 'root'), '/connect/get-started/');
  assert.equal(pageHref('getStarted', 'en'), '/en/connect/get-started/');
});

test('a link can go to a step of a page', () => {
  assert.equal(pageHref('getStarted', 'en', 'test-key'), '/en/connect/get-started/#test-key');
});

test('the English samples have no Greek example data, the Greek ones are unchanged', () => {
  const greek = `"firstName":"Μαρία","email":"pelatis@example.gr"`;
  assert.equal(localizeSample(greek), greek);
  assert.equal(localizeSample(greek, 'en'), `"firstName":"Maria","email":"customer@example.gr"`);
});
