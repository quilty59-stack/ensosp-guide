import {
  MapPin,
  Building2,
  House,
  Warehouse,
  Navigation as NavigationIcon,
  Truck,
  TriangleAlert,
  DoorOpen,
  Layers,
  Info,
} from 'lucide-react'
import { ACCENTS, Card, Callout, PageHeader } from '../ui.jsx'

/** Adresse commune des 3 sites : seuls le repère du plan et les niveaux changent. */
const ADRESSE_PLATEAU = 'ENSOSP — Plateau technique et pédagogique, Vitrolles (13)'

const SITES = [
  {
    id: 'pavillon',
    nom: 'Le Pavillon',
    repere: 'D2',
    niveaux: 'RdC + combles',
    icon: House,
    accent: 'emerald',
    type: 'Maison individuelle avec garage attenant',
    adresse: ADRESSE_PLATEAU,
    acces: 'Portail sud, voie engins à sens unique — stationnement en épi devant le garage',
    adresses: [
      { code: 'D2-1', libelle: 'Façade avant — porte d’entrée et fenêtres du RdC' },
      { code: 'D2-2', libelle: 'Façade arrière — jardin, accès échelle aux combles' },
      { code: 'D2-3', libelle: 'Garage latéral — accès direct au volume habitable' },
    ],
    features: [
      { nom: 'Garage', detail: 'Véhicule et rangements : feu de garage et propagation à l’habitation' },
      { nom: 'Acétylène', detail: 'Bouteille d’acétylène en scénario : périmètre et refroidissement' },
      { nom: 'Salon', detail: 'Pièce de vie meublée : recherche de victime et lecture des fumées' },
    ],
    engins: ['FPT', 'VSAV', 'VTU'],
    vigilance:
      'Portail étroit (gabarit 3,20 m) et sortie directe sur la voie interne : guide obligatoire.',
  },
  {
    id: 'immeuble',
    nom: "L'Immeuble",
    repere: 'C3',
    niveaux: 'R+4 / -1',
    icon: Building2,
    accent: 'blue',
    type: 'Immeuble d’habitation avec commerce en pied et niveau enterré',
    adresse: ADRESSE_PLATEAU,
    acces: 'Accès par la rampe est — hauteur limitée à 3,50 m sous l’auvent',
    adresses: [
      { code: 'C3-1', libelle: 'Hall et cage d’escalier — colonne sèche et accès aux étages' },
      { code: 'C3-2', libelle: 'Façade échelle — aire de mise en station de la MEA' },
      { code: 'C3-3', libelle: 'Parking en sous-sol (-1) — rampe d’accès et ventilation' },
    ],
    features: [
      { nom: 'ERN', detail: 'Local ERN : atelier dédié aux exercices de reconnaissance' },
      { nom: 'Simulateur', detail: 'Générateur de fumée froide et foyers pilotés en salle' },
      { nom: 'Pizzeria', detail: 'Commerce en RdC : feu de laboratoire et conduit d’extraction' },
    ],
    engins: ['MEA', 'FPT', 'VSAV'],
    vigilance:
      'Vérifier la portance et la planéité avant tout déploiement des stabilisateurs de la MEA.',
  },
  {
    id: 'zone-urbaine',
    nom: 'La Zone Urbaine',
    repere: 'E3',
    niveaux: 'R+2 / -1',
    icon: Warehouse,
    accent: 'violet',
    type: 'Îlot urbain reconstitué : commerces, activités et voirie',
    adresse: ADRESSE_PLATEAU,
    acces: 'Entrée nord par la voie principale — circulation dans le sens du fléchage',
    adresses: [
      { code: 'E3-1', libelle: 'Rue commerçante — façades et devantures accessibles' },
      { code: 'E3-2', libelle: 'Cour intérieure — accès pompiers et point d’eau' },
      { code: 'E3-3', libelle: 'Niveau -1 — sous-sol technique et locaux de stockage' },
      { code: 'E3-4', libelle: 'Aire de manœuvre — mise en station et circuit de conduite' },
    ],
    features: [
      { nom: 'Laverie', detail: 'Machines et gaines : feu d’appareil et propagation' },
      { nom: 'Laboratoire', detail: 'Risque chimique : identification des produits et confinement' },
      { nom: 'Hôtel', detail: 'Chambres en R+1 et R+2 : évacuation et reconnaissance des niveaux' },
      { nom: 'Aire', detail: 'Aire d’évolution : trajectoires, créneaux et passages étroits' },
    ],
    engins: ['FPT', 'CCF', 'VSAV', 'VTU'],
    vigilance:
      'Site partagé entre plusieurs groupes : annoncer chaque entrée et sortie sur le canal du CS.',
  },
]

function mapsUrl(site) {
  const query = encodeURIComponent(
    `ENSOSP plateau technique Vitrolles ${site.nom}`,
  )
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export default function Sites() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={MapPin}
        accent="emerald"
        title="Sites d'entraînement"
        subtitle="Trois sites d’évolution du plateau, avec leur repère sur le plan, leurs adresses et leurs particularités."
      />

      {SITES.map((site) => {
        const a = ACCENTS[site.accent]
        const Icon = site.icon
        return (
          <Card key={site.id} className="overflow-hidden">
            <div className="flex items-start gap-3 border-b border-slate-200 p-4 dark:border-slate-800">
              <span className={`rounded-xl p-2.5 ring-1 ${a.bg} ${a.ring}`}>
                <Icon className={`h-6 w-6 ${a.text}`} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">{site.nom}</h2>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-xs font-black ring-1 ${a.bg} ${a.text} ${a.ring}`}
                  >
                    {site.repere}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Layers className="h-3 w-3" aria-hidden="true" />
                    {site.niveaux}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {site.type}
                </p>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-slate-700 dark:text-slate-300">
                    {site.adresse}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {site.acces}
                  </p>
                  <a
                    href={mapsUrl(site)}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${a.bg} ${a.text} ${a.ring}`}
                  >
                    <NavigationIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Ouvrir l’itinéraire
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <DoorOpen className="h-3.5 w-3.5" aria-hidden="true" />
                  Adresses ({site.adresses.length})
                </h3>
                <ul className="space-y-1.5">
                  {site.adresses.map(({ code, libelle }) => (
                    <li key={code} className="flex items-start gap-2 text-sm">
                      <span
                        className={`shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold ring-1 ${a.bg} ${a.text} ${a.ring}`}
                      >
                        {code}
                      </span>
                      <span className="leading-snug text-slate-700 dark:text-slate-300">
                        {libelle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Particularités du site
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {site.features.map(({ nom, detail }) => (
                    <li key={nom} className="flex gap-2">
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${a.solid}`}
                        aria-hidden="true"
                      />
                      <span className="leading-snug">
                        <strong className="font-semibold">{nom}</strong> — {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  <Truck className="h-3.5 w-3.5" aria-hidden="true" />
                  Engins adaptés
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {site.engins.map((e) => (
                    <span
                      key={e}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <Callout icon={TriangleAlert} accent="amber" title="Point de vigilance">
                {site.vigilance}
              </Callout>
            </div>
          </Card>
        )
      })}

      <Callout icon={Info} accent="slate" title="Repères du plan">
        Les codes <strong>D2</strong>, <strong>C3</strong> et <strong>E3</strong>{' '}
        renvoient au quadrillage du plan affiché au magasin et à l’entrée du
        plateau ; les codes d’adresse (D2-1, C3-2…) servent à désigner un point
        d’attaque en radio.
      </Callout>
    </div>
  )
}
