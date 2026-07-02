'use client'

import { useState, type FormEvent } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
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
          className="flex-1 px-5 py-3 rounded-full border border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#c85912] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#c85912] text-white font-black uppercase tracking-widest text-xs px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? 'Inscription…' : "S'inscrire"}
        </button>
      </form>
      {message && (
        <p className={`text-xs mt-3 ${status === 'success' ? 'text-[#357d4f]' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
