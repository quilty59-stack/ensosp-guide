import { CalendarClock, ClipboardList, Users } from 'lucide-react'
import { HORAIRES_MSP, PLANIFICATION } from '../../data/guide.js'
import { Callout, Card, PageHeader } from '../../ui.jsx'

/** Une demi-journée du tableau des horaires (page 9 du guide). */
function TableauHoraires({ titre, lignes, colonnes }) {
  return (
    <div>
      <h2 className="mb-2 px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {titre}
      </h2>
      {/* Cinq jours ne tiennent pas dans 390 px : le tableau défile seul. */}
      <Card className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr>
              {colonnes.map((jour) => (
                <th
                  key={jour}
                  scope="col"
                  className="border-b border-slate-200 px-2 py-2.5 text-center text-xs font-bold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:text-slate-300"
                >
                  {jour}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lignes.map((ligne, i) => (
              <tr key={i} className="odd:bg-slate-50/60 dark:odd:bg-slate-800/30">
                {ligne.map((cellule, j) => (
                  <td
                    key={j}
                    className="border-b border-slate-100 px-2 py-2 text-center align-middle text-xs leading-snug text-slate-700 last:border-r-0 dark:border-slate-800/60 dark:text-slate-300"
                  >
                    {cellule || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default function Horaires() {
  const { colonnes, matin, apresMidi } = HORAIRES_MSP

  return (
    <div className="space-y-5">
      <PageHeader
        icon={CalendarClock}
        accent="blue"
        title="Horaires des MSP"
        subtitle="Déroulé type de la semaine — page 9 du guide."
      />

      <TableauHoraires titre="Matin" lignes={matin} colonnes={colonnes} />

      <div className="rounded-xl bg-slate-100 px-4 py-2 text-center text-sm font-semibold text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
        Pause méridienne
      </div>

      <TableauHoraires titre="Après-midi" lignes={apresMidi} colonnes={colonnes} />

      <section className="space-y-3">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Planification des CS et des MSP
        </h2>

        <Card className="p-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {PLANIFICATION.intro}
          </p>

          <div className="mt-4">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              Centres de secours
            </h3>
            <div className="flex flex-wrap gap-2">
              {PLANIFICATION.cs.map((cs) => (
                <span
                  key={cs}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold uppercase text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900/60"
                >
                  {cs}
                </span>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {PLANIFICATION.csNote}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Missions suivies par la feuille de garde
            </h3>
            <ul className="space-y-1.5">
              {PLANIFICATION.missions.map((m) => (
                <li key={m} className="flex gap-2.5 text-sm">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                  <span className="text-slate-700 dark:text-slate-300">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {PLANIFICATION.blocs.map(({ titre, detail, liste }) => (
          <Card key={titre} className="p-4">
            <h3 className="font-semibold">{titre}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{detail}</p>
            {liste && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {liste.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}

        <Callout icon={ClipboardList} accent="slate" title="Feuille de garde nominative">
          La feuille de garde de la semaine — encadrants, apprenants et
          manœuvrants nommément désignés, canaux radio de chaque CS — est
          affichée sur le plateau. Elle n’est pas reproduite ici : elle change
          chaque semaine et contient des données personnelles.
        </Callout>
      </section>
    </div>
  )
}
