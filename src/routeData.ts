import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import { useT } from './i18n';

// The API page is written by a component, so Starlight finds no headings in its Markdown: its «On this page» is made here, from the
// same headings the component writes (ids in ApiEndpoint.astro).
interface Toc { depth: number; slug: string; text: string; children: Toc[] }
const spec = parse(readFileSync('src/data/invitations.openapi.yaml', 'utf8'));

export const onRequest = defineRouteMiddleware((context) => {
  const route = context.locals.starlightRoute;
  const slug = route.locale ? route.id.replace(new RegExp(`^${route.locale}/`), '') : route.id;
  if (!slug.startsWith('api/')) return;
  const t = useT(route.locale);
  const item = (depth: number, id: string, text: string, children: Toc[] = []): Toc => ({ depth, slug: id, text, children });
  const codes = Object.keys(spec.paths['/v1/invitations'].post.responses);
  route.toc = {
    minHeadingLevel: 2,
    maxHeadingLevel: 3,
    items: [
      item(2, 'parameters', t.api.parameters, [item(3, 'headers', t.api.headers), item(3, 'body', t.api.body)]),
      item(2, 'example', t.api.exampleRequest),
      item(2, 'responses', t.api.responses, codes.map((c) => item(3, `response-${c}`, c))),
    ],
  };
});
