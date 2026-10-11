// jamneak-data.js - คลังข้อมูลบัตรภาพสิ่งมีชีวิตและสิ่งไม่มีชีวิต (36 บัตรภาพ)
// ดึงและตัดภาพจากไฟล์ PDF สื่อการสอนวิทยาศาสตร์ปฐมวัย

const JAMNEAK_CARDS = [
  // หมวดหมู่หน้า 7: สิ่งมีชีวิต (คน สัตว์ พืช) 12 ใบ
  { id: 'pig', name: 'หมู', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_pig.png', hint: 'สัตว์เลี้ยงลูกด้วยนม ร้องอู๊ดๆ' },
  { id: 'cat', name: 'แมว', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_cat.png', hint: 'สัตว์เลี้ยงแสนซน ร้องเหมียวๆ' },
  { id: 'dog', name: 'สุนัข', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_dog.png', hint: 'สัตว์เลี้ยงผู้ซื่อสัตย์ ร้องโฮ่งๆ' },
  { id: 'horse', name: 'ม้า', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_horse.png', hint: 'สัตว์วิ่งเร็ว ร้องฮี้ๆ' },
  { id: 'trees', name: 'ต้นไม้', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_trees.png', hint: 'พืชสีเขียว หายใจและโตได้' },
  { id: 'crocodile', name: 'จระเข้', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_crocodile.png', hint: 'สัตว์เลื้อยคลานครึ่งบกครึ่งน้ำ' },
  { id: 'explorer_boy', name: 'เด็กนักสำรวจ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_explorer_boy.png', hint: 'มนุษย์ กินอาหารและโตได้' },
  { id: 'cow', name: 'วัว', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_cow.png', hint: 'สัตว์กินหญ้า ให้คุณค่าน้ำนม' },
  { id: 'tiger', name: 'เสือ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_tiger.png', hint: 'สัตว์ป่าลายพาดกลอน' },
  { id: 'lion', name: 'สิงโต', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_lion.png', hint: 'เจ้าป่าแผงคอสง่างาม' },
  { id: 'rabbit', name: 'กระต่าย', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_rabbit.png', hint: 'สัตว์ตัวน้อยหูยาว กระโดดดุ๊กดิ๊ก' },
  { id: 'zebra', name: 'ม้าลาย', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_zebra.png', hint: 'สัตว์มีลายทางขาวดำ' },

  // หมวดหมู่หน้า 8: สัตว์ (สิ่งมีชีวิต 7 ใบ) + อุปกรณ์เครื่องมือ (สิ่งไม่มีชีวิต 5 ใบ)
  { id: 'turtle', name: 'เต่า', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_turtle.png', hint: 'สัตว์มีกระดอง เดินต้วมเตี้ยม' },
  { id: 'frog', name: 'กบ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_frog.png', hint: 'สัตว์ครึ่งบกครึ่งน้ำ ร้องอบๆ' },
  { id: 'hen', name: 'แม่ไก่', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_hen.png', hint: 'สัตว์ปีก ออกไข่ให้เรารับประทาน' },
  { id: 'butterfly', name: 'ผีเสื้อ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_butterfly.png', hint: 'แมลงปีกสวย บินตอมเกสรดอกไม้' },
  { id: 'dragonfly', name: 'แมลงปอ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_dragonfly.png', hint: 'แมลงบินไว ปีกใสบาง' },
  { id: 'chick', name: 'ลูกเจี๊ยบ', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_chick.png', hint: 'ลูกไก่ตัวสีเหลือง ร้องเจี๊ยบๆ' },
  { id: 'turkey', name: 'ไก่งวง', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_turkey.png', hint: 'นกขนาดใหญ่ ขนหางแผ่สวยงาม' },
  { id: 'glue_gun', name: 'ปืนกาว', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_glue_gun.png', hint: 'เครื่องมือประดิษฐ์ สิ่งของเครื่องใช้' },
  { id: 'laminator', name: 'เครื่องเคลือบบัตร', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_laminator.png', hint: 'อุปกรณ์สำนักงาน เครื่องใช้ไฟฟ้า' },
  { id: 'scissors', name: 'กรรไกร', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_scissors.png', hint: 'อุปกรณ์ตัดกระดาษ ของใช้' },
  { id: 'paint_brush', name: 'สีและพู่กัน', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_paint_brush.png', hint: 'อุปกรณ์ระบายสี สิ่งไม่มีชีวิต' },
  { id: 'cutter', name: 'คัตเตอร์', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_cutter.png', hint: 'มีดตัดกระดาษ ของใช้' },

  // หมวดหมู่หน้า 9: สถานที่/ของใช้ (สิ่งไม่มีชีวิต 8 ใบ) + พืชผักผลไม้ (สิ่งมีชีวิต 4 ใบ)
  { id: 'school', name: 'โรงเรียน', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_school.png', hint: 'อาคารสถานที่ สิ่งก่อสร้าง' },
  { id: 'slide', name: 'สไลเดอร์', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_slide.png', hint: 'เครื่องเล่นสนาม ของเล่น' },
  { id: 'snack', name: 'ขนมขบเคี้ยว', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_snack.png', hint: 'ซองขนม สิ่งไม่มีชีวิต' },
  { id: 'pumpkin', name: 'ฟักทอง', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_pumpkin.png', hint: 'พืชผักสวนครัว เจริญเติบโตได้' },
  { id: 'jam', name: 'แยมผลไม้', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_jam.png', hint: 'ขวดแก้วบรรจุแยม สิ่งไม่มีชีวิต' },
  { id: 'corn', name: 'ข้าวโพด', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_corn.png', hint: 'พืชไร่การเกษตร เจริญเติบโตได้' },
  { id: 'banana', name: 'กล้วย', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_banana.png', hint: 'ผลไม้ พืชพรรณธรรมชาติ' },
  { id: 'peas', name: 'ถั่วลันเตา', type: 'living', typeName: 'สิ่งมีชีวิต', img: 'assets/images/jamneak/cards/card_peas.png', hint: 'พืชตระกูลถั่ว เจริญเติบโตได้' },
  { id: 'hat', name: 'หมวก', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_hat.png', hint: 'เครื่องแต่งกาย สิ่งไม่มีชีวิต' },
  { id: 'glasses', name: 'แว่นตา', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_glasses.png', hint: 'ของใช้สวมใส่ สิ่งไม่มีชีวิต' },
  { id: 'jacket', name: 'เสื้อกันหนาว', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_jacket.png', hint: 'เสื้อผ้าเครื่องนุ่งห่ม' },
  { id: 'mask', name: 'หน้ากากอนามัย', type: 'nonliving', typeName: 'สิ่งไม่มีชีวิต', img: 'assets/images/jamneak/cards/card_mask.png', hint: 'ของใช้ป้องกันสุขภาพ' }
];

window.JAMNEAK_CARDS = JAMNEAK_CARDS;
