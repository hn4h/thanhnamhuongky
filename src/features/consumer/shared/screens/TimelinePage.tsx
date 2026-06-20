import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Leaf, Flame, Layers, Workflow, QrCode, Sparkles } from 'lucide-react'
import { findConsumerProduct } from '../productRegistry'
import { ConsumerShell } from '../components/ConsumerShell'

export function TimelinePage() {
  const { productKey } = useParams<{ productKey: string }>()
  const productData = findConsumerProduct(productKey)

  if (!productData) {
    return <div className="p-6 text-center text-red-500">Sản phẩm không khả dụng.</div>
  }

  const { timeline } = productData

  // Helper to map icon names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Leaf':
        return <Leaf size={18} />
      case 'Flame':
        return <Flame size={18} />
      case 'Layers':
        return <Layers size={18} />
      case 'Workflow':
        return <Workflow size={18} />
      case 'QrCode':
        return <QrCode size={18} />
      default:
        return <Sparkles size={18} />
    }
  }

  return (
    <ConsumerShell activeTab="timeline">
      <section className="space-y-6">
        
        {/* Environmental & Production Logs timeline */}
        <div className="relative pl-10 space-y-8 animate-fadeIn">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[16px] top-2.5 bottom-2.5 w-0.5 bg-gold-300/70" />

          {timeline.map((step, index) => (
            <article
              key={step.title}
              style={{ animationDelay: `${index * 120}ms` }}
              className="relative opacity-0 animate-fadeIn"
            >
              {/* Timeline Connector node */}
              <span className="absolute left-[-38px] top-1 flex h-7 w-7 items-center justify-center rounded-full bg-lacquer text-gold border border-gold-300 shadow-md">
                {getIcon(step.icon)}
              </span>

              {/* Log Details Card */}
              <div className="rounded-2xl border border-gold-100/70 bg-white p-4.5 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between gap-2 border-b border-gold-100/50 pb-2 mb-3">
                  <h4 className="font-serif font-bold text-sm text-lacquer-950 leading-tight">
                    {step.title}
                  </h4>
                  <span className="text-[10px] font-bold text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {step.date}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-lacquer-500">
                  {step.detail}
                </p>

                {/* IoT Telemetry Data Logs */}
                {step.iotData && step.iotData.length > 0 && (
                  <div className="mt-3.5 bg-parchment-100/50 rounded-xl p-3 border border-gold-100/30">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-lacquer-400 mb-1.5 flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-betel animate-pulse" />
                      Nhật ký thiết bị IoT
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {step.iotData.map((data) => (
                        <div key={data.label} className="bg-white/60 p-2 rounded-lg border border-gold-100/10">
                          <span className="block text-[8px] font-bold text-lacquer-400 uppercase tracking-wide">
                            {data.label}
                          </span>
                          <strong className="block text-xs font-mono text-lacquer-950 mt-0.5">
                            {data.value}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Dynamic CTA */}
        <div className="pt-2">
          <Link
            to={`/consumer/${productKey}/quality`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-lacquer-800 to-lacquer-900 py-4 font-bold text-parchment shadow-lacquer-lg hover:shadow-xl active:scale-[0.98] transition-all"
          >
            <span>Xem các chỉ số chất lượng</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </ConsumerShell>
  )
}
