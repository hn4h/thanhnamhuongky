import { NavLink } from 'react-router-dom'
import type { ProducerProductModule } from '../types'

const items = [
  ['dashboard', 'Tổng quan'],
  ['batches', 'Lô sản xuất'],
  ['productionMap', 'Quy trình'],
  ['alerts', 'Cảnh báo'],
  ['aiInsights', 'AI'],
  ['devices', 'Thiết bị'],
  ['qrManagement', 'QR'],
] as const

type ProducerNavProps = {
  product: ProducerProductModule
}

export function ProducerNav({ product }: ProducerNavProps) {
  return (
    <nav className="mb-5 flex gap-2 overflow-x-auto pb-1">
      {items.map(([key, label]) => (
        <NavLink
          key={key}
          to={product.routes[key]}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition ${
              isActive ? 'border-transparent text-white' : 'border-[#dfc98b] bg-white/70 text-[#6f4b2d] hover:border-gold'
            }`
          }
          style={({ isActive }) => (isActive ? { background: product.theme.primary } : undefined)}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
