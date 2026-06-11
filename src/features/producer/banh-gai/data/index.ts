import type { ProducerProductData } from '../../shared/types'

export const banhGaiData: ProducerProductData = {
  metrics: [
    { key: 'steamTemp', label: 'Nhiệt độ hấp', value: '96', unit: '°C', type: 'temperature', status: 'good' },
    { key: 'storageHumidity', label: 'Độ ẩm bảo quản', value: '58', unit: '%', type: 'humidity', status: 'warning' },
    { key: 'steamPressure', label: 'Áp suất hấp', value: '1.2', unit: 'bar', type: 'pressure', status: 'good' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '94', unit: '/100', type: 'quality', status: 'good' },
  ],
  batches: [
    { id: 'BG-0626-01', name: 'Bánh gai hộp quà sen vàng', status: 'ready', startedAt: '08/06/2026', expectedAt: '11/06/2026', quantity: '480 hộp', qualityScore: 94, notes: 'Mẻ đạt độ dẻo và mùi lá gai ổn định.' },
    { id: 'BG-0626-02', name: 'Bánh gai truyền thống 6 chiếc', status: 'watch', startedAt: '10/06/2026', expectedAt: '12/06/2026', quantity: '720 hộp', qualityScore: 86, notes: 'Theo dõi độ ẩm nhân đậu xanh.' },
  ],
  alerts: [
    { id: 'AL-BG-01', title: 'Độ ẩm kho tăng', severity: 'medium', message: 'Kho thành phẩm vượt 58%, nên bật hút ẩm trong 30 phút.', createdAt: '10 phút trước' },
  ],
  devices: [
    { id: 'SNS-BG-01', name: 'Cảm biến buồng hấp', location: 'Khu hấp A', status: 'online', battery: 82, lastSignal: '1 phút trước' },
    { id: 'SNS-BG-02', name: 'Cảm biến kho hộp quà', location: 'Kho thành phẩm', status: 'warning', battery: 39, lastSignal: '5 phút trước' },
  ],
  insights: [
    { id: 'AI-BG-01', title: 'Mẻ hộp quà đạt chuẩn cao', confidence: 94, recommendation: 'Ưu tiên in QR và đóng seal trong hôm nay để giữ độ mềm.' },
  ],
  qrCodes: [
    { id: 'QR-BG-001', batchId: 'BG-0626-01', serial: 'TNHK-BG-2026-0001', status: 'active' },
    { id: 'QR-BG-002', batchId: 'BG-0626-02', serial: 'TNHK-BG-2026-0002', status: 'printed' },
  ],
}
