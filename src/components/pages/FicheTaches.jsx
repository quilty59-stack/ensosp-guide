import { useEffect, useMemo, useState } from 'react'
import { ClipboardList, Check, RotateCcw, Mail, Clock } from 'lucide-react'
import { FICHE_TACHES } from '../../data/guide.js'
import { Collapsible, PageHeader, Callout } from '../../ui.jsx'

const STORAGE_KEY = 'apcond:taches'

/** Identifiants stables pour la persistance des cases cochées. */
const TOUTES = FICHE_TACHES.flatMap((section) => {
  const directes = (section.taches ?? []).map((t, i) => `${section.id}-t${i}`)
  const creneaux = (section.creneaux ?? []).flatMap((c, ci) =>
    (c.taches ?? []).map((t, i) => `${section.id}-c${ci}-${i}`),
  )
  return [...directes, ...creneaux]
})

function lire() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function Tache({ id, label, coche, onToggle }) {
  const mail = label.match(/[\w.-]+@[\w.-]+\.\w+/)
  return (
    <li>
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={coche}
        className="flex w-full items-start gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
      >
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
            coche ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'
          }`}
        >
          {coche && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
        </span>
        <span
          className={`text-sm leading-snug ${
            coche ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {label}
        </span>
      </button>
      {mail && (
        <a
          href={`mailto:${mail[0]}`}
          className="ml-10 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          {mail[0]}
        </a>
      )}
    </li>
  )
}

export default function FicheTaches() {
  const [coches, setCoches] = useState(lire)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coches))
    } catch {
      /* la checklist reste valable pour la session */
    }
  }, [coches])

  const faites = useMemo(() => TOUTES.filter((id) => coches[id]).length, [coches])
  const toggle = (id) => setCoches((p) => ({ ...p, [id]: !p[id] }))
  const reset = () => {
    if (window.confirm('Décocher toutes les tâches de la semaine ?')) setCoches({})
  }

  return (
    <div className="space-y-5">
      <PageHeader
        icon={ClipboardList}
        accent="amber"
        title="Fiche de tâches AP COND"
        subtitle="Guide AP COND, pages 7 et 8. Les cases cochées sont mémorisées sur l’appareil."
      />

      <div className="flex items-center justify-between gap-3 px-1">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          <span className="font-bold tabular-nums text-slate-900 dark:text-slate-100">
            {faites}/{TOUTES.length}
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

      {FICHE_TACHES.map((section) => {
        const ids = [
          ...(section.taches ?? []).map((_, i) => `${section.id}-t${i}`),
          ...(section.creneaux ?? []).flatMap((c, ci) => (c.taches ?? []).map((_, i) => `${section.id}-c${ci}-${i}`)),
        ]
        const faits = ids.filter((id) => coches[id]).length
        return (
          <Collapsible
            key={section.id}
            icon={Clock}
            accent={section.id === 'lundi' ? 'amber' : section.id === 'semaine' ? 'blue' : 'emerald'}
            title={section.titre}
            subtitle={section.sous}
            defaultOpen={section.id === 'semaine'}
            right={
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold tabular-nums ${
                faits === ids.length && ids.length
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}>
                {faits}/{ids.length}
              </span>
            }
          >
            {section.creneaux?.map((creneau, ci) => (
              <div key={creneau.intitule + ci} className="mb-4 last:mb-0">
                <div className="mb-2 flex flex-wrap items-baseline gap-2">
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 font-mono text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {creneau.heure}
                  </span>
                  <h3 className="text-sm font-bold">{creneau.intitule}</h3>
                </div>
                {creneau.detail && (
                  <p className="mb-2 text-xs leading-snug text-slate-600 dark:text-slate-400">{creneau.detail}</p>
                )}
                {creneau.taches && (
                  <ul className="space-y-1">
                    {creneau.taches.map((label, i) => {
                      const id = `${section.id}-c${ci}-${i}`
                      return <Tache key={id} id={id} label={label} coche={Boolean(coches[id])} onToggle={toggle} />
                    })}
                  </ul>
                )}
              </div>
            ))}
            {section.taches && (
              <ul className="space-y-1">
                {section.taches.map((label, i) => {
                  const id = `${section.id}-t${i}`
                  return <Tache key={id} id={id} label={label} coche={Boolean(coches[id])} onToggle={toggle} />
                })}
              </ul>
            )}
          </Collapsible>
        )
      })}

      <Callout accent="slate" icon={ClipboardList} title="Source">
        Contenu repris intégralement de la fiche de tâches du Guide AP COND
        (rassemblement du lundi 07h30, présentation en remise 08h00 – 08h45,
        salle CS 08h45 – 09h00).
      </Callout>
    </div>
  )
}
