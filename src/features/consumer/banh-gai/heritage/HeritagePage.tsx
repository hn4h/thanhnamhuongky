import { Link } from 'react-router-dom'
import { ConsumerShell } from '../components/ConsumerShell'

export function HeritagePage() {
  return (
    <ConsumerShell title="Di sản Thành Nam" subtitle="Câu chuyện thương hiệu và đặc sản Nam Định.">
      <section className="rounded-lg border border-[#E0C69B] bg-white p-5 shadow-sm">
        <p className="leading-7 text-[#4A2D1E]">Thành Nam hương ký định vị bánh gai như một món quà biếu trang trọng: giữ tinh thần thủ công, kết hợp truy xuất nguồn gốc để người mua hiểu rõ từng hộp bánh.</p>
      </section>
      <Link to="/consumer/banh-gai/usage-guide" className="mt-5 inline-flex rounded-md bg-lacquer px-5 py-3 font-semibold text-white">
        Xem hướng dẫn dùng và biếu tặng
      </Link>
    </ConsumerShell>
  )
}
