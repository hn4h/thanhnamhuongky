import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { RoleSelectionPage } from '../features/role-selection/pages/RoleSelectionPage'
import { createProducerRoutes } from '../features/producer/shared/createProducerRoutes'
import { producerProducts } from '../features/producer/shared/productRegistry'
import { ScanPage } from '../features/consumer/shared/screens/ScanPage'
import { AuthResultPage } from '../features/consumer/shared/screens/AuthResultPage'
import { ProductProfilePage } from '../features/consumer/shared/screens/ProductProfilePage'
import { CertificatePage } from '../features/consumer/shared/screens/CertificatePage'
import { TimelinePage } from '../features/consumer/shared/screens/TimelinePage'
import { QualityPage } from '../features/consumer/shared/screens/QualityPage'
import { HeritagePage } from '../features/consumer/shared/screens/HeritagePage'
import { PairingPage } from '../features/consumer/shared/screens/PairingPage'
import { UsageGuidePage } from '../features/consumer/shared/screens/UsageGuidePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RoleSelectionPage /> },
      {
        path: 'consumer/:productKey',
        children: [
          { index: true, element: <ScanPage /> },
          { path: 'scan', element: <ScanPage /> },
          { path: 'auth-result', element: <AuthResultPage /> },
          { path: 'product', element: <ProductProfilePage /> },
          { path: 'certificate', element: <CertificatePage /> },
          { path: 'timeline', element: <TimelinePage /> },
          { path: 'quality', element: <QualityPage /> },
          { path: 'heritage', element: <HeritagePage /> },
          { path: 'pairing', element: <PairingPage /> },
          { path: 'usage-guide', element: <UsageGuidePage /> },
        ],
      },
      ...createProducerRoutes(producerProducts),
    ],
  },
])

