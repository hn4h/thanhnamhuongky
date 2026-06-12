import { Link, useParams } from 'react-router-dom'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerBatchDetailProps = {
  product: ProducerProductModule
}

export function ProducerBatchDetail({ product }: ProducerBatchDetailProps) {
  const { batchId } = useParams()
  const batch = product.data.batches.find((item) => item.id === batchId)

  if (!batch) {
    return (
      <ProducerScreenShell product={product} eyebrow={product.name} title="Không tìm thấy lô">
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-red-800">
          Lô `{batchId}` không tồn tại trong module {product.name}.
        </div>
      </ProducerScreenShell>
    )
  }

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={batch.name}>
      <Link to={product.routes.batches} className="mb-4 inline-flex text-sm font-medium text-[#8A6238]">
        Quay lại danh sách lô
      </Link>
      <section className="rounded-lg border border-[#E0C69B] bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-[#8A6238]">{batch.id}</p>
            <h2 className="mt-1 text-xl font-bold">{batch.name}</h2>
            <p className="mt-2 text-sm text-[#6F4B35]">{batch.notes}</p>
          </div>
          <StatusBadge tone={batch.status === 'ready' ? 'good' : batch.status === 'hold' ? 'critical' : 'warning'}>
            {batch.status}
          </StatusBadge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <div><p className="text-sm text-[#8B7460]">Bắt đầu</p><strong>{batch.startedAt}</strong></div>
          <div><p className="text-sm text-[#8B7460]">Dự kiến</p><strong>{batch.expectedAt}</strong></div>
          <div><p className="text-sm text-[#8B7460]">Số lượng</p><strong>{batch.quantity}</strong></div>
          <div><p className="text-sm text-[#8B7460]">AI score</p><strong>{batch.qualityScore}/100</strong></div>
        </div>
      </section>
      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {product.data.metrics.map((metric) => (
          <MetricCard key={metric.key} metric={metric} />
        ))}
      </section>
    </ProducerScreenShell>
  )
}
