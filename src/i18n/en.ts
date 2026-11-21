import type { Strings } from './el';

// The English of src/i18n/el.ts. The compiler fails when a string is missing here or has the wrong shape.
export const en: Strings = {
  articles: (n) => `${n} ${n === 1 ? 'article' : 'articles'}`,

  sections: {
    business: {
      title: 'For businesses',
      text: 'How review invitations work, and how to send them from your business page.',
    },
    developers: {
      title: 'For developers',
      text: 'Connect your shop, code samples and the API reference.',
    },
    privacy: {
      title: 'Privacy and preferences',
      text: 'What data we receive, how long we keep it and how to stop invitations.',
    },
  },

  home: {
    title: 'How can we help?',
    subtitle: "Guides for review invitations, connecting your shop and your customers' privacy.",
    start: 'Get started',
    topics: 'Topics',
    contact: { title: 'Did not find what you were looking for?', text: 'Write to us at help@reviewit.gr and we will help you.', button: 'Send an email', address: 'help@reviewit.gr' },
  },

  page: {
    readingTime: (minutes) => `${minutes} min read`,
  },

  api: {
    keyPlaceholder: 'YOUR_API_KEY',
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: 'Copy the URL',
    headers: 'Headers',
    body: 'Request body',
    responses: 'Responses',
    responseBody: 'Response body',
    required: 'required',
    maxChars: (n) => `up to ${n} characters`,
    contentType: 'The body of the request is JSON.',
    whatToDo: { before: 'What to do for each response: ', link: 'responses and errors', after: '.' },
    parameters: 'Parameters',
    exampleRequest: 'Example request',
    exampleResponse: 'Example response',
    keyNote: { before: 'Replace ', after: '. Start with the ', link: 'test key', end: ': nothing is sent.' },
    exampleInvalidEmail: 'Invalid email address',
  },
};
