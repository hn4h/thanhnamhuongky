import type { ProducerProductModule } from '../shared/types'
import { banhXiuPaoData } from './data'

export const banhXiuPaoModule: ProducerProductModule = {
  key: 'banh-xiu-pao',
  name: 'Bánh xíu páo',
  shortName: 'Xíu páo',
  description: 'Bánh nướng nhân thịt đặc sản Nam Định.',
  origin: 'Nam Định',
  theme: {
    primary: '#4A2D1E',
    accent: '#C0965A',
    soft: '#F3E4D2',
    background: '#FCF6EC',
  },
  routes: {
    dashboard: '/producer/banh-xiu-pao/dashboard',
    batches: '/producer/banh-xiu-pao/batches',
    productionMap: '/producer/banh-xiu-pao/production-map',
    alerts: '/producer/banh-xiu-pao/alerts',
    aiInsights: '/producer/banh-xiu-pao/ai-insights',
    devices: '/producer/banh-xiu-pao/devices',
    qrManagement: '/producer/banh-xiu-pao/qr-management',
  },
  data: banhXiuPaoData,
}
