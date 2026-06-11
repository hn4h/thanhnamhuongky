import { Link } from 'react-router-dom'
import { QrCode } from 'lucide-react'
import { ConsumerShell } from '../components/ConsumerShell'

export function ScanPage() {
  return (
    <ConsumerShell title="Quét QR bánh gai" subtitle="Xác thực hộp bánh gai Thành Nam hương ký trước khi xem thông tin truy xuất.">
      <section className="rounded-lg bg-[#1f130f] p-6 text-center text-parchment shadow-sm">
        <div className="mx-auto flex h-52 max-w-sm items-center justify-center rounded-lg border-2 border-dashed border-gold/70 bg-white/5">
          <QrCode size={92} className="text-gold" />
        </div>
        <p className="mt-5 text-sm text-[#ead5a3]">Demo mock: nhấn nút bên dưới để giả lập quét đúng tem QR.</p>
        <Link to="/consumer/banh-gai/auth-result" className="mt-5 inline-flex rounded-md bg-gold px-5 py-3 font-semibold text-[#2b1710]">
          Quét hộp TNHK-BG-2026-0001
        </Link>
      </section>
    </ConsumerShell>
  )
}
