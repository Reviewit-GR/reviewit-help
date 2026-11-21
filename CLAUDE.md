# CLAUDE.md

The help center of Reviewit.gr (help.reviewit.gr): Astro Starlight on GitHub Pages, Greek (root) and English (`/en/`). Read `README.md`
first. **The repository is public**: no keys, tokens, real customers or companies, internal hostnames; examples use `example.gr`
addresses and made-up names.

- **Addresses are English in both languages** (`/connect/get-started/`, `/en/connect/get-started/`), and so are the ids of the
  headings (`## Δοκιμάστε με το κλειδί δοκιμής {#test-key}`). Links in the components come from `src/lib/links.ts`; links in the guides
  are written out and checked by `npm run check:links`.
- **Every guide exists in both languages**, with the same file name (`src/content/docs/` and `src/content/docs/en/`). The words of the
  components are in `src/i18n/el.ts` and `en.ts`; the English of the API page is in `src/data/invitations.openapi.en.yaml`, next to the
  Greek it was translated from.
- **Two files are copies** (see the README): `src/data/invitations.openapi.yaml` (do not edit; `npm run sync:openapi`) and
  `src/lib/snippets.ts` (change it in `reviewit-web`, then `node scripts/check-snippets.mjs --write`).
- What a page says about the API (limits, windows, codes, fields) must match the API: the source of truth is
  `../reviewit-api/openapi/openapi.yaml` and `../reviewit-api/README.md`.
- Before a commit: `npm run check && npm run lint && npm test && npm run build && npm run check:links`, and
  `npm run check:openapi && npm run check:snippets` (they need the sibling checkouts).
- Licenses: text CC BY 4.0 (`LICENSE`), code MIT (`LICENSE-CODE`); the logo and name are covered by neither (see the README).
- Dev server on port 4331 (`reviewit-web` uses 4321). Only commit when asked.
