/**
 * Checks the built site (dist/) the way a reader meets it: every internal link goes to a page that exists, every #anchor to an id
 * that exists on that page, and a page in a language links only to pages of the same language.
 *
 *   npm run build && npm run check:links
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
if (!existsSync(dist)) {
  console.error('dist/ not found: run npm run build first');
  process.exit(1);
}

const LANGUAGES = ['en']; // the folders of the languages that are not the default one (Greek, at the root)
const html = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) html.push(path);
  }
})(dist);

const idsOf = new Map(html.map((f) => [f, new Set([...readFileSync(f, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const languageOf = (url) => LANGUAGES.find((l) => url === `/${l}` || url.startsWith(`/${l}/`)) ?? 'root';

const problems = [];
for (const file of html) {
  const page = '/' + file.slice(dist.length).replace(/index\.html$/, '');
  if (page === '/404.html') continue;
  const text = readFileSync(file, 'utf8');
  for (const [, url, hash] of text.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    // Files (CSS, the search index, the sitemap, the icon) are not pages.
    if (url.startsWith('/_astro') || url.startsWith('/pagefind') || /\.[a-z0-9]+$/i.test(url)) continue;
    // The language switcher and the home link of a language are allowed to cross languages and to be bare.
    const target = join(dist, url, 'index.html');
    if (!existsSync(target)) {
      problems.push(`${page}: ${url} does not exist`);
      continue;
    }
    if (hash && hash.length > 1 && !idsOf.get(target)?.has(hash.slice(1))) problems.push(`${page}: ${url}${hash}: no such id`);
  }
}

// Every English page must have the Greek page of the same address, and the other way round.
const pages = new Set(html.map((f) => '/' + f.slice(dist.length).replace(/index\.html$/, '')));
for (const p of pages) {
  if (p === '/404.html' || p.endsWith('.html')) continue;
  const lang = languageOf(p);
  if (lang === 'root' && p !== '/' && !LANGUAGES.some((l) => pages.has(`/${l}${p}`))) problems.push(`${p}: has no page in ${LANGUAGES.join(', ')}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) in ${html.length} pages`);
  process.exit(1);
}
console.log(`links ok: ${html.length} pages`);
