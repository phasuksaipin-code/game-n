/**
 * Career Size Sorting Game Data (เกมเรียงลำดับขนาดอาชีพในฝัน)
 * Supports 2 ordering modes (เล็ก >> ใหญ่ and ใหญ่ >> เล็ก)
 * 17 Careers with 4 size variants each (total 68 cards)
 */

const CAREER_SIZE_MODES = {
  small_to_big: {
    id: "small_to_big",
    name: "เล็ก >> ใหญ่",
    titleTh: "เรียงลำดับเล็กไปหาใหญ่",
    badge: "เล็ก ➔ ใหญ่",
    directionEmoji: "🌱 ➔ 🌳",
    targetOrder: [1, 2, 3, 4],
    slotLabels: ["เล็กสุด (1)", "เล็กกลาง (2)", "ใหญ่กลาง (3)", "ใหญ่สุด (4)"],
    slotSizes: ["เล็กสุด", "เล็กกลาง", "ใหญ่กลาง", "ใหญ่สุด"],
    accentColor: "#10b981",
    tagBg: "#dcfce7",
    textColor: "#065f46"
  },
  big_to_small: {
    id: "big_to_small",
    name: "ใหญ่ >> เล็ก",
    titleTh: "เรียงลำดับใหญ่ไปหาเล็ก",
    badge: "ใหญ่ ➔ เล็ก",
    directionEmoji: "🌳 ➔ 🌱",
    targetOrder: [4, 3, 2, 1],
    slotLabels: ["ใหญ่สุด (1)", "ใหญ่กลาง (2)", "เล็กกลาง (3)", "เล็กสุด (4)"],
    slotSizes: ["ใหญ่สุด", "ใหญ่กลาง", "เล็กกลาง", "เล็กสุด"],
    accentColor: "#ef4444",
    tagBg: "#fee2e2",
    textColor: "#991b1b"
  }
};

const CAREER_SIZE_DATA = [
  {
    id: "postman",
    name: "บุรุษไปรษณีย์",
    nameEn: "Postman",
    emoji: "📮",
    color: "#ef4444",
    speech: "บุรุษไปรษณีย์",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/postman/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/postman/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/postman/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/postman/size_4.jpg" }
    ]
  },
  {
    id: "soldier",
    name: "ทหาร",
    nameEn: "Soldier",
    emoji: "🪖",
    color: "#15803d",
    speech: "ทหารบก",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/soldier/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/soldier/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/soldier/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/soldier/size_4.jpg" }
    ]
  },
  {
    id: "doctor",
    name: "แพทย์หญิง",
    nameEn: "Doctor",
    emoji: "👩‍⚕️",
    color: "#0284c7",
    speech: "คุณหมอ แพทย์หญิง",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/doctor/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/doctor/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/doctor/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/doctor/size_4.jpg" }
    ]
  },
  {
    id: "police",
    name: "ตำรวจ",
    nameEn: "Police Officer",
    emoji: "👮‍♂️",
    color: "#b45309",
    speech: "เจ้าหน้าที่ตำรวจ",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/police/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/police/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/police/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/police/size_4.jpg" }
    ]
  },
  {
    id: "teacher",
    name: "คุณครู",
    nameEn: "Teacher",
    emoji: "👩‍🏫",
    color: "#c2410c",
    speech: "คุณครู",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/teacher/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/teacher/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/teacher/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/teacher/size_4.jpg" }
    ]
  },
  {
    id: "hairdresser",
    name: "ช่างทำผม",
    nameEn: "Hairdresser",
    emoji: "💇‍♀️",
    color: "#ec4899",
    speech: "ช่างทำผม",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/hairdresser/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/hairdresser/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/hairdresser/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/hairdresser/size_4.jpg" }
    ]
  },
  {
    id: "air-technician",
    name: "ช่างแอร์",
    nameEn: "Air Conditioner Tech",
    emoji: "❄️",
    color: "#0369a1",
    speech: "ช่างซ่อมเครื่องปรับอากาศ",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/air-technician/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/air-technician/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/air-technician/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/air-technician/size_4.jpg" }
    ]
  },
  {
    id: "fisherman",
    name: "ชาวประมง",
    nameEn: "Fisherman",
    emoji: "🐟",
    color: "#0d9488",
    speech: "ชาวประมงหาปลา",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/fisherman/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/fisherman/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/fisherman/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/fisherman/size_4.jpg" }
    ]
  },
  {
    id: "icecream",
    name: "พ่อค้าไอศกรีม",
    nameEn: "Ice Cream Vendor",
    emoji: "🍦",
    color: "#3b82f6",
    speech: "พ่อค้าขายไอศกรีม",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/icecream/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/icecream/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/icecream/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/icecream/size_4.jpg" }
    ]
  },
  {
    id: "smoothie",
    name: "แม่ค้าน้ำผลไม้ปั่น",
    nameEn: "Smoothie Vendor",
    emoji: "🥤",
    color: "#16a34a",
    speech: "แม่ค้าขายน้ำผลไม้ปั่น",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/smoothie/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/smoothie/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/smoothie/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/smoothie/size_4.jpg" }
    ]
  },
  {
    id: "squid-vendor",
    name: "พ่อค้าปลาหมึกย่าง",
    nameEn: "Grilled Squid Vendor",
    emoji: "🦑",
    color: "#ea580c",
    speech: "พ่อค้าปลาหมึกย่าง",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/squid-vendor/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/squid-vendor/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/squid-vendor/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/squid-vendor/size_4.jpg" }
    ]
  },
  {
    id: "mechanic",
    name: "ช่างซ่อมมอเตอร์ไซค์",
    nameEn: "Motorcycle Mechanic",
    emoji: "🏍️",
    color: "#dc2626",
    speech: "ช่างซ่อมรถมอเตอร์ไซค์",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/mechanic/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/mechanic/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/mechanic/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/mechanic/size_4.jpg" }
    ]
  },
  {
    id: "farmer",
    name: "ชาวสวนผลไม้",
    nameEn: "Fruit Farmer",
    emoji: "🍎",
    color: "#ca8a04",
    speech: "ชาวสวนผลไม้",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/farmer/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/farmer/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/farmer/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/farmer/size_4.jpg" }
    ]
  },
  {
    id: "cobbler",
    name: "ช่างซ่อมรองเท้า",
    nameEn: "Cobbler",
    emoji: "👞",
    color: "#78350f",
    speech: "ช่างซ่อมรองเท้า",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/cobbler/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/cobbler/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/cobbler/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/cobbler/size_4.jpg" }
    ]
  },
  {
    id: "engineer",
    name: "วิศวกรโรงกลั่น",
    nameEn: "Petrochemical Engineer",
    emoji: "🏭",
    color: "#2563eb",
    speech: "วิศวกรโรงงานปิโตรเคมี",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/engineer/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/engineer/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/engineer/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/engineer/size_4.jpg" }
    ]
  },
  {
    id: "lottery",
    name: "คนขายลอตเตอรี่",
    nameEn: "Lottery Seller",
    emoji: "🎫",
    color: "#db2777",
    speech: "คนขายลอตเตอรี่",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/lottery/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/lottery/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/lottery/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/lottery/size_4.jpg" }
    ]
  },
  {
    id: "cleaner",
    name: "แม่บ้านทำความสะอาด",
    nameEn: "Housekeeper",
    emoji: "🧹",
    color: "#0891b2",
    speech: "แม่บ้านทำความสะอาด",
    cards: [
      { size: 1, label: "เล็กสุด", img: "assets/images/SB_cards/cleaner/size_1.jpg" },
      { size: 2, label: "เล็กกลาง", img: "assets/images/SB_cards/cleaner/size_2.jpg" },
      { size: 3, label: "ใหญ่กลาง", img: "assets/images/SB_cards/cleaner/size_3.jpg" },
      { size: 4, label: "ใหญ่สุด", img: "assets/images/SB_cards/cleaner/size_4.jpg" }
    ]
  }
];
