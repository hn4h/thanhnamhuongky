export const banhGaiConsumerData = {
  product: {
    code: 'TNHK-BG-2026-0001',
    name: 'Bánh gai Thành Nam hương ký',
    grade: 'Hộp quà sen vàng',
    batch: 'BG-0626-01',
    producedAt: '08/06/2026',
    expiresAt: '18/06/2026',
    origin: 'Nam Định',
    certificate: 'CERT-TNHK-BG-2026-014',
  },
  checks: [
    'Tem QR chính hãng',
    'Serial thuộc lô BG-0626-01',
    'Trong hạn sử dụng',
    'Lô đạt kiểm soát chất lượng',
  ],
  timeline: [
    { title: 'Chọn lá gai', date: '07/06/2026', detail: 'Lá gai được sơ chế trong ngày để giữ màu và hương.' },
    { title: 'Làm nhân', date: '08/06/2026', detail: 'Đậu xanh, dừa và đường được phối theo công thức hộp quà.' },
    { title: 'Hấp bánh', date: '08/06/2026', detail: 'Buồng hấp giữ 96°C và áp suất 1.2 bar.' },
    { title: 'Đóng hộp QR', date: '09/06/2026', detail: 'Hộp được gắn QR serial TNHK-BG-2026-0001.' },
  ],
  quality: [
    { label: 'Độ mềm', value: '92/100' },
    { label: 'Mùi lá gai', value: 'Đậm' },
    { label: 'Độ ẩm', value: '58%' },
    { label: 'AI score', value: '94/100' },
  ],
}
