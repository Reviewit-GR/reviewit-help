// The addresses of the pages, English in every language: /connect/get-started/ in Greek and /en/connect/get-started/ in English.
// The ids of the headings are English too (headingAttributes in astro.config.mjs), so a link to a step is the same in both.
export const pages = {
  inviteCustomers: 'business/invite-customers',
  sendCsv: 'business/send-csv',
  getStarted: 'connect/get-started',
  codeSamples: 'connect/code-samples',
  responsesAndErrors: 'connect/responses-and-errors',
  platforms: 'connect/platforms',
  createInvitation: 'api/invitations',
  dataWeReceive: 'privacy/data-we-receive',
  unsubscribe: 'readers/unsubscribe',
} as const;

export type Page = keyof typeof pages;

/** The ids of the headings that the components link to. */
export const anchors = {
  enableInvitations: 'enable-invitations',
  testKey: 'test-key',
  goLive: 'go-live',
} as const;

/** The address of a page in a language. `locale` is undefined for the default language (Greek), which has no prefix. */
export function pageHref(page: Page, locale?: string, anchor?: string): string {
  const prefix = locale && locale !== 'root' ? `/${locale}` : '';
  return `${prefix}/${pages[page]}/${anchor ? `#${anchor}` : ''}`;
}
