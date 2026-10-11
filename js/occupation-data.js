/**
 * Occupation Matching Game Data (เกมจับคู่อาชีพและสถานที่ 10 หน้า หน้าละ 4 อาชีพ)
 * Master Data: 26 อาชีพแท้จริง สกัดภาพคมชัดจากรูปภาพที่คุณครูอัปโหลด
 * Progression: 10 หน้า × หน้าละ 4 อาชีพ = รวม 40 ภารกิจจับคู่
 */

const OCCUPATIONS_MASTER = {
  teacher: {
    id: 'teacher',
    nameTh: 'คุณครู',
    nameEn: 'Teacher',
    workplaceTh: 'ห้องสมุดโรงเรียน',
    workplaceEn: 'School Library',
    charImg: 'assets/images/occupations/char_teacher.png?v=2',
    placeImg: 'assets/images/occupations/place_teacher.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_teacher.png?v=2',
    speech: 'คุณครู ทำงานที่ ห้องสมุดโรงเรียน',
    color: '#eab308',
    gradient: 'linear-gradient(135deg, #fef08a 0%, #facc15 100%)',
    emoji: '👩‍🏫'
  },
  police: {
    id: 'police',
    nameTh: 'คุณตำรวจ',
    nameEn: 'Police Officer',
    workplaceTh: 'สถานีตำรวจ',
    workplaceEn: 'Police Station',
    charImg: 'assets/images/occupations/char_police.png?v=2',
    placeImg: 'assets/images/occupations/place_police.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_police.png?v=2',
    speech: 'คุณตำรวจ ทำงานที่ สถานีตำรวจ',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #bfdbfe 0%, #60a5fa 100%)',
    emoji: '👮‍♂️'
  },
  postman: {
    id: 'postman',
    nameTh: 'บุรุษไปรษณีย์',
    nameEn: 'Mail Carrier',
    workplaceTh: 'ที่ทำการไปรษณีย์',
    workplaceEn: 'Post Office',
    charImg: 'assets/images/occupations/char_postman.png?v=2',
    placeImg: 'assets/images/occupations/place_postman.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_postman.png?v=2',
    speech: 'บุรุษไปรษณีย์ ทำงานที่ ที่ทำการไปรษณีย์',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #fecaca 0%, #f87171 100%)',
    emoji: '📬'
  },
  chef: {
    id: 'chef',
    nameTh: 'เชฟพ่อครัว',
    nameEn: 'Chef',
    workplaceTh: 'ห้องครัวภัตตาคาร',
    workplaceEn: 'Restaurant Kitchen',
    charImg: 'assets/images/occupations/char_chef.png?v=2',
    placeImg: 'assets/images/occupations/place_chef.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_chef.png?v=2',
    speech: 'เชฟพ่อครัว ทำงานที่ ห้องครัวภัตตาคาร',
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)',
    emoji: '👨‍🍳'
  },
  soldier: {
    id: 'soldier',
    nameTh: 'ทหารบก',
    nameEn: 'Soldier',
    workplaceTh: 'ค่ายทหาร',
    workplaceEn: 'Military Base',
    charImg: 'assets/images/occupations/char_soldier.png?v=2',
    placeImg: 'assets/images/occupations/place_soldier.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_soldier.png?v=2',
    speech: 'ทหารบก ทำงานที่ ค่ายทหาร',
    color: '#15803d',
    gradient: 'linear-gradient(135deg, #bbf7d0 0%, #4ade80 100%)',
    emoji: '🪖'
  },
  vet: {
    id: 'vet',
    nameTh: 'สัตวแพทย์',
    nameEn: 'Veterinarian',
    workplaceTh: 'คลินิกรักษาสัตว์',
    workplaceEn: 'Veterinary Clinic',
    charImg: 'assets/images/occupations/char_vet.png?v=2',
    placeImg: 'assets/images/occupations/place_vet.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_vet.png?v=2',
    speech: 'สัตวแพทย์ ทำงานที่ คลินิกรักษาสัตว์',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #a5f3fc 0%, #22d3ee 100%)',
    emoji: '🩺'
  },
  dentist: {
    id: 'dentist',
    nameTh: 'ทันตแพทย์',
    nameEn: 'Dentist',
    workplaceTh: 'คลินิกทันตกรรม',
    workplaceEn: 'Dental Clinic',
    charImg: 'assets/images/occupations/char_dentist.png?v=2',
    placeImg: 'assets/images/occupations/place_dentist.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_dentist.png?v=2',
    speech: 'ทันตแพทย์ ทำงานที่ คลินิกทันตกรรม',
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, #bae6fd 0%, #38bdf8 100%)',
    emoji: '🦷'
  },
  lifeguard: {
    id: 'lifeguard',
    nameTh: 'เจ้าหน้าที่กู้ภัยชายหาด',
    nameEn: 'Beach Lifeguard',
    workplaceTh: 'หอกู้ภัยชายหาด',
    workplaceEn: 'Beach Rescue Station',
    charImg: 'assets/images/occupations/char_lifeguard.png?v=2',
    placeImg: 'assets/images/occupations/place_lifeguard.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_lifeguard.png?v=2',
    speech: 'เจ้าหน้าที่กู้ภัย ทำงานที่ หอกู้ภัยชายหาด',
    color: '#ea580c',
    gradient: 'linear-gradient(135deg, #ffedd5 0%, #fb923c 100%)',
    emoji: '🛟'
  },
  pilot: {
    id: 'pilot',
    nameTh: 'นักบิน',
    nameEn: 'Pilot',
    workplaceTh: 'ท่าอากาศยาน',
    workplaceEn: 'Airport',
    charImg: 'assets/images/occupations/char_pilot.png?v=2',
    placeImg: 'assets/images/occupations/place_pilot.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_pilot.png?v=2',
    speech: 'นักบิน ทำงานที่ ท่าอากาศยาน',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #dbeafe 0%, #60a5fa 100%)',
    emoji: '✈️'
  },
  captain: {
    id: 'captain',
    nameTh: 'กัปตันเรือเดินสมุทร',
    nameEn: 'Ship Captain',
    workplaceTh: 'ท่าเรือเดินสมุทร',
    workplaceEn: 'Harbor Port',
    charImg: 'assets/images/occupations/char_captain.png?v=2',
    placeImg: 'assets/images/occupations/place_captain.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_captain.png?v=2',
    speech: 'กัปตันเรือ ทำงานที่ ท่าเรือเดินสมุทร',
    color: '#0369a1',
    gradient: 'linear-gradient(135deg, #e0f2fe 0%, #38bdf8 100%)',
    emoji: '⚓'
  },
  bus_driver: {
    id: 'bus_driver',
    nameTh: 'คนขับรถบัส',
    nameEn: 'Bus Driver',
    workplaceTh: 'สถานีขนส่งผู้โดยสาร',
    workplaceEn: 'Bus Terminal',
    charImg: 'assets/images/occupations/char_bus_driver.png?v=2',
    placeImg: 'assets/images/occupations/place_bus_driver.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_bus_driver.png?v=2',
    speech: 'คนขับรถบัส ทำงานที่ สถานีขนส่งผู้โดยสาร',
    color: '#4f46e5',
    gradient: 'linear-gradient(135deg, #e0e7ff 0%, #818cf8 100%)',
    emoji: '🚌'
  },
  mechanic: {
    id: 'mechanic',
    nameTh: 'ช่างซ่อมรถยนต์',
    nameEn: 'Auto Mechanic',
    workplaceTh: 'อู่ซ่อมรถยนต์',
    workplaceEn: 'Auto Garage',
    charImg: 'assets/images/occupations/char_mechanic.png?v=2',
    placeImg: 'assets/images/occupations/place_mechanic.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_mechanic.png?v=2',
    speech: 'ช่างซ่อมรถยนต์ ทำงานที่ อู่ซ่อมรถยนต์',
    color: '#d97706',
    gradient: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)',
    emoji: '🔧'
  },
  farmer: {
    id: 'farmer',
    nameTh: 'ชาวสวนผัก',
    nameEn: 'Vegetable Farmer',
    workplaceTh: 'ฟาร์มเกษตรกรรม',
    workplaceEn: 'Vegetable Farm',
    charImg: 'assets/images/occupations/char_farmer.png?v=2',
    placeImg: 'assets/images/occupations/place_farmer.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_farmer.png?v=2',
    speech: 'ชาวสวนผัก ทำงานที่ ฟาร์มเกษตรกรรม',
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #dcfce7 0%, #4ade80 100%)',
    emoji: '🥕'
  },
  farmer_rice: {
    id: 'farmer_rice',
    nameTh: 'ชาวนาผู้ปลูกข้าว',
    nameEn: 'Rice Farmer',
    workplaceTh: 'ทุ่งนาสีทอง',
    workplaceEn: 'Rice Paddy Field',
    charImg: 'assets/images/occupations/char_farmer_rice.png?v=2',
    placeImg: 'assets/images/occupations/place_farmer_rice.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_farmer_rice.png?v=2',
    speech: 'ชาวนา ทำงานที่ ทุ่งนาสีทอง',
    color: '#ca8a04',
    gradient: 'linear-gradient(135deg, #fef9c3 0%, #eab308 100%)',
    emoji: '🌾'
  },
  farmer_combine: {
    id: 'farmer_combine',
    nameTh: 'ชาวนารถเกี่ยวข้าว',
    nameEn: 'Combine Farmer',
    workplaceTh: 'ทุ่งนาเก็บเกี่ยว',
    workplaceEn: 'Harvest Field',
    charImg: 'assets/images/occupations/char_farmer_combine.png?v=2',
    placeImg: 'assets/images/occupations/place_farmer_combine.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_farmer_combine.png?v=2',
    speech: 'ชาวนารถเกี่ยวข้าว ทำงานที่ ทุ่งนาเก็บเกี่ยว',
    color: '#854d0e',
    gradient: 'linear-gradient(135deg, #fef08a 0%, #d97706 100%)',
    emoji: '🚜'
  },
  fisherman: {
    id: 'fisherman',
    nameTh: 'ชาวประมง',
    nameEn: 'Fisherman',
    workplaceTh: 'ท่าเรือประมง',
    workplaceEn: 'Fishing Harbor',
    charImg: 'assets/images/occupations/char_fisherman.png?v=2',
    placeImg: 'assets/images/occupations/place_fisherman.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_fisherman.png?v=2',
    speech: 'ชาวประมง ทำงานที่ ท่าเรือประมง',
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, #bae6fd 0%, #0284c7 100%)',
    emoji: '🐟'
  },
  baker: {
    id: 'baker',
    nameTh: 'คนทำขนมปัง',
    nameEn: 'Baker',
    workplaceTh: 'ร้านเบเกอรี่',
    workplaceEn: 'Bakery',
    charImg: 'assets/images/occupations/char_baker.png?v=2',
    placeImg: 'assets/images/occupations/place_baker.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_baker.png?v=2',
    speech: 'คนทำขนมปัง ทำงานที่ ร้านเบเกอรี่',
    color: '#ea580c',
    gradient: 'linear-gradient(135deg, #ffedd5 0%, #fb923c 100%)',
    emoji: '🥐'
  },
  hairdresser: {
    id: 'hairdresser',
    nameTh: 'ช่างเสริมสวย',
    nameEn: 'Hairdresser',
    workplaceTh: 'ร้านเสริมสวย',
    workplaceEn: 'Beauty Salon',
    charImg: 'assets/images/occupations/char_hairdresser.png?v=2',
    placeImg: 'assets/images/occupations/place_hairdresser.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_hairdresser.png?v=2',
    speech: 'ช่างเสริมสวย ทำงานที่ ร้านเสริมสวย',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #f472b6 100%)',
    emoji: '✂️'
  },
  barber: {
    id: 'barber',
    nameTh: 'ช่างตัดผมชาย',
    nameEn: 'Barber',
    workplaceTh: 'ร้านตัดผมชาย',
    workplaceEn: 'Barbershop',
    charImg: 'assets/images/occupations/char_barber.png?v=2',
    placeImg: 'assets/images/occupations/place_barber.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_barber.png?v=2',
    speech: 'ช่างตัดผมชาย ทำงานที่ ร้านตัดผมชาย',
    color: '#0d9488',
    gradient: 'linear-gradient(135deg, #ccfbf1 0%, #2dd4bf 100%)',
    emoji: '💈'
  },
  clerk: {
    id: 'clerk',
    nameTh: 'พนักงานร้านสะดวกซื้อ',
    nameEn: 'Store Clerk',
    workplaceTh: 'ร้านสะดวกซื้อ',
    workplaceEn: 'Convenience Store',
    charImg: 'assets/images/occupations/char_clerk.png?v=2',
    placeImg: 'assets/images/occupations/place_clerk.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_clerk.png?v=2',
    speech: 'พนักงานร้านสะดวกซื้อ ทำงานที่ ร้านสะดวกซื้อ',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #a7f3d0 0%, #34d399 100%)',
    emoji: '🏪'
  },
  scientist: {
    id: 'scientist',
    nameTh: 'นักวิทยาศาสตร์',
    nameEn: 'Scientist',
    workplaceTh: 'ห้องทดลองวิทยาศาสตร์',
    workplaceEn: 'Science Laboratory',
    charImg: 'assets/images/occupations/char_scientist.png?v=2',
    placeImg: 'assets/images/occupations/place_scientist.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_scientist.png?v=2',
    speech: 'นักวิทยาศาสตร์ ทำงานที่ ห้องทดลองวิทยาศาสตร์',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #ede9fe 0%, #a78bfa 100%)',
    emoji: '🔬'
  },
  chemist: {
    id: 'chemist',
    nameTh: 'นักเคมี',
    nameEn: 'Chemist',
    workplaceTh: 'ห้องปฏิบัติการเคมี',
    workplaceEn: 'Chemical Laboratory',
    charImg: 'assets/images/occupations/char_chemist.png?v=2',
    placeImg: 'assets/images/occupations/place_chemist.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_chemist.png?v=2',
    speech: 'นักเคมี ทำงานที่ ห้องปฏิบัติการเคมี',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #f3e8ff 0%, #c084fc 100%)',
    emoji: '🧪'
  },
  engineer: {
    id: 'engineer',
    nameTh: 'วิศวกรโยธา',
    nameEn: 'Civil Engineer',
    workplaceTh: 'สถานที่ก่อสร้าง',
    workplaceEn: 'Construction Site',
    charImg: 'assets/images/occupations/char_engineer.png?v=2',
    placeImg: 'assets/images/occupations/place_engineer.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_engineer.png?v=2',
    speech: 'วิศวกรโยธา ทำงานที่ สถานที่ก่อสร้าง',
    color: '#ea580c',
    gradient: 'linear-gradient(135deg, #ffedd5 0%, #f97316 100%)',
    emoji: '🏗️'
  },
  photographer: {
    id: 'photographer',
    nameTh: 'ช่างภาพ',
    nameEn: 'Photographer',
    workplaceTh: 'สตูดิโอถ่ายภาพ',
    workplaceEn: 'Photo Studio',
    charImg: 'assets/images/occupations/char_photographer.png?v=2',
    placeImg: 'assets/images/occupations/place_photographer.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_photographer.png?v=2',
    speech: 'ช่างภาพ ทำงานที่ สตูดิโอถ่ายภาพ',
    color: '#475569',
    gradient: 'linear-gradient(135deg, #cbd5e1 0%, #64748b 100%)',
    emoji: '📷'
  },
  reporter: {
    id: 'reporter',
    nameTh: 'ผู้สื่อข่าว',
    nameEn: 'News Reporter',
    workplaceTh: 'สถานีข่าวโทรทัศน์',
    workplaceEn: 'TV News Station',
    charImg: 'assets/images/occupations/char_reporter.png?v=2',
    placeImg: 'assets/images/occupations/place_reporter.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_reporter.png?v=2',
    speech: 'ผู้สื่อข่าว ทำงานที่ สถานีข่าวโทรทัศน์',
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, #bae6fd 0%, #0284c7 100%)',
    emoji: '🎤'
  },
  florist: {
    id: 'florist',
    nameTh: 'นักจัดดอกไม้',
    nameEn: 'Florist',
    workplaceTh: 'ร้านดอกไม้สด',
    workplaceEn: 'Flower Shop',
    charImg: 'assets/images/occupations/char_florist.png?v=2',
    placeImg: 'assets/images/occupations/place_florist.png?v=2',
    shadowImg: 'assets/images/occupations/shadow_florist.png?v=2',
    speech: 'นักจัดดอกไม้ ทำงานที่ ร้านดอกไม้สด',
    color: '#db2777',
    gradient: 'linear-gradient(135deg, #fce7f3 0%, #f472b6 100%)',
    emoji: '💐'
  }
};

/**
 * 10 Progression Levels (จัดเรียง 10 หน้า หน้าละ 4 อาชีพ ตามคำสั่งของคุณครู)
 * ทุกอาชีพมาจากภาพจริงความละเอียดสูง 100%
 */
const OCCUPATION_LEVELS = [
  {
    level: 1,
    title: 'ผู้พิทักษ์และบริการประชาชน',
    subTitle: 'ลากตัวละคร 4 อาชีพไปวางคู่กับสถานที่ทำงานที่ถูกต้อง',
    themeClass: 'theme-blue',
    type: 'cards',
    occupations: ['teacher', 'police', 'postman', 'chef']
  },
  {
    level: 2,
    title: 'ฮีโร่ความปลอดภัยและสุขภาพ',
    subTitle: 'จับคู่ 4 อาชีพผู้ดูแล: ทหาร สัตวแพทย์ ทันตแพทย์ และเจ้าหน้าที่กู้ภัย',
    themeClass: 'theme-rose',
    type: 'cards',
    occupations: ['soldier', 'vet', 'dentist', 'lifeguard']
  },
  {
    level: 3,
    title: 'นักเดินทางและผู้ขับขี่ยานพาหนะ',
    subTitle: 'จับคู่ 4 ยอดนักเดินทาง: นักบิน กัปตันเรือ คนขับรถบัส และช่างซ่อมรถ',
    themeClass: 'theme-sky',
    type: 'cards',
    occupations: ['pilot', 'captain', 'bus_driver', 'mechanic']
  },
  {
    level: 4,
    title: 'การเกษตร ท้องฟ้า และท้องทะเล',
    subTitle: 'จับคู่ 4 ผู้สร้างผลผลิต: ชาวสวน ชาวนา ชาวประมง และชาวนารถเกี่ยวข้าว',
    themeClass: 'theme-emerald',
    type: 'cards',
    occupations: ['farmer', 'farmer_rice', 'fisherman', 'farmer_combine']
  },
  {
    level: 5,
    title: 'ช่างฝีมือและบริการชุมชน',
    subTitle: 'จับคู่ 4 อาชีพบริการ: คนทำขนมปัง ช่างเสริมสวย ช่างตัดผม และพนักงานร้านค้า',
    themeClass: 'theme-orange',
    type: 'cards',
    occupations: ['baker', 'hairdresser', 'barber', 'clerk']
  },
  {
    level: 6,
    title: 'วิทยาศาสตร์ วิศวกรรม และการสื่อสาร',
    subTitle: 'จับคู่ 4 อาชีพผู้คิดค้น: นักวิทยาศาสตร์ นักเคมี วิศวกร และผู้สื่อข่าว',
    themeClass: 'theme-purple',
    type: 'cards',
    occupations: ['scientist', 'chemist', 'engineer', 'reporter']
  },
  {
    level: 7,
    title: 'ศิลปะ ความคิดสร้างสรรค์ และการศึกษา',
    subTitle: 'จับคู่ 4 ศิลปินคนเก่ง: ช่างภาพ นักจัดดอกไม้ คนทำขนมปัง และคุณครู',
    themeClass: 'theme-amber',
    type: 'cards',
    occupations: ['photographer', 'florist', 'baker', 'teacher']
  },
  {
    level: 8,
    title: 'ยอดนักแก้ปัญหาและช่างผู้เชี่ยวชาญ',
    subTitle: 'จับคู่ 4 ช่างผู้ชำนาญการ: วิศวกร ช่างซ่อมรถ ช่างภาพ และสัตวแพทย์',
    themeClass: 'theme-indigo',
    type: 'cards',
    occupations: ['engineer', 'mechanic', 'photographer', 'vet']
  },
  {
    level: 9,
    title: 'ผู้พิทักษ์และฮีโร่ผู้กล้าหาญ',
    subTitle: 'จับคู่ 4 ฮีโร่ผู้เสียสละ: ทหาร ตำรวจ เจ้าหน้าที่กู้ภัย และนักบิน',
    themeClass: 'theme-slate',
    type: 'cards',
    occupations: ['soldier', 'police', 'lifeguard', 'pilot']
  },
  {
    level: 10,
    title: 'มหกรรมรวมสุดยอดอาชีพในฝัน',
    subTitle: 'ทดสอบฝีมือด่านสุดท้าย! จับคู่ 4 สุดยอดอาชีพส่งท้าย 10 หน้าให้สมบูรณ์',
    themeClass: 'theme-cyan',
    type: 'cards',
    occupations: ['dentist', 'chef', 'reporter', 'florist']
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OCCUPATIONS_MASTER, OCCUPATION_LEVELS };
}
