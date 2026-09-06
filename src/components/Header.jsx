import { Menu, Moon, Sun, WifiOff } from 'lucide-react'
import Logo from './Logo.jsx'

/**
 * Bandeau fixe : retour à l'accueil, bascule clair/sombre et menu des rubriques.
 * Il reste visible en permanence — sur le plateau, on consulte le guide d'une
 * main, sans repartir du haut de la page.
 */
export default function Header({ theme, onToggleTheme, onOuvrirMenu, onAccueil, horsLigne }) {
  const sombre = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="safe-top">
        <div className="mx-auto flex h-[60px] max-w-2xl items-center gap-2 px-3 sm:px-4">
          <button
            type="button"
            onClick={onAccueil}
            className="flex items-center gap-2.5 rounded-xl py-1 pr-2 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            <Logo taille={48} className="h-10 w-10 sm:h-12 sm:w-12" />
            <span className="text-base font-bold tracking-tight sm:text-lg">
              Guide AP COND
            </span>
          </button>

          <div className="flex-1" />

          {horsLigne && (
            <span
              className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
              title="Guide consultable hors ligne"
            >
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden xs:inline">Hors ligne</span>
            </span>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={sombre ? 'Passer en thème clair' : 'Passer en thème sombre'}
            className="rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            {sombre ? (
              <Sun className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Moon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={onOuvrirMenu}
            aria-label="Ouvrir le menu des rubriques"
            aria-haspopup="dialog"
            className="rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
