import { Building, Download, Mail, Phone, RadioTower } from 'lucide-react'
import { CONTACTS, ENSOSP } from '../../data/guide.js'
import { Card, PageHeader } from '../../ui.jsx'

/** Un numéro composable d'un appui : sur le plateau, on appelle sans recopier. */
function Numero({ contact }) {
  const { label, numero, affichage, courriel, canal, detail, urgent } = contact
  const href = numero ? `tel:${numero}` : courriel ? `mailto:${courriel}` : null
  const valeur = affichage ?? numero ?? courriel ?? canal
  const Icone = courriel ? Mail : canal ? RadioTower : Phone

  const contenu = (
    <>
      <span
        className={`mt-0.5 shrink-0 rounded-xl p-2.5 ring-1 ${
          urgent
            ? 'bg-red-50 ring-red-200 dark:bg-red-950/40 dark:ring-red-900/60'
            : 'bg-slate-100 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700'
        }`}
      >
        <Icone
          className={`h-5 w-5 ${urgent ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}
          aria-hidden="true"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        <span
          className={`block font-mono text-sm ${
            urgent ? 'font-bold text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {valeur}
        </span>
        {detail && (
          <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
            {detail}
          </span>
        )}
      </span>
    </>
  )

  if (!href) {
    return <div className="flex gap-3 p-4">{contenu}</div>
  }
  return (
    <a
      href={href}
      className="flex gap-3 p-4 transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60"
    >
      {contenu}
    </a>
  )
}

export default function Contacts() {
  const urgents = CONTACTS.filter((c) => c.urgent || c.numero)
  const autres = CONTACTS.filter((c) => !c.urgent && !c.numero)

  return (
    <div className="space-y-5">
      <PageHeader
        icon={Phone}
        accent="red"
        title="Contacts & infos"
        subtitle="Numéros, canaux radio et coordonnées de l’École."
      />

      <section>
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Numéros à composer
        </h2>
        <Card>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {urgents.map((c) => (
              <Numero key={c.id} contact={c} />
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Canaux radio et courriel
        </h2>
        <Card>
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {autres.map((c) => (
              <Numero key={c.id} contact={c} />
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          École
        </h2>
        <Card className="p-4">
          <div className="flex gap-3">
            <Building className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
            <div className="min-w-0 space-y-2 text-sm">
              <p className="font-semibold">{ENSOSP.nom}</p>
              <p className="text-slate-600 dark:text-slate-400">{ENSOSP.adresse}</p>
              <p>
                <a
                  href={`tel:${ENSOSP.telephone.replace(/[^+\d]/g, '')}`}
                  className="font-mono font-semibold text-red-600 dark:text-red-400"
                >
                  {ENSOSP.telephone}
                </a>
              </p>
              <p>
                <a
                  href={`https://${ENSOSP.site}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-red-600 dark:text-red-400"
                >
                  {ENSOSP.site}
                </a>
              </p>
              <p className="italic text-slate-500 dark:text-slate-400">{ENSOSP.devise}</p>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Document source
        </h2>
        <a
          href="/guide_apcond.pdf"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-2xl bg-red-600 p-4 font-semibold text-white shadow-sm transition-colors hover:bg-red-700 active:bg-red-800"
        >
          <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="flex-1">Télécharger le guide complet (PDF)</span>
        </a>
        <p className="mt-2 px-1 text-xs text-slate-500 dark:text-slate-400">
          {ENSOSP.edition} — 41 pages. Le téléchargement nécessite une connexion.
        </p>
      </section>
    </div>
  )
}
