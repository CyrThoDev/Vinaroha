import Link from 'next/link'

export function ProRestaurateurs() {
  return (
    <section className="bg-background pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="border border-zinc-300 rounded-lg px-10 py-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-2xl font-black font-accent text-yellow  mb-3">
              Professionnels, restaurateurs&nbsp;?
            </p>
            <p className="   ">
              Un espace dédié pour vos commandes, tarifs pros et sélections pour vos cartes.
            </p>
          </div>
          <Link
            href="/pro"
            className="text-2xl font-fontjek text-black hover:text-orange transition-colors flex items-center gap-2"
          >
            Votre espace dédié
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
