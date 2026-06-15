import type { ProducerProductData } from '../../shared/types'

export const banhXiuPaoData: ProducerProductData = {
  metrics: [
    { key: 'ovenTemp', label: 'Nhiệt lò nướng', value: '180', unit: '°C', type: 'temperature', status: 'good' },
    { key: 'bakingTime', label: 'Thời gian nướng (Gđ 2)', value: '14', unit: 'phút', type: 'time', status: 'good' },
    { key: 'fillingHumidity', label: 'Độ ẩm nhân', value: '42', unit: '%', type: 'humidity', status: 'good' },
    { key: 'nh3Index', label: 'Chỉ số NH3 bảo quản', value: '12', unit: 'ppm', type: 'count', status: 'good', aiRecommendation: 'Chỉ số NH3 ổn định (12 ppm <= 20 ppm), kho bảo quản đạt chuẩn chống ôi thiu.' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '91', unit: '/100', type: 'quality', status: 'good' },
  ],
  batches: [
    { id: 'XP-0626-01', name: 'Xíu páo nhân thịt tiêu', status: 'in-progress', startedAt: '11/06/2026', expectedAt: '11/06/2026', quantity: '1.200 chiếc', qualityScore: 91, notes: 'Vỏ bánh lên màu tốt.' },
    { id: 'XP-0626-02', name: 'Xíu páo hộp 8 chiếc', status: 'ready', startedAt: '10/06/2026', expectedAt: '11/06/2026', quantity: '300 hộp', qualityScore: 93, notes: 'Đã hoàn tất đóng hộp.' },
  ],
  alerts: [
    { id: 'AL-XP-01', title: 'Lò nướng cần hiệu chuẩn', severity: 'low', message: 'Sai lệch nhiệt 3°C so với đầu dò phụ.', createdAt: '25 phút trước' },
  ],
  devices: [
    { id: 'SNS-XP-01', name: 'Đầu dò nhiệt lò', location: 'Lò nướng 2', status: 'online', battery: 76, lastSignal: '30 giây trước' },
  ],
  insights: [
    { id: 'AI-XP-01', title: 'Vỏ bánh đạt độ giòn', confidence: 91, recommendation: 'Giữ nhiệt 182°C thêm 6 phút cho mẻ hiện tại.' },
  ],
  qrCodes: [
    { id: 'QR-XP-001', batchId: 'XP-0626-01', serial: 'TNHK-XP-2026-0001', status: 'active' },
  ],
}
