import type { ProducerProductData } from '../../shared/types'

export const doiData: ProducerProductData = {
  metrics: [
    { key: 'syrupTemp', label: 'Nhiệt độ nồi kẹo', value: '120', unit: '°C', type: 'temperature', status: 'good' },
    { key: 'cookingTime', label: 'Thời gian nấu kẹo', value: '18', unit: 'phút', type: 'time', status: 'good' },
    { key: 'prepAreaTemp', label: 'Nhiệt độ môi trường', value: '25', unit: '°C', type: 'temperature', status: 'good' },
    { key: 'prepAreaHumidity', label: 'Độ ẩm môi trường', value: '58', unit: '%', type: 'humidity', status: 'good' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '88', unit: '/100', type: 'quality', status: 'good' },
  ],
  batches: [
    { id: 'DO-0626-01', name: 'Dồi truyền thống hút chân không', status: 'in-progress', startedAt: '11/06/2026', expectedAt: '11/06/2026', quantity: '420 gói', qualityScore: 88, notes: 'Theo dõi nhiệt kho mát sau đóng gói.' },
    { id: 'DO-0626-02', name: 'Dồi hộp quà đặc sản', status: 'hold', startedAt: '10/06/2026', expectedAt: '11/06/2026', quantity: '120 hộp', qualityScore: 81, notes: 'Tạm giữ để kiểm tra nhãn bảo quản.' },
  ],
  alerts: [
    { id: 'AL-DO-01', title: 'Lô đang tạm giữ', severity: 'high', message: 'Mẻ DO-0626-02 cần kiểm tra nhãn nhiệt độ bảo quản trước khi xuất.', createdAt: '5 phút trước' },
  ],
  devices: [
    { id: 'SNS-DO-01', name: 'Cảm biến kho mát', location: 'Kho mát 1', status: 'online', battery: 94, lastSignal: '20 giây trước' },
    { id: 'SNS-DO-02', name: 'Cảm biến máy hút chân không', location: 'Khu đóng gói', status: 'warning', battery: 22, lastSignal: '8 phút trước' },
  ],
  insights: [
    { id: 'AI-DO-01', title: 'Rủi ro nhãn bảo quản', confidence: 84, recommendation: 'Kiểm tra lại tem hướng dẫn bảo quản của lô DO-0626-02.' },
  ],
  qrCodes: [
    { id: 'QR-DO-001', batchId: 'DO-0626-01', serial: 'TNHK-DO-2026-0001', status: 'active' },
  ],
}
