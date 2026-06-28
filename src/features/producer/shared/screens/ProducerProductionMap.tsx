import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, X, Boxes, Droplets, Gauge, Snowflake, Thermometer, Wind } from 'lucide-react'
import { ProducerNav } from '../components/ProducerNav'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerProductionMapProps = {
  product: ProducerProductModule
}

export const steamChambers = [
  { id: 'Lồng 1', batch: 'Loại 1', temp: 96, humidity: 97, pressure: 1.1, status: 'Ổn định', progress: 72, remainingMinutes: 18 },
  { id: 'Lồng 2', batch: 'Loại 2', temp: 98, humidity: 96, pressure: 1.2, status: 'Đang hấp', progress: 54, remainingMinutes: 31 },
  { id: 'Lồng 3', batch: 'Loại 1', temp: 106, humidity: 98, pressure: 1.9, status: 'Quá nhiệt', progress: 83, remainingMinutes: 9 },
  { id: 'Lồng 4', batch: 'Loại 2', temp: 95, humidity: 95, pressure: 1.0, status: 'Ổn định', progress: 38, remainingMinutes: 46 },
  { id: 'Lồng 5', batch: 'Chờ mẻ', temp: 27, humidity: 55, pressure: 0, status: 'Nghỉ', progress: 0, remainingMinutes: 0 },
]

export const coldRooms = [
  { id: 'Tủ 1', item: 'Lá gai', temp: 4, humidity: 62, voc: 68, nh3: 25, status: 'VOC tăng', dehumidifier: true, ventilation: false },
  { id: 'Tủ 2', item: 'Đậu xanh', temp: 0, humidity: 45, voc: 25, nh3: 12, status: 'Ổn định', dehumidifier: false, ventilation: false },
  { id: 'Tủ 3', item: 'Dừa nạo', temp: -2, humidity: 42, voc: 18, nh3: 8, status: 'Ổn định', dehumidifier: false, ventilation: true },
  { id: 'Tủ 4', item: 'Bánh thành phẩm', temp: 2.5, humidity: 52, voc: 35, nh3: 15, status: 'Theo dõi', dehumidifier: true, ventilation: true },
]

type SteamerIconProps = {
  tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty'
}

export function SteamerIcon({ tone }: SteamerIconProps) {
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
        {/* Cabinet Main Body */}
        <rect
          x="4"
          y="3"
          width="16"
          height="18"
          rx="1.5"
          fill={styles.fill}
          stroke={styles.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Top Control Panel */}
        <rect
          x="7"
          y="5"
          width="10"
          height="3"
          rx="0.5"
          fill="none"
          stroke={styles.stroke}
          strokeWidth="1.5"
        />
        {/* Indicator LEDs on control panel */}
        <circle cx="9" cy="6.5" r="0.6" fill={styles.stroke} />
        <circle cx="11" cy="6.5" r="0.6" fill={styles.stroke} />
        {/* Large Pressurized Door */}
        <rect
          x="6"
          y="9.5"
          width="12"
          height="10"
          rx="1"
          fill="none"
          stroke={styles.stroke}
          strokeWidth="1.5"
        />
        {/* Industrial Wheel Lock / Handle in center of door */}
        <circle cx="12" cy="14.5" r="2.5" fill="none" stroke={styles.stroke} strokeWidth="1.5" />
        <path d="M 12,12 V 17 M 9.5,14.5 H 14.5" stroke={styles.stroke} strokeWidth="1.2" />
      </svg>
      {styles.dot && (
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border border-white animate-pulse" />
      )}
    </div>
  )
}

type StorageIconProps = {
  tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty'
}

export function StorageIcon({ tone }: StorageIconProps) {
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
        {/* Refrigerator Cabinet Body */}
        <rect
          x="4"
          y="3"
          width="16"
          height="18"
          rx="1.5"
          fill={styles.fill}
          stroke={styles.stroke}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Top Ventilation / Compressor Unit */}
        <path
          d="M 4,7 H 20"
          stroke={styles.stroke}
          strokeWidth="1.5"
        />
        <line x1="6" y1="5" x2="18" y2="5" stroke={styles.stroke} strokeWidth="1.2" strokeDasharray="3 2" />
        {/* Double Doors Center Split */}
        <line x1="12" y1="7" x2="12" y2="21" stroke={styles.stroke} strokeWidth="1.5" />
        {/* Left Vertical Handle */}
        <path
          d="M 10,9.5 V 14.5"
          stroke={styles.stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Right Vertical Handle */}
        <path
          d="M 14,9.5 V 14.5"
          stroke={styles.stroke}
          strokeWidth="1.8"
          strokeLinecap="round"
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
  icon: typeof Thermometer
  type: 'steam' | 'storage'
  onSelectSlot: (row: string, col: number, tone: 'good' | 'ripe' | 'watch' | 'critical' | 'empty') => void
  product: ProducerProductModule
}

function ZoneDiagramCard({ name, icon: Icon, type, onSelectSlot, product }: ZoneDiagramCardProps) {
  const items = type === 'steam'
    ? [
        { id: 1, name: 'Lồng 1', tone: 'good' as const },
        { id: 2, name: 'Lồng 2', tone: 'ripe' as const },
        { id: 3, name: 'Lồng 3', tone: 'critical' as const },
        { id: 4, name: 'Lồng 4', tone: 'good' as const },
        { id: 5, name: 'Lồng 5', tone: 'empty' as const },
      ]
    : [
        { id: 1, name: 'Tủ 1', tone: 'critical' as const },
        { id: 2, name: 'Tủ 2', tone: 'good' as const },
        { id: 3, name: 'Tủ 3', tone: 'good' as const },
        { id: 4, name: 'Tủ 4', tone: 'watch' as const },
      ]

  return (
    <div className="rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#FAF2E8]/60 pb-3">
        <div className="flex items-center gap-2 text-[#721A18]">
          <Icon size={20} strokeWidth={2.4} />
          <span className="text-base font-black text-[#150807]">{name}</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="flex items-center justify-around gap-2 select-none py-2">
        {items.map((item) => (
          <div key={item.id} className="relative group flex flex-col items-center">
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSlot('A', item.id, item.tone)}
              className="flex flex-col items-center border-0 bg-transparent p-0 focus:outline-none transition active:scale-90"
            >
              {type === 'steam' ? (
                <SteamerIcon tone={item.tone} />
              ) : (
                <StorageIcon tone={item.tone} />
              )}
              <span className="mt-1.5 text-xs font-black text-[#5C4D43]">{item.name}</span>
            </button>

            {/* Hover Tooltip for Steam Chambers */}
            {type === 'steam' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50 w-48 rounded-[16px] border border-[#EFE4DC] bg-white p-3 shadow-[0_8px_24px_rgba(57,28,12,0.12)] text-left pointer-events-none transition-all duration-200">
                <div className="border-b border-[#FAF2E8] pb-1.5 mb-1.5 text-center text-sm font-black text-[#150807]">
                  {item.name}
                </div>
                {item.tone === 'empty' ? (
                  <div className="text-center text-[#806A5B] font-bold py-1">Đang chờ mẻ mới</div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                        <Thermometer size={14} className="text-[#ff7f0e]" />
                        Nhiệt độ
                      </span>
                      <span className="text-[#150807] font-black">
                        {steamChambers[item.id - 1].temp} °C
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                        <Droplets size={14} className="text-[#2ca02c]" />
                        Độ ẩm
                      </span>
                      <span className="text-[#150807] font-black">
                        {steamChambers[item.id - 1].humidity} %
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                        <Gauge size={14} className="text-[#1f77b4]" />
                        Áp suất
                      </span>
                      <span className="text-[#150807] font-black">
                        {Math.round(steamChambers[item.id - 1].pressure * 100)} cb
                      </span>
                    </div>
                  </div>
                )}
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 border-r border-b border-[#EFE4DC] bg-white" />
              </div>
            )}

            {/* Hover Tooltip for Cold Rooms */}
            {type === 'storage' && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-50 w-48 rounded-[16px] border border-[#EFE4DC] bg-white p-3 shadow-[0_8px_24px_rgba(57,28,12,0.12)] text-left pointer-events-none transition-all duration-200">
                <div className="border-b border-[#FAF2E8] pb-1.5 mb-1.5 text-center text-sm font-black text-[#150807]">
                  {item.name}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                      <Wind size={14} className={product.key === 'banh-xiu-pao' ? 'text-[#4C79B8]' : 'text-[#8B5CF6]'} />
                      {product.key === 'banh-xiu-pao' ? 'NH3' : 'VOC'}
                    </span>
                    <span className="text-[#150807] font-black">
                      {product.key === 'banh-xiu-pao' 
                        ? `${coldRooms[item.id - 1].nh3} ppm` 
                        : `${coldRooms[item.id - 1].voc} ppb`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                      <Snowflake size={14} className="text-[#3B82F6]" />
                      Nhiệt độ
                    </span>
                    <span className="text-[#150807] font-black">
                      {coldRooms[item.id - 1].temp} °C
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-[#806A5B] font-bold">
                      <Droplets size={14} className="text-[#10B981]" />
                      Độ ẩm
                    </span>
                    <span className="text-[#150807] font-black">
                      {coldRooms[item.id - 1].humidity} %
                    </span>
                  </div>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 border-r border-b border-[#EFE4DC] bg-white" />
              </div>
            )}
          </div>
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
        type: 'steam' as const,
        title: `Lồng Hấp Công Nghiệp ${selectedItem.id}`,
        subtitle: `Mẻ: ${chamber.batch}`,
        status: chamber.status,
        progress: chamber.progress,
        tone,
        metrics: [
          { icon: Thermometer, label: 'Nhiệt', value: `${chamber.temp}°C` },
          { icon: Droplets, label: 'Độ ẩm', value: `${chamber.humidity}%` },
          { icon: Gauge, label: 'Áp suất', value: `${chamber.pressure} bar` },
        ],
        extra: chamber.progress > 0 
          ? `${chamber.progress}% quy trình · Còn ${chamber.remainingMinutes} phút`
          : 'Lồng hấp công nghiệp đang chờ mẻ mới'
      }
    } else {
      const room = coldRooms[selectedItem.id - 1]
      const isXiuPao = product.key === 'banh-xiu-pao'
      const itemsMap: Record<string, Record<string, string>> = {
        'banh-gai': {
          'Tủ 1': 'Lá gai',
          'Tủ 2': 'Đậu xanh',
          'Tủ 3': 'Dừa nạo',
          'Tủ 4': 'Bánh gai thành phẩm',
        },
        'banh-xiu-pao': {
          'Tủ 1': 'Nhân thịt xá xíu',
          'Tủ 2': 'Bột mì & mỡ heo',
          'Tủ 3': 'Trứng muối',
          'Tủ 4': 'Bánh xíu páo TP',
        },
        'doi': {
          'Tủ 1': 'Mạch nha',
          'Tủ 2': 'Lạc nhân',
          'Tủ 3': 'Vừng rang',
          'Tủ 4': 'Kẹo dồi thành phẩm',
        },
        'keo-xiu-chau': {
          'Tủ 1': 'Mạch nha',
          'Tủ 2': 'Lạc nhân',
          'Tủ 3': 'Vừng rang',
          'Tủ 4': 'Kẹo sìu châu TP',
        }
      }
      const itemLabel = itemsMap[product.key]?.[room.id] || room.item
      const gasLabel = isXiuPao ? 'NH3' : 'VOC'
      const gasValue = isXiuPao ? `${room.nh3} ppm` : `${room.voc} ppb`
      const currentStatus = room.status === 'VOC tăng' || room.status === 'NH3 tăng'
        ? (isXiuPao ? 'NH3 tăng' : 'VOC tăng')
        : room.status

      const tone = selectedItem.id === 1 ? 'critical' :
                   selectedItem.id === 4 ? 'watch' : 'good'
      return {
        type: 'storage' as const,
        title: `Tủ Lạnh Công Nghiệp ${selectedItem.id}`,
        subtitle: `Lưu trữ: ${itemLabel}`,
        status: currentStatus,
        tone,
        metrics: [
          { icon: Wind, label: gasLabel, value: gasValue },
          { icon: Snowflake, label: 'Nhiệt', value: `${room.temp}°C` },
          { icon: Droplets, label: 'Độ ẩm', value: `${room.humidity}%` },
        ],
        extra: currentStatus === 'VOC tăng' || currentStatus === 'NH3 tăng'
          ? `Cảnh báo: Phát hiện sự bảo quản không tốt do nhiệt độ hoặc độ ẩm không kiểm soát tốt!`
          : 'Hệ thống tủ lạnh công nghiệp đang hoạt động'
      }
    }
  }, [selectedItem, product.key])

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Sơ Đồ" hideSummary>
      <div className="space-y-6">
        {/* Sơ đồ Lồng Hấp */}
        <ZoneDiagramCard
          name="Lồng Hấp Công Nghiệp"
          icon={Thermometer}
          type="steam"
          onSelectSlot={(row, col, tone) => handleSelectSlot('steam', row, col, tone)}
          product={product}
        />

        {/* Sơ đồ Kho Bảo Quản */}
        <ZoneDiagramCard
          name="Tủ Lạnh Công Nghiệp"
          icon={Snowflake}
          type="storage"
          onSelectSlot={(row, col, tone) => handleSelectSlot('storage', row, col, tone)}
          product={product}
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

            {/* Progress Bar for Steaming Oven */}
            {selectedDetails.type === 'steam' && selectedDetails.progress !== undefined && selectedDetails.progress > 0 && (
              <div className="mt-4 rounded-[18px] bg-[#FAF2E8] p-3">
                <div className="flex justify-between items-center text-xs font-bold text-[#6F4B35] mb-1.5">
                  <span>Tiến độ hấp</span>
                  <span>{selectedDetails.progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#E8D9C8] shadow-[inset_0_1px_2px_rgba(74,45,30,0.12)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${selectedDetails.progress}%`,
                      background: selectedDetails.tone === 'critical' ? '#B23B2F' : '#721A18',
                    }}
                  />
                </div>
              </div>
            )}

            <p className="mt-4 text-xs font-bold text-[#806A5B] bg-[#FAF2E8] rounded-xl py-2 px-3 text-center">
              {selectedDetails.extra}
            </p>

            <div className="mt-4">
              <Link
                to={selectedDetails.type === 'steam'
                  ? `/producer/${product.key}/steamer-control`
                  : `/producer/${product.key}/dehumidifier-control`}
                className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-l from-[#77452f] to-[#1c1009] py-3 text-xs font-black text-white hover:opacity-90 active:scale-[0.98] transition-all"
              >
                <span>
                  {selectedDetails.type === 'steam'
                    ? 'Chỉnh nhiệt độ lồng hấp thủ công'
                    : 'Chỉnh thông số tủ lạnh thủ công'}
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Chú thích màu sắc */}
        <div className="rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
          <h3 className="text-base font-black text-[#150807] mb-4">Chú thích màu sắc</h3>
          
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center">
                <SteamerIcon tone="good" />
                <StorageIcon tone="good" />
              </div>
              <span className="text-sm font-black text-[#5C4D43]">Đã hoàn tất hoặc bảo quản tốt</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center">
                <SteamerIcon tone="ripe" />
                <StorageIcon tone="ripe" />
              </div>
              <span className="text-sm font-black text-[#5C4D43]">Trong quá trình</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center">
                <SteamerIcon tone="watch" />
                <StorageIcon tone="watch" />
              </div>
              <span className="text-sm font-black text-[#5C4D43]">Cần chú ý</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center">
                <SteamerIcon tone="critical" />
                <StorageIcon tone="critical" />
              </div>
              <span className="text-sm font-black text-[#5C4D43]">Cảnh báo</span>
            </div>
            <div className="flex items-center gap-3 col-span-2">
              <div className="flex gap-1 items-center">
                <SteamerIcon tone="empty" />
                <StorageIcon tone="empty" />
              </div>
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
      <header className="relative overflow-hidden bg-gradient-to-l from-[#77452f] to-[#1c1009] px-4 pb-6 pt-10 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_28%)]" />
        <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#F59E0B]/5 blur-xl pointer-events-none" />
        
        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/12 text-white/80 transition-transform active:scale-90"
            aria-label="Quay lại danh sách lồng hấp công nghiệp"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-[12px] font-medium tracking-wider text-[#FDF4E7]/55 uppercase">Lồng hấp công nghiệp</span>
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
  const isRunning = chamber.progress > 0
  const elapsedMinutes = isRunning ? Math.round((chamber.progress / 100) * 35) : 0

  return Array.from({ length: 15 }, (_, index) => {
    const t = isRunning ? Math.max(0.5, elapsedMinutes - 14 + index) : index + 1
    
    // Ambient starting levels
    const T_ambient = 27
    const H_ambient = 55
    
    let temp = T_ambient
    let humidity = H_ambient
    let pressure = 0 // in cb (original chamber.pressure is in bar, so 1.2 bar = 120 cb)

    if (isRunning) {
      // Bezier-like rising curves matching bieu_do_vector.svg
      temp = T_ambient + (chamber.temp - T_ambient) * (1 - Math.exp(-t / 12))
      humidity = H_ambient + (chamber.humidity - H_ambient) * (1 - Math.exp(-t / 8))
      
      // Pressure spikes fast in first 5 minutes then oscillates
      const currentPressureCb = chamber.pressure * 100
      if (t < 5) {
        pressure = (currentPressureCb * t) / 5
      } else {
        pressure = currentPressureCb + 4 * Math.sin((t - 5) * 1.5)
      }
    } else {
      // Resting chamber
      const wave = Math.sin((index / 14) * Math.PI * 2)
      temp = T_ambient + wave * 0.4
      humidity = H_ambient + Math.cos((index / 14) * Math.PI * 2) * 0.6
      pressure = 0
    }

    return {
      minute: isRunning ? Math.max(1, elapsedMinutes - 14 + index) : index + 1,
      temperature: Number(temp.toFixed(1)),
      humidity: Number(humidity.toFixed(1)),
      pressure: Number(pressure.toFixed(1))
    }
  })
}

type TrendChartProps = {
  data: TrendPoint[]
}

function TrendChart({ data }: TrendChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  
  const width = 1000
  const height = 550
  const padding = { top: 50, right: 80, bottom: 80, left: 80 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom
  
  const xFor = (index: number) => padding.left + (plotWidth * index) / (data.length - 1)
  
  // Scale so that 200 is at y=50, 0 is at y=470 (plotHeight = 420)
  // y = 470 - (value / 200) * 420
  const yFor = (value: number) => padding.top + plotHeight - (value / 200) * plotHeight
  
  const pointsFor = (key: 'temperature' | 'humidity' | 'pressure') =>
    data.map((point, index) => `${xFor(index)},${yFor(point[key])}`).join(' ')

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const mouseX = ((e.clientX - rect.left) / rect.width) * width
    const index = Math.round(((mouseX - padding.left) / plotWidth) * (data.length - 1))
    if (index >= 0 && index < data.length) {
      setHoveredIdx(index)
    } else {
      setHoveredIdx(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredIdx(null)
  }

  const hoveredPoint = hoveredIdx !== null ? data[hoveredIdx] : null
  const hoveredX = hoveredIdx !== null ? xFor(hoveredIdx) : 0

  return (
    <div className="relative rounded-[22px] border border-[#EFE4DC] bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all duration-300">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        role="img" 
        aria-label="Biểu đồ nhiệt độ, độ ẩm và áp suất trong 15 phút gần nhất" 
        className="h-auto w-full select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Grid Lines at 0, 50, 150, 200 */}
        {[0, 50, 150, 200].map((tick) => {
          const y = yFor(tick)
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#EFE8E2" strokeDasharray="8 8" />
              <text x={padding.left - 16} y={y + 6} textAnchor="end" className="fill-[#8B6B52] text-[18px] font-bold">
                {tick}
              </text>
            </g>
          )
        })}

        {/* Reference Line at 100 */}
        <line x1={padding.left} x2={width - padding.right} y1={yFor(100)} y2={yFor(100)} stroke="#444444" strokeWidth="3" />
        <text x={padding.left - 16} y={yFor(100) + 6} textAnchor="end" className="fill-[#444444] text-[20px] font-black">
          100
        </text>

        {/* X-Axis Ticks (Minutes) */}
        {data.map((point, index) => {
          const x = xFor(index)
          return (
            <g key={point.minute}>
              <line x1={x} x2={x} y1={padding.top} y2={padding.top + plotHeight} stroke="#F1E8DF" strokeDasharray="8 8" />
              <text x={x} y={height - 20} textAnchor="middle" className="fill-[#8B6B52] text-[16px] font-bold">
                {point.minute}'
              </text>
            </g>
          )
        })}

        {/* Axes lines */}
        <line x1={padding.left} x2={padding.left} y1={padding.top} y2={padding.top + plotHeight} stroke="#6D625C" strokeWidth="2" />
        <line x1={padding.left} x2={width - padding.right} y1={padding.top + plotHeight} y2={padding.top + plotHeight} stroke="#6D625C" strokeWidth="2" />

        {/* Curves */}
        {/* Humidity: Green #2ca02c */}
        <polyline fill="none" points={pointsFor('humidity')} stroke="#2ca02c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        {/* Temperature: Orange #ff7f0e */}
        <polyline fill="none" points={pointsFor('temperature')} stroke="#ff7f0e" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
        {/* Pressure: Blue #1f77b4 */}
        <polyline fill="none" points={pointsFor('pressure')} stroke="#1f77b4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />

        {/* Data points */}
        {data.map((point, index) => (
          <g key={`dots-${point.minute}`}>
            <circle cx={xFor(index)} cy={yFor(point.humidity)} r="6" fill="#2ca02c" stroke="#fff" strokeWidth="1.5" />
            <circle cx={xFor(index)} cy={yFor(point.temperature)} r="6" fill="#ff7f0e" stroke="#fff" strokeWidth="1.5" />
            <circle cx={xFor(index)} cy={yFor(point.pressure)} r="6" fill="#1f77b4" stroke="#fff" strokeWidth="1.5" />
          </g>
        ))}

        {/* Vertical hover line */}
        {hoveredIdx !== null && (
          <g>
            <line 
              x1={hoveredX} 
              x2={hoveredX} 
              y1={padding.top} 
              y2={padding.top + plotHeight} 
              stroke="#8B6B52" 
              strokeWidth="2" 
              strokeDasharray="4 4" 
            />
            {/* Highlighted dots */}
            <circle cx={hoveredX} cy={yFor(hoveredPoint!.humidity)} r="9" fill="#2ca02c" stroke="#fff" strokeWidth="2" />
            <circle cx={hoveredX} cy={yFor(hoveredPoint!.temperature)} r="9" fill="#ff7f0e" stroke="#fff" strokeWidth="2" />
            <circle cx={hoveredX} cy={yFor(hoveredPoint!.pressure)} r="9" fill="#1f77b4" stroke="#fff" strokeWidth="2" />
          </g>
        )}
      </svg>

      {/* Tooltip Popup */}
      {hoveredPoint && (
        <div 
          className="absolute z-30 pointer-events-none rounded-xl border border-[#EFE4DC] bg-white/95 p-3 shadow-lg backdrop-blur-sm text-xs font-bold text-[#6F4B35]"
          style={{
            left: hoveredX > width / 2 ? `${(hoveredX - 180) / width * 100}%` : `${(hoveredX + 20) / width * 100}%`,
            top: '20%',
            width: '160px'
          }}
        >
          <div className="border-b border-[#FAF2E8] pb-1.5 mb-1.5 text-center text-sm font-black text-[#150807]">
            Phút thứ {hoveredPoint.minute}
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff7f0e]" />
              Nhiệt độ
            </span>
            <span className="text-[#150807]">{hoveredPoint.temperature} °C</span>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#2ca02c]" />
              Độ ẩm
            </span>
            <span className="text-[#150807]">{hoveredPoint.humidity} %</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#1f77b4]" />
              Áp suất
            </span>
            <span className="text-[#150807]">
              {hoveredPoint.pressure} cb ({ (hoveredPoint.pressure / 100).toFixed(1) } bar)
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[12px] font-black text-[#6F4B35]">
        <LegendItem color="#ff7f0e" label="Nhiệt độ (°C)" />
        <LegendItem color="#2ca02c" label="Độ ẩm (%)" />
        <LegendItem color="#1f77b4" label="Áp suất (cb)" />
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
