import { Link, useParams } from 'react-router-dom'
import { Check, ClipboardList, HelpCircle, CheckSquare } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function UsageGuidePage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { product } = productData

  const sections = [
    {
      title: 'Thưởng thức tốt nhất',
      tips: [
        `Nên dùng ${product.name} cùng trà ấm để cân bằng vị giác.`,
        productKey === 'banh-xiu-pao' ? 'Làm nóng lại bằng lò vi sóng hoặc nồi chiên không dầu 1-2 phút trước khi ăn để vỏ giòn nhân chảy.' : 'Không ăn kèm các thức uống có gas hoặc quá ngọt.',
        'Thưởng thức chậm rãi để cảm nhận trọn vẹn hương vị truyền thống.'
      ]
    },
    {
      title: 'Bảo quản đúng cách',
      tips: [
        productKey === 'doi' 
          ? 'Bảo quản bắt buộc trong tủ lạnh: tủ mát dùng trong 15 ngày, tủ đá dùng trong 3 tháng.' 
          : 'Để ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.',
        productKey === 'doi'
          ? 'Sau khi cắt bao bì, sử dụng hết trong vòng 24 giờ.'
          : 'Sau khi mở bao bì, nên bọc kín và dùng sớm để giữ nguyên độ ẩm/độ giòn vỏ bánh.',
        'Tuyệt đối không sử dụng nếu phát hiện bao bì rách, xì hơi hoặc ẩm mốc.'
      ]
    },
    {
      title: 'Làm quà biếu tặng',
      tips: [
        'Vỏ hộp thiết kế họa tiết cung đình sang trọng, thích hợp biếu tặng đối tác.',
        'Chứng thư số đính kèm giúp người nhận dễ dàng quét kiểm chứng xuất xứ.',
        'Đại diện cho văn hóa ẩm thực truyền thống Thành Nam hào sảng.'
      ]
    }
  ]

  return (
    <ConsumerShell activeTab="heritage">
      <section className="space-y-6 animate-fadeIn">
        
        <div className="flex items-center gap-2 mb-2 px-1">
          <HelpCircle size={18} className="text-gold" />
          <h3 className="font-bold text-sm text-lacquer-950">Hướng dẫn sử dụng & Bảo quản</h3>
        </div>

        <div className="space-y-5">
          {sections.map((sec, idx) => (
            <article key={sec.title} className="rounded-2xl border border-gold-100 bg-white p-5 shadow-sm">
              <h4 className="font-serif font-bold text-sm text-lacquer-950 border-b border-gold-100/50 pb-2 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gold" />
                {sec.title}
              </h4>
              <ul className="space-y-2.5">
                {sec.tips.map((tip, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5 text-xs text-lacquer-600 leading-relaxed">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700 mt-0.5">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Finish button redirects home */}
        <div className="pt-2">
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Hoàn tất Truy xuất</span>
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
