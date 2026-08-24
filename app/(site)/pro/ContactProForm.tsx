'use client'

import { useState } from 'react'

const TYPES_ETABLISSEMENT = ['Restaurant', 'Caviste', 'Épicerie', 'Hôtel', 'Autre']

export function ContactProForm() {
  const [nom, setNom] = useState('')
  const [etablissement, setEtablissement] = useState('')
  const [typeEtablissement, setTypeEtablissement] = useState(TYPES_ETABLISSEMENT[0])
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/pro-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, etablissement, typeEtablissement, email, telephone, message, website }),
    })
    const data = await res.json()

    if (data.success) {
      setStatus('success')
      setFeedback(data.message)
    } else {
      setStatus('error')
      setFeedback(data.error ?? 'Une erreur est survenue. Vous pouvez aussi nous écrire directement à contact@vinaroha.com.')
    }
  }

  if (status === 'success') {
    return (
      <div className="max-w-lg mx-auto p-8 text-center">
        <p className="font-accent text-3xl uppercase text-zinc-900 mb-2">Merci !</p>
        <p className="text-zinc-600">{feedback}</p>
        <p className="text-zinc-500 mt-4">Delphine vous recontactera très vite à l&apos;adresse indiquée.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-3 mx-auto">

      {/* Piège anti-robots — invisible et ignoré par les humains */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom et prénom"
        required
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60"
      />
      <input
        type="text"
        value={etablissement}
        onChange={(e) => setEtablissement(e.target.value)}
        placeholder="Nom de l'établissement"
        required
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60"
      />

      <select
        value={typeEtablissement}
        onChange={(e) => setTypeEtablissement(e.target.value)}
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60 bg-background"
      >
        {TYPES_ETABLISSEMENT.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        required
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60"
      />
      <input
        type="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        placeholder="Téléphone (optionnel)"
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Parlez-nous de votre établissement et de vos besoins (optionnel)"
        rows={4}
        disabled={status === 'loading'}
        className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-orange disabled:opacity-60 resize-none"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-black text-white font-black uppercase  px-8 py-4 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 w-fit"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>

      {status === 'error' && (
        <p className="text-red-600">{feedback}</p>
      )}

      <p className="text-[0.6875rem] text-zinc-500">
        Cette demande est envoyée directement à notre équipe, qui revient vers vous rapidement.
      </p>
    </form>
  )
}
