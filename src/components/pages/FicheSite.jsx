import { AlertTriangle, Building2, Layers, MapPin, Navigation } from 'lucide-react'
import { SITES } from '../../data/guide.js'
import { Callout, Card, PageHeader, Photo } from '../../ui.jsx'

/**
 * Fiche d'un site de manœuvre : coordonnées sur le plan, adresses d'accès,
 * points particuliers et vues du bâtiment (photo, repérage, vue 3D).
 * Les cinq sites du guide partagent cette mise en page.
 */
export default function FicheSite({ id }) {
  const site = SITES.find((s) => s.id === id)
  if (!site) return null

  const { nom, coordonnees, type, accent, adresses, points, alerte, photo, plan, vue3d, galerie } = site

  return (
    <div className="space-y-5">
      <PageHeader
        icon={Building2}
        accent={accent}
        title={nom}
        subtitle={`Site de manœuvre — coordonnées ${coordonnees} sur le plan du plateau.`}
      />

      <div className="grid grid-cols-2 gap-3">
        <Card className="flex items-center gap-3 p-4">
          <MapPin className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Coordonnées
            </p>
            <p className="font-mono text-lg font-bold">{coordonnees}</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3 p-4">
          <Layers className="h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Type
            </p>
            <p className="font-semibold leading-tight">{type}</p>
          </div>
        </Card>
      </div>

      {alerte && (
        <Callout icon={AlertTriangle} accent="red" title="Accès réglementé">
          {alerte}
        </Callout>
      )}

      <Card className="p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          Adresses
        </h2>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {adresses.map(({ libelle, valeur }) => (
            <li key={libelle} className="py-2.5 first:pt-0 last:pb-0">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {libelle}
              </p>
              <p className="font-medium">{valeur}</p>
            </li>
          ))}
        </ul>
      </Card>

      {points?.length > 0 && (
        <Card className="p-4">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Points particuliers
          </h2>
          <ul className="space-y-2">
            {points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" aria-hidden="true" />
                <span className="text-slate-700 dark:text-slate-300">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <section className="space-y-3">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Vues du site
        </h2>
        <Photo
          src={photo}
          alt={`Photographie du site ${nom}`}
          ratio="aspect-[3/4]"
          legende={`${nom} — photographie du guide`}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Photo
            src={plan}
            alt={`Repérage du site ${nom} sur le plan du plateau`}
            legende="Repérage sur le plan"
          />
          <Photo
            src={vue3d}
            alt={`Vue en trois dimensions du site ${nom}`}
            legende="Vue 3D"
          />
        </div>
        {galerie?.map((src) => (
          <Photo key={src} src={src} alt={`Détail du site ${nom}`} />
        ))}
      </section>
    </div>
  )
}
