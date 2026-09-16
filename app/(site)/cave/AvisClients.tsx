import { AvisSlider } from './AvisSlider'

type Avis = { citation?: string; auteur?: string }

type AvisClientsProps = {
  titre?: string
  googleNote?: number
  googleAvisCount?: number
  googleUrl?: string
  avis?: Avis[]
}

function Etoiles({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5 text-yellow" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.round(note) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function AvisClients({ titre, googleNote, googleAvisCount, googleUrl, avis }: AvisClientsProps) {
  const hasAvis = avis && avis.length > 0

  return (
    <section className="bg-background pb-16 px-6 py-14">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900 mb-6 text-center">
          {titre ?? 'Ils en parlent mieux que nous'}
        </h2>

        {googleNote != null ? (
          <a
            href={googleUrl ?? undefined}
            target={googleUrl ? '_blank' : undefined}
            rel={googleUrl ? 'noopener noreferrer' : undefined}
            className={`flex w-fit mx-auto items-center gap-3 mb-10 ${googleUrl ? 'hover:opacity-80 transition-opacity' : ''}`}
          >
            <Etoiles note={googleNote} />
            <span className="font-black text-zinc-900">{googleNote.toFixed(1)}/5</span>
            {googleAvisCount != null && (
              <span className="text-zinc-500">sur Google ({googleAvisCount} avis)</span>
            )}
          </a>
        ) : (
          <p className="text-zinc-400 italic mb-10 text-center">Note Google à renseigner dans le studio</p>
        )}

        {hasAvis ? (
          <AvisSlider avis={avis!} />
        ) : (
          <p className="text-zinc-400 italic">Ajoutez des avis clients mis en avant dans le studio</p>
        )}
      </div>
    </section>
  )
}
