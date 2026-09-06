import {
  Smartphone,
  Clock,
  Sunrise,
  RadioTower,
  HardHat,
  Boxes,
  PhoneCall,
  ChevronRight,
  Info,
} from 'lucide-react'
import { TABS } from './Navigation.jsx'
import { ACCENTS, Card, Callout, PageHeader } from '../ui.jsx'

/** Les 5 repères que l'AP COND vérifie avant chaque prise de service. */
const INFOS_RAPIDES = [
  {
    id: 'lundi',
    icon: Clock,
    titre: 'Lundi — 7h30',
    detail: 'Prise de service, ouverture du plateau et accueil des stagiaires',
  },
  {
    id: 'semaine',
    icon: Sunrise,
    titre: 'Mardi à jeudi — 7h45',
    detail: 'Rassemblement puis mise en place des ateliers',
  },
  {
    id: 'radio',
    icon: RadioTower,
    titre: 'Radio : canal du CS',
    detail: 'TGK 269 — canal du centre de secours attribué au groupe',
  },
  {
    id: 'epi',
    icon: HardHat,
    titre: 'EPI complets',
    detail: 'Casque F1, gants, veste et sur-pantalon, rangers, gilet HV',
  },
  {
    id: 'inventaire',
    icon: Boxes,
    titre: 'Inventaire des engins',
    detail: 'Niveaux, carburant, ARI et matériel avant tout départ',
  },
]

export default function HomePage({ onNavigate, onOpenEmulator }) {
  const rubriques = TABS.filter((t) => t.id !== 'accueil')

  return (
    <div className="space-y-6">
      <PageHeader
        title="Guide AP COND"
        subtitle="Aide-mémoire de l’adjoint pédagogique conduite — plateau technique ENSOSP. Consultable hors connexion."
      />

      {/* 7 accès directs : les 6 rubriques du guide + l'appel des secours. */}
      <section aria-label="Rubriques" className="grid grid-cols-2 gap-3">
        {rubriques.map(({ id, title, label, icon: Icon, accent, description }) => {
          const a = ACCENTS[accent]
          return (
            <Card
              as="button"
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className="flex flex-col items-start gap-2 p-4 text-left transition-transform active:scale-[0.98]"
            >
              <span className={`rounded-xl p-2 ring-1 ${a.bg} ${a.ring}`}>
                <Icon className={`h-5 w-5 ${a.text}`} aria-hidden="true" />
              </span>
              <span className="font-semibold leading-tight">{title}</span>
              <span className="text-xs leading-snug text-slate-500 dark:text-slate-400">
                {description}
              </span>
              <span
                className={`mt-auto inline-flex items-center gap-0.5 pt-1 text-xs font-semibold ${a.text}`}
              >
                {label}
                <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Card>
          )
        })}

        <a
          href="tel:18"
          className="col-span-2 flex items-center gap-3 rounded-2xl bg-red-600 p-4 text-white shadow-sm transition-transform active:scale-[0.99]"
        >
          <PhoneCall className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1">
            <span className="block font-bold leading-tight">
              Urgence — 18 / 112
            </span>
            <span className="block text-xs text-red-100">
              Appel direct des secours depuis le plateau
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
        </a>
      </section>

      <section
        aria-labelledby="infos-rapides"
        className="rounded-2xl bg-blue-50 p-4 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:ring-blue-900/60"
      >
        <h2
          id="infos-rapides"
          className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-700 dark:text-blue-300"
        >
          <Info className="h-4 w-4" aria-hidden="true" />
          Infos rapides
        </h2>
        <ul className="space-y-2.5">
          {INFOS_RAPIDES.map(({ id, icon: Icon, titre, detail }) => (
            <li key={id} className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-white/80 p-1.5 ring-1 ring-blue-200 dark:bg-slate-900/60 dark:ring-blue-900/60">
                <Icon
                  className="h-4 w-4 text-blue-600 dark:text-blue-300"
                  aria-hidden="true"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{titre}</span>
                <span className="block text-xs leading-snug text-slate-600 dark:text-slate-300">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onNavigate('taches')}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 dark:text-blue-300"
        >
          Ouvrir la fiche de tâches
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </section>

      {onOpenEmulator && (
        <button
          type="button"
          onClick={onOpenEmulator}
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-left transition-colors hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/60"
        >
          <Smartphone
            className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold">
              Tester en émulateur
            </span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">
              Aperçu iPhone, iPad et Android avec encoche et feuille
              d’installation
            </span>
          </span>
          <ChevronRight
            className="h-4 w-4 shrink-0 text-slate-400"
            aria-hidden="true"
          />
        </button>
      )}

      <Callout icon={Info} accent="slate" title="Données de référence">
        Horaires, contacts, canaux radio et motifs NEXIS sont regroupés en tête
        de chaque fichier de <code className="text-xs">src/components/</code> : à
        faire valider par le chef de plateau avant diffusion.
      </Callout>
    </div>
  )
}
