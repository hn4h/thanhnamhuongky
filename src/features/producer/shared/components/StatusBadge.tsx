type StatusBadgeProps = {
  children: string
  tone?: 'good' | 'warning' | 'critical' | 'neutral'
}

const toneClass: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  good: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  critical: 'bg-red-100 text-red-800 border-red-200',
  neutral: 'bg-stone-100 text-stone-700 border-stone-200',
}

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${toneClass[tone]}`}>{children}</span>
}
