/**
 * Jigsaw Puzzle Data: 4 Seasons for Preschoolers
 * High-resolution artwork: 1536 x 1024
 */
const JIGSAW_SEASONS = [
  {
    id: 'autumn',
    name: 'ฤดูใบไม้ร่วง',
    nameEn: 'Autumn',
    emoji: '🍂',
    badgeColor: '#EA580C',
    bgGradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
    description: 'จิ๊กซอว์คลาสสิก 4 ชิ้น (มีเขี้ยวล็อก)',
    image: 'assets/images/jigsaw/S__66052234.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (เด็กชายใบไม้แดง)',
        path: 'M 14 13 L 769 13 L 769 290 C 740 310, 650 310, 654 370 C 658 430, 740 430, 769 450 L 769 518 L 270 518 C 255 490, 245 424, 200 424 C 155 424, 145 490, 130 518 L 14 518 Z',
        bbox: { minX: 14, minY: 13, width: 755, height: 505 },
        targetCenter: { x: 391, y: 265 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-ขวา (ป้ายข้อความ & ภูเขา)',
        path: 'M 769 13 L 1524 13 L 1524 518 L 1400 518 C 1385 490, 1375 424, 1330 424 C 1285 424, 1275 490, 1260 518 L 769 518 L 769 450 C 740 430, 658 430, 654 370 C 650 310, 740 310, 769 290 Z',
        bbox: { minX: 654, minY: 13, width: 870, height: 505 },
        targetCenter: { x: 1146, y: 265 }
      },
      {
        id: 2,
        title: 'ชิ้นล่าง-ซ้าย (กองใบไม้ & รองเท้า)',
        path: 'M 14 518 L 130 518 C 145 490, 155 424, 200 424 C 245 424, 255 490, 270 518 L 769 518 L 769 650 C 740 670, 650 670, 652 740 C 654 810, 740 810, 769 830 L 769 1010 L 14 1010 Z',
        bbox: { minX: 14, minY: 424, width: 755, height: 586 },
        targetCenter: { x: 391, y: 764 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ขวา (เด็กหญิงใบไม้ทอง)',
        path: 'M 769 518 L 1260 518 C 1275 490, 1285 424, 1330 424 C 1375 424, 1385 490, 1400 518 L 1524 518 L 1524 1010 L 769 1010 L 769 830 C 740 810, 654 810, 652 740 C 650 670, 740 670, 769 650 Z',
        bbox: { minX: 652, minY: 424, width: 872, height: 586 },
        targetCenter: { x: 1146, y: 764 }
      }
    ]
  },
  {
    id: 'summer',
    name: 'ฤดูร้อน',
    nameEn: 'Summer',
    emoji: '☀️',
    badgeColor: '#D97706',
    bgGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    description: 'จิ๊กซอว์ตาราง 6 ชิ้น (ริมหาดแสนสดใส)',
    image: 'assets/images/jigsaw/S__66052232.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (ต้นมะพร้าว)',
        path: 'M 20 16 L 518 16 L 518 511 L 20 511 Z',
        bbox: { minX: 20, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 269, y: 263 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-กลาง (พระอาทิตย์ & ป้ายฤดูร้อน)',
        path: 'M 518 16 L 1016 16 L 1016 511 L 518 511 Z',
        bbox: { minX: 518, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 767, y: 263 }
      },
      {
        id: 2,
        title: 'ชิ้นบน-ขวา (ทิวเขา & ร่มหมวก)',
        path: 'M 1016 16 L 1514 16 L 1514 511 L 1016 511 Z',
        bbox: { minX: 1016, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 1265, y: 263 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ซ้าย (เด็กชาย & ลูกบอลชายหาด)',
        path: 'M 20 511 L 518 511 L 518 1006 L 20 1006 Z',
        bbox: { minX: 20, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 269, y: 758 }
      },
      {
        id: 4,
        title: 'ชิ้นล่าง-กลาง (เรือหางยาว & เปลือกหอย)',
        path: 'M 518 511 L 1016 511 L 1016 1006 L 518 1006 Z',
        bbox: { minX: 518, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 767, y: 758 }
      },
      {
        id: 5,
        title: 'ชิ้นล่าง-ขวา (เด็กหญิงชุดดอกไม้)',
        path: 'M 1016 511 L 1514 511 L 1514 1006 L 1016 1006 Z',
        bbox: { minX: 1016, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 1265, y: 758 }
      }
    ]
  },
  {
    id: 'winter',
    name: 'ฤดูหนาว',
    nameEn: 'Winter',
    emoji: '❄️',
    badgeColor: '#2563EB',
    bgGradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
    description: 'จิ๊กซอว์แถบคลื่น 5 ชิ้น (ตามแนวเส้นประ)',
    image: 'assets/images/jigsaw/S__66052236.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'แถบที่ 1 (ต้นสน, เกล็ดหิมะ & รั้วไม้)',
        pieceImage: 'assets/images/jigsaw/pieces/winter_piece_1_trees_left.png',
        path: 'M 18 14 L 227.9 14 L 240.4 40 L 265.0 70 L 291.2 100 L 309.2 130 L 313.0 150 L 304.7 180 L 282.9 210 L 256.1 240 L 234.3 270 L 226.0 300 L 234.3 330 L 256.1 360 L 282.9 390 L 304.7 420 L 313.0 450 L 304.7 480 L 282.9 510 L 256.1 540 L 234.3 570 L 226.0 600 L 234.3 630 L 256.1 660 L 282.9 690 L 304.7 720 L 313.0 750 L 304.7 780 L 282.9 810 L 256.1 840 L 234.3 870 L 226.0 900 L 234.3 930 L 256.1 960 L 282.9 990 L 298.6 1010 L 18 1010 Z',
        bbox: { minX: 18, minY: 14, width: 295, height: 996 },
        targetCenter: { x: 165, y: 512 }
      },
      {
        id: 1,
        title: 'แถบที่ 2 (เด็กชายชุดกันหนาวสีน้ำเงิน)',
        pieceImage: 'assets/images/jigsaw/pieces/winter_piece_2_boy_blue.png',
        path: 'M 227.9 14 L 570.9 14 L 583.4 40 L 608.0 70 L 634.2 100 L 652.2 130 L 656.0 150 L 647.7 180 L 625.9 210 L 599.1 240 L 577.3 270 L 569.0 300 L 577.3 330 L 599.1 360 L 625.9 390 L 647.7 420 L 656.0 450 L 647.7 480 L 625.9 510 L 599.1 540 L 577.3 570 L 569.0 600 L 577.3 630 L 599.1 660 L 625.9 690 L 647.7 720 L 656.0 750 L 647.7 780 L 625.9 810 L 599.1 840 L 577.3 870 L 569.0 900 L 577.3 930 L 599.1 960 L 625.9 990 L 641.6 1010 L 298.6 1010 L 282.9 990 L 256.1 960 L 234.3 930 L 226.0 900 L 234.3 870 L 256.1 840 L 282.9 810 L 304.7 780 L 313.0 750 L 304.7 720 L 282.9 690 L 256.1 660 L 234.3 630 L 226.0 600 L 234.3 570 L 256.1 540 L 282.9 510 L 304.7 480 L 313.0 450 L 304.7 420 L 282.9 390 L 256.1 360 L 234.3 330 L 226.0 300 L 234.3 270 L 256.1 240 L 282.9 210 L 304.7 180 L 313.0 150 L 309.2 130 L 291.2 100 L 265.0 70 L 240.4 40 L 227.9 14 Z',
        bbox: { minX: 226, minY: 14, width: 430, height: 996 },
        targetCenter: { x: 441, y: 512 }
      },
      {
        id: 2,
        title: 'แถบที่ 3 (สโนว์แมน & ป้ายฤดูหนาว)',
        pieceImage: 'assets/images/jigsaw/pieces/winter_piece_3_snowman_center.png',
        path: 'M 570.9 14 L 901.9 14 L 914.4 40 L 939.0 70 L 965.2 100 L 983.2 130 L 987.0 150 L 978.7 180 L 956.9 210 L 930.1 240 L 908.3 270 L 900.0 300 L 908.3 330 L 930.1 360 L 956.9 390 L 978.7 420 L 987.0 450 L 978.7 480 L 956.9 510 L 930.1 540 L 908.3 570 L 900.0 600 L 908.3 630 L 930.1 660 L 956.9 690 L 978.7 720 L 987.0 750 L 978.7 780 L 956.9 810 L 930.1 840 L 908.3 870 L 900.0 900 L 908.3 930 L 930.1 960 L 956.9 990 L 972.6 1010 L 641.6 1010 L 625.9 990 L 599.1 960 L 577.3 930 L 569.0 900 L 577.3 870 L 599.1 840 L 625.9 810 L 647.7 780 L 656.0 750 L 647.7 720 L 625.9 690 L 599.1 660 L 577.3 630 L 569.0 600 L 577.3 570 L 599.1 540 L 625.9 510 L 647.7 480 L 656.0 450 L 647.7 420 L 625.9 390 L 599.1 360 L 577.3 330 L 569.0 300 L 577.3 270 L 599.1 240 L 625.9 210 L 647.7 180 L 656.0 150 L 652.2 130 L 634.2 100 L 608.0 70 L 583.4 40 L 570.9 14 Z',
        bbox: { minX: 569, minY: 14, width: 418, height: 996 },
        targetCenter: { x: 778, y: 512 }
      },
      {
        id: 3,
        title: 'แถบที่ 4 (เด็กหญิงชุดกันหนาวสีชมพู)',
        pieceImage: 'assets/images/jigsaw/pieces/winter_piece_4_girl_pink.png',
        path: 'M 901.9 14 L 1253.4 14 L 1265.9 40 L 1290.5 70 L 1316.8 100 L 1334.7 130 L 1338.5 150 L 1330.2 180 L 1308.4 210 L 1281.6 240 L 1259.8 270 L 1251.5 300 L 1259.8 330 L 1281.6 360 L 1308.4 390 L 1330.2 420 L 1338.5 450 L 1330.2 480 L 1308.4 510 L 1281.6 540 L 1259.8 570 L 1251.5 600 L 1259.8 630 L 1281.6 660 L 1308.4 690 L 1330.2 720 L 1338.5 750 L 1330.2 780 L 1308.4 810 L 1281.6 840 L 1259.8 870 L 1251.5 900 L 1259.8 930 L 1281.6 960 L 1308.4 990 L 1324.1 1010 L 972.6 1010 L 956.9 990 L 930.1 960 L 908.3 930 L 900.0 900 L 908.3 870 L 930.1 840 L 956.9 810 L 978.7 780 L 987.0 750 L 978.7 720 L 956.9 690 L 930.1 660 L 908.3 630 L 900.0 600 L 908.3 570 L 930.1 540 L 956.9 510 L 978.7 480 L 987.0 450 L 978.7 420 L 956.9 390 L 930.1 360 L 908.3 330 L 900.0 300 L 908.3 270 L 930.1 240 L 956.9 210 L 978.7 180 L 987.0 150 L 983.2 130 L 965.2 100 L 939.0 70 L 914.4 40 L 901.9 14 Z',
        bbox: { minX: 900, minY: 14, width: 439, height: 996 },
        targetCenter: { x: 1119, y: 512 }
      },
      {
        id: 4,
        title: 'แถบที่ 5 (กระท่อมไม้กลางหิมะ & ป่าสน)',
        pieceImage: 'assets/images/jigsaw/pieces/winter_piece_5_cabin_right.png',
        path: 'M 1253.4 14 L 1518 14 L 1518 1010 L 1324.1 1010 L 1308.4 990 L 1281.6 960 L 1259.8 930 L 1251.5 900 L 1259.8 870 L 1281.6 840 L 1308.4 810 L 1330.2 780 L 1338.5 750 L 1330.2 720 L 1308.4 690 L 1281.6 660 L 1259.8 630 L 1251.5 600 L 1259.8 570 L 1281.6 540 L 1308.4 510 L 1330.2 480 L 1338.5 450 L 1330.2 420 L 1308.4 390 L 1281.6 360 L 1259.8 330 L 1251.5 300 L 1259.8 270 L 1281.6 240 L 1308.4 210 L 1330.2 180 L 1338.5 150 L 1334.7 130 L 1316.8 100 L 1290.5 70 L 1265.9 40 L 1253.4 14 Z',
        bbox: { minX: 1251, minY: 14, width: 267, height: 996 },
        targetCenter: { x: 1385, y: 512 }
      }
    ]
  },
  {
    id: 'rainy',
    name: 'ฤดูฝน',
    nameEn: 'Rainy',
    emoji: '🌧️',
    badgeColor: '#0284C7',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
    description: 'จิ๊กซอว์เรขาคณิต 5 ชิ้น (ตามแนวเส้นประ)',
    image: 'assets/images/jigsaw/S__66052233.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (ก้อนเมฆ & ฝนตก)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_1_cloud_left.png',
        path: 'M 18 13 L 768 13 L 18 340 Z',
        bbox: { minX: 18, minY: 13, width: 750, height: 327 },
        targetCenter: { x: 268, y: 122 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-ขวา (สายรุ้ง & ก้อนเมฆยิ้ม)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_2_rainbow_right.png',
        path: 'M 768 13 L 1518 13 L 1518 340 Z',
        bbox: { minX: 768, minY: 13, width: 750, height: 327 },
        targetCenter: { x: 1268, y: 122 }
      },
      {
        id: 2,
        title: 'ชิ้นล่าง-ซ้าย (ดอกไม้สีม่วง & หญ้าเขียว)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_3_flower_left.png',
        path: 'M 18 340 L 280 1010 L 18 1010 Z',
        bbox: { minX: 18, minY: 340, width: 262, height: 670 },
        targetCenter: { x: 105, y: 787 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ขวา (โขดหิน & พุ่มไม้ริมน้ำ)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_4_rock_right.png',
        path: 'M 1518 340 L 1518 1010 L 1256 1010 Z',
        bbox: { minX: 1256, minY: 340, width: 262, height: 670 },
        targetCenter: { x: 1431, y: 787 }
      },
      {
        id: 4,
        title: 'ชิ้นกลางรูปหกเหลี่ยม (เด็กชายหญิงกางร่ม & ลูกเป็ด)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_5_center_kids.png',
        path: 'M 768 13 L 1518 340 L 1256 1010 L 280 1010 L 18 340 Z',
        bbox: { minX: 18, minY: 13, width: 1500, height: 997 },
        targetCenter: { x: 768, y: 550 }
      }
    ]
  }
];
