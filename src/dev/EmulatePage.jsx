import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  Smartphone,
  Tablet,
  RotateCw,
  RefreshCw,
  Share,
  Globe,
  AppWindow,
  ExternalLink,
  Sun,
  Moon,
  Info,
} from 'lucide-react'
import Emulator, { DEVICES } from './Emulator.jsx'
import { Callout } from '../ui.jsx'

const ORDRE = ['iphone-13', 'ipad-air', 'pixel-7']
const ICONES = { 'iphone-13': Smartphone, 'ipad-air': Tablet, 'pixel-7': Smartphone }

function Segment({ actif, onClick, icon: Icon, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={actif}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
        actif
          ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-50'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
      }`}
    >
      {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </button>
  )
}

export default function EmulatePage({ onBack, theme, onToggleTheme }) {
  const [deviceId, setDeviceId] = useState('iphone-13')
  const [orientation, setOrientation] = useState('portrait')
  const [chrome, setChrome] = useState('app')
  const [shareOpen, setShareOpen] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [scale, setScale] = useState(1)
  const zoneRef = useRef(null)

  const device = DEVICES[deviceId]
  const paysage = orientation === 'landscape'
  const url = `${window.location.origin}/`

  const largeurCadre =
    (paysage ? device.height : device.width) + device.framePadding * 2
  const hauteurCadre =
    (paysage ? device.width : device.height) + device.framePadding * 2

  // Le cadre est mis à l'échelle pour tenir dans la fenêtre : le viewport CSS
  // de l'iframe reste à sa taille réelle, seul l'affichage est réduit.
  useLayoutEffect(() => {
    const calcul = () => {
      const el = zoneRef.current
      if (!el) return
      const dispoLargeur = el.clientWidth
      const dispoHauteur = window.innerHeight - el.getBoundingClientRect().top - 24
      setScale(
        Math.min(1, dispoLargeur / largeurCadre, dispoHauteur / hauteurCadre),
      )
    }
    calcul()
    const ro = new ResizeObserver(calcul)
    if (zoneRef.current) ro.observe(zoneRef.current)
    window.addEventListener('resize', calcul)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', calcul)
    }
  }, [largeurCadre, hauteurCadre])

  // Le thème choisi dans l'app embarquée remonte jusqu'ici.
  useEffect(() => {
    const sync = (e) => {
      if (e.key === 'apcond:theme' && e.newValue && e.newValue !== theme) {
        onToggleTheme()
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [theme, onToggleTheme])

  const recharger = useCallback(() => setReloadKey((k) => k + 1), [])

  return (
    <div className="min-h-dvh bg-slate-100 dark:bg-slate-900">
      <header className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Guide
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold">Émulateur d’appareil</h1>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {device.label} · {paysage ? device.height : device.width} ×{' '}
              {paysage ? device.width : device.height} px · zoom{' '}
              {Math.round(scale * 100)} %
            </p>
          </div>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'
            }
            className="rounded-lg border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-amber-300"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-4">
        {/* URL servie, affichée en permanence */}
        <div className="mb-3 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
          <Globe className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <code className="min-w-0 flex-1 truncate text-xs text-slate-700 dark:text-slate-300">
            {url}
          </code>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/40"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Onglet
          </a>
        </div>

        {/* Contrôles */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
            {ORDRE.map((id) => {
              const Icon = ICONES[id]
              return (
                <Segment
                  key={id}
                  actif={deviceId === id}
                  onClick={() => setDeviceId(id)}
                  icon={Icon}
                  title={DEVICES[id].label}
                >
                  {DEVICES[id].short}
                </Segment>
              )
            })}
          </div>

          <div className="flex gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
            <Segment
              actif={chrome === 'app'}
              onClick={() => setChrome('app')}
              icon={AppWindow}
              title="Application installée (plein écran)"
            >
              App
            </Segment>
            <Segment
              actif={chrome === 'browser'}
              onClick={() => setChrome('browser')}
              icon={Globe}
              title="Dans le navigateur (Safari / Chrome)"
            >
              Navigateur
            </Segment>
          </div>

          <button
            type="button"
            onClick={() =>
              setOrientation((o) => (o === 'portrait' ? 'landscape' : 'portrait'))
            }
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCw className="h-4 w-4" aria-hidden="true" />
            {paysage ? 'Portrait' : 'Paysage'}
          </button>

          <button
            type="button"
            onClick={recharger}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Recharger
          </button>

          <button
            type="button"
            onClick={() => setShareOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-transform active:scale-95"
          >
            <Share className="h-4 w-4" aria-hidden="true" />
            Installer
          </button>
        </div>

        <div ref={zoneRef} className="flex justify-center">
          <Emulator
            deviceId={deviceId}
            orientation={orientation}
            chrome={chrome}
            url={url}
            theme={theme}
            shareOpen={shareOpen}
            onShareOpenChange={setShareOpen}
            reloadKey={reloadKey}
            scale={scale}
          />
        </div>

        <div className="mx-auto mt-4 max-w-2xl">
          <Callout icon={Info} accent="slate" title="Ce que cet aperçu montre">
            L’application réelle tourne dans le cadre : son viewport CSS fait bien{' '}
            {device.width} × {device.height} px, avec les marges d’encoche
            ({device.safeTop} px en haut, {device.safeBottom} px en bas) rejouées
            comme sur l’appareil. Le moteur de rendu reste celui de ce navigateur —
            pour valider WebKit, Safari iOS et l’installation réelle, il faut un
            appareil ou le simulateur Xcode.
          </Callout>
        </div>
      </div>
    </div>
  )
}
