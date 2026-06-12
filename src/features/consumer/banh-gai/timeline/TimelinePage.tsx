import { Link } from 'react-router-dom'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function TimelinePage() {
  return (
    <ConsumerShell title="Timeline sản xuất" subtitle="Các mốc chính từ nguyên liệu đến đóng hộp QR.">
      <div className="space-y-3">
        {banhGaiConsumerData.timeline.map((item) => (
          <article key={item.title} className="rounded-lg border border-[#E0C69B] bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold text-[#8A6238]">{item.date}</p>
            <h2 className="mt-1 font-bold">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#6F4B35]">{item.detail}</p>
          </article>
        ))}
      </div>
      <Link to="/consumer/banh-gai/quality" className="mt-5 inline-flex rounded-md bg-lacquer px-5 py-3 font-semibold text-white">
        Xem chỉ số chất lượng
      </Link>
    </ConsumerShell>
  )
}
