/**
 * Event Sequencing Game Data (เกมเรียงลำดับเหตุการณ์ก่อน - หลัง)
 * 5 Rich Educational Stories with 5 Chronological Steps Each (Total 25 Cards)
 * Matches the 5 Illustrated Frame Slots (Pink, Yellow, Green, Blue, Purple)
 */

const EVENT_SEQUENCING_DATA = [
  {
    id: "convenience_store",
    title: "ไปซื้อของที่ร้านสะดวกซื้อ",
    shortTitle: "ซื้อของ 7-11",
    subtitle: "หนูน้อยไปเลือกซื้อขนมที่ร้านสะดวกซื้อ 7-Eleven",
    emoji: "🏪",
    accentColor: "#059669",
    tagBg: "#d1fae5",
    speechIntro: "เรียงลำดับเหตุการณ์ ไปซื้อของที่ร้านสะดวกซื้อ",
    cards: [
      {
        order: 1,
        title: "1. เดินเข้าร้าน",
        desc: "หนูน้อยเดินเข้าร้านสะดวกซื้อเพื่อเลือกซื้อของ",
        speech: "ขั้นตอนที่หนึ่ง เดินเข้าร้านสะดวกซื้อ",
        color: "#ec4899",
        colorName: "สีชมพู",
        img: "assets/images/before_after_cards/7eleven/card_1.jpg"
      },
      {
        order: 2,
        title: "2. เลือกซื้อขนม",
        desc: "เดินเลือกหยิบขนมที่ชอบใส่ตะกร้าสินค้า",
        speech: "ขั้นตอนที่สอง เดินเลือกซื้อขนมใส่ตะกร้า",
        color: "#eab308",
        colorName: "สีเหลือง",
        img: "assets/images/before_after_cards/7eleven/card_2.jpg"
      },
      {
        order: 3,
        title: "3. จ่ายเงินแคชเชียร์",
        desc: "นำสินค้าไปคิดเงินและจ่ายเงินที่เคาน์เตอร์",
        speech: "ขั้นตอนที่สาม จ่ายเงินที่เคาน์เตอร์แคชเชียร์",
        color: "#22c55e",
        colorName: "สีเขียว",
        img: "assets/images/before_after_cards/7eleven/card_3.jpg"
      },
      {
        order: 4,
        title: "4. เดินออกจากร้าน",
        desc: "รับถุงสินค้าจากพี่พนักงานแล้วเดินออกจากร้าน",
        speech: "ขั้นตอนที่สี่ รับถุงสินค้าเดินออกจากร้าน",
        color: "#06b6d4",
        colorName: "สีฟ้า",
        img: "assets/images/before_after_cards/7eleven/card_4.jpg"
      },
      {
        order: 5,
        title: "5. ขี่รถกลับบ้าน",
        desc: "สวมหมวกกันน็อกขี่รถกลับบ้านอย่างปลอดภัย",
        speech: "ขั้นตอนที่ห้า สวมหมวกกันน็อกขี่รถกลับบ้านปลอดภัย",
        color: "#a855f7",
        colorName: "สีม่วง",
        img: "assets/images/before_after_cards/7eleven/card_5.jpg"
      }
    ]
  },
  {
    id: "teacher_day",
    title: "วันทำงานของคุณครูใจดี",
    shortTitle: "คุณครูใจดี",
    subtitle: "กิจวัตรการทำงานและการสอนของคุณครูในหนึ่งวัน",
    emoji: "👩‍🏫",
    accentColor: "#d97706",
    tagBg: "#fef3c7",
    speechIntro: "เรียงลำดับเหตุการณ์ วันทำงานของคุณครูใจดี",
    cards: [
      {
        order: 1,
        title: "1. แต่งตัวเรียบร้อย",
        desc: "คุณครูตื่นนอนแต่งกายด้วยชุดเครื่องแบบเรียบร้อยหน้ากระจก",
        speech: "ขั้นตอนที่หนึ่ง คุณครูแต่งกายเรียบร้อยหน้ากระจก",
        color: "#ec4899",
        colorName: "สีชมพู",
        img: "assets/images/before_after_cards/teacher/card_1.jpg"
      },
      {
        order: 2,
        title: "2. ขับรถไปโรงเรียน",
        desc: "คาดเข็มขัดนิรภัยขับรถเดินทางไปโรงเรียนในตอนเช้า",
        speech: "ขั้นตอนที่สอง คาดเข็มขัดนิรภัยขับรถไปโรงเรียน",
        color: "#eab308",
        colorName: "สีเหลือง",
        img: "assets/images/before_after_cards/teacher/card_2.jpg"
      },
      {
        order: 3,
        title: "3. ต้อนรับนักเรียน",
        desc: "คุณครูยืนต้อนรับและรับไหว้นักเรียนที่หน้าประตูโรงเรียน",
        speech: "ขั้นตอนที่สาม ยืนต้อนรับนักเรียนที่หน้าประตูโรงเรียน",
        color: "#22c55e",
        colorName: "สีเขียว",
        img: "assets/images/before_after_cards/teacher/card_3.jpg"
      },
      {
        order: 4,
        title: "4. สอนหนังสือ",
        desc: "คุณครูสอนหนังสือนักเรียนด้วยความตั้งใจในห้องเรียน",
        speech: "ขั้นตอนที่สี่ สอนหนังสือนักเรียนในห้องเรียน",
        color: "#06b6d4",
        colorName: "สีฟ้า",
        img: "assets/images/before_after_cards/teacher/card_4.jpg"
      },
      {
        order: 5,
        title: "5. ส่งนักเรียนกลับบ้าน",
        desc: "คุณครูส่งนักเรียนกลับบ้านและโบกมือลาผู้ปกครองตอนเลิกเรียน",
        speech: "ขั้นตอนที่ห้า ส่งนักเรียนกลับบ้านตอนเลิกเรียน",
        color: "#a855f7",
        colorName: "สีม่วง",
        img: "assets/images/before_after_cards/teacher/card_5.jpg"
      }
    ]
  },
  {
    id: "student_routine",
    title: "กิจวัตรไปโรงเรียนของหนูน้อย",
    shortTitle: "ไปโรงเรียน",
    subtitle: "การเตรียมตัวไปโรงเรียนตั้งแต่ตื่นนอนจนถึงโรงเรียน",
    emoji: "🎒",
    accentColor: "#2563eb",
    tagBg: "#dbeafe",
    speechIntro: "เรียงลำดับเหตุการณ์ กิจวัตรไปโรงเรียนของหนูน้อย",
    cards: [
      {
        order: 1,
        title: "1. ล้างหน้าแปรงฟัน",
        desc: "หนูน้อยตื่นนอนตอนเช้า ล้างหน้าแปรงฟันให้สะอาดสดชื่น",
        speech: "ขั้นตอนที่หนึ่ง ตื่นนอนล้างหน้าแปรงฟันให้สะอาด",
        color: "#ec4899",
        colorName: "สีชมพู",
        img: "assets/images/before_after_cards/student/card_1.jpg"
      },
      {
        order: 2,
        title: "2. แต่งตัวใส่ชุดนักเรียน",
        desc: "สวมใส่ชุดนักเรียนเรียบร้อยและสะพายกระเป๋าเป้",
        speech: "ขั้นตอนที่สอง แต่งตัวใส่ชุดนักเรียนสะพายกระเป๋า",
        color: "#eab308",
        colorName: "สีเหลือง",
        img: "assets/images/before_after_cards/student/card_2.jpg"
      },
      {
        order: 3,
        title: "3. รับประทานอาหารเช้า",
        desc: "รับประทานอาหารเช้าแสนอร่อยและดื่มนมเพิ่มพลังงาน",
        speech: "ขั้นตอนที่สาม รับประทานอาหารเช้าและดื่มนม",
        color: "#22c55e",
        colorName: "สีเขียว",
        img: "assets/images/before_after_cards/student/card_3.jpg"
      },
      {
        order: 4,
        title: "4. นั่งรถไปโรงเรียน",
        desc: "นั่งรถไปโรงเรียนกับคุณแม่และคาดเข็มขัดนิรภัยปลอดภัย",
        speech: "ขั้นตอนที่สี่ นั่งรถไปโรงเรียนและคาดเข็มขัดนิรภัย",
        color: "#06b6d4",
        colorName: "สีฟ้า",
        img: "assets/images/before_after_cards/student/card_4.jpg"
      },
      {
        order: 5,
        title: "5. สวัสดีคุณครู",
        desc: "เมื่อถึงโรงเรียนยกมือไหว้กล่าวสวัสดีคุณครูด้วยรอยยิ้ม",
        speech: "ขั้นตอนที่ห้า ถึงโรงเรียนยกมือไหว้สวัสดีคุณครู",
        color: "#a855f7",
        colorName: "สีม่วง",
        img: "assets/images/before_after_cards/student/card_5.jpg"
      }
    ]
  },
  {
    id: "office_worker",
    title: "การทำงานของพนักงานออฟฟิศ",
    shortTitle: "พนักงานออฟฟิศ",
    subtitle: "หนึ่งวันของการทำงานของพนักงานบริษัทแสนขยัน",
    emoji: "💼",
    accentColor: "#4f46e5",
    tagBg: "#e0e7ff",
    speechIntro: "เรียงลำดับเหตุการณ์ การทำงานของพนักงานออฟฟิศ",
    cards: [
      {
        order: 1,
        title: "1. แต่งตัวใส่สูท",
        desc: "แต่งกายด้วยชุดทำงานเรียบร้อย ผูกเนกไทและสวมเสื้อสูท",
        speech: "ขั้นตอนที่หนึ่ง แต่งกายด้วยชุดทำงานผูกเนกไทใส่สูท",
        color: "#ec4899",
        colorName: "สีชมพู",
        img: "assets/images/before_after_cards/office/card_1.jpg"
      },
      {
        order: 2,
        title: "2. ขึ้นรถไปทำงาน",
        desc: "ยืนรอขึ้นรถตู้โดยสารเพื่อเดินทางไปยังสำนักงาน",
        speech: "ขั้นตอนที่สอง ขึ้นรถตู้โดยสารเดินทางไปที่ทำงาน",
        color: "#eab308",
        colorName: "สีเหลือง",
        img: "assets/images/before_after_cards/office/card_2.jpg"
      },
      {
        order: 3,
        title: "3. ทานอาหารกลางวัน",
        desc: "พักรับประทานอาหารกลางวันแสนอร่อยในโรงอาหาร",
        speech: "ขั้นตอนที่สาม พักรับประทานอาหารกลางวัน",
        color: "#22c55e",
        colorName: "สีเขียว",
        img: "assets/images/before_after_cards/office/card_3.jpg"
      },
      {
        order: 4,
        title: "4. ประชุมนำเสนองาน",
        desc: "นำเสนอกราฟข้อมูลและประชุมวางแผนร่วมกับทีมงาน",
        speech: "ขั้นตอนที่สี่ ประชุมนำเสนองานร่วมกับทีม",
        color: "#06b6d4",
        colorName: "สีฟ้า",
        img: "assets/images/before_after_cards/office/card_4.jpg"
      },
      {
        order: 5,
        title: "5. ทำงานหน้าคอมพิวเตอร์",
        desc: "นั่งพิมพ์งานและจัดการเอกสารหน้าจอคอมพิวเตอร์อย่างตั้งใจ",
        speech: "ขั้นตอนที่ห้า นั่งทำงานหน้าคอมพิวเตอร์อย่างตั้งใจ",
        color: "#a855f7",
        colorName: "สีม่วง",
        img: "assets/images/before_after_cards/office/card_5.jpg"
      }
    ]
  },
  {
    id: "hospital_visit",
    title: "หนูหกล้มไปหาคุณหมอทำแผล",
    shortTitle: "ไปหาคุณหมอ",
    subtitle: "การปฐมพยาบาลและการดูแลรักษาของคุณหมออย่างอ่อนโยน",
    emoji: "🏥",
    accentColor: "#dc2626",
    tagBg: "#fee2e2",
    speechIntro: "เรียงลำดับเหตุการณ์ หนูหกล้มไปหาคุณหมอทำแผล",
    cards: [
      {
        order: 1,
        title: "1. หกล้มมีแผล",
        desc: "หนูน้อยวิ่งเล่นหกล้มที่สนามเด็กเล่นจนมีแผลที่หัวเข่า",
        speech: "ขั้นตอนที่หนึ่ง หนูน้อยหกล้มมีแผลที่หัวเข่า",
        color: "#ec4899",
        colorName: "สีชมพู",
        img: "assets/images/before_after_cards/doctor/card_1.jpg"
      },
      {
        order: 2,
        title: "2. คุณพ่อคุณแม่ปลอบใจ",
        desc: "คุณพ่อคุณแม่รีบเข้ามาตรวจดูแผลและปลอบใจด้วยความห่วงใย",
        speech: "ขั้นตอนที่สอง คุณพ่อคุณแม่เข้ามาช่วยดูแลปลอบใจ",
        color: "#eab308",
        colorName: "สีเหลือง",
        img: "assets/images/before_after_cards/doctor/card_2.jpg"
      },
      {
        order: 3,
        title: "3. นั่งรถไปโรงพยาบาล",
        desc: "คุณพ่อขับรถพาหนูน้อยเดินทางไปโรงพยาบาลอย่างปลอดภัย",
        speech: "ขั้นตอนที่สาม นั่งรถเดินทางไปโรงพยาบาล",
        color: "#22c55e",
        colorName: "สีเขียว",
        img: "assets/images/before_after_cards/doctor/card_3.jpg"
      },
      {
        order: 4,
        title: "4. คุณหมอตรวจดูอาการ",
        desc: "คุณหมอซักถามอาการและตรวจดูรอยแผลอย่างใจดี",
        speech: "ขั้นตอนที่สี่ คุณหมอซักประวัติตรวจดูอาการ",
        color: "#06b6d4",
        colorName: "สีฟ้า",
        img: "assets/images/before_after_cards/doctor/card_4.jpg"
      },
      {
        order: 5,
        title: "5. คุณหมอทำแผลให้",
        desc: "คุณหมอทำความสะอาดแผลและใส่ยาอย่างอ่อนโยนจนปลอดภัย",
        speech: "ขั้นตอนที่ห้า คุณหมอทำความสะอาดและใส่ยาทำแผลให้",
        color: "#a855f7",
        colorName: "สีม่วง",
        img: "assets/images/before_after_cards/doctor/card_5.jpg"
      }
    ]
  }
];
