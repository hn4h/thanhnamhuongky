import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function AuthResultPage() {
  return (
    <ConsumerShell title="Đã xác thực chính hãng" subtitle="Tem QR thuộc hệ thống Thành Nam hương ký.">
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
        <CheckCircle2 size={46} />
        <h2 className="mt-3 text-2xl font-bold">{banhGaiConsumerData.product.name}</h2>
        <p className="mt-1 text-sm">Serial {banhGaiConsumerData.product.code}</p>
        <div className="mt-5 grid gap-2">
          {banhGaiConsumerData.checks.map((check) => (
            <div key={check} className="rounded-md bg-white/70 px-3 py-2 text-sm font-medium">{check}</div>
          ))}
        </div>
        <Link to="/consumer/banh-gai/product" className="mt-5 inline-flex rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white">
          Xem hồ sơ hộp bánh
        </Link>
      </section>
    </ConsumerShell>
  )
}
