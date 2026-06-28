import { useSearchParams, Link, useParams } from 'react-router-dom'
import { CheckCircle2, ShieldCheck, ArrowRight, Award } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function AuthResultPage() {
  const { productKey } = useParams<{ productKey: string }>()
  const [searchParams] = useSearchParams()
  const productData = findConsumerProduct(productKey)
  const scanCode = searchParams.get('code') || productData?.product.code || 'UNKNOWN'

  if (!productData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-parchment text-lacquer">
        <ShieldCheck size={64} className="text-red-500 mb-4 animate-pulse" />
        <h1 className="text-xl font-bold">Không tìm thấy sản phẩm</h1>
        <p className="mt-2 text-sm text-lacquer-500">Mã sản phẩm hoặc đường dẫn không khả dụng.</p>
        <Link to="/" className="mt-6 rounded-xl bg-lacquer px-5 py-3 font-semibold text-white">
          Quay lại Trang chủ
        </Link>
      </div>
    )
  }

  const { product, checks } = productData

  return (
    <ConsumerShell activeTab="product">
      <div className="flex flex-col items-center text-center">
        
        {/* Dynamic Red Lacquer Wax Seal Stamp (Wow Factor) */}
        <div className="relative my-8 flex h-40 w-40 items-center justify-center">
          {/* Animated Glow Ring Behind Seal */}
          <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl animate-pulse" />
          
          {/* Main Wax Seal Stamp */}
          <div className="absolute z-10 h-32 w-32 rounded-full border-4 border-double border-gold bg-[#8b1c1c] text-parchment-100 shadow-[0_10px_25px_rgba(139,28,28,0.4)] flex flex-col items-center justify-center p-3 animate-stampPulse">
            <Award size={40} className="text-gold" />
            <span className="mt-1 font-serif text-[10px] uppercase font-bold tracking-[0.25em] text-gold-300">
              Chính Hãng
            </span>
            <span className="text-[7px] uppercase tracking-widest text-parchment-300/80">
              Thành Nam
            </span>
          </div>

          {/* Sparkles Floating around */}
          <div className="absolute left-4 top-4 z-20 h-2 w-2 rounded-full bg-gold animate-ping" />
          <div className="absolute right-6 bottom-4 z-20 h-2 w-2 rounded-full bg-gold-300 animate-ping delay-300" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-serif font-bold text-lacquer-950 px-2 leading-tight">
          Xác Thực Thành Công!
        </h2>
        <p className="mt-2 text-xs text-lacquer-500 uppercase tracking-widest font-semibold">
          {product.name}
        </p>
        <div className="mt-1 rounded bg-gold-100 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-gold-800 border border-gold-300/30">
          Serial: {scanCode}
        </div>

        {/* Checks Checklist (Staggered Reveal) */}
        <div className="mt-8 w-full space-y-2.5 text-left">
          {checks.map((check, index) => (
            <div
              key={check}
              style={{ animationDelay: `${index * 150}ms` }}
              className="flex items-center gap-3.5 rounded-xl border border-emerald-100/60 bg-emerald-50/50 p-4 text-emerald-950 shadow-sm opacity-0 animate-fadeIn"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                <CheckCircle2 size={13} strokeWidth={3} />
              </div>
              <span className="text-xs font-semibold leading-relaxed">{check}</span>
            </div>
          ))}
        </div>

        {/* Action Button to next stage */}
        <div className="mt-10 w-full">
          <Link
            to={`/consumer/${productKey}/product`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Xem hồ sơ chi tiết</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </ConsumerShell>
  )
}
