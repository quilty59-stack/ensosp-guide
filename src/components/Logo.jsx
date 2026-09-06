import logoUrl from '../assets/logo-ensosp.svg'

/**
 * Marque de l'application : volant de conduite et flamme.
 * Le logo institutionnel de l'École n'est pas repris ici — l'application n'est
 * pas un document validé par l'ENSOSP.
 */
export default function Logo({ taille = 48, className = '' }) {
  return (
    <img
      src={logoUrl}
      width={taille}
      height={taille}
      alt=""
      aria-hidden="true"
      className={`shrink-0 select-none ${className}`}
      draggable="false"
    />
  )
}
