import {
  TriangleAlert,
  ArrowDown,
  Check,
  X,
  OctagonAlert,
  CircleHelp,
  PhoneCall,
} from 'lucide-react'
import { Card, Callout, PageHeader } from '../ui.jsx'

/**
 * Arbre de décision suivi en cas d'accident sur le plateau conduite.
 * `type: 'decision'` affiche les deux branches OUI / NON ; `type: 'action'`
 * affiche une consigne à exécuter avant de passer à l'étape suivante.
 */
const ETAPES = [
  {
    n: 1,
    type: 'action',
    titre: 'Stopper l’atelier',
    consignes: [
      'Ordre d’arrêt immédiat sur le canal du groupe',
      'Contact coupé, frein de stationnement serré, cales en place',
      'Personne ne s’approche tant que la zone n’est pas sûre',
    ],
  },
  {
    n: 2,
    type: 'decision',
    question: 'Y a-t-il une victime ?',
    oui: {
      titre: 'OUI — Bilan et alerte',
      actions: [
        'Message d’urgence sur le TKG 218',
        'Alerte 18 / 112, bilan et gestes de secours (PSE)',
        'Ne pas déplacer la victime sauf danger immédiat',
      ],
    },
    non: {
      titre: 'NON — Poursuivre l’analyse',
      actions: ['Passer à l’évaluation du danger résiduel (étape 3)'],
    },
  },
  {
    n: 3,
    type: 'decision',
    question: 'Un danger persiste-t-il ? (feu, fuite, instabilité, énergie)',
    oui: {
      titre: 'OUI — Sécuriser la zone',
      actions: [
        'Périmètre de sécurité et balisage large',
        'Évacuation des stagiaires au point de rassemblement',
        'Moyens de secours en attente hors zone',
      ],
    },
    non: {
      titre: 'NON — Zone figée',
      actions: ['Interdire l’accès et ne rien déplacer jusqu’aux constatations'],
    },
  },
  {
    n: 4,
    type: 'action',
    titre: 'Alerter la chaîne interne',
    consignes: [
      'Chef du plateau technique puis officier sécurité (TKG 278)',
      'Nature du fait, adresse précise (D2-1, C3-2, E3-4…), engins et personnes concernés',
      'Suspendre les autres ateliers du site le temps du point de situation',
    ],
  },
  {
    n: 5,
    type: 'decision',
    question: 'Un tiers ou la voie publique est-il impliqué ?',
    oui: {
      titre: 'OUI — Cadre judiciaire',
      actions: [
        'Forces de l’ordre : 17',
        'Constat amiable, identités, assurances, immatriculations',
        'Aucune reconnaissance de responsabilité sur place',
      ],
    },
    non: {
      titre: 'NON — Constat interne',
      actions: ['Constat établi par l’AP COND avec l’officier sécurité'],
    },
  },
  {
    n: 6,
    type: 'action',
    titre: 'Figer et documenter',
    consignes: [
      'Photos d’ensemble puis de détail, croquis coté',
      'Identité des témoins, heure exacte, conditions météo et visibilité',
      'Relevé du carnet de bord et du kilométrage',
    ],
  },
  {
    n: 7,
    type: 'action',
    titre: 'Rapport et suites',
    consignes: [
      'Rapport d’accident transmis sous 24 h au chef de plateau',
      'Déclaration d’assurance et information de la direction',
      'Engin immobilisé jusqu’à validation de la maintenance',
      'RETEX en équipe avant la reprise de l’atelier',
    ],
  },
]

function Connector() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <ArrowDown className="h-5 w-5 text-slate-300 dark:text-slate-600" />
    </div>
  )
}

function StepNumber({ n, decision }) {
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white ${
        decision ? 'bg-amber-500' : 'bg-red-600'
      }`}
    >
      {n}
    </span>
  )
}

function Branche({ variant, titre, actions }) {
  const oui = variant === 'oui'
  const Icon = oui ? Check : X
  return (
    <div
      className={`rounded-xl p-3 ring-1 ${
        oui
          ? 'bg-emerald-50 ring-emerald-200 dark:bg-emerald-950/40 dark:ring-emerald-900/60'
          : 'bg-red-50 ring-red-200 dark:bg-red-950/40 dark:ring-red-900/60'
      }`}
    >
      <p
        className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wide ${
          oui
            ? 'text-emerald-700 dark:text-emerald-400'
            : 'text-red-700 dark:text-red-400'
        }`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        {titre}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
        {actions.map((a) => (
          <li key={a} className="flex gap-2">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                oui ? 'bg-emerald-600' : 'bg-red-600'
              }`}
              aria-hidden="true"
            />
            <span className="leading-snug">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Accident() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={TriangleAlert}
        accent="red"
        title="Conduite à tenir — accident"
        subtitle="Arbre de décision applicable à tout accident survenu sur le plateau conduite."
      />

      <Callout icon={OctagonAlert} accent="red" title="Réflexe immédiat">
        Arrêter, protéger, alerter — dans cet ordre. Aucun atelier ne reprend
        avant l’accord de l’officier sécurité.
      </Callout>

      <div>
        {ETAPES.map((etape, i) => (
          <div key={etape.n}>
            <Card className="p-4">
              {etape.type === 'action' ? (
                <>
                  <div className="flex items-center gap-3">
                    <StepNumber n={etape.n} />
                    <h2 className="font-bold leading-tight">{etape.titre}</h2>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    {etape.consignes.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600"
                          aria-hidden="true"
                        />
                        <span className="leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <StepNumber n={etape.n} decision />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
                        <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
                        Décision
                      </p>
                      <h2 className="mt-0.5 font-bold leading-tight">
                        {etape.question}
                      </h2>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <Branche variant="oui" {...etape.oui} />
                    <Branche variant="non" {...etape.non} />
                  </div>
                </>
              )}
            </Card>
            {i < ETAPES.length - 1 && <Connector />}
          </div>
        ))}
      </div>

      <a
        href="tel:112"
        className="flex items-center gap-3 rounded-2xl bg-red-600 p-4 text-white shadow-sm transition-transform active:scale-[0.99]"
      >
        <PhoneCall className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block font-bold leading-tight">
            Alerter les secours — 18 / 112
          </span>
          <span className="block text-xs text-red-100">
            Site, nature du fait, nombre de victimes, moyens demandés
          </span>
        </span>
      </a>
    </div>
  )
}
