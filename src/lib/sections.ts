import type { Page } from './links';

// The three parts of the help center, by who is reading: the first page and the icon, used by the home page and by the breadcrumb of
// every guide. The names are in src/i18n/el.ts. A part can have more than one folder of pages (the developers' part has the guides
// of `connect/` and the reference of `api/`); `sectionOf` finds the part of a page by its first folder.
export interface Section {
  /** The page the section opens with (see links.ts). */
  page: Page;
  /** The `d` of a 24x24 line icon, drawn with stroke="currentColor". */
  icon: string;
  /** The folders of src/content/docs that belong to it. */
  folders: string[];
}

export const sections: Record<string, Section> = {
  business: {
    page: 'inviteCustomers',
    icon: 'M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Zm1.5.6 6.6 4.7a1.6 1.6 0 0 0 1.8 0l6.6-4.7',
    folders: ['business'],
  },
  developers: {
    page: 'getStarted',
    icon: 'm8.5 8-4 4 4 4m7-8 4 4-4 4M13.5 5.5l-3 13',
    folders: ['connect', 'api'],
  },
  privacy: {
    page: 'dataWeReceive',
    icon: 'M12 3.5 5 6v5.5c0 4.2 2.8 7.4 7 9 4.2-1.6 7-4.8 7-9V6l-7-2.5Zm-3 8.3 2.2 2.2 3.9-4.2',
    folders: ['privacy', 'readers'],
  },
};

/** The key of the section a page (its id without the language) belongs to, or undefined for the home page. */
export const sectionOf = (slug: string): string | undefined => {
  const folder = slug.split('/')[0];
  return Object.keys(sections).find((k) => sections[k].folders.includes(folder));
};
