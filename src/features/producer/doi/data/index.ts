import type { ProducerProductData } from '../../shared/types'

export const doiData: ProducerProductData = {
  metrics: [
    { key: 'syrupTemp', label: 'Nhiệt độ nồi kẹo', value: '125', unit: '°C', type: 'temperature', status: 'good', aiRecommendation: 'Nhiệt độ nồi kẹo duy trì ở 125°C (chuẩn 120°C - 130°C), đảm bảo mạch nha và nhân kẹo đạt độ dẻo xốp hoàn hảo.' },
    { key: 'cookingTime', label: 'Thời gian nấu kẹo', value: '8', unit: 'phút', type: 'time', status: 'good', aiRecommendation: 'Thời gian nấu đạt 8 phút. Chuẩn bị công đoạn rút vỏ kẹo dồi.' },
    { key: 'prepAreaTemp', label: 'Nhiệt độ môi trường', value: '25', unit: '°C', type: 'temperature', status: 'good', aiRecommendation: 'Nhiệt độ phòng chế biến tối ưu (22 - 28°C), giúp vỏ kẹo không bị dính.' },
    { key: 'prepAreaHumidity', label: 'Độ ẩm môi trường', value: '56', unit: '%', type: 'humidity', status: 'good', aiRecommendation: 'Độ ẩm đạt chuẩn (55% - 65% RH), đảm bảo kẹo dồi giòn xốp.' },
    { key: 'quality', label: 'Điểm chất lượng AI', value: '88', unit: '/100', type: 'quality', status: 'good' },
  ],
  batches: [
    { id: 'KD-0626-01', name: 'Kẹo dồi lạc rang túi zipper', status: 'in-progress', startedAt: '11/06/2026', expectedAt: '11/06/2026', quantity: '420 gói', qualityScore: 88, notes: 'Theo dõi độ giòn xốp của mẻ.' },
    { id: 'KD-0626-02', name: 'Kẹo dồi hộp quà đặc sản', status: 'ready', startedAt: '10/06/2026', expectedAt: '11/06/2026', quantity: '180 hộp', qualityScore: 91, notes: 'Mẻ đóng hộp đạt chuẩn màu sắc.' },
  ],
  alerts: [
    { id: 'AL-KD-01', title: 'Độ giòn cần theo dõi', severity: 'medium', message: 'AI dự báo độ ẩm môi trường có thể ảnh hưởng độ giòn trong 2 giờ tới.', createdAt: '5 phút trước' },
  ],
  devices: [
    { id: 'SNS-KD-01', name: 'Cảm biến nồi kẹo dồi', location: 'Khu nấu kẹo', status: 'online', battery: 94, lastSignal: '20 giây trước' },
    { id: 'SNS-KD-02', name: 'Cảm biến máy đóng gói', location: 'Khu đóng gói', status: 'online', battery: 85, lastSignal: '3 phút trước' },
  ],
  insights: [
    { id: 'AI-KD-01', title: 'Tối ưu công đoạn kéo kẹo', confidence: 86, recommendation: 'Duy trì nhiệt độ 125°C để vỏ kẹo dồi giòn xốp nhất.' },
  ],
  qrCodes: [
    { id: 'QR-KD-001', batchId: 'KD-0626-01', serial: 'TNHK-KD-2026-0001', status: 'printed' },
  ],
}
