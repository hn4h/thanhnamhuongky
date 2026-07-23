import { Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import type { ProducerProductModule } from '../types'

type ProducerScreenShellProps = {
  product: ProducerProductModule
  eyebrow: string
  title: string
  children: React.ReactNode
  hideSummary?: boolean
}

export function ProducerScreenShell({ product, eyebrow, title, children, hideSummary = false }: ProducerScreenShellProps) {
  const alertCount = product.data.alerts.length
  const activeCount = product.data.batches.filter((batch) => batch.status === 'in-progress' || batch.status === 'watch').length
  const readyCount = product.data.batches.filter((batch) => batch.status === 'ready').length
  const dateLabel = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

  return (
    <AppFrame contentClassName="p-0">
      <div className="min-h-screen overflow-x-hidden bg-[#F8EFE2] pb-24 text-[#150807]">
        <header className="relative overflow-hidden bg-gradient-to-l from-[#77452f] to-[#1c1009] px-4 pb-7 pt-12 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.13),transparent_28%)]" />
          <div className="relative flex items-center gap-3">
            <img
              src="/images/logo.jpg"
              alt="Thanh Nam Huong Ky"
              className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-[0_10px_24px_rgba(33,6,6,0.28)]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold capitalize text-[#BFA4A0]">{dateLabel}</p>
              <h1 className="mt-1 text-[27px] font-black leading-none tracking-normal text-white">{title}</h1>
              <p className="mt-2 truncate text-base font-bold text-[#F1C932]">
                {eyebrow} · {product.origin}
              </p>
            </div>
            <div className="flex shrink-0 gap-1.5">
              <Link 
                to={product.routes.alerts} 
                aria-label={`${alertCount} cảnh báo`} 
                className="relative grid h-11 w-11 place-items-center rounded-full bg-white/12 text-[#D6B947] shadow-inner transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Bell size={22} strokeWidth={2.2} />
                {alertCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-6 min-w-6 place-items-center rounded-full bg-[#E64A35] px-1.5 text-xs font-black text-white animate-pulse">
                    {alertCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {!hideSummary && (
            <div className="relative mt-7 grid grid-cols-4 rounded-[24px] border border-[#C9773E]/45 bg-white/10 px-1 py-5 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#C9AAA5]">{product.key === 'banh-xiu-pao' ? 'Ca nướng' : 'Ca hấp'}</p>
                <strong className="mt-2 block text-lg font-black text-[#93F0A2]">Mở</strong>
              </div>
              <div className="min-w-0 border-l border-white/18">
                <p className="text-xs font-bold text-[#C9AAA5]">Mẻ</p>
                <strong className="mt-2 block text-xl font-black text-white">{product.data.batches.length}</strong>
              </div>
              <div className="min-w-0 border-l border-white/18">
                <p className="text-xs font-bold text-[#C9AAA5]">Hoạt động</p>
                <strong className="mt-2 block text-xl font-black text-white">{activeCount || readyCount}</strong>
              </div>
              <div className="min-w-0 border-l border-white/18">
                <p className="text-xs font-bold text-[#C9AAA5]">Cảnh báo</p>
                <strong className="mt-2 block text-xl font-black text-[#FFB737]">{alertCount}</strong>
              </div>
            </div>
          )}
        </header>

        <section className="px-4 py-6">{children}</section>
        <ProducerNav product={product} />
      </div>
    </AppFrame>
  )
}
