import type { ProducerProductData } from '../../shared/types'

export const keoXiuChauData: ProducerProductData = {
  metrics: [
    { key: 'syrupTemp', label: 'Nhiệt độ nồi kẹo', value: '125', unit: '°C', type: 'temperature', status: 'good', aiRecommendation: 'Nhiệt độ nồi kẹo duy trì ở 125°C (chuẩn 120°C - 130°C), đảm bảo mạch nha có độ dẻo và màu hổ phách đẹp.' },
    { key: 'cookingTime', label: 'Thời gian nấu kẹo', value: '10', unit: 'phút', type: 'time', status: 'good', aiRecommendation: 'Thời gian nấu đạt 10 phút (nằm trong khoảng chuẩn từ 8:00 - 12:30 phút). Chuẩn bị đổ khuôn cán kẹo.' },
    { key: 'prepAreaTemp', label: 'Nhiệt độ môi trường', value: '26', unit: '°C', type: 'temperature', status: 'good', aiRecommendation: 'Nhiệt độ phòng chế biến tối ưu (22 - 28°C), giúp vừng lạc bám dính tốt.' },
    { key: 'prepAreaHumidity', label: 'Độ ẩm môi trường', value: '56', unit: '%', type: 'humidity', status: 'good', aiRecommendation: 'Độ ẩm đạt chuẩn (55% - 65% RH), tránh hiện tượng kẹo bị chảy nước.' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '89', unit: '/100', type: 'quality', status: 'good' },
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
