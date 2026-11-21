// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';

// The help center of Reviewit.gr, published on GitHub Pages at https://help.reviewit.gr (public/CNAME).
export default defineConfig({
  site: 'https://help.reviewit.gr',
  // GitHub Pages serves /connect/get-started/index.html, and sends /connect/get-started to the slash: every link in the site has the slash.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Not 4321: that is reviewit-web's port when both run on one machine.
  server: { port: 4331 },
  // The ids of the headings are English in every language: `## Δοκιμάστε {#test-key}` makes the heading's id test-key.
  markdown: { processor: satteri({ features: { headingAttributes: true } }) },
  integrations: [
    starlight({
      title: 'Reviewit',
      description: 'Βοήθεια για το Reviewit: οδηγοί για επιχειρήσεις, τεκμηρίωση για προγραμματιστές, απόρρητο και προτιμήσεις.',
      // Greek is at the root (/connect/get-started/), English under /en/. The addresses are English in both.
      defaultLocale: 'root',
      locales: { root: { label: 'Ελληνικά', lang: 'el' }, en: { label: 'English', lang: 'en' } },
      logo: { light: './src/assets/logo.svg', dark: './src/assets/logo-light.svg', alt: 'Reviewit', replacesTitle: true },
      favicon: '/favicon.svg',
      routeMiddleware: './src/routeData.ts',
      components: { PageTitle: './src/components/PageTitle.astro' },
      customCss: [
        '@fontsource/ibm-plex-sans/latin-400.css',
        '@fontsource/ibm-plex-sans/greek-400.css',
        '@fontsource/ibm-plex-sans/latin-600.css',
        '@fontsource/ibm-plex-sans/greek-600.css',
        '@fontsource/ibm-plex-sans/latin-700.css',
        '@fontsource/ibm-plex-sans/greek-700.css',
        './src/styles/custom.css',
      ],
      social: [{ icon: 'external', label: 'reviewit.gr', href: 'https://www.reviewit.gr' }, { icon: 'github', label: 'GitHub', href: 'https://github.com/Reviewit-GR/reviewit-help' }],
      editLink: { baseUrl: 'https://github.com/Reviewit-GR/reviewit-help/edit/main/' },
      // Each label has its English in `translations`; the Greek one is the label itself.
      sidebar: [
        {
          label: 'Για επιχειρήσεις',
          translations: { en: 'For businesses' },
          items: [
            { label: 'Πρόσκληση πελατών για κριτική', translations: { en: 'Inviting customers to review' }, slug: 'business/invite-customers' },
            { label: 'Αποστολή με φόρμα ή αρχείο CSV', translations: { en: 'Send with a form or a CSV file' }, slug: 'business/send-csv' },
          ],
        },
        {
          label: 'Για προγραμματιστές',
          translations: { en: 'For developers' },
          items: [
            { label: 'Ξεκινήστε', translations: { en: 'Get started' }, slug: 'connect/get-started' },
            { label: 'Παραδείγματα κώδικα', translations: { en: 'Code samples' }, slug: 'connect/code-samples' },
            { label: 'Απαντήσεις και σφάλματα', translations: { en: 'Responses and errors' }, slug: 'connect/responses-and-errors' },
            { label: 'Πλατφόρμες', translations: { en: 'Platforms' }, slug: 'connect/platforms' },
            {
              label: 'Αναφορά API',
              translations: { en: 'API reference' },
              items: [{ label: 'Δημιουργία πρόσκλησης', translations: { en: 'Create an invitation' }, slug: 'api/invitations' }],
            },
          ],
        },
        {
          label: 'Απόρρητο και προτιμήσεις',
          translations: { en: 'Privacy and preferences' },
          items: [
            { label: 'Τι δεδομένα λαμβάνουμε', translations: { en: 'What data we receive' }, slug: 'privacy/data-we-receive' },
            { label: 'Δεν θέλω άλλες προσκλήσεις', translations: { en: 'I do not want more invitations' }, slug: 'readers/unsubscribe' },
          ],
        },
      ],
    }),
  ],
});
