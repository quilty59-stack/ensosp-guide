import { Car, ChevronRight, MapPin } from 'lucide-react'
import { SCENARIOS } from '../../data/guide.js'
import { Card, PageHeader } from '../../ui.jsx'

/**
 * Les sept scénarios d'accident du guide (pages 23 à 29), accident aéronef
 * compris. Chaque entrée ouvre la fiche de mise en place du scénario.
 */
export default function AVP({ onNaviguer }) {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Car}
        accent="amber"
        title="Scénarios AVP"
        subtitle="Accidents de la voie publique et accident aéronef — pages 23 à 29 du guide."
      />

      <ul className="space-y-3">
        {SCENARIOS.map((s, i) => (
          <li key={s.id}>
            <Card
              as="button"
              type="button"
              onClick={() => onNaviguer(s.id)}
              className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60 dark:active:bg-slate-800"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-sm font-bold text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-snug">{s.nom}</span>
                <span className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="font-mono font-bold">{s.coordonnees}</span>
                  <span className="mx-1">·</span>
                  <span className="truncate">{s.acces[0]}</span>
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
