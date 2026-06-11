import { Link } from 'react-router-dom'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerDashboardProps = {
  product: ProducerProductModule
}

export function ProducerDashboard({ product }: ProducerDashboardProps) {
  const readyCount = product.data.batches.filter((batch) => batch.status === 'ready').length

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`Dashboard ${product.name}`}>
      <section className="grid gap-4 lg:grid-cols-[1.3fr_0.8fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {product.data.metrics.map((metric) => (
            <MetricCard key={metric.key} metric={metric} />
          ))}
        </div>
        <div className="rounded-lg border border-[#ead7a4] bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8a6417]">Tóm tắt vận hành</p>
          <h2 className="mt-3 text-xl font-bold">{product.shortName}</h2>
          <div className="mt-5 space-y-3">
            <div className="flex justify-between"><span>Lô đang theo dõi</span><strong>{product.data.batches.length}</strong></div>
            <div className="flex justify-between"><span>Lô sẵn sàng</span><strong>{readyCount}</strong></div>
            <div className="flex justify-between"><span>Cảnh báo</span><strong>{product.data.alerts.length}</strong></div>
            <div className="flex justify-between"><span>Thiết bị</span><strong>{product.data.devices.length}</strong></div>
          </div>
          <Link to={product.routes.batches} className="mt-6 inline-flex rounded-md px-4 py-2 text-sm font-semibold text-white" style={{ background: product.theme.primary }}>
            Xem lô sản xuất
          </Link>
        </div>
      </section>

      <section className="mt-5 rounded-lg border border-[#ead7a4] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Cảnh báo mới nhất</h2>
          <StatusBadge tone={product.data.alerts[0]?.severity === 'high' ? 'critical' : 'warning'}>{product.data.alerts[0]?.severity === 'high' ? 'Ưu tiên cao' : 'Theo dõi'}</StatusBadge>
        </div>
        <p className="font-medium">{product.data.alerts[0]?.title}</p>
        <p className="mt-1 text-sm text-[#7a5a3a]">{product.data.alerts[0]?.message}</p>
      </section>
    </ProducerScreenShell>
  )
}
