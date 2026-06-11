import { createBrowserRouter } from 'react-router-dom'
import { App } from './App'
import { RoleSelectionPage } from '../features/role-selection/pages/RoleSelectionPage'
import { createProducerRoutes } from '../features/producer/shared/createProducerRoutes'
import { producerProducts } from '../features/producer/shared/productRegistry'
import { AuthResultPage } from '../features/consumer/banh-gai/auth-result/AuthResultPage'
import { CertificatePage } from '../features/consumer/banh-gai/certificate/CertificatePage'
import { HeritagePage } from '../features/consumer/banh-gai/heritage/HeritagePage'
import { ProductProfilePage } from '../features/consumer/banh-gai/product-profile/ProductProfilePage'
import { QualityPage } from '../features/consumer/banh-gai/quality/QualityPage'
import { ScanPage } from '../features/consumer/banh-gai/scan/ScanPage'
import { TimelinePage } from '../features/consumer/banh-gai/timeline/TimelinePage'
import { UsageGuidePage } from '../features/consumer/banh-gai/usage-guide/UsageGuidePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <RoleSelectionPage /> },
      {
        path: 'consumer/banh-gai',
        children: [
          { index: true, element: <ScanPage /> },
          { path: 'scan', element: <ScanPage /> },
          { path: 'auth-result', element: <AuthResultPage /> },
          { path: 'product', element: <ProductProfilePage /> },
          { path: 'certificate', element: <CertificatePage /> },
          { path: 'timeline', element: <TimelinePage /> },
          { path: 'quality', element: <QualityPage /> },
          { path: 'heritage', element: <HeritagePage /> },
          { path: 'usage-guide', element: <UsageGuidePage /> },
        ],
      },
      ...createProducerRoutes(producerProducts),
    ],
  },
])
