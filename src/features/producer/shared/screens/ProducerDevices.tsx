import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerDevicesProps = {
  product: ProducerProductModule
}

export function ProducerDevices({ product }: ProducerDevicesProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`Thiết bị ${product.name}`}>
      <div className="grid gap-3 md:grid-cols-2">
        {product.data.devices.map((device) => (
          <article key={device.id} className="rounded-lg border border-[#E0C69B] bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-[#8A6238]">{device.id}</p>
                <h2 className="mt-1 text-lg font-bold">{device.name}</h2>
                <p className="mt-1 text-sm text-[#6F4B35]">{device.location}</p>
              </div>
              <StatusBadge tone={device.status === 'online' ? 'good' : device.status === 'warning' ? 'warning' : 'critical'}>{device.status}</StatusBadge>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-[#8B7460]">Pin</p><strong>{device.battery}%</strong></div>
              <div><p className="text-[#8B7460]">Tín hiệu cuối</p><strong>{device.lastSignal}</strong></div>
            </div>
          </article>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
