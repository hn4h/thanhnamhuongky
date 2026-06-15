import { Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, Thermometer, Wind } from 'lucide-react'
import { MetricCard } from '../components/MetricCard'
import { StatusBadge } from '../components/StatusBadge'
import { ProducerScreenShell } from './ProducerScreenShell'
import { coldRooms } from './ProducerProductionMap'
import type { ProducerProductModule } from '../types'

type ProducerDashboardProps = {
  product: ProducerProductModule
}

export function ProducerDashboard({ product }: ProducerDashboardProps) {
  const isXiuPao = product.key === 'banh-xiu-pao'
  // Recalculate latest alert dynamically based on coldRooms state
  const latestAlert = coldRooms.some(r => r.status === 'VOC tăng' || r.status === 'NH3 tăng')
    ? {
      title: isXiuPao ? 'Nồng độ NH3 tăng cao bất thường' : 'Nồng độ VOC tăng cao bất thường',
      message: isXiuPao
        ? 'Chỉ số NH3 tại kho bảo quản đạt 25 ppm (ngưỡng an toàn <= 20 ppm). Có nguy cơ ảnh hưởng chất lượng bảo quản nhân bánh xíu páo.'
        : 'Chỉ số chất hữu cơ dễ bay hơi VOC tại kho bảo quản đạt 68 ppb. Có nguy cơ ảnh hưởng chất lượng bảo quản lá bánh gai.',
      severity: 'medium' as const,
    }
    : product.data.alerts[0]

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Bảng Điều Khiển">
      {/* Sensor Metrics Section */}
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

      {/* Warning/Alert Center */}
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

      {/* Smart Remote Control Section */}
      <section className="mt-6">
        <h3 className="text-[20px] font-black leading-tight text-[#150807] mb-4">Hệ thống điều khiển</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={`/producer/${product.key}/steamer-control`}
            className="rounded-[24px] border border-[#EFE4DC] bg-white p-4 text-left shadow-[0_12px_28px_rgba(57,28,12,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-[120px]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#FCE8E3] text-[#B23B2F]">
              <Thermometer size={20} strokeWidth={2.3} />
            </span>
            <div>
              <span className="text-sm font-black text-[#150807]">Lồng hấp thông minh</span>
              <p className="text-[10px] font-bold text-[#806A5B] mt-0.5">Điều khiển nhiệt độ & độ ẩm</p>
            </div>
          </Link>

          <Link
            to={`/producer/${product.key}/dehumidifier-control`}
            className="rounded-[24px] border border-[#EFE4DC] bg-white p-4 text-left shadow-[0_12px_28px_rgba(57,28,12,0.06)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-[120px]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EEF7FF] text-[#4C79B8]">
              <Wind size={20} strokeWidth={2.3} />
            </span>
            <div>
              <span className="text-sm font-black text-[#150807]">Hút ẩm thông minh</span>
              <p className="text-[10px] font-bold text-[#806A5B] mt-0.5">Nhiệt độ, hút ẩm & thoát gió</p>
            </div>
          </Link>
        </div>
      </section>
    </ProducerScreenShell>
  )
}
