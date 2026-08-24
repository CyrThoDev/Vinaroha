import { MetadataRoute } from 'next'

const BASE = 'https://vinaroha.com'

const STATIC: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { url: BASE,                          priority: 1.0, changeFrequency: 'weekly'  },
  { url: `${BASE}/box`,                 priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/cave`,                priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/producteurs`,         priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/evenements`,          priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/mentions-legales`,    priority: 0.2, changeFrequency: 'yearly'  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return STATIC.map(p => ({ ...p, lastModified: now }))
}
