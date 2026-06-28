import { Link, useParams } from 'react-router-dom'
import { FileText, ArrowRight, ClipboardCheck, Landmark, ShieldAlert, Award } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function ProductProfilePage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)

  if (!productData) {
    return (
      <div className="p-6 text-center text-red-500">
        Không tìm thấy thông tin sản phẩm.
      </div>
    )
  }

  const { product } = productData

  const detailFields = [
    {
      label: 'Mã số định danh',
      value: product.code,
      icon: FileText,
      desc: 'Mã số kiểm định độc bản của sản phẩm'
    },
    {
      label: 'Lô sản xuất',
      value: product.batch,
      icon: ClipboardCheck,
      desc: 'Lô chế biến thuộc hồ sơ nhà xưởng'
    },
    {
      label: 'Nguồn gốc địa lý',
      value: product.origin,
      icon: Landmark,
      desc: 'Vùng chỉ dẫn địa lý hoặc cơ sở sản xuất'
    },
    {
      label: 'Ngày sản xuất',
      value: product.producedAt,
      icon: Award,
      desc: 'Ngày hoàn tất đóng gói gán nhãn'
    },
    {
      label: 'Hạn dùng tối ưu',
      value: product.expiresAt,
      icon: ShieldAlert,
      desc: 'Hạn dùng tốt nhất để bảo toàn hương vị'
    }
  ]

  return (
    <ConsumerShell activeTab="product">
      <section className="space-y-6">
        {/* Hero Card with lacquer frame */}
        <div className="relative overflow-hidden rounded-2xl border border-gold-200/60 bg-gradient-to-br from-white via-parchment-50/50 to-white p-6 shadow-parchment animate-fadeIn">
          {/* Watermark Logo Pattern */}
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-28 w-28 opacity-[0.04] select-none pointer-events-none" style={{ backgroundImage: "url('/images/texture-pattern.png')" }} />
          
          <div>
            <span className="inline-block rounded-md bg-gold-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-800">
              {product.grade}
            </span>
            <h3 className="mt-3 text-2xl font-bold font-serif leading-tight text-lacquer-950">
              {product.name}
            </h3>
            <p className="mt-1.5 text-xs text-lacquer-500">
              Chứng chỉ số: <strong className="font-mono text-lacquer-800">{product.certificate}</strong>
            </p>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="grid gap-3.5">
          {detailFields.map((field, idx) => {
            const Icon = field.icon
            return (
              <div
                key={field.label}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="flex gap-4 rounded-2xl border border-gold-100/60 bg-white p-5 shadow-sm transition hover:shadow-md opacity-0 animate-fadeIn"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700">
                  <Icon size={20} />
                </span>
                <div className="flex-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-lacquer-400">
                    {field.label}
                  </span>
                  <strong className="mt-0.5 block text-[15px] font-semibold text-lacquer-950">
                    {field.value}
                  </strong>
                  <span className="mt-1 block text-[10px] leading-relaxed text-lacquer-500">
                    {field.desc}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Action Button to Digital Birth Cert */}
        <div className="pt-2">
          <Link
            to={`/consumer/${productKey}/certificate`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Giấy khai sinh số</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
