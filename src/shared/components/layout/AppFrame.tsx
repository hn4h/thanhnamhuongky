import type { ReactNode } from 'react'

type AppFrameProps = {
  children: ReactNode
  title?: string
  subtitle?: string
  contentClassName?: string
}

export function AppFrame({ children, title, subtitle, contentClassName = 'px-4 py-6' }: AppFrameProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[430px] bg-parchment text-lacquer shadow-lacquer">
      {(title || subtitle) && (
        <header className="relative overflow-hidden bg-gradient-header px-5 pb-8 pt-12 text-parchment">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/images/texture-pattern.png')", backgroundSize: '120px' }} />
          <div className="relative">
            {title && <h1 className="text-[28px] font-bold leading-tight tracking-tight text-parchment-50">{title}</h1>}
            {subtitle && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-parchment-300/90">{subtitle}</p>}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
        </header>
      )}
      <div className={contentClassName}>{children}</div>
    </main>
  )
}
