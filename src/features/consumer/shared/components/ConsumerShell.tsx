import { Link, useLocation, useParams } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { findConsumerProduct } from '../productRegistry'
import {
  FileText,
  Award,
  Calendar,
  BarChart3,
  Coffee,
  BookOpen,
  ArrowLeft,
  QrCode
} from 'lucide-react'

type ConsumerShellProps = {
  children: React.ReactNode
  activeTab?: string
}

export function ConsumerShell({ children, activeTab }: ConsumerShellProps) {
  const { productKey } = useParams<{ productKey: string }>()
  const location = useLocation()
  const productData = findConsumerProduct(productKey)

  const navItems = [
    {
      label: 'Hồ sơ',
      path: `/consumer/${productKey}/product`,
      icon: FileText,
      key: 'product'
    },
    {
      label: 'Khai sinh',
      path: `/consumer/${productKey}/certificate`,
      icon: Award,
      key: 'certificate'
    },
    {
      label: 'Nhật ký',
      path: `/consumer/${productKey}/timeline`,
      icon: Calendar,
      key: 'timeline'
    },
    {
      label: 'Chất lượng',
      path: `/consumer/${productKey}/quality`,
      icon: BarChart3,
      key: 'quality'
    },
    {
      label: 'Gợi ý',
      path: `/consumer/${productKey}/pairing`,
      icon: Coffee,
      key: 'pairing'
    },
    {
      label: 'Di sản',
      path: `/consumer/${productKey}/heritage`,
      icon: BookOpen,
      key: 'heritage'
    }
  ]

  const currentProductTitle = productData ? productData.product.name : 'Đặc sản Thành Nam'
  
  const subtitles: Record<string, string> = {
    'banh-gai': 'bánh gai nhất phẩm',
    'banh-xiu-pao': 'bánh xíu páo nhất phẩm',
    'keo-xiu-chau': 'kẹo sìu châu nhất phẩm',
    'doi': 'kẹo dồi nhất phẩm',
  }
  const currentProductSubtitle = productData
    ? (subtitles[productData.key] || `${productData.product.grade} · Lô ${productData.product.batch}`)
    : 'Thông tin truy xuất nguồn gốc'

  return (
    <AppFrame
      title={currentProductTitle}
      contentClassName="px-4 pt-4 pb-28 min-h-[calc(100vh-140px)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lacquer-400 hover:text-lacquer-600 transition"
        >
          <ArrowLeft size={14} />
          <span>Chọn vai trò</span>
        </Link>

        {productKey && productKey !== 'scan' && productData && location.pathname !== `/consumer/${productKey}/scan` && (
          <Link
            to={`/consumer/${productKey}/scan`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-gold-600 hover:text-gold-800 transition"
          >
            <QrCode size={13} />
            <span>Quét lại</span>
          </Link>
        )}
      </div>

      <div className="animate-fadeIn">
        {children}
      </div>

      {/* Premium Bottom Navigation Tab Bar */}
      {productKey && productKey !== 'scan' && productData && (
        <nav className="fixed bottom-0 left-1/2 z-40 h-20 w-full max-w-[430px] -translate-x-1/2 border-t border-gold-200/50 bg-parchment-50/95 backdrop-blur-md px-2 shadow-[0_-8px_30px_rgba(74,45,30,0.12)]">
          <div className="flex h-full items-center justify-around">
            {navItems.map((item) => {
              const isActive = activeTab === item.key || location.pathname.endsWith(item.key)
              const Icon = item.icon
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className="flex flex-col items-center justify-center gap-1 w-14 h-full text-center transition-all group"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                      isActive
                        ? 'bg-lacquer text-parchment shadow-md scale-110'
                        : 'text-lacquer-400 group-hover:text-lacquer group-hover:bg-lacquer-50'
                    }`}
                  >
                    <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} />
                  </span>
                  <span
                    className={`text-[9px] font-bold tracking-tight transition-colors ${
                      isActive ? 'text-lacquer-900' : 'text-lacquer-400 group-hover:text-lacquer'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </AppFrame>
  )
}
