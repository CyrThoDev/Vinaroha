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
                  className="inline-flex items-center gap-2 bg-black text-white font-black uppercase text-sm px-5 py-3 rounded-lg hover:opacity-80 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                  </svg>
                  Appeler
                </a>
              )}
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-black uppercase text-sm px-5 py-3 rounded-lg hover:opacity-80 transition-opacity"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 00-8.5 15.24L2 22l4.9-1.46A10 10 0 1012 2zm5.62 14.32c-.24.68-1.39 1.3-1.92 1.35-.49.05-1.02.24-3.43-.75-2.9-1.2-4.76-4.15-4.9-4.35-.14-.19-1.17-1.6-1.17-3.05 0-1.45.75-2.15 1.02-2.45.27-.29.58-.36.78-.36l.55.01c.18.01.42-.07.65.5.24.6.82 2.05.89 2.2.07.14.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.14.14-.29.29-.13.58.17.29.75 1.26 1.6 2.04 1.1 1.01 2.03 1.33 2.32 1.48.29.14.46.12.63-.07.17-.19.71-.8.9-1.08.19-.29.38-.24.63-.14.26.1 1.65.79 1.93.94.29.14.48.21.55.33.07.12.07.68-.17 1.36z"/>
                  </svg>
                  WhatsApp
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
