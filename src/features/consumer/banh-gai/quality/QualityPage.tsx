import { Link } from 'react-router-dom'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function QualityPage() {
  return (
    <ConsumerShell title="Chỉ số chất lượng" subtitle="Mock data AI và kiểm soát lô bánh gai.">
      <div className="grid gap-3 sm:grid-cols-2">
        {banhGaiConsumerData.quality.map((item) => (
          <div key={item.label} className="rounded-lg border border-[#ead7a4] bg-white p-5 shadow-sm">
            <p className="text-sm text-[#7a5a3a]">{item.label}</p>
            <strong className="mt-2 block text-2xl">{item.value}</strong>
          </div>
        ))}
      </div>
      <Link to="/consumer/banh-gai/heritage" className="mt-5 inline-flex rounded-md bg-lacquer px-5 py-3 font-semibold text-white">
        Xem câu chuyện Thành Nam
      </Link>
    </ConsumerShell>
  )
}
