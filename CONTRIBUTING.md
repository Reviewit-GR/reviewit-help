# Contributing

Thank you for helping to improve the help center. You can fix a typo, correct a page or suggest a new guide. By taking part you agree
to the [Code of Conduct](CODE_OF_CONDUCT.md), and your contribution is licensed as described in the [README](README.md#license).

## Ways to help

- **Something is wrong or missing in a guide:** open an issue («Problem with a page») with the address of the page.
- **A fix you can write yourself:** open a pull request. For a larger change (a new guide, a new section), open an issue first, so we
  can agree on it before you spend time.
- **A question about your Reviewit account or about your business:** this is not the place. Write to
  [help@reviewit.gr](mailto:help@reviewit.gr).

## Run it on your machine

You need Node.js 22.23.4 or newer (24 is what the checks use) and npm. No keys, environment variables or private repositories are needed.

```
npm ci
npm run dev        # http://localhost:4331
```

## Before you open a pull request

1. **Both languages.** Every guide exists in Greek (`src/content/docs/`) and in English (`src/content/docs/en/`) with the same file
   name. If you change one, change the other, or say in the pull request that the other still needs it. The words of the site itself
   are in `src/i18n/`.
2. **English addresses and ids.** File names and the ids of headings are English in both languages: `## Δοκιμάστε με το κλειδί δοκιμής {#test-key}`.
3. **Plain words.** Write what the person does, in order. Greek in the second person plural, English in plain, short sentences.
4. **Nothing private.** Use `example.gr` addresses and made-up names. Never a real customer, company, key or token.
5. **Do not edit the copies.** `src/data/invitations.openapi.yaml` is made from the API spec and `src/lib/snippets.ts` is a copy of a file
   in the Reviewit site; the maintainers update them. If a page is wrong because of them, open an issue.
6. **Run the checks:**

   ```
   npm run check && npm run lint && npm test && npm run build && npm run check:links
   ```

   The pull request runs the same checks.

## Licensing of contributions

Text you contribute is licensed under CC BY 4.0 and code under the MIT license (see the README), the same as the rest of the repository.
