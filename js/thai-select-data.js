/**
 * Thai Consonant Selection Game Data (44 Cards ก - ฮ)
 */
const THAI_SELECT_CARDS = [
  {
    "order": 1,
    "id": "ko_kai",
    "letter": "ก",
    "name": "ก ไก่",
    "speech": "ก เอ๋ย ก ไก่",
    "img": "assets/images/select_TH_cards/card_01_ko_kai.jpg",
    "choices": [
      "ก",
      "ภ",
      "ถ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ก ไก่)"
  },
  {
    "order": 2,
    "id": "kho_khai",
    "letter": "ข",
    "name": "ข ไข่",
    "speech": "ข ไข่ ในเล้า",
    "img": "assets/images/select_TH_cards/card_02_kho_khai.jpg",
    "choices": [
      "ช",
      "ข",
      "ฃ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ข ไข่)"
  },
  {
    "order": 3,
    "id": "kho_khuat",
    "letter": "ฃ",
    "name": "ฃ ขวด",
    "speech": "ฃ ขวด ของเรา",
    "img": "assets/images/select_TH_cards/card_03_kho_khuat.jpg",
    "choices": [
      "ท",
      "ฃ",
      "ข"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฃ ขวด)"
  },
  {
    "order": 4,
    "id": "kho_khwai",
    "letter": "ค",
    "name": "ค ควาย",
    "speech": "ค ควาย เข้านา",
    "img": "assets/images/select_TH_cards/card_04_kho_khwai.jpg",
    "choices": [
      "ค",
      "ด",
      "ต"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ค ควาย)"
  },
  {
    "order": 5,
    "id": "kho_khon",
    "letter": "ฅ",
    "name": "ฅ คน",
    "speech": "ฅ คน ขึงขัง",
    "img": "assets/images/select_TH_cards/card_05_kho_khon.jpg",
    "choices": [
      "ค",
      "ต",
      "ฅ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฅ คน)"
  },
  {
    "order": 6,
    "id": "kho_rakhang",
    "letter": "ฆ",
    "name": "ฆ ระฆัง",
    "speech": "ฆ ระฆัง ข้างฝา",
    "img": "assets/images/select_TH_cards/card_06_kho_rakhang.jpg",
    "choices": [
      "ม",
      "น",
      "ฆ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฆ ระฆัง)"
  },
  {
    "order": 7,
    "id": "ngo_ngu",
    "letter": "ง",
    "name": "ง งู",
    "speech": "ง งู ใจกล้า",
    "img": "assets/images/select_TH_cards/card_07_ngo_ngu.jpg",
    "choices": [
      "ง",
      "จ",
      "ว"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ง งู)"
  },
  {
    "order": 8,
    "id": "cho_chan",
    "letter": "จ",
    "name": "จ จาน",
    "speech": "จ จาน ใช้ดี",
    "img": "assets/images/select_TH_cards/card_08_cho_chan.jpg",
    "choices": [
      "จ",
      "ฉ",
      "อ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (จ จาน)"
  },
  {
    "order": 9,
    "id": "cho_ching",
    "letter": "ฉ",
    "name": "ฉ ฉิ่ง",
    "speech": "ฉ ฉิ่ง ตีดัง",
    "img": "assets/images/select_TH_cards/card_09_cho_ching.jpg",
    "choices": [
      "อ",
      "ฉ",
      "ล"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฉ ฉิ่ง)"
  },
  {
    "order": 10,
    "id": "cho_chang",
    "letter": "ช",
    "name": "ช ช้าง",
    "speech": "ช ช้าง วิ่งหนี",
    "img": "assets/images/select_TH_cards/card_10_cho_chang.jpg",
    "choices": [
      "ช",
      "ข",
      "ซ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ช ช้าง)"
  },
  {
    "order": 11,
    "id": "so_so",
    "letter": "ซ",
    "name": "ซ โซ่",
    "speech": "ซ โซ่ ล่ามที",
    "img": "assets/images/select_TH_cards/card_11_so_so.jpg",
    "choices": [
      "ช",
      "ข",
      "ซ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ซ โซ่)"
  },
  {
    "order": 12,
    "id": "cho_choe",
    "letter": "ฌ",
    "name": "ฌ เฌอ",
    "speech": "ฌ เฌอ คู่กัน",
    "img": "assets/images/select_TH_cards/card_12_cho_choe.jpg",
    "choices": [
      "ญ",
      "ณ",
      "ฌ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฌ เฌอ)"
  },
  {
    "order": 13,
    "id": "yo_ying",
    "letter": "ญ",
    "name": "ญ หญิง",
    "speech": "ญ หญิง โสภา",
    "img": "assets/images/select_TH_cards/card_13_yo_ying.jpg",
    "choices": [
      "ญ",
      "ณ",
      "ฌ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ญ หญิง)"
  },
  {
    "order": 14,
    "id": "do_chada",
    "letter": "ฎ",
    "name": "ฎ ชฎา",
    "speech": "ฎ ชฎา สวมพลัน",
    "img": "assets/images/select_TH_cards/card_14_do_chada.jpg",
    "choices": [
      "ฎ",
      "ฏ",
      "ด"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฎ ชฎา)"
  },
  {
    "order": 15,
    "id": "to_patak",
    "letter": "ฏ",
    "name": "ฏ ปฏัก",
    "speech": "ฏ ปฏัก หุนหัน",
    "img": "assets/images/select_TH_cards/card_15_to_patak.jpg",
    "choices": [
      "ฎ",
      "ฏ",
      "ภ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฏ ปฏัก)"
  },
  {
    "order": 16,
    "id": "tho_than",
    "letter": "ฐ",
    "name": "ฐ ฐาน",
    "speech": "ฐ ฐาน เข้ามารอง",
    "img": "assets/images/select_TH_cards/card_16_tho_than.jpg",
    "choices": [
      "ฐ",
      "ฎ",
      "ท"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฐ ฐาน)"
  },
  {
    "order": 17,
    "id": "tho_montho",
    "letter": "ฑ",
    "name": "ฑ มณโฑ",
    "speech": "ฑ มณโฑ หน้าขาว",
    "img": "assets/images/select_TH_cards/card_17_tho_montho.jpg",
    "choices": [
      "ท",
      "ฒ",
      "ฑ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฑ มณโฑ)"
  },
  {
    "order": 18,
    "id": "tho_phuthao",
    "letter": "ฒ",
    "name": "ฒ ผู้เฒ่า",
    "speech": "ฒ ผู้เฒ่า เดินย่อง",
    "img": "assets/images/select_TH_cards/card_18_tho_phuthao.jpg",
    "choices": [
      "ท",
      "ฒ",
      "ฑ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฒ ผู้เฒ่า)"
  },
  {
    "order": 19,
    "id": "no_nen",
    "letter": "ณ",
    "name": "ณ เณร",
    "speech": "ณ เณร ไม่มอง",
    "img": "assets/images/select_TH_cards/card_19_no_nen.jpg",
    "choices": [
      "ญ",
      "ณ",
      "ฌ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ณ เณร)"
  },
  {
    "order": 20,
    "id": "do_dek",
    "letter": "ด",
    "name": "ด เด็ก",
    "speech": "ด เด็ก ต้องนิมนต์",
    "img": "assets/images/select_TH_cards/card_20_do_dek.jpg",
    "choices": [
      "ด",
      "ต",
      "ค"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ด เด็ก)"
  },
  {
    "order": 21,
    "id": "to_tao",
    "letter": "ต",
    "name": "ต เต่า",
    "speech": "ต เต่า หลังตุง",
    "img": "assets/images/select_TH_cards/card_21_to_tao.jpg",
    "choices": [
      "ค",
      "ฅ",
      "ต"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ต เต่า)"
  },
  {
    "order": 22,
    "id": "tho_thung",
    "letter": "ถ",
    "name": "ถ ถุง",
    "speech": "ถ ถุง แบกขน",
    "img": "assets/images/select_TH_cards/card_22_tho_thung.jpg",
    "choices": [
      "ก",
      "ถ",
      "ภ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ถ ถุง)"
  },
  {
    "order": 23,
    "id": "tho_thahan",
    "letter": "ท",
    "name": "ท ทหาร",
    "speech": "ท ทหาร อดทน",
    "img": "assets/images/select_TH_cards/card_23_tho_thahan.jpg",
    "choices": [
      "ท",
      "ฑ",
      "ฒ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ท ทหาร)"
  },
  {
    "order": 24,
    "id": "tho_thong",
    "letter": "ธ",
    "name": "ธ ธง",
    "speech": "ธ ธง คนนิยม",
    "img": "assets/images/select_TH_cards/card_24_tho_thong.jpg",
    "choices": [
      "ธ",
      "ร",
      "ท"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ธ ธง)"
  },
  {
    "order": 25,
    "id": "no_nu",
    "letter": "น",
    "name": "น หนู",
    "speech": "น หนู ขวักไขว่",
    "img": "assets/images/select_TH_cards/card_25_no_nu.jpg",
    "choices": [
      "ม",
      "น",
      "บ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (น หนู)"
  },
  {
    "order": 26,
    "id": "bo_baimai",
    "letter": "บ",
    "name": "บ ใบไม้",
    "speech": "บ ใบไม้ ทับถม",
    "img": "assets/images/select_TH_cards/card_26_bo_baimai.jpg",
    "choices": [
      "ข",
      "ป",
      "บ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (บ ใบไม้)"
  },
  {
    "order": 27,
    "id": "po_pla",
    "letter": "ป",
    "name": "ป ปลา",
    "speech": "ป ปลา ตากลม",
    "img": "assets/images/select_TH_cards/card_27_po_pla.jpg",
    "choices": [
      "น",
      "บ",
      "ป"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ป ปลา)"
  },
  {
    "order": 28,
    "id": "pho_phueng",
    "letter": "ผ",
    "name": "ผ ผึ้ง",
    "speech": "ผ ผึ้ง ทำรัง",
    "img": "assets/images/select_TH_cards/card_28_pho_phueng.jpg",
    "choices": [
      "พ",
      "ผ",
      "ฟ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ผ ผึ้ง)"
  },
  {
    "order": 29,
    "id": "fo_fa",
    "letter": "ฝ",
    "name": "ฝ ฝา",
    "speech": "ฝ ฝา ทนทาน",
    "img": "assets/images/select_TH_cards/card_29_fo_fa.jpg",
    "choices": [
      "ฝ",
      "ผ",
      "ฟ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฝ ฝา)"
  },
  {
    "order": 30,
    "id": "pho_phan",
    "letter": "พ",
    "name": "พ พาน",
    "speech": "พ พาน วางตั้ง",
    "img": "assets/images/select_TH_cards/card_30_pho_phan.jpg",
    "choices": [
      "ฟ",
      "พ",
      "ผ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (พ พาน)"
  },
  {
    "order": 31,
    "id": "fo_fan",
    "letter": "ฟ",
    "name": "ฟ ฟัน",
    "speech": "ฟ ฟัน สะอาดจัง",
    "img": "assets/images/select_TH_cards/card_31_fo_fan.jpg",
    "choices": [
      "ผ",
      "พ",
      "ฟ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฟ ฟัน)"
  },
  {
    "order": 32,
    "id": "pho_samphao",
    "letter": "ภ",
    "name": "ภ สำเภา",
    "speech": "ภ สำเภา กางใบ",
    "img": "assets/images/select_TH_cards/card_32_pho_samphao.jpg",
    "choices": [
      "ถ",
      "ภ",
      "ก"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ภ สำเภา)"
  },
  {
    "order": 33,
    "id": "mo_ma",
    "letter": "ม",
    "name": "ม ม้า",
    "speech": "ม ม้า คึกคัก",
    "img": "assets/images/select_TH_cards/card_33_mo_ma.jpg",
    "choices": [
      "ม",
      "น",
      "ฆ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ม ม้า)"
  },
  {
    "order": 34,
    "id": "yo_yak",
    "letter": "ย",
    "name": "ย ยักษ์",
    "speech": "ย ยักษ์ เขี้ยวใหญ่",
    "img": "assets/images/select_TH_cards/card_34_yo_yak.jpg",
    "choices": [
      "บ",
      "ย",
      "ผ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ย ยักษ์)"
  },
  {
    "order": 35,
    "id": "ro_ruea",
    "letter": "ร",
    "name": "ร เรือ",
    "speech": "ร เรือ พายไป",
    "img": "assets/images/select_TH_cards/card_35_ro_ruea.jpg",
    "choices": [
      "ร",
      "ล",
      "ธ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ร เรือ)"
  },
  {
    "order": 36,
    "id": "lo_ling",
    "letter": "ล",
    "name": "ล ลิง",
    "speech": "ล ลิง ไต่ราว",
    "img": "assets/images/select_TH_cards/card_36_lo_ling.jpg",
    "choices": [
      "ร",
      "ธ",
      "ล"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ล ลิง)"
  },
  {
    "order": 37,
    "id": "wo_waen",
    "letter": "ว",
    "name": "ว แหวน",
    "speech": "ว แหวน ลงยา",
    "img": "assets/images/select_TH_cards/card_37_wo_waen.jpg",
    "choices": [
      "ร",
      "ว",
      "ล"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ว แหวน)"
  },
  {
    "order": 38,
    "id": "so_sala",
    "letter": "ศ",
    "name": "ศ ศาลา",
    "speech": "ศ ศาลา เงียบเหงา",
    "img": "assets/images/select_TH_cards/card_38_so_sala.jpg",
    "choices": [
      "ส",
      "ศ",
      "ค"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ศ ศาลา)"
  },
  {
    "order": 39,
    "id": "so_rusi",
    "letter": "ษ",
    "name": "ษ ฤๅษี",
    "speech": "ษ ฤๅษี หนวดยาว",
    "img": "assets/images/select_TH_cards/card_39_so_rusi.jpg",
    "choices": [
      "ส",
      "บ",
      "ษ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ษ ฤๅษี)"
  },
  {
    "order": 40,
    "id": "so_suea",
    "letter": "ส",
    "name": "ส เสือ",
    "speech": "ส เสือ ดาวคะนอง",
    "img": "assets/images/select_TH_cards/card_40_so_suea.jpg",
    "choices": [
      "ส",
      "ศ",
      "ล"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ส เสือ)"
  },
  {
    "order": 41,
    "id": "ho_hip",
    "letter": "ห",
    "name": "ห หีบ",
    "speech": "ห หีบ ใส่ผ้า",
    "img": "assets/images/select_TH_cards/card_41_ho_hip.jpg",
    "choices": [
      "ท",
      "ห",
      "พ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ห หีบ)"
  },
  {
    "order": 42,
    "id": "lo_chula",
    "letter": "ฬ",
    "name": "ฬ จุฬา",
    "speech": "ฬ จุฬา ท่าผยอง",
    "img": "assets/images/select_TH_cards/card_42_lo_chula.jpg",
    "choices": [
      "ฟ",
      "ฬ",
      "พ"
    ],
    "correctIndex": 1,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฬ จุฬา)"
  },
  {
    "order": 43,
    "id": "o_ang",
    "letter": "อ",
    "name": "อ อ่าง",
    "speech": "อ อ่าง เนืองนอง",
    "img": "assets/images/select_TH_cards/card_43_o_ang.jpg",
    "choices": [
      "อ",
      "ฉ",
      "ฮ"
    ],
    "correctIndex": 0,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (อ อ่าง)"
  },
  {
    "order": 44,
    "id": "ho_nokhuk",
    "letter": "ฮ",
    "name": "ฮ นกฮูก",
    "speech": "ฮ นกฮูก ตาโต",
    "img": "assets/images/select_TH_cards/card_44_ho_nokhuk.jpg",
    "choices": [
      "ล",
      "อ",
      "ฮ"
    ],
    "correctIndex": 2,
    "question": "รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (ฮ นกฮูก)"
  }
];
