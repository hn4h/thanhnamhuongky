import { ArrowRight, Factory, QrCode, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { producerProducts } from '../../producer/shared/productRegistry'

const primaryProducer = producerProducts[0]

export function RoleSelectionPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#1a0a00] text-[#FDF4E7] shadow-[0_0_80px_rgba(74,45,30,0.32)]">
      <section
        className="relative isolate flex min-h-screen flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/start-background.png')" }}
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(74,45,30,0.48)_0%,rgba(74,45,30,0.76)_48%,rgba(26,10,0,0.94)_100%)]" />

        <div className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-9">
          <div className="flex flex-col items-center">
            <div className="mb-4 h-[88px] w-[88px] overflow-hidden rounded-[24px] border border-gold/30 shadow-[0_0_40px_rgba(192,150,90,0.34)]">
              <img src="/images/logo.jpg" alt="Thành Nam hương ký" className="h-full w-full object-cover" />
            </div>
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Thành Nam Hương Ký
            </p>
            <h1 className="text-center font-serif text-[32px] font-bold leading-[1.15] tracking-normal text-[#FDF4E7]">
              Thành Nam Hương Ký
            </h1>
          </div>

          <div className="my-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/40" />
            <Sparkles size={14} strokeWidth={1.75} className="text-gold" />
            <span className="h-px w-12 bg-gold/40" />
          </div>

          <p className="mb-10 text-center text-sm leading-7 text-[#FDF4E7]/75">
            Giám sát thông minh,
            <br />
            bảo toàn giá trị đặc sản truyền thống
          </p>

          <div className="mt-auto flex flex-col gap-4">
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold/75">
              Chọn vai trò của bạn
            </p>

            <Link
              to={primaryProducer.routes.dashboard}
              className="flex items-center gap-4 overflow-hidden rounded-2xl border border-gold/30 bg-[linear-gradient(135deg,#4A2D1E_0%,#7A3A18_100%)] p-5 text-left shadow-[0_8px_30px_rgba(74,45,30,0.46)] transition active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Factory size={24} strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">Nhà sản xuất</span>
                <span className="mt-0.5 block text-xs text-[#FDF4E7]/65">Giám sát lô · Thiết bị · Cảnh báo AI</span>
              </span>
              <ArrowRight size={20} strokeWidth={1.75} className="text-[#FDF4E7]/60" />
            </Link>

            <Link
              to="/consumer/banh-gai/scan"
              className="flex items-center gap-4 overflow-hidden rounded-2xl border border-gold/35 bg-[#FDF4E7]/10 p-5 text-left backdrop-blur-md transition active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <QrCode size={22} strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">Người tiêu dùng</span>
                <span className="mt-0.5 block text-xs text-[#FDF4E7]/60">Xác thực sản phẩm · Truy xuất nguồn gốc</span>
              </span>
              <ArrowRight size={20} strokeWidth={1.75} className="text-gold/65" />
            </Link>
          </div>

          <p className="mt-8 text-center text-[11px] text-[#FDF4E7]/35">© 2026 Thành Nam Hương Ký</p>
        </div>
      </section>
    </main>
  )
}
