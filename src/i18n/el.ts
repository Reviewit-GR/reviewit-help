// Every word the components of the help center write themselves, in Greek. The guides are in src/content/docs, and the texts of the
// API page come from the spec; what is here is the rest: the home page, the title of a guide and the labels of the API page.
// A second language is a second file of this shape (en.ts) and one line in index.ts.
const articles = (n: number) => `${n} ${n === 1 ? 'άρθρο' : 'άρθρα'}`;

export const el = {
  articles,

  sections: {
    business: {
      title: 'Για επιχειρήσεις',
      text: 'Πώς λειτουργούν οι προσκλήσεις για κριτική και πώς τις στέλνετε από τη σελίδα της επιχείρησής σας.',
    },
    developers: {
      title: 'Για προγραμματιστές',
      text: 'Σύνδεση του καταστήματός σας, παραδείγματα κώδικα και αναφορά του API.',
    },
    privacy: {
      title: 'Απόρρητο και προτιμήσεις',
      text: 'Τι δεδομένα λαμβάνουμε, πόσο τα κρατάμε και πώς σταματάτε τις προσκλήσεις.',
    },
  },

  home: {
    title: 'Πώς μπορούμε να βοηθήσουμε;',
    subtitle: 'Βρείτε οδηγούς για τις προσκλήσεις κριτικών, τη σύνδεση του καταστήματός σας και το απόρρητο των πελατών σας.',
    start: 'Ξεκινήστε',
    topics: 'Θέματα',
    contact: { title: 'Δεν βρήκατε αυτό που ψάχνετε;', text: 'Γράψτε μας στο help@reviewit.gr και θα σας βοηθήσουμε.', button: 'Στείλτε email', address: 'help@reviewit.gr' },
  },

  page: {
    readingTime: (minutes: number) => `Διαβάζεται σε ${minutes} ${minutes === 1 ? 'λεπτό' : 'λεπτά'}`,
  },

  api: {
    keyPlaceholder: 'ΤΟ_ΚΛΕΙΔΙ_ΣΑΣ', // the same as KEY_PLACEHOLDER in src/lib/snippets.ts, which the Greek samples use
    copy: 'Αντιγραφή',
    copied: 'Αντιγράφηκε',
    copyLabel: 'Αντιγραφή του URL',
    headers: 'Κεφαλίδες',
    body: 'Σώμα αιτήματος',
    responses: 'Απαντήσεις',
    responseBody: 'Σώμα απάντησης',
    required: 'απαιτείται',
    maxChars: (n: number) => `έως ${n} χαρακτήρες`,
    contentType: 'Το σώμα του αιτήματος είναι JSON.',
    whatToDo: { before: 'Τι να κάνετε σε κάθε απάντηση: ', link: 'απαντήσεις και σφάλματα', after: '.' },
    parameters: 'Παράμετροι',
    exampleRequest: 'Παράδειγμα αιτήματος',
    exampleResponse: 'Παράδειγμα απάντησης',
    keyNote: { before: 'Αντικαταστήστε το ', after: '. Ξεκινήστε με το ', link: 'κλειδί δοκιμής', end: ': δεν στέλνεται τίποτα.' },
    exampleInvalidEmail: 'Μη έγκυρη διεύθυνση email',
  },
};

export type Strings = typeof el;
