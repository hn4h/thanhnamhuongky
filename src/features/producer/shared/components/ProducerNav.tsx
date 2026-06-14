import { CircleUserRound, Compass, Layers3, LayoutGrid, TrendingUp } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { ProducerProductModule } from '../types'

const items = [
  ['dashboard', 'Bảng Điều Khiển', LayoutGrid],
  ['productionMap', 'Sơ Đồ', Compass],
  ['devices', 'Tổng Quan', Layers3],
  ['aiPredict', 'Dự Báo', TrendingUp],
  ['profile', 'Hồ Sơ', CircleUserRound],
] as const

type ProducerNavProps = {
  product: ProducerProductModule
}

export function ProducerNav({ product }: ProducerNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto grid w-full max-w-[430px] grid-cols-5 overflow-hidden border-t border-gold-400/20 bg-[#130607] px-1 pb-0 pt-3 shadow-[0_-12px_30px_rgba(19,6,7,0.24)]">
      {items.map(([key, label, Icon]) => (
        <NavLink
          key={key}
          to={product.routes[key]}
          className={({ isActive }) =>
            `relative flex min-h-[58px] min-w-0 flex-col items-center justify-start gap-1 rounded-lg px-0.5 text-center text-[10px] font-black leading-tight tracking-normal transition ${
              isActive ? 'text-[#D9BC45]' : 'text-[#817273] hover:text-parchment-200'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span className="absolute -top-3 h-1 w-16 rounded-full bg-[#D9BC45]" />}
              <Icon size={25} strokeWidth={2.4} />
              <span className="line-clamp-2">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
