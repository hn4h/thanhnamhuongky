import type { ProducerProductData } from '../../shared/types'

export const keoXiuChauData: ProducerProductData = {
  metrics: [
    { key: 'syrupTemp', label: 'Nhiệt mạch nha', value: '118', unit: '°C', type: 'temperature', status: 'good' },
    { key: 'coolingHumidity', label: 'Độ ẩm khu làm nguội', value: '49', unit: '%', type: 'humidity', status: 'good' },
    { key: 'peanutRatio', label: 'Tỷ lệ lạc', value: '38', unit: '%', type: 'count', status: 'good' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '89', unit: '/100', type: 'quality', status: 'warning' },
  ],
  batches: [
    { id: 'KC-0626-01', name: 'Kẹo xìu châu lạc rang', status: 'in-progress', startedAt: '11/06/2026', expectedAt: '11/06/2026', quantity: '620 gói', qualityScore: 89, notes: 'Theo dõi độ giòn sau làm nguội.' },
    { id: 'KC-0626-02', name: 'Kẹo xìu châu hộp quà', status: 'ready', startedAt: '09/06/2026', expectedAt: '10/06/2026', quantity: '260 hộp', qualityScore: 92, notes: 'Mẻ đóng hộp đạt màu đẹp.' },
  ],
  alerts: [
    { id: 'AL-KC-01', title: 'Độ giòn cần theo dõi', severity: 'medium', message: 'AI dự báo độ ẩm môi trường có thể làm giảm độ giòn trong 2 giờ tới.', createdAt: '12 phút trước' },
  ],
  devices: [
    { id: 'SNS-KC-01', name: 'Cảm biến nồi mạch nha', location: 'Khu nấu kẹo', status: 'online', battery: 88, lastSignal: '1 phút trước' },
    { id: 'SNS-KC-02', name: 'Cảm biến khu làm nguội', location: 'Bàn làm nguội', status: 'online', battery: 61, lastSignal: '3 phút trước' },
  ],
  insights: [
    { id: 'AI-KC-01', title: 'Cần tăng thời gian làm nguội', confidence: 87, recommendation: 'Kéo dài làm nguội thêm 8 phút để giữ độ giòn.' },
  ],
  qrCodes: [
    { id: 'QR-KC-001', batchId: 'KC-0626-01', serial: 'TNHK-KC-2026-0001', status: 'printed' },
  ],
}
