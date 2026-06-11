import { Link } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'
import { ProducerNav } from '../components/ProducerNav'
import type { ProducerProductModule } from '../types'

type ProducerScreenShellProps = {
  product: ProducerProductModule
  eyebrow: string
  title: string
  children: React.ReactNode
}

export function ProducerScreenShell({ product, eyebrow, title, children }: ProducerScreenShellProps) {
  return (
    <AppFrame title={title} subtitle={`${eyebrow} · ${product.description}`}>
      <Link to="/" className="mb-4 inline-flex text-sm font-medium text-[#8a6417] hover:text-lacquer">
        Quay về chọn vai trò
      </Link>
      <ProducerNav product={product} />
      {children}
    </AppFrame>
  )
}
