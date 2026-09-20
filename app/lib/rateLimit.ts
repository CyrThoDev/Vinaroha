// Rate limiting en mémoire, par instance de fonction serverless.
// Suffisant pour dissuader les scripts spammeurs sur un site à faible trafic — ne remplace pas
// un vrai rate limiter distribué (Upstash/Redis) si le trafic devient important un jour.

type Entry = { count: number; resetAt: number }

const hits = new Map<string, Entry>()
const MAX_TRACKED_KEYS = 5000

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now > entry.resetAt) {
    if (hits.size >= MAX_TRACKED_KEYS) hits.clear()
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfterSeconds: 0 }
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { ok: true, retryAfterSeconds: 0 }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
