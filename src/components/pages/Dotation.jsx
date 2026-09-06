import { AlertTriangle, Package, Shirt, Wrench } from 'lucide-react'
import { DOTATION } from '../../data/guide.js'
import { Callout, Card, PageHeader, Photo } from '../../ui.jsx'

export default function Dotation() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={Shirt}
        accent="emerald"
        title="Dotation EPI & matériels"
        subtitle="Perception, vérification et restitution — page 11 du guide."
      />

      <Card className="p-4">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {DOTATION.intro}
        </p>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <Shirt className="h-4 w-4" aria-hidden="true" />
          Tenue de feu — magasin habillement
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {DOTATION.epi.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:ring-emerald-900/60"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <Package className="h-4 w-4" aria-hidden="true" />
          Local « AP »
        </h2>
        <p className="mb-3 text-sm text-slate-700 dark:text-slate-300">{DOTATION.local}</p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {DOTATION.materiel.map((item) => (
            <li
              key={item}
              className="rounded-xl bg-blue-50 px-3 py-2.5 text-center text-sm font-semibold text-blue-800 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:ring-blue-900/60"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Photo
            src="/images/dotation-epi.jpg"
            alt="Planche de la dotation : casque F1, cagoule, veste, gants, surpantalon, masque ARI, TPH 700 et lampe"
            ratio="aspect-[3/4]"
            legende="Dotation individuelle (page 11 du guide)"
            className="mx-auto max-w-[240px]"
          />
        </div>
      </Card>

      <Callout icon={AlertTriangle} accent="red" title="Consigne bouteilles ARI">
        Changement des bouteilles d’ARI dès que la pression est inférieure à
        100 bars, pour des raisons de logistique.
      </Callout>

      <Card className="p-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          <Wrench className="h-4 w-4" aria-hidden="true" />
          Vérification, nettoyage, restitution
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {DOTATION.consigne}
        </p>
      </Card>
    </div>
  )
}
