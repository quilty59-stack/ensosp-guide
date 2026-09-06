import {
  Users,
  Shield,
  UserCog,
  Truck,
  Package,
  Wrench,
  Phone,
  Siren,
  UserRound,
  Info,
} from 'lucide-react'
import { ACCENTS, Card, Callout, Collapsible, PageHeader } from '../ui.jsx'

/**
 * Les fonctions du plateau sont figées, les noms ne le sont pas : renseigner
 * `nom` et `tel` au fil des affectations. Un `tel` rempli devient un appel direct.
 */
const SECTIONS = [
  {
    id: 'direction',
    titre: 'Direction',
    icon: Shield,
    accent: 'violet',
    membres: [
      {
        role: 'Directeur du plateau technique et pédagogique',
        nom: '',
        mission: 'Autorité sur l’ensemble du site et validation des scénarios',
        tel: null,
      },
      {
        role: 'Adjoint au directeur',
        nom: '',
        mission: 'Continuité de direction et arbitrage des priorités',
        tel: null,
      },
    ],
  },
  {
    id: 'encadrement',
    titre: 'Encadrement',
    icon: UserCog,
    accent: 'blue',
    membres: [
      {
        role: 'Chef du plateau technique',
        nom: '',
        mission: 'Coordination quotidienne des ateliers et des groupes',
        tel: null,
      },
      {
        role: 'Responsable pédagogique conduite',
        nom: '',
        mission: 'Contenu des stages, évaluations et suivi des stagiaires',
        tel: null,
      },
      {
        role: 'Officier sécurité',
        nom: '',
        mission: 'Analyse de risque, arrêt d’atelier, retour d’expérience',
        tel: null,
      },
    ],
  },
  {
    id: 'ap',
    titre: 'Adjoints pédagogiques (AP)',
    icon: Truck,
    accent: 'red',
    membres: [
      {
        role: 'AP COND — référent',
        nom: '',
        mission: 'Pilotage des ateliers conduite et répartition des engins',
        tel: null,
      },
      {
        role: 'AP COND — plateau',
        nom: '',
        mission: 'Encadrement direct des stagiaires sur les 3 sites',
        tel: null,
      },
      {
        role: 'AP INC / SAP en appui',
        nom: '',
        mission: 'Renfort sur les scénarios mixtes conduite + intervention',
        tel: null,
      },
    ],
  },
  {
    id: 'magasin',
    titre: 'Magasin',
    icon: Package,
    accent: 'amber',
    membres: [
      {
        role: 'Gestionnaire du magasin',
        nom: '',
        mission: 'Dotation EPI, TPH 700, ARI, consommables et inventaire',
        tel: null,
        mail: 'magasin-central@ensosp.fr',
      },
      {
        role: 'Agent magasinier',
        nom: '',
        mission: 'Sorties et retours de matériel, réassort hebdomadaire',
        tel: null,
      },
    ],
  },
  {
    id: 'maintenance',
    titre: 'Maintenance',
    icon: Wrench,
    accent: 'emerald',
    membres: [
      {
        role: 'Atelier mécanique',
        nom: '',
        mission: 'Entretien des engins, immobilisations et remise en service',
        tel: null,
      },
      {
        role: 'Maintenance des installations',
        nom: '',
        mission: 'Bâtiments, portails, éclairage et signalétique des sites',
        tel: null,
      },
    ],
  },
]

const URGENCES = [
  {
    label: 'Secours — 18 / 112',
    numero: '18',
    affichage: '18 / 112',
    detail: 'Sapeurs-pompiers, victime ou sinistre sur le plateau',
    fort: true,
  },
  {
    label: 'Urgence interne ENSOSP',
    numero: '333',
    affichage: '333',
    detail: 'Depuis un poste fixe du site — alerte immédiate du PC sécurité',
    fort: true,
  },
  {
    label: 'Astreinte plateau technique',
    numero: '0671239552',
    affichage: '06 71 23 95 52',
    detail: 'Cadre d’astreinte, joignable en dehors des heures d’ouverture',
  },
  {
    label: 'Standard ENSOSP',
    numero: '0442390666',
    affichage: '04 42 39 06 66',
    detail: 'Accueil général et transfert vers les services',
  },
  {
    label: 'SAMU',
    numero: '15',
    affichage: '15',
    detail: 'Urgence médicale, victime inconsciente',
  },
  {
    label: 'Police / Gendarmerie',
    numero: '17',
    affichage: '17',
    detail: 'Accident avec tiers, dépôt de plainte',
  },
]

function Contact({ role, nom, mission, tel, mail, accent }) {
  const a = ACCENTS[accent]
  return (
    <li className="flex items-start gap-3 py-3">
      <span
        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.solid}`}
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug">{role}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <UserRound className="h-3 w-3 shrink-0" aria-hidden="true" />
          {nom || <span className="italic">nom à compléter</span>}
        </p>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {mission}
        </p>
        {mail && (
          <a
            href={`mailto:${mail}`}
            className={`mt-1.5 inline-block text-xs font-semibold ${a.text}`}
          >
            {mail}
          </a>
        )}
      </div>
      {tel ? (
        <a
          href={`tel:${tel.replace(/\s/g, '')}`}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${a.bg} ${a.text} ${a.ring}`}
        >
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {tel}
        </a>
      ) : (
        <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          poste à compléter
        </span>
      )}
    </li>
  )
}

export default function Organigramme() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={Users}
        accent="violet"
        title="Organigramme"
        subtitle="Qui fait quoi sur le plateau technique, et qui appeler en premier."
      />

      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 border-b border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/60 dark:bg-red-950/40">
          <Siren
            className="h-5 w-5 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
          <h2 className="font-bold text-red-700 dark:text-red-400">
            Contacts urgents
          </h2>
        </div>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {URGENCES.map(({ label, numero, affichage, detail, fort }) => (
            <li key={numero}>
              <a
                href={`tel:${numero}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    fort
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{label}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    {detail}
                  </span>
                </span>
                <span
                  className={`shrink-0 whitespace-nowrap font-mono text-sm font-bold ${
                    fort
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {affichage}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <div className="space-y-3">
        {SECTIONS.map(({ id, titre, icon, accent, membres }) => (
          <Collapsible
            key={id}
            icon={icon}
            accent={accent}
            title={titre}
            subtitle={`${membres.length} fonction${membres.length > 1 ? 's' : ''}`}
            defaultOpen={id === 'ap'}
          >
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {membres.map((m) => (
                <Contact key={m.role} {...m} accent={accent} />
              ))}
            </ul>
          </Collapsible>
        ))}
      </div>

      <Callout icon={Info} accent="slate" title="Mise à jour">
        Les noms et postes se renseignent dans le tableau{' '}
        <code className="text-xs">SECTIONS</code> de{' '}
        <code className="text-xs">src/components/Organigramme.jsx</code> — une
        fois le champ <code className="text-xs">tel</code> rempli, le contact
        devient un appel direct.
      </Callout>
    </div>
  )
}
