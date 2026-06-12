import { Link } from 'react-router-dom'
import { ConsumerShell } from '../components/ConsumerShell'

export function UsageGuidePage() {
  return (
    <ConsumerShell title="Hướng dẫn dùng và biếu tặng" subtitle="Gợi ý bảo quản, thưởng thức và sử dụng bánh gai làm quà.">
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['Thưởng thức', 'Dùng cùng trà nóng để cân bằng vị ngọt và hương lá gai.'],
          ['Bảo quản', 'Để nơi khô mát, tránh nắng trực tiếp sau khi mở hộp.'],
          ['Quà biếu', 'Phù hợp biếu gia đình, đối tác và khách phương xa.'],
        ].map(([title, text]) => (
          <article key={title} className="rounded-lg border border-[#E0C69B] bg-white p-5 shadow-sm">
            <h2 className="font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#6F4B35]">{text}</p>
          </article>
        ))}
      </div>
      <Link to="/" className="mt-5 inline-flex rounded-md bg-gold px-5 py-3 font-semibold text-[#4A2D1E]">
        Hoàn tất
      </Link>
    </ConsumerShell>
  )
}
