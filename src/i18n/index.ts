import { el, type Strings } from './el';
import { en } from './en';

// The strings of the components, by the locale of the page (`Astro.currentLocale`, `root` for the default one).
// A language is a file with the shape of el.ts, one line here and its locale in astro.config.mjs.
const byLocale: Record<string, Strings> = { root: el, el, en };

export const useT = (locale?: string): Strings => byLocale[locale ?? 'root'] ?? el;
