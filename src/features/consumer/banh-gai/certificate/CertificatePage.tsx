import { Link } from 'react-router-dom'
import { banhGaiConsumerData } from '../data'
import { ConsumerShell } from '../components/ConsumerShell'

export function CertificatePage() {
  return (
    <ConsumerShell title="Giấy khai sinh số" subtitle="Certificate mock cho hộp bánh gai đã xác thực.">
      <section className="rounded-lg border border-gold bg-[#fffaf0] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6417]">Certificate</p>
        <h2 className="mt-2 text-2xl font-bold">{banhGaiConsumerData.product.certificate}</h2>
        <p className="mt-4 leading-7 text-[#6f4b2d]">Hộp bánh gai thuộc lô {banhGaiConsumerData.product.batch}, được xác nhận trong hệ thống truy xuất nguồn gốc nội bộ của Thành Nam hương ký.</p>
        <Link to="/consumer/banh-gai/timeline" className="mt-5 inline-flex rounded-md bg-lacquer px-5 py-3 font-semibold text-white">
          Xem timeline sản xuất
        </Link>
      </section>
    </ConsumerShell>
  )
}
