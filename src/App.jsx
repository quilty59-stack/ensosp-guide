import { useCallback, useEffect, useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import HamburgerMenu from './components/HamburgerMenu.jsx'
import Header from './components/Header.jsx'
import SplashScreen, { marquerSplashVu, splashDejaVu } from './components/SplashScreen.jsx'
import { PAGE_PAR_ID_COMPLET, PARENT } from './navigation.js'
import { SCENARIOS } from './data/guide.js'
import EmulatePage from './dev/EmulatePage.jsx'

import Accident from './components/pages/Accident.jsx'
import Accueil from './components/pages/Accueil.jsx'
import AVP from './components/pages/AVP.jsx'
import AVPDetail from './components/pages/AVPDetail.jsx'
import Contacts from './components/pages/Contacts.jsx'
import Dotation from './components/pages/Dotation.jsx'
import FicheTaches from './components/pages/FicheTaches.jsx'
import Horaires from './components/pages/Horaires.jsx'
import Immeuble from './components/pages/Immeuble.jsx'
import NEXIS from './components/pages/NEXIS.jsx'
import Organigramme from './components/pages/Organigramme.jsx'
import Pavillon from './components/pages/Pavillon.jsx'
import Plan from './components/pages/Plan.jsx'
import PME from './components/pages/PME.jsx'
import Radio from './components/pages/Radio.jsx'
import Saphire from './components/pages/Saphire.jsx'
import SitesPage from './components/pages/SitesPage.jsx'
import ZoneUrbaine from './components/pages/ZoneUrbaine.jsx'

const ECRANS = {
  accueil: Accueil,
  taches: FicheTaches,
  horaires: Horaires,
  dotation: Dotation,
  radio: Radio,
  sites: SitesPage,
  pavillon: Pavillon,
  immeuble: Immeuble,
  'zone-urbaine': ZoneUrbaine,
  pme: PME,
  saphire: Saphire,
  avp: AVP,
  plan: Plan,
  organigramme: Organigramme,
  accident: Accident,
  nexis: NEXIS,
  contacts: Contacts,
  // Les sept fiches de scénario partagent un même écran, distingué par son id.
  ...Object.fromEntries(
    SCENARIOS.map((s) => [s.id, () => <AVPDetail id={s.id} />]),
  ),
}

/**
 * Pile de navigation : le dernier élément est l'écran affiché, les précédents
 * sont les écrans où le bouton « Retour » ramène.
 *
 * Une fiche ouverte depuis le menu insère sa liste dans la pile : depuis le
 * détail du Pavillon, « Retour » ramène aux sites de manœuvre, que l'on soit
 * passé par la liste ou non.
 */
function empiler(pile, id) {
  const courant = pile[pile.length - 1]
  if (id === courant) return pile
  if (id === 'accueil') return ['accueil']

  const dejaLa = pile.indexOf(id)
  if (dejaLa !== -1) return pile.slice(0, dejaLa + 1)

  const parent = PARENT[id]
  if (parent) {
    const base = pile.includes(parent)
      ? pile.slice(0, pile.indexOf(parent) + 1)
      // On écarte les fiches sœurs : la pile garde un seul chemin.
      : empiler(pile.filter((p) => PARENT[p] !== parent), parent)
    return [...base, id]
  }
  return [...pile, id]
}

/** Pile d'ouverture : la rubrique visée, précédée de l'accueil et de sa liste. */
function pileInitiale(id) {
  return id === 'accueil' ? ['accueil'] : empiler(['accueil'], id)
}

/**
 * Donne à l'historique du navigateur une entrée par écran de la pile.
 *
 * Nécessaire quand on entre par un lien pointant droit sur une fiche
 * (#/immeuble) : sans ces entrées, le retour quitterait l'application au lieu
 * de remonter à la liste des sites. C'est la reconstruction de pile que font
 * les applications natives sur un lien profond.
 */
function materialiser(pile) {
  window.history.replaceState({ pile: pile.slice(0, 1) }, '', `#/${pile[0]}`)
  for (let i = 1; i < pile.length; i += 1) {
    const etape = pile.slice(0, i + 1)
    window.history.pushState({ pile: etape }, '', `#/${etape[i]}`)
  }
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
 *   #/emulator         repli sans configuration serveur
 *   ?view=emulator     pratique pour un lien collé dans un message
 */
function readRoute() {
  if (EMBEDDED) return 'app' // l'émulateur ne s'ouvre jamais dans l'émulateur
  const { pathname, hash } = window.location
  const chemin = pathname.replace(/\/+$/, '')
  const ancre = hash.replace(/^#\/?/, '')
  if (chemin === '/emulator' || ancre === 'emulator') return 'emulator'
  if (PARAMS.get('view') === 'emulator') return 'emulator'
  return 'app'
}

function readStoredTheme() {
  const fromUrl = PARAMS.get('theme')
  if (EMBEDDED && (fromUrl === 'dark' || fromUrl === 'light')) return fromUrl
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* stockage indisponible (navigation privée) : on suit le système */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * La rubrique vit dans l'ancre (#/radio) : le bouton retour d'Android revient
 * à l'écran précédent au lieu de fermer l'application, un lien s'échange, et
 * un rechargement rouvre la même page.
 */
function readTabFromHash() {
  const ancre = window.location.hash.replace(/^#\/?/, '')
  return ancre in ECRANS ? ancre : null
}

function readStoredTab() {
  const fromHash = readTabFromHash()
  if (fromHash) return fromHash
  try {
    const stored = localStorage.getItem(TAB_KEY)
    if (stored && stored in ECRANS) return stored
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
  const [pile, setPile] = useState(() => pileInitiale(readStoredTab()))
  const [route, setRoute] = useState(readRoute)
  const [online, setOnline] = useState(() => navigator.onLine)
  const [menuOuvert, setMenuOuvert] = useState(false)
  // Le premier lancement met le guide en cache : l'écran de démarrage occupe
  // ce temps. Les lancements suivants ouvrent directement la dernière rubrique.
  const [splash, setSplash] = useState(() => !EMBEDDED && !splashDejaVu())

  // L'écran affiché est le sommet de la pile ; ce qui précède est le chemin
  // de retour.
  const tab = pile[pile.length - 1]

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0f172a' : '#dc2626')
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* le thème reste valable pour la session */
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

  // L'entrée d'historique du premier affichage porte elle aussi sa pile,
  // sinon un retour depuis la deuxième page ne saurait où revenir.
  useEffect(() => {
    if (EMBEDDED || readRoute() !== 'app') return
    materialiser(pile)
    // Volontairement au montage seulement : les navigations suivantes
    // empilent leur propre entrée.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  useEffect(() => {
    const onPop = (evenement) => {
      setRoute(readRoute())
      const enregistree = evenement?.state?.pile
      if (Array.isArray(enregistree) && enregistree.length > 0) {
        setPile(enregistree)
        return
      }
      // Entrée d'historique sans pile : ancre saisie à la main, ou lien reçu.
      const depuisAncre = readTabFromHash()
      if (depuisAncre) {
        const reconstruite = pileInitiale(depuisAncre)
        setPile(reconstruite)
        materialiser(reconstruite)
      }
    }
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

  const naviguer = useCallback(
    (id) => {
      setMenuOuvert(false)
      const suivante = empiler(pile, id)
      if (suivante === pile) return

      // Ouvrir une fiche depuis le menu insère sa liste dans la pile : cette
      // liste reçoit sa propre entrée d'historique, sans quoi le retour
      // l'enjamberait pour revenir deux écrans en arrière.
      const ajoutPur =
        suivante.length > pile.length && pile.every((p, i) => p === suivante[i])
      const etapes = ajoutPur
        ? suivante.slice(pile.length).map((_, i) => suivante.slice(0, pile.length + i + 1))
        : [suivante]

      for (const etape of etapes) {
        window.history.pushState({ pile: etape }, '', `#/${etape[etape.length - 1]}`)
      }
      setPile(suivante)
    },
    [pile],
  )

  // Le retour de l'app passe par l'historique : le geste de retour du système
  // et ce bouton restent ainsi indiscernables.
  const retour = useCallback(() => window.history.back(), [])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  const fermerSplash = useCallback(() => {
    marquerSplashVu()
    setSplash(false)
  }, [])

  const closeEmulator = useCallback(() => {
    if (window.history.state?.fromApp) {
      window.history.back()
      return
    }
    window.history.pushState({}, '', '/')
    setRoute('app')
  }, [])

  if (route === 'emulator') {
    return (
      <EmulatePage onBack={closeEmulator} theme={theme} onToggleTheme={toggleTheme} />
    )
  }

  if (splash) return <SplashScreen onTermine={fermerSplash} />

  const Ecran = ECRANS[tab] ?? Accueil
  const meta = PAGE_PAR_ID_COMPLET[tab]

  return (
    <div className="min-h-dvh">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOuvrirMenu={() => setMenuOuvert(true)}
        onAccueil={() => naviguer('accueil')}
        onRetour={pile.length > 1 ? retour : null}
        horsLigne={!online}
      />

      {/* 60 px de bandeau, 70 px de barre du bas, plus les encoches. */}
      <main className="mx-auto max-w-2xl px-4 pb-[calc(70px+var(--safe-bottom)+24px)] pt-[calc(60px+var(--safe-top)+20px)]">
        <Ecran onNaviguer={naviguer} />

        {meta && (
          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
            Guide AP COND — page {meta.page} du document source
          </p>
        )}
      </main>

      <BottomNav courant={tab} onNaviguer={naviguer} />

      <HamburgerMenu
        ouvert={menuOuvert}
        courant={tab}
        onFermer={() => setMenuOuvert(false)}
        onNaviguer={naviguer}
      />
    </div>
  )
}
