import Link from 'next/link'
import { Asset } from '@/app/components/Asset'

type RencontrerProducteursProps = {
  titre?: string
  texte?: string
}

const TEXTE_DEFAUT =
  "Chaque mois, des vignerons passent à la cave pour des dégustations commentées. C'est gratuit, c'est convivial, et ça finit rarement à l'heure."

export function RencontrerProducteurs({ titre, texte }: RencontrerProducteursProps) {
  return (
    <section className="bg-green px-6 py-20 relative">
      <Asset
        name="leaf"
        color="#E56B00"
        color2="#EBB132"
        className="absolute -top-20 left-6 md:left-16 w-28 md:w-32 -rotate-12 pointer-events-none select-none z-10 [&_svg]:w-full [&_svg]:h-auto"
      />
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
        <h2 className="font-black text-2xl md:text-3xl text-white leading-tight">
          {titre ?? 'Envie de les rencontrer nos producteurs en vrai ?'}
        </h2>
        <p className="text-white/80">
          {texte ?? TEXTE_DEFAUT}
        </p>
        <Link
          href="/agenda"
          className="font-fontjek text-2xl border-b border-white/40 pb-1 flex items-center gap-2 text-white hover:text-background hover:border-background transition-colors mt-2"
        >
          Voir tout l&apos;agenda &nbsp;⟶
        </Link>
      </div>
    </section>
  )
}
