/**
 * Size Sorting Game Logic (เกมเรียงลำดับขนาด เล็ก-ใหญ่ 8 อาชีพอาเซียน)
 * Built for Kindergarten/Preschool with high responsiveness, tactile feedback,
 * drag-and-drop on both touch and mouse, and celebratory rewards.
 */

class SizeSortingGame {
  constructor() {
    this.currentProfIndex = 0;
    this.matchedLevels = new Set();
    this.isRoundComplete = false;
    this.autoAdvanceTimer = null;
    this.autoAdvanceInterval = null;

    // DOM Elements
    this.leftCardsContainer = document.getElementById('leftCardsContainer');
    this.rightSlotsContainer = document.getElementById('rightSlotsContainer');
    this.levelBadgeText = document.getElementById('levelBadgeText');
    this.professionBadgeBtn = document.getElementById('professionBadgeBtn');
    this.professionBadgeImg = document.getElementById('professionBadgeImg');
    this.audioToggleBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.reloadRoundBtn = document.getElementById('reloadRoundBtn');

    // Modals
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationSubtitle = document.getElementById('celebrationSubtitle');
    this.sizeSummaryRow = document.getElementById('sizeSummaryRow');
    this.btnNextLevel = document.getElementById('btnNextLevel');
    this.autoCountdownText = document.getElementById('autoCountdownText');

    this.professionModalOverlay = document.getElementById('professionModalOverlay');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.professionsPickerGrid = document.getElementById('professionsPickerGrid');

    // Confetti
    this.confettiCanvas = document.getElementById('confetti-canvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;
    this.confettiParticles = [];
    this.confettiAnimId = null;

    // Audio
    this.sound = new SoundManager();

    // Active drag tracking
    this.activeDrag = null;

    this.init();
  }

  init() {
    this.initEventListeners();
    this.initConfetti();
    this.renderProfessionsPicker();
    this.startRound(this.currentProfIndex);
  }

  initEventListeners() {
    // Next round / reload round button
    this.reloadRoundBtn.addEventListener('click', () => {
      this.sound.playPop();
      this.currentProfIndex = (this.currentProfIndex + 1) % PROFESSIONS_DATA.length;
      this.startRound(this.currentProfIndex);
    });

    // Audio toggle button
    this.audioToggleBtn.addEventListener('click', () => {
      const isMuted = this.sound.toggleMute();
      if (isMuted) {
        this.audioToggleBtn.classList.remove('active');
        this.audioIcon.innerHTML = `
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        `;
      } else {
        this.audioToggleBtn.classList.add('active');
        this.audioIcon.innerHTML = `
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        `;
      }
    });

    // Start background melody on first user interaction
    const startAudioOnce = () => {
      this.sound.init();
      this.sound.startBGM();
      this.audioToggleBtn.classList.add('active');
      window.removeEventListener('pointerdown', startAudioOnce);
    };
    window.addEventListener('pointerdown', startAudioOnce);

    // Profession Badge button opens picker modal
    this.professionBadgeBtn.addEventListener('click', () => {
      this.sound.playPop();
      this.openProfessionModal();
    });

    this.modalCloseBtn.addEventListener('click', () => {
      this.sound.playPop();
      this.closeProfessionModal();
    });

    this.professionModalOverlay.addEventListener('click', (e) => {
      if (e.target === this.professionModalOverlay) {
        this.closeProfessionModal();
      }
    });

    // Next Level button on Celebration Modal
    this.btnNextLevel.addEventListener('click', () => {
      this.sound.playPop();
      this.closeCelebrationModal();
      this.currentProfIndex = (this.currentProfIndex + 1) % PROFESSIONS_DATA.length;
      this.startRound(this.currentProfIndex);
    });

    // Global pointer move / up handlers for drag and drop
    window.addEventListener('pointermove', (e) => this.handlePointerMove(e));
    window.addEventListener('pointerup', (e) => this.handlePointerUp(e));
    window.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
  }

  startRound(profIndex) {
    this.clearAutoAdvance();
    this.matchedLevels.clear();
    this.isRoundComplete = false;
    this.stopConfetti();

    const prof = PROFESSIONS_DATA[profIndex];
    if (!prof) return;

    // Update Header
    this.levelBadgeText.innerText = `ด่านที่ ${profIndex + 1} / ${PROFESSIONS_DATA.length} : ${prof.name}`;
    this.professionBadgeImg.src = prof.badge;
    this.professionBadgeImg.alt = prof.name;

    // Build Left Cards (4 sizes in SHUFFLED order)
    const shuffledLevels = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    this.leftCardsContainer.innerHTML = '';

    shuffledLevels.forEach((levelNum) => {
      const sizeDef = SIZE_LEVELS.find(s => s.level === levelNum);
      const card = document.createElement('div');
      card.className = 'size-card';
      card.dataset.level = levelNum;
      card.style.borderColor = prof.themeColor;
      card.style.background = '#ffffff';

      card.innerHTML = `
        <div class="drag-handle-badge">
          <span>🖐️</span>
          <span>ลากฉัน</span>
        </div>
        <div class="size-card-img-wrap">
          <img src="${prof.image}" 
               alt="${prof.name} ${sizeDef.label}" 
               class="size-card-img" 
               style="height: ${sizeDef.height}px;">
        </div>
      `;

      // Pointer down for drag
      card.addEventListener('pointerdown', (e) => this.handlePointerDown(e, card, levelNum, prof));
      this.leftCardsContainer.appendChild(card);
    });

    // Build Right Drop Slots (4 slots strictly ordered 1 to 4: Smallest to Largest)
    this.rightSlotsContainer.innerHTML = '';

    SIZE_LEVELS.forEach((sizeDef) => {
      const slot = document.createElement('div');
      slot.className = 'size-slot';
      slot.dataset.targetLevel = sizeDef.level;

      slot.innerHTML = `
        <div class="size-slot-badge">
          <span class="order-num">${sizeDef.level}</span>
          <span>${sizeDef.label}</span>
        </div>
        <div class="size-slot-target" id="targetSlot_${sizeDef.level}">
          <img src="${prof.image}" 
               alt="เงาขนาด ${sizeDef.label}" 
               class="size-slot-silhouette" 
               style="height: ${sizeDef.height}px;">
        </div>
      `;

      this.rightSlotsContainer.appendChild(slot);
    });
  }

  handlePointerDown(e, cardEl, levelNum, prof) {
    if (cardEl.classList.contains('is-matched') || this.isRoundComplete) return;

    this.sound.playPop();

    // Prevent default scrolling on touch
    e.preventDefault();

    const sizeDef = SIZE_LEVELS.find(s => s.level === levelNum);

    // Create ghost element
    const ghost = document.createElement('div');
    ghost.className = 'drag-ghost-element';
    ghost.innerHTML = `
      <img src="${prof.image}" 
           style="height: ${sizeDef.height * 1.08}px; object-fit: contain; pointer-events: none;"
           alt="ลากตัวละคร">
    `;
    document.body.appendChild(ghost);

    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;

    cardEl.classList.add('is-dragging');

    this.activeDrag = {
      cardEl,
      levelNum,
      prof,
      ghost,
      currentHoverSlot: null
    };
  }

  handlePointerMove(e) {
    if (!this.activeDrag) return;

    const { ghost } = this.activeDrag;
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;

    // Find if hovering over any drop slot
    // Temporarily hide ghost from pointer events so elementFromPoint sees below
    const elemBelow = document.elementFromPoint(e.clientX, e.clientY);
    const dropSlot = elemBelow ? elemBelow.closest('.size-slot') : null;

    if (this.activeDrag.currentHoverSlot !== dropSlot) {
      if (this.activeDrag.currentHoverSlot) {
        this.activeDrag.currentHoverSlot.classList.remove('drag-over');
      }
      if (dropSlot && !dropSlot.classList.contains('is-matched')) {
        dropSlot.classList.add('drag-over');
      }
      this.activeDrag.currentHoverSlot = dropSlot;
    }
  }

  handlePointerUp(e) {
    if (!this.activeDrag) return;

    const { cardEl, levelNum, prof, ghost, currentHoverSlot } = this.activeDrag;

    // Remove ghost
    if (ghost && ghost.parentNode) {
      ghost.parentNode.removeChild(ghost);
    }
    cardEl.classList.remove('is-dragging');

    if (currentHoverSlot) {
      currentHoverSlot.classList.remove('drag-over');
      const targetLevel = parseInt(currentHoverSlot.dataset.targetLevel, 10);

      if (targetLevel === levelNum) {
        // Correct Placement!
        this.handleCorrectMatch(cardEl, currentHoverSlot, levelNum, prof);
      } else {
        // Incorrect Placement
        this.handleIncorrectMatch(currentHoverSlot);
      }
    }

    this.activeDrag = null;
  }

  handleCorrectMatch(cardEl, slotEl, levelNum, prof) {
    const sizeDef = SIZE_LEVELS.find(s => s.level === levelNum);
    this.sound.playMatchSuccess();

    // Mark slot as matched
    slotEl.classList.add('is-matched');

    const targetWrap = slotEl.querySelector('.size-slot-target');
    targetWrap.innerHTML = `
      <img src="${prof.image}" 
           alt="${prof.name} ${sizeDef.label}" 
           class="placed-character-img" 
           style="height: ${sizeDef.height}px;">
    `;

    // Update left card state
    cardEl.classList.add('is-matched');
    const badge = cardEl.querySelector('.drag-handle-badge');
    if (badge) {
      badge.innerHTML = `<span>✅</span><span>ถูกคู่</span>`;
    }

    this.matchedLevels.add(levelNum);

    // Check if round completed (all 4 sizes sorted)
    if (this.matchedLevels.size === 4) {
      this.isRoundComplete = true;
      setTimeout(() => this.triggerCelebration(prof), 450);
    }
  }

  handleIncorrectMatch(slotEl) {
    this.sound.playMismatch();
    slotEl.classList.remove('shake-error');
    // Force reflow
    void slotEl.offsetWidth;
    slotEl.classList.add('shake-error');
    setTimeout(() => {
      slotEl.classList.remove('shake-error');
    }, 450);
  }

  triggerCelebration(prof) {
    try {
      if (this.sound && typeof this.sound.playCelebration === 'function') {
        this.sound.playCelebration();
      } else if (this.sound && typeof this.sound.playLevelComplete === 'function') {
        this.sound.playLevelComplete();
      }
    } catch (e) {
      console.warn('Audio celebration error:', e);
    }

    try {
      this.startConfetti();
    } catch (e) {
      console.warn('Confetti error:', e);
    }

    this.celebrationTitle.innerText = `เก่งมากเลยคนเก่ง! 🎉`;
    this.celebrationSubtitle.innerText = `เรียงลำดับขนาดอาชีพ "${prof.name}" จากเล็กไปใหญ่ได้ถูกต้องครบทั้ง 4 ขนาดแล้ว`;

    // Render summary cards (all 4 ordered 1 to 4)
    this.sizeSummaryRow.innerHTML = '';
    SIZE_LEVELS.forEach((sizeDef) => {
      const item = document.createElement('div');
      item.className = 'size-summary-item';
      item.innerHTML = `
        <img src="${prof.image}" 
             alt="${sizeDef.label}" 
             style="height: ${Math.round(sizeDef.height * 0.75)}px;">
        <span class="size-summary-label">${sizeDef.tag}</span>
      `;
      this.sizeSummaryRow.appendChild(item);
    });

    this.celebrationOverlay.classList.add('active');

    // 4 seconds auto advance countdown
    let countdown = 4;
    this.autoCountdownText.innerText = `เปลี่ยนด่านถัดไปอัตโนมัติใน ${countdown} วินาที...`;

    this.clearAutoAdvance();
    this.autoAdvanceInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        this.autoCountdownText.innerText = `เปลี่ยนด่านถัดไปอัตโนมัติใน ${countdown} วินาที...`;
      } else {
        this.clearAutoAdvance();
        this.closeCelebrationModal();
        this.currentProfIndex = (this.currentProfIndex + 1) % PROFESSIONS_DATA.length;
        this.startRound(this.currentProfIndex);
      }
    }, 1000);
  }

  closeCelebrationModal() {
    this.clearAutoAdvance();
    this.celebrationOverlay.classList.remove('active');
    this.stopConfetti();
  }

  clearAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
      this.autoAdvanceInterval = null;
    }
  }

  // Profession Selector Modal
  renderProfessionsPicker() {
    this.professionsPickerGrid.innerHTML = '';
    PROFESSIONS_DATA.forEach((prof, idx) => {
      const card = document.createElement('div');
      card.className = `prof-pick-card ${idx === this.currentProfIndex ? 'active' : ''}`;
      card.innerHTML = `
        <img src="${prof.badge}" alt="${prof.name}" class="prof-pick-img">
        <span class="prof-pick-title">${prof.name}</span>
      `;
      card.addEventListener('click', () => {
        this.sound.playPop();
        this.currentProfIndex = idx;
        this.closeProfessionModal();
        this.startRound(this.currentProfIndex);
      });
      this.professionsPickerGrid.appendChild(card);
    });
  }

  openProfessionModal() {
    this.renderProfessionsPicker();
    this.professionModalOverlay.classList.add('active');
  }

  closeProfessionModal() {
    this.professionModalOverlay.classList.remove('active');
  }

  // Confetti Physics
  initConfetti() {
    if (!this.confettiCanvas) return;
    const resizeCanvas = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  startConfetti() {
    if (!this.confettiCtx) return;
    this.confettiParticles = [];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#eab308'];

    for (let i = 0; i < 140; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
        r: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.04,
        tiltAngle: 0,
        speed: Math.random() * 4 + 3,
        shape: Math.random() > 0.4 ? 'circle' : 'rect'
      });
    }

    if (!this.confettiAnimId) {
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = 0; i < this.confettiParticles.length; i++) {
      const p = this.confettiParticles[i];
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speed;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      this.confettiCtx.beginPath();
      this.confettiCtx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.confettiCtx.arc(p.x + p.tilt, p.y, p.r, 0, Math.PI * 2, false);
      } else {
        this.confettiCtx.rect(p.x + p.tilt, p.y, p.r * 1.5, p.r);
      }
      this.confettiCtx.fill();

      // Reset when falling off screen
      if (p.y > this.confettiCanvas.height + 20) {
        p.x = Math.random() * this.confettiCanvas.width;
        p.y = -20;
      }
    }

    this.confettiAnimId = requestAnimationFrame(() => this.animateConfetti());
  }

  stopConfetti() {
    if (this.confettiAnimId) {
      cancelAnimationFrame(this.confettiAnimId);
      this.confettiAnimId = null;
    }
    if (this.confettiCtx && this.confettiCanvas) {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
    this.confettiParticles = [];
  }
}

// Start Game on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  window.sizeGame = new SizeSortingGame();
});
