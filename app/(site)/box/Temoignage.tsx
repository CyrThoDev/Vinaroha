type TemoignageProps = {
  citation?: string
  auteur?: string
}

export function Temoignage({ citation, auteur }: TemoignageProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="font-black text-6xl md:text-7xl text-zinc-300 leading-none" aria-hidden="true">
          &ldquo;
        </span>
        <p className="text-base md:text-lg text-zinc-800 leading-relaxed -mt-4 md:whitespace-nowrap">
          {citation ?? 'Renseignez un avis client dans le studio Sanity.'}
        </p>
        {auteur && (
          <p className="text-base text-zinc-500 mt-3">— {auteur}</p>
        )}
      </div>
    </section>
  )
}
