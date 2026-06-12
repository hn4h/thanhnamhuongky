import type { ProducerProductModule } from '../shared/types'
import { banhGaiData } from './data'

export const banhGaiModule: ProducerProductModule = {
  key: 'banh-gai',
  name: 'Bánh gai',
  shortName: 'Bánh gai',
  description: 'Dòng bánh truyền thống chủ lực của Thành Nam hương ký.',
  origin: 'Nam Định',
  theme: {
    primary: '#4A2D1E',
    accent: '#C0965A',
    soft: '#E8D1AA',
    background: '#F7EBDD',
  },
  routes: {
    dashboard: '/producer/banh-gai/dashboard',
    batches: '/producer/banh-gai/batches',
    productionMap: '/producer/banh-gai/production-map',
    alerts: '/producer/banh-gai/alerts',
    aiInsights: '/producer/banh-gai/ai-insights',
    devices: '/producer/banh-gai/devices',
    qrManagement: '/producer/banh-gai/qr-management',
    profile: '/producer/banh-gai/profile',
  },
  data: banhGaiData,
}
