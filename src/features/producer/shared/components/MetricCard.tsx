import type { ProducerMetric } from '../types'
import { StatusBadge } from './StatusBadge'

type MetricCardProps = {
  metric: ProducerMetric
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="rounded-lg border border-[#ead7a4] bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[#7a5a3a]">{metric.label}</p>
        <StatusBadge tone={metric.status}>{metric.status === 'good' ? 'Tốt' : metric.status === 'warning' ? 'Theo dõi' : 'Cảnh báo'}</StatusBadge>
      </div>
      <p className="mt-4 text-3xl font-bold text-lacquer">
        {metric.value}
        {metric.unit && <span className="ml-1 text-base text-[#8a6417]">{metric.unit}</span>}
      </p>
    </div>
  )
}
