import { Link } from 'react-router-dom'
import { QrCode, Factory, Sparkles } from 'lucide-react'
import { AppFrame } from '../../../shared/components/layout/AppFrame'
import { producerProducts } from '../../producer/shared/productRegistry'

export function RoleSelectionPage() {
  return (
    <AppFrame title="Thành Nam hương ký" subtitle="Prototype truy xuất nguồn gốc và quản lý sản xuất đặc sản Nam Định.">
      <div className="grid gap-4 md:grid-cols-[1.1fr_1.4fr]">
        <Link
          to="/consumer/banh-gai/scan"
          className="rounded-lg border border-[#d8bd78] bg-[#2b1710] p-5 text-parchment shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-gold/15 text-gold">
            <QrCode size={24} />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">Người tiêu dùng</p>
          <h2 className="mt-2 text-xl font-bold">Quét QR bánh gai</h2>
          <p className="mt-2 text-sm leading-6 text-[#ead5a3]">Xác thực chính hãng, xem hồ sơ hộp bánh, certificate, timeline và câu chuyện di sản.</p>
        </Link>

        <section className="rounded-lg border border-[#dfc98b] bg-white/70 p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gold/20 text-[#8a6417]">
              <Factory size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6417]">Producer</p>
              <h2 className="text-lg font-bold">Chọn module sản xuất</h2>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {producerProducts.map((product) => (
              <Link
                key={product.key}
                to={product.routes.dashboard}
                className="rounded-lg border border-[#ead7a4] bg-[#fffaf0] p-4 transition hover:border-gold hover:bg-white"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md" style={{ background: product.theme.soft, color: product.theme.primary }}>
                  <Sparkles size={18} />
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm text-[#7a5a3a]">8 màn producer với mock data riêng biệt.</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppFrame>
  )
}
