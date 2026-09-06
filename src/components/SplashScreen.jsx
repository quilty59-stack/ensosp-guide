import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'

export const DUREE_SPLASH = 2500
const CLE = 'apcond:splash'

/** Vrai au tout premier lancement seulement : ensuite le guide s'ouvre net. */
export function splashDejaVu() {
  try {
    return localStorage.getItem(CLE) === 'true'
  } catch {
    return false // stockage indisponible : on montre l'écran, sans le mémoriser
  }
}

export function marquerSplashVu() {
  try {
    localStorage.setItem(CLE, 'true')
  } catch {
    /* navigation privée : l'écran réapparaîtra, sans conséquence */
  }
}

/**
 * Écran de démarrage affiché au premier lancement, le temps que le service
 * worker mette le guide en cache pour un usage hors ligne sur le plateau.
 */
export default function SplashScreen({ onTermine }) {
  const [progression, setProgression] = useState(0)

  useEffect(() => {
    // Deux images suffisent à animer la barre : le navigateur interpole le reste.
    const demarrage = requestAnimationFrame(() => setProgression(100))
    const fin = setTimeout(onTermine, DUREE_SPLASH)
    return () => {
      cancelAnimationFrame(demarrage)
      clearTimeout(fin)
    }
  }, [onTermine])

  return (
    <div
      role="status"
      aria-label="Chargement du guide"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-blue-900 to-red-600"
    >
      <Logo taille={200} className="w-40 drop-shadow-lg sm:w-[200px]" />

      <div className="flex flex-col items-center gap-3">
        <div className="h-1 w-[200px] overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-[width] ease-linear motion-reduce:transition-none"
            style={{ width: `${progression}%`, transitionDuration: `${DUREE_SPLASH}ms` }}
          />
        </div>
        <p className="text-sm font-medium text-white/90">Chargement du guide…</p>
      </div>
    </div>
  )
}
