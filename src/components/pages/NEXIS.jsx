import { useMemo, useState } from 'react'
import { ClipboardList, Search, X } from 'lucide-react'
import { CODES_FREQUENTS, MOTIFS, normalise } from '../../data/nexis.js'
import { Card, EmptyState, PageHeader } from '../../ui.jsx'

/** Index de recherche calculé une fois : 365 motifs, saisie au doigt mouillé. */
const INDEX = MOTIFS.map((m) => ({
  ...m,
  recherche: normalise(`${m.court} ${m.libelle} ${m.label}`),
}))

/** Première tranche affichée : les 365 motifs d'un coup alourdiraient le défilement. */
const TRANCHE = 60

export default function NEXIS() {
  const [requete, setRequete] = useState('')
  const [code, setCode] = useState(null)
  const [limite, setLimite] = useState(TRANCHE)

  const resultats = useMemo(() => {
    const termes = normalise(requete).split(/\s+/).filter(Boolean)
    return INDEX.filter((m) => {
      if (code && m.court !== code) return false
      return termes.every((t) => m.recherche.includes(t))
    })
  }, [requete, code])

  // Toute nouvelle recherche repart du haut de la liste.
  const chercher = (valeur) => {
    setRequete(valeur)
    setLimite(TRANCHE)
  }
  const filtrer = (valeur) => {
    setCode(valeur)
    setLimite(TRANCHE)
  }

  const affiches = resultats.slice(0, limite)

  return (
    <div className="space-y-4">
      <PageHeader
        icon={ClipboardList}
        accent="violet"
        title="NEXIS — natures de fait"
        subtitle={`${MOTIFS.length} motifs de départ, annexe des pages 32 à 40 du guide.`}
      />

      <div className="sticky top-[calc(60px+var(--safe-top))] z-20 -mx-4 bg-slate-50/95 px-4 py-2 backdrop-blur dark:bg-slate-950/95">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={requete}
            onChange={(e) => chercher(e.target.value)}
            placeholder="Rechercher un motif, un code…"
            aria-label="Rechercher dans les natures de fait"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-violet-500 dark:border-slate-700 dark:bg-slate-900"
          />
          {requete && (
            <button
              type="button"
              onClick={() => chercher('')}
              aria-label="Effacer la recherche"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => filtrer(null)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              code === null
                ? 'bg-violet-600 text-white'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            Tous
          </button>
          {CODES_FREQUENTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => filtrer(code === c ? null : c)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                code === c
                  ? 'bg-violet-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="px-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-bold tabular-nums">{resultats.length}</span>{' '}
        {resultats.length > 1 ? 'motifs' : 'motif'}
        {code && ` pour « ${code} »`}
      </p>

      {resultats.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Aucun motif trouvé"
          hint="Essayez un autre terme, ou retirez le filtre de code."
        />
      ) : (
        <Card>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {affiches.map((m, i) => (
              <li key={`${m.court}-${m.libelle}-${i}`} className="p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 font-medium leading-snug">{m.libelle}</p>
                  <span className="shrink-0 rounded-md bg-violet-50 px-2 py-0.5 text-xs font-bold text-violet-700 ring-1 ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900/60">
                    {m.court}
                  </span>
                </div>
                {m.label && m.label !== m.libelle && (
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {m.label}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {limite < resultats.length && (
        <button
          type="button"
          onClick={() => setLimite((l) => l + TRANCHE)}
          className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Afficher {Math.min(TRANCHE, resultats.length - limite)} motifs de plus
          <span className="ml-1 tabular-nums text-slate-400">
            ({limite}/{resultats.length})
          </span>
        </button>
      )}
    </div>
  )
}
