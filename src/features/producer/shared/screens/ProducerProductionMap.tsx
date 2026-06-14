import { useMemo, useState } from 'react'
import { ChevronLeft, Compass, X, Boxes, Droplets, Gauge, Snowflake, Thermometer, Wind } from 'lucide-react'
import { ProducerNav } from '../components/ProducerNav'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerProductionMapProps = {
  product: ProducerProductModule
}

export const steamChambers = [
  { id: 'Lồng 1', batch: 'Loại 1', temp: 96, humidity: 82, pressure: 1.1, status: 'Ổn định', progress: 72, remainingMinutes: 18 },
  { id: 'Lồng 2', batch: 'Loại 2', temp: 98, humidity: 84, pressure: 1.2, status: 'Đang hấp', progress: 54, remainingMinutes: 31 },
  { id: 'Lồng 3', batch: 'Loại 1', temp: 103, humidity: 88, pressure: 1.6, status: 'Quá nhiệt', progress: 83, remainingMinutes: 9 },
  { id: 'Lồng 4', batch: 'Loại 2', temp: 95, humidity: 80, pressure: 1.0, status: 'Ổn định', progress: 38, remainingMinutes: 46 },
  { id: 'Lồng 5', batch: 'Chờ mẻ', temp: 72, humidity: 61, pressure: 0.4, status: 'Nghỉ', progress: 0, remainingMinutes: 0 },
]

export const coldRooms = [
  { id: 'Kho 1', item: 'Lá gai', temp: 4, humidity: 62, voc: 100, status: 'VOC tăng' },
  { id: 'Kho 2', item: 'Đậu xanh', temp: 5, humidity: 58, voc: 42, status: 'Ổn định' },
  { id: 'Kho 3', item: 'Dừa nạo', temp: 3, humidity: 55, voc: 35, status: 'Ổn định' },
  { id: 'Kho 4', item: 'Bánh thành phẩm', temp: 6, humidity: 60, voc: 48, status: 'Theo dõi' },
]

type JarIconProps = {
  tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty'
}

function JarIcon({ tone }: JarIconProps) {
  const styles = {
    good: { stroke: '#4ADE80', fill: '#EDF9F0', dot: false },
    ripe: { stroke: '#FCD34D', fill: '#FFFDF0', dot: false },
    watch: { stroke: '#F59E0B', fill: '#FFF9E6', dot: false },
    critical: { stroke: '#EF4444', fill: '#FEE2E2', dot: true },
    empty: { stroke: '#9CA3AF', fill: '#F3F4F6', dot: false },
  }[tone]

  return (
    <div className="relative flex items-center justify-center w-10 h-10 select-none">
      <svg viewBox="0 0 24 24" className="w-8 h-8 transition-transform duration-200 hover:scale-110 cursor-pointer">
        <path
          d="M8,4 L16,4 C17,4 17,5 17,6 L17,7 C18.5,8 19.5,9.5 19.5,11.5 L19.5,17 C19.5,19 18.5,20 17,20 L7,20 C5.5,20 4.5,19 4.5,17 L4.5,11.5 C4.5,9.5 5.5,8 7,7 L7,6 C7,5 7,4 8,4 Z"
          fill={styles.fill}
          stroke={styles.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
      {styles.dot && (
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border border-white animate-pulse" />
      )}
    </div>
  )
}

type ZoneDiagramCardProps = {
  name: string
  icon: typeof Compass
  type: 'steam' | 'storage'
  onSelectSlot: (row: string, col: number, tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty') => void
}

function ZoneDiagramCard({ name, icon: Icon, type, onSelectSlot }: ZoneDiagramCardProps) {
  const items = type === 'steam'
    ? [
        { id: 1, name: 'Lồng 1', tone: 'good' as const },
        { id: 2, name: 'Lồng 2', tone: 'ripe' as const },
        { id: 3, name: 'Lồng 3', tone: 'critical' as const },
        { id: 4, name: 'Lồng 4', tone: 'good' as const },
        { id: 5, name: 'Lồng 5', tone: 'empty' as const },
      ]
    : [
        { id: 1, name: 'Kho 1', tone: 'critical' as const },
        { id: 2, name: 'Kho 2', tone: 'good' as const },
        { id: 3, name: 'Kho 3', tone: 'good' as const },
        { id: 4, name: 'Kho 4', tone: 'watch' as const },
      ]

  return (
    <div className="rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
      {/* Title & Compass Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#FAF2E8]/60 pb-3">
        <div className="flex items-center gap-2 text-[#721A18]">
          <Icon size={20} strokeWidth={2.4} />
          <span className="text-base font-black text-[#150807]">{name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-black text-[#A77D42]">
          <Compass size={13} strokeWidth={2.4} />
          <span>Bắc ↑</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="flex items-center justify-around gap-2 select-none py-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectSlot('A', item.id, item.tone)}
            className="flex flex-col items-center border-0 bg-transparent p-0 focus:outline-none transition active:scale-90"
          >
            <JarIcon tone={item.tone} />
            <span className="mt-1.5 text-xs font-black text-[#5C4D43]">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function ProducerProductionMap({ product }: ProducerProductionMapProps) {
  const [selectedItem, setSelectedItem] = useState<{
    type: 'steam' | 'storage'
    id: number
  } | null>(null)

  const handleSelectSlot = (
    type: 'steam' | 'storage',
    row: string,
    col: number,
    tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty'
  ) => {
    setSelectedItem({ type, id: col })
  }

  const selectedDetails = useMemo(() => {
    if (!selectedItem) return null

    if (selectedItem.type === 'steam') {
      const chamber = steamChambers[selectedItem.id - 1]
      const tone = selectedItem.id === 1 || selectedItem.id === 4 ? 'good' :
                   selectedItem.id === 2 ? 'ripe' :
                   selectedItem.id === 3 ? 'critical' : 'empty'
      return {
        title: `Lồng Hấp ${selectedItem.id}`,
        subtitle: `Mẻ: ${chamber.batch}`,
        status: chamber.status,
        tone,
        metrics: [
          { icon: Thermometer, label: 'Nhiệt', value: `${chamber.temp}°C` },
          { icon: Droplets, label: 'Độ ẩm', value: `${chamber.humidity}%` },
          { icon: Gauge, label: 'Áp suất', value: `${chamber.pressure} bar` },
        ],
        extra: chamber.progress > 0 
          ? `${chamber.progress}% quy trình · Còn ${chamber.remainingMinutes} phút`
          : 'Lồng đang chờ mẻ mới'
      }
    } else {
      const room = coldRooms[selectedItem.id - 1]
      const tone = selectedItem.id === 1 ? 'critical' :
                   selectedItem.id === 4 ? 'watch' : 'good'
      return {
        title: `Kho Lạnh ${selectedItem.id}`,
        subtitle: `Lưu trữ: ${room.item}`,
        status: room.status,
        tone,
        metrics: [
          { icon: Wind, label: 'VOC', value: `${room.voc} ppb` },
          { icon: Snowflake, label: 'Nhiệt', value: `${room.temp}°C` },
          { icon: Droplets, label: 'Độ ẩm', value: `${room.humidity}%` },
        ],
        extra: 'Hệ thống đối lưu gió đang hoạt động'
      }
    }
  }, [selectedItem])

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Sơ Đồ" hideSummary>
      <div className="space-y-6">
        {/* Sơ đồ Lồng Hấp */}
        <ZoneDiagramCard
          name="Lồng Hấp"
          icon={Thermometer}
          type="steam"
          onSelectSlot={(row, col, tone) => handleSelectSlot('steam', row, col, tone)}
        />

        {/* Sơ đồ Kho Bảo Quản */}
        <ZoneDiagramCard
          name="Kho Bảo Quản"
          icon={Snowflake}
          type="storage"
          onSelectSlot={(row, col, tone) => handleSelectSlot('storage', row, col, tone)}
        />

        {/* Chi tiết giám sát */}
        {selectedDetails && (
          <div className="rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.06)] transition-all duration-300">
            <div className="flex items-start justify-between border-b border-[#FAF2E8]/60 pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#A77D42]">
                  Chi tiết giám sát
                </span>
                <h4 className="text-xl font-black text-[#150807] mt-0.5">
                  {selectedDetails.title}
                </h4>
                <p className="text-xs font-bold text-[#806A5B] mt-0.5">
                  {selectedDetails.subtitle}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-black ${
                selectedDetails.tone === 'good' ? 'bg-[#EDF9F0] text-[#4A9F57]' :
                selectedDetails.tone === 'ripe' ? 'bg-[#FEFBE8] text-[#D97706]' :
                selectedDetails.tone === 'watch' ? 'bg-[#FFF9E6] text-[#C78116]' :
                selectedDetails.tone === 'critical' ? 'bg-[#FCE8E3] text-[#B23B2F]' :
                'bg-[#F3F4F6] text-[#6B7280]'
              }`}>
                {selectedDetails.status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {selectedDetails.metrics.map((m, idx) => (
                <SensorMini key={idx} icon={m.icon} label={m.label} value={m.value} />
              ))}
            </div>

            <p className="mt-4 text-xs font-bold text-[#806A5B] bg-[#FAF2E8] rounded-xl py-2 px-3 text-center">
              {selectedDetails.extra}
            </p>
          </div>
        )}

        {/* Chú thích màu sắc */}
        <div className="rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
          <h3 className="text-base font-black text-[#150807] mb-4">Chú thích màu sắc</h3>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-center gap-3">
              <JarIcon tone="good" />
              <span className="text-sm font-black text-[#5C4D43]">Tốt</span>
            </div>
            <div className="flex items-center gap-3">
              <JarIcon tone="ripe" />
              <span className="text-sm font-black text-[#5C4D43]">Chín</span>
            </div>
            <div className="flex items-center gap-3">
              <JarIcon tone="watch" />
              <span className="text-sm font-black text-[#5C4D43]">Chú ý</span>
            </div>
            <div className="flex items-center gap-3">
              <JarIcon tone="critical" />
              <span className="text-sm font-black text-[#5C4D43]">Cảnh báo</span>
            </div>
            <div className="flex items-center gap-3 col-span-2">
              <JarIcon tone="empty" />
              <span className="text-sm font-black text-[#5C4D43]">Trống</span>
            </div>
          </div>
        </div>
      </div>
    </ProducerScreenShell>
  )
}

type SteamChamberDetailProps = {
  product: ProducerProductModule
  chamber: (typeof steamChambers)[number]
  onBack: () => void
}

export function SteamChamberDetail({ product, chamber, onBack }: SteamChamberDetailProps) {
  const trendData = useMemo(() => createTrendData(chamber), [chamber])

  return (
    <AppFrameContent>
      <header className="relative overflow-hidden bg-gradient-to-br from-[#3A0611] via-[#721A18] to-[#8B321F] px-4 pb-6 pt-10 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_28%)]" />
        <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#F59E0B]/5 blur-xl pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/12 text-white/80 transition-transform active:scale-90"
            aria-label="Quay lại danh sách lồng hấp"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-[12px] font-medium tracking-wider text-[#FDF4E7]/55 uppercase">Lồng hấp</span>
          <div className="w-9 h-9" /> {/* Spacer */}
        </div>

        <div className="relative mt-4 flex items-center justify-between">
          <h1 className="text-[22px] font-extrabold tracking-tight text-[#FDF4E7]">{chamber.batch}</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#F1C932]/25 text-[#F1C932] border border-[#F1C932]/20">
            Cao cấp
          </span>
        </div>

        <p className="relative mt-1 text-[12px] font-bold text-[#C9AAA5]">
          B-2026-03 · {chamber.id} · Bánh gai Thành Nam
        </p>

        <div className="relative mt-5 flex items-center justify-between gap-5 text-xs font-bold text-[#D6BDBC]">
          <span>{chamber.progress}% quy trình hấp</span>
          <strong className="text-[#E2CC47]">{chamber.remainingMinutes} phút</strong>
        </div>
        <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-white/18">
          <div className="h-full rounded-full bg-gradient-to-r from-[#F1C932] to-[#B7672F]" style={{ width: `${chamber.progress}%` }} />
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
  orange: 'bg-[#FCE8E3] text-[#B23B2F]',
  blue: 'bg-[#EDF9F0] text-[#4A9F57]',
  gold: 'bg-[#FFF6E7] text-[#C78116]',
}

function DetailMetric({ icon: Icon, tone, value, label }: DetailMetricProps) {
  return (
    <div className="min-w-0 rounded-[22px] border border-[#EFE4DC] bg-white px-2 py-5 text-center shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all duration-300 hover:scale-[1.02]">
      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${metricTone[tone]}`}>
        <Icon size={22} strokeWidth={2.3} />
      </span>
      <strong className="mt-4 block text-[18px] font-extrabold leading-none text-[#150807]">{value}</strong>
      <p className="mt-2 text-xs font-bold text-[#806A5B]">{label}</p>
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
    <div className="rounded-[22px] border border-[#EFE4DC] bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all duration-300 hover:scale-[1.01]">
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
 
        <polyline fill="none" points={pointsFor('humidity', 0, 100)} stroke="#4A9F57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <polyline fill="none" points={pointsFor('temperature', 70, 110)} stroke="#B23B2F" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
        <polyline fill="none" points={pointsFor('pressure', 0, 2)} stroke="#C78116" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
 
        {data.map((point, index) => (
          <g key={`dots-${point.minute}`}>
            <circle cx={xFor(index)} cy={yFor(point.humidity, 0, 100)} r="10" fill="#4A9F57" />
            <circle cx={xFor(index)} cy={yFor(point.temperature, 70, 110)} r="10" fill="#B23B2F" />
            <circle cx={xFor(index)} cy={yFor(point.pressure, 0, 2)} r="10" fill="#C78116" />
          </g>
        ))}
      </svg>
 
      <div className="mt-2 grid grid-cols-3 gap-2 text-center text-[12px] font-black text-[#6F4B35]">
        <LegendItem color="#B23B2F" label="Nhiệt độ" />
        <LegendItem color="#4A9F57" label="Độ ẩm" />
        <LegendItem color="#C78116" label="Áp suất" />
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

export function SensorMini({ icon: Icon, label, value }: SensorMiniProps) {
  return (
    <div className="rounded-2xl bg-[#FAF2E8] px-2 py-3">
      <Icon className="mx-auto text-[#721A18]" size={18} strokeWidth={2.4} />
      <p className="mt-1 text-[11px] font-bold text-[#8A7464]">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-[#150807]">{value}</p>
    </div>
  )
}
