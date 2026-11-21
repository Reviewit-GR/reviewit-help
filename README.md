# Reviewit Help Center (help.reviewit.gr)

The public help center of [Reviewit.gr](https://www.reviewit.gr): how a business invites its customers to review it (from its page on
Reviewit, with a CSV file, or from its shop), the API reference, and what happens to the customer's data. It is in Greek (the default)
and English (`/en/`).

It is a static site: [Astro](https://astro.build) with [Starlight](https://starlight.astro.build), published with GitHub Pages. There is
no server, no database and no secret in this repository.

## Run it on your machine

You need [Node.js](https://nodejs.org) 22.23.4 or newer (24 is what the checks use) and npm. Nothing else: no keys, no environment
variables and no access to other repositories.

```
npm ci
npm run dev        # http://localhost:4331
```

```
npm run build      # the site into dist/, with the search index (Pagefind)
npm run preview    # serve dist/ (search only works here, not in npm run dev)
```

## Contributing

Corrections and suggestions are welcome: see [CONTRIBUTING.md](CONTRIBUTING.md). For a problem with a page, open an issue; for a
question about your Reviewit account, write to [help@reviewit.gr](mailto:help@reviewit.gr). Please read the
[Code of Conduct](CODE_OF_CONDUCT.md). To report a security problem, see [SECURITY.md](SECURITY.md).

## How it is organised

- **The guides** are Markdown (or MDX) files in `src/content/docs/`, one folder for each group of the sidebar: Greek at the top level,
  English in `src/content/docs/en/` with the same file names. A new page is a new file, a line in the `sidebar` of `astro.config.mjs`,
  and its link in `src/lib/links.ts` if a component links to it.
- **The home page, the title of a guide and the API page** are components in `src/components/`. Their words are in
  `src/i18n/el.ts` and `src/i18n/en.ts`.
- **The API page** is made from a copy of the public API spec (`src/data/invitations.openapi.yaml`), so it cannot say what the API does
  not. The spec is in Greek; the English is in `src/data/invitations.openapi.en.yaml`, each text next to the Greek it was translated from.

### Languages

- **Addresses are English in both languages**: `/connect/get-started/` in Greek and `/en/connect/get-started/` in English. Name the file in
  English, and give each heading an English id at its end: `## Δοκιμάστε με το κλειδί δοκιμής {#test-key}`. A link to a page or a step is
  then the same in both languages.
- **A missing English string fails the build** (the type of `en.ts` is the type of `el.ts`), and so does an English API text that no longer
  matches the Greek spec: the error names the text.
- **The code samples** (`src/lib/snippets.ts`) have Greek example data; the English page changes it when it builds.
- **The site of Reviewit is in Greek**, so the names of its pages and buttons are given in the English guides with the Greek in brackets.

### Two files are copies

These are updated by the maintainers; do not edit them by hand.

1. **`src/data/invitations.openapi.yaml`** is made from the API spec of Reviewit (only `POST /v1/invitations`). When the API changes the
   maintainers run `npm run sync:openapi`, and the build then tells them which English text to translate again.
2. **`src/lib/snippets.ts`** is the same file as the one that shows the code samples on the business page of Reviewit.

Both are in private repositories of the maintainers, so `npm run check:openapi` and `npm run check:snippets` (they compare the copies with
the originals) say "skipped" when those checkouts are not next to this one. You do not need them to contribute.

## Checks

```
npm run check         # astro check: the types of the pages and components
npm run lint          # ESLint, with the accessibility rules of the Astro plugin
npm test              # the links helper, and that every English string is written
npm run build         # fails when the English of the API page does not match the spec
npm run check:links   # after the build: every link and #anchor of the built site, and an English page for every Greek one
```

`.github/workflows/checks.yml` runs them, and audits the production dependencies, on every pull request. A pull request from a fork gets no
secrets, and the workflows need none. Dependabot proposes dependency updates weekly (`.github/dependabot.yml`).

## Publishing

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it with GitHub Pages
(Settings → Pages → Source: GitHub Actions). `public/CNAME` sets the address `help.reviewit.gr`, and a `CNAME` DNS record for `help` points
it to GitHub Pages. A pull request is built and checked, never published.

## License

- **The text** (the guides in `src/content/docs/`, the words in `src/i18n/` and the API texts) is licensed under
  [Creative Commons Attribution 4.0 International](LICENSE) (CC BY 4.0). You may share and adapt it with credit to Reviewit.gr.
- **The code** (the components, the scripts, the configuration and the styles) is licensed under the [MIT License](LICENSE-CODE).
- **The Reviewit name and logo** (`src/assets/logo.svg`, `src/assets/logo-light.svg` and `public/favicon.svg`) are not covered by either
  license. Please do not use them in a way that suggests that your site is the Reviewit help center.
