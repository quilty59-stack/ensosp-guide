import {
  RadioTower,
  Antenna,
  Volume2,
  TriangleAlert,
  Wrench,
  Info,
  MessageSquare,
} from 'lucide-react'
import { ACCENTS, Card, Callout, Collapsible, PageHeader } from '../ui.jsx'

/** Canal commun du plateau : chaque CS dispose de son canal d'exercice. */
const TGK_COMMUN = 'TGK 269'

const CANAUX_CS = [
  { canal: 'ALPHA', cs: 'CS ALPHA', usage: 'Groupe 1 — Pavillon (D2)' },
  { canal: 'BRAVO', cs: 'CS BRAVO', usage: 'Groupe 2 — Immeuble (C3)' },
  { canal: 'CHARLIE', cs: 'CS CHARLIE', usage: 'Groupe 3 — Zone urbaine (E3)' },
  { canal: 'DELTA', cs: 'CS DELTA', usage: 'Groupe 4 — Circuit de conduite' },
  { canal: 'ECHO', cs: 'CS ECHO', usage: 'Groupe 5 — Manœuvres hors plateau' },
  { canal: 'INDIA', cs: 'CS INDIA', usage: 'Groupe 6 — Réserve et renfort' },
]

const CANAUX_SPECIALISES = [
  {
    tgk: 'TGK 278',
    nom: 'Commandement plateau',
    accent: 'violet',
    usage:
      'Liaison AP COND ↔ chef du plateau technique. Réservé à la coordination et aux demandes de moyens.',
  },
  {
    tgk: 'TGK 218',
    nom: 'Urgence / secours',
    accent: 'red',
    usage:
      'Canal d’alerte en cas d’accident ou de blessé. Priorité absolue : tout autre trafic cesse.',
  },
]

const PROCEDURE = [
  'Allumer le TPH 700 et vérifier le niveau de batterie et le mode (relayé par défaut).',
  `Sélectionner ${TGK_COMMUN} puis le canal du CS attribué au groupe.`,
  'Essai radio à la prise de service : « <indicatif appelé> de <indicatif appelant>, essai radio, parlez ».',
  'Message court, phrases brèves, pas de nom propre : indicatifs uniquement.',
  'Terminer chaque échange par « reçu » puis « terminé ».',
  'Passer en mode direct (DIR) uniquement en cas de perte de couverture relais.',
]

const URGENCE = [
  'Annoncer « MESSAGE D’URGENCE » à trois reprises sur le TGK 218.',
  'Donner : le site et l’adresse (D2-1, C3-2…), la nature du fait, le nombre de victimes.',
  'Préciser les moyens demandés et le point de rendez-vous des secours.',
  'Rester à l’écoute et ne plus quitter le canal jusqu’à l’arrivée des secours.',
]

export default function Radio() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={RadioTower}
        accent="blue"
        title="Communications TPH 700"
        subtitle="Canaux d’exercice du plateau conduite et procédure d’exploitation radio."
      />

      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Antenna
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
          <h2 className="font-semibold">
            Canaux par CS —{' '}
            <span className="font-mono text-blue-600 dark:text-blue-400">
              {TGK_COMMUN}
            </span>
          </h2>
        </div>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {CANAUX_CS.map(({ canal, cs, usage }) => (
            <li key={canal} className="flex items-center gap-3 py-2.5">
              <span className="w-20 shrink-0 rounded-lg bg-blue-50 px-2 py-1 text-center font-mono text-xs font-bold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60">
                {canal}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{cs}</span>
                <span className="block truncate text-xs text-slate-500 dark:text-slate-400">
                  {usage}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <section aria-label="Canaux spécialisés" className="space-y-3">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Canaux spécialisés
        </h2>
        {CANAUX_SPECIALISES.map(({ tgk, nom, usage, accent }) => {
          const a = ACCENTS[accent]
          return (
            <Card key={tgk} className={`p-4 ring-1 ${a.ring}`}>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-lg px-2 py-1 font-mono text-sm font-black ring-1 ${a.bg} ${a.text} ${a.ring}`}
                >
                  {tgk}
                </span>
                <h3 className="font-semibold">{nom}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                {usage}
              </p>
            </Card>
          )
        })}
      </section>

      <Callout icon={Wrench} accent="amber" title="Maintenance des TPH 700">
        Aucune intervention sur un poste : un TPH 700 déchargé, endommagé ou qui
        ne passe pas l’essai radio est échangé au magasin contre un poste
        opérationnel, puis signalé à la maintenance dans la journée. Ne jamais
        modifier la programmation ni les canaux enregistrés.
      </Callout>

      <Collapsible
        icon={Volume2}
        accent="blue"
        title="Procédure d’exploitation"
        subtitle="Prise de service, essai radio et discipline de trafic"
        defaultOpen
      >
        <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {PROCEDURE.map((etape, i) => (
            <li key={etape} className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <span className="leading-snug">{etape}</span>
            </li>
          ))}
        </ol>
      </Collapsible>

      <Collapsible
        icon={MessageSquare}
        accent="red"
        title="Message d’urgence"
        subtitle="Sur TGK 218 — priorité absolue"
      >
        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          {URGENCE.map((u) => (
            <li key={u} className="flex gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                aria-hidden="true"
              />
              <span className="leading-snug">{u}</span>
            </li>
          ))}
        </ul>
      </Collapsible>

      <Callout icon={TriangleAlert} accent="amber" title="Avant chaque stage">
        Le TGK et l’attribution des canaux sont confirmés au brief du lundi : les
        valeurs ci-dessus sont la configuration par défaut du plateau.
      </Callout>

      <Callout icon={Info} accent="slate">
        Terminal : <strong>TPH 700</strong> (réseau ANTARES). Essai radio
        obligatoire à chaque prise de service, avant le premier départ.
      </Callout>
    </div>
  )
}
