import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type Item = { label?: string; description?: string; href?: string; imageUrl?: string }

type EvenementsEtCadeauxProps = { items?: Item[]; disabled?: boolean }

const ITEMS_DEFAUT: Item[] = [
  { label: 'Privatisation de la cave', description: 'Un lieu unique pour vos réceptions privées.',        href: '/evenements' },
  { label: 'Mariages et réceptions',   description: 'Célébrez vos plus grands moments entourés de vignes.', href: '/evenements' },
  { label: 'Cadeaux et entreprises',   description: 'Coffrets et séminaires sur mesure.',                   href: '/evenements' },
]

const COULEUR = '#357d4f'

export function EvenementsEtCadeaux({ items, disabled = false }: EvenementsEtCadeauxProps) {
  const cards = items && items.length > 0 ? items : ITEMS_DEFAUT

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none mb-4 text-zinc-900">
          Vos événements et cadeaux
        </h2>
        <p className=" max-w-xl mb-12">
          Privatisation, mariages, séminaires ou coffrets cadeaux - nous imaginons avec vous des moments autour du vin, sur mesure et inoubliables.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cards.map(({ label, description, href, imageUrl }, i) => {
            const content = (
              <>
                <Asset
                  name="square"
                  color={imageUrl ? undefined : COULEUR}
                  imageUrl={imageUrl}
                  className={`absolute inset-0 w-full h-full pointer-events-none [&_svg]:w-full [&_svg]:h-full ${disabled ? 'grayscale opacity-60' : ''}`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-7 text-white text-center">
                  <p className="font-accent text-lg uppercase leading-tight ">
                    {label}
                  </p>
                  {description && (
                    <p className=" text-white/90 mt-1 ">
                      {description}
                    </p>
                  )}
                  {!disabled && (
                    <span className="font-fontjek text-2xl mt-4 group-hover:text-yellow group-hover:translate-x-1 transition-all ">
                      ⟶
                    </span>
                  )}
                </div>
              </>
            )

            return disabled ? (
              <div
                key={label ?? i}
                aria-disabled="true"
                className="relative block w-full max-w-64 mx-auto aspect-square overflow-hidden cursor-not-allowed"
              >
                {content}
              </div>
            ) : (
              <Link
                key={label ?? i}
                href={href ?? '/evenements'}
                className="relative group block w-full max-w-64 mx-auto aspect-square overflow-hidden transition-transform hover:scale-[1.03]"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
