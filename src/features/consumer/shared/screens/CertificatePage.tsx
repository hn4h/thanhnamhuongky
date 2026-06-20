import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Award, ArrowRight, ShieldCheck, Share2, Sparkles, Check } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function CertificatePage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)
  const [copied, setCopied] = useState(false)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { product } = productData

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <ConsumerShell activeTab="certificate">
      <section className="space-y-6">
        
        {/* Certificate Card Immersive Design */}
        <div className="relative overflow-hidden rounded-2xl border-[3px] border-double border-gold-400 bg-[#FCF6EC] p-6 shadow-lacquer/10 animate-fadeIn">
          
          {/* Subtle Guilloche/Ornate Watermark Background */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none" 
               style={{ 
                 backgroundImage: "url('/images/texture-pattern.png')", 
                 backgroundSize: '150px' 
               }} 
          />
          
          {/* Traditional Ornate Header */}
          <div className="text-center relative">
            <Sparkles size={18} className="mx-auto text-gold mb-1" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A6238]">
              Thành Nam Hương Ký
            </p>
            <h3 className="mt-2 text-xl font-bold font-serif uppercase tracking-tight text-lacquer-950">
              Chứng Thư Số Khai Sinh
            </h3>
            <span className="mt-1 block text-[9px] font-mono font-medium text-lacquer-400">
              Số kiểm định: {product.certificate}
            </span>
            <div className="mx-auto mt-3 h-[2px] w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          </div>

          {/* Certificate Main Content */}
          <div className="mt-8 space-y-4 text-xs leading-relaxed text-[#4A2D1E]">
            <p className="indent-4">
              Hệ thống quản lý chất lượng phi tập trung của **Thành Nam Hương Ký** chứng nhận sản phẩm đặc sản truyền thống:
            </p>
            
            <div className="my-4 rounded-xl border border-gold-200/50 bg-[#F5EBDA]/50 p-4 space-y-2">
              <div className="flex justify-between border-b border-gold-200/30 pb-1.5">
                <span className="text-lacquer-400 font-semibold uppercase text-[9px]">Sản phẩm:</span>
                <strong className="text-right text-[13px] font-serif font-bold text-lacquer-950">{product.name}</strong>
              </div>
              <div className="flex justify-between border-b border-gold-200/30 pb-1.5">
                <span className="text-lacquer-400 font-semibold uppercase text-[9px]">Phân cấp:</span>
                <strong className="text-right font-semibold">{product.grade}</strong>
              </div>
              <div className="flex justify-between border-b border-gold-200/30 pb-1.5">
                <span className="text-lacquer-400 font-semibold uppercase text-[9px]">Lô mã số:</span>
                <strong className="text-right font-mono font-semibold">{product.batch}</strong>
              </div>
              <div className="flex justify-between border-b border-gold-200/30 pb-1.5">
                <span className="text-lacquer-400 font-semibold uppercase text-[9px]">Ngày gán nhãn:</span>
                <strong className="text-right font-semibold">{product.producedAt}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-lacquer-400 font-semibold uppercase text-[9px]">Địa hạt gốc:</span>
                <strong className="text-right font-semibold">{product.origin}</strong>
              </div>
            </div>

            <p className="indent-4">
              Sản phẩm đã trải qua toàn bộ quy trình kiểm định chất lượng nghiêm ngặt, đáp ứng các chỉ số ẩm, nhiệt và hương vị theo quy chuẩn gia truyền trước khi gán tem QR mã hóa truy xuất độc bản.
            </p>
          </div>

          {/* Verification Stamps and Signatures (Luxury touch) */}
          <div className="mt-8 flex items-center justify-between border-t border-gold-200/30 pt-6">
            
            {/* Wax Seal Stamp Watermark look-alike */}
            <div className="relative flex h-16 w-16 items-center justify-center opacity-85">
              <div className="absolute h-14 w-14 rounded-full border border-dashed border-[#8b1c1c]/40 bg-[#8b1c1c]/5" />
              <ShieldCheck size={28} className="text-[#8b1c1c]/60" />
              <span className="absolute text-[6px] font-bold uppercase tracking-wider text-[#8b1c1c]/50 animate-[spin_20s_linear_infinite]">
                • Đã Kiểm Định •
              </span>
            </div>

            {/* Mock Signatures */}
            <div className="text-right">
              <span className="block text-[8px] font-bold uppercase text-lacquer-400">
                Thành Nam Hương Ký
              </span>
              <span className="block text-[9px] font-serif italic text-lacquer-900 mt-2 font-bold select-none opacity-80">
                Lê Thành Nam
              </span>
              <span className="mt-1 block text-[7px] font-semibold text-lacquer-400 uppercase tracking-widest">
                Đại diện nghệ nhân
              </span>
            </div>
          </div>
        </div>

        {/* Share and Timeline Navigation CTA */}
        <div className="grid gap-2">
          <button
            onClick={handleShare}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gold bg-parchment-50 py-4 font-bold text-gold-900 transition hover:bg-gold-50/50"
          >
            {copied ? (
              <>
                <Check size={16} className="text-emerald-600 animate-bounce" />
                <span className="text-emerald-700">Đã sao chép liên kết</span>
              </>
            ) : (
              <>
                <Share2 size={16} />
                <span>Chia sẻ chứng thư số</span>
              </>
            )}
          </button>

          <Link
            to={`/consumer/${productKey}/timeline`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Nhật ký hành trình sản xuất</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
