import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { PAGES } from '../navigation.js'
import Logo from './Logo.jsx'

/**
 * Panneau des seize rubriques, dans l'ordre du sommaire papier.
 * Se ferme au clic sur la croix, sur le fond, ou par la touche Échap.
 */
export default function HamburgerMenu({ ouvert, courant, onFermer, onNaviguer }) {
  const panneau = useRef(null)

  useEffect(() => {
    if (!ouvert) return

    const onTouche = (e) => {
      if (e.key === 'Escape') onFermer()
    }
    document.addEventListener('keydown', onTouche)

    // Le fond ne défile pas pendant que le panneau est ouvert.
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panneau.current?.focus()

    return () => {
      document.removeEventListener('keydown', onTouche)
      document.body.style.overflow = overflow
    }
  }, [ouvert, onFermer])

  if (!ouvert) return null

  return (
    <div className="fixed inset-0 z-[150]">
      <button
        type="button"
        aria-label="Fermer le menu"
        onClick={onFermer}
        className="sheet-backdrop absolute inset-0 h-full w-full cursor-default bg-black/50"
      />

      <div
        ref={panneau}
        role="dialog"
        aria-modal="true"
        aria-label="Rubriques du guide"
        tabIndex={-1}
        className="drawer absolute inset-y-0 left-0 flex w-[70%] max-w-xs flex-col bg-white shadow-2xl outline-none dark:bg-slate-900"
      >
        <div className="safe-top border-b border-slate-200 dark:border-slate-800">
          <div className="flex h-[60px] items-center gap-2 px-3">
            <Logo taille={32} className="h-8 w-8" />
            <span className="flex-1 font-bold">Rubriques</span>
            <button
              type="button"
              onClick={onFermer}
              aria-label="Fermer le menu"
              className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <nav className="safe-bottom flex-1 overflow-y-auto overscroll-contain p-2">
          <ul className="space-y-0.5">
            {PAGES.map(({ id, titre, icone: Icone, repere, page, parent }) => {
              const actif = id === courant
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNaviguer(id)}
                    aria-current={actif ? 'page' : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl py-2.5 pr-3 text-left transition-colors ${
                      parent ? 'pl-7' : 'pl-3'
                    } ${
                      actif
                        ? 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                        : 'hover:bg-slate-100 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700'
                    }`}
                  >
                    <Icone
                      className={`h-5 w-5 shrink-0 ${actif ? '' : 'text-slate-500 dark:text-slate-400'}`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 truncate text-sm font-medium">
                      {titre}
                    </span>
                    {repere && (
                      <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {repere}
                      </span>
                    )}
                    <span className="shrink-0 text-[11px] tabular-nums text-slate-400">
                      p.{page}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
