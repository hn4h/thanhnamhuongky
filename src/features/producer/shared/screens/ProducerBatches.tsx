import { Link } from 'react-router-dom'
import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerBatchesProps = {
  product: ProducerProductModule
}

const statusLabel = {
  ready: 'Sẵn sàng',
  'in-progress': 'Đang làm',
  watch: 'Theo dõi',
  hold: 'Tạm giữ',
}

export function ProducerBatches({ product }: ProducerBatchesProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`Lô sản xuất ${product.name}`}>
      <div className="grid gap-3">
        {product.data.batches.map((batch) => (
          <Link key={batch.id} to={`/producer/${product.key}/batch/${batch.id}`} className="rounded-lg border border-[#ead7a4] bg-white p-4 shadow-sm transition hover:border-gold">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#8a6417]">{batch.id}</p>
                <h2 className="mt-1 text-lg font-bold">{batch.name}</h2>
                <p className="mt-1 text-sm text-[#7a5a3a]">{batch.notes}</p>
              </div>
              <StatusBadge tone={batch.status === 'ready' ? 'good' : batch.status === 'hold' ? 'critical' : 'warning'}>{statusLabel[batch.status]}</StatusBadge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
              <div><p className="text-[#8a7a65]">Số lượng</p><strong>{batch.quantity}</strong></div>
              <div><p className="text-[#8a7a65]">Hoàn tất</p><strong>{batch.expectedAt}</strong></div>
              <div><p className="text-[#8a7a65]">AI score</p><strong>{batch.qualityScore}/100</strong></div>
            </div>
          </Link>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
