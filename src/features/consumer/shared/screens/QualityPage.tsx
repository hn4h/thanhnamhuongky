import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Award } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function QualityPage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { quality, grade } = productData

  return (
    <ConsumerShell activeTab="quality">
      <section className="space-y-6">
        
        {/* Grade Banner Badge (Wow factor) */}
        <div className="relative overflow-hidden rounded-2xl border border-gold bg-gradient-to-br from-gold-50 via-parchment-100 to-gold-100/50 p-5 text-center shadow-sm animate-fadeIn">
          {/* Sparkles decoration */}
          <div className="absolute left-4 top-4 text-gold-400">
            <Sparkles size={16} />
          </div>
          <div className="absolute right-4 bottom-4 text-gold-400">
            <Sparkles size={16} />
          </div>

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-[#4A2D1E] shadow-md border-2 border-white">
            <Award size={26} strokeWidth={2.25} />
          </div>
          <h3 className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-800">
            Phân loại chất lượng lô
          </h3>
          <p className="mt-1 text-xl font-serif font-bold text-lacquer-950">
            {grade}
          </p>
          <span className="mt-2 inline-block rounded-full bg-[#214D35] px-3.5 py-1 text-[9px] font-bold text-white uppercase tracking-wider">
            Lô Đạt Chuẩn Xuất Xưởng
          </span>
        </div>

        {/* Dynamic SVG Circle Gauges Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {quality.map((item, idx) => {
            const percentage = (item.value / item.max) * 100
            
            // Circular SVG math: Radius = 32, Circumference = 2 * PI * 32 = 201.06
            const radius = 32
            const circumference = 2 * Math.PI * radius
            const offset = circumference - (item.value / item.max) * circumference

            return (
              <div
                key={item.label}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="rounded-2xl border border-gold-100/70 bg-white p-5 text-center shadow-sm hover:shadow-md transition opacity-0 animate-fadeIn"
              >
                <span className="block text-[10px] font-bold text-lacquer-400 uppercase tracking-wider mb-3">
                  {item.label}
                </span>

                {/* Circular Gauge */}
                <div className="relative mx-auto h-20 w-20 flex items-center justify-center">
                  <svg className="h-full w-full -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="stroke-gold-100 fill-none"
                      strokeWidth="6"
                    />
                    {/* Foreground Animated Progress Circle */}
                    <circle
                      cx="40"
                      cy="40"
                      r={radius}
                      className="stroke-gold-500 fill-none transition-all duration-1000 ease-out"
                      strokeWidth="6"
                      strokeDasharray={circumference}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Inner text */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <strong className="text-base font-bold text-lacquer-950 leading-none">
                      {item.value}
                    </strong>
                    {item.unit && (
                      <span className="text-[9px] font-semibold text-lacquer-400 mt-0.5">
                        {item.unit}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 rounded-lg py-1">
                  Đạt chỉ số tối ưu
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA to pairing page */}
        <div className="pt-2">
          <Link
            to={`/consumer/${productKey}/pairing`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Gợi ý thưởng thức & Pairing</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
