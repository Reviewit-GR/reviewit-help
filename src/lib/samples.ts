// The code samples of snippets.ts (a copy of the business page's file) are written with Greek example data. In English the example
// customer is changed here, and the key placeholder is `t.api.keyPlaceholder` (src/i18n).
export function localizeSample(code: string, locale?: string): string {
  if (locale !== 'en') return code;
  return code.replaceAll('Μαρία', 'Maria').replaceAll('pelatis@example.gr', 'customer@example.gr');
}
