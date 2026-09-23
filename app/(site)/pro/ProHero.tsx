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
    <section className="relative overflow-hidden bg-green">
      <Asset
        name="grapes"
        color="#ffffff"
        className="absolute -top-8 -right-10 w-40 md:w-56 opacity-10 pointer-events-none select-none [&_svg]:w-full [&_svg]:h-auto"
      />
      <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5">
          <span className="inline-block bg-orange text-white rounded-lg px-4 py-2  font-black uppercase  w-fit">
            Espace pro
          </span>
          <h1 className="font-accent text-5xl md:text-6xl uppercase leading-none text-white">
            {titre ?? 'Professionnels & restaurateurs'}
          </h1>
          <p className="max-w-md text-white/85 whitespace-pre-line">
            {description ?? DESCRIPTION_DEFAUT}
          </p>

          {(telephone || whatsapp) && (
            <div className="flex flex-wrap gap-3 mt-1">
              {telephone && (
                <a
                  href={`tel:${telephone.replace(/\s+/g, '')}`}
                  className="font-urbanist font-bold uppercase  bg-zinc-900 text-white rounded-lg px-6 py-2.5 flex items-center gap-2 hover:opacity-80 transition-opacity w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow"
                >
                  Appeler &nbsp;⟶
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-urbanist font-bold uppercase  bg-yellow text-zinc-900 rounded-lg px-6 py-2.5 flex items-center gap-2 hover:opacity-80 transition-opacity w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange"
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
                name="topandbottom"
                imageUrl={imageUrl}
                alt={titre ?? 'Professionnels & restaurateurs'}
                className="w-full h-full [&_svg]:w-full [&_svg]:h-full"
              />
            ) : (
              <Asset name="topandbottom" color="#ffffff" className="w-full h-full opacity-20 [&_svg]:w-full [&_svg]:h-full" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
