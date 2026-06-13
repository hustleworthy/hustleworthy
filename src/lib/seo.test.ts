import assert from 'node:assert/strict'
import test from 'node:test'
import { articleSchema } from './seo'

test('articleSchema includes a person author URL when provided', () => {
  const schema = articleSchema({
    title: 'Swagbucks Review - Legit or Scam? Earnings Explained',
    description: 'Our review answers if Swagbucks is legit.',
    path: '/reviews/swagbucks',
    author: 'Folasade Oluwagbenga',
    authorUrl: 'https://www.linkedin.com/in/folasade-oluwagbenga-9b8318242/',
    publishedAt: '2025-06-02T11:14:08.000Z',
    updatedAt: '2026-06-08T12:35:11.663Z',
  })

  assert.equal(schema.datePublished, '2025-06-02T11:14:08.000Z')
  assert.equal(schema.dateModified, '2026-06-08T12:35:11.663Z')
  assert.deepEqual(schema.author, {
    '@type': 'Person',
    name: 'Folasade Oluwagbenga',
    url: 'https://www.linkedin.com/in/folasade-oluwagbenga-9b8318242/',
  })
})
