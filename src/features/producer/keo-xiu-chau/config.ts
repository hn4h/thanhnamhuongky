import type { ProducerProductModule } from '../shared/types'
import { keoXiuChauData } from './data'

export const keoXiuChauModule: ProducerProductModule = {
  key: 'keo-xiu-chau',
  name: 'Kẹo xìu châu',
  shortName: 'Xìu châu',
  description: 'Kẹo lạc mạch nha truyền thống, phù hợp đóng gói quà biếu.',
  origin: 'Nam Định',
  theme: {
    primary: '#4A2D1E',
    accent: '#C0965A',
    soft: '#F3E4D2',
    background: '#FCF6EC',
  },
  routes: {
    dashboard: '/producer/keo-xiu-chau/dashboard',
    batches: '/producer/keo-xiu-chau/batches',
    productionMap: '/producer/keo-xiu-chau/production-map',
    alerts: '/producer/keo-xiu-chau/alerts',
    aiInsights: '/producer/keo-xiu-chau/ai-insights',
    devices: '/producer/keo-xiu-chau/devices',
    qrManagement: '/producer/keo-xiu-chau/qr-management',
    profile: '/producer/keo-xiu-chau/profile',
  },
  data: keoXiuChauData,
}
