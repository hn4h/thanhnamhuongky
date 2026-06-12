import type { ProducerProductData } from '../../shared/types'

export const banhGaiData: ProducerProductData = {
  metrics: [
    { 
      key: 'prepAreaTemp', 
      label: 'Nhiệt độ khu vực làm bánh', 
      value: '26', 
      unit: '°C', 
      type: 'temperature', 
      status: 'good',
      aiRecommendation: 'Nhiệt độ phòng làm bánh tối ưu, đảm bảo độ dính của lá gai và bột.'
    },
    { 
      key: 'prepAreaHumidity', 
      label: 'Độ ẩm môi trường làm bánh', 
      value: '55', 
      unit: '%', 
      type: 'humidity', 
      status: 'good',
      aiRecommendation: 'Độ ẩm đạt chuẩn, giúp vỏ bánh không bị khô khi nhào nặn.'
    },
    { 
      key: 'steamerTemp', 
      label: 'Nhiệt độ lò hấp', 
      value: '98', 
      unit: '°C', 
      type: 'temperature', 
      status: 'good',
      aiRecommendation: 'Nhiệt độ lò hấp đạt chuẩn chín đều bánh gai. Tiếp tục duy trì.'
    },
    { 
      key: 'steamerHumidity', 
      label: 'Độ ẩm trong lò hấp', 
      value: '96', 
      unit: '%', 
      type: 'humidity', 
      status: 'good',
      aiRecommendation: 'Độ ẩm lò hấp lý tưởng giúp tăng độ dẫn nhiệt và làm bánh dẻo ngon.'
    },
    { 
      key: 'steamerPressure', 
      label: 'Áp suất lồng hấp', 
      value: '1.2', 
      unit: 'bar', 
      type: 'pressure', 
      status: 'good',
      aiRecommendation: 'Áp suất an toàn. Giám sát kỹ van xả tránh nguy cơ nổ lồng hấp khi vượt 1.8 bar.'
    },
    { 
      key: 'steamingTime', 
      label: 'Thời gian đang hấp bánh', 
      value: '45', 
      unit: 'phút', 
      type: 'time', 
      status: 'good',
      aiRecommendation: 'Thời gian hấp đạt 45/60 phút. Mẻ bánh gai sẽ sẵn sàng xuất xưởng sau 15 phút.'
    },
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
