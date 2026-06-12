import { useMemo, useState } from 'react'
import { ArrowLeft, Boxes, Droplets, Gauge, Snowflake, Thermometer, Trophy, Wind } from 'lucide-react'
import { ProducerNav } from '../components/ProducerNav'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerProductionMapProps = {
  product: ProducerProductModule
}

const steamChambers = [
  { id: 'Lồng 1', batch: 'Loại 1', temp: 96, humidity: 82, pressure: 1.1, status: 'Ổn định', progress: 72, remainingMinutes: 18 },
  { id: 'Lồng 2', batch: 'Loại 2', temp: 98, humidity: 84, pressure: 1.2, status: 'Đang hấp', progress: 54, remainingMinutes: 31 },
  { id: 'Lồng 3', batch: 'Loại 1', temp: 103, humidity: 88, pressure: 1.6, status: 'Quá nhiệt', progress: 83, remainingMinutes: 9 },
  { id: 'Lồng 4', batch: 'Loại 2', temp: 95, humidity: 80, pressure: 1.0, status: 'Ổn định', progress: 38, remainingMinutes: 46 },
  { id: 'Lồng 5', batch: 'Chờ mẻ', temp: 72, humidity: 61, pressure: 0.4, status: 'Nghỉ', progress: 0, remainingMinutes: 0 },
]

const coldRooms = [
  { id: 'Kho 1', item: 'Lá gai', temp: 4, humidity: 62, voc: 100, status: 'VOC tăng' },
  { id: 'Kho 2', item: 'Đậu xanh', temp: 5, humidity: 58, voc: 42, status: 'Ổn định' },
  { id: 'Kho 3', item: 'Dừa nạo', temp: 3, humidity: 55, voc: 35, status: 'Ổn định' },
  { id: 'Kho 4', item: 'Bánh thành phẩm', temp: 6, humidity: 60, voc: 48, status: 'Theo dõi' },
]

export function ProducerProductionMap({ product }: ProducerProductionMapProps) {
  const [activeTab, setActiveTab] = useState<'steam' | 'storage'>('steam')
  const [selectedChamber, setSelectedChamber] = useState<(typeof steamChambers)[number] | null>(null)
  const isSteam = activeTab === 'steam'

  if (selectedChamber) {
    return <SteamChamberDetail chamber={selectedChamber} product={product} onBack={() => setSelectedChamber(null)} />
  }

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Sơ Đồ" hideSummary>
      <section className="rounded-[999px] border border-[#E6D4C4] bg-white p-1.5 shadow-[0_12px_30px_rgba(59,24,10,0.08)]">
        <div className="grid grid-cols-2 gap-1 rounded-[999px]">
          <button
            type="button"
            onClick={() => setActiveTab('steam')}
            className="rounded-[999px] px-3 py-3 text-sm font-black transition"
            style={{
              background: isSteam ? '#8B2F23' : 'transparent',
              color: isSteam ? '#FFFFFF' : '#756A63',
              boxShadow: isSteam ? '0 8px 18px rgba(139,47,35,0.24)' : 'none',
            }}
          >
            Lồng hấp
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className="rounded-[999px] px-3 py-3 text-sm font-black transition"
            style={{
              background: !isSteam ? '#8B2F23' : 'transparent',
              color: !isSteam ? '#FFFFFF' : '#756A63',
              boxShadow: !isSteam ? '0 8px 18px rgba(139,47,35,0.24)' : 'none',
            }}
          >
            Kho bảo quản
          </button>
        </div>
      </section>

      {isSteam ? (
        <section className="mt-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[24px] font-black leading-tight text-[#150807]">5 lồng hấp</h2>
              <p className="mt-1 text-sm font-medium text-[#7A665B]">Theo dõi nhiệt độ, độ ẩm, áp suất và tiến độ từng lồng.</p>
            </div>
            <span className="rounded-full bg-[#FFF6E7] px-3 py-1 text-xs font-black text-[#C78116]">1 cảnh báo</span>
          </div>

          <div className="grid gap-3">
            {steamChambers.map((chamber) => {
              const isWarning = chamber.status === 'Quá nhiệt'
              const isIdle = chamber.progress === 0

              return (
                <button
                  key={chamber.id}
                  type="button"
                  onClick={() => setSelectedChamber(chamber)}
                  className={`w-full rounded-[24px] border bg-white p-4 text-left shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition active:scale-[0.99] ${isWarning ? 'border-[#EAA18F]' : 'border-[#EFE4DC]'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] ${isWarning ? 'bg-[#FCE8E3] text-[#B23B2F]' : 'bg-[#FFF0EC] text-[#E45B2B]'}`}>
                        <Thermometer size={24} strokeWidth={2.3} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-[#150807]">{chamber.id}</h3>
                        <p className="truncate text-sm font-bold text-[#806A5B]">{chamber.batch}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${isWarning ? 'bg-[#FCE8E3] text-[#B23B2F]' : 'bg-[#EDF9F0] text-[#4A9F57]'}`}>
                      {chamber.status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-[18px] bg-[#FAF2E8] px-3 py-3">
                    <div className="h-4 overflow-hidden rounded-full bg-[#E8D9C8] shadow-[inset_0_1px_2px_rgba(74,45,30,0.12)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${chamber.progress}%`,
                          background: isWarning ? '#D9553F' : '#8B2F23',
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#6F4B35]">
                      {isIdle ? 'Lồng đang chờ mẻ mới' : `Còn ${chamber.remainingMinutes} phút sẽ xong`}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <SensorMini icon={Thermometer} label="Nhiệt" value={`${chamber.temp}°C`} />
                    <SensorMini icon={Droplets} label="Độ ẩm" value={`${chamber.humidity}%`} />
                    <SensorMini icon={Gauge} label="Áp suất" value={`${chamber.pressure} bar`} />
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ) : (
        <section className="mt-5">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[24px] font-black leading-tight text-[#150807]">4 kho bảo quản</h2>
              <p className="mt-1 text-sm font-medium text-[#7A665B]">Theo dõi VOC, nhiệt độ và độ ẩm nguyên liệu.</p>
            </div>
            <span className="rounded-full bg-[#FFF6E7] px-3 py-1 text-xs font-black text-[#C78116]">VOC</span>
          </div>

          <div className="grid gap-3">
            {coldRooms.map((room) => {
              const isWarning = room.status === 'VOC tăng'

              return (
                <article key={room.id} className={`rounded-[24px] border bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.08)] ${isWarning ? 'border-[#EAA18F]' : 'border-[#EFE4DC]'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] ${isWarning ? 'bg-[#FFF6E7] text-[#C78116]' : 'bg-[#EEF7FF] text-[#4C79B8]'}`}>
                        <Snowflake size={24} strokeWidth={2.3} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-[#150807]">{room.id}</h3>
                        <p className="truncate text-sm font-bold text-[#806A5B]">{room.item}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${isWarning ? 'bg-[#FFF6E7] text-[#C78116]' : 'bg-[#EDF9F0] text-[#4A9F57]'}`}>
                      {room.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <SensorMini icon={Wind} label="VOC" value={`${room.voc} ppb`} />
                    <SensorMini icon={Snowflake} label="Nhiệt" value={`${room.temp}°C`} />
                    <SensorMini icon={Droplets} label="Độ ẩm" value={`${room.humidity}%`} />
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </ProducerScreenShell>
  )
}

type SteamChamberDetailProps = {
  product: ProducerProductModule
  chamber: (typeof steamChambers)[number]
  onBack: () => void
}

function SteamChamberDetail({ product, chamber, onBack }: SteamChamberDetailProps) {
  const trendData = useMemo(() => createTrendData(chamber), [chamber])

  return (
    <AppFrameContent>
      <header className="relative overflow-hidden bg-gradient-to-br from-[#3A0611] via-[#721A18] to-[#8B321F] px-5 pb-8 pt-5 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(255,255,255,0.13),transparent_28%)]" />
        <div className="relative">
          <button
            type="button"
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-3 text-[26px] font-black leading-none text-[#C8B0AE]"
            aria-label="Quay lại danh sách lồng hấp"
          >
            <ArrowLeft size={28} strokeWidth={2.2} />
            <span>Lồng hấp</span>
          </button>

          <span className="inline-flex items-center gap-2 rounded-full border border-[#A66B34] bg-[#75502A]/70 px-4 py-2 text-[24px] font-black text-[#E5BE45]">
            <Trophy size={22} strokeWidth={2.2} />
            Cao cấp
          </span>

          <h1 className="mt-6 text-[35px] font-black leading-tight tracking-normal text-white">{chamber.batch}</h1>
          <p className="mt-3 text-[24px] font-bold leading-tight text-[#CDB4B2]">B-2024-03 · {chamber.id} · Bánh gai Thành Nam</p>

          <div className="mt-8 flex items-center justify-between gap-5">
            <p className="text-[22px] font-black text-[#D6BDBC]">{chamber.progress}% quy trình hấp</p>
            <strong className="text-[22px] font-black text-[#E2CC47]">{chamber.remainingMinutes} phút</strong>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/18">
            <div className="h-full rounded-full bg-gradient-to-r from-[#DFC94F] to-[#B7672F]" style={{ width: `${chamber.progress}%` }} />
          </div>
        </div>
      </header>

      <main className="px-4 pb-28 pt-7">
        <section>
          <h2 className="text-[26px] font-black leading-tight text-[#150807]">Chỉ số hiện tại</h2>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <DetailMetric icon={Thermometer} tone="orange" value={`${chamber.temp}°C`} label="Nhiệt độ" />
            <DetailMetric icon={Droplets} tone="blue" value={`${chamber.humidity}%`} label="Độ ẩm" />
            <DetailMetric icon={Gauge} tone="gold" value={`${chamber.pressure.toFixed(1)} bar`} label="Áp suất" />
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-[26px] font-black leading-tight text-[#150807]">Biểu đồ xu hướng</h2>
              <p className="mt-1 text-sm font-bold text-[#7A665B]">15 phút gần nhất · mỗi phút một mốc</p>
            </div>
          </div>
          <TrendChart data={trendData} />
        </section>
      </main>
      <ProducerNav product={product} />
    </AppFrameContent>
  )
}

type AppFrameContentProps = {
  children: React.ReactNode
}

function AppFrameContent({ children }: AppFrameContentProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#F8EFE2] text-[#150807] shadow-[0_0_80px_rgba(74,45,30,0.32)]">
      <div className="min-h-screen overflow-x-hidden bg-[#F8EFE2]">{children}</div>
    </main>
  )
}

type DetailMetricProps = {
  icon: typeof Thermometer
  tone: 'orange' | 'blue' | 'gold'
  value: string
  label: string
}

const metricTone = {
  orange: 'bg-[#FFF0EC] text-[#E45B2B]',
  blue: 'bg-[#F0F3FF] text-[#5A81E8]',
  gold: 'bg-[#FBF7EC] text-[#CEAC39]',
}

function DetailMetric({ icon: Icon, tone, value, label }: DetailMetricProps) {
  return (
    <div className="min-w-0 rounded-[26px] border border-[#E8E5E0] bg-white px-2 py-6 text-center shadow-[0_2px_12px_rgba(26,10,0,0.04)]">
      <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${metricTone[tone]}`}>
        <Icon size={30} strokeWidth={2.2} />
      </span>
      <strong className="mt-5 block text-[22px] font-black leading-none text-[#150807]">{value}</strong>
      <p className="mt-3 text-[18px] font-bold leading-tight text-[#806A5B]">{label}</p>
    </div>
  )
}

type TrendPoint = {
  minute: number
  temperature: number
  humidity: number
  pressure: number
}

function createTrendData(chamber: (typeof steamChambers)[number]): TrendPoint[] {
  return Array.from({ length: 15 }, (_, index) => {
    const wave = Math.sin((index / 14) * Math.PI * 2)
    const smallWave = Math.cos((index / 14) * Math.PI * 3)

    return {
      minute: index + 1,
      temperature: Number((chamber.temp + wave * 2.4 + smallWave * 0.7).toFixed(1)),
      humidity: Number((chamber.humidity + Math.cos((index / 14) * Math.PI * 2) * 3.2).toFixed(1)),
      pressure: Number((chamber.pressure + wave * 0.08).toFixed(2)),
    }
  })
}

type TrendChartProps = {
  data: TrendPoint[]
}

function TrendChart({ data }: TrendChartProps) {
  const width = 720
  const height = 360
  const padding = { top: 38, right: 18, bottom: 52, left: 54 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const xFor = (index: number) => padding.left + (plotWidth * index) / (data.length - 1)
  const yFor = (value: number, min: number, max: number) => padding.top + plotHeight - ((value - min) / (max - min)) * plotHeight
  const pointsFor = (key: keyof Omit<TrendPoint, 'minute'>, min: number, max: number) =>
    data.map((point, index) => `${xFor(index)},${yFor(point[key], min, max)}`).join(' ')

  return (
    <div className="rounded-[28px] bg-white p-4 shadow-[0_14px_30px_rgba(57,28,12,0.08)]">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Biểu đồ nhiệt độ, độ ẩm và áp suất trong 15 phút gần nhất" className="h-auto w-full">
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = yFor(tick, 0, 100)
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#EFE8E2" strokeDasharray="8 8" />
              <text x={padding.left - 16} y={y + 6} textAnchor="end" className="fill-[#8B6B52] text-[20px] font-bold">
                {tick}
              </text>
            </g>
          )
        })}

        {data.map((point, index) => {
          const x = xFor(index)
          return (
            <g key={point.minute}>
              <line x1={x} x2={x} y1={padding.top} y2={padding.top + plotHeight} stroke="#F1E8DF" strokeDasharray="8 8" />
              <text x={x} y={height - 14} textAnchor="middle" className="fill-[#8B6B52] text-[17px] font-bold">
                {point.minute}'
              </text>
            </g>
          )
        })}

        <line x1={padding.left} x2={padding.left} y1={padding.top} y2={padding.top + plotHeight} stroke="#6D625C" strokeWidth="2" />
        <line x1={padding.left} x2={width - padding.right} y1={padding.top + plotHeight} y2={padding.top + plotHeight} stroke="#6D625C" strokeWidth="2" />

        <polyline fill="none" points={pointsFor('humidity', 0, 100)} stroke="#5B7FE8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <polyline fill="none" points={pointsFor('temperature', 70, 110)} stroke="#D96635" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <polyline fill="none" points={pointsFor('pressure', 0, 2)} stroke="#C9A33B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />

        {data.map((point, index) => (
          <g key={`dots-${point.minute}`}>
            <circle cx={xFor(index)} cy={yFor(point.humidity, 0, 100)} r="10" fill="#5B7FE8" />
            <circle cx={xFor(index)} cy={yFor(point.temperature, 70, 110)} r="10" fill="#D96635" />
            <circle cx={xFor(index)} cy={yFor(point.pressure, 0, 2)} r="10" fill="#C9A33B" />
          </g>
        ))}
      </svg>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[12px] font-black text-[#6F4B35]">
        <LegendItem color="#D96635" label="Nhiệt độ" />
        <LegendItem color="#5B7FE8" label="Độ ẩm" />
        <LegendItem color="#C9A33B" label="Áp suất" />
      </div>
    </div>
  )
}

type LegendItemProps = {
  color: string
  label: string
}

function LegendItem({ color, label }: LegendItemProps) {
  return (
    <span className="inline-flex items-center justify-center gap-1.5">
      <span className="h-2 w-5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}

type SensorMiniProps = {
  icon: typeof Boxes
  label: string
  value: string
}

function SensorMini({ icon: Icon, label, value }: SensorMiniProps) {
  return (
    <div className="rounded-2xl bg-[#FAF2E8] px-2 py-3">
      <Icon className="mx-auto text-[#8B2F23]" size={18} strokeWidth={2.4} />
      <p className="mt-1 text-[11px] font-bold text-[#8A7464]">{label}</p>
      <p className="mt-0.5 text-sm font-black text-[#150807]">{value}</p>
    </div>
  )
}
