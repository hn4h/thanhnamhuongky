import type { ProducerProductModule } from '../shared/types'
import { doiData } from './data'

export const doiModule: ProducerProductModule = {
  key: 'doi',
  name: 'Dồi',
  shortName: 'Dồi',
  description: 'Dòng đặc sản đóng gói cần kiểm soát chặt nhiệt độ bảo quản.',
  origin: 'Nam Định',
  theme: {
    primary: '#4A261F',
    accent: '#B67A32',
    soft: '#EBD5C2',
    background: '#F8EDE2',
  },
  routes: {
    dashboard: '/producer/doi/dashboard',
    batches: '/producer/doi/batches',
    productionMap: '/producer/doi/production-map',
    alerts: '/producer/doi/alerts',
    aiInsights: '/producer/doi/ai-insights',
    devices: '/producer/doi/devices',
    qrManagement: '/producer/doi/qr-management',
  },
  data: doiData,
}
