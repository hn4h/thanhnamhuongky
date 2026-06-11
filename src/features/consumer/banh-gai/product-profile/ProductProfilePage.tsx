import { Link } from 'react-router-dom'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function ProductProfilePage() {
  const product = banhGaiConsumerData.product

  return (
    <ConsumerShell title="Hồ sơ hộp bánh gai" subtitle="Thông tin sản phẩm, lô sản xuất và hạn dùng.">
      <section className="rounded-lg border border-[#ead7a4] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6417]">{product.grade}</p>
        <h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Object.entries({
            'Mã sản phẩm': product.code,
            'Lô sản xuất': product.batch,
            'Ngày sản xuất': product.producedAt,
            'Hạn dùng': product.expiresAt,
            'Nguồn gốc': product.origin,
            'Chứng nhận': product.certificate,
          }).map(([label, value]) => (
            <div key={label} className="rounded-md bg-[#fff7e6] p-3">
              <p className="text-xs text-[#8a7a65]">{label}</p>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <Link to="/consumer/banh-gai/certificate" className="mt-5 inline-flex rounded-md bg-lacquer px-5 py-3 font-semibold text-white">
          Xem giấy khai sinh số
        </Link>
      </section>
    </ConsumerShell>
  )
}
