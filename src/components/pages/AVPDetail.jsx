import { AlertTriangle, Car, MapPin, Package, Users } from 'lucide-react'
import { SCENARIOS } from '../../data/guide.js'
import { Callout, Card, PageHeader, Photo } from '../../ui.jsx'

/**
 * Fiche d'un scénario d'accident : coordonnées sur le plan, accès, matériel à
 * positionner et points de vigilance. Les sept scénarios du guide partagent
 * cette mise en page.
 */
export default function AVPDetail({ id }) {
  const s = SCENARIOS.find((x) => x.id === id)
  if (!s) return null

  return (
    <div className="space-y-5">
      <PageHeader
        icon={Car}
        accent="amber"
        title={s.nom}
        subtitle={s.detail ?? `Scénario d’accident — coordonnées ${s.coordonnees}.`}
      />

      <Card className="flex items-center gap-3 p-4">
        <MapPin className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Coordonnées
          </p>
          <p className="font-mono text-lg font-bold">{s.coordonnees}</p>
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          Accès
        </h2>
        <ul className="space-y-1.5">
          {s.acces.map((a) => (
            <li key={a} className="text-sm text-slate-700 dark:text-slate-300">
              {a}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            Mannequins
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">{s.mannequins}</p>
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            Accessoires
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">{s.accessoires}</p>
        </Card>
      </div>

      {s.vigilance && (
        <Callout icon={AlertTriangle} accent="amber" title="Points particuliers">
          {s.vigilance}
        </Callout>
      )}

      <section className="space-y-3">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Repérage
        </h2>
        <Photo
          src={s.plan}
          alt={`Repérage du scénario « ${s.nom} » sur le plan du plateau`}
          legende="Repérage sur le plan"
        />
        <Photo src={s.photo} alt={`Vue du lieu du scénario « ${s.nom} »`} legende="Vue du site" />
      </section>
    </div>
  )
}
