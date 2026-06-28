import { useState, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Factory, QrCode, Sparkles, ChevronDown, AlertCircle } from 'lucide-react'
import { producerProducts } from '../../producer/shared/productRegistry'

export function RoleSelectionPage() {
  const [selectedKey, setSelectedKey] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' })
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.show])

  const handleProducerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!selectedKey) {
      setToast({
        show: true,
        message: 'Vui lòng chọn sản phẩm trước khi tiếp tục.',
      })
      return
    }
    const product = producerProducts.find((p) => p.key === selectedKey)
    if (product) {
      navigate(product.routes.dashboard)
    }
  }

  const handleConsumerClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/consumer/scan')
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-[#1a0a00] text-[#FDF4E7] shadow-[0_0_80px_rgba(74,45,30,0.32)] relative">
      {/* Toast Warning */}
      <div
        className={`absolute top-6 left-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-red-500/30 bg-[#2d0f0f]/95 px-4 py-3.5 text-[#FCA5A5] shadow-2xl backdrop-blur-md transition-all duration-300 ${
          toast.show
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <AlertCircle size={18} className="shrink-0 text-red-400" />
        <span className="text-xs font-medium">{toast.message}</span>
      </div>

      <section
        className="relative isolate flex min-h-screen flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/start-background.png')" }}
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(74,45,30,0.48)_0%,rgba(74,45,30,0.76)_48%,rgba(26,10,0,0.94)_100%)]" />

        <div className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-9">
          <div className="flex flex-col items-center">
            <div className="mb-4 h-[88px] w-[88px] overflow-hidden rounded-[24px] border border-gold/30 shadow-[0_0_40px_rgba(192,150,90,0.34)]">
              <img src="/images/logo.jpg" alt="Thành Nam hương ký" className="h-full w-full object-cover" />
            </div>
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Thành Nam Hương Ký
            </p>
            <h1 className="text-center font-serif text-[32px] font-bold leading-[1.15] tracking-normal text-[#FDF4E7]">
              Thành Nam Hương Ký
            </h1>
          </div>

          <div className="my-5 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gold/40" />
            <Sparkles size={14} strokeWidth={1.75} className="text-gold" />
            <span className="h-px w-12 bg-gold/40" />
          </div>

          <p className="mb-10 text-center text-sm leading-7 text-[#FDF4E7]/75">
            Giám sát thông minh,
            <br />
            bảo toàn giá trị đặc sản truyền thống
          </p>

          <div className="mt-auto flex flex-col gap-4">
            <p className="mb-1 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold/75">
              Chọn vai trò của bạn
            </p>

            {/* Custom Product Selection Dropdown */}
            <div ref={dropdownRef} className="relative z-20">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-gold/30 bg-[#FDF4E7]/5 px-5 py-4 text-left transition-all hover:bg-[#FDF4E7]/10 active:scale-[0.99] focus:outline-none focus:border-gold/60"
              >
                <span className={`text-[15px] ${selectedKey ? 'text-[#FDF4E7] font-medium' : 'text-[#FDF4E7]/50'}`}>
                  {selectedKey
                    ? producerProducts.find((p) => p.key === selectedKey)?.name
                    : 'Chọn loại đặc sản'}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-gold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`absolute bottom-full mb-2 left-0 right-0 overflow-hidden rounded-2xl border border-gold/30 bg-[#1a0a00]/95 backdrop-blur-md shadow-[0_-12px_30px_rgba(0,0,0,0.5)] transition-all duration-200 origin-bottom ${
                  isOpen
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-1">
                  {producerProducts.map((product) => (
                    <button
                      key={product.key}
                      type="button"
                      onClick={() => {
                        setSelectedKey(product.key)
                        setIsOpen(false)
                      }}
                      className={`flex w-full items-center px-5 py-3.5 text-left text-sm transition-colors hover:bg-gold/15 ${
                        selectedKey === product.key
                          ? 'bg-gold/10 text-gold font-semibold'
                          : 'text-[#FDF4E7]/80'
                      }`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleProducerClick}
              className="flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-gold/30 bg-[linear-gradient(135deg,#4A2D1E_0%,#7A3A18_100%)] p-5 text-left shadow-[0_8px_30px_rgba(74,45,30,0.46)] transition active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Factory size={24} strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">Nhà sản xuất</span>
                <span className="mt-0.5 block text-xs text-[#FDF4E7]/65">Giám sát lô · Thiết bị · Cảnh báo AI</span>
              </span>
              <ArrowRight size={20} strokeWidth={1.75} className="text-[#FDF4E7]/60" />
            </button>

            <button
              onClick={handleConsumerClick}
              className="flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-gold/35 bg-[#FDF4E7]/10 p-5 text-left backdrop-blur-md transition active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <QrCode size={22} strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">Người tiêu dùng</span>
                <span className="mt-0.5 block text-xs text-[#FDF4E7]/60">Xác thực sản phẩm · Truy xuất nguồn gốc</span>
              </span>
              <ArrowRight size={20} strokeWidth={1.75} className="text-gold/65" />
            </button>
          </div>

          <p className="mt-8 text-center text-[11px] text-[#FDF4E7]/35">© 2026 Thành Nam Hương Ký</p>
        </div>
      </section>
    </main>
  )
}

