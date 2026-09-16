'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { PortableText } from '@portabletext/react'
import type { SanityProducteur } from '@/sanity/lib/queries'

// Regroupe les typeArticle bruts (saisis dans le Studio) en catégories affichées côté site.
const CATEGORY_GROUPS: Array<{ key: string; label: string; types: string[] }> = [
  { key: 'vin', label: 'Vins', types: ['vin'] },
  { key: 'bieres', label: 'Bières', types: ['bieres'] },
  { key: 'soft', label: 'Soft', types: ['soft'] },
  { key: 'spiritueux', label: 'Spiritueux', types: ['gin', 'rhum', 'armagnac', 'whisky-bourbon'] },
  { key: 'champagne-bulles', label: 'Champagne / Bulles', types: ['champagne', 'effervescent'] },
  { key: 'epicerie', label: 'Épicerie', types: ['epicerie'] },
]

function groupOf(typeArticle: string | null): string | undefined {
  return CATEGORY_GROUPS.find(g => typeArticle && g.types.includes(typeArticle))?.key
}

const CERT_LABELS: Record<string, string> = {
  bio: 'Bio',
  biodynamie: 'Biodynamie',
  nature: 'Nature',
  'terravitis-hve': 'Terra Vitis / HVE',
  conventionnel: 'Conventionnel',
}

const PAGE_SIZE = 12

type CatalogueProps = {
  producteurs: SanityProducteur[]
  icons?: Partial<Record<'vin' | 'bieres' | 'spiritueux' | 'champagne-bulles' | 'soft', ReactNode>>
}

export function Catalogue({ producteurs, icons }: CatalogueProps) {
  const [categorie, setCategorie] = useState('')
  const [recherche, setRecherche] = useState('')
  const [region, setRegion] = useState('')
  const [certification, setCertification] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState<SanityProducteur | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selected])

  const presentGroupKeys = useMemo(
    () => new Set(producteurs.map(p => groupOf(p.typeArticle)).filter((v): v is string => Boolean(v))),
    [producteurs]
  )
  const categories = useMemo(
    () => CATEGORY_GROUPS.filter(g => presentGroupKeys.has(g.key)),
    [presentGroupKeys]
  )
  const regions = useMemo(
    () => [...new Set(
      producteurs
        .filter(p => !categorie || groupOf(p.typeArticle) === categorie)
        .map(p => p.region)
        .filter((v): v is string => Boolean(v))
    )].sort(),
    [producteurs, categorie]
  )

  const filtres = useMemo(() => {
    return producteurs.filter(p => {
      if (categorie && groupOf(p.typeArticle) !== categorie) return false
      if (region && p.region !== region) return false
      if (certification && !p.certifications?.includes(certification)) return false
      if (recherche && !p.name.toLowerCase().includes(recherche.toLowerCase())) return false
      return true
    })
  }, [producteurs, categorie, region, certification, recherche])

  const reinitialiser = () => {
    setCategorie('')
    setRecherche('')
    setRegion('')
    setCertification('')
    setVisible(PAGE_SIZE)
  }

  const visibleItems = filtres.slice(0, visible)

  return (
    <section className="bg-background pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-8 text-center">
          Ils sont sur nos étagères
        </h2>

        {/* Pills catégorie + recherche */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setCategorie(''); setRegion(''); setVisible(PAGE_SIZE) }}
              className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                categorie === ''
                  ? 'bg-orange text-white border-orange'
                  : 'border-zinc-400 text-zinc-700 hover:border-orange hover:text-orange'
              }`}
            >
              Tout
            </button>
            {categories.map(g => (
              <button
                key={g.key}
                onClick={() => { setCategorie(g.key); setRegion(''); setVisible(PAGE_SIZE) }}
                className={`rounded-full px-4 py-1.5 text-sm border transition-colors ${
                  categorie === g.key
                    ? 'bg-orange text-white border-orange'
                    : 'border-zinc-400 text-zinc-700 hover:border-orange hover:text-orange'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={recherche}
            onChange={(e) => { setRecherche(e.target.value); setVisible(PAGE_SIZE) }}
            placeholder="Rechercher une trouvaille..."
            className="rounded-full border border-zinc-400 px-4 py-1.5 text-sm min-w-56 focus:outline-none focus:border-orange"
          />
        </div>

        {/* Filtres région + type de culture */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <select
            value={region}
            onChange={(e) => { setRegion(e.target.value); setVisible(PAGE_SIZE) }}
            className="rounded-full border border-zinc-400 px-4 py-1.5 text-sm bg-background focus:outline-none focus:border-orange"
          >
            <option value="">Choisir une région</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <select
            value={certification}
            onChange={(e) => { setCertification(e.target.value); setVisible(PAGE_SIZE) }}
            className="rounded-full border border-zinc-400 px-4 py-1.5 text-sm bg-background focus:outline-none focus:border-orange"
          >
            <option value="">Choisir un type de culture</option>
            {Object.entries(CERT_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <button
            onClick={reinitialiser}
            className="rounded-full bg-orange text-white px-4 py-1.5 text-sm hover:opacity-90 transition-opacity"
          >
            Réinitialiser
          </button>
        </div>

        {/* Grille */}
        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleItems.map(p => (
              <button
                key={p._id}
                type="button"
                onClick={() => setSelected(p)}
                className="flex items-center text-left gap-3 p-4 rounded-xl border border-zinc-200 cursor-pointer hover:border-orange has-[.cert-tag:hover]:border-zinc-200 transition-colors"
              >
                {p.photo?.asset?.url ? (
                  <img src={p.photo.asset.url} alt={p.name} className="w-16 h-16 rounded-md object-cover shrink-0" />
                ) : (
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                    {icons?.[groupOf(p.typeArticle) as 'vin' | 'bieres' | 'spiritueux' | 'champagne-bulles' | 'soft']}
                  </div>
                )}
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <p className="font-black uppercase text-base text-zinc-900 leading-tight">{p.name}</p>
                  {(p.region || p.appellationPrincipale) && (
                    <p className="text-sm text-orange">
                      {[p.region, p.appellationPrincipale].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  {p.certifications && p.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {p.certifications.map(c => (
                        <span
                          key={c}
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCertification(c)
                            setVisible(PAGE_SIZE)
                          }}
                          onKeyDown={(e) => {
                            if (e.key !== 'Enter' && e.key !== ' ') return
                            e.stopPropagation()
                            e.preventDefault()
                            setCertification(c)
                            setVisible(PAGE_SIZE)
                          }}
                          className="cert-tag text-[0.6875rem] bg-green text-white rounded-full px-2 py-0.5 hover:opacity-80 transition-opacity"
                        >
                          {CERT_LABELS[c] ?? c}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.description && p.description.length > 0 && (
                    <span className="font-fontjek text-sm border-b border-zinc-400 pb-0.5 mt-1 w-fit">
                      En savoir plus &nbsp;⟶
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400 italic">Aucune trouvaille ne correspond à ces filtres.</p>
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

      {/* Overlay */}
      <div
        onClick={() => setSelected(null)}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          selected ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panneau latéral */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={selected?.name}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selected && (
          <div className="p-8 flex flex-col gap-4">
            <button
              onClick={() => setSelected(null)}
              aria-label="Fermer"
              className="self-end w-9 h-9 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#232526" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {selected.photo?.asset?.url && (
              <img src={selected.photo.asset.url} alt={selected.name} className="w-full h-48 object-cover rounded-lg" />
            )}

            <h3 className="font-accent text-3xl uppercase text-zinc-900">{selected.name}</h3>

            {(selected.region || selected.appellationPrincipale) && (
              <p className="text-orange">
                {[selected.region, selected.appellationPrincipale].filter(Boolean).join(' · ')}
              </p>
            )}

            {selected.certifications && selected.certifications.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selected.certifications.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCertification(c)
                      setVisible(PAGE_SIZE)
                      setSelected(null)
                    }}
                    className="text-xs bg-green text-white rounded-full px-2 py-0.5 hover:opacity-80 transition-opacity"
                  >
                    {CERT_LABELS[c] ?? c}
                  </button>
                ))}
              </div>
            )}

            {selected.description && selected.description.length > 0 ? (
              <div className="text-zinc-600 leading-relaxed flex flex-col gap-3 mt-2">
                <PortableText value={selected.description} />
              </div>
            ) : (
              <p className="text-zinc-400 italic mt-2">Pas de description renseignée pour l&apos;instant.</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
