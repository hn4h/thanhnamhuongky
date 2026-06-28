import type { ProducerProductModule } from '../shared/types'
import { doiData } from './data'

export const doiModule: ProducerProductModule = {
  key: 'doi',
  name: 'Kẹo Dồi',
  shortName: 'Kẹo Dồi',
  description: 'Dòng đặc sản đóng gói cần kiểm soát chặt nhiệt độ bảo quản.',
  origin: 'Nam Định',
  theme: {
    primary: '#4A2D1E',
    accent: '#C0965A',
    soft: '#F3E4D2',
    background: '#F7EBDD',
  },
  routes: {
    dashboard: '/producer/doi/dashboard',
    batches: '/producer/doi/batches',
    productionMap: '/producer/doi/production-map',
    alerts: '/producer/doi/alerts',
    aiPredict: '/producer/doi/ai-predict',
    devices: '/producer/doi/devices',
    qrManagement: '/producer/doi/qr-management',
    profile: '/producer/doi/profile',
  },
  data: doiData,
}
