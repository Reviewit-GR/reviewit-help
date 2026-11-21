/**
 * src/lib/snippets.ts is a copy of reviewit-web's src/lib/snippets.ts (the business page shows the same code samples).
 * This fails when the two differ. Needs the sibling checkout ../reviewit-web (the repo is private): in CI it is skipped
 * unless SNIPPETS_SOURCE points at a copy.
 *
 *   node scripts/check-snippets.mjs           compare
 *   node scripts/check-snippets.mjs --write   copy reviewit-web's file here
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('../src/lib/snippets.ts', import.meta.url));
const source = process.env.SNIPPETS_SOURCE ?? fileURLToPath(new URL('../../reviewit-web/src/lib/snippets.ts', import.meta.url));
if (!existsSync(source)) {
  console.log(`skipped: ${source} not found`);
  process.exit(0);
}
if (process.argv.includes('--write')) {
  writeFileSync(here, readFileSync(source));
  console.log('copied');
} else if (readFileSync(here, 'utf8') !== readFileSync(source, 'utf8')) {
  console.error('src/lib/snippets.ts differs from reviewit-web: run node scripts/check-snippets.mjs --write');
  process.exit(1);
} else console.log('snippets.ts matches reviewit-web');
