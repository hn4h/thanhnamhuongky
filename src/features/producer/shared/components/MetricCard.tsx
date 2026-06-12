import { Boxes, Clock3, Droplets, Gauge, Sparkles, Thermometer } from 'lucide-react'
import type { ComponentType } from 'react'
import type { MetricType, ProducerMetric } from '../types'

type MetricCardProps = {
  metric: ProducerMetric
}

const iconByType: Record<MetricType, ComponentType<{ size?: number; strokeWidth?: number }>> = {
  temperature: Thermometer,
  humidity: Droplets,
  pressure: Gauge,
  time: Clock3,
  quality: Sparkles,
  count: Boxes,
}

const styleByStatus = {
  good: {
    pill: 'bg-[#EDF9F0] text-[#4A9F57]',
    icon: 'bg-[#FFF0EC] text-[#E45B2B]',
    trend: 'text-[#D94D21]',
    label: 'Tốt',
    ai: 'Thông số ổn định, tiếp tục duy trì nhịp vận hành.',
  },
  warning: {
    pill: 'bg-[#FFF6E7] text-[#C78116]',
    icon: 'bg-[#FFF8E7] text-[#C6A633]',
    trend: 'text-[#C78116]',
    label: 'Chú ý',
    ai: 'AI ghi nhận xu hướng tăng, cần theo dõi trong ca này.',
  },
  critical: {
    pill: 'bg-[#FCE8E3] text-[#B23B2F]',
    icon: 'bg-[#FCE8E3] text-[#B23B2F]',
    trend: 'text-[#B23B2F]',
    label: 'Cảnh báo',
    ai: 'Vượt ngưỡng an toàn, cần xử lý tự động hoặc kiểm tra ngay.',
  },
} satisfies Record<ProducerMetric['status'], { pill: string; icon: string; trend: string; label: string; ai: string }>

const trendByType: Record<MetricType, string> = {
  temperature: '↗ +0.8 hôm nay',
  humidity: '↘ -2 hôm nay',
  pressure: '↗ +0.1 trong 15p',
  time: '↗ đang chạy',
  quality: '↗ +2 điểm',
  count: '→ ổn định',
}

export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconByType[metric.type]
  const status = styleByStatus[metric.status]

  return (
    <article className="min-w-0 overflow-hidden rounded-[22px] border border-[#EFE4DC] bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)]">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[17px] ${status.icon}`}>
            <Icon size={23} strokeWidth={2.3} />
          </span>
          <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${status.pill}`}>{status.label}</span>
        </div>

        <p className="mt-6 min-h-[38px] text-[15px] font-bold leading-tight text-[#806A5B]">{metric.label}</p>
        <p className="mt-2 text-[34px] font-black leading-none tracking-normal text-[#100504]">
          {metric.value}
          {metric.unit && <span className="ml-1 text-base font-bold text-[#806A5B]">{metric.unit}</span>}
        </p>
        <p className={`mt-4 text-xs font-semibold ${status.trend}`}>{trendByType[metric.type]}</p>
      </div>

      <div className="border-t border-[#EFE4DC] bg-gradient-to-r from-white to-[#FFFBF7] px-4 py-3 text-sm font-medium leading-5 text-[#3A0A04]">
        <span className="mr-2 inline-flex rounded-md bg-[#9A3529] px-2 py-1 text-xs font-black text-white">AI</span>
        {status.ai}
      </div>
    </article>
  )
}
