import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerAlertsProps = {
  product: ProducerProductModule
}

export function ProducerAlerts({ product }: ProducerAlertsProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`Cảnh báo ${product.name}`}>
      <div className="grid gap-3">
        {product.data.alerts.map((alert) => (
          <article key={alert.id} className="rounded-lg border border-[#ead7a4] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#8a6417]">{alert.createdAt}</p>
                <h2 className="mt-1 text-lg font-bold">{alert.title}</h2>
              </div>
              <StatusBadge tone={alert.severity === 'high' ? 'critical' : alert.severity === 'medium' ? 'warning' : 'neutral'}>{alert.severity}</StatusBadge>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#7a5a3a]">{alert.message}</p>
          </article>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
