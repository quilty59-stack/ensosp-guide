import { useEffect, useMemo, useState } from 'react'
import {
  ClipboardList,
  Clock,
  Sunrise,
  Repeat,
  CalendarDays,
  RotateCcw,
  Check,
  Mail,
} from 'lucide-react'
import { Card, Collapsible, PageHeader } from '../ui.jsx'

const HORAIRES = [
  { jour: 'Lundi', matin: '07h30 - 12h00', aprem: '13h30 - 17h30', note: 'Prise de service + accueil des stagiaires' },
  { jour: 'Mardi', matin: '07h45 - 12h00', aprem: '13h30 - 17h30', note: 'Rassemblement puis ateliers' },
  { jour: 'Mercredi', matin: '07h45 - 12h00', aprem: '13h30 - 17h30', note: 'Ateliers plateau' },
  { jour: 'Jeudi', matin: '07h45 - 12h00', aprem: '13h30 - 17h30', note: 'Ateliers + évaluations' },
  { jour: 'Vendredi', matin: '07h45 - 12h00', aprem: '—', note: 'Clôture : carburant, lavage, inventaire' },
]

const SECTIONS = [
  {
    id: 'lundi',
    titre: 'Lundi — Ouverture de semaine',
    sous: '10 tâches : contrôle des EPI, des ARI et des engins',
    icon: Sunrise,
    accent: 'amber',
    taches: [
      { id: 'l1', label: 'Contrôle des EPI de la section : casques, gants, vestes, sur-pantalons, rangers, gilets HV' },
      { id: 'l2', label: 'Contrôle des ARI : pression des bouteilles, masques, essai d’étanchéité et de l’alarme sonore' },
      { id: 'l3', label: 'Contrôle du FPT : niveaux, carburant, dotation des coffres, tuyaux et lances' },
      { id: 'l4', label: 'Contrôle de la MEA : calage, stabilisateurs, commandes, essai de déploiement du parc échelle' },
      { id: 'l5', label: 'Contrôle du VSR : groupe hydraulique, cisaille, écarteur, vérins, cales et sangles' },
      { id: 'l6', label: 'Essai de la pompe du FPT : amorçage, montée en pression et débit' },
      { id: 'l7', label: 'Remplissage de la tonne et contrôle du niveau d’eau des engins porteurs' },
      { id: 'l8', label: 'Distribution des TPH 700 et essai radio sur le canal du CS (TGK 269)' },
      { id: 'l9', label: 'Balisage et signalétique des 3 sites : Pavillon D2, Immeuble C3, Zone urbaine E3' },
      { id: 'l10', label: 'Accueil des stagiaires, émargement et consignes générales de sécurité' },
    ],
  },
  {
    id: 'quotidien',
    titre: 'Tous les jours',
    sous: '6 tâches : rassemblement, engins, consignes, rangement',
    icon: Repeat,
    accent: 'blue',
    taches: [
      { id: 'q1', label: 'Rassemblement de la section : brief du jour et répartition des ateliers' },
      { id: 'q2', label: 'Contrôle des engins avant départ : tour du véhicule, niveaux, feux, avertisseurs' },
      { id: 'q3', label: 'Rappel des consignes de sécurité et de la conduite à tenir en manœuvre' },
      { id: 'q4', label: 'Contrôle des vitesses sur le plateau : allure au pas dans les zones piétons' },
      { id: 'q5', label: 'Rangement du matériel et remise en état des ateliers après chaque rotation' },
      { id: 'q6', label: 'Remisage des engins en fin de journée et compte rendu des anomalies' },
    ],
  },
  {
    id: 'vendredi',
    titre: 'Vendredi — Clôture',
    sous: '11 tâches : carburant, lavage, inventaire et remise en état',
    icon: CalendarDays,
    accent: 'emerald',
    taches: [
      { id: 'v1', label: 'Plein de carburant de tous les engins avant remisage' },
      { id: 'v2', label: 'Lavage extérieur des engins (châssis, jantes, feux)' },
      { id: 'v3', label: 'Nettoyage des cabines, des coffres et des accès' },
      { id: 'v4', label: 'Inventaire des engins par lecture des QR codes' },
      { id: 'v5', label: 'Envoi de l’inventaire et des besoins au magasin central', mail: 'magasin-central@ensosp.fr' },
      { id: 'v6', label: 'Recomplètement des bouteilles ARI : gonflage et échange des bouteilles vides' },
      { id: 'v7', label: 'Nettoyage et désinfection des masques et harnais ARI' },
      { id: 'v8', label: 'Nettoyage et contrôle des casques : jugulaires, écrans, bavolets' },
      { id: 'v9', label: 'Nettoyage des locaux, des ateliers et des zones de stockage' },
      { id: 'v10', label: 'Restitution des TPH 700 et mise en charge pour la semaine suivante' },
      { id: 'v11', label: 'Remise des 3 sites en configuration initiale, fermeture et coupure des énergies' },
    ],
  },
]

const STORAGE_KEY = 'apcond:taches'

function readChecked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function FicheTaches() {
  const [checked, setChecked] = useState(readChecked)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked))
    } catch {
      /* la checklist reste valable pour la session */
    }
  }, [checked])

  const total = useMemo(
    () => SECTIONS.reduce((n, s) => n + s.taches.length, 0),
    [],
  )
  const done = useMemo(
    () =>
      SECTIONS.reduce(
        (n, s) => n + s.taches.filter((t) => checked[t.id]).length,
        0,
      ),
    [checked],
  )

  const toggle = (id) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))

  const reset = () => {
    if (window.confirm('Décocher toutes les tâches de la semaine ?')) {
      setChecked({})
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        icon={ClipboardList}
        accent="amber"
        title="Fiche de tâches"
        subtitle="Horaires de la semaine et checklist du plateau conduite. Les cases cochées sont mémorisées sur l’appareil."
      />

      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Clock
            className="h-5 w-5 text-amber-600 dark:text-amber-400"
            aria-hidden="true"
          />
          <h2 className="font-semibold">Horaires</h2>
        </div>
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[22rem] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <th className="px-1 pb-2 font-semibold">Jour</th>
                <th className="px-1 pb-2 font-semibold">Matin</th>
                <th className="px-1 pb-2 font-semibold">Après-midi</th>
              </tr>
            </thead>
            <tbody>
              {HORAIRES.map(({ jour, matin, aprem, note }) => (
                <tr
                  key={jour}
                  className="border-t border-slate-200 align-top dark:border-slate-800"
                >
                  <td className="px-1 py-2">
                    <span className="font-semibold">{jour}</span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      {note}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-1 py-2 tabular-nums">{matin}</td>
                  <td className="whitespace-nowrap px-1 py-2 tabular-nums">{aprem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {done}/{total}
          </span>{' '}
          tâches réalisées
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Réinitialiser
        </button>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const faits = section.taches.filter((t) => checked[t.id]).length
          const complet = faits === section.taches.length
          return (
            <Collapsible
              key={section.id}
              icon={section.icon}
              accent={section.accent}
              title={section.titre}
              subtitle={section.sous}
              defaultOpen={section.id === 'quotidien'}
              right={
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                    complet
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {faits}/{section.taches.length}
                </span>
              }
            >
              <ul className="space-y-1">
                {section.taches.map((tache) => {
                  const actif = Boolean(checked[tache.id])
                  return (
                    <li key={tache.id}>
                      <button
                        type="button"
                        onClick={() => toggle(tache.id)}
                        aria-pressed={actif}
                        className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                            actif
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {actif && (
                            <Check
                              className="h-3.5 w-3.5"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          )}
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            actif
                              ? 'text-slate-400 line-through dark:text-slate-500'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {tache.label}
                        </span>
                      </button>
                      {tache.mail && (
                        <a
                          href={`mailto:${tache.mail}`}
                          className="ml-10 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          {tache.mail}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Collapsible>
          )
        })}
      </div>
    </div>
  )
}
