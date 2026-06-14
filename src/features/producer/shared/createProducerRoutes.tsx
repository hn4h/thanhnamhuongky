import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { ProducerAiPredict } from './screens/ProducerAiPredict'
import { ProducerAlerts } from './screens/ProducerAlerts'
import { ProducerBatchDetail } from './screens/ProducerBatchDetail'
import { ProducerBatches } from './screens/ProducerBatches'
import { ProducerDashboard } from './screens/ProducerDashboard'
import { ProducerDevices } from './screens/ProducerDevices'
import { ProducerProductionMap } from './screens/ProducerProductionMap'
import { ProducerQrManagement } from './screens/ProducerQrManagement'
import { ProducerProfile } from './screens/ProducerProfile'
import { ProducerTerms } from './screens/ProducerTerms'
import { ProducerPrivacy } from './screens/ProducerPrivacy'
import { ProducerSupport } from './screens/ProducerSupport'
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
          { path: 'ai-predict', element: <ProducerAiPredict product={product} /> },
          { path: 'devices', element: <ProducerDevices product={product} /> },
          { path: 'qr-management', element: <ProducerQrManagement product={product} /> },
          { path: 'profile', element: <ProducerProfile product={product} /> },
          { path: 'terms', element: <ProducerTerms product={product} /> },
          { path: 'privacy', element: <ProducerPrivacy product={product} /> },
          { path: 'support', element: <ProducerSupport product={product} /> },
        ],
      })),
    },
  ]
}
