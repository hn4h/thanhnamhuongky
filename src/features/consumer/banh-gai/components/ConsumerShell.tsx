import { Link } from 'react-router-dom'
import { AppFrame } from '../../../../shared/components/layout/AppFrame'

type ConsumerShellProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function ConsumerShell({ title, subtitle, children }: ConsumerShellProps) {
  return (
    <AppFrame title={title} subtitle={subtitle}>
      <Link to="/" className="mb-4 inline-flex text-sm font-medium text-[#8A6238] hover:text-lacquer">
        Quay về chọn vai trò
      </Link>
      {children}
    </AppFrame>
  )
}
