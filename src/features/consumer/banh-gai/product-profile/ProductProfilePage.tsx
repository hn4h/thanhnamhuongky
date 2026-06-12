import { Link } from 'react-router-dom'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function ProductProfilePage() {
  const product = banhGaiConsumerData.product

  return (
    <ConsumerShell title="Hồ sơ hộp bánh gai" subtitle="Thông tin sản phẩm, lô sản xuất và hạn dùng.">
      <section className="overflow-hidden rounded-xl border border-gold-200/70 bg-gradient-to-br from-white via-parchment-50/40 to-white p-6 shadow-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold-700">{product.grade}</p>
            <h2 className="mt-2 text-[26px] font-bold leading-tight tracking-tight text-lacquer-900">{product.name}</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {Object.entries({
            'Mã sản phẩm': product.code,
            'Lô sản xuất': product.batch,
            'Ngày sản xuất': product.producedAt,
            'Hạn dùng': product.expiresAt,
            'Nguồn gốc': product.origin,
            'Chứng nhận': product.certificate,
          }).map(([label, value]) => (
            <div key={label} className="rounded-lg border border-gold-100/60 bg-parchment-50/50 p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-lacquer-500">{label}</p>
              <strong className="mt-1 block text-[15px] text-lacquer-900">{value}</strong>
            </div>
          ))}
        </div>
        <Link to="/consumer/banh-gai/certificate" className="mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-lacquer-800 to-lacquer-900 px-6 py-3.5 font-semibold text-parchment-50 shadow-md transition-all hover:shadow-lg active:scale-[0.98]">
          Xem giấy khai sinh số
        </Link>
      </section>
    </ConsumerShell>
  )
}
