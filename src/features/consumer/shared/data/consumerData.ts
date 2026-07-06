import type { ConsumerProductData } from '../types'

export const consumerProductsData: Record<string, ConsumerProductData> = {
  'banh-gai': {
    key: 'banh-gai',
    product: {
      code: 'TNHK-BG-2026-0001',
      name: 'Bánh Gai Nhất Phẩm',
      grade: 'Loại 1',
      batch: 'BG-0626-01',
      producedAt: '31/08/2026',
      expiresAt: '06/09/2026',
      origin: '94 Trần Hưng Đạo, Phường Nam Định, Tỉnh Ninh Bình',
      certificate: 'CERT-TNHK-BG-2026-014',
    },
    checks: [
      'Tem QR mã hóa chính hãng hoạt động',
      'Mã Serial khớp lô sản xuất BG-0626-01',
      'Trong thời hạn sử dụng tối ưu',
      'Lô sản xuất đạt chứng nhận an toàn thực phẩm',
    ],
    timeline: [
      {
        title: 'Tuyển chọn lá gai',
        date: '30/08/2026',
        detail: 'Lá gai nếp tươi được thu hoạch lúc sáng sớm tại vùng nguyên liệu hữu cơ, rửa sạch và luộc kỹ để giữ độ xanh đen tự nhiên.',
        icon: 'Leaf',
        iotData: [
          { label: 'Nhiệt độ luộc', value: '98°C' },
          { label: 'Độ ẩm lá', value: '62%' }
        ]
      },
      {
        title: 'Giã lá & trộn bột nếp',
        date: '31/08/2026',
        detail: 'Lá gai luộc chín được giã mịn rồi trộn đều cùng bột gạo nếp cái hoa vàng thơm dẻo và mật mía đậm đà.',
        icon: 'Workflow',
        iotData: [
          { label: 'Tỷ lệ bột/mật', value: '1:1.2' },
          { label: 'Thời gian giã', value: '45 phút' }
        ]
      },
      {
        title: 'Làm nhân đậu xanh sen',
        date: '31/08/2026',
        detail: 'Đậu xanh hấp chín giã nhuyễn trộn cùi dừa sợi, mứt sen và hương hoa bưởi chưng cất tự nhiên.',
        icon: 'Layers',
        iotData: [
          { label: 'Nhiệt độ hấp đậu', value: '95°C' },
          { label: 'Tỷ lệ hạt sen', value: '15%' }
        ]
      },
      {
        title: 'Gói lá chuối & Hấp chín',
        date: '31/08/2026',
        detail: 'Bánh được gói nhiều lớp lá chuối khô đã rửa sạch, xếp vào buồng hấp nhiệt lượng lớn kiểm soát áp suất hơi.',
        icon: 'Flame',
        iotData: [
          { label: 'Nhiệt độ lò hấp', value: '102°C' },
          { label: 'Áp suất hơi', value: '1.25 bar' },
          { label: 'Thời gian hấp', value: '120 phút' }
        ]
      },
      {
        title: 'Đóng hộp và gán QR Code',
        date: '01/09/2026',
        detail: 'Sản phẩm nguội tự nhiên, đóng hộp quà tặng cao cấp và in dán tem mã hóa QR truy xuất nguồn gốc duy nhất.',
        icon: 'QrCode',
        iotData: [
          { label: 'Độ ẩm đóng gói', value: '54%' },
          { label: 'Nhiệt độ phòng đóng', value: '24.5°C' }
        ]
      }
    ],
    quality: [
      { label: 'Độ dẻo vỏ bánh', value: 92, max: 100, unit: '%' },
      { label: 'Độ ngọt thanh', value: 85, max: 100, unit: '%' },
      { label: 'Độ ẩm vỏ bánh', value: 58, max: 100, unit: '%' },
      { label: 'Đánh giá AI chất lượng', value: 96, max: 100, unit: 'điểm' }
    ],
    grade: 'Hạng Xuất Sắc (S-Tier)',
    heritage: [
      {
        title: 'Nguồn gốc Bánh Gai Thành Nam',
        story: 'Bánh gai vốn là món ăn tiến vua dân dã, biểu trưng cho sự khéo léo của người con đất Nam Định. Hương Ký gìn giữ nguyên vẹn bí quyết ngâm nếp chín mọng và tỉ lệ mật mía sánh đặc truyền đời.',
        imagePlaceholder: 'heritage_banhgai_1'
      },
      {
        title: 'Hồn cốt từ chiếc lá gai nếp',
        story: 'Lá gai phải là loại lá gai nếp bản to, dày, không quá non hay quá già để cho ra màu sắc đen tuyền như thạch mun cùng vị thơm đầm ấm đặc trưng không lẫn lộn.',
        imagePlaceholder: 'heritage_banhgai_2'
      }
    ],
    flavor: {
      sweet: 78,
      savory: 20,
      aroma: 95,
      bitterness: 10,
      richness: 90
    },
    pairings: [
      {
        title: 'Trà Sen Tây Hồ Ấm',
        description: 'Vị đắng nhẹ, thanh khiết của hương sen Tây Hồ hòa quyện hoàn hảo với vị ngọt đậm của mật mía bánh gai.',
        imagePlaceholder: 'pairing_sen'
      },
      {
        title: 'Trà Thiết Quan Âm',
        description: 'Hương thơm hoa cỏ lan tỏa dịu mát làm giảm đi độ béo ngậy của mỡ gáy trong nhân bánh gai.',
        imagePlaceholder: 'pairing_tiepquanam'
      }
    ],
    theme: {
      primary: '#4A2D1E',
      accent: '#C0965A',
      background: '#F7EBDD'
    }
  },
  'banh-xiu-pao': {
    key: 'banh-xiu-pao',
    product: {
      code: 'TNHK-XP-2026-0038',
      name: 'Bánh Xíu Páo Thượng Hạng',
      grade: 'Hộp Truyền Thống',
      batch: 'XP-0626-04',
      producedAt: '31/08/2026',
      expiresAt: '05/09/2026',
      origin: '28 Nguyễn Trãi - Phường Nam Định - Tỉnh Ninh Bình',
      certificate: 'CERT-TNHK-XP-2026-088',
    },
    checks: [
      'Tem QR mã hóa chính hãng hoạt động',
      'Mã Serial khớp lô sản xuất XP-0626-04',
      'Hạn sử dụng còn 5 ngày kể từ khi nướng',
      'Đã qua kiểm định nhiệt độ lò nướng đạt chuẩn',
    ],
    timeline: [
      {
        title: 'Chuẩn bị vỏ ngàn lớp',
        date: '31/08/2026',
        detail: 'Kỹ thuật cán hai loại bột nước và bột dầu lặp đi lặp lại nhiều lần để tạo ra các lớp vỏ bánh mỏng xếp chồng khéo léo.',
        icon: 'Workflow',
        iotData: [
          { label: 'Thời gian ủ bột', value: '30 phút' },
          { label: 'Nhiệt độ phòng cán', value: '22°C' }
        ]
      },
      {
        title: 'Chế biến nhân thịt xá xíu',
        date: '31/08/2026',
        detail: 'Thịt heo tươi thái hạt lựu ướp ngũ vị hương, dầu hào, mật ong và tỏi băm rán vàng óng kèm trứng cút luộc.',
        icon: 'Layers',
        iotData: [
          { label: 'Thời gian ướp', value: '2 tiếng' },
          { label: 'Nhiệt độ rim xá xíu', value: '92°C' }
        ]
      },
      {
        title: 'Tạo hình và Quét trứng',
        date: '31/08/2026',
        detail: 'Nhồi nhân vào vỏ bánh tròn, tạo các nếp gấp đỉnh bánh như bánh bao rồi quét một lớp lòng đỏ trứng gà tạo màu vàng óng.',
        icon: 'Leaf',
        iotData: [
          { label: 'Trọng lượng bánh', value: '65g' }
        ]
      },
      {
        title: 'Nướng bánh nhiệt độ cao',
        date: '31/08/2026',
        detail: 'Nướng qua 2 chu kỳ nhiệt độ cao, phun nước ẩm xen kẽ để vỏ bánh xốp giòn mà nhân bên trong không bị khô.',
        icon: 'Flame',
        iotData: [
          { label: 'Nhiệt độ nướng Lần 1', value: '232°C' },
          { label: 'Thời gian nướng Lần 1', value: '30 phút' },
          { label: 'Nhiệt độ nướng Lần 2', value: '249°C' },
          { label: 'Thời gian nướng Lần 2', value: '15 phút' }
        ]
      }
    ],
    quality: [
      { label: 'Độ giòn xốp vỏ', value: 94, max: 100, unit: '%' },
      { label: 'Độ đậm đà nhân', value: 91, max: 100, unit: '%' },
      { label: 'Độ ráo mỡ', value: 82, max: 100, unit: '%' },
      { label: 'Đánh giá AI chất lượng', value: 95, max: 100, unit: 'điểm' }
    ],
    grade: 'Hạng Thượng Hạng (A+)',
    heritage: [
      {
        title: 'Món bánh đường phố lịch sử',
        story: 'Xíu páo theo chân người Hoa du nhập vào Nam Định từ thế kỷ trước. Qua nhiều thế hệ, thợ bánh Việt đã tinh chỉnh gia vị xá xíu và cách quét trứng để hợp gu ẩm thực đậm đà vùng đồng bằng sông Hồng.',
        imagePlaceholder: 'heritage_xiupao_1'
      }
    ],
    flavor: {
      sweet: 35,
      savory: 88,
      aroma: 92,
      bitterness: 5,
      richness: 86
    },
    pairings: [
      {
        title: 'Sữa Đậu Nành Ấm',
        description: 'Vị bùi béo dịu nhẹ của sữa đậu nành thanh mát bổ trợ tốt cho nhân xá xíu nóng hổi đầy đậm đà.',
        imagePlaceholder: 'pairing_suadaunanh'
      },
      {
        title: 'Trà Ô Long Đậm',
        description: 'Trà ô long có hậu ngọt sâu giúp rửa trôi cảm giác béo nhẹ của mỡ heo xá xíu, để lại hậu vị thơm thoang thoảng.',
        imagePlaceholder: 'pairing_oolong'
      }
    ],
    theme: {
      primary: '#4A2D1E',
      accent: '#C0965A',
      background: '#FCF6EC'
    }
  },
  'keo-xiu-chau': {
    key: 'keo-xiu-chau',
    product: {
      code: 'TNHK-SC-2026-0105',
      name: 'Kẹo Sìu Châu',
      grade: 'Hộp Quà Đặc Sản',
      batch: 'XC-0626-02',
      producedAt: '18/06/2026',
      expiresAt: '18/12/2026',
      origin: '596 Điện Biên - Phường Nam Định - Tỉnh Ninh Bình',
      certificate: 'CERT-TNHK-XC-2026-211',
    },
    checks: [
      'Tem QR chính hãng hoạt động',
      'Mã Serial khớp lô sản xuất XC-0626-02',
      'Độ giòn kẹo đạt chuẩn kiểm nghiệm',
      'Thời hạn sử dụng còn trên 5 tháng',
    ],
    timeline: [
      {
        title: 'Rang lạc bóc vỏ',
        date: '17/06/2026',
        detail: 'Hạt lạc đỏ tuyển chọn đều tăm tắp được rang cát nóng cho chín vàng sậm từ ruột, tách vỏ lụa thủ công để hạt lạc nguyên vẹn.',
        icon: 'Flame',
        iotData: [
          { label: 'Nhiệt độ rang cát', value: '145°C' },
          { label: 'Tỷ lệ hạt bể', value: '<2%' }
        ]
      },
      {
        title: 'Cô mạch nha đường',
        date: '18/06/2026',
        detail: 'Đường cát hòa nước cùng mạch nha nếp thơm ngọt, đun lửa riu riu và khuấy liên tục cho đến khi hỗn hợp có màu mật ong hổ phách.',
        icon: 'Workflow',
        iotData: [
          { label: 'Nhiệt độ chảo đường', value: '125°C' },
          { label: 'Độ keo mạch nha', value: '88%' },
          { label: 'Thời gian nấu', value: '10 phút' }
        ]
      },
      {
        title: 'Trộn lạc & Đổ khuôn',
        date: '18/06/2026',
        detail: 'Lấy chảo mạch nha khỏi bếp, đổ nhanh lạc rang và vừng rang vào đảo đều, đổ ra khay lót sẵn bột nếp để giữ kẹo ráo giòn.',
        icon: 'Layers',
        iotData: [
          { label: 'Độ ẩm phòng cán kẹo', value: '42%' }
        ]
      },
      {
        title: 'Cắt kẹo đóng gói',
        date: '18/06/2026',
        detail: 'Dùng dao bản to cắt kẹo thành từng thanh nhỏ khi còn hơi ấm, bọc nilon bảo quản chống ẩm tức thì.',
        icon: 'QrCode',
        iotData: [
          { label: 'Thời gian hoàn tất', value: '15 phút' }
        ]
      }
    ],
    quality: [
      { label: 'Độ giòn tan', value: 96, max: 100, unit: '%' },
      { label: 'Độ ngọt thanh', value: 89, max: 100, unit: '%' },
      { label: 'Hương vừng lạc', value: 94, max: 100, unit: '%' },
      { label: 'Đánh giá AI chất lượng', value: 93, max: 100, unit: 'điểm' }
    ],
    grade: 'Hạng Tuyệt Hảo (S-Tier)',
    heritage: [
      {
        title: 'Kẹo Sìu Châu xưa và nay',
        story: 'Nổi tiếng từ thế kỷ 19 tại phố Hàng Sắt, kẹo Sìu Châu của Nam Định mang hương vị thanh tao độc đáo. Tiếng cắn giòn rau ráu cùng hương lạc bùi đọng mãi ở cổ họng làm say đắm bao tao nhân mặc khách.',
        imagePlaceholder: 'heritage_xiuchau_1'
      }
    ],
    flavor: {
      sweet: 75,
      savory: 15,
      aroma: 96,
      bitterness: 2,
      richness: 92
    },
    pairings: [
      {
        title: 'Trà Xanh Thái Nguyên',
        description: 'Vị đắng chát đầm ấm của trà xanh làm dịu đi vị ngọt đậm đà của mạch nha, tôn lên cái ngậy béo của vừng lạc rang.',
        imagePlaceholder: 'pairing_traxanh'
      }
    ],
    theme: {
      primary: '#4A2D1E',
      accent: '#C0965A',
      background: '#FCF6EC'
    }
  },
  'doi': {
    key: 'doi',
    product: {
      code: 'TNHK-KD-2026-0122',
      name: 'Kẹo Dồi',
      grade: 'Hộp Đặc Sản Truyền Thống',
      batch: 'DO-0626-02',
      producedAt: '18/06/2026',
      expiresAt: '18/12/2026',
      origin: '596 Điện Biên - Phường Nam Định - Tỉnh Ninh Bình',
      certificate: 'CERT-TNHK-KD-2026-039',
    },
    checks: [
      'Tem QR chính hãng hoạt động',
      'Mã Serial khớp lô sản xuất DO-0626-02',
      'Bảo quản khô ráo, tránh ánh nắng',
      'Túi đóng kín, giữ nguyên độ giòn',
    ],
    timeline: [
      {
        title: 'Rang chín lạc nhân',
        date: '17/06/2026',
        detail: 'Lạc nhân được tuyển chọn hạt mẩy, rang chín vàng đều, tách vỏ sần sật để làm phần nhân kẹo ngọt bùi béo ngậy.',
        icon: 'Leaf',
        iotData: [
          { label: 'Nhiệt độ rang lạc', value: '150°C' }
        ]
      },
      {
        title: 'Nấu mạch nha & kéo tơ',
        date: '17/06/2026',
        detail: 'Đường kính và mạch nha được nấu đến nhiệt độ chuẩn, sau đó tiến hành kéo tơ và đánh bột nhiều lần để tạo lớp vỏ trắng ngà, giòn tan.',
        icon: 'Layers',
        iotData: [
          { label: 'Nhiệt độ nồi kẹo', value: '120°C' },
          { label: 'Thời gian nấu', value: '10 phút' }
        ]
      },
      {
        title: 'Nhồi nhân lạc & Cuộn kẹo',
        date: '18/06/2026',
        detail: 'Nhân lạc rang giòn được trải đều lên lớp vỏ kẹo mạch nha mỏng, cuộn tròn khéo léo thành hình ống dài thuôn giống chiếc dồi.',
        icon: 'Workflow',
        iotData: [
          { label: 'Nhiệt độ môi trường', value: '25°C' },
          { label: 'Độ ẩm môi trường', value: '58%' }
        ]
      },
      {
        title: 'Cắt khúc & Đóng gói',
        date: '18/06/2026',
        detail: 'Kẹo dồi được cắt thành từng khúc vừa ăn, lăn qua lớp bột nếp thơm nhẹ rồi đóng gói túi zipper giữ độ giòn.',
        icon: 'Flame',
        iotData: [
          { label: 'Độ ẩm đóng gói', value: '< 15%' }
        ]
      }
    ],
    quality: [
      { label: 'Độ giòn tan vỏ kẹo', value: 92, max: 100, unit: '%' },
      { label: 'Độ bùi ngậy lạc rang', value: 95, max: 100, unit: '%' },
      { label: 'Độ dẻo mạch nha', value: 88, max: 100, unit: '%' },
      { label: 'Đánh giá AI chất lượng', value: 90, max: 100, unit: 'điểm' }
    ],
    grade: 'Hạng Đặc Sản Truyền Thống (A)',
    heritage: [
      {
        title: 'Hương vị Kẹo Dồi Nam Định',
        story: 'Kẹo dồi là thức quà quê độc đáo của vùng đất Thành Nam. Tên gọi bắt nguồn từ hình dáng thon dài màu trắng ngà. Lớp vỏ mạch nha kéo mỏng giòn tan, ôm trọn nhân lạc rang bùi ngậy tạo nên hương vị khó quên khi thưởng thức cùng trà nóng.',
        imagePlaceholder: 'heritage_doi_1'
      }
    ],
    flavor: {
      sweet: 85,
      savory: 15,
      aroma: 90,
      bitterness: 5,
      richness: 80
    },
    pairings: [
      {
        title: 'Trà Xanh Thái Nguyên Nóng',
        description: 'Vị chát nhẹ, ấm nóng của trà làm dịu đi vị ngọt sắc của mạch nha, tôn vinh vị bùi thơm của lạc rang.',
        imagePlaceholder: 'pairing_tra'
      },
      {
        title: 'Trà Hoa Cúc Mật Ong',
        description: 'Hương thanh tao tao nhã của hoa cúc kết hợp cùng mạch nha tạo nên sự thư thái tuyệt vời cho buổi thưởng trà.',
        imagePlaceholder: 'pairing_tra_cuc'
      }
    ],
    theme: {
      primary: '#4A2D1E',
      accent: '#C0965A',
      background: '#F7EBDD'
    }
  }
}
