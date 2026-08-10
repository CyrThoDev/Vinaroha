type TemoignageProps = {
  citation?: string
  auteur?: string
}

export function Temoignage({ citation, auteur }: TemoignageProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto relative flex items-start gap-6">
        <span className="font-black text-6xl md:text-7xl text-zinc-300 leading-none shrink-0" aria-hidden="true">
          &ldquo;
        </span>
        <div className="mt-3">
          <p className="text-lg md:text-xl text-zinc-800 leading-relaxed">
            {citation ?? 'Renseignez un avis client dans le studio Sanity.'}
          </p>
          {auteur && (
            <p className="text-sm text-zinc-500 mt-3">— {auteur}</p>
          )}
        </div>
        <span className="hidden md:block font-black text-6xl md:text-7xl text-zinc-300 leading-none self-end shrink-0" aria-hidden="true">
          &rdquo;
        </span>
      </div>
    </section>
  )
}
