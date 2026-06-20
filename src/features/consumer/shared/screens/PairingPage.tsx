import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Coffee, Compass, CheckCircle } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function PairingPage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { flavor, pairings } = productData

  // Radar/Flavor Wheel SVG Pentagram Coordinates calculations
  // Center is (100, 100), max radius is 75
  const cx = 100
  const cy = 100
  const maxRadius = 70

  // 5 dimensions angles starting from top (0 deg is pointing straight right, so we offset by -90 deg)
  const angles = [
    -Math.PI / 2,                  // Sweetness (Top)
    -Math.PI / 2 + (2 * Math.PI) / 5,  // Aroma (Right-Top)
    -Math.PI / 2 + (4 * Math.PI) / 5,  // Richness (Right-Bottom)
    -Math.PI / 2 + (6 * Math.PI) / 5,  // Savoriness (Left-Bottom)
    -Math.PI / 2 + (8 * Math.PI) / 5   // Bitterness (Left-Top)
  ]

  const dimensions = [
    { label: 'Ngọt thanh', value: flavor.sweet },
    { label: 'Hương thơm', value: flavor.aroma },
    { label: 'Đậm đà', value: flavor.richness },
    { label: 'Mặn vị', value: flavor.savory },
    { label: 'Đắng dịu', value: flavor.bitterness }
  ]

  // Calculate polygon points for values
  const points = dimensions.map((d, index) => {
    const valPercent = d.value / 100
    const r = valPercent * maxRadius
    const x = cx + r * Math.cos(angles[index])
    const y = cy + r * Math.sin(angles[index])
    return `${x},${y}`
  }).join(' ')

  // Helper to generate concentric pentagon grid paths
  const getGridPath = (levelPercent: number) => {
    const r = levelPercent * maxRadius
    return angles.map((angle, index) => {
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ') + ' Z'
  }

  return (
    <ConsumerShell activeTab="pairing">
      <section className="space-y-6">
        
        {/* Radar Chart Card */}
        <div className="rounded-2xl border border-gold-200 bg-white p-5 shadow-sm hover:shadow-md transition duration-300 animate-fadeIn">
          <div className="flex items-center gap-2 border-b border-gold-100/50 pb-3 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-50 text-gold-700">
              <Compass size={16} />
            </span>
            <h3 className="font-serif font-bold text-sm text-lacquer-950">
              Biểu đồ Ngũ Vị Hương vị
            </h3>
          </div>

          {/* SVG Flavor Wheel Layout */}
          <div className="relative flex justify-center py-2">
            <svg width="200" height="200" className="overflow-visible">
              {/* Concentric grid lines */}
              <path d={getGridPath(0.25)} className="stroke-gold-200/50 fill-none" strokeWidth="1" strokeDasharray="2" />
              <path d={getGridPath(0.5)} className="stroke-gold-200/60 fill-none" strokeWidth="1" strokeDasharray="2" />
              <path d={getGridPath(0.75)} className="stroke-gold-200/70 fill-none" strokeWidth="1" />
              <path d={getGridPath(1)} className="stroke-gold-300 fill-none" strokeWidth="1.5" />

              {/* Angle Axes lines */}
              {angles.map((angle, i) => {
                const x = cx + maxRadius * Math.cos(angle)
                const y = cy + maxRadius * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    className="stroke-gold-200/80"
                    strokeWidth="1"
                  />
                )
              })}

              {/* Data Polygon Shape */}
              <polygon
                points={points}
                className="fill-gold/30 stroke-gold-600"
                strokeWidth="2"
              />

              {/* Tiny circles on vertices */}
              {dimensions.map((d, index) => {
                const valPercent = d.value / 100
                const r = valPercent * maxRadius
                const x = cx + r * Math.cos(angles[index])
                const y = cy + r * Math.sin(angles[index])
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3.5"
                    className="fill-gold-700 stroke-white"
                    strokeWidth="1"
                  />
                )
              })}

              {/* Label strings around the pentagon */}
              {dimensions.map((d, index) => {
                // Offset label positions outside the outermost ring
                const labelRadius = maxRadius + 16
                const x = cx + labelRadius * Math.cos(angles[index])
                const y = cy + labelRadius * Math.sin(angles[index])
                
                // Adjust text alignment anchor based on position
                let textAnchor: 'inherit' | 'end' | 'start' | 'middle' | undefined = 'middle'
                if (Math.cos(angles[index]) > 0.3) textAnchor = 'start'
                if (Math.cos(angles[index]) < -0.3) textAnchor = 'end'
                
                return (
                  <text
                    key={index}
                    x={x}
                    y={y + 3} // vertical centering offset
                    textAnchor={textAnchor}
                    className="text-[10px] font-bold text-lacquer-800"
                  >
                    {d.label} ({d.value})
                  </text>
                )
              })}
            </svg>
          </div>

          <p className="text-[10px] leading-relaxed text-lacquer-400 text-center mt-4">
            Được đánh giá bằng mô hình AI phân tích hồ sơ sấy lọc nguyên liệu Thành Nam Hương Ký.
          </p>
        </div>

        {/* Dynamic Pairing Advice Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Coffee size={16} className="text-gold" />
            <h3 className="font-bold text-sm text-lacquer-950">Gợi ý kết hợp (Pairing)</h3>
          </div>

          <div className="grid gap-3">
            {pairings.map((pair, idx) => (
              <div
                key={pair.title}
                style={{ animationDelay: `${idx * 150}ms` }}
                className="flex gap-4 rounded-2xl border border-gold-100 bg-white p-4 shadow-sm hover:shadow-md transition opacity-0 animate-fadeIn"
              >
                {/* Simulated Drink/Pair Image icon badge */}
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <Coffee size={24} />
                </span>
                
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-lacquer-950 uppercase tracking-wide">
                    {pair.title}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-lacquer-500">
                    {pair.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle size={10} />
                    Gợi ý tối ưu
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Flow button */}
        <div className="pt-2">
          <Link
            to={`/consumer/${productKey}/usage-guide`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Xem hướng dẫn bảo quản</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </section>
    </ConsumerShell>
  )
}
