import { CalendarClock, ClipboardList, ListChecks, Map, Sunrise } from 'lucide-react'
import { ROLE_AP } from '../../data/guide.js'
import { Card } from '../../ui.jsx'
import Logo from '../Logo.jsx'

/**
 * Rassemblement du jour, d'après le tableau des horaires (page 9).
 * Le lundi ouvre la semaine par un rassemblement général ; le vendredi la
 * referme par les inventaires et la restitution.
 */
const JOURS = [
  { cle: 0, nom: 'Dimanche' },
  { cle: 1, nom: 'Lundi', heure: '07h30', detail: 'Rassemblement général, perception des effets et inventaire des matériels' },
  { cle: 2, nom: 'Mardi', heure: '07h45', detail: 'Trois MSP et leurs débriefings, matin et après-midi' },
  { cle: 3, nom: 'Mercredi', heure: '07h45', detail: 'Trois MSP et leurs débriefings, matin et après-midi' },
  { cle: 4, nom: 'Jeudi', heure: '07h45', detail: 'Trois MSP et leurs débriefings, matin et après-midi' },
  { cle: 5, nom: 'Vendredi', heure: '07h45', detail: 'MSP puis restitution des effets, inventaire des matériels, nettoyage et plein d’essence' },
  { cle: 6, nom: 'Samedi' },
]

const RACCOURCIS = [
  { id: 'taches', titre: 'Tâches', icone: ListChecks },
  { id: 'horaires', titre: 'MSP', icone: CalendarClock },
  { id: 'plan', titre: 'Sites', icone: Map },
  { id: 'nexis', titre: 'NEXIS', icone: ClipboardList },
]

export default function Accueil({ onNaviguer }) {
  const jour = JOURS[new Date().getDay()]

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center pt-2 text-center">
        <Logo taille={200} className="h-32 w-32 sm:h-40 sm:w-40" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Guide AP COND
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Assistant pédagogique conducteur — plateau technique de Vitrolles
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-start gap-3 p-4">
          <span className="mt-0.5 rounded-xl bg-red-50 p-2.5 ring-1 ring-red-200 dark:bg-red-950/40 dark:ring-red-900/60">
            <Sunrise className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {jour.nom}
            </p>
            {jour.heure ? (
              <>
                <p className="text-lg font-bold">Rassemblement {jour.heure}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {jour.detail}
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-bold">Pas de MSP programmée</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  La semaine reprend le lundi par le rassemblement général de 07h30.
                </p>
              </>
            )}
          </div>
        </div>
      </Card>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Rôle de l’assistant pédagogique
        </h2>
        <Card>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {ROLE_AP.map((point, i) => (
              <li key={point} className="flex gap-3 p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Accès rapide
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {RACCOURCIS.map(({ id, titre, icone: Icone }) => (
            <Card
              as="button"
              key={id}
              type="button"
              onClick={() => onNaviguer(id)}
              className="flex items-center gap-3 p-4 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60 dark:active:bg-slate-800"
            >
              <Icone className="h-6 w-6 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
              <span className="font-semibold">{titre}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
