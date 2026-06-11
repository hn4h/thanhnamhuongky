import { ProducerScreenShell } from './ProducerScreenShell'
import type { ProducerProductModule } from '../types'

type ProducerAiInsightsProps = {
  product: ProducerProductModule
}

export function ProducerAiInsights({ product }: ProducerAiInsightsProps) {
  return (
    <ProducerScreenShell product={product} eyebrow={product.name} title={`AI insights ${product.name}`}>
      <div className="grid gap-3">
        {product.data.insights.map((insight) => (
          <article key={insight.id} className="rounded-lg border border-[#ead7a4] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a6417]">Độ tin cậy {insight.confidence}%</p>
            <h2 className="mt-2 text-lg font-bold">{insight.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#7a5a3a]">{insight.recommendation}</p>
          </article>
        ))}
      </div>
    </ProducerScreenShell>
  )
}
