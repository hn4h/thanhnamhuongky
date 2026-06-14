import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ShieldCheck, Eye, Lock, RefreshCw } from 'lucide-react'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerPrivacyProps = {
  product: ProducerProductModule
}

export function ProducerPrivacy({ product }: ProducerPrivacyProps) {
  const navigate = useNavigate()
  const theme = product.theme

  const sections = [
    {
      icon: Eye,
      title: '1. Thông tin chúng tôi thu thập',
      content: 'Hệ thống thu thập dữ liệu hồ sơ cơ sở (Tên, địa chỉ, giấy phép kinh doanh), dữ liệu vận hành từ cảm biến IoT buồng hấp (nhiệt độ, áp suất, độ ẩm), lịch sử chế biến mẻ bánh và mã QR được kích hoạt.'
    },
    {
      icon: RefreshCw,
      title: '2. Mục đích sử dụng thông tin',
      content: 'Dữ liệu được sử dụng để minh bạch hóa quy trình chế biến sản phẩm phục vụ nhu cầu truy xuất nguồn gốc của người tiêu dùng, đồng thời tối ưu hóa cảnh báo sớm và phân tích hiệu suất lò hấp thông qua AI.'
    },
    {
      icon: Lock,
      title: '3. Bảo mật và Lưu trữ',
      content: 'Mọi dữ liệu truyền tải giữa thiết bị cảm biến và máy chủ đều được mã hóa SSL/TLS. Chúng tôi áp dụng quy trình kiểm soát quyền truy cập nghiêm ngặt và lưu trữ dữ liệu an toàn trên hạ tầng đám mây được bảo vệ.'
    },
    {
      icon: ShieldCheck,
      title: '4. Cam kết chia sẻ dữ liệu',
      content: 'Thành Nam Hương Ký cam kết bảo vệ thông tin sản xuất độc quyền của từng cơ sở, không mua bán, trao đổi hoặc chia sẻ thông tin này cho bên thứ ba ngoại trừ cơ quan quản lý an toàn thực phẩm theo quy định pháp luật.'
    }
  ]

  return (
    <ProducerScreenShell product={product} eyebrow="Hệ thống" title="Chính Sách Bảo Mật" hideSummary={true}>
      <div className="flex flex-col gap-4">
        {/* Back navigation sub-header */}
        <button
          type="button"
          onClick={() => navigate(`/producer/${product.key}/profile`)}
          className="self-start flex items-center gap-1 text-xs font-bold text-[#806A5B] hover:text-[#3A0611] transition-colors duration-200"
          style={{ color: theme.primary }}
        >
          <ChevronLeft size={16} />
          <span>Quay lại Hồ sơ</span>
        </button>

        {/* Introduction */}
        <div className="rounded-2xl bg-[#FDF9F5] p-5 border border-[#EFE4DC] shadow-[0_4px_12px_rgba(57,28,12,0.02)]">
          <p className="text-sm leading-6 text-[#6F4B35]">
            Chúng tôi coi trọng quyền riêng tư của cơ sở sản xuất. <strong>Chính sách Bảo mật</strong> này giải thích cách dữ liệu sản xuất của bạn được thu thập, xử lý và bảo vệ trong hệ thống Thành Nam Hương Ký.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white p-5 border border-[#EFE4DC] shadow-[0_12px_28px_rgba(57,28,12,0.06)] transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span 
                    className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A0611]/8 text-[#3A0611]"
                    style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                  >
                    <Icon size={16} />
                  </span>
                  <h3 className="text-sm font-extrabold text-[#150807]">{section.title}</h3>
                </div>
                <p className="text-xs leading-5 text-[#6B4C3B] pl-1">{section.content}</p>
              </div>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="text-center py-4">
          <p className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider">
            Cập nhật lần cuối: 12/06/2026
          </p>
        </div>
      </div>
    </ProducerScreenShell>
  )
}
