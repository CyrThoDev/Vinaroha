'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()

    if (data.success) {
      setStatus('success')
      setMessage(data.message)
      setEmail('')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Une erreur est survenue.')
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex rounded-lg overflow-hidden">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-5 py-3 bg-background text-zinc-900 placeholder:text-zinc-400 focus:outline-none disabled:opacity-60 min-w-0"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-black text-white font-black uppercase   px-8 py-3 hover:opacity-80 transition-opacity disabled:opacity-50 shrink-0"
        >
          {status === 'loading' ? 'Inscription…' : "Je m'abonne"}
        </button>
      </form>
      {message && (
        <p className={` mt-3 ${status === 'success' ? 'text-green' : 'text-red-600'}`}>
          {message}
        </p>
      )}
      <p className="text-[0.6875rem] text-zinc-700/70 mt-3">
        En vous inscrivant, vous acceptez de recevoir notre newsletter mensuelle.
        Désinscription possible à tout moment. Vos données ne sont jamais transmises à des tiers.{' '}
        <a href="/mentions-legales" className="underline underline-offset-2 hover:text-zinc-900 transition-colors">
          En savoir plus
        </a>
      </p>
    </div>
  )
}
