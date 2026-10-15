import { createClient } from 'next-sanity'

// Client dédié aux écritures (sync catalogue, etc.) : jamais de CDN (lecture toujours fraîche),
// token avec droits d'écriture. Ne jamais utiliser ce client pour du rendu de pages publiques.
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-05-30',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})
