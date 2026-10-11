# คู่มือและมาตรฐานการพัฒนาเกม (Game Development Guidelines)

> **เอกสารข้อกำหนดและมาตรฐานสำหรับชุดเกมการเรียนรู้เด็กปฐมวัย (Preschool Educational Games)**  
> ใช้เป็นแนวทางปฏิบัติและข้อบังคับในการพัฒนาเกมใหม่และปรับปรุงเกมเดิมในระบบทั้งหมด

---

## 1. ข้อกำหนดภาพพื้นหลังสำหรับทุกเกม (Background Images)

เมื่อใดก็ตามที่มีการสร้างเกมใหม่ **ต้องสร้างภาพพื้นหลังที่สอดคล้องกับธีมของเกมนั้น ๆ เสมอ** (ห้ามปล่อยว่างหรือใช้เพียงสีพื้นเรียบเด็ดขาด)

* **ตำแหน่งไฟล์**: จัดเก็บไว้ในโฟลเดอร์ `assets/images/` โดยตั้งชื่อตามรูปแบบ:
  ```text
  assets/images/bg_<game_name>.jpg
  ```
  *(ตัวอย่าง: `bg_thai_select.jpg`, `bg_thai_tracing.jpg`, `bg_before_after.jpg`, `bg-career.jpg`)*
* **ขนาดและอัตราส่วน**:
  * อัตราส่วนแนวนอน **16:9**
  * ขนาดความละเอียดมาตรฐาน **1376 × 768 px** (หรือ $1920 \times 1080$ px บีบอัดเหมาะสม)
  * รูปแบบไฟล์ **JPEG** ความคมชัดสูงและขนาดไฟล์กระทัดรัด (~300KB – 800KB)
* **สไตล์และโทนภาพ**:
  * สไตล์ **3D Pixar / Disney Cartoon** แอนิเมชันน่ารัก อบอุ่น สดใส
  * เหมาะสมกับการเรียนรู้ของเด็กปฐมวัย (ห้องเรียนอนุบาล, ท้องฟ้าสดใส, เมฆสายรุ้ง, เครื่องเขียนของเล่นไม้)
  * จัดองค์ประกอบให้บริเวณตรงกลางโปร่ง เพื่อให้กระดานเกมและการ์ดแสดงผลได้ชัดเจน
* **การจัดการเลเยอร์ CSS (Overlay Layer)**:
  * ต้องซ้อนเลเยอร์ Radial Gradient หรือ Soft Blur บนภาพพื้นหลังเสมอ เพื่อเพิ่ม Contrast และให้อ่านเนื้อหาบนการ์ดเกมได้สบายตา:
  ```css
  .<game>-bg-layer {
    position: fixed;
    inset: 0;
    z-index: 0;
    background-image: url('../assets/images/bg_<game_name>.jpg?v=1.x.x');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: saturate(1.05) brightness(1.02);
    pointer-events: none;
  }
  .<game>-bg-layer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.45) 0%, rgba(240, 249, 255, 0.72) 100%);
    pointer-events: none;
  }
  ```

---

## 2. องค์ประกอบ UI มาตรฐานเดียวกันทุกเกม (Unified Core UI)

ทุกหน้าเกมต้องใช้องค์ประกอบส่วนหัว (Header Controls) รูปแบบเดียวกัน สีเดียวกัน และขนาดเดียวกันอย่างเคร่งครัด โดยใช้คลาส `.action-btn` วงกลมสีฟ้าไล่เฉดเงา 3 มิติ:

```css
.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  background: linear-gradient(135deg, #0284c7, #0369a1);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### รายละเอียดปุ่มบังคับในทุกหน้าเกม:

| ตำแหน่ง | ปุ่ม | รหัส Element | ไอคอน / คำอธิบาย |
| :--- | :--- | :--- | :--- |
| **มุมซ้ายบน** | **ปุ่มโฮม (Home Button)** | `<a href="index.html" class="action-btn">` | ไอคอนรูปบ้าน SVG พาผู้เล่นกลับสู่หน้าเมนูหลัก `index.html` |
| **มุมซ้ายบน** | **ป้ายเวอร์ชัน (Version Tag)** | `<span class="version-tag-pill">` | ป้ายยาแคปซูลแสดงเลขเวอร์ชันของระบบ เช่น `v1.3.7` |
| **กึ่งกลางบน** | **แถบชื่อเกม (Title Pill)** | `<div class="...-title-pill">` | ชื่อเกม พร้อมไอคอนสัญลักษณ์ และป้ายบอกด่าน/โหมด |
| **มุมขวาบน** | **ปุ่มเสียง (Sound Toggle)** | `<button class="action-btn" id="audioToggleBtn">` | ไอคอนลำโพง `#audioIcon` เปิด/ปิดเสียงดนตรีและ SFX |
| **มุมขวาบน** | **ปุ่มรีเฟรช (Refresh/Restart)** | `<button class="action-btn" id="btnResetBoard">` | ไอคอนลูกศรหมุนวน รีเซ็ตกระดาน/เริ่มเล่นรอบนี้ใหม่ |
| **มุมขวาบน** *(ถ้ามี)* | **ปุ่มเมนูพิเศษ** | `<button class="action-btn" id="...">` | เช่น ปุ่มเลือกตัวอักษร 44 ตัว หรือสัญลักษณ์อาเซียน |

---

## 3. กฎการออกแบบและประสบการณ์ผู้ใช้ (Preschool UX/UI Standards)

1. **การแสดงผล 100% Viewport (Zero Scrollbar)**:
   * หน้าเกมต้องพอดีกับหน้าจอพอดี 100% ทั้งบน iPad, แท็บเล็ต, โน้ตบุ๊ก และสมาร์ตโฟน
   * ห้ามเกิด Scrollbar แนวตั้งบนกระดานเล่นเกม (`overflow: hidden; max-height: 100vh; max-height: 100dvh;`)
2. **ฟอนต์มาตรฐานมีหัวสำหรับเด็กปฐมวัย**:
   * ต้องใช้ฟอนต์ที่มีหัวชัดเจน เช่น `Sarabun`, `Noto Sans Thai` ในทุกตัวอักษรและข้อความการเรียนรู้
   * ห้ามใช้ฟอนต์ไม่มีหัว เพราะเด็กอนุบาลจำเป็นต้องสังเกตหัวของพยัญชนะเพื่อการจดจำที่ถูกต้อง
3. **ดีไซน์สะอาด ปลอดอีโมจิ (Zero-Emoji Professional UI)**:
   * ใช้องค์ประกอบ Vector SVG คุณภาพสูงสำหรับปุ่มกดและไอคอนระบบทั้งหมด
4. **หลีกเลี่ยงการออกแบบปุ่มที่ซ้ำซ้อน (No Redundant Controls)**:
   * หากมีช่องตัวเลือกอยู่บนตัวบัตรคำหรือกระดานอยู่แล้ว ให้เด็กแตะเลือกบนบัตรคำได้โดยตรง
   * ไม่ต้องสร้างแถบปุ่มตัวเลือกซ้ำซ้อนที่ด้านล่าง เพื่อเพิ่มพื้นที่ให้การ์ดเกมใหญ่และชัดเจนที่สุด
5. **ระบบตอบสนองและเสียง (Feedback & Audio)**:
   * มีเสียงเอฟเฟกต์ตอบสนองทันทีเมื่อแตะ (Sound FX)
   * เมื่อตอบถูก: ให้มีเสียงชื่นชมสดใส, แอนิเมชันเฉลิมฉลอง (Confetti / Clothespin), และเปลี่ยนไปข้อถัดไปโดยอัตโนมัติ (Auto-Advance)
   * เมื่อตอบผิด: ให้สั่นเตือนเบา ๆ (Gentle Shake) พร้อมเสียงชวนให้ลองใหม่ ไม่ทำให้เด็กรู้สึกกลัวหรือท้อแท้

---

## 4. ขั้นตอนการสร้างเกมใหม่ (New Game Implementation Checklist)

- [ ] **1. สร้างภาพพื้นหลัง**: ใช้เครื่องมือสร้างภาพขนาด 16:9 สไตล์ 3D Preschool บันทึกไว้ที่ `assets/images/bg_<name>.jpg`
- [ ] **2. สร้างไฟล์โครงสร้างเกม**:
  - HTML: `<game-name>.html` (ประกอบด้วย ปุ่มโฮม, ปุ่มเสียง, ปุ่มรีเฟรช, กระดานเกม)
  - CSS: `css/<game-name>.css` (100% Viewport, Background Layer, Responsive)
  - JS: `js/<game-data>.js` และ `js/<game-name>.js`
- [ ] **3. ตรวจสอบปุ่มมาตรฐาน**: มี Home, Sound, Refresh (`#btnResetBoard`) ครบถ้วน
- [ ] **4. เพิ่มการ์ดเข้าเล่นใน `index.html`**:
  - ใส่พรีวิวรูปภาพ
  - ตรวจสอบสีปุ่ม "เข้าเล่นเกม" ใน `css/menu.css` ให้มีสีสันสดใสไล่เฉดสวยงาม (ห้ามเป็นสีขาว)
- [ ] **5. อัปเกรดเวอร์ชัน (Bump Version)**:
  - เพิ่มเลขเวอร์ชันในทุกไฟล์ HTML และ Cache query string (`?v=X.X.X`)
- [ ] **6. ตรวจสอบและ Commit & Push ขึ้น Git**:
  - ตรวจสอบ `git status` และ `git diff`
  - Push สู่กิ่ง `main` บน GitHub เสมอ
