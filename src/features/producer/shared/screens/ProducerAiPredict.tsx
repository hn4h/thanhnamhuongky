import { useState, useMemo } from 'react'
import { 
  BrainCircuit, 
  Wind, 
  Thermometer, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Settings2, 
  ArrowLeft,
  ChevronLeft,
  Loader2,
  Sparkles
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerAiPredictProps = {
  product: ProducerProductModule
}

// Initial mock data for VOC chart over 12 days
// Day 1 to 7 are actual historical, Day 8 to 12 are AI predictions
const INITIAL_VOC_DAYS = [
  { day: 1, value: 85, isForecast: false },
  { day: 2, value: 92, isForecast: false },
  { day: 3, value: 98, isForecast: false },
  { day: 4, value: 90, isForecast: false },
  { day: 5, value: 104, isForecast: false },
  { day: 6, value: 109, isForecast: false },
  { day: 7, value: 115, isForecast: false }, // End of actual
  { day: 8, value: 119, isForecast: true },  // Start of forecast
  { day: 9, value: 128, isForecast: true },  // Exceeds default 120 threshold
  { day: 10, value: 135, isForecast: true }, // Exceeds default 120 threshold
  { day: 11, value: 123, isForecast: true }, // Exceeds default 120 threshold
  { day: 12, value: 110, isForecast: true }
]

export function ProducerAiPredict({ product }: ProducerAiPredictProps) {
  const navigate = useNavigate()
  
  // States
  const [warningThreshold, setWarningThreshold] = useState<number>(120)
  const [tempReduced, setTempReduced] = useState<boolean>(false)
  const [tempLoading, setTempLoading] = useState<boolean>(false)
  
  const [humidityReduced, setHumidityReduced] = useState<boolean>(false)
  const [humidityLoading, setHumidityLoading] = useState<boolean>(false)

  // Trigger quick action to lower temperature
  const handleLowerTemp = () => {
    setTempLoading(true)
    setTimeout(() => {
      setTempReduced(true)
      setTempLoading(false)
    }, 800)
  }

  // Trigger quick action to lower humidity
  const handleLowerHumidity = () => {
    setHumidityLoading(true)
    setTimeout(() => {
      setHumidityReduced(true)
      setHumidityLoading(false)
    }, 800)
  }

  // Reset simulation
  const handleResetSimulation = () => {
    setTempReduced(false)
    setHumidityReduced(false)
  }

  // Calculate dynamic VOC points based on user's IoT actions
  const vocPoints = useMemo(() => {
    return INITIAL_VOC_DAYS.map(d => {
      if (!d.isForecast) return d
      let val = d.value
      if (tempReduced) {
        val -= 12 // Reduce VOC due to lower temperature
      }
      if (humidityReduced) {
        val -= 15 // Reduce VOC further due to lower humidity
      }
      return { ...d, value: Math.max(40, val) }
    })
  }, [tempReduced, humidityReduced])

  // Check if any forecast days exceed the threshold
  const exceededDays = useMemo(() => {
    return vocPoints.filter(p => p.value > warningThreshold)
  }, [vocPoints, warningThreshold])

  const hasWarning = exceededDays.length > 0

  // Chart plotting constants
  const width = 720
  const height = 360
  const padding = { top: 38, right: 30, bottom: 52, left: 54 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  const xFor = (index: number) => padding.left + (plotWidth * index) / (vocPoints.length - 1)
  const yFor = (value: number) => {
    const min = 0
    const max = 200
    return padding.top + plotHeight - ((value - min) / (max - min)) * plotHeight
  }

  // Path data generators for SVG polyline/path
  const actualPoints = vocPoints.filter(p => !p.isForecast)
  const forecastPoints = vocPoints.filter(p => p.day >= 7) // Overlaps day 7 to draw continuous line

  const actualPath = actualPoints.map((p, i) => `${xFor(i)},${yFor(p.value)}`).join(' ')
  const forecastPath = forecastPoints.map((p, i) => `${xFor(i + actualPoints.length - 1)},${yFor(p.value)}`).join(' ')

  return (
    <ProducerScreenShell product={product} eyebrow="Dự Báo & Gợi Ý AI" title="Smart AI" hideSummary>
      {/* Return button header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-full border border-[#EFE4DC] bg-white px-3.5 py-1.5 text-xs font-black text-[#721A18] shadow-sm active:scale-95 transition-all"
        >
          <ChevronLeft size={16} strokeWidth={2.4} />
          Quay lại
        </button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF2E8] border border-[#EAC496]/40 px-3 py-1 text-xs font-black text-[#A77D42]">
          <BrainCircuit size={13} className="text-[#A77D42]" />
          AI v2.4 Active
        </span>
      </div>

      {/* Main warning summary */}
      <div className={`mb-5 rounded-[24px] border p-5 shadow-[0_12px_28px_rgba(57,28,12,0.08)] transition-all ${
        hasWarning 
          ? 'border-[#EAA18F] bg-[#FFF8F6]' 
          : 'border-[#E0D7D0] bg-white'
      }`}>
        <div className="flex items-start gap-4">
          <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
            hasWarning ? 'bg-[#FCE8E3] text-[#B23B2F]' : 'bg-[#EDF9F0] text-[#4A9F57]'
          }`}>
            {hasWarning ? (
              <AlertTriangle size={24} strokeWidth={2.3} className="animate-bounce" />
            ) : (
              <CheckCircle size={24} strokeWidth={2.3} />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-[18px] font-black text-[#150807] leading-snug">
              {hasWarning 
                ? 'Dự báo chỉ số VOC Kho 1 vượt ngưỡng' 
                : 'Chỉ số VOC Kho 1 được tối ưu hóa'}
            </h2>
            <p className="mt-1.5 text-sm font-bold text-[#806A5B] leading-relaxed">
              {hasWarning 
                ? `Hệ thống AI phát hiện chỉ số VOC dự kiến tăng cao, đạt đỉnh ${Math.max(...exceededDays.map(d=>d.value))} ppm tại ngày thứ ${exceededDays[0].day > 9 ? exceededDays[0].day : `0${exceededDays[0].day}`}. Cần can thiệp môi trường kho.` 
                : 'Môi trường kho bảo quản lá bánh gai đang đạt các chỉ số vi sinh tối ưu. Không có nguy cơ tăng VOC bất thường trong vòng 12 ngày tới.'}
            </p>
          </div>
        </div>

        {/* AI Smart Actions container */}
        {hasWarning && (
          <div className="mt-5 border-t border-[#EFE4DC]/60 pt-4">
            <div className="flex items-center gap-1.5 text-[11px] font-black tracking-wider text-[#A77D42] uppercase">
              <Sparkles size={13} />
              Gợi ý thông minh từ AI:
            </div>
            <p className="mt-2 text-xs font-bold text-[#6D5C54]">
              Giảm nhiệt độ bảo quản kho về 18°C và giảm độ ẩm kho xuống dưới 45% để kiểm soát vi sinh vật kỵ khí phân hủy chất hữu cơ trên lá gai.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                disabled={tempReduced || tempLoading}
                onClick={handleLowerTemp}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-black transition active:scale-98 ${
                  tempReduced 
                    ? 'bg-[#EDF9F0] text-[#4A9F57] border border-[#4A9F57]/30' 
                    : 'bg-[#721A18] text-white hover:bg-[#852220] shadow-[0_4px_12px_rgba(114,26,24,0.18)]'
                }`}
              >
                {tempLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Đang gửi lệnh hạ nhiệt độ...
                  </>
                ) : tempReduced ? (
                  <>
                    <CheckCircle size={15} />
                    Đã hạ nhiệt độ kho xuống 18°C
                  </>
                ) : (
                  <>
                    <Thermometer size={15} />
                    Tự động hạ nhiệt độ bảo quản (18°C)
                  </>
                )}
              </button>

              <button
                disabled={humidityReduced || humidityLoading}
                onClick={handleLowerHumidity}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-black transition active:scale-98 ${
                  humidityReduced 
                    ? 'bg-[#EDF9F0] text-[#4A9F57] border border-[#4A9F57]/30' 
                    : 'bg-[#721A18] text-white hover:bg-[#852220] shadow-[0_4px_12px_rgba(114,26,24,0.18)]'
                }`}
              >
                {humidityLoading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Đang gửi lệnh giảm độ ẩm...
                  </>
                ) : humidityReduced ? (
                  <>
                    <CheckCircle size={15} />
                    Đã giảm độ ẩm kho xuống 45%
                  </>
                ) : (
                  <>
                    <Droplets size={15} />
                    Tự động giảm độ ẩm bảo quản (45%)
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Reset button when simulated actions have run */}
        {(tempReduced || humidityReduced) && (
          <div className="mt-4 flex items-center justify-between text-xs border-t border-[#EFE4DC]/60 pt-3">
            <span className="font-bold text-[#4A9F57]">Simulated IoT actions active</span>
            <button
              onClick={handleResetSimulation}
              className="font-black text-[#721A18] underline active:scale-95 transition-all"
            >
              Reset môi trường kho
            </button>
          </div>
        )}
      </div>

      {/* Interactive VOC Forecast Chart Card */}
      <section className="mb-5 rounded-[24px] border border-[#EFE4DC] bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.08)]">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-[#150807]">Biểu đồ VOC của Kho 1</h3>
            <p className="text-xs font-bold text-[#806A5B]">Theo dõi thực tế & dự đoán 12 ngày</p>
          </div>
          <span className="rounded-full bg-[#FFF6E7] border border-[#F1C932]/30 px-3 py-1 text-xs font-black text-[#C78116]">
            Kho Lá Gai
          </span>
        </div>

        {/* Dynamic Warning Threshold Config Slider */}
        <div className="mb-5 rounded-2xl bg-[#FAF2E8] p-3.5 border border-[#EFE4DC]/60">
          <div className="flex items-center justify-between">
            <label htmlFor="voc-threshold-slider" className="flex items-center gap-1.5 text-xs font-black text-[#6F4B35]">
              <Settings2 size={14} className="text-[#A77D42]" />
              Ngưỡng cảnh báo VOC
            </label>
            <strong className="text-sm font-black text-[#721A18]">{warningThreshold} ppm</strong>
          </div>
          <input
            id="voc-threshold-slider"
            type="range"
            min="80"
            max="180"
            value={warningThreshold}
            onChange={(e) => setWarningThreshold(Number(e.target.value))}
            className="mt-3 w-full h-1.5 bg-[#E8D9CE] rounded-lg appearance-none cursor-pointer accent-[#721A18]"
          />
          <div className="mt-2 flex justify-between text-[10px] font-bold text-[#A78A7A]">
            <span>80 ppm</span>
            <span>120 ppm (Mặc định)</span>
            <span>180 ppm</span>
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="relative">
          <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
            {/* Grid Y-Ticks & dashed lines */}
            {[0, 50, 100, 150, 200].map((tick) => {
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

            {/* X-Ticks */}
            {vocPoints.map((point, index) => {
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

            {/* Warning threshold limit line */}
            <g>
              <line 
                x1={padding.left} 
                x2={width - padding.right} 
                y1={yFor(warningThreshold)} 
                y2={yFor(warningThreshold)} 
                stroke="#B23B2F" 
                strokeWidth="4" 
                strokeDasharray="10 10" 
              />
              <text 
                x={width - padding.right - 8} 
                y={yFor(warningThreshold) - 10} 
                textAnchor="end" 
                className="fill-[#B23B2F] text-[15px] font-black"
              >
                Ngưỡng {warningThreshold} ppm
              </text>
            </g>

            {/* Actual line (Solid) */}
            <polyline fill="none" points={actualPath} stroke="#214D35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" />

            {/* Forecast line (Dashed) */}
            <path 
              d={`M ${forecastPath}`} 
              fill="none" 
              stroke="#C78116" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="6" 
              strokeDasharray="12 8" 
            />

            {/* Data point circle markers */}
            {vocPoints.map((point, index) => {
              const cx = xFor(index)
              const cy = yFor(point.value)
              const isWarningPoint = point.value > warningThreshold

              return (
                <g key={`marker-${point.day}`}>
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r="8" 
                    fill={point.isForecast ? '#C78116' : '#214D35'} 
                    stroke={isWarningPoint ? '#B23B2F' : '#FFFFFF'}
                    strokeWidth={isWarningPoint ? '4' : '2'}
                  />
                  {/* Floating tooltip values on key days */}
                  {(point.day === 7 || point.day === 9 || point.day === 10) && (
                    <g>
                      <rect 
                        x={cx - 22} 
                        y={cy - 34} 
                        width="44" 
                        height="22" 
                        rx="6" 
                        fill={isWarningPoint ? '#B23B2F' : '#4F423B'} 
                      />
                      <text 
                        x={cx} 
                        y={cy - 19} 
                        textAnchor="middle" 
                        className="fill-white text-[12px] font-extrabold"
                      >
                        {point.value}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center gap-5 text-center text-xs font-black text-[#6F4B35]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-6 rounded-full bg-[#214D35]" />
            Thực tế (N1-7)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-6 rounded-full border border-dashed border-[#C78116] bg-[#C78116]/30" />
            Dự báo AI (N8-12)
          </span>
          <span className="inline-flex items-center gap-1.5 text-[#B23B2F]">
            <span className="h-1 w-6 bg-transparent border-t-2 border-dashed border-[#B23B2F]" />
            Đường Cảnh báo
          </span>
        </div>
      </section>

      {/* VOC Batch Predictions list */}
      <section className="mb-5">
        <h3 className="mb-3 text-base font-black text-[#150807] flex items-center gap-2">
          <TrendingUp size={18} className="text-[#721A18]" />
          Dự báo mẻ chỉ số VOC
        </h3>

        <div className="grid gap-3">
          {/* Batch 1 */}
          <article className="rounded-2xl border border-[#EFE4DC] bg-white p-4 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#A77D42]">Mẻ Lá Gai Mới Nhất</span>
                <h4 className="text-base font-black text-[#150807] mt-0.5">Mẻ BG-2026-06</h4>
                <p className="text-xs font-bold text-[#806A5B] mt-1">Quá trình lên men lá gai để làm bánh nhãn hiệu Bánh Gai.</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
                hasWarning ? 'bg-[#FCE8E3] text-[#B23B2F]' : 'bg-[#EDF9F0] text-[#4A9F57]'
              }`}>
                {hasWarning ? 'Đang giám sát' : 'Quy trình đạt chuẩn'}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#FAF2E8] pt-3 text-xs">
              <div>
                <p className="font-bold text-[#806A5B]">Dự báo VOC cực đại</p>
                <strong className={`mt-0.5 block text-sm font-black ${hasWarning ? 'text-[#B23B2F]' : 'text-[#214D35]'}`}>
                  {Math.max(...vocPoints.map(d=>d.value))} ppm
                </strong>
              </div>
              <div>
                <p className="font-bold text-[#806A5B]">Độ tin cậy dự báo</p>
                <strong className="mt-0.5 block text-sm font-black text-[#150807]">94.2%</strong>
              </div>
            </div>
          </article>

          {/* Batch 2 */}
          <article className="rounded-2xl border border-[#EFE4DC] bg-white p-4 opacity-75 shadow-[0_12px_28px_rgba(57,28,12,0.06)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-[#8A7464]">Mẻ Khô Đã Đóng Gói</span>
                <h4 className="text-base font-black text-[#150807] mt-0.5">Mẻ BG-2026-05</h4>
                <p className="text-xs font-bold text-[#806A5B] mt-1">Đã kiểm nghiệm đóng gói thành phẩm an toàn sinh học.</p>
              </div>
              <span className="rounded-full bg-[#EDF9F0] px-2.5 py-1 text-[10px] font-black text-[#4A9F57]">
                Đạt tiêu chuẩn
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[#FAF2E8] pt-3 text-xs">
              <div>
                <p className="font-bold text-[#806A5B]">VOC cực đại lịch sử</p>
                <strong className="mt-0.5 block text-sm font-black text-[#214D35]">92 ppm</strong>
              </div>
              <div>
                <p className="font-bold text-[#806A5B]">Đánh giá chất lượng</p>
                <strong className="mt-0.5 block text-sm font-black text-[#150807]">98/100 (Hạng A)</strong>
              </div>
            </div>
          </article>
        </div>
      </section>
    </ProducerScreenShell>
  )
}
