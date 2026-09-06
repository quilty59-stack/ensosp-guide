import { RadioTower, Antenna, Wrench, Users, Info } from 'lucide-react'
import { RADIO } from '../../data/guide.js'
import { ACCENTS, Card, Callout, PageHeader, Photo } from '../../ui.jsx'

export default function Radio() {
  return (
    <div className="space-y-5">
      <PageHeader
        icon={RadioTower}
        accent="blue"
        title="Procédures radio"
        subtitle={`${RADIO.terminal} — Guide AP COND, page 12.`}
      />

      <Card className="p-4">
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{RADIO.intro}</p>
        <div className="mt-3">
          <Photo
            src="/images/dotation-epi.jpg"
            alt="Dotation individuelle : TPH 700, lampe et masque ARI"
            ratio="aspect-[3/4]"
            legende="Dotation individuelle (page 11 du guide)"
            className="mx-auto max-w-[200px]"
          />
        </div>
      </Card>

      <Card className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Antenna className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          <h2 className="font-semibold">Canaux des centres de secours</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {RADIO.cs.map((cs) => (
            <span
              key={cs}
              className="rounded-lg bg-blue-50 px-3 py-2 font-mono text-sm font-bold text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60"
            >
              {cs}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Exemple donné par le guide
          </p>
          <p className="mt-1 text-sm">
            <strong>{RADIO.exemple.cs}</strong> →{' '}
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {RADIO.exemple.canal}
            </span>
          </p>
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{RADIO.reference}</p>
      </Card>

      <section className="space-y-3">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Canaux spécialisés
        </h2>
        {RADIO.speciaux.map(({ canal, affectation, detail }, i) => {
          const a = ACCENTS[i === 0 ? 'amber' : 'violet']
          const Icon = i === 0 ? Wrench : Users
          return (
            <Card key={canal} className="p-4">
              <div className="flex items-center gap-2">
                <span className={`rounded-lg px-2 py-1 font-mono text-sm font-black ring-1 ${a.bg} ${a.text} ${a.ring}`}>
                  {canal}
                </span>
                <h3 className="flex items-center gap-1.5 font-semibold">
                  <Icon className={`h-4 w-4 ${a.text}`} aria-hidden="true" />
                  {affectation}
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{detail}</p>
            </Card>
          )
        })}
      </section>

      <Callout icon={Info} accent="blue" title="Service MGX">
        {RADIO.mgx}
      </Callout>
    </div>
  )
}
