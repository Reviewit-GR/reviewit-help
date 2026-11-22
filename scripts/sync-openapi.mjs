/**
 * Writes src/data/invitations.openapi.yaml: the part of the public API spec (reviewit-api, openapi/openapi.yaml) that a
 * shop's developer uses, POST /v1/invitations with the company's API key. The rest of that spec is the site's own
 * session-based API and is not documented here.
 *
 *   node scripts/sync-openapi.mjs [path/to/openapi.yaml]     write the file
 *   node scripts/sync-openapi.mjs --check [path/to/...]      fail if the written file is out of date (for CI)
 *
 * The API repo is private: the path defaults to the sibling checkout ../reviewit-api.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';

const args = process.argv.slice(2);
const check = args.includes('--check');
const source = args.find((a) => !a.startsWith('--')) ?? fileURLToPath(new URL('../../reviewit-api/openapi/openapi.yaml', import.meta.url));
const target = fileURLToPath(new URL('../src/data/invitations.openapi.yaml', import.meta.url));
const PATHS = ['/v1/invitations'];

if (check && !existsSync(source)) {
  console.log(`skipped: ${source} not found (the API repo is private; set the path to check)`);
  process.exit(0);
}
const spec = parse(readFileSync(source, 'utf8'));
const out = {
  openapi: spec.openapi,
  info: {
    title: 'Reviewit Invitations API',
    version: spec.info.version,
    description: 'Πρόσκληση πελατών για κριτική από το κατάστημά σας. Δείτε τους οδηγούς για το κλειδί, το κλειδί δοκιμής και τα παραδείγματα κώδικα.',
  },
  servers: spec.servers,
  paths: Object.fromEntries(PATHS.map((p) => [p, spec.paths[p]])),
  components: { securitySchemes: { companyKey: spec.components.securitySchemes.companyKey } },
};
for (const p of PATHS) if (!spec.paths[p]) throw new Error(`${p} is not in ${source}`);

// Keep only the components these paths use, following references (a response can refer to a schema).
const used = new Set();
const walk = (node) => {
  if (Array.isArray(node)) return node.forEach(walk);
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === '$ref' && typeof v === 'string' && v.startsWith('#/components/')) {
        if (!used.has(v)) {
          used.add(v);
          const [, , kind, name] = v.split('/');
          const target = spec.components[kind]?.[name];
          if (!target) throw new Error(`${v} is not defined`);
          (out.components[kind] ??= {})[name] = target;
          walk(target);
        }
      } else walk(v);
    }
  }
};
walk(out.paths);
for (const op of Object.values(out.paths).flatMap(Object.values)) op.tags = ['Προσκλήσεις'];

// The spec's own text is English. This site is Greek, so the words (never the structure) are replaced here. If the API adds
// or removes a field or a response, this stops, so a person updates the Greek instead of the page quietly going out of date.
const op = out.paths['/v1/invitations'].post;
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
const body = op.requestBody.content['application/json'].schema;
if (!same(Object.keys(body.properties), ['email', 'firstName', 'orderRef']) || !same(Object.keys(op.responses), ['200', '202', '401', '403', '422', '429'])) {
  throw new Error('POST /v1/invitations changed (fields or responses): update the Greek text in scripts/sync-openapi.mjs');
}
op.summary = 'Πρόσκληση ενός πελάτη για κριτική (από το κατάστημά σας)';
op.description = [
  'Ταυτοποίηση με το **κλειδί API** της επιχείρησης (`Authorization: Bearer rvk_...`), όχι με συνεδρία. Με το **κλειδί δοκιμής** (`rvk_test_...`) η απάντηση είναι η ίδια, με `test: true`, αλλά τίποτα δεν αποθηκεύεται, δεν στέλνεται και δεν μετράει στο όριο.',
  'Στείλτε μόνο το email του πελάτη, το μικρό του όνομα (προαιρετικό) και τον αριθμό παραγγελίας. Το email στέλνεται μετά την καθυστέρηση που έχει ορίσει η επιχείρηση (24 ώρες από προεπιλογή) και η διεύθυνση σβήνεται μόλις σταλεί, το αργότερο σε 30 ημέρες. Η ίδια παραγγελία δεν στέλνεται δύο φορές, οπότε η επανάληψη μιας κλήσης είναι ασφαλής.',
  'Αν η παραγγελία ή ο πελάτης έχει ήδη προσκληθεί (από την ίδια επιχείρηση τις τελευταίες 90 ημέρες), η απάντηση είναι `200` με `state: skipped` και `reason` (`duplicate`, `repeat`). Δεν στέλνεται τίποτα σε όποιον έχει ζητήσει να μη λαμβάνει προσκλήσεις (από οποιαδήποτε επιχείρηση) ή έχει ήδη γράψει κριτική για την επιχείρηση, αλλά η απάντηση είναι η ίδια `202` με μια κανονική πρόσκληση: δεν λέμε σε καμία επιχείρηση ποιος έχει γράψει κριτική ή έχει διαγραφεί από τη λίστα.',
  'Η επιχείρηση πρέπει να έχει ενεργοποιήσει τις προσκλήσεις και να έχει επιβεβαιώσει ότι ενημερώνει τους πελάτες της (403 `invitations_disabled`), να έχει πλάνο (403 `plan_required`) και να μην έχει συμπληρωθεί το μηνιαίο όριο του πλάνου της (429 `monthly_limit`: Basic 300, Pro 1000, Premium 5000, Enterprise χωρίς όριο). Πάνω από 600 κλήσεις μέσα σε ένα λεπτό με τα κλειδιά της επιχείρησης (κανονικό και δοκιμής μαζί) απαντώνται με 429 `rate_limited` και κεφαλίδα `Retry-After` (60 δευτερόλεπτα): δεν έγινε τίποτα και η κλήση δεν υπάρχει στο αρχείο κλήσεων, οπότε στείλτε την ξανά αργότερα.',
].join('\n\n');
body.properties.email.description = 'Το email του πελάτη';
body.properties.firstName.description = 'Το μικρό όνομα του πελάτη (προαιρετικό)';
body.properties.orderRef.description = 'Ο αριθμός παραγγελίας του καταστήματός σας: μία πρόσκληση ανά παραγγελία';
op.responses['200'].description = 'Δεν θα σταλεί τίποτα (`skipped`): η παραγγελία ή ο πελάτης έχει ήδη προσκληθεί';
op.responses['202'].description = 'Η πρόσκληση μπήκε στη σειρά για αποστολή';
op.responses['202'].content['application/json'].schema.properties.test.description = 'Μόνο με το κλειδί δοκιμής: δεν μπήκε τίποτα στη σειρά';
op.responses['401'].description = 'Λείπει ή είναι λάθος το κλειδί API';
op.responses['403'].description = '`invitations_disabled` ή `plan_required`';
op.responses['429'].description = '`monthly_limit`: συμπληρώθηκε το μηνιαίο όριο του πλάνου. `rate_limited`: πάνω από 600 κλήσεις σε ένα λεπτό, ξαναδοκιμάστε μετά από `Retry-After` δευτερόλεπτα';
op.responses['429'].headers['Retry-After'].description = 'Μόνο με το `rate_limited`: πόσα δευτερόλεπτα να περιμένετε';
out.components.securitySchemes.companyKey.description = 'Το κλειδί API της επιχείρησης (rvk_...), που δημιουργεί ο ιδιοκτήτης στη σελίδα «Η επιχείρησή μου»';
out.components.responses.Invalid.description = 'Μη έγκυρο πεδίο: `validation_failed`, με το `field` και ένα `message`';
out.tags = [{ name: 'Προσκλήσεις', description: 'Αυτόματη πρόσκληση πελατών από το κατάστημα' }];

const text = `# Generated by scripts/sync-openapi.mjs from reviewit-api/openapi/openapi.yaml. Do not edit by hand.\n${stringify(out, { lineWidth: 0 })}`;
if (check) {
  let current = '';
  try { current = readFileSync(target, 'utf8'); } catch { /* missing */ }
  if (current !== text) {
    console.error('src/data/invitations.openapi.yaml is out of date: run node scripts/sync-openapi.mjs');
    process.exit(1);
  }
  console.log('invitations.openapi.yaml is up to date');
} else {
  writeFileSync(target, text);
  console.log(`wrote ${target}`);
}
