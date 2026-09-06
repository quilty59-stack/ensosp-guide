import { AlertTriangle, Car, MapPin, Package, Users } from 'lucide-react'
import { SCENARIOS } from '../../data/guide.js'
import { Callout, Collapsible, PageHeader, Photo } from '../../ui.jsx'

/**
 * Les sept scénarios d'accident du guide (pages 23 à 29), accident aéronef
 * compris. Chaque fiche donne les coordonnées sur le plan, les accès, le
 * matériel à positionner et les points de vigilance.
 */
export default function AVP() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Car}
        accent="amber"
        title="Scénarios AVP"
        subtitle="Accidents de la voie publique et accident aéronef — pages 23 à 29 du guide."
      />

      {SCENARIOS.map((s, i) => (
        <Collapsible
          key={s.id}
          icon={Car}
          accent={i % 2 ? 'amber' : 'red'}
          title={s.nom}
          subtitle={s.detail}
          defaultOpen={i === 0}
          right={
            <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {s.coordonnees}
            </span>
          }
        >
          <div className="space-y-4">
            <div>
              <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Accès
              </h3>
              <ul className="space-y-1">
                {s.acces.map((a) => (
                  <li key={a} className="text-sm text-slate-700 dark:text-slate-300">
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" />
                  Mannequins
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">{s.mannequins}</p>
              </div>
              <div>
                <h3 className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <Package className="h-3.5 w-3.5" aria-hidden="true" />
                  Accessoires
                </h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">{s.accessoires}</p>
              </div>
            </div>

            {s.vigilance && (
              <Callout icon={AlertTriangle} accent="amber" title="Points particuliers">
                {s.vigilance}
              </Callout>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Photo
                src={s.plan}
                alt={`Repérage du scénario « ${s.nom} » sur le plan`}
                legende="Repérage sur le plan"
              />
              <Photo
                src={s.photo}
                alt={`Vue du lieu du scénario « ${s.nom} »`}
                legende="Vue du site"
              />
            </div>
          </div>
        </Collapsible>
      ))}
    </div>
  )
}
