import { Asset } from '@/app/components/Asset'
import { CaveMapLoader } from './CaveMapLoader'

type PlageHoraire = { jours?: string; heures?: string }

type InfosPratiquesProps = {
  titre?: string
  description?: string
  adresse?: string
  telephone?: string
  latitude?: number
  longitude?: number
  latitudeHalles?: number
  longitudeHalles?: number
  horairesCave?: PlageHoraire[]
  horairesHalles?: PlageHoraire[]
}

const DESCRIPTION_DEFAUT =
  "Une cave, ce n'est pas qu'un comptoir. C'est un lieu où l'on se réunit, où l'on célèbre, et où l'on trouve la bouteille juste à offrir."

function LigneHoraire({ label, plages }: { label: string; plages?: PlageHoraire[] }) {
  if (!plages || plages.length === 0) return null
  return (
    <li className="flex gap-2">
      <span className="w-24 shrink-0">{label}&nbsp;:</span>
      <span>{plages.map(p => [p.jours, p.heures].filter(Boolean).join(' ')).join(' · ')}</span>
    </li>
  )
}

export function InfosPratiques({
  titre, description, adresse, telephone, latitude, longitude, latitudeHalles, longitudeHalles, horairesCave, horairesHalles,
}: InfosPratiquesProps) {
  const hasCoords = latitude != null && longitude != null
  const hasHallesCoords = latitudeHalles != null && longitudeHalles != null
  const markers = [
    ...(hasCoords ? [{ lat: latitude, lng: longitude, label: titre ?? 'La Cave' }] : []),
    ...(hasHallesCoords ? [{ lat: latitudeHalles, lng: longitudeHalles, label: 'Les Halles' }] : []),
  ]
  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
    : adresse
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${adresse}, Mimizan, France`)}`
      : null

  return (
    <section className="bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:items-center">
        <div className="flex flex-col gap-6">
          <h1 className="font-accent text-4xl md:text-5xl uppercase leading-none text-zinc-900">
            {titre ?? 'La Cave'}
          </h1>
          <p className="text-zinc-600 whitespace-pre-line max-w-md">
            {description ?? DESCRIPTION_DEFAUT}
          </p>

          {adresse && (
            <div>
              <p className="font-black text-zinc-900 mb-1">Adresse</p>
              <p className="text-zinc-600">{adresse}</p>
            </div>
          )}

          {telephone && (
            <div>
              <p className="font-black text-zinc-900 mb-1">Téléphone</p>
              <a href={`tel:${telephone.replace(/\s+/g, '')}`} className="text-zinc-600 hover:text-orange transition-colors">
                {telephone}
              </a>
            </div>
          )}

          {(horairesCave?.length || horairesHalles?.length) ? (
            <div>
              <p className="font-black text-zinc-900 mb-1">Horaires</p>
              <ul className="text-zinc-600">
                <LigneHoraire label="La cave" plages={horairesCave} />
                <LigneHoraire label="Les Halles" plages={horairesHalles} />
              </ul>
            </div>
          ) : null}

          {directionsUrl && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-2xl font-fontjek text-black w-fit flex items-center gap-2 border-b border-zinc-400 pb-0.5 hover:text-orange hover:border-orange transition-colors"
            >
              Itinéraire ⟶
            </a>
          )}
        </div>

        <div className="w-full h-96 md:h-112">
          {markers.length > 0 ? (
            <Asset name="square" className="w-full h-full">
              <CaveMapLoader markers={markers} />
            </Asset>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-100 text-zinc-400 italic rounded-lg">
              Coordonnées à renseigner dans le studio
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
