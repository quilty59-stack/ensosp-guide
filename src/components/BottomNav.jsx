import { RACCOURCIS } from '../navigation.js'

/**
 * Barre fixe du bas : quatre raccourcis autour du retour à l'accueil, mis en
 * avant par une pastille surélevée pour être atteint au pouce sans regarder.
 */
export default function BottomNav({ courant, onNaviguer }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95"
    >
      <div className="safe-bottom">
        <ul className="mx-auto flex h-[70px] max-w-2xl items-stretch">
          {RACCOURCIS.map(({ id, libelle, icone: Icone, principal }) => {
            const actif = id === courant
            if (principal) {
              return (
                <li key={id} className="flex flex-1 justify-center">
                  <button
                    type="button"
                    onClick={() => onNaviguer(id)}
                    aria-current={actif ? 'page' : undefined}
                    className="-mt-5 flex flex-col items-center gap-1"
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ring-4 transition-colors ${
                        actif
                          ? 'bg-red-600 ring-white dark:ring-slate-900'
                          : 'bg-slate-500 ring-white dark:bg-slate-600 dark:ring-slate-900'
                      }`}
                    >
                      <Icone className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <span
                      className={`text-[15px] font-extrabold uppercase leading-none tracking-wide ${
                        actif ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {libelle}
                    </span>
                  </button>
                </li>
              )
            }
            return (
              <li key={id} className="flex-1">
                <button
                  type="button"
                  onClick={() => onNaviguer(id)}
                  aria-current={actif ? 'page' : undefined}
                  className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-colors ${
                    actif
                      ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400'
                      : 'text-slate-500 hover:bg-slate-50 active:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icone className="h-5 w-5" aria-hidden="true" />
                  <span className="text-xs font-medium leading-none">{libelle}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
