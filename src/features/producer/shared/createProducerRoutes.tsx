import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ProducerAiInsights } from './screens/ProducerAiInsights'
import { ProducerAlerts } from './screens/ProducerAlerts'
import { ProducerBatchDetail } from './screens/ProducerBatchDetail'
import { ProducerBatches } from './screens/ProducerBatches'
import { ProducerDashboard } from './screens/ProducerDashboard'
import { ProducerDevices } from './screens/ProducerDevices'
import { ProducerProductionMap } from './screens/ProducerProductionMap'
import { ProducerQrManagement } from './screens/ProducerQrManagement'
import type { ProducerProductModule } from './types'

export function createProducerRoutes(products: ProducerProductModule[]): RouteObject[] {
  return [
    {
      path: 'producer',
      children: products.map((product) => ({
        path: product.key,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <ProducerDashboard product={product} /> },
          { path: 'batches', element: <ProducerBatches product={product} /> },
          { path: 'batch/:batchId', element: <ProducerBatchDetail product={product} /> },
          { path: 'production-map', element: <ProducerProductionMap product={product} /> },
          { path: 'alerts', element: <ProducerAlerts product={product} /> },
          { path: 'ai-insights', element: <ProducerAiInsights product={product} /> },
          { path: 'devices', element: <ProducerDevices product={product} /> },
          { path: 'qr-management', element: <ProducerQrManagement product={product} /> },
        ],
      })),
    },
  ]
}
