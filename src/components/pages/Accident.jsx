import { TriangleAlert, ArrowDown, Check, X, OctagonAlert, CircleHelp, PhoneCall, Radio } from 'lucide-react'
import { CONDUITE_ACCIDENT } from '../../data/guide.js'
import { Card, Callout, PageHeader } from '../../ui.jsx'

function Moyens({ avec }) {
  if (!avec?.length) return null
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {avec.map((m) => (
        <span
          key={m}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
        >
          <Radio className="h-3 w-3" aria-hidden="true" />
          {m}
        </span>
      ))}
    </div>
  )
}

function Branche({ variant, actions, avec }) {
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
          oui ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'
        }`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        {oui ? 'OUI' : 'NON'}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-slate-700 dark:text-slate-300">
        {actions.map((a) => (
          <li key={a} className="flex gap-2">
            <span
              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${oui ? 'bg-emerald-600' : 'bg-red-600'}`}
              aria-hidden="true"
            />
            <span className="leading-snug">{a}</span>
          </li>
        ))}
      </ul>
      <Moyens avec={avec} />
    </div>
  )
}

export default function Accident() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={TriangleAlert}
        accent="red"
        title="Conduite à tenir en cas d’accident"
        subtitle="Annexe du Guide AP COND, page 31 : qui fait quoi, avec quels moyens."
      />

      <Callout icon={OctagonAlert} accent="red" title="Premier réflexe">
        Le témoin informe immédiatement le DIREX et/ou l’officier sécurité, par
        radio OP/SPE ou TPH 700.
      </Callout>

      <div>
        {CONDUITE_ACCIDENT.map((etape, i) => (
          <div key={etape.n}>
            <Card className="p-4">
              {etape.type === 'decision' ? (
                <>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-sm font-black text-white">
                      {etape.n}
                    </span>
                    <div className="min-w-0">
                      <p className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
                        <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
                        Décision
                      </p>
                      <h2 className="mt-0.5 font-bold leading-tight">{etape.question}</h2>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <Branche variant="oui" {...etape.oui} />
                    <Branche variant="non" {...etape.non} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-600 text-sm font-black text-white">
                      {etape.n}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-black uppercase tracking-wide text-red-600 dark:text-red-400">
                        {etape.qui}
                      </p>
                      <p className="mt-1 text-sm leading-snug text-slate-700 dark:text-slate-300">
                        {etape.quoi}
                      </p>
                      <Moyens avec={etape.avec} />
                    </div>
                  </div>
                </>
              )}
            </Card>
            {i < CONDUITE_ACCIDENT.length - 1 && (
              <div className="flex justify-center py-1.5" aria-hidden="true">
                <ArrowDown className="h-5 w-5 text-slate-300 dark:text-slate-600" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <a
          href="tel:15"
          className="flex items-center gap-3 rounded-2xl bg-red-600 p-4 text-white shadow-sm transition-transform active:scale-[0.99]"
        >
          <PhoneCall className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span>
            <span className="block font-bold leading-tight">CRRA 15</span>
            <span className="block text-xs text-red-100">Détresse vitale</span>
          </span>
        </a>
        <a
          href="tel:0671239552"
          className="flex items-center gap-3 rounded-2xl bg-slate-800 p-4 text-white shadow-sm transition-transform active:scale-[0.99] dark:bg-slate-700"
        >
          <PhoneCall className="h-6 w-6 shrink-0" aria-hidden="true" />
          <span>
            <span className="block font-bold leading-tight">Chef de plateau</span>
            <span className="block text-xs text-slate-300">333 · 06 71 23 95 52</span>
          </span>
        </a>
      </div>
    </div>
  )
}
