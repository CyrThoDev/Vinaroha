import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

const items = [
  { label: 'Privatisation de la cave', href: '/evenements' },
  { label: 'Mariages et réceptions',   href: '/evenements' },
  { label: 'Cadeaux et entreprises',   href: '/evenements' },
]

export function EvenementsEtCadeaux() {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-5xl md:text-6xl uppercase leading-none mb-4 text-zinc-900">
          Vos événements et cadeaux
        </h2>
        <p className=" max-w-xl mb-12">
          Privatisation, mariages, séminaires ou coffrets cadeaux — nous imaginons avec vous des moments autour du vin, sur mesure et inoubliables.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map(({ label, href }) => (
            <Link key={label} href={href} className="relative group block w-full max-w-64 mx-auto">
              <Asset
                name="square"
                color="#357d4f"
                className="w-full [&_svg]:w-full [&_svg]:h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
                <p className="font-accent text-lg uppercase leading-tight mb-2">{label}</p>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
