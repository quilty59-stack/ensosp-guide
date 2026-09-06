import { useMemo, useState } from 'react'
import {
  Siren,
  Search,
  X,
  Car,
  Flame,
  LifeBuoy,
  ShieldAlert,
  HeartPulse,
  Plane,
  Ship,
  Waves,
  Truck,
} from 'lucide-react'
import { ACCENTS, Card, EmptyState, PageHeader } from '../ui.jsx'

const CATEGORIES = [
  { id: 'circulation', label: 'Circulation', icon: Car, accent: 'amber' },
  { id: 'feu', label: 'Feu', icon: Flame, accent: 'red' },
  { id: 'sauvetage', label: 'Sauvetage', icon: LifeBuoy, accent: 'emerald' },
  { id: 'securite', label: 'Sécurité', icon: ShieldAlert, accent: 'violet' },
  { id: 'urgence', label: 'Urgence', icon: HeartPulse, accent: 'blue' },
  { id: 'aerien', label: 'Aérien', icon: Plane, accent: 'slate' },
  { id: 'maritime', label: 'Maritime', icon: Ship, accent: 'blue' },
  { id: 'eau', label: 'Eau', icon: Waves, accent: 'emerald' },
  { id: 'ordre', label: 'Ordre public', icon: Siren, accent: 'slate' },
]

/** Motifs de départ NEXIS et départ type associé (à caler sur le règlement départemental). */
const MOTIFS = [
  // --- Circulation ---
  { code: 'AVP', libelle: 'Accident de la circulation', cat: 'circulation', engins: ['VSAV', 'FPT'], note: 'Balisage amont et protection de la zone' },
  { code: 'AVPD', libelle: 'Accident avec désincarcération', cat: 'circulation', engins: ['VSR', 'VSAV', 'FPT'], note: 'Groupe désincarcération complet' },
  { code: 'AVPP', libelle: 'Accident avec piéton', cat: 'circulation', engins: ['VSAV', 'FPT'], note: 'Rechercher la victime sous le véhicule' },
  { code: 'AV2R', libelle: 'Accident deux-roues', cat: 'circulation', engins: ['VSAV'], note: 'Ne pas retirer le casque sans technique adaptée' },
  { code: 'AVPL', libelle: 'Accident poids lourd', cat: 'circulation', engins: ['VSAV', 'FPT', 'VSR'], note: 'Risque de fuite de carburant, calage du PL' },
  { code: 'AVTC', libelle: 'Accident de transport en commun', cat: 'circulation', engins: ['VSAV x2', 'FPT', 'VSR'], note: 'Nombreuses victimes : demander un chef de groupe' },

  // --- Feu ---
  { code: 'FHAB', libelle: 'Feu d’habitation', cat: 'feu', engins: ['FPT', 'MEA', 'VSAV'], note: 'Reconnaissance des étages et des combles' },
  { code: 'FAPP', libelle: 'Feu d’appartement', cat: 'feu', engins: ['FPT', 'MEA', 'VSAV'], note: 'Contrôle de la cage d’escalier et de la colonne sèche' },
  { code: 'FCHE', libelle: 'Feu de cheminée', cat: 'feu', engins: ['FPT'], note: 'Contrôle du conduit sur toute sa hauteur' },
  { code: 'FERP', libelle: 'Feu en établissement recevant du public', cat: 'feu', engins: ['FPT x2', 'MEA', 'VSAV'], note: 'Évacuation prioritaire, PC dès l’arrivée' },
  { code: 'FIND', libelle: 'Feu industriel ou d’entrepôt', cat: 'feu', engins: ['FPT x2', 'CCGC', 'MEA'], note: 'Alimentation longue distance à prévoir' },
  { code: 'FVEH', libelle: 'Feu de véhicule', cat: 'feu', engins: ['FPT'], note: 'Attention aux batteries de traction et vérins' },
  { code: 'FVEG', libelle: 'Feu de végétation', cat: 'feu', engins: ['CCF x2'], note: 'Reconnaissance des accès et sens du vent' },
  { code: 'FDIV', libelle: 'Feu divers : poubelles, déchets, palettes', cat: 'feu', engins: ['FPT'], note: 'Propagation aux façades à contrôler' },

  // --- Sauvetage ---
  { code: 'SAUV', libelle: 'Sauvetage et mise en sécurité', cat: 'sauvetage', engins: ['FPT', 'MEA', 'VSAV'], note: 'Priorité absolue sur toute autre action' },
  { code: 'SASC', libelle: 'Personne bloquée en ascenseur', cat: 'sauvetage', engins: ['VTU', 'FPT'], note: 'Contact avec l’ascensoriste avant manœuvre' },
  { code: 'SHAU', libelle: 'Sauvetage en hauteur ou milieu périlleux', cat: 'sauvetage', engins: ['MEA', 'GRIMP', 'VSAV'], note: 'Reconnaissance des accès par le haut' },
  { code: 'SENS', libelle: 'Ensevelissement ou effondrement', cat: 'sauvetage', engins: ['FPT', 'VSAV', 'Cynotechnie'], note: 'Silence pour la recherche de victimes' },
  { code: 'SPOR', libelle: 'Ouverture de porte (personne ne répondant pas)', cat: 'sauvetage', engins: ['VTU', 'VSAV'], note: 'Police présente pour l’ouverture' },
  { code: 'SMEN', libelle: 'Personne menaçant de se jeter dans le vide', cat: 'sauvetage', engins: ['FPT', 'VSAV', 'Police'], note: 'Coussin de réception et négociateur' },

  // --- Sécurité ---
  { code: 'FUGA', libelle: 'Fuite de gaz', cat: 'securite', engins: ['FPT', 'GrDF'], note: 'Périmètre large, aucune source d’allumage' },
  { code: 'ODSU', libelle: 'Odeur suspecte', cat: 'securite', engins: ['FPT'], note: 'Détection multigaz avant tout engagement' },
  { code: 'RCHI', libelle: 'Fuite de produit chimique', cat: 'securite', engins: ['FPT', 'CMIC'], note: 'Identifier le produit avant d’agir' },
  { code: 'TMD', libelle: 'Transport de matières dangereuses', cat: 'securite', engins: ['FPT', 'CMIC', 'VSAV'], note: 'Lecture du code danger à distance' },
  { code: 'RRAD', libelle: 'Risque radiologique', cat: 'securite', engins: ['FPT', 'CMIR'], note: 'Temps, distance, écran' },
  { code: 'ELEC', libelle: 'Risque électrique, fil ou câble à terre', cat: 'securite', engins: ['VTU', 'Enedis'], note: 'Périmètre de 5 m, attente du concessionnaire' },
  { code: 'SPRE', libelle: 'Mise en sécurité d’un bâtiment menaçant ruine', cat: 'securite', engins: ['FPT', 'VTU'], note: 'Étaiement et évacuation des occupants' },

  // --- Urgence (secours à personne) ---
  { code: 'SAP', libelle: 'Secours à personne', cat: 'urgence', engins: ['VSAV'], note: 'Bilan et transmission au médecin régulateur' },
  { code: 'ACR', libelle: 'Arrêt cardio-respiratoire', cat: 'urgence', engins: ['VSAV', 'SMUR'], note: 'RCP immédiate et DSA' },
  { code: 'DETR', libelle: 'Détresse respiratoire', cat: 'urgence', engins: ['VSAV'], note: 'Oxygénothérapie, position assise' },
  { code: 'CHUT', libelle: 'Chute de hauteur', cat: 'urgence', engins: ['VSAV', 'FPT'], note: 'Immobilisation du rachis' },
  { code: 'HEMO', libelle: 'Hémorragie', cat: 'urgence', engins: ['VSAV'], note: 'Compression puis garrot si échec' },
  { code: 'BRUL', libelle: 'Brûlures', cat: 'urgence', engins: ['VSAV', 'FPT'], note: 'Refroidissement précoce, lutte contre l’hypothermie' },
  { code: 'INTX', libelle: 'Intoxication au monoxyde de carbone', cat: 'urgence', engins: ['VSAV', 'FPT'], note: 'Mesure CO et évacuation des locaux' },
  { code: 'ACCO', libelle: 'Accouchement inopiné', cat: 'urgence', engins: ['VSAV', 'SMUR'], note: 'Maintien au chaud du nouveau-né' },

  // --- Aérien ---
  { code: 'AERO', libelle: 'Accident d’aéronef', cat: 'aerien', engins: ['FPT x2', 'VSAV x2', 'CCGC'], note: 'Point de rassemblement des moyens hors piste' },
  { code: 'AALE', libelle: 'Alerte aéroportuaire, dispositif de sécurité', cat: 'aerien', engins: ['FPT', 'VSAV'], note: 'Mise en place sur ordre, attente en zone dédiée' },
  { code: 'AULM', libelle: 'Accident ULM, parapente ou parachute', cat: 'aerien', engins: ['VSAV', 'FPT', 'GRIMP'], note: 'Victime souvent en milieu difficile d’accès' },

  // --- Maritime ---
  { code: 'MNAV', libelle: 'Feu de navire ou d’embarcation', cat: 'maritime', engins: ['FPT', 'Moyens nautiques'], note: 'Coordination avec l’autorité portuaire' },
  { code: 'MSAU', libelle: 'Assistance à embarcation, sauvetage en mer', cat: 'maritime', engins: ['SAV', 'VSAV'], note: 'Direction des opérations par le CROSS' },
  { code: 'MPOL', libelle: 'Pollution maritime ou portuaire', cat: 'maritime', engins: ['FPT', 'CMIC'], note: 'Barrage flottant et alerte des services' },

  // --- Eau ---
  { code: 'INON', libelle: 'Inondation de locaux', cat: 'eau', engins: ['VTU', 'FPT'], note: 'Couper l’électricité avant pompage' },
  { code: 'EPUI', libelle: 'Épuisement, pompage de cave ou de parking', cat: 'eau', engins: ['VTU'], note: 'Vérifier l’absence d’hydrocarbures' },
  { code: 'FUIE', libelle: 'Fuite d’eau importante', cat: 'eau', engins: ['VTU'], note: 'Recherche de la vanne de barrage' },
  { code: 'SAQU', libelle: 'Sauvetage aquatique, noyade', cat: 'eau', engins: ['VSAV', 'SAV'], note: 'Ne jamais s’engager sans équipement' },
  { code: 'POLE', libelle: 'Pollution de cours d’eau', cat: 'eau', engins: ['FPT', 'CMIC'], note: 'Barrage et prélèvements pour analyse' },

  // --- Ordre public ---
  { code: 'RIXE', libelle: 'Rixe ou violences sur la voie publique', cat: 'ordre', engins: ['VSAV', 'Police'], note: 'Ne pas s’engager avant sécurisation par la police' },
  { code: 'MANI', libelle: 'Manifestation, dispositif prévisionnel de secours', cat: 'ordre', engins: ['VSAV', 'Poste de secours'], note: 'Itinéraire de repli défini à l’avance' },
  { code: 'ASSP', libelle: 'Assistance aux forces de l’ordre', cat: 'ordre', engins: ['VTU', 'VSAV'], note: 'Action sur demande et sous protection police' },
  { code: 'EVAC', libelle: 'Évacuation ou mise à l’abri de population', cat: 'ordre', engins: ['VTU', 'FPT', 'VSAV'], note: 'Recensement des personnes déplacées' },
  { code: 'RECO', libelle: 'Reconnaissance, levée de doute', cat: 'ordre', engins: ['VTU'], note: 'Compte rendu systématique au CTA-CODIS' },
]

/** Comparaison insensible aux accents et à la casse. */
function normalize(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export default function NEXIS() {
  const [query, setQuery] = useState('')
  const [categorie, setCategorie] = useState('toutes')

  const resultats = useMemo(() => {
    const q = normalize(query.trim())
    return MOTIFS.filter((m) => {
      if (categorie !== 'toutes' && m.cat !== categorie) return false
      if (!q) return true
      const haystack = normalize(
        `${m.code} ${m.libelle} ${m.note} ${m.engins.join(' ')}`,
      )
      return haystack.includes(q)
    })
  }, [query, categorie])

  const compteurs = useMemo(() => {
    const map = { toutes: MOTIFS.length }
    for (const m of MOTIFS) map[m.cat] = (map[m.cat] ?? 0) + 1
    return map
  }, [])

  return (
    <div className="space-y-4">
      <PageHeader
        icon={Siren}
        accent="blue"
        title="Motifs de départ NEXIS"
        subtitle={`${MOTIFS.length} motifs classés par catégorie, avec le départ type associé.`}
      />

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          inputMode="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un motif, un code, un engin…"
          aria-label="Rechercher un motif de départ"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-10 text-sm shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Effacer la recherche"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2 pb-1">
          <FiltreChip
            active={categorie === 'toutes'}
            onClick={() => setCategorie('toutes')}
            label="Toutes"
            count={compteurs.toutes}
            accent="slate"
          />
          {CATEGORIES.map((c) => (
            <FiltreChip
              key={c.id}
              active={categorie === c.id}
              onClick={() => setCategorie(c.id)}
              label={c.label}
              icon={c.icon}
              count={compteurs[c.id] ?? 0}
              accent={c.accent}
            />
          ))}
        </div>
      </div>

      <p className="px-1 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-bold tabular-nums text-slate-700 dark:text-slate-200">
          {resultats.length}
        </span>{' '}
        motif{resultats.length > 1 ? 's' : ''} affiché
        {resultats.length > 1 ? 's' : ''}
      </p>

      {resultats.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Aucun motif ne correspond"
          hint="Essayer un autre terme ou retirer le filtre de catégorie."
        />
      ) : (
        <ul className="space-y-2">
          {resultats.map((m) => {
            const cat = CATEGORIES.find((c) => c.id === m.cat)
            const a = ACCENTS[cat.accent]
            const Icon = cat.icon
            return (
              <Card as="li" key={m.code} className="p-3.5">
                <div className="flex items-start gap-3">
                  <span className={`rounded-lg p-2 ring-1 ${a.bg} ${a.ring}`}>
                    <Icon className={`h-4 w-4 ${a.text}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={`rounded-md px-1.5 py-0.5 font-mono text-[11px] font-bold ring-1 ${a.bg} ${a.text} ${a.ring}`}
                      >
                        {m.code}
                      </span>
                      <h2 className="text-sm font-semibold leading-snug">
                        {m.libelle}
                      </h2>
                    </div>
                    <p className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <Truck
                        className="mt-0.5 h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      {m.engins.join(' · ')}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-300">
                      {m.note}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function FiltreChip({ active, onClick, label, icon: Icon, count, accent }) {
  const a = ACCENTS[accent]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors ${
        active
          ? `${a.bg} ${a.text} ${a.ring}`
          : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-slate-800'
      }`}
    >
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
      <span className="tabular-nums opacity-60">{count}</span>
    </button>
  )
}
