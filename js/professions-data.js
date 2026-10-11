/**
 * 8 ASEAN Mutual Recognition Arrangement (MRA) Professions
 * ข้อมูล 8 อาชีพอาเซียน และข้อมูลระดับขนาด 4 ขนาดสำหรับเกมเรียงลำดับ
 */

const PROFESSIONS_DATA = [
  {
    id: 'doctor',
    name: 'แพทย์',
    enName: 'Doctor',
    image: 'assets/images/professions/doctor.png',
    badge: 'assets/images/professions/badge_doctor.png',
    themeColor: '#f43f5e',
    accentColor: '#fb7185',
    cardBg: '#fff1f2',
    description: 'คุณหมอผู้เชี่ยวชาญ คอยตรวจรักษาผู้ป่วย ให้ทุกคนมีสุขภาพแข็งแรง'
  },
  {
    id: 'dentist',
    name: 'ทันตแพทย์',
    enName: 'Dentist',
    image: 'assets/images/professions/dentist.png',
    badge: 'assets/images/professions/badge_dentist.png',
    themeColor: '#0ea5e9',
    accentColor: '#38bdf8',
    cardBg: '#f0f9ff',
    description: 'หมอฟันใจดี ดูแลรักษาฟัน ให้เด็กๆ ยิ้มสวยฟันขาวสะอาด'
  },
  {
    id: 'nurse',
    name: 'พยาบาล',
    enName: 'Nurse',
    image: 'assets/images/professions/nurse.png',
    badge: 'assets/images/professions/badge_nurse.png',
    themeColor: '#06b6d4',
    accentColor: '#22d3ee',
    cardBg: '#ecfeff',
    description: 'พี่พยาบาลใจดี คอยดูแลและให้กำลังใจผู้ป่วยอย่างใกล้ชิด'
  },
  {
    id: 'engineer',
    name: 'วิศวกร',
    enName: 'Engineer',
    image: 'assets/images/professions/engineer.png',
    badge: 'assets/images/professions/badge_engineer.png',
    themeColor: '#f59e0b',
    accentColor: '#fbbf24',
    cardBg: '#fffbeb',
    description: 'วิศวกรคนเก่ง คำนวณ ออกแบบ และควบคุมการก่อสร้างให้ปลอดภัย'
  },
  {
    id: 'architect',
    name: 'สถาปนิก',
    enName: 'Architect',
    image: 'assets/images/professions/architect.png',
    badge: 'assets/images/professions/badge_architect.png',
    themeColor: '#eab308',
    accentColor: '#fde047',
    cardBg: '#fefce8',
    description: 'สถาปนิกสร้างสรรค์ ออกแบบบ้านเรือนและอาคารสถานที่แสนสวยงาม'
  },
  {
    id: 'surveyor',
    name: 'นักสำรวจ',
    enName: 'Surveyor',
    image: 'assets/images/professions/surveyor.png',
    badge: 'assets/images/professions/badge_surveyor.png',
    themeColor: '#10b981',
    accentColor: '#34d399',
    cardBg: '#ecfdf5',
    description: 'นักสำรวจพื้นที่ ใช้กล้องระดับวัดระยะและทำแผนที่อย่างแม่นยำ'
  },
  {
    id: 'accountant',
    name: 'นักบัญชี',
    enName: 'Accountant',
    image: 'assets/images/professions/accountant.png',
    badge: 'assets/images/professions/badge_accountant.png',
    themeColor: '#8b5cf6',
    accentColor: '#a78bfa',
    cardBg: '#f5f3ff',
    description: 'นักบัญชีละเอียดรอบคอบ คำนวณตัวเลขและวางแผนการเงินอย่างถูกต้อง'
  },
  {
    id: 'tourism',
    name: 'บุคลากรการท่องเที่ยว',
    enName: 'Tourism Professional',
    image: 'assets/images/professions/tourism.png',
    badge: 'assets/images/professions/badge_tourism.png',
    themeColor: '#14b8a6',
    accentColor: '#2dd4bf',
    cardBg: '#f0fdfa',
    description: 'บุคลากรด้านการบริการและการท่องเที่ยว ต้อนรับนักเดินทางทั่วอาเซียน'
  }
];

const SIZE_LEVELS = [
  { level: 1, label: 'ขนาดเล็กสุด', tag: 'เล็กสุด', scale: 0.48, height: 48 },
  { level: 2, label: 'ขนาดเล็ก', tag: 'เล็ก', scale: 0.65, height: 68 },
  { level: 3, label: 'ขนาดใหญ่', tag: 'ใหญ่', scale: 0.85, height: 88 },
  { level: 4, label: 'ขนาดใหญ่สุด', tag: 'ใหญ่สุด', scale: 1.05, height: 108 }
];
