'use client'

import { useState } from 'react'

const FORMULES = [
  { value: 'decouverte', label: 'La Box Découverte', prix: 'À partir de 25€/mois' },
  { value: 'epicurienne', label: 'La Box Épicurienne', prix: 'À partir de 40€/mois' },
]

const DUREES = ['3 mois', '6 mois', '12 mois']

type CommandeFormProps = {
  type: 'abonnement' | 'offrir'
}

export function CommandeForm({ type }: CommandeFormProps) {
  const [formule, setFormule] = useState(FORMULES[0].value)
  const [duree, setDuree] = useState(DUREES[0])
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/box-commande', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, formule, duree, nom, email, telephone, message, website }),
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
        <p className="text-zinc-500  mt-4">Delphine vous recontactera très vite à l&apos;adresse indiquée.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-8">

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

      {/* Formule */}
      <div>
        <p className="font-black uppercase  tracking-widest text-zinc-500 mb-3">Choisissez votre formule</p>
        <div className="flex flex-col gap-3">
          {FORMULES.map((f) => (
            <label
              key={f.value}
              className={`flex items-center justify-between gap-4 border rounded-xl px-5 py-4 cursor-pointer transition-colors ${
                formule === f.value ? 'border-yellow bg-yellow/10' : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="formule"
                  value={f.value}
                  checked={formule === f.value}
                  onChange={() => setFormule(f.value)}
                  className="accent-yellow"
                />
                <span className="font-black uppercase  text-zinc-900">{f.label}</span>
              </span>
              <span className=" text-zinc-500">{f.prix}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Durée */}
      <div>
        <p className="font-black uppercase  tracking-widest text-zinc-500 mb-3">Durée d&apos;abonnement</p>
        <div className="flex gap-3">
          {DUREES.map((d) => (
            <label
              key={d}
              className={`flex-1 text-center border rounded-xl py-3 cursor-pointer font-black uppercase  transition-colors ${
                duree === d ? 'border-yellow bg-yellow/10 text-zinc-900' : 'border-zinc-200 text-zinc-700 hover:border-zinc-300'
              }`}
            >
              <input
                type="radio"
                name="duree"
                value={d}
                checked={duree === d}
                onChange={() => setDuree(d)}
                className="sr-only"
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      {/* Coordonnées */}
      <div className="flex flex-col gap-3">
        <p className="font-black uppercase  tracking-widest text-zinc-500">Vos coordonnées</p>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom et prénom"
          required
          disabled={status === 'loading'}
          className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-yellow disabled:opacity-60"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          required
          disabled={status === 'loading'}
          className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-yellow disabled:opacity-60"
        />
        <input
          type="tel"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Téléphone (optionnel)"
          disabled={status === 'loading'}
          className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-yellow disabled:opacity-60"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={type === 'offrir' ? 'Un message pour la personne à qui vous offrez la box ? (optionnel)' : 'Une précision à nous transmettre ? (optionnel)'}
          rows={3}
          disabled={status === 'loading'}
          className="px-4 py-3 rounded-lg border border-zinc-200 focus:outline-none focus:border-yellow disabled:opacity-60 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-black text-white font-black uppercase tracking-widest  px-8 py-4 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 w-fit"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>

      {status === 'error' && (
        <p className="text-red-600 ">{feedback}</p>
      )}

      <p className="text-[0.6875rem] text-zinc-500">
        Cette demande est envoyée directement à notre équipe, qui revient vers vous rapidement pour finaliser
        {type === 'offrir' ? ' le cadeau' : " l'abonnement"} et le règlement.
      </p>
    </form>
  )
}
