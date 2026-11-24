import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Briques d'interface partagées par les 7 écrans.
 * Objectif : une seule définition des styles (carte, en-tête, accordéon, badge)
 * pour que l'ensemble du guide reste homogène en clair comme en sombre.
 */

export const ACCENTS = {
  red: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    ring: 'ring-red-200 dark:ring-red-900/60',
    solid: 'bg-red-600',
  },
  amber: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'ring-amber-200 dark:ring-amber-900/60',
    solid: 'bg-amber-500',
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    ring: 'ring-blue-200 dark:ring-blue-900/60',
    solid: 'bg-blue-600',
  },
  emerald: {
    text: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'ring-emerald-200 dark:ring-emerald-900/60',
    solid: 'bg-emerald-600',
  },
  violet: {
    text: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    ring: 'ring-violet-200 dark:ring-violet-900/60',
    solid: 'bg-violet-600',
  },
  slate: {
    text: 'text-slate-600 dark:text-slate-300',
    bg: 'bg-slate-100 dark:bg-slate-800/60',
    ring: 'ring-slate-200 dark:ring-slate-700',
    solid: 'bg-slate-600',
  },
}

export function PageHeader({ icon: Icon, title, subtitle, accent = 'red' }) {
  const a = ACCENTS[accent]
  return (
    <header className="mb-5 flex items-start gap-3">
      {Icon && (
        <span className={`mt-0.5 rounded-xl p-2.5 ring-1 ${a.bg} ${a.ring}`}>
          <Icon className={`h-6 w-6 ${a.text}`} aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}

export function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Badge({ children, accent = 'slate', className = '' }) {
  const a = ACCENTS[accent]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ${a.bg} ${a.text} ${a.ring} ${className}`}
    >
      {children}
    </span>
  )
}

export function Collapsible({
  icon: Icon,
  title,
  subtitle,
  accent = 'red',
  defaultOpen = false,
  right = null,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen)
  const a = ACCENTS[accent]

  return (
    <Card className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-slate-800/60 dark:active:bg-slate-800"
      >
        {Icon && (
          <span className={`rounded-lg p-2 ring-1 ${a.bg} ${a.ring}`}>
            <Icon className={`h-5 w-5 ${a.text}`} aria-hidden="true" />
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{title}</span>
          {subtitle && (
            <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </span>
          )}
        </span>
        {right}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
          {children}
        </div>
      )}
    </Card>
  )
}

export function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-10 text-center dark:border-slate-700">
      {Icon && (
        <Icon
          className="mx-auto mb-3 h-8 w-8 text-slate-400"
          aria-hidden="true"
        />
      )}
      <p className="font-medium">{title}</p>
      {hint && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
      )}
    </div>
  )
}

/** Encart d'avertissement : données à confirmer, consignes de sécurité, etc. */
export function Callout({ icon: Icon, accent = 'amber', title, children }) {
  const a = ACCENTS[accent]
  return (
    <div className={`rounded-2xl p-4 ring-1 ${a.bg} ${a.ring}`}>
      <div className="flex gap-3">
        {Icon && (
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${a.text}`} aria-hidden="true" />
        )}
        <div className="min-w-0 text-sm">
          {title && <p className={`font-semibold ${a.text}`}>{title}</p>}
          <div className="mt-1 text-slate-700 dark:text-slate-300">{children}</div>
        </div>
      </div>
    </div>
  )
}
