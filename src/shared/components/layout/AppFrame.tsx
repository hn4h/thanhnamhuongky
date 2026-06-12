import type { ReactNode } from 'react'

type AppFrameProps = {
  children: ReactNode
  title?: string
  subtitle?: string
}

export function AppFrame({ children, title, subtitle }: AppFrameProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-parchment text-lacquer shadow-[0_0_40px_rgba(58,33,24,0.16)]">
      {(title || subtitle) && (
        <header className="bg-gradient-to-br from-[#4A2D1E] via-lacquer to-[#4A2D1E] px-5 pb-7 pt-10 text-parchment">
          <div>
            {title && <h1 className="text-2xl font-bold tracking-normal">{title}</h1>}
            {subtitle && <p className="mt-2 max-w-2xl text-sm text-[#EAD3AE]">{subtitle}</p>}
          </div>
        </header>
      )}
      <div className="px-4 py-5">{children}</div>
    </main>
  )
}
