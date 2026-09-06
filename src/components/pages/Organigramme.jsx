import { Users, Mail, UserRound } from 'lucide-react'
import { ORGANIGRAMME } from '../../data/guide.js'
import { ACCENTS, Card, PageHeader, Callout } from '../../ui.jsx'

export default function Organigramme() {
  return (
    <div className="space-y-4">
      <PageHeader
        icon={Users}
        accent="violet"
        title="Organigramme du plateau technique"
        subtitle="Annexe du Guide AP COND, page 30."
      />

      {ORGANIGRAMME.map((section) => {
        const a = ACCENTS[section.accent]
        return (
          <Card key={section.id} className="overflow-hidden">
            <div className={`flex items-center justify-between gap-2 px-4 py-3 ${a.bg}`}>
              <h2 className={`text-sm font-bold uppercase tracking-wide ${a.text}`}>
                {section.titre}
              </h2>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {section.membres.length}
              </span>
            </div>
            <ul className="divide-y divide-slate-200 dark:divide-slate-800">
              {section.membres.map((m) => (
                <li key={m.nom} className="flex items-start gap-3 px-4 py-3">
                  <span className={`mt-0.5 rounded-lg p-1.5 ring-1 ${a.bg} ${a.ring}`}>
                    <UserRound className={`h-4 w-4 ${a.text}`} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{m.nom}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{m.fonction}</p>
                    {m.rattachement && (
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {m.rattachement}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            {section.courriel && (
              <div className="border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                <a
                  href={`mailto:${section.courriel}`}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold ${a.text}`}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {section.courriel}
                </a>
              </div>
            )}
          </Card>
        )
      })}

      <Callout accent="slate" icon={Users} title="Document source">
        Organigramme reproduit d’après l’annexe du guide. En cas de mouvement de
        personnel, mettre à jour <code className="text-xs">ORGANIGRAMME</code> dans{' '}
        <code className="text-xs">src/data/guide.js</code>.
      </Callout>
    </div>
  )
}
