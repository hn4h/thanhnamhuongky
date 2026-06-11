import type { ReactNode } from 'react'

type AppFrameProps = {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function AppFrame({ children, title, subtitle }: AppFrameProps) {
  return (
    <main className="min-h-screen bg-parchment text-lacquer">
      {(title || subtitle) && (
        <header className="bg-gradient-to-br from-[#2a160f] via-lacquer to-[#6a3f25] px-5 pb-7 pt-10 text-parchment">
          <div className="mx-auto max-w-6xl">
            {title && <h1 className="text-2xl font-bold tracking-normal">{title}</h1>}
            {subtitle && <p className="mt-2 max-w-2xl text-sm text-[#f6deb0]">{subtitle}</p>}
          </div>
        </header>
      )}
      <div className="mx-auto max-w-6xl px-4 py-5">{children}</div>
    </main>
  )
}
