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
          <span
            aria-disabled="true"
            className="text-2xl font-fontjek text-zinc-400 border-b border-zinc-300 pb-1 cursor-not-allowed flex items-center gap-2"
          >
            Votre espace dédié
            <span className="text-base">→</span>
          </span>
        </div>
      </div>
    </section>
  )
}
