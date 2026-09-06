import { useState } from 'react'
import { ChevronRight, Map, Maximize2, Minus, Plus, Signpost, X } from 'lucide-react'
import { PLAN, RUES, SCENARIOS, SITES } from '../../data/guide.js'
import { SITES_NAV } from '../../navigation.js'
import { Card, PageHeader, Photo } from '../../ui.jsx'

const REPERES = [
  ...SITES.map((s) => ({ nom: s.nom, coord: s.coordonnees })),
  ...SCENARIOS.map((s) => ({ nom: s.nom, coord: s.coordonnees })),
]

/** Plan en plein écran, agrandissable au doigt comme au bouton. */
function PlanPleinEcran({ onFermer }) {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="fixed inset-0 z-[160] bg-slate-950">
      <div className="absolute right-3 top-3 z-10 flex gap-2 safe-top">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(1, z - 0.5))}
          aria-label="Réduire"
          disabled={zoom <= 1}
          className="rounded-full bg-slate-800/90 p-2.5 text-white disabled:opacity-40"
        >
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(4, z + 0.5))}
          aria-label="Agrandir"
          disabled={zoom >= 4}
          className="rounded-full bg-slate-800/90 p-2.5 text-white disabled:opacity-40"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onFermer}
          aria-label="Fermer le plan"
          className="rounded-full bg-slate-800/90 p-2.5 text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* touch-action laisse le pincer-écarter du navigateur agir sur l'image. */}
      <div className="h-full w-full overflow-auto" style={{ touchAction: 'pinch-zoom' }}>
        <img
          src="/images/plan-general.jpg"
          alt="Plan général du plateau technique de Vitrolles"
          className="mx-auto min-h-full origin-top object-contain transition-transform duration-200"
          style={{ width: `${zoom * 100}%`, maxWidth: 'none' }}
        />
      </div>
    </div>
  )
}

export default function Plan({ onNaviguer }) {
  const [plein, setPlein] = useState(false)

  return (
    <div className="space-y-5">
      <PageHeader
        icon={Map}
        accent="emerald"
        title={PLAN.titre}
        subtitle={`${PLAN.sousTitre} — mise à jour du ${PLAN.miseAJour}.`}
      />

      <Card className="overflow-hidden">
        <button
          type="button"
          onClick={() => setPlein(true)}
          className="relative block w-full"
          aria-label="Agrandir le plan général"
        >
          <Photo
            src="/images/plan-general.jpg"
            alt={`Plan général du plateau technique de Vitrolles — ${PLAN.quadrillage}`}
            ratio="aspect-[4/3]"
            className="rounded-none"
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/80 px-3 py-1.5 text-xs font-semibold text-white">
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            Agrandir
          </span>
        </button>
        <p className="px-4 py-2.5 text-xs text-slate-600 dark:text-slate-400">
          Quadrillage : {PLAN.quadrillage}.
        </p>
      </Card>

      <section>
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Sites de manœuvre
        </h2>
        <Card>
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {SITES_NAV.map(({ id, titre, repere, icone: Icone }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onNaviguer(id)}
                  className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60"
                >
                  <Icone className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span className="flex-1 font-medium">{titre}</span>
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {repere}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card className="p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Légende du plan
        </h2>
        <ul className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
          {PLAN.legende.map(({ couleur, libelle, contour }) => (
            <li key={libelle} className="flex items-center gap-2.5 text-sm">
              <span
                className="h-4 w-4 shrink-0 rounded-sm border-2"
                style={{
                  backgroundColor: contour ? 'transparent' : couleur,
                  borderColor: couleur,
                }}
                aria-hidden="true"
              />
              <span className="text-slate-700 dark:text-slate-300">{libelle}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Repères du quadrillage
        </h2>
        <ul className="grid gap-1.5 sm:grid-cols-2">
          {REPERES.map((r) => (
            <li key={r.nom} className="flex items-center gap-2 text-sm">
              <span className="w-16 shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-center font-mono text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900/60">
                {r.coord}
              </span>
              <span className="min-w-0 truncate text-slate-700 dark:text-slate-300">{r.nom}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <Signpost className="h-4 w-4" aria-hidden="true" />
          Index des rues ({RUES.length})
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {RUES.map((rue) => (
            <span
              key={rue}
              className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {rue}
            </span>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <Photo
            src="/images/index-rues-1.jpg"
            alt="Panneaux de rues du plateau, première planche"
            ratio="aspect-[2/3]"
          />
          <Photo
            src="/images/index-rues-2.jpg"
            alt="Panneaux de rues du plateau, seconde planche"
            ratio="aspect-[2/3]"
          />
        </div>
      </Card>

      {plein && <PlanPleinEcran onFermer={() => setPlein(false)} />}
    </div>
  )
}
