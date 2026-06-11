import type { ProducerProductModule } from '../shared/types'
import { keoXiuChauData } from './data'

export const keoXiuChauModule: ProducerProductModule = {
  key: 'keo-xiu-chau',
  name: 'Kẹo xìu châu',
  shortName: 'Xìu châu',
  description: 'Kẹo lạc mạch nha truyền thống, phù hợp đóng gói quà biếu.',
  origin: 'Nam Định',
  theme: {
    primary: '#6C3218',
    accent: '#C98A27',
    soft: '#F3E0C4',
    background: '#FFF8EA',
  },
  routes: {
    dashboard: '/producer/keo-xiu-chau/dashboard',
    batches: '/producer/keo-xiu-chau/batches',
    productionMap: '/producer/keo-xiu-chau/production-map',
    alerts: '/producer/keo-xiu-chau/alerts',
    aiInsights: '/producer/keo-xiu-chau/ai-insights',
    devices: '/producer/keo-xiu-chau/devices',
    qrManagement: '/producer/keo-xiu-chau/qr-management',
  },
  data: keoXiuChauData,
}
