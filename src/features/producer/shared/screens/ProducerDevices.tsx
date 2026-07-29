import { useState, useMemo } from 'react'
import { ChevronLeft, Droplets, Gauge, Snowflake, Thermometer, Wind, AlertTriangle } from 'lucide-react'
import { ProducerScreenShell } from './ProducerScreenShell'
import { coldRooms, getColdRooms, getSteamChambers, SteamChamberDetail, SensorMini } from './ProducerProductionMap'
import { ProducerNav } from '../components/ProducerNav'
import type { ProducerProductModule } from '../types'

type ProducerDevicesProps = {
  product: ProducerProductModule
}

export function ProducerDevices({ product }: ProducerDevicesProps) {
  const chambersList = useMemo(() => getSteamChambers(product.key), [product.key])
  const roomsList = useMemo(() => getColdRooms(product.key), [product.key])
  const [selectedChamber, setSelectedChamber] = useState<(typeof chambersList)[number] | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<(typeof roomsList)[number] | null>(null)
  const [activeTab, setActiveTab] = useState<'steamer' | 'storage'>('steamer')

  const hasSteamerWarning = useMemo(() => chambersList.some((chamber) => chamber.status === 'Quá nhiệt'), [chambersList])
  const hasStorageWarning = useMemo(() => roomsList.some((room) => room.status === 'VOC tăng' || room.status === 'NH3 tăng'), [roomsList])

  if (selectedChamber) {
    return <SteamChamberDetail chamber={selectedChamber} product={product} onBack={() => setSelectedChamber(null)} />
  }

  if (selectedRoom) {
    return <ColdRoomDetail room={selectedRoom} product={product} onBack={() => setSelectedRoom(null)} />
  }

  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title="Tổng Quan" hideSummary>
      {/* Tabs Switcher */}
      <div className="mb-6 flex rounded-[20px] bg-[#FAF2E8] p-1 shadow-[inset_0_1px_3px_rgba(74,45,30,0.08)]">
        <button
          type="button"
          onClick={() => setActiveTab('steamer')}
          className={`flex-1 rounded-[16px] py-3 px-2 text-center text-sm font-black transition-all duration-300 flex items-center justify-center gap-1.5 relative ${
            activeTab === 'steamer'
              ? 'bg-[#721A18] text-white shadow-sm'
              : 'text-[#806A5B] hover:text-[#721A18]'
          }`}
        >
          <span>{product.key === 'banh-xiu-pao' ? 'Lò nướng công nghiệp' : 'Lồng hấp công nghiệp'}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
            activeTab === 'steamer' ? 'bg-white/20 text-white' : 'bg-[#EFE4DC] text-[#721A18]'
          }`}>
            {chambersList.length}
          </span>
          {hasSteamerWarning && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E64A35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E64A35]"></span>
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('storage')}
          className={`flex-1 rounded-[16px] py-3 px-2 text-center text-sm font-black transition-all duration-300 flex items-center justify-center gap-1.5 relative ${
            activeTab === 'storage'
              ? 'bg-[#721A18] text-white shadow-sm'
              : 'text-[#806A5B] hover:text-[#721A18]'
          }`}
        >
          <span>Tủ lạnh công nghiệp</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
            activeTab === 'storage' ? 'bg-white/20 text-white' : 'bg-[#EFE4DC] text-[#721A18]'
          }`}>
            {coldRooms.length}
          </span>
          {hasStorageWarning && (
            <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E64A35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E64A35]"></span>
            </span>
          )}
        </button>
      </div>

      {activeTab === 'steamer' ? (
        /* Lồng Hấp Section */
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-[#806A5B]">
              Theo dõi nhiệt độ, độ ẩm{product.key === 'banh-xiu-pao' ? '' : ', áp suất'} và tiến độ từng {product.key === 'banh-xiu-pao' ? 'lò nướng' : 'lồng hấp'} công nghiệp.
            </p>
            {hasSteamerWarning && (
              <span className="rounded-full bg-[#FCE8E3] px-2 py-0.5 text-[10px] font-black text-[#B23B2F] border border-[#EAA18F]">
                1 cảnh báo
              </span>
            )}
          </div>

          <div className="grid gap-3">
            {chambersList.map((chamber) => {
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
                        <h3 className="text-lg font-black text-[#150807]">
                          {product.key === 'banh-xiu-pao' ? chamber.id.replace('Lồng', 'Lò') : chamber.id}
                        </h3>
                        <p className="truncate text-sm font-bold text-[#806A5B]">
                          {product.key === 'banh-xiu-pao' ? `Mẻ nướng: ${chamber.batch}` : chamber.batch}
                        </p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${isWarning ? 'bg-[#FCE8E3] text-[#B23B2F]' : 'bg-[#EDF9F0] text-[#4A9F57]'}`}>
                      {chamber.status === 'Đang hấp' ? (product.key === 'banh-xiu-pao' ? 'Đang nướng' : 'Đang hấp') : chamber.status}
                    </span>
                  </div>

                  <div className="mt-4 rounded-[18px] bg-[#FAF2E8] px-3 py-3">
                    <div className="h-4 overflow-hidden rounded-full bg-[#E8D9C8] shadow-[inset_0_1px_2px_rgba(74,45,30,0.12)]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${chamber.progress}%`,
                          background: isWarning ? '#B23B2F' : '#721A18',
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm font-bold text-[#6F4B35]">
                      {isIdle ? (product.key === 'banh-xiu-pao' ? 'Lò đang chờ mẻ mới' : 'Lồng đang chờ mẻ mới') : `Còn ${chamber.remainingMinutes} phút sẽ xong`}
                    </p>
                  </div>

                  <div className={`mt-4 grid ${product.key === 'banh-xiu-pao' ? 'grid-cols-2' : 'grid-cols-3'} gap-2 text-center`}>
                    <SensorMini icon={Thermometer} label="Nhiệt" value={`${chamber.temp}°C`} />
                    <SensorMini icon={Droplets} label="Độ ẩm" value={`${chamber.humidity}%`} />
                    {product.key !== 'banh-xiu-pao' && (
                      <SensorMini icon={Gauge} label="Áp suất" value={`${chamber.pressure} bar`} />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ) : (
        /* Kho Bảo Quản Section */
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-[#806A5B]">
              Theo dõi {product.key === 'banh-xiu-pao' ? 'NH3' : 'VOC'}, nhiệt độ và độ ẩm nguyên liệu trong tủ lạnh công nghiệp.
            </p>
            {hasStorageWarning && (
              <span className="rounded-full bg-[#FFF6E7] px-2 py-0.5 text-[10px] font-black text-[#C78116] border border-[#EAA18F]">
                Cảnh báo {product.key === 'banh-xiu-pao' ? 'NH3' : 'VOC'}
              </span>
            )}
          </div>

          <div className="grid gap-3">
            {roomsList.map((room) => {
              const isWarning = room.status === 'VOC tăng' || room.status === 'NH3 tăng'
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
              const currentStatus = room.status === 'VOC tăng' || room.status === 'NH3 tăng'
                ? (isXiuPao ? 'NH3 tăng' : 'VOC tăng')
                : room.status

              return (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className={`w-full rounded-[24px] border bg-white p-4 text-left shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition active:scale-[0.99] ${isWarning ? 'border-[#EAA18F]' : 'border-[#EFE4DC]'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-[18px] ${isWarning ? 'bg-[#FFF6E7] text-[#C78116]' : 'bg-[#EEF7FF] text-[#4C79B8]'}`}>
                        <Snowflake size={24} strokeWidth={2.3} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-[#150807]">{room.id}</h3>
                        <p className="truncate text-sm font-bold text-[#806A5B]">{itemLabel}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-black ${isWarning ? 'bg-[#FFF6E7] text-[#C78116]' : 'bg-[#EDF9F0] text-[#4A9F57]'}`}>
                      {currentStatus}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <SensorMini icon={Wind} label={isXiuPao ? 'NH3' : 'VOC'} value={isXiuPao ? `${room.nh3} ppm` : `${room.voc} ppb`} />
                    <SensorMini icon={Snowflake} label="Nhiệt" value={`${room.temp}°C`} />
                    <SensorMini icon={Droplets} label="Độ ẩm" value={`${room.humidity}%`} />
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}
    </ProducerScreenShell>
  )
}

// Subcomponents for Cold Room Details Page

type ColdRoomDetailProps = {
  product: ProducerProductModule
  room: (typeof coldRooms)[number]
  onBack: () => void
}

function ColdRoomDetail({ product, room: initialRoom, onBack }: ColdRoomDetailProps) {
  const room = getColdRooms(product.key).find((r) => r.id === initialRoom.id) || initialRoom
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
  const gasUnit = isXiuPao ? 'ppm' : 'ppb'
  const targetVal = isXiuPao ? (room.nh3 ?? 25) : room.voc
  const currentStatus = room.status === 'VOC tăng' || room.status === 'NH3 tăng'
    ? (isXiuPao ? 'NH3 tăng' : 'VOC tăng')
    : room.status

  const vocData = useMemo(() => {
    if (room.id === 'Tủ 1' && isXiuPao) {
      return [
        { day: 1, value: 6 },
        { day: 2, value: 8 },
        { day: 3, value: 11 },
        { day: 4, value: 14 },
        { day: 5, value: 17 },
        { day: 6, value: 19 },
        { day: 7, value: 24 },
      ]
    }
    if (room.id === 'Tủ 1' && !isXiuPao) {
      return [
        { day: 1, value: 25 },
        { day: 2, value: 29 },
        { day: 3, value: 35 },
        { day: 4, value: 42 },
        { day: 5, value: 49 },
        { day: 6, value: 56 },
        { day: 7, value: 62 },
      ]
    }
    // Generate 7 days of historical VOC/NH3 data ending at targetVal
    return [
      { day: 1, value: Math.round(targetVal * 0.72) },
      { day: 2, value: Math.round(targetVal * 0.85) },
      { day: 3, value: Math.round(targetVal * 0.78) },
      { day: 4, value: Math.round(targetVal * 0.94) },
      { day: 5, value: Math.round(targetVal * 0.81) },
      { day: 6, value: Math.round(targetVal * 0.89) },
      { day: 7, value: targetVal },
    ]
  }, [room, targetVal, isXiuPao])

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#F8EFE2] text-[#150807] shadow-[0_0_80px_rgba(74,45,30,0.32)]">
      <div className="min-h-screen overflow-x-hidden bg-[#F8EFE2] pb-24">
        {/* Header with cool blue/teal gradient for Cold Room */}
        <header className="relative overflow-hidden bg-gradient-to-l from-[#77452f] to-[#1c1009] px-4 pb-6 pt-10 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_28%)]" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#3B82F6]/5 blur-xl pointer-events-none" />
          
          <div className="relative flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/12 text-white/80 transition-transform active:scale-90"
              aria-label="Quay lại danh sách tủ lạnh công nghiệp"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[12px] font-medium tracking-wider text-[#E2ECF8]/60 uppercase">Tủ lạnh công nghiệp</span>
            <div className="w-9 h-9" /> {/* Spacer */}
          </div>

          <div className="relative mt-4 flex items-center justify-between">
            <h1 className="text-[22px] font-extrabold tracking-tight text-[#F3F7FC]">{itemLabel}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#60A5FA]/25 text-[#93C5FD] border border-[#60A5FA]/20">
              {room.id}
            </span>
          </div>

          <p className="relative mt-1 text-[12px] font-bold text-[#AEC2DC]">
            B-2026-03 · Cảm biến hoạt động · {product.name} Thành Phương
          </p>

          <div className="relative mt-5 flex items-center justify-between gap-5 text-xs font-bold text-[#D0DFEE]">
            <span>Trạng thái hệ thống bảo quản</span>
            <strong className={`whitespace-nowrap shrink-0 ${
              room.status === 'VOC tăng' || room.status === 'NH3 tăng' ? 'text-[#F59E0B]' :
              room.status === 'Theo dõi' ? 'text-[#F59E0B]' :
              'text-[#34D399]'
            }`}>{currentStatus}</strong>
          </div>
        </header>

        <main className="px-4 pt-7">
          {(room.status === 'VOC tăng' || room.status === 'NH3 tăng') && (
            <div className="mb-6 rounded-[20px] border border-[#EAA18F] bg-[#FFF6F4] p-4 shadow-[0_8px_20px_rgba(230,74,53,0.06)] flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FCE8E3] text-[#B23B2F]">
                <AlertTriangle size={20} strokeWidth={2.3} />
              </span>
              <div>
                <h4 className="text-sm font-black text-[#721A18]">Cảnh báo: Bảo quản không tốt</h4>
                <p className="mt-1 text-xs font-bold text-[#806A5B] leading-relaxed">
                  Phát hiện nồng độ {gasLabel} tăng đột biến từ ngày 5 đến ngày 7 (lên {targetVal} {gasUnit}) do nhiệt độ hoặc độ ẩm không được kiểm soát tốt. Vui lòng kiểm tra lại thiết bị làm lạnh.
                </p>
              </div>
            </div>
          )}

          {/* Current Metrics Section */}
          <section>
            <h2 className="text-[22px] font-black leading-tight text-[#150807]">Chỉ số hiện tại</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <DetailMetric icon={Snowflake} tone="blue" value={`${room.temp}°C`} label="Nhiệt độ" />
              <DetailMetric icon={Droplets} tone="teal" value={`${room.humidity}%`} label="Độ ẩm" />
              <DetailMetric icon={Wind} tone="orange" value={`${targetVal} ${gasUnit}`} label={gasLabel} />
            </div>
          </section>

          {/* Historical VOC Chart Section */}
          <section className="mt-8">
            <div className="mb-4">
              <h2 className="text-[22px] font-black leading-tight text-[#150807]">Biểu đồ {gasLabel}</h2>
              <p className="mt-1 text-xs font-bold text-[#806A5B]">7 ngày gần nhất · Chỉ số thực tế ({gasUnit})</p>
            </div>
            <VocChart data={vocData} isXiuPao={isXiuPao} />
          </section>
        </main>
        <ProducerNav product={product} />
      </div>
    </div>
  )
}

const detailMetricTone = {
  orange: 'bg-[#FFF6E7] text-[#C78116]',
  blue: 'bg-[#EEF7FF] text-[#4C79B8]',
  teal: 'bg-[#EDF9F0] text-[#4A9F57]',
}

type DetailMetricProps = {
  icon: typeof Snowflake
  tone: 'orange' | 'blue' | 'teal'
  value: string
  label: string
}

function DetailMetric({ icon: Icon, tone, value, label }: DetailMetricProps) {
  return (
    <div className="min-w-0 rounded-[22px] border border-[#EFE4DC] bg-white px-2 py-5 text-center shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all duration-300 hover:scale-[1.02]">
      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl ${detailMetricTone[tone]}`}>
        <Icon size={22} strokeWidth={2.3} />
      </span>
      <strong className="mt-4 block text-[18px] font-extrabold leading-none text-[#150807]">{value}</strong>
      <p className="mt-2 text-xs font-bold text-[#806A5B]">{label}</p>
    </div>
  )
}

type VocChartProps = {
  data: Array<{ day: number; value: number }>
  isXiuPao: boolean
}

function VocChart({ data, isXiuPao }: VocChartProps) {
  const width = 720
  const height = 360
  const padding = { top: 38, right: 30, bottom: 52, left: 54 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const xFor = (index: number) => padding.left + (plotWidth * index) / (data.length - 1)
  
  // Calculate dynamic min and max for Y axis
  const values = data.map((d) => d.value)
  const maxVal = Math.max(...values, 100)
  const minVal = 0
  const yLimit = Math.ceil(maxVal / 50) * 50

  const yFor = (value: number) => {
    return padding.top + plotHeight - ((value - minVal) / (yLimit - minVal)) * plotHeight
  }

  const pathPoints = data.map((p, i) => `${xFor(i)},${yFor(p.value)}`).join(' ')
  const ticks = Array.from({ length: 5 }, (_, i) => Math.round(minVal + ((yLimit - minVal) * i) / 4))

  return (
    <div className="rounded-[22px] border border-[#EFE4DC] bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all duration-300 hover:scale-[1.01]">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Biểu đồ VOC" className="h-auto w-full">
        {/* Y Grid lines and Ticks */}
        {ticks.map((tick) => {
          const y = yFor(tick)
          return (
            <g key={tick}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#F0E8DF" strokeDasharray="8 8" />
              <text x={padding.left - 15} y={y + 6} textAnchor="end" className="fill-[#8B6B52] text-[18px] font-bold">
                {tick}
              </text>
            </g>
          )
        })}

        {/* X Ticks */}
        {data.map((point, index) => {
          const x = xFor(index)
          return (
            <g key={point.day}>
              <line x1={x} x2={x} y1={padding.top} y2={padding.top + plotHeight} stroke="#F7F1EB" strokeDasharray="6 6" />
              <text x={x} y={height - 12} textAnchor="middle" className="fill-[#8B6B52] text-[16px] font-bold">
                N{point.day}
              </text>
            </g>
          )
        })}

        {/* Axis Lines */}
        <line x1={padding.left} x2={padding.left} y1={padding.top} y2={padding.top + plotHeight} stroke="#7E726A" strokeWidth="2" />
        <line x1={padding.left} x2={width - padding.right} y1={padding.top + plotHeight} y2={padding.top + plotHeight} stroke="#7E726A" strokeWidth="2" />

        {/* Line path */}
        <polyline fill="none" points={pathPoints} stroke="#214D35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />

        {/* Data points */}
        {data.map((point, index) => {
          const cx = xFor(index)
          const cy = yFor(point.value)

          return (
            <g key={`marker-${point.day}`}>
              <circle cx={cx} cy={cy} r="8" fill="#214D35" stroke="#FFFFFF" strokeWidth="2" />
              {index === data.length - 1 && (
                <g>
                  <rect x={cx - 25} y={cy - 34} width="50" height="22" rx="6" fill="#4F423B" />
                  <text x={cx} y={cy - 19} textAnchor="middle" className="fill-white text-[12px] font-extrabold">
                    {point.value}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      <div className="mt-4 flex justify-center gap-5 text-center text-xs font-black text-[#6F4B35]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-6 rounded-full bg-[#214D35]" />
          Nồng độ {isXiuPao ? 'NH3' : 'VOC'} thực tế ({isXiuPao ? 'ppm' : 'ppb'})
        </span>
      </div>
    </div>
  )
}

