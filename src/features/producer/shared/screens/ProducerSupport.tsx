import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Phone, Mail, MapPin, ChevronDown, HelpCircle, MessageSquare } from 'lucide-react'
import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerSupportProps = {
  product: ProducerProductModule
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

export function ProducerSupport({ product }: ProducerSupportProps) {
  const navigate = useNavigate()
  const theme = product.theme
  const [activeFaqId, setActiveFaqId] = useState<number | null>(null)

  const toggleFaq = (id: number) => {
    setActiveFaqId(activeFaqId === id ? null : id)
  }

  const contacts = [
    {
      icon: Phone,
      label: 'Hotline Hỗ Trợ 24/7',
      value: '1900 8899 (Nhánh 2)',
      action: 'tel:19008899',
      actionText: 'Gọi ngay'
    },
    {
      icon: Mail,
      label: 'Email Kỹ Thuật',
      value: 'support@thanhnamhuongky.vn',
      action: 'mailto:support@thanhnamhuongky.vn',
      actionText: 'Gửi email'
    },
    {
      icon: MapPin,
      label: 'Văn Phòng Vận Hành',
      value: 'Số 12, Phố Lộc Vượng, TP. Nam Định',
      action: 'https://maps.google.com/?q=Loc+Vuong,+Nam+Dinh',
      actionText: 'Chỉ đường'
    }
  ]

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: 'Thiết bị cảm biến buồng hấp báo Offline xử lý như thế nào?',
      answer: 'Bước 1: Hãy kiểm tra nguồn điện cắm vào cảm biến. Bước 2: Đảm bảo bộ định tuyến WiFi tại nhà xưởng đang hoạt động tốt. Bước 3: Nếu cảm biến vẫn không kết nối, nhấn và giữ nút Reset trên thân cảm biến trong 5 giây cho đến khi đèn báo nhấp nháy xanh để thiết bị tự động kết nối lại mạng.'
    },
    {
      id: 2,
      question: 'Làm thế nào để xử lý khẩn cấp khi buồng hấp quá áp suất?',
      answer: 'Khi nhận được cảnh báo quá áp suất (>1.5 bar) tại Trung tâm Cảnh báo trên ứng dụng, bạn hãy bấm chọn nút "Xả hơi tự động" trên màn hình để điều khiển van điện tử xả áp. Trường hợp mất kết nối mạng, hãy tiến hành mở van xả tay thủ công ngay tại buồng hấp đó.'
    },
    {
      id: 3,
      question: 'Làm sao để tạo và in nhãn QR truy xuất nguồn gốc cho mẻ bánh mới?',
      answer: 'Truy cập tab "Mẻ bánh" từ thanh điều hướng dưới cùng, nhấn chọn mẻ bánh đã hoàn thành chế biến, sau đó bấm chọn "Quản lý QR". Chọn số lượng mã cần in và bấm "Tạo và gửi lệnh in". Máy in nhiệt tại cơ sở sẽ tự động in nhãn dán.'
    },
    {
      id: 4,
      question: 'Làm sao khi cảm biến đo độ ẩm kho bảo quản hiển thị sai số lớn?',
      answer: 'Cảm biến độ ẩm tại kho cần được vệ sinh bụi bẩn màng lọc định kỳ 3 tháng một lần. Nếu chỉ số hiển thị chênh lệch quá nhiều (>10%) so với ẩm kế ẩm độc lập, bạn hãy gửi yêu cầu hiệu chuẩn thiết bị thông qua Email kỹ thuật của chúng tôi.'
    }
  ]

  return (
    <ProducerScreenShell product={product} eyebrow="Liên hệ" title="Hỗ Trợ Kỹ Thuật" hideSummary={true}>
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

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 gap-3">
          {contacts.map((contact, idx) => {
            const Icon = contact.icon
            return (
              <div 
                key={idx}
                className="flex items-center gap-4 rounded-2xl bg-white p-4 border border-[#EFE4DC] shadow-[0_12px_28px_rgba(57,28,12,0.06)] transition-all duration-300 hover:scale-[1.01]"
              >
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#3A0611]/8 text-[#3A0611] shrink-0"
                  style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                >
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider leading-none">{contact.label}</p>
                  <p className="text-sm font-extrabold text-[#150807] mt-1.5 truncate">{contact.value}</p>
                </div>
                <a 
                  href={contact.action}
                  target={contact.action.startsWith('http') ? '_blank' : undefined}
                  rel={contact.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`
                  }}
                >
                  {contact.actionText}
                </a>
              </div>
            )
          })}
        </div>

        {/* FAQ Header */}
        <div className="mt-2 flex items-center gap-2 px-1">
          <HelpCircle size={16} className="text-[#806A5B]" />
          <h2 className="text-xs font-black uppercase tracking-wider text-[#806A5B]">Câu hỏi thường gặp (FAQs)</h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="rounded-2xl bg-white shadow-[0_12px_28px_rgba(57,28,12,0.08)] border border-[#EFE4DC] overflow-hidden divide-y divide-[#EFE4DC]">
          {faqs.map((faq) => {
            const isOpen = activeFaqId === faq.id
            return (
              <div key={faq.id} className="transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-start justify-between gap-4 px-4 py-4 text-left focus:outline-none hover:bg-[#FDF9F5]"
                >
                  <span className="text-xs font-extrabold text-[#150807] leading-relaxed pr-2">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className="text-[#806A5B] shrink-0 mt-0.5 transition-transform duration-300" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                
                {/* Collapsible content with smooth height styling */}
                <div 
                  className={`overflow-hidden transition-all duration-300 bg-[#FDFDFD] ${
                    isOpen ? 'max-h-40 border-t border-[#EFE4DC]/40' : 'max-h-0'
                  }`}
                >
                  <p className="p-4 text-xs leading-5 text-[#6B4C3B]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Live Chat Suggestion */}
        <div 
          className="rounded-2xl p-4 flex items-center gap-3 border transition-all duration-300 hover:scale-[1.01]"
          style={{
            backgroundColor: `${theme.primary}05`,
            borderColor: `${theme.primary}20`
          }}
        >
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: `${theme.primary}12`,
              color: theme.primary
            }}
          >
            <MessageSquare size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#150807]">Cần hỗ trợ trực tuyến khẩn cấp?</h4>
            <p className="text-[10px] text-[#6B4C3B] mt-0.5">Trò chuyện trực tiếp với kỹ sư hệ thống của chúng tôi.</p>
          </div>
          <button 
            type="button"
            onClick={() => window.open('https://zalo.me', '_blank')}
            className="px-3 py-1.5 rounded-full text-[10px] font-bold text-white transition-all active:scale-95"
            style={{ backgroundColor: theme.primary }}
          >
            Chat Zalo
          </button>
        </div>

        {/* Footer info */}
        <div className="text-center py-2">
          <p className="text-[10px] font-bold text-[#806A5B] uppercase tracking-wider">
            Hệ thống hỗ trợ tự động Thành Nam Hương Ký v2.4
          </p>
        </div>
      </div>
    </ProducerScreenShell>
  )
}
