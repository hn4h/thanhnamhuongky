import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ScrollText, ShieldAlert, Award, FileSpreadsheet } from 'lucide-react'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerTermsProps = {
  product: ProducerProductModule
}

export function ProducerTerms({ product }: ProducerTermsProps) {
  const navigate = useNavigate()
  const theme = product.theme

  const sections = [
    {
      icon: ScrollText,
      title: '1. Quy định chung',
      content: 'Bằng việc sử dụng hệ thống truy xuất nguồn gốc Thành Nam Hương Ký, Nhà sản xuất cam kết tuân thủ toàn bộ các quy định kỹ thuật, quy trình khai báo thông tin và tiêu chuẩn chất lượng được thiết lập bởi ban quản lý thương hiệu.'
    },
    {
      icon: FileSpreadsheet,
      title: '2. Trách nhiệm nhập liệu',
      content: 'Nhà sản xuất phải chịu trách nhiệm hoàn toàn về tính chính xác, trung thực của dữ liệu mẻ bánh (thời gian bắt đầu, số lượng, nguyên liệu đầu vào). Nghiêm cấm mọi hành vi can thiệp hoặc khai báo sai lệch thông tin ảnh hưởng đến lòng tin của người tiêu dùng.'
    },
    {
      icon: ShieldAlert,
      title: '3. Giám sát thiết bị IoT',
      content: 'Cơ sở sản xuất có trách nhiệm duy trì hoạt động ổn định của các cảm biến IoT (nhiệt độ, độ ẩm buồng hấp, kho lạnh). Khi có cảnh báo vượt ngưỡng hoặc lỗi thiết bị, kỹ thuật viên phải chủ động xử lý hoặc liên hệ bộ phận hỗ trợ kỹ thuật trong vòng 15 phút.'
    },
    {
      icon: Award,
      title: '4. Sở hữu trí tuệ',
      content: 'Thương hiệu, công thức bánh truyền thống và các nhãn quét QR thuộc quyền sở hữu trí tuệ của Thành Nam Hương Ký. Mọi hành vi sao chép, sử dụng nhãn QR ngoài mục đích truy xuất nguồn gốc chính thống đều được coi là vi phạm điều khoản.'
    }
  ]

  return (
    <ProducerScreenShell product={product} eyebrow="Hệ thống" title="Điều Khoản Sử Dụng" hideSummary={true}>
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
            Chào mừng bạn đến với trang quản trị dành cho Nhà sản xuất của <strong>Thành Nam Hương Ký</strong>. Vui lòng đọc kỹ các điều khoản dưới đây trước khi vận hành hệ thống truy xuất nguồn gốc.
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
