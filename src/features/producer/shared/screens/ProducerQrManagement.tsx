import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerQrManagementProps = {
  product: ProducerProductModule
}

export function ProducerQrManagement({ product }: ProducerQrManagementProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`QR / serial ${product.name}`}>
      <div className="overflow-hidden rounded-lg border border-[#E0C69B] bg-white shadow-sm">
        {product.data.qrCodes.map((qr) => (
          <div key={qr.id} className="grid gap-2 border-b border-[#E6D1AB] p-4 last:border-b-0 md:grid-cols-4">
            <div>
              <p className="text-xs text-[#8B7460]">QR ID</p>
              <strong>{qr.id}</strong>
            </div>
            <div>
              <p className="text-xs text-[#8B7460]">Batch</p>
              <strong>{qr.batchId}</strong>
            </div>
            <div>
              <p className="text-xs text-[#8B7460]">Serial</p>
              <strong>{qr.serial}</strong>
            </div>
            <div>
              <p className="mb-1 text-xs text-[#8B7460]">Trạng thái</p>
              <StatusBadge tone={qr.status === 'active' ? 'good' : qr.status === 'revoked' ? 'critical' : 'neutral'}>{qr.status}</StatusBadge>
            </div>
          </div>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
