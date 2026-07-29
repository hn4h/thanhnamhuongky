type StatusBadgeProps = {
  children: string
  tone?: 'good' | 'warning' | 'critical' | 'neutral'
}

const toneClass: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  good: 'bg-betel/10 text-betel-700 border-betel/25 shadow-sm',
  warning: 'bg-gold-100/80 text-gold-900 border-gold-300/40 shadow-sm',
  critical: 'bg-lacquer-50 text-lacquer-900 border-lacquer-200/50 shadow-sm',
  neutral: 'bg-parchment-200/60 text-lacquer-700 border-lacquer-100 shadow-sm',
}

export function StatusBadge({ children, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`inline-flex items-center shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${toneClass[tone]}`}>{children}</span>
}
