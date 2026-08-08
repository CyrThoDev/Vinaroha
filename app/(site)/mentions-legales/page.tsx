import { ResetCookieButton } from '@/app/components/ResetCookieButton'

export const metadata = {
  title: "Mentions légales & Cookies",
  description: "Mentions légales, politique de confidentialité et gestion des cookies du site Vin'Aroha.",
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <main className="bg-background min-h-screen">

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-10">
        <p className="text-[0.625rem] font-black uppercase tracking-widest text-orange mb-4">Informations légales</p>
        <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
          Mentions légales<br />
          <span className="text-zinc-400">&amp; Cookies</span>
        </h1>
      </section>

      {/* Contenu */}
      <section className="max-w-3xl mx-auto px-6 pb-24 flex flex-col gap-14">

        {/* 1. Éditeur */}
        <Block title="1. Éditeur du site">
          <p>Le site <strong>vinaroha.com</strong> est édité par :</p>
          <ul>
            <li><strong>Raison sociale :</strong> Vin&apos;Aroha [à compléter]</li>
            <li><strong>Forme juridique :</strong> [à compléter]</li>
            <li><strong>SIRET :</strong> [à compléter]</li>
            <li><strong>Adresse :</strong> [adresse complète]</li>
            <li><strong>Téléphone :</strong> [numéro]</li>
            <li><strong>Email :</strong> contact@vinaroha.com</li>
            <li><strong>Directrice de publication :</strong> Delphine [nom à compléter]</li>
          </ul>
        </Block>

        {/* 2. Hébergeur */}
        <Block title="2. Hébergement">
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Société :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</li>
            <li><strong>Site :</strong> vercel.com</li>
          </ul>
        </Block>

        {/* 3. Propriété intellectuelle */}
        <Block title="3. Propriété intellectuelle">
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes) est la propriété exclusive de Vin&apos;Aroha, sauf mention contraire.
            Toute reproduction, représentation, modification ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par le Code de la propriété intellectuelle.
          </p>
        </Block>

        {/* 4. Données personnelles */}
        <Block title="4. Données personnelles &amp; RGPD">
          <p>
            Vin&apos;Aroha collecte des données personnelles uniquement dans le cadre de l&apos;inscription à la newsletter (adresse e-mail).
            Ces données sont utilisées exclusivement pour l&apos;envoi de communications commerciales et ne sont jamais cédées à des tiers.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants :
          </p>
          <ul>
            <li>Droit d&apos;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la portabilité</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@vinaroha.com" className="text-orange underline underline-offset-2">contact@vinaroha.com</a>
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange underline underline-offset-2">cnil.fr</a>).
          </p>
        </Block>

        {/* 5. Cookies */}
        <Block title="5. Politique de cookies">
          <p>
            Lors de votre visite sur vinaroha.com, des cookies peuvent être déposés sur votre navigateur.
            Un cookie est un petit fichier texte enregistré sur votre appareil qui permet d&apos;améliorer votre expérience de navigation.
          </p>

          <h3 className="text-lg font-black uppercase tracking-wide text-black mt-2">Cookies utilisés</h3>
          <table className="w-full  border-collapse mt-2">
            <thead>
              <tr className="border-b border-zinc-300">
                <th className="text-left py-2 pr-4 font-bold text-zinc-700">Nom</th>
                <th className="text-left py-2 pr-4 font-bold text-zinc-700">Finalité</th>
                <th className="text-left py-2 font-bold text-zinc-700">Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-200">
                <td className="py-2 pr-4 font-mono text-xs">cookie-consent</td>
                <td className="py-2 pr-4">Mémoriser votre choix de consentement aux cookies</td>
                <td className="py-2">Persistant (localStorage)</td>
              </tr>
            </tbody>
          </table>

          <p className=" text-xs mt-2">
            Ce site n&apos;utilise pas Google Analytics. Google Search Console est utilisé uniquement pour le référencement du site et ne dépose aucun cookie chez les visiteurs.
            Brevo est utilisé pour l&apos;envoi de la newsletter via une API — aucun cookie n&apos;est déposé sur votre navigateur lors de votre inscription.
          </p>

          <h3 className="text-lg font-black uppercase tracking-wide text-black mt-4">Gérer vos préférences</h3>
          <p>
            Vous pouvez accepter ou refuser les cookies via la bannière affichée lors de votre première visite.
            Vous pouvez également vider les données de votre navigateur pour ce site pour réinitialiser votre choix, ou cliquer ici :{' '}
            <ResetCookieButton />
          </p>
        </Block>

        {/* 6. Liens externes */}
        <Block title="6. Liens hypertextes">
          <p>
            Le site peut contenir des liens vers des sites tiers. Vin&apos;Aroha n&apos;est pas responsable du contenu de ces sites ni de leur politique de confidentialité.
          </p>
        </Block>

        {/* 7. Contact */}
        <Block title="7. Contact">
          <p>
            Pour toute question relative à ces mentions légales :{' '}
            <a href="mailto:contact@vinaroha.com" className="text-orange underline underline-offset-2">
              contact@vinaroha.com
            </a>
          </p>
          <p className="text-zinc-400 text-xs mt-2">
            Dernière mise à jour : juillet 2025
          </p>
        </Block>

      </section>
    </main>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-base font-black uppercase tracking-wide text-zinc-900 mb-5 pb-3 border-b border-zinc-200">
        {title}
      </h2>
      <div className="flex flex-col gap-3  text-zinc-600  [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-4 [&_ul]:list-disc [&_ul]:marker:text-zinc-400 [&_strong]:text-black [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  )
}
