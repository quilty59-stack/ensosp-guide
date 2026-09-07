import { ChevronLeft, Menu, Moon, Sun, WifiOff } from 'lucide-react'
import Logo from './Logo.jsx'

/**
 * Bandeau fixe : retour à l'écran précédent, retour à l'accueil, bascule
 * clair/sombre et menu des rubriques. Il reste visible en permanence — sur le
 * plateau, on consulte le guide d'une main, sans repartir du haut de la page.
 */
export default function Header({
  theme,
  onToggleTheme,
  onOuvrirMenu,
  onAccueil,
  onRetour,
  horsLigne,
}) {
  const sombre = theme === 'dark'

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="safe-top">
        <div className="mx-auto flex h-[60px] max-w-2xl items-center gap-1 px-2 sm:gap-2 sm:px-4">
          {onRetour && (
            <button
              type="button"
              onClick={onRetour}
              className="-ml-1 flex shrink-0 items-center gap-0.5 rounded-xl py-2 pl-1 pr-2 font-semibold text-red-600 transition-colors hover:bg-red-50 active:bg-red-100 dark:text-red-400 dark:hover:bg-red-950/50"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              Retour
            </button>
          )}

          <button
            type="button"
            onClick={onAccueil}
            aria-label="Revenir à l’accueil"
            className="flex min-w-0 items-center gap-2 rounded-xl py-1 pr-1 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700 sm:pr-2"
          >
            <Logo taille={48} className="h-10 w-10 sm:h-12 sm:w-12" />
            {/* Avec le bouton retour, le titre ne tient plus sur les petits
                écrans : il réapparaît dès qu'il y a la place. */}
            <span
              className={`truncate text-base font-bold tracking-tight sm:text-lg ${
                onRetour ? 'hidden xs:inline' : ''
              }`}
            >
              Guide AP COND
            </span>
          </button>

          <div className="flex-1" />

          {horsLigne && (
            <span
              className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
              title="Guide consultable hors ligne"
            >
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Hors ligne</span>
            </span>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={sombre ? 'Passer en thème clair' : 'Passer en thème sombre'}
            className="shrink-0 rounded-xl p-2.5 text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700"
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
            className="shrink-0 rounded-xl p-2.5 text-slate-700 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
