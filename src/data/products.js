export const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 29990000,
    originalPrice: 34990000,
    discount: 14,
    rating: 4.9,
    reviewCount: 420,
    badge: "Hot Sale",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg",
    colorTheme: "linear-gradient(135deg, #2c2c2e 0%, #1c1c1e 100%)",
    colors: [
      { name: "Titan Tự Nhiên", hex: "#8e857b" },
      { name: "Titan Xanh", hex: "#2f4452" },
      { name: "Titan Trắng", hex: "#e3e4e5" },
      { name: "Titan Đen", hex: "#3b3c3e" }
    ],
    storages: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 6000000 },
      { size: "1TB", priceOffset: 12000000 }
    ],
    description: "iPhone 15 Pro Max nổi bật với khung viền Titan chuẩn vũ trụ siêu bền và nhẹ, nút Tác vụ (Action Button) hoàn toàn mới, hệ thống camera chính 48MP Zoom quang học 5x đỉnh cao, cùng chip A17 Pro tối tân mang lại hiệu năng chơi game chưa từng có.",
    specs: {
      screen: "6.7 inch, Super Retina XDR OLED, 120Hz",
      cpu: "Apple A17 Pro (3nm)",
      ram: "8 GB",
      battery: "4441 mAh, Sạc nhanh 25W",
      camera: "Chính 48MP & Phụ 12MP, 12MP, Zoom 5x",
      os: "iOS 17 (Cập nhật lên iOS 18)",
      weight: "221 g",
      material: "Khung Titan cấp độ 5, Mặt lưng kính nhám"
    },
    highlights: [
      "Khung viền Titanium siêu nhẹ, bền bỉ và sang trọng",
      "Chip A17 Pro đột phá hiệu năng đồ họa và ray tracing",
      "Camera Zoom quang học 5x chụp xa siêu sắc nét",
      "Nút Tác vụ (Action Button) tùy chỉnh thông minh"
    ]
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 27490000,
    originalPrice: 33990000,
    discount: 19,
    rating: 4.8,
    reviewCount: 385,
    badge: "Galaxy AI",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra.jpg",
    colorTheme: "linear-gradient(135deg, #1d2026 0%, #0c0e12 100%)",
    colors: [
      { name: "Titan Vàng", hex: "#d1c7bd" },
      { name: "Titan Tím", hex: "#524f63" },
      { name: "Titan Xám", hex: "#7a7c80" },
      { name: "Titan Đen", hex: "#2b2c2e" }
    ],
    storages: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 3500000 },
      { size: "1TB", priceOffset: 9500000 }
    ],
    description: "Galaxy S24 Ultra mở ra kỷ nguyên điện thoại AI hoàn toàn mới. Thiết kế khung viền Titan siêu cứng cáp, bút S Pen tích hợp tiện lợi, màn hình phẳng độ sáng 2600 nits chống chói tối đa và cảm biến camera 200MP đột phá.",
    specs: {
      screen: "6.8 inch, Dynamic AMOLED 2X, QHD+, 120Hz",
      cpu: "Snapdragon 8 Gen 3 for Galaxy",
      ram: "12 GB",
      battery: "5000 mAh, Sạc nhanh 45W",
      camera: "Chính 200MP & Phụ 50MP, 12MP, 10MP",
      os: "Android 14, One UI 6.1",
      weight: "232 g",
      material: "Khung Titan, Kính Corning Gorilla Armor chống phản chiếu"
    },
    highlights: [
      "Quyền năng AI: Khoanh vùng search, Phiên dịch trực tiếp cuộc gọi",
      "Bút S Pen viết vẽ mượt mà, ghi chú thông minh nhanh chóng",
      "Camera siêu phân giải 200MP kết hợp Zoom mắt thần AI",
      "Màn hình chống phản chiếu cực tốt dưới trời nắng"
    ]
  },
  {
    id: 3,
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 28990000,
    originalPrice: 32990000,
    discount: 12,
    rating: 4.9,
    reviewCount: 154,
    badge: "Leica Camera",
    image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-14-ultra.jpg",
    colorTheme: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
    colors: [
      { name: "Đen Da", hex: "#252525" },
      { name: "Trắng Da", hex: "#eaeaea" }
    ],
    storages: [
      { size: "16GB - 512GB", priceOffset: 0 }
    ],
    description: "Tuyệt tác nhiếp ảnh di động Xiaomi 14 Ultra hợp tác cùng Leica. Trang bị cảm biến 1 inch thế hệ mới, khẩu độ vô cấp cơ học lớn nhất từ trước đến nay, mang lại chất ảnh nghệ thuật chuyên nghiệp như máy ảnh DSLR.",
    specs: {
      screen: "6.73 inch, AMOLED WQHD+, 120Hz, 3000 nits",
      cpu: "Snapdragon 8 Gen 3 (4nm)",
      ram: "16 GB",
      battery: "5000 mAh, Sạc nhanh 90W / Sạc không dây 80W",
      camera: "4 Camera Leica 50MP, Cảm biến chính LYT-900 1 inch",
      os: "Android 14, Xiaomi HyperOS",
      weight: "220 g",
      material: "Mặt lưng da nhân tạo thế hệ mới, Khung nhôm nguyên khối"
    },
    highlights: [
      "Cụm 4 camera Leica 50MP với khẩu độ thay đổi liên tục",
      "Cảm biến chính Sony LYT-900 siêu lớn kích thước 1 inch",
      "Sạc siêu nhanh HyperCharge 90W (đầy pin chỉ trong 33 phút)",
      "Màn hình cong nhẹ đều 4 cạnh vô cực tuyệt mỹ"
    ]
  },
  {
    id: 4,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    price: 18490000,
    originalPrice: 22000000,
    discount: 16,
    rating: 4.7,
    reviewCount: 110,
    badge: "Pure Google",
    image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8-pro.jpg",
    colorTheme: "linear-gradient(135deg, #3d5a80 0%, #293241 100%)",
    colors: [
      { name: "Xanh Bay", hex: "#a1c6ea" },
      { name: "Sứ Trắng", hex: "#f4f1de" },
      { name: "Đen Obsidian", hex: "#2b2d42" }
    ],
    storages: [
      { size: "128GB", priceOffset: 0 },
      { size: "256GB", priceOffset: 2000000 }
    ],
    description: "Google Pixel 8 Pro mang lại trải nghiệm Android thuần khiết và mượt mà nhất. Bộ vi xử lý Google Tensor G3 tùy chỉnh tối ưu cho trí tuệ nhân tạo, kết hợp khả năng xử lý hình ảnh và video độc quyền dẫn đầu thị trường.",
    specs: {
      screen: "6.7 inch, LTPO OLED, 120Hz, 2400 nits",
      cpu: "Google Tensor G3 (4nm) với chip bảo mật Titan M2",
      ram: "12 GB",
      battery: "5050 mAh, Sạc nhanh 30W",
      camera: "Chính 50MP & Phụ 48MP, 48MP, Zoom 5x",
      os: "Android 14 thuần Google (Cập nhật 7 năm)",
      weight: "213 g",
      material: "Mặt lưng kính nhám Gorilla Glass Victus 2, Khung nhôm bóng"
    },
    highlights: [
      "Bộ công cụ AI chỉnh sửa ảnh Magic Editor đột phá",
      "Camera chụp đêm Night Sight huyền thoại sắc nét",
      "Hỗ trợ cập nhật phần mềm Android lên tới 7 năm",
      "Tích hợp cảm biến đo nhiệt độ hữu ích sau máy"
    ]
  },
  {
    id: 5,
    name: "OnePlus 12",
    brand: "OnePlus",
    price: 19990000,
    originalPrice: 23900000,
    discount: 16,
    rating: 4.8,
    reviewCount: 215,
    badge: "Performance Beast",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg",
    colorTheme: "linear-gradient(135deg, #1c352d 0%, #0f1c18 100%)",
    colors: [
      { name: "Xanh Lục Bảo", hex: "#46695f" },
      { name: "Đen Đá Quý", hex: "#1f2022" }
    ],
    storages: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 2500000 }
    ],
    description: "OnePlus 12 định nghĩa lại khái niệm mượt mà với cấu hình cực khủng. Sự kết hợp hoàn hảo giữa chip Snapdragon 8 Gen 3, tản nhiệt buồng hơi siêu lớn Dual Cryo-velocity và camera tinh chỉnh bởi thương hiệu Hasselblad danh tiếng.",
    specs: {
      screen: "6.82 inch, AMOLED 2K+, 120Hz, 4500 nits",
      cpu: "Snapdragon 8 Gen 3 (4nm)",
      ram: "16 GB",
      battery: "5400 mAh, Sạc nhanh SuperVOOC 100W",
      camera: "Chính 50MP Sony LYT-808 & 64MP Tele, 48MP Góc rộng",
      os: "Android 14, OxygenOS 14",
      weight: "220 g",
      material: "Mặt kính cong 3D, Khung kim loại cao cấp"
    },
    highlights: [
      "Màn hình độ sáng kỷ lục thế giới 4500 nits siêu nét",
      "Sạc siêu nhanh 100W đầy pin chỉ trong vòng 26 phút",
      "Màu sắc ảnh chụp tự nhiên độc quyền từ Hasselblad",
      "Dung lượng pin khủng 5400 mAh bền bỉ vượt trội"
    ]
  },
  {
    id: 6,
    name: "iPhone 15",
    brand: "Apple",
    price: 19490000,
    originalPrice: 22990000,
    discount: 15,
    rating: 4.8,
    reviewCount: 512,
    badge: "Best Seller",
    image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg",
    colorTheme: "linear-gradient(135deg, #e8d7f1 0%, #d3bccc 100%)",
    colors: [
      { name: "Hồng Pastel", hex: "#f3d1d5" },
      { name: "Xanh Dương", hex: "#d1e2eb" },
      { name: "Xanh Lá", hex: "#d1ebd8" },
      { name: "Vàng", hex: "#f7f1cd" },
      { name: "Đen", hex: "#323335" }
    ],
    storages: [
      { size: "128GB", priceOffset: 0 },
      { size: "256GB", priceOffset: 3000000 },
      { size: "512GB", priceOffset: 9000000 }
    ],
    description: "iPhone 15 mang lại thiết kế hoàn toàn mới với Dynamic Island thay thế phần tai thỏ, mặt lưng kính pha màu mịn màng, camera chính nâng cấp vượt trội lên 48MP sắc nét và cổng sạc USB-C phổ dụng hiện đại.",
    specs: {
      screen: "6.1 inch, Super Retina XDR OLED, 60Hz",
      cpu: "Apple A16 Bionic (4nm)",
      ram: "6 GB",
      battery: "3349 mAh, Sạc nhanh 20W",
      camera: "Chính 48MP & Phụ 12MP, Zoom 2x quang học",
      os: "iOS 17 (Cập nhật lên iOS 18)",
      weight: "171 g",
      material: "Mặt lưng kính pha màu nhám mịn, Khung nhôm hàng không"
    },
    highlights: [
      "Đảo thích ứng (Dynamic Island) thông minh cực tiện dụng",
      "Thiết kế kính pha màu độc đáo cực kỳ trẻ trung và cuốn hút",
      "Camera 48MP nâng cấp chụp chi tiết cực cao và chân dung tự động",
      "Chuyển đổi sang cổng USB-C tiện lợi dùng chung dây sạc"
    ]
  },
  {
    id: 7,
    name: "Samsung Galaxy Z Fold5",
    brand: "Samsung",
    price: 31990000,
    originalPrice: 40990000,
    discount: 22,
    rating: 4.7,
    reviewCount: 94,
    badge: "Folding Tech",
    image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-z-fold5.jpg",
    colorTheme: "linear-gradient(135deg, #2a2e3d 0%, #151821 100%)",
    colors: [
      { name: "Xanh Kem", hex: "#a4b4c4" },
      { name: "Đen Phantom", hex: "#1c1d21" },
      { name: "Kem Ivory", hex: "#eae6dc" }
    ],
    storages: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 3000000 }
    ],
    description: "Galaxy Z Fold5 mở ra chân trời đa nhiệm mới với thiết kế gập không kẽ hở nhờ bản lề Flex cải tiến. Màn hình cực lớn 7.6 inch rực rỡ khi mở ra giúp bạn làm việc, giải trí mượt mà cùng lúc nhiều ứng dụng.",
    specs: {
      screen: "Chính 7.6 inch, Phụ 6.2 inch, Dynamic AMOLED 2X, 120Hz",
      cpu: "Snapdragon 8 Gen 2 for Galaxy",
      ram: "12 GB",
      battery: "4400 mAh, Sạc nhanh 25W",
      camera: "Chính 50MP & Phụ 12MP, 10MP, 10MP (Cover)",
      os: "Android 13, One UI 5.1.1",
      weight: "253 g",
      material: "Bản lề Flex gập khít, Khung Armor Aluminum cường lực"
    },
    highlights: [
      "Bản lề Flex gập khít hoàn toàn giúp máy mỏng nhẹ hơn",
      "Trải nghiệm không gian làm việc đa nhiệm như PC thu nhỏ",
      "Tương thích hoàn hảo bút S Pen Fold Edition ghi chú",
      "Hệ thống camera 3 cảm biến flagship quay chụp xuất sắc"
    ]
  },
  {
    id: 8,
    name: "Sony Xperia 1 VI",
    brand: "Sony",
    price: 26990000,
    originalPrice: 29990000,
    discount: 10,
    rating: 4.6,
    reviewCount: 78,
    badge: "Pro Creator",
    image: "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-vi.jpg",
    colorTheme: "linear-gradient(135deg, #383a35 0%, #20211e 100%)",
    colors: [
      { name: "Xanh Khaki", hex: "#4a4f44" },
      { name: "Đen Cát", hex: "#242526" },
      { name: "Bạc Bạch Kim", hex: "#cfd1cf" }
    ],
    storages: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 4000000 }
    ],
    description: "Dành riêng cho những nhà sáng tạo nội dung chuyên nghiệp, Sony Xperia 1 VI mang lại chất lượng hiển thị chuẩn rạp chiếu phim, âm thanh Hi-Res chất lượng cao cùng cụm camera zoom quang học liên tục thực thụ.",
    specs: {
      screen: "6.5 inch, OLED Bravia HDR, 120Hz, tỷ lệ 19.5:9",
      cpu: "Snapdragon 8 Gen 3 (4nm)",
      ram: "12 GB",
      battery: "5000 mAh, Sạc nhanh 30W",
      camera: "Chính 48MP Exmor T & Tele zoom liên tục 85-170mm 12MP",
      os: "Android 14",
      weight: "192 g",
      material: "Kính cường lực vân xúc giác chống trượt, Khung kim loại xẻ rãnh"
    },
    highlights: [
      "Ống kính Zoom quang học liên tục 85mm đến 170mm cực đỉnh",
      "Màn hình OLED ứng dụng công nghệ TV Bravia rực rỡ chân thực",
      "Mặt kính sau có vân nhám xúc giác bám tay cực kỳ cá tính",
      "Giữ nguyên jack cắm tai nghe 3.5mm chất lượng âm thanh Audiophile"
    ]
  },
  {
    id: 9,
    name: "ASUS ROG Phone 8 Pro",
    brand: "Asus",
    price: 25490000,
    originalPrice: 28990000,
    discount: 12,
    rating: 4.9,
    reviewCount: 142,
    badge: "Ultimate Gaming",
    image: "https://fdn2.gsmarena.com/vv/bigpic/asus-rog-phone-8-pro.jpg",
    colorTheme: "linear-gradient(135deg, #111111 0%, #000000 100%)",
    colors: [
      { name: "Phantom Black", hex: "#151516" }
    ],
    storages: [
      { size: "16GB - 512GB", priceOffset: 0 },
      { size: "24GB - 1TB", priceOffset: 7000000 }
    ],
    description: "ASUS ROG Phone 8 Pro là cỗ máy chiến game tối thượng. Thiết kế mỏng nhẹ hơn nhiều nhưng lại sở hữu cấu hình mạnh nhất thị trường, màn hình phụ AniMe Vision độc đáo hiển thị LED phía sau lưng máy cực kỳ cá tính.",
    specs: {
      screen: "6.78 inch, Samsung Flexible AMOLED, 165Hz, LTPO",
      cpu: "Snapdragon 8 Gen 3 kết hợp tản nhiệt AeroActive",
      ram: "16 GB / 24 GB",
      battery: "5500 mAh, Sạc nhanh HyperCharge 65W",
      camera: "Chính 50MP chống rung Gimbal & Phụ 32MP, 13MP",
      os: "Android 14 với giao diện ROG UI",
      weight: "225 g",
      material: "Kính nhám mờ, Mặt lưng LED hiển thị độc quyền, Khung kim loại"
    },
    highlights: [
      "Màn hình tần số quét 165Hz siêu mượt dành riêng cho game thủ",
      "Mặt lưng LED AniMe Vision lập trình hoạt ảnh tùy biến ấn tượng",
      "Hệ thống nút bấm siêu âm AirTrigger nhạy bén như tay cầm console",
      "Hệ thống tản nhiệt buồng hơi thế mới 360 độ cực mát"
    ]
  },
  {
    id: 10,
    name: "OPPO Find X7 Ultra",
    brand: "Oppo",
    price: 23990000,
    originalPrice: 27990000,
    discount: 14,
    rating: 4.8,
    reviewCount: 89,
    badge: "Dual Periscope",
    image: "https://fdn2.gsmarena.com/vv/bigpic/oppo-find-x7-ultra.jpg",
    colorTheme: "linear-gradient(135deg, #193140 0%, #0d1a21 100%)",
    colors: [
      { name: "Xanh Đại Dương", hex: "#233948" },
      { name: "Nâu Da Bò", hex: "#9f7a55" },
      { name: "Đen Đuôi Ngựa", hex: "#202123" }
    ],
    storages: [
      { size: "12GB - 256GB", priceOffset: 0 },
      { size: "16GB - 512GB", priceOffset: 3000000 }
    ],
    description: "Điện thoại sở hữu 2 ống kính tiềm vọng đầu tiên trên thế giới. OPPO Find X7 Ultra sở hữu thiết kế kết hợp hai chất liệu da sinh học và kính bóng bẩy cao cấp, cùng sự đồng hành của huyền thoại màu sắc Hasselblad.",
    specs: {
      screen: "6.82 inch, AMOLED 2K QHD+, 120Hz, 4500 nits",
      cpu: "Snapdragon 8 Gen 3 (4nm)",
      ram: "16 GB",
      battery: "5000 mAh, Sạc nhanh SuperVOOC 100W",
      camera: "4 Camera 50MP gồm 2 camera tiềm vọng Zoom 3x và Zoom 6x",
      os: "Android 14, ColorOS 14",
      weight: "221 g",
      material: "Mặt lưng nửa kính nửa da sang trọng, Khung nhôm"
    },
    highlights: [
      "Bộ đôi camera tiềm vọng 3x và 6x đột phá zoom siêu chi tiết",
      "Thiết kế sang trọng kết hợp hoàn hảo giữa kính và da cao cấp",
      "Hệ thống xử lý hình ảnh HyperTone tái tạo vùng sáng tối tự nhiên",
      "Sạc nhanh có dây 100W và sạc nhanh không dây 50W cực đỉnh"
    ]
  }
];
