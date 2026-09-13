import { Asset } from '@/app/components/Asset'

type ProHeroProps = {
  titre?: string
  description?: string
  imageUrl?: string
  telephone?: string
  whatsapp?: string
}

const DESCRIPTION_DEFAUT =
  "Vous êtes restaurateur, caviste ou professionnel de la restauration ? Vin'Aroha vous accompagne avec une sélection de vins naturels, des tarifs adaptés et un suivi personnalisé pour votre carte."

export function ProHero({ titre, description, imageUrl, telephone, whatsapp }: ProHeroProps) {
  return (
    <section className="bg-background pt-10 pb-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <span className="inline-block bg-orange text-white rounded-full px-4 py-1 text-xs font-black uppercase  w-fit">
            Espace pro
          </span>
          <h1 className="font-accent text-5xl md:text-6xl uppercase leading-none text-zinc-900">
            {titre ?? 'Professionnels & restaurateurs'}
          </h1>
          <p className="max-w-md text-zinc-600 whitespace-pre-line">
            {description ?? DESCRIPTION_DEFAUT}
          </p>

          {(telephone || whatsapp) && (
            <div className="flex flex-wrap gap-3 mt-1">
              {telephone && (
                <a
                  href={`tel:${telephone.replace(/\s+/g, '')}`}
                  className="font-fontjek text-2xl border-b border-zinc-400 pb-1 flex items-center gap-2 hover:text-orange hover:border-orange transition-colors w-fit"
                >
                  Appeler &nbsp;⟶
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-fontjek text-2xl border-b border-zinc-400 pb-1 flex items-center gap-2 hover:text-[#25D366] hover:border-[#25D366] transition-colors w-fit"
                >
                  WhatsApp &nbsp;⟶
                </a>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-64 h-64">
            {imageUrl ? (
              <Asset
                name="rounded"
                imageUrl={imageUrl}
                alt={titre ?? 'Professionnels & restaurateurs'}
                className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
              />
            ) : (
              <Asset name="rounded" color="#e4e4e7" className="w-full h-full [&_svg]:w-full [&_svg]:h-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
