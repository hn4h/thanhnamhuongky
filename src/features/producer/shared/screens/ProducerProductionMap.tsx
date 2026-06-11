import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerProductionMapProps = {
  product: ProducerProductModule
}

const steps = ['Nguyên liệu', 'Sơ chế', 'Chế biến', 'Đóng gói', 'Gắn QR', 'Xuất kho']

export function ProducerProductionMap({ product }: ProducerProductionMapProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`Quy trình ${product.name}`}>
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step} className="rounded-lg border border-[#ead7a4] bg-white p-4 shadow-sm">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: product.theme.primary }}>
              {index + 1}
            </div>
            <h2 className="font-bold">{step}</h2>
            <p className="mt-2 text-sm leading-6 text-[#7a5a3a]">Theo dõi trạng thái {step.toLowerCase()} riêng cho {product.name}, dùng mock data trong frontend.</p>
          </div>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
