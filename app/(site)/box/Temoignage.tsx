type TemoignageProps = {
  citation?: string
}

export function Temoignage({ citation }: TemoignageProps) {
  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto relative flex items-start gap-6">
        <span className="font-black text-6xl md:text-7xl text-zinc-300 leading-none shrink-0" aria-hidden="true">
          &ldquo;
        </span>
        <p className="text-lg md:text-xl text-zinc-800 leading-relaxed mt-3">
          {citation ?? 'Renseignez un avis client dans le studio Sanity.'}
        </p>
        <span className="hidden md:block font-black text-6xl md:text-7xl text-zinc-300 leading-none self-end shrink-0" aria-hidden="true">
          &rdquo;
        </span>
      </div>
    </section>
  )
}
