import { useState } from 'react'
import { ChevronLeft, Thermometer, Droplets, Wind, Snowflake } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import { coldRooms, StorageIcon } from './ProducerProductionMap'
import type { ProducerProductModule } from '../types'

type ProducerDehumidifierControlProps = {
  product: ProducerProductModule
}

export function ProducerDehumidifierControl({ product }: ProducerDehumidifierControlProps) {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState(() => [...coldRooms])

  const handleUpdateRoom = (id: string, field: 'temp' | 'dehumidifier' | 'ventilation', value: any) => {
    const idx = coldRooms.findIndex((r) => r.id === id)
    if (idx !== -1) {
      ;(coldRooms[idx] as any)[field] = value

      if (id === 'Tủ 1') {
        const room = coldRooms[idx]
        const isXiuPao = product.key === 'banh-xiu-pao'
        // If temperature <= 3 OR both dehumidifier and ventilation are active, resolve warning
        if (room.temp <= 3 || (room.dehumidifier && room.ventilation)) {
          room.status = 'Ổn định'
          room.voc = 28
          room.nh3 = 12
        } else {
          room.status = isXiuPao ? 'NH3 tăng' : 'VOC tăng'
          room.voc = 68
          room.nh3 = 25
        }
      }
    }
    setRooms([...coldRooms])
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
            <h1 className="text-[22px] font-extrabold tracking-tight text-[#FDF4E7]">Hút Ẩm Thông Minh</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-[#FAF2E8]/10 text-[#F1C932] border border-[#FAF2E8]/20">
              IoT Active
            </span>
          </div>

          <p className="relative mt-1.5 text-[12px] font-bold text-[#D4AF37]">
            Giám sát & điều chỉnh từ xa nhiệt độ bảo quản, hút ẩm & quạt thông gió tủ lạnh công nghiệp
          </p>
        </header>

        {/* Main Content Area */}
        <div className="px-4 mt-6 space-y-4">
          {rooms.map((room) => {
            const isAlert = room.status === 'VOC tăng' || room.status === 'NH3 tăng'
            const isWatch = room.status === 'Theo dõi'
            const tone = isAlert ? 'critical' : isWatch ? 'watch' : 'good'
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
              <div
                key={room.id}
                className="relative overflow-hidden rounded-[24px] border border-[#EFE4DC] bg-white p-5 shadow-[0_12px_28px_rgba(57,28,12,0.04)] transition-all duration-300 hover:scale-[1.01]"
              >
                {/* Visual indicator line on top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{
                    backgroundColor: isAlert ? '#B23B2F' : isWatch ? '#C78116' : '#4A9F57',
                  }}
                />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#FAF2E8]">
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 p-1.5 bg-[#FAF2E8] rounded-xl">
                      <StorageIcon tone={tone} />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#150807]">{room.id}</h4>
                      <p className="text-[11px] font-bold text-[#806A5B] mt-0.5">Bảo quản: {itemLabel}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                      isAlert
                        ? 'bg-[#FCE8E3] text-[#B23B2F]'
                        : isWatch
                        ? 'bg-[#FFF9E6] text-[#C78116]'
                        : 'bg-[#EDF9F0] text-[#4A9F57]'
                    }`}
                  >
                    {currentStatus}
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Temperature slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-[#6F4B35] mb-2">
                      <span className="flex items-center gap-1">
                        <Snowflake size={14} className="text-[#806A5B]" />
                        Nhiệt độ bảo quản
                      </span>
                      <span className="text-sm font-extrabold text-[#150807]">{room.temp}°C</span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="range"
                        min="-10"
                        max="10"
                        value={room.temp}
                        onChange={(e) => handleUpdateRoom(room.id, 'temp', parseInt(e.target.value))}
                        className="w-full accent-[#721A18] h-2 bg-[#E8D9C8] rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Dehumidifier Toggle */}
                  <div className="flex items-center justify-between py-2 border-t border-[#FAF2E8] mt-2">
                    <div>
                      <span className="text-xs font-black text-[#150807] flex items-center gap-1">
                        <Droplets size={14} className="text-[#806A5B]" />
                        Chế độ hút ẩm
                      </span>
                      <p className="text-[10px] font-bold text-[#806A5B] mt-0.5">Kích hoạt hệ thống hút ẩm sâu</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpdateRoom(room.id, 'dehumidifier', !room.dehumidifier)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        room.dehumidifier ? 'bg-[#4A9F57]' : 'bg-[#E8D9C8]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          room.dehumidifier ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Fan/Ventilation Toggle */}
                  <div className="flex items-center justify-between py-2 border-t border-[#FAF2E8]">
                    <div>
                      <span className="text-xs font-black text-[#150807] flex items-center gap-1">
                        <Wind size={14} className="text-[#806A5B]" />
                        Hệ thống thoát gió
                      </span>
                      <p className="text-[10px] font-bold text-[#806A5B] mt-0.5">Bật quạt thông gió phụ trợ</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleUpdateRoom(room.id, 'ventilation', !room.ventilation)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        room.ventilation ? 'bg-[#4A9F57]' : 'bg-[#E8D9C8]'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          room.ventilation ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Extra Status */}
                  <div className="pt-2 border-t border-[#FAF2E8] text-[11px] text-[#806A5B] font-bold flex justify-between">
                    <span>Nồng độ khí {isXiuPao ? 'NH3' : 'VOC'}: {isXiuPao ? room.nh3 : room.voc} {isXiuPao ? 'ppm' : 'ppb'}</span>
                    <span>Độ ẩm kho: {room.humidity}%</span>
                  </div>
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
