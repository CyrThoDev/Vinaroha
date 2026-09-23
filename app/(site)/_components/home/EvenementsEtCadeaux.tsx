import Link from 'next/link'
import { Asset, type AssetName } from '@/app/components/Asset'

type Item = { label?: string; description?: string; href?: string; imageUrl?: string }

type EvenementsEtCadeauxProps = { items?: Item[]; disabled?: boolean }

const ITEMS_DEFAUT: Item[] = [
  { label: 'Privatisation de la cave', description: 'Un lieu chaleureux pour vos réceptions privées.',          href: '/evenements' },
  { label: 'Mariages & réceptions',    description: 'Des cuvées choisies pour accompagner vos grands moments.', href: '/evenements' },
  { label: 'Cadeaux d’entreprise',     description: 'Coffrets et sélections personnalisés, à votre image.',     href: '/evenements' },
]

const ICONES: AssetName[] = ['glass', 'bulles', 'gift']
const CERCLE_COULEURS = ['bg-yellow', 'bg-orange', 'bg-yellow']

export function EvenementsEtCadeaux({ items, disabled = false }: EvenementsEtCadeauxProps) {
  const cards = items && items.length > 0 ? items : ITEMS_DEFAUT

  return (
    <section className="bg-background py-16 px-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* Col gauche — texte + CTA */}
        <div className="flex flex-col gap-4">
          <p className="font-black uppercase text-xs md:text-sm tracking-wide text-orange">
            Pour vos moments à partager
          </p>
          <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900">
            Vos événements et cadeaux
          </h2>
          <p className="max-w-md text-zinc-600">
            Privatisation, mariages, séminaires ou coffrets cadeaux — nous imaginons avec vous des moments autour du vin, sur mesure et inoubliables.
          </p>

          {disabled ? (
            <span
              aria-disabled="true"
              className="font-fontjek text-2xl text-zinc-400 flex items-center gap-2 border-b border-zinc-300 pb-1 w-fit mt-2 cursor-not-allowed"
            >
              Bientôt disponible
            </span>
          ) : (
            <Link
              href="/evenements"
              className="font-fontjek text-2xl text-zinc-900 flex items-center gap-2 border-b border-zinc-400 pb-1 w-fit mt-2 hover:text-orange hover:border-orange transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow"
            >
              Découvrir &nbsp;⟶
            </Link>
          )}
        </div>

        {/* Col droite — liste numérotée */}
        <div className="flex flex-col divide-y divide-zinc-900/10 border-t border-zinc-900/10">
          {cards.map(({ label, description, href }, i) => {
            const rowContent = (
              <>
                <span className="font-accent text-3xl md:text-4xl text-orange shrink-0 w-10 md:w-12">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="w-px self-stretch bg-zinc-900/10 shrink-0" aria-hidden="true" />
                <span className="flex-1 min-w-0">
                  <span className="block font-accent uppercase text-lg md:text-xl text-zinc-900 leading-tight">
                    {label}
                  </span>
                  {description && (
                    <span className="block text-zinc-500 text-sm mt-1">
                      {description}
                    </span>
                  )}
                </span>
                {!disabled && (
                  <span className="font-fontjek text-2xl text-zinc-900 shrink-0 transition-transform group-hover:translate-x-1">
                    ⟶
                  </span>
                )}
              </>
            )

            return disabled ? (
              <div
                key={label ?? i}
                aria-disabled="true"
                className="flex items-center gap-4 sm:gap-6 min-h-11 py-5 sm:py-6 px-3 -mx-3 grayscale opacity-50 cursor-not-allowed"
              >
                {rowContent}
              </div>
            ) : (
              <Link
                key={label ?? i}
                href={href ?? '/evenements'}
                className="group flex items-center gap-4 sm:gap-6 min-h-11 py-5 sm:py-6 px-3 -mx-3  transition-colors hover:bg-zinc-900/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
              >
                {rowContent}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
