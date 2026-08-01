import type { ProducerProductData } from '../../shared/types'

export const banhXiuPaoData: ProducerProductData = {
  metrics: [
    { 
      key: 'prepAreaTemp', 
      label: 'Nhiệt độ khu vực làm bánh', 
      value: '25', 
      unit: '°C', 
      type: 'temperature', 
      status: 'good',
      aiRecommendation: 'Nhiệt độ phòng làm bánh tối ưu, đảm bảo độ ổn định của bột và nhân.'
    },
    { 
      key: 'prepAreaHumidity', 
      label: 'Độ ẩm môi trường làm bánh', 
      value: '58', 
      unit: '%', 
      type: 'humidity', 
      status: 'good',
      aiRecommendation: 'Độ ẩm đạt chuẩn, giúp kiểm soát tốt chất lượng ủ bột bánh.'
    },
    { key: 'ovenTemp', label: 'Nhiệt lò nướng', value: '240', unit: '°C', type: 'temperature', status: 'good', aiRecommendation: 'Nhiệt độ lò nướng ổn định trong dải 230°C - 250°C để vỏ giòn nhân chín thơm.' },
    { key: 'bakingTime', label: 'Thời gian nướng bánh', value: '35', unit: 'phút', type: 'time', status: 'good', aiRecommendation: 'Thời gian nướng đạt 35/45 phút (Giai đoạn 1: 30 phút ở 230°C, Giai đoạn 2: 15 phút ở 250°C).' },
    { key: 'fillingHumidity', label: 'Độ ẩm nhân', value: '42', unit: '%', type: 'humidity', status: 'good' },
    { key: 'nh3Index', label: 'Chỉ số NH3 bảo quản', value: '12', unit: 'ppm', type: 'count', status: 'good', trend: '→ ổn định', aiRecommendation: 'Chỉ số NH3 ổn định (12 ppm <= 20 ppm), kho bảo quản đạt chuẩn chống ôi thiu.' },
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
