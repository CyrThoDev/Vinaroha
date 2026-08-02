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
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-5 py-3 rounded-lg border border-zinc-300 bg-white  text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-orange disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-orange text-white font-black uppercase tracking-widest text-xs px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? 'Inscription…' : "S'inscrire"}
        </button>
      </form>
      {message && (
        <p className={`text-xs mt-3 ${status === 'success' ? 'text-green' : 'text-red-600'}`}>
          {message}
        </p>
      )}
      <p className="text-[0.6875rem] text-zinc-400 mt-3 ">
        En vous inscrivant, vous acceptez de recevoir notre newsletter mensuelle.
        Désinscription possible à tout moment. Vos données ne sont jamais transmises à des tiers.{' '}
        <a href="/mentions-legales" className="underline underline-offset-2 hover:text-zinc-600 transition-colors">
          En savoir plus
        </a>
      </p>
    </div>
  )
}
