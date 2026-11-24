import {
  House,
  ClipboardList,
  MapPin,
  RadioTower,
  Users,
  TriangleAlert,
  Siren,
  Sun,
  Moon,
} from 'lucide-react'

/**
 * Source unique des 7 rubriques : la barre de navigation, l'en-tête de l'app
 * et les cartes de l'accueil lisent toutes cette liste.
 */
export const TABS = [
  {
    id: 'accueil',
    label: 'Accueil',
    title: 'Guide AP COND',
    icon: House,
    accent: 'red',
    description: "Vue d'ensemble et infos rapides de la semaine",
  },
  {
    id: 'taches',
    label: 'Tâches',
    title: 'Fiche de tâches',
    icon: ClipboardList,
    accent: 'amber',
    description: 'Lundi, quotidien et vendredi : 27 tâches à cocher',
  },
  {
    id: 'sites',
    label: 'Sites',
    title: "Sites d'entraînement",
    icon: MapPin,
    accent: 'emerald',
    description: 'Pavillon D2, Immeuble C3 et Zone urbaine E3',
  },
  {
    id: 'radio',
    label: 'Radio',
    title: 'Communications TPH 700',
    icon: RadioTower,
    accent: 'blue',
    description: '6 CS sur TGK 269 + 2 canaux spécialisés',
  },
  {
    id: 'organigramme',
    label: 'Équipe',
    title: 'Organigramme',
    icon: Users,
    accent: 'violet',
    description: 'Plateau technique et numéros à composer en premier',
  },
  {
    id: 'accident',
    label: 'Accident',
    title: 'Conduite à tenir',
    icon: TriangleAlert,
    accent: 'red',
    description: 'Arbre de décision en 7 étapes, OUI / NON',
  },
  {
    id: 'nexis',
    label: 'NEXIS',
    title: 'Motifs de départ',
    icon: Siren,
    accent: 'blue',
    description: 'Motifs NEXIS : recherche et filtres par catégorie',
  },
]

export default function Navigation({ current, onChange, theme, onToggleTheme }) {
  const dark = theme === 'dark'

  return (
    <>
      {/* Bascule clair / sombre, posée juste au-dessus de la barre d'onglets. */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
        title={dark ? 'Mode clair' : 'Mode sombre'}
        className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition-transform active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300"
      >
        {dark ? (
          <Sun className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Moon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90"
      >
        <ul className="safe-bottom mx-auto grid max-w-2xl grid-cols-7">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = current === id
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onChange(id)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full flex-col items-center gap-1 px-0.5 pb-2 pt-2.5 transition-colors ${
                    active
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'
                  }`}
                >
                  <span
                    className={`flex h-7 w-full max-w-[3rem] items-center justify-center rounded-lg transition-colors ${
                      active ? 'bg-red-50 dark:bg-red-950/50' : ''
                    }`}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={active ? 2.4 : 1.9}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[10px] font-medium leading-none tracking-tight">
                    {label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
