import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Copy,
  Share,
  Plus,
  Star,
  Files,
  EllipsisVertical,
  RotateCw,
  Search,
} from 'lucide-react'

/**
 * Appareils simulés. `safeTop` / `safeBottom` sont les marges transmises à
 * l'application embarquée : dans une iframe, env(safe-area-inset-*) vaut 0,
 * on les rejoue donc via des variables CSS.
 */
export const DEVICES = {
  'iphone-13': {
    id: 'iphone-13',
    label: 'iPhone 13',
    short: 'iPhone',
    os: 'ios',
    width: 390,
    height: 844,
    screenRadius: 44,
    framePadding: 12,
    notch: 'notch',
    statusBar: 44,
    safeTop: 20,
    safeBottom: 34,
    reseau: '5G',
  },
  'ipad-air': {
    id: 'ipad-air',
    label: 'iPad Air',
    short: 'iPad',
    os: 'ios',
    width: 820,
    height: 1180,
    screenRadius: 22,
    framePadding: 16,
    notch: 'none',
    statusBar: 26,
    safeTop: 20,
    safeBottom: 20,
    reseau: 'Wi-Fi',
  },
  'pixel-7': {
    id: 'pixel-7',
    label: 'Pixel 7',
    short: 'Android',
    os: 'android',
    width: 412,
    height: 915,
    screenRadius: 30,
    framePadding: 10,
    notch: 'punch',
    statusBar: 28,
    safeTop: 20,
    safeBottom: 24,
    reseau: '5G',
  },
}

function useHeure() {
  const [heure, setHeure] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setHeure(new Date()), 20000)
    return () => clearInterval(t)
  }, [])
  return heure.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function BarresSignal({ color }) {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4.4}
          y={11 - (i + 1) * 2.5}
          width="3"
          height={(i + 1) * 2.5}
          rx="1"
          fill={color}
        />
      ))}
    </svg>
  )
}

function Batterie({ color }) {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3.2"
        fill="none"
        stroke={color}
        strokeOpacity="0.45"
      />
      <rect x="2" y="2" width="18" height="8" rx="2" fill={color} />
      <path
        d="M23 4v4a2 2 0 0 0 0-4Z"
        fill={color}
        fillOpacity="0.5"
      />
    </svg>
  )
}

function StatusBar({ device, theme, hauteur }) {
  const heure = useHeure()
  const sombre = theme === 'dark'
  const color = sombre ? '#f8fafc' : '#0f172a'
  const ios = device.os === 'ios'

  return (
    <div
      className="relative z-20 flex shrink-0 items-end justify-between px-6 pb-1.5 text-[13px] font-semibold tabular-nums"
      style={{
        height: hauteur,
        color,
        background: sombre ? '#020617' : '#ffffff',
      }}
    >
      <span className={ios ? 'ml-1' : ''}>{heure}</span>
      <span className="flex items-center gap-1.5">
        {ios ? (
          <>
            <BarresSignal color={color} />
            <span className="text-[11px] font-semibold">{device.reseau}</span>
            <Batterie color={color} />
          </>
        ) : (
          <>
            <span className="text-[11px] font-medium">{device.reseau}</span>
            <BarresSignal color={color} />
            <span className="text-[11px] font-semibold">100 %</span>
            <Batterie color={color} />
          </>
        )}
      </span>
    </div>
  )
}

function BarreSafari({ url, theme, onShare }) {
  const sombre = theme === 'dark'
  return (
    <div
      className="z-20 shrink-0 border-t px-3 pb-2 pt-2"
      style={{
        background: sombre ? 'rgba(15,23,42,0.96)' : 'rgba(248,250,252,0.96)',
        borderColor: sombre ? '#1e293b' : '#e2e8f0',
      }}
    >
      <div
        className="mb-2 flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px]"
        style={{
          background: sombre ? '#1e293b' : '#e2e8f0',
          color: sombre ? '#e2e8f0' : '#0f172a',
        }}
      >
        <span className="text-[11px] font-semibold opacity-60">aA</span>
        <span className="flex-1 truncate text-center font-medium">
          {url.replace(/^https?:\/\//, '')}
        </span>
        <RotateCw className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
      </div>
      <div
        className="flex items-center justify-between px-2"
        style={{ color: sombre ? '#60a5fa' : '#2563eb' }}
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        <ChevronRight className="h-6 w-6 opacity-40" aria-hidden="true" />
        <button
          type="button"
          onClick={onShare}
          aria-label="Partager — ouvrir la feuille iOS"
          className="rounded-lg p-1 transition-transform active:scale-90"
        >
          <Share className="h-6 w-6" aria-hidden="true" />
        </button>
        <BookOpen className="h-6 w-6" aria-hidden="true" />
        <Files className="h-6 w-6" aria-hidden="true" />
      </div>
    </div>
  )
}

function BarreChrome({ url, theme, onShare }) {
  const sombre = theme === 'dark'
  return (
    <div
      className="z-20 flex shrink-0 items-center gap-2 px-3 py-2"
      style={{ background: sombre ? '#0f172a' : '#ffffff' }}
    >
      <div
        className="flex flex-1 items-center gap-2 rounded-full px-3 py-1.5 text-[13px]"
        style={{
          background: sombre ? '#1e293b' : '#f1f5f9',
          color: sombre ? '#e2e8f0' : '#0f172a',
        }}
      >
        <Search className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
        <span className="flex-1 truncate">
          {url.replace(/^https?:\/\//, '')}
        </span>
      </div>
      <button
        type="button"
        onClick={onShare}
        aria-label="Menu Chrome — ajouter à l’écran d’accueil"
        className="rounded-full p-1 transition-transform active:scale-90"
        style={{ color: sombre ? '#e2e8f0' : '#0f172a' }}
      >
        <EllipsisVertical className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}

function FeuillePartage({ device, url, theme, onClose }) {
  const ios = device.os === 'ios'
  const sombre = theme === 'dark'
  const fond = sombre ? '#1e293b' : '#f1f5f9'
  const carte = sombre ? '#0f172a' : '#ffffff'
  const texte = sombre ? '#f8fafc' : '#0f172a'

  const actions = ios
    ? [
        { id: 'copier', label: 'Copier', icon: Copy },
        { id: 'favoris', label: 'Ajouter aux favoris', icon: Star },
        {
          id: 'accueil',
          label: 'Sur l’écran d’accueil',
          icon: Plus,
          highlight: true,
        },
      ]
    : [
        { id: 'accueil', label: 'Installer l’application', icon: Plus, highlight: true },
        { id: 'raccourci', label: 'Ajouter à l’écran d’accueil', icon: Plus },
        { id: 'partager', label: 'Partager…', icon: Share },
      ]

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer la feuille de partage"
        className="sheet-backdrop absolute inset-0 bg-black/40"
      />
      <div
        className="share-sheet relative rounded-t-2xl p-3 pb-5"
        style={{ background: fond, color: texte }}
      >
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-slate-400/60" />
        <div
          className="mb-3 flex items-center gap-3 rounded-xl p-3"
          style={{ background: carte }}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-xs font-black text-white">
            AP
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">
              Guide AP COND ENSOSP
            </span>
            <span className="block truncate text-xs opacity-60">
              {url.replace(/^https?:\/\//, '')}
            </span>
          </span>
        </div>
        <ul className="overflow-hidden rounded-xl" style={{ background: carte }}>
          {actions.map(({ id, label, icon: Icon, highlight }, i) => (
            <li
              key={id}
              className={`flex items-center justify-between px-3 py-3 text-sm ${
                i > 0 ? 'border-t border-slate-500/15' : ''
              } ${highlight ? 'font-bold' : ''}`}
            >
              <span
                className={
                  highlight ? 'text-red-600 dark:text-red-400' : undefined
                }
              >
                {label}
              </span>
              <Icon
                className={`h-4 w-4 ${
                  highlight ? 'text-red-600 dark:text-red-400' : 'opacity-50'
                }`}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full rounded-xl py-3 text-sm font-semibold"
          style={{ background: carte }}
        >
          Annuler
        </button>
      </div>
    </div>
  )
}

/**
 * Cadre d'appareil affichant l'application réelle dans une iframe : le viewport
 * CSS embarqué fait bien 390 × 844, les media queries et le défilement sont
 * donc ceux du téléphone, pas ceux du poste de travail.
 */
export default function Emulator({
  deviceId = 'iphone-13',
  orientation = 'portrait',
  chrome = 'app',
  url,
  theme = 'dark',
  shareOpen = false,
  onShareOpenChange,
  reloadKey = 0,
  scale = 1,
}) {
  const device = DEVICES[deviceId] ?? DEVICES['iphone-13']
  const paysage = orientation === 'landscape'
  const frameRef = useRef(null)
  const [pret, setPret] = useState(false)

  const largeur = paysage ? device.height : device.width
  const hauteur = paysage ? device.width : device.height

  // iOS masque la barre d'état sur iPhone en paysage.
  const statusBarVisible = !(paysage && device.os === 'ios' && device.notch === 'notch')
  const statusBarHauteur = statusBarVisible ? (paysage ? 24 : device.statusBar) : 0

  const navigateur = chrome === 'browser'
  const safeTop = paysage
    ? 0
    : navigateur && device.os === 'android'
      ? 0
      : device.safeTop
  const safeBottom = paysage
    ? 21
    : navigateur && device.os === 'ios'
      ? 0
      : device.safeBottom

  // L'URL de l'iframe est figée : les changements de safe area et de thème
  // passent par postMessage pour ne pas recharger l'app à chaque réglage.
  const src = useMemo(() => {
    const params = new URLSearchParams({
      embedded: '1',
      safeTop: String(safeTop),
      safeBottom: String(safeBottom),
      platform: device.os,
      theme,
      r: String(reloadKey),
    })
    return `/?${params.toString()}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadKey])

  useEffect(() => {
    if (!pret) return
    frameRef.current?.contentWindow?.postMessage(
      { type: 'apcond:viewport', safeTop, safeBottom, platform: device.os },
      window.location.origin,
    )
  }, [pret, safeTop, safeBottom, device.os])

  useEffect(() => {
    if (!pret) return
    frameRef.current?.contentWindow?.postMessage(
      { type: 'apcond:theme', theme },
      window.location.origin,
    )
  }, [pret, theme])

  const sombre = theme === 'dark'
  const indicateurHome = device.os === 'ios' ? 24 : 20

  return (
    <div
      style={{
        width: largeur * scale + device.framePadding * 2 * scale,
        height: hauteur * scale + device.framePadding * 2 * scale,
      }}
    >
      <div
        className="device-frame"
        style={{
          width: largeur + device.framePadding * 2,
          height: hauteur + device.framePadding * 2,
          padding: device.framePadding,
          borderRadius: device.screenRadius + device.framePadding,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <div
          className="device-screen"
          style={{
            width: largeur,
            height: hauteur,
            borderRadius: device.screenRadius,
          }}
        >
          {/* Encoche / poinçon caméra */}
          {device.notch === 'notch' && !paysage && (
            <div
              className="device-notch"
              style={{ width: 156, height: 30 }}
              aria-hidden="true"
            >
              <span className="h-1.5 w-10 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 rounded-full bg-zinc-800" />
            </div>
          )}
          {device.notch === 'notch' && paysage && (
            <div
              className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-r-2xl bg-black"
              style={{ width: 30, height: 156 }}
              aria-hidden="true"
            />
          )}
          {device.notch === 'punch' && (
            <div
              className="absolute left-1/2 top-1.5 z-30 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black ring-2 ring-zinc-800"
              aria-hidden="true"
            />
          )}

          {statusBarVisible && (
            <StatusBar
              device={device}
              theme={theme}
              hauteur={statusBarHauteur}
            />
          )}

          {navigateur && device.os === 'android' && (
            <BarreChrome
              url={url}
              theme={theme}
              onShare={() => onShareOpenChange?.(true)}
            />
          )}

          <iframe
            ref={frameRef}
            key={reloadKey}
            src={src}
            title="Guide AP COND — aperçu dans l’appareil simulé"
            onLoad={() => setPret(true)}
            className="w-full flex-1 border-0"
            style={{ background: sombre ? '#020617' : '#f8fafc' }}
          />

          {navigateur && device.os === 'ios' && (
            <BarreSafari
              url={url}
              theme={theme}
              onShare={() => onShareOpenChange?.(true)}
            />
          )}

          {/* Barre de geste */}
          <div
            className="z-20 flex shrink-0 items-center justify-center"
            style={{
              height: indicateurHome,
              background: sombre ? '#020617' : '#f8fafc',
            }}
          >
            <span
              className="home-indicator"
              style={{
                width: device.os === 'ios' ? 134 : 108,
                height: device.os === 'ios' ? 5 : 4,
                background: sombre ? '#e2e8f0' : '#0f172a',
              }}
              aria-hidden="true"
            />
          </div>

          {shareOpen && (
            <FeuillePartage
              device={device}
              url={url}
              theme={theme}
              onClose={() => onShareOpenChange?.(false)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
