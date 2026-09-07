import { Building2, ChevronRight, Layers, MapPin } from 'lucide-react'
import { SITES } from '../../data/guide.js'
import { SITES_NAV } from '../../navigation.js'
import { Card, PageHeader } from '../../ui.jsx'

/**
 * Les cinq sites de manœuvre du plateau. Chaque entrée montre ce qu'on cherche
 * avant de partir — coordonnées sur le plan, gabarit du bâtiment, vignette —
 * et ouvre la fiche complète.
 */
export default function SitesPage({ onNaviguer }) {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Building2}
        accent="emerald"
        title="Sites de manœuvre"
        subtitle="Les cinq sites du plateau technique — pages 13 à 22 du guide."
      />

      <ul className="space-y-3">
        {SITES_NAV.map(({ id, titre, repere }) => {
          const site = SITES.find((s) => s.id === id)
          return (
            <li key={id}>
              <Card
                as="button"
                type="button"
                onClick={() => onNaviguer(id)}
                className="flex w-full items-center gap-3 overflow-hidden p-3 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60 dark:active:bg-slate-800"
              >
                <img
                  src={site.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-xl bg-slate-100 object-cover dark:bg-slate-800"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-bold">{titre}</span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="font-mono font-bold">{repere}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                      {site.type}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-xs text-slate-500 dark:text-slate-400">
                    {site.adresses[0].valeur}
                  </span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              </Card>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
