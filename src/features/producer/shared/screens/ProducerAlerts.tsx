import { useState } from 'react'
import { 
  AlertOctagon, 
  AlertTriangle, 
  Info, 
  Wind, 
  Check, 
  RotateCcw, 
  Loader2, 
  ChevronLeft,
  Thermometer,
  Droplets
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import type { ProducerProductModule } from '../types'

type ProducerAlertsProps = {
  product: ProducerProductModule
}

type AlertFilter = 'all' | 'critical' | 'warning' | 'info'

interface CustomAlert {
  id: string
  title: string
  message: string
  createdAt: string
  severity: 'high' | 'medium' | 'low'
  isRead: boolean
  category: 'critical' | 'warning' | 'info'
  metadata?: string
}

export function ProducerAlerts({ product }: ProducerAlertsProps) {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<AlertFilter>('all')

  // IoT Interactive States
  const [steamVented, setSteamVented] = useState<boolean>(false)
  const [ventingLoading, setVentingLoading] = useState<boolean>(false)
  const [tempReduced, setTempReduced] = useState<boolean>(false)
  const [tempLoading, setTempLoading] = useState<boolean>(false)
  const [humidityReduced, setHumidityReduced] = useState<boolean>(false)
  const [humidityLoading, setHumidityLoading] = useState<boolean>(false)

  // Local simulated alerts state
  const [alerts, setAlerts] = useState<CustomAlert[]>([
    {
      id: 'AL-01',
      title: 'Lồng hấp buồng A quá nhiệt & quá áp suất',
      message: 'Nhiệt độ hiện tại: 108°C (ngưỡng 100°C), Áp suất: 2.1 bar (ngưỡng 1.5 bar). Vui lòng xử lý xả áp suất khẩn cấp.',
      createdAt: '2 phút trước',
      severity: 'high',
      isRead: false,
      category: 'critical',
      metadata: 'Khu hấp A · Cảm biến SNS-BG-01'
    },
    {
      id: 'AL-02',
      title: 'Nồng độ VOC tăng cao bất thường',
      message: 'Chỉ số chất hữu cơ dễ bay hơi VOC tại kho bảo quản đạt 3.5 ppm (ngưỡng 1.0 ppm). Có nguy cơ ảnh hưởng chất lượng bảo quản lá bánh gai.',
      createdAt: '10 phút trước',
      severity: 'medium',
      isRead: false,
      category: 'warning',
      metadata: 'Kho thành phẩm · Cảm biến SNS-BG-02'
    },
    {
      id: 'AL-03',
      title: 'Độ ẩm kho thành phẩm tăng nhẹ',
      message: 'Độ ẩm vượt 58%, hệ thống tự động bật quạt thông gió phụ trợ.',
      createdAt: '45 phút trước',
      severity: 'medium',
      isRead: true,
      category: 'warning',
      metadata: 'Kho thành phẩm · Cảm biến SNS-BG-02'
    },
    {
      id: 'AL-04',
      title: 'Cập nhật phần mềm hệ thống cảm biến IoT',
      message: 'Phiên bản firmware v2.4.1 đã được nạp thành công vào toàn bộ cảm biến nhiệt độ đầu cuối.',
      createdAt: '3 giờ trước',
      severity: 'low',
      isRead: true,
      category: 'info',
      metadata: 'Hệ thống tự động'
    },
    {
      id: 'AL-05',
      title: 'Bảo trì thiết bị cảm biến buồng hấp định kỳ',
      message: 'Kỹ thuật viên đã hiệu chuẩn cảm biến buồng hấp A. Sai số đo nhiệt độ hiện tại dưới 0.1°C.',
      createdAt: '1 ngày trước',
      severity: 'low',
      isRead: true,
      category: 'info',
      metadata: 'Kỹ thuật viên Nguyễn Thành Nam'
    }
  ])

  // Mark alert as read
  const handleMarkAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a))
  }

  // Handle steam venting simulation
  const triggerSteamVenting = () => {
    setVentingLoading(true)
    setTimeout(() => {
      setVentingLoading(false)
      setSteamVented(true)
      // Automatically mark this alert as read after processing
      handleMarkAsRead('AL-01')
    }, 2000)
  }

  // Handle temperature reduction simulation
  const triggerTempReduction = () => {
    setTempLoading(true)
    setTimeout(() => {
      setTempLoading(false)
      setTempReduced(true)
      // Check if both VOC actions are done, then mark alert as read
      if (humidityReduced) {
        handleMarkAsRead('AL-02')
      }
    }, 1500)
  }

  // Handle humidity reduction simulation
  const triggerHumidityReduction = () => {
    setHumidityLoading(true)
    setTimeout(() => {
      setHumidityLoading(false)
      setHumidityReduced(true)
      // Check if both VOC actions are done, then mark alert as read
      if (tempReduced) {
        handleMarkAsRead('AL-02')
      }
    }, 1500)
  }

  // Reset actions
  const resetVenting = () => {
    setSteamVented(false)
    setAlerts(prev => prev.map(a => a.id === 'AL-01' ? { ...a, isRead: false } : a))
  }

  const resetVoc = () => {
    setTempReduced(false)
    setHumidityReduced(false)
    setAlerts(prev => prev.map(a => a.id === 'AL-02' ? { ...a, isRead: false } : a))
  }

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true
    return alert.category === filter
  })

  const unreadAlerts = filteredAlerts.filter(a => !a.isRead)
  const readAlerts = filteredAlerts.filter(a => a.isRead)

  return (
    <AppFrame contentClassName="p-0">
      <div className="min-h-screen overflow-x-hidden bg-[#FDF4E7] pb-24 text-[#150807]">
        
        {/* Figma Inspired Premium Header */}
        <header 
          className="relative overflow-hidden px-4 pb-6 pt-10 text-white"
          style={{
            background: 'linear-gradient(160deg, #1A0008 0%, #6B0018 55%, #8B2000 100%)'
          }}
        >
          {/* Glowing Accents */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_35%)] pointer-events-none" />
          <div className="absolute -right-8 -top-8 h-44 w-44 rounded-full bg-[#F59E0B]/5 blur-xl pointer-events-none" />
          
          <div className="relative flex items-center justify-between">
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/12 text-white/80 transition-transform active:scale-90"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[12px] font-medium tracking-wider text-[#FDF4E7]/55 uppercase">Hệ thống</span>
            <div className="w-9 h-9" /> {/* Spacer */}
          </div>

          <div className="relative mt-4 flex items-baseline justify-between">
            <h1 className="text-[22px] font-extrabold tracking-tight text-[#FDF4E7]">Trung tâm Cảnh báo</h1>
            {alerts.filter(a => !a.isRead).length > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#DC2626] text-white animate-pulse">
                {alerts.filter(a => !a.isRead).length} mới
              </span>
            )}
          </div>

          <p className="relative mt-1.5 text-[12px] font-bold text-[#D4AF37] mb-4">
            {filteredAlerts.length} cảnh báo · {unreadAlerts.length} chưa đọc
          </p>

          {/* Filter Navigation Tabs */}
          <div className="relative z-20 flex gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'critical', label: 'Khẩn cấp' },
              { id: 'warning', label: 'Cảnh báo' },
              { id: 'info', label: 'Thông tin' }
            ].map(tab => {
              const isActive = filter === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as AlertFilter)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive 
                      ? 'bg-[#FDF4E7]/15 border-[#FDF4E7]/30 text-[#FDF4E7] shadow-sm backdrop-blur-md'
                      : 'bg-[#FDF4E7]/7 border-[#FDF4E7]/12 text-[#FDF4E7]/50'
                  }`}
                  style={{
                    background: isActive ? 'rgba(253, 244, 231, 0.18)' : 'rgba(253, 244, 231, 0.07)',
                    borderColor: isActive ? 'rgba(253, 244, 231, 0.35)' : 'rgba(253, 244, 231, 0.12)'
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </header>

        {/* Main Alert List */}
        <div className="px-4 mt-4 space-y-6">
          
          {/* UNREAD GROUP */}
          {unreadAlerts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B6B52]">{filter === 'all' ? 'Chưa đọc' : 'Đang kích hoạt'}</div>
              
              {unreadAlerts.map((alert) => {
                const isUrgent = alert.severity === 'high'
                
                return (
                  <article 
                    key={alert.id} 
                    className="relative overflow-hidden rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.06)] border border-[#EFE4DC] transition-all duration-300 hover:scale-[1.01]"
                  >
                    {/* Severity Border Indicator Top Line */}
                    <div 
                      className="h-[3px] w-full"
                      style={{ backgroundColor: isUrgent ? '#DC2626' : '#F59E0B' }}
                    />
                    
                    <div className="p-4">
                      {/* Badge and Time */}
                      <div className="flex items-center justify-between">
                        <span 
                          className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
                          style={{ 
                            backgroundColor: isUrgent ? 'rgba(220,38,38,0.08)' : 'rgba(245,158,11,0.08)',
                            color: isUrgent ? '#DC2626' : '#D97706'
                          }}
                        >
                          {isUrgent ? 'Khẩn cấp' : 'Cảnh báo'}
                        </span>
                        <span className="text-[10px] font-bold text-[#C4A882]">{alert.createdAt}</span>
                      </div>

                      {/* Header details */}
                      <div className="mt-3 flex items-start gap-3">
                        <div 
                          className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5"
                          style={{ 
                            backgroundColor: isUrgent ? 'rgba(220,38,38,0.08)' : 'rgba(245,158,11,0.08)',
                            color: isUrgent ? '#DC2626' : '#D97706'
                          }}
                        >
                          {isUrgent ? <AlertOctagon size={18} /> : <AlertTriangle size={18} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-[13px] font-bold text-[#2C1810] leading-tight leading-snug">{alert.title}</h2>
                          <p className="mt-1 text-[11px] leading-5 text-[#6B4C3B]">
                            {alert.id === 'AL-01' && steamVented 
                              ? 'Hệ thống buồng IoT đã thực hiện xả hơi tự động. Áp suất buồng hiện đã trở lại ngưỡng an toàn: 1.1 bar, Nhiệt độ buồng hấp: 95°C.' 
                              : alert.id === 'AL-02' 
                                ? `Nồng độ VOC hiện tại: 3.5 ppm (ngưỡng an toàn: <1.0 ppm).${
                                    tempReduced ? ' [Đã giảm nhiệt độ bảo quản xuống 18°C]' : ''
                                  }${
                                    humidityReduced ? ' [Đã bật hút ẩm sâu xuống 45%]' : ''
                                  }`
                                : alert.message
                            }
                          </p>
                          {alert.metadata && (
                            <p className="mt-2 text-[10px] font-semibold text-[#C4A882] uppercase tracking-wide">
                              {alert.metadata}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Interactive Actions */}
                      {alert.id === 'AL-01' && (
                        <div className="mt-4 flex gap-2 border-t border-[#EFE4DC]/60 pt-3">
                          {!steamVented ? (
                            <>
                              <button
                                type="button"
                                onClick={triggerSteamVenting}
                                disabled={ventingLoading}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7A0020] to-[#9A1A00] hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                              >
                                {ventingLoading ? (
                                  <>
                                    <Loader2 size={13} className="animate-spin" />
                                    <span>Đang gửi lệnh xả...</span>
                                  </>
                                ) : (
                                  <>
                                    <Wind size={13} />
                                    <span>Xả hơi tự động</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMarkAsRead(alert.id)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8B6B52] bg-[#2C1810]/5 hover:bg-[#2C1810]/8 active:scale-95 transition-all"
                              >
                                Bỏ qua
                              </button>
                            </>
                          ) : (
                            <div className="flex-1 flex items-center justify-between bg-[#EDF9F0] border border-[#4A9F57]/20 rounded-xl p-2 text-xs text-[#214D35] font-semibold">
                              <span className="flex items-center gap-1.5">
                                <Check size={14} className="text-[#4A9F57]" />
                                Đã xử lý xả hơi
                              </span>
                              <button 
                                type="button"
                                onClick={resetVenting}
                                className="flex items-center gap-0.5 text-[10px] text-[#806A5B] hover:text-[#3A0611]"
                              >
                                <RotateCcw size={10} />
                                Khôi phục
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {alert.id === 'AL-02' && (
                        <div className="mt-4 flex flex-col gap-2 border-t border-[#EFE4DC]/60 pt-3">
                          <div className="flex gap-2">
                            {!tempReduced ? (
                              <button
                                type="button"
                                onClick={triggerTempReduction}
                                disabled={tempLoading}
                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7A0020] to-[#9A1A00] hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                              >
                                {tempLoading ? (
                                  <Loader2 size={13} className="animate-spin" />
                                ) : (
                                  <Thermometer size={13} />
                                )}
                                <span>Hạ nhiệt độ kho</span>
                              </button>
                            ) : (
                              <div className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold text-[#214D35] bg-[#EDF9F0] border border-[#4A9F57]/15">
                                <Check size={12} />
                                <span>Đã hạ nhiệt (18°C)</span>
                              </div>
                            )}

                            {!humidityReduced ? (
                              <button
                                type="button"
                                onClick={triggerHumidityReduction}
                                disabled={humidityLoading}
                                className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#7A0020] to-[#9A1A00] hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                              >
                                {humidityLoading ? (
                                  <Loader2 size={13} className="animate-spin" />
                                ) : (
                                  <Droplets size={13} />
                                )}
                                <span>Bật hút ẩm kho</span>
                              </button>
                            ) : (
                              <div className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-bold text-[#214D35] bg-[#EDF9F0] border border-[#4A9F57]/15">
                                <Check size={12} />
                                <span>Đã hút ẩm (45%)</span>
                              </div>
                            )}
                          </div>
                          {(tempReduced || humidityReduced) && (
                            <button
                              type="button"
                              onClick={resetVoc}
                              className="self-end flex items-center gap-0.5 text-[10px] text-[#806A5B] hover:text-[#3A0611] mt-1"
                            >
                              <RotateCcw size={10} />
                              Khôi phục thiết lập kho
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* READ GROUP */}
          {readAlerts.length > 0 && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B6B52]">Đã xử lý / Đã đọc</div>
              
              {readAlerts.map((alert) => (
                <article 
                  key={alert.id}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 border border-[#EFE4DC]/60 transition-all duration-300 hover:scale-[1.01]"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C1810]/5 text-[#C4A882] shrink-0 mt-0.5">
                    {alert.category === 'info' ? <Info size={16} /> : <AlertTriangle size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-[12px] font-bold text-[#2C1810]/75 truncate">{alert.title}</h2>
                      <span className="text-[9px] text-[#C4A882]">{alert.createdAt}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-[#6B4C3B]/80">{alert.message}</p>
                    {alert.metadata && (
                      <p className="mt-1.5 text-[9px] font-semibold text-[#C4A882]/70 uppercase tracking-wider">
                        {alert.metadata}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredAlerts.length === 0 && (
            <div className="text-center py-10 rounded-2xl border border-dashed border-[#EFE4DC] bg-white/30 text-sm text-[#806A5B]">
              Không tìm thấy cảnh báo nào phù hợp với bộ lọc.
            </div>
          )}
          
        </div>

        {/* Bottom Nav Bar */}
        <ProducerNav product={product} />

      </div>
    </AppFrame>
  )
}

