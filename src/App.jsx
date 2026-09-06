import { useCallback, useEffect, useState } from 'react'
import { WifiOff } from 'lucide-react'
import Navigation, { TABS } from './components/Navigation.jsx'
import HomePage from './components/HomePage.jsx'
import FicheTaches from './components/FicheTaches.jsx'
import Sites from './components/Sites.jsx'
import Radio from './components/Radio.jsx'
import Organigramme from './components/Organigramme.jsx'
import Accident from './components/Accident.jsx'
import NEXIS from './components/NEXIS.jsx'
import EmulatePage from './dev/EmulatePage.jsx'

const PAGES = {
  accueil: HomePage,
  taches: FicheTaches,
  sites: Sites,
  radio: Radio,
  organigramme: Organigramme,
  accident: Accident,
  nexis: NEXIS,
}

const THEME_KEY = 'apcond:theme'
const TAB_KEY = 'apcond:tab'

const PARAMS = new URLSearchParams(window.location.search)

/** Vrai quand l'app est affichée dans le cadre de l'émulateur. */
export const EMBEDDED =
  PARAMS.get('embedded') === '1' || window.self !== window.top

/**
 * Trois écritures mènent à l'émulateur :
 *   /emulator          route propre (serveur avec repli SPA : Vite, Vercel)
 *   #/emulator         repli sans configuration serveur (ouverture de fichier,
 *                      hébergement statique nu, service worker d'un autre projet)
 *   ?view=emulator     pratique pour un lien collé dans un message
 */
function readRoute() {
  // L'émulateur ne s'ouvre jamais dans l'émulateur : pas de récursion.
  if (EMBEDDED) return 'app'
  const { pathname, hash } = window.location
  const chemin = pathname.replace(/\/+$/, '')
  const ancre = hash.replace(/^#\/?/, '')
  if (chemin === '/emulator' || ancre === 'emulator') return 'emulator'
  if (new URLSearchParams(window.location.search).get('view') === 'emulator') {
    return 'emulator'
  }
  return 'app'
}

function readStoredTheme() {
  const fromUrl = PARAMS.get('theme')
  if (EMBEDDED && (fromUrl === 'dark' || fromUrl === 'light')) return fromUrl
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* stockage indisponible (navigation privée) : on retombe sur le système */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function readStoredTab() {
  try {
    const stored = localStorage.getItem(TAB_KEY)
    if (stored && stored in PAGES) return stored
  } catch {
    /* idem */
  }
  return 'accueil'
}

/** Dans une iframe, env(safe-area-inset-*) vaut 0 : l'émulateur fournit les marges. */
function applySafeArea(top, bottom) {
  const root = document.documentElement
  root.style.setProperty('--safe-top', `${top}px`)
  root.style.setProperty('--safe-bottom', `${bottom}px`)
}

export default function App() {
  const [theme, setTheme] = useState(readStoredTheme)
  const [tab, setTab] = useState(readStoredTab)
  const [route, setRoute] = useState(readRoute)
  const [online, setOnline] = useState(() => navigator.onLine)

  // Applique le thème au document et accorde la couleur de la barre système.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#020617' : '#dc2626')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* rien à faire : le thème reste valable pour la session */
    }
  }, [theme])

  // Rouvrir l'app sur la dernière rubrique consultée évite de renaviguer
  // à chaque sortie sur le plateau.
  useEffect(() => {
    try {
      localStorage.setItem(TAB_KEY, tab)
    } catch {
      /* ignoré */
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [tab])

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  // Bouton précédent du navigateur / d'Android.
  useEffect(() => {
    const onPop = () => setRoute(readRoute())
    window.addEventListener('popstate', onPop)
    window.addEventListener('hashchange', onPop)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('hashchange', onPop)
    }
  }, [])

  // Réglages envoyés par le cadre de l'émulateur.
  useEffect(() => {
    if (!EMBEDDED) return
    document.documentElement.classList.add('embedded')
    applySafeArea(
      Number(PARAMS.get('safeTop') ?? 0),
      Number(PARAMS.get('safeBottom') ?? 0),
    )
    const onMessage = (event) => {
      if (event.origin !== window.location.origin) return
      const data = event.data
      if (!data || typeof data !== 'object') return
      if (data.type === 'apcond:viewport') {
        applySafeArea(Number(data.safeTop) || 0, Number(data.safeBottom) || 0)
      }
      if (data.type === 'apcond:theme' && data.theme) {
        setTheme(data.theme === 'dark' ? 'dark' : 'light')
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const navigate = useCallback((id) => setTab(id), [])
  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )
  const openEmulator = useCallback(() => {
    window.history.pushState({ fromApp: true }, '', '/emulator')
    setRoute('emulator')
  }, [])
  const closeEmulator = useCallback(() => {
    // Revenir en arrière plutôt qu'empiler quand on vient du guide.
    if (window.history.state?.fromApp) {
      window.history.back()
      return
    }
    window.history.pushState({}, '', '/')
    setRoute('app')
  }, [])

  if (route === 'emulator') {
    return (
      <EmulatePage
        onBack={closeEmulator}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    )
  }

  const meta = TABS.find((t) => t.id === tab) ?? TABS[0]
  const Page = PAGES[tab] ?? HomePage

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
        <div className="safe-top mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-black text-white shadow-sm">
            AP
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-tight">
              Guide AP COND — ENSOSP
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {meta.title}
            </p>
          </div>
          {!online && (
            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
              Hors ligne
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-28 pt-5">
        <Page
          onNavigate={navigate}
          onOpenEmulator={EMBEDDED ? null : openEmulator}
        />
      </main>

      <Navigation
        current={tab}
        onChange={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}
