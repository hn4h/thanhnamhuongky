import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerDashboardProps = {
  product: ProducerProductModule
}

export function ProducerDashboard({ product }: ProducerDashboardProps) {
  const latestAlert = product.data.alerts[0]

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Bảng Điều Khiển">
      <section>
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="shrink-0 text-[24px] font-black leading-tight text-[#150807]">Chỉ số cảm biến</h2>
          <span className="max-w-[116px] text-right text-sm font-medium leading-tight text-[#7A665B]">Cập nhật 2 phút trước</span>
        </div>

        {product.data.metrics.length > 0 ? (
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3">
            {product.data.metrics.map((metric) => (
              <MetricCard key={metric.key} metric={metric} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-gold-100 bg-white p-5 text-sm text-lacquer-700 shadow-parchment">
            Chưa có chỉ số cảm biến.
          </div>
        )}
      </section>

      <section className="mt-6 rounded-[24px] border border-[#E6D4C4] bg-white p-5 shadow-[0_12px_30px_rgba(59,24,10,0.08)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <span className={`mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${latestAlert ? 'bg-[#FFF3E3] text-[#C47D18]' : 'bg-[#EDF9F0] text-[#4A9F57]'}`}>
              {latestAlert ? <AlertTriangle size={23} /> : <CheckCircle2 size={23} />}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#8A6238]">Trung tâm cảnh báo</p>
              <h2 className="mt-1 text-lg font-black leading-tight text-[#150807]">{latestAlert?.title ?? 'Không có cảnh báo mới'}</h2>
            </div>
          </div>
          <StatusBadge tone={latestAlert?.severity === 'high' ? 'critical' : latestAlert?.severity === 'medium' ? 'warning' : 'good'}>
            {latestAlert ? (latestAlert.severity === 'high' ? 'Khẩn cấp' : 'Theo dõi') : 'Tốt'}
          </StatusBadge>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#6F4B35]">
          {latestAlert?.message ?? 'Hệ thống chưa ghi nhận cảnh báo vượt ngưỡng trong ca hiện tại.'}
        </p>
      </section>
    </ProducerScreenShell>
  )
}
