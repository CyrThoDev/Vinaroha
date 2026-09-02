'use client'

import { useMemo, useState, type ReactNode } from 'react'

function BouteilleIcon() {
  return (
    <svg viewBox="0 0 24 40" fill="none" stroke="#1a1a1a" strokeWidth="1.2" className="h-24 w-auto">
      <path d="M10 1h4v6c0 1.2.4 2 1.2 3C16.6 11.8 17 13 17 15v21a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V15c0-2 .4-3.2 1.8-5 .8-1 1.2-1.8 1.2-3V1Z" />
      <path d="M9 20h6" />
    </svg>
  )
}

type Produit = {
  _id: string
  name: string
  categorie: 'vin' | 'biere' | 'spiritueux' | null
  type: string | null
  region: string | null
  appellation: string | null
  image: { asset?: { url: string } } | null
}

type EtageresProps = {
  produits: Produit[]
  icons?: Partial<Record<'vin' | 'biere' | 'spiritueux', ReactNode>>
}

const CATEGORIES: { id: 'tout' | 'vin' | 'biere' | 'spiritueux'; label: string }[] = [
  { id: 'tout',       label: 'Tout'       },
  { id: 'vin',        label: 'Vin'        },
  { id: 'biere',      label: 'Bière'      },
  { id: 'spiritueux', label: 'Spiritueux' },
]

const PAGE_SIZE = 8

export function Etageres({ produits, icons }: EtageresProps) {
  const [categorie, setCategorie] = useState<'tout' | 'vin' | 'biere' | 'spiritueux'>('tout')
  const [recherche, setRecherche] = useState('')
  const [region, setRegion] = useState('')
  const [type, setType] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const regions = useMemo(
    () => [...new Set(produits.map(p => p.region).filter((v): v is string => Boolean(v)))].sort(),
    [produits]
  )
  const types = useMemo(
    () => [...new Set(produits.map(p => p.type).filter((v): v is string => Boolean(v)))].sort(),
    [produits]
  )

  const filtres = useMemo(() => {
    return produits.filter(p => {
      if (categorie !== 'tout' && p.categorie !== categorie) return false
      if (region && p.region !== region) return false
      if (type && p.type !== type) return false
      if (recherche && !p.name.toLowerCase().includes(recherche.toLowerCase())) return false
      return true
    })
  }, [produits, categorie, region, type, recherche])

  const reinitialiser = () => {
    setCategorie('tout')
    setRecherche('')
    setRegion('')
    setType('')
    setVisible(PAGE_SIZE)
  }

  const items = filtres.slice(0, visible)

  return (
    <section className="bg-background pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-3xl md:text-4xl uppercase text-zinc-900 mb-8 text-center">
          Ils sont sur nos étagères
        </h2>

        {/* Pills catégorie + recherche */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => { setCategorie(c.id); setVisible(PAGE_SIZE) }}
                className={`rounded-full px-4 py-1.5  border transition-colors ${
                  categorie === c.id
                    ? 'bg-orange text-white border-orange'
                    : 'border-zinc-400 text-zinc-700 hover:border-orange hover:text-orange'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={recherche}
            onChange={(e) => { setRecherche(e.target.value); setVisible(PAGE_SIZE) }}
            placeholder="Rechercher un produit..."
            className="rounded-full border border-zinc-400 px-4 py-1.5  min-w-56 focus:outline-none focus:border-orange"
          />
        </div>

        {/* Filtres région / type */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <select
            value={region}
            onChange={(e) => { setRegion(e.target.value); setVisible(PAGE_SIZE) }}
            className="rounded-full border border-zinc-400 px-4 py-1.5  bg-background focus:outline-none focus:border-orange"
          >
            <option value="">Choisir une région</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setVisible(PAGE_SIZE) }}
            className="rounded-full border border-zinc-400 px-4 py-1.5  bg-background focus:outline-none focus:border-orange"
          >
            <option value="">Sélectionner un type</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button
            onClick={reinitialiser}
            className="rounded-full bg-orange text-white px-4 py-1.5 text-base hover:opacity-90 transition-opacity"
          >
            Réinitialiser
          </button>
        </div>

        {/* Grille produits */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {items.map(p => (
              <div key={p._id} className="flex flex-col items-center text-center gap-2">
                {p.image?.asset?.url ? (
                  <img src={p.image.asset.url} alt={p.name} className="h-24 w-auto object-contain" />
                ) : (
                  (p.categorie && icons?.[p.categorie]) ?? <BouteilleIcon />
                )}
                <p className="font-black uppercase text-base text-zinc-900">{p.name}</p>
                {(p.region || p.type) && (
                  <p className="text-xs text-orange">
                    {[p.region, p.type].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 italic">Aucun produit ne correspond à ces filtres.</p>
        )}

        {visible < filtres.length && (
          <div className="flex justify-center mt-14">
            <button
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              className="font-fontjek text-2xl border-b border-zinc-400 pb-1 hover:border-orange hover:text-orange transition-colors"
            >
              Voir plus &nbsp;⟶
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
