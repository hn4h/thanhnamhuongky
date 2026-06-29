import { useState } from 'react'
import { ChevronLeft, Thermometer, Droplets, Gauge } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import { steamChambers, SteamerIcon } from './ProducerProductionMap'
import type { ProducerProductModule } from '../types'

type ProducerSteamerControlProps = {
  product: ProducerProductModule
}

export function ProducerSteamerControl({ product }: ProducerSteamerControlProps) {
  const navigate = useNavigate()
  const [chambers, setChambers] = useState(() => [...steamChambers])
  
  // Track syncing status for each chamber and field.
  // Format: { [id-field]: 'syncing' | 'synced' | null }
  const [syncStatus, setSyncStatus] = useState<Record<string, 'syncing' | 'synced' | null>>({})
  // Keep track of active timeouts so we can cancel them on subsequent changes
  const [timeouts, setTimeouts] = useState<Record<string, NodeJS.Timeout>>({})

  const handleUpdateChamber = (id: string, field: 'temp' | 'humidity' | 'pressure', value: number) => {
    // 1. Update local mock data immediately for responsiveness
    const idx = steamChambers.findIndex((c) => c.id === id)
    if (idx !== -1) {
      ;(steamChambers[idx] as any)[field] = value

      if (field === 'temp') {
        if (value > 100) {
          steamChambers[idx].status = 'Quá nhiệt'
        } else if (value === 27) {
          steamChambers[idx].status = 'Nghỉ'
        } else {
          steamChambers[idx].status = 'Ổn định'
        }
      }
    }
    setChambers([...steamChambers])

    // 2. Trigger IoT syncing animation
    const key = `${id}-${field}`
    
    // Clear existing timeouts for this specific key
    if (timeouts[key]) {
      clearTimeout(timeouts[key])
    }

    setSyncStatus((prev) => ({ ...prev, [key]: 'syncing' }))

    // Simulate sending IoT command to physical device (takes 1.2 seconds)
    const syncTimeout = setTimeout(() => {
      setSyncStatus((prev) => ({ ...prev, [key]: 'synced' }))

      // Fade out the 'synced' checkmark after 1 second
      const fadeTimeout = setTimeout(() => {
        setSyncStatus((prev) => ({ ...prev, [key]: null }))
      }, 1000)

      setTimeouts((prev) => ({ ...prev, [key]: fadeTimeout }))
    }, 1200)

    setTimeouts((prev) => ({ ...prev, [key]: syncTimeout }))
  }

  const isChamberSyncing = (id: string) => {
    return ['temp', 'humidity', 'pressure'].some((field) => syncStatus[`${id}-${field}`] === 'syncing')
  }

  const renderSyncIndicator = (id: string, field: 'temp' | 'humidity' | 'pressure') => {
    const status = syncStatus[`${id}-${field}`]
    if (!status) return null

    if (status === 'syncing') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-[#D97706] animate-pulse">
          <svg className="animate-spin h-3 w-3 text-[#D97706]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Gửi lệnh...
        </span>
      )
    }

    if (status === 'synced') {
      return (
        <span className="flex items-center gap-1 text-[10px] font-black text-[#10B981] animate-[fadeIn_0.3s_ease-out]">
          <span className="text-[12px]">✓</span> Đã nhận
        </span>
      )
    }

    return null
  }

  return (
    <AppFrame contentClassName="p-0">
      <div className="min-h-screen overflow-x-hidden bg-[#FDF4E7] pb-24 text-[#150807]">
        {/* Premium Header */}
        <header
          className="relative overflow-hidden px-4 pb-6 pt-10 text-white bg-gradient-to-l from-[#77452f] to-[#1c1009]"
        >
          {/* Glowing Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_35%)] pointer-events-none" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#F59E0B]/5 blur-xl pointer-events-none" />

          <div className="relative flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/12 text-white/80 transition-all hover:bg-white/20 active:scale-90"
              aria-label="Quay lại bảng điều khiển"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[12px] font-medium tracking-wider text-[#FDF4E7]/55 uppercase">Hệ Thống Thiết Bị</span>
            <div className="w-9 h-9" /> {/* Spacer */}
          </div>

          <div className="relative mt-4 flex items-baseline justify-between">
            <h1 className="text-[22px] font-extrabold tracking-tight text-[#FDF4E7]">Lồng Hấp Thông Minh</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FAF2E8]/10 text-[#F1C932] border border-[#FAF2E8]/20">
              IoT Active
            </span>
          </div>

          <p className="relative mt-1.5 text-[12px] font-bold text-[#D4AF37]">
            Giám sát & điều chỉnh từ xa thông số nhiệt độ, độ ẩm lồng hấp
          </p>
        </header>

        {/* Main Content Area */}
        <div className="px-4 mt-6 space-y-4">
          {chambers.map((chamber) => {
            const isAlert = chamber.status === 'Quá nhiệt'
            const isOff = chamber.status === 'Nghỉ'
            const tone = isAlert ? 'critical' : isOff ? 'empty' : 'good'
            const isSyncing = isChamberSyncing(chamber.id)

            return (
              <div
                key={chamber.id}
                className={`relative overflow-hidden rounded-[24px] border p-5 transition-all duration-300 hover:scale-[1.01] ${
                  isSyncing
                    ? 'border-[#F59E0B] bg-white shadow-[0_0_20px_rgba(245,158,11,0.12)] animate-[pulse_2s_infinite]'
                    : 'border-[#EFE4DC] bg-white shadow-[0_12px_28px_rgba(57,28,12,0.04)]'
                }`}
              >
                {/* Visual indicator line on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                      backgroundColor: isAlert ? '#B23B2F' : isOff ? '#9CA3AF' : '#4A9F57',
                  }}
                />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF2E8]">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 p-1.5 bg-[#FAF2E8] rounded-xl">
                      <SteamerIcon tone={tone} />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#150807]">{chamber.id}</h4>
                      <p className="text-[11px] font-bold text-[#806A5B] mt-0.5">Mẻ hấp: {chamber.batch}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      isAlert
                        ? 'bg-[#FCE8E3] text-[#B23B2F]'
                        : isOff
                        ? 'bg-[#F3F4F6] text-[#6B7280]'
                        : 'bg-[#EDF9F0] text-[#4A9F57]'
                    }`}
                  >
                    {chamber.status}
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#6F4B35] mb-2">
                      <span className="flex items-center gap-1">
                        <Thermometer size={14} className="text-[#806A5B]" />
                        Nhiệt độ hoạt động
                      </span>
                      <div className="flex items-center gap-2">
                        {renderSyncIndicator(chamber.id, 'temp')}
                        <span className="text-sm font-extrabold text-[#150807]">{chamber.temp}°C</span>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="20"
                        max="120"
                        value={chamber.temp}
                        onChange={(e) => handleUpdateChamber(chamber.id, 'temp', parseInt(e.target.value))}
                        className="w-full accent-[#721A18] h-2 bg-[#E8D9C8] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Humidity Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#6F4B35] mb-2">
                      <span className="flex items-center gap-1">
                        <Droplets size={14} className="text-[#806A5B]" />
                        Độ ẩm buồng hấp
                      </span>
                      <div className="flex items-center gap-2">
                        {renderSyncIndicator(chamber.id, 'humidity')}
                        <span className="text-sm font-extrabold text-[#150807]">{chamber.humidity}%</span>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={chamber.humidity}
                        onChange={(e) => handleUpdateChamber(chamber.id, 'humidity', parseInt(e.target.value))}
                        className="w-full accent-[#721A18] h-2 bg-[#E8D9C8] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Pressure Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#6F4B35] mb-2">
                      <span className="flex items-center gap-1">
                        <Gauge size={14} className="text-[#806A5B]" />
                        Áp suất buồng hấp
                      </span>
                      <div className="flex items-center gap-2">
                        {renderSyncIndicator(chamber.id, 'pressure')}
                        <span className="text-sm font-extrabold text-[#150807]">{chamber.pressure.toFixed(1)} bar</span>
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="0"
                        max="3"
                        step="0.1"
                        value={chamber.pressure}
                        onChange={(e) => handleUpdateChamber(chamber.id, 'pressure', parseFloat(e.target.value))}
                        className="w-full accent-[#721A18] h-2 bg-[#E8D9C8] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Additional Telemetry readout */}
                  {chamber.progress > 0 && (
                    <div className="flex justify-end pt-2 border-t border-[#FAF2E8] text-[11px] text-[#721A18] font-bold">
                      <span>
                        Tiến độ: {chamber.progress}% · Còn {chamber.remainingMinutes}m
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Nav Bar */}
        <ProducerNav product={product} />
      </div>
    </AppFrame>
  )
}
