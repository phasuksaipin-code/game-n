/**
 * Career Size Sorting Game Logic (เกมเรียงลำดับขนาดอาชีพในฝัน)
 * Supports 2 ordering modes:
 * - หน้า 1: เล็ก >> ใหญ่ (Small to Big)
 * - หน้า 2: ใหญ่ >> เล็ก (Big to Small)
 * 17 Cute careers with Touch & Mouse Drag-and-Drop and Tap-to-Select.
 */

class CareerSizeSortingGame {
  constructor() {
    this.sound = new SoundManager();
    this.currentModeKey = 'small_to_big';
    this.currentCareerIdx = 0;
    this.careers = typeof CAREER_SIZE_DATA !== 'undefined' ? CAREER_SIZE_DATA : [];
    this.modes = typeof CAREER_SIZE_MODES !== 'undefined' ? CAREER_SIZE_MODES : {};

    // Round state
    this.placedSlots = [null, null, null, null]; // 4 slots
    this.trayCardsList = [];
    this.selectedTrayCard = null;

    // DOM Elements
    this.boardFrame = document.getElementById('sortingBoardFrame');
    this.modeBtnSmallToBig = document.getElementById('btnModeSmallToBig');
    this.modeBtnBigToSmall = document.getElementById('btnModeBigToSmall');
    this.modeBadge = document.getElementById('currentModeBadge');
    this.careersBar = document.getElementById('careersSelectorBar');
    this.headerCareerEmoji = document.getElementById('headerCareerEmoji');
    this.headerCareerName = document.getElementById('headerCareerName');
    this.instructionTitle = document.getElementById('instructionTitle');
    this.instructionHighlight = document.getElementById('instructionHighlight');
    this.instructionArrowGuide = document.getElementById('instructionArrowGuide');
    this.slotsGrid = document.getElementById('sortingSlotsGrid');
    this.trayRow = document.getElementById('trayCardsRow');
    this.trayProgress = document.getElementById('trayProgressText');

    // Controls
    this.audioBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.resetBtn = document.getElementById('btnResetBoard');

    // Celebration
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.btnCelebrationReplay = document.getElementById('btnCelebrationReplay');
    this.btnCelebrationNext = document.getElementById('btnCelebrationNext');
    this.btnCelebrationSwitchMode = document.getElementById('btnCelebrationSwitchMode');
    this.btnSwitchModeText = document.getElementById('btnSwitchModeText');
    this.confettiCanvas = document.getElementById('confettiCanvas');

    this.initAudio();
    this.initModeSwitcher();
    this.initCareerTabs();
    this.initCelebrationControls();
    this.initConfetti();

    this.loadRound(0, 'small_to_big');
  }

  speakThai(text) {
    if (!('speechSynthesis' in window) || this.sound.isMuted) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech error:', e);
    }
  }

  initAudio() {
    if (!this.audioBtn) return;

    const startBgmOnce = () => {
      this.sound.init();
      this.sound.startBGM();
      this.audioBtn.classList.add('active');
      window.removeEventListener('pointerdown', startBgmOnce);
    };
    window.addEventListener('pointerdown', startBgmOnce);

    this.audioBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isMuted = this.sound.toggleMute();
      if (isMuted) {
        this.audioBtn.classList.remove('active');
        this.audioIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
      } else {
        this.audioBtn.classList.add('active');
        this.audioIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
      }
    });

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (err) {}
        this.loadRound(this.currentCareerIdx, this.currentModeKey);
      });
    }
  }

  initModeSwitcher() {
    if (this.modeBtnSmallToBig) {
      this.modeBtnSmallToBig.addEventListener('click', () => {
        if (this.currentModeKey === 'small_to_big') return;
        try { this.sound.playPop(); } catch (e) {}
        this.loadRound(this.currentCareerIdx, 'small_to_big');
      });
    }

    if (this.modeBtnBigToSmall) {
      this.modeBtnBigToSmall.addEventListener('click', () => {
        if (this.currentModeKey === 'big_to_small') return;
        try { this.sound.playPop(); } catch (e) {}
        this.loadRound(this.currentCareerIdx, 'big_to_small');
      });
    }
  }

  initCareerTabs() {
    if (!this.careersBar) return;
    this.careersBar.innerHTML = this.careers.map((c, idx) => `
      <button class="career-select-tab ${idx === 0 ? 'active' : ''}" data-idx="${idx}" id="career-tab-${idx}">
        <span>${c.emoji}</span>
        <span>${c.name}</span>
      </button>
    `).join('');

    this.careersBar.querySelectorAll('.career-select-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = parseInt(tab.dataset.idx, 10);
        if (idx === this.currentCareerIdx) return;
        try { this.sound.playPop(); } catch (e) {}
        this.loadRound(idx, this.currentModeKey);
      });
    });
  }

  initCelebrationControls() {
    if (this.btnCelebrationReplay) {
      this.btnCelebrationReplay.addEventListener('click', () => {
        this.celebrationOverlay.classList.remove('active');
        this.loadRound(this.currentCareerIdx, this.currentModeKey);
      });
    }

    if (this.btnCelebrationNext) {
      this.btnCelebrationNext.addEventListener('click', () => {
        this.celebrationOverlay.classList.remove('active');
        const nextIdx = (this.currentCareerIdx + 1) % this.careers.length;
        this.loadRound(nextIdx, this.currentModeKey);
      });
    }

    if (this.btnCelebrationSwitchMode) {
      this.btnCelebrationSwitchMode.addEventListener('click', () => {
        this.celebrationOverlay.classList.remove('active');
        const nextMode = this.currentModeKey === 'small_to_big' ? 'big_to_small' : 'small_to_big';
        this.loadRound(this.currentCareerIdx, nextMode);
      });
    }
  }

  loadRound(careerIdx, modeKey) {
    this.currentCareerIdx = careerIdx;
    this.currentModeKey = modeKey;
    const mode = this.modes[modeKey];
    const career = this.careers[careerIdx];
    if (!mode || !career) return;

    this.placedSlots = [null, null, null, null];
    this.selectedTrayCard = null;

    // 1. Update Mode Tabs Active State
    if (this.modeBtnSmallToBig && this.modeBtnBigToSmall) {
      if (modeKey === 'small_to_big') {
        this.modeBtnSmallToBig.classList.add('active');
        this.modeBtnBigToSmall.classList.remove('active');
        this.modeBadge.innerText = 'เล็ก ➔ ใหญ่';
        this.modeBadge.style.background = '#10b981';
      } else {
        this.modeBtnBigToSmall.classList.add('active');
        this.modeBtnSmallToBig.classList.remove('active');
        this.modeBadge.innerText = 'ใหญ่ ➔ เล็ก';
        this.modeBadge.style.background = '#ef4444';
      }
    }

    // 2. Update Career Tabs
    if (this.careersBar) {
      this.careersBar.querySelectorAll('.career-select-tab').forEach((tab, idx) => {
        tab.classList.toggle('active', idx === careerIdx);
      });
      // Scroll active tab into view
      const activeTab = document.getElementById(`career-tab-${careerIdx}`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    // 3. Update Illustrated Frame Background Image & Career Pill
    if (this.boardFrame) {
      if (modeKey === 'small_to_big') {
        this.boardFrame.style.backgroundImage = "url('assets/images/career_frame_small_to_big.png?v=1.2.7')";
      } else {
        this.boardFrame.style.backgroundImage = "url('assets/images/career_frame_big_to_small.png?v=1.2.7')";
      }
    }

    if (this.headerCareerEmoji) {
      this.headerCareerEmoji.innerText = career.emoji;
    }
    if (this.headerCareerName) {
      this.headerCareerName.innerText = career.name;
    }

    // 4. Render 4 Slots in Board
    this.renderSlots(mode, career);

    // 5. Render 4 Draggable Cards in Tray (Shuffled)
    this.renderTray(career);

    // 6. Update Progress Text
    this.updateProgress();

    // 7. Thai Voice Guidance
    const speechText = modeKey === 'small_to_big'
      ? `${career.name} เรียงลำดับจากเล็กไปหาใหญ่`
      : `${career.name} เรียงลำดับจากใหญ่ไปหาเล็ก`;
    this.speakThai(speechText);
  }

  renderSlots(mode, career) {
    if (!this.slotsGrid) return;
    this.slotsGrid.innerHTML = mode.slotLabels.map((label, idx) => {
      const targetSize = mode.targetOrder[idx];
      const sizeDesc = mode.slotSizes[idx];
      const icon = mode.id === 'small_to_big' ? ['🌱', '🌿', '🌳', '🌲'][idx] : ['🌲', '🌳', '🌿', '🌱'][idx];
      return `
        <div class="sorting-slot-box" id="slot-box-${idx}" data-slot-idx="${idx}" data-target-size="${targetSize}">
          <div class="slot-empty-content">
            <span class="slot-index-badge">${idx + 1}</span>
            <span class="slot-target-label">${sizeDesc}</span>
            <span class="slot-size-icon">${icon}</span>
          </div>
        </div>
      `;
    }).join('');

    // Attach slot click interaction for Tap-to-Select
    this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach(slot => {
      slot.addEventListener('click', () => {
        const slotIdx = parseInt(slot.dataset.slotIdx, 10);
        this.handleSlotClick(slotIdx);
      });
    });
  }

  renderTray(career) {
    if (!this.trayRow) return;
    // Shuffle the 4 cards
    const shuffled = [...career.cards].sort(() => Math.random() - 0.5);
    this.trayCardsList = shuffled;

    this.trayRow.innerHTML = shuffled.map((card, idx) => `
      <div class="sortable-tray-card" id="tray-card-${card.size}" data-size="${card.size}" data-card-idx="${idx}" title="${card.label}">
        <img src="${card.img}" alt="${career.name} ${card.label}" class="tray-card-img">
      </div>
    `).join('');

    // Attach Pointer Events (Drag & Drop + Tap)
    this.trayRow.querySelectorAll('.sortable-tray-card').forEach(cardEl => {
      this.attachCardInteractions(cardEl, career);
    });
  }

  attachCardInteractions(cardEl, career) {
    const cardSize = parseInt(cardEl.dataset.size, 10);
    const cardData = career.cards.find(c => c.size === cardSize);
    if (!cardData) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let ghostEl = null;

    const onPointerDown = (e) => {
      if (cardEl.classList.contains('is-placed')) return;
      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      // Prepare Ghost Element for dragging
      const rect = cardEl.getBoundingClientRect();
      ghostEl = document.createElement('div');
      ghostEl.className = 'sort-drag-ghost';
      ghostEl.style.width = `${rect.width}px`;
      ghostEl.style.height = `${rect.height}px`;
      ghostEl.style.left = `${e.clientX}px`;
      ghostEl.style.top = `${e.clientY}px`;
      ghostEl.innerHTML = `<img src="${cardData.img}" alt="${cardData.label}">`;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    };

    const onPointerMove = (e) => {
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (!isDragging && dist > 8) {
        isDragging = true;
        document.body.appendChild(ghostEl);
        cardEl.style.opacity = '0.3';
        try { this.sound.playPop(); } catch (err) {}
      }

      if (isDragging && ghostEl) {
        ghostEl.style.left = `${e.clientX}px`;
        ghostEl.style.top = `${e.clientY}px`;

        // Highlight slot under pointer
        const slotEl = this.getSlotUnderPointer(e.clientX, e.clientY);
        this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach(s => s.classList.remove('drag-over'));
        if (slotEl && !this.placedSlots[parseInt(slotEl.dataset.slotIdx, 10)]) {
          slotEl.classList.add('drag-over');
        }
      }
    };

    const onPointerUp = (e) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);

      if (isDragging) {
        if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl);
        cardEl.style.opacity = '1';
        this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach(s => s.classList.remove('drag-over'));

        // Check drop target
        const slotEl = this.getSlotUnderPointer(e.clientX, e.clientY);
        if (slotEl) {
          const slotIdx = parseInt(slotEl.dataset.slotIdx, 10);
          this.attemptPlaceCard(cardData, slotIdx);
        }
      } else {
        // Simple tap: Toggle selection for Tap-to-Select
        this.handleCardTap(cardData, cardEl);
      }
    };

    const onPointerCancel = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl);
      cardEl.style.opacity = '1';
      this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach(s => s.classList.remove('drag-over'));
    };

    cardEl.addEventListener('pointerdown', onPointerDown);
  }

  getSlotUnderPointer(clientX, clientY) {
    if (!this.slotsGrid) return null;
    const slots = this.slotsGrid.querySelectorAll('.sorting-slot-box');
    for (const slot of slots) {
      const rect = slot.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return slot;
      }
    }
    return null;
  }

  handleCardTap(cardData, cardEl) {
    if (this.selectedTrayCard && this.selectedTrayCard.size === cardData.size) {
      // Deselect
      this.clearSelection();
    } else {
      // Select this card
      this.clearSelection();
      this.selectedTrayCard = cardData;
      cardEl.classList.add('selected');
      try { this.sound.playPop(); } catch (e) {}

      // Highlight empty slots
      this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach((slot, idx) => {
        if (!this.placedSlots[idx]) {
          slot.classList.add('tap-target-active');
        }
      });
    }
  }

  clearSelection() {
    this.selectedTrayCard = null;
    if (this.trayRow) {
      this.trayRow.querySelectorAll('.sortable-tray-card').forEach(c => c.classList.remove('selected'));
    }
    if (this.slotsGrid) {
      this.slotsGrid.querySelectorAll('.sorting-slot-box').forEach(s => s.classList.remove('tap-target-active'));
    }
  }

  handleSlotClick(slotIdx) {
    // If a card was already placed in this slot, click removes it back to tray
    if (this.placedSlots[slotIdx]) {
      this.removeCardFromSlot(slotIdx);
      return;
    }

    // If a card was selected from tray, attempt placement
    if (this.selectedTrayCard) {
      this.attemptPlaceCard(this.selectedTrayCard, slotIdx);
      this.clearSelection();
    }
  }

  attemptPlaceCard(cardData, slotIdx) {
    const mode = this.modes[this.currentModeKey];
    const targetSize = mode.targetOrder[slotIdx];
    const slotEl = document.getElementById(`slot-box-${slotIdx}`);

    if (cardData.size === targetSize) {
      // Correct!
      this.placeCardInSlot(cardData, slotIdx);
    } else {
      // Incorrect!
      try { this.sound.playWrong(); } catch (err) {}
      if (slotEl) {
        slotEl.classList.add('shake-error');
        setTimeout(() => slotEl.classList.remove('shake-error'), 450);
      }
    }
  }

  placeCardInSlot(cardData, slotIdx) {
    this.placedSlots[slotIdx] = cardData;
    const slotEl = document.getElementById(`slot-box-${slotIdx}`);
    const cardEl = document.getElementById(`tray-card-${cardData.size}`);

    // Sound
    try { this.sound.playChime(); } catch (e) {}

    // Mark card in tray as placed
    if (cardEl) {
      cardEl.classList.add('is-placed');
      cardEl.classList.remove('selected');
    }

    // Render placed card in slot
    if (slotEl) {
      slotEl.innerHTML = `
        <div class="slot-placed-card" title="แตะเพื่อนำกลับ">
          <img src="${cardData.img}" alt="${cardData.label}" class="slot-placed-img">
          <button class="slot-remove-btn" title="นำกลับลงกล่อง">✕</button>
        </div>
      `;

      // Tap remove
      const removeBtn = slotEl.querySelector('.slot-remove-btn');
      if (removeBtn) {
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.removeCardFromSlot(slotIdx);
        });
      }
    }

    this.clearSelection();
    this.updateProgress();
    this.checkWinCondition();
  }

  removeCardFromSlot(slotIdx) {
    const cardData = this.placedSlots[slotIdx];
    if (!cardData) return;

    this.placedSlots[slotIdx] = null;
    try { this.sound.playPop(); } catch (e) {}

    // Reactivate card in tray
    const cardEl = document.getElementById(`tray-card-${cardData.size}`);
    if (cardEl) {
      cardEl.classList.remove('is-placed');
    }

    // Reset slot display
    const mode = this.modes[this.currentModeKey];
    const slotEl = document.getElementById(`slot-box-${slotIdx}`);
    if (slotEl) {
      const targetSize = mode.targetOrder[slotIdx];
      const sizeDesc = mode.slotSizes[slotIdx];
      const icon = mode.id === 'small_to_big' ? ['🌱', '🌿', '🌳', '🌲'][slotIdx] : ['🌲', '🌳', '🌿', '🌱'][slotIdx];
      slotEl.innerHTML = `
        <div class="slot-empty-content">
          <span class="slot-index-badge">${slotIdx + 1}</span>
          <span class="slot-target-label">${sizeDesc}</span>
          <span class="slot-size-icon">${icon}</span>
        </div>
      `;
    }

    this.updateProgress();
  }

  updateProgress() {
    const placedCount = this.placedSlots.filter(s => s !== null).length;
    const remaining = 4 - placedCount;
    if (this.trayProgress) {
      this.trayProgress.innerText = remaining === 0 ? '✨ วางครบแล้ว!' : `เหลืออีก ${remaining} ชิ้น`;
    }
  }

  checkWinCondition() {
    const allPlaced = this.placedSlots.every(s => s !== null);
    if (!allPlaced) return;

    // Celebration!
    setTimeout(() => {
      try { this.sound.playCheer(); } catch (e) {}
      this.triggerConfetti();

      const career = this.careers[this.currentCareerIdx];
      const mode = this.modes[this.currentModeKey];

      // Update Switch Mode button label
      const otherModeName = this.currentModeKey === 'small_to_big' ? 'หน้า 2: ใหญ่ >> เล็ก' : 'หน้า 1: เล็ก >> ใหญ่';
      if (this.btnSwitchModeText) {
        this.btnSwitchModeText.innerText = `สลับไป${otherModeName}`;
      }

      if (this.celebrationOverlay) {
        this.celebrationOverlay.classList.add('active');
      }

      this.speakThai(`เก่งมากครับ! เรียงขนาด${career.name}ได้ถูกต้องครบถ้วนแล้ว`);
    }, 350);
  }

  initConfetti() {
    if (!this.confettiCanvas) return;
    this.ctx = this.confettiCanvas.getContext('2d');
    this.particles = [];
    this.isConfettiActive = false;

    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.ctx) return;
    this.particles = [];
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#facc15'];

    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
        y: window.innerHeight * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 16,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        gravity: 0.38,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.008
      });
    }

    if (!this.isConfettiActive) {
      this.isConfettiActive = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.isConfettiActive) return;
    this.ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    let activeCount = 0;
    for (const p of this.particles) {
      if (p.life <= 0) continue;
      activeCount++;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vr;
      p.life -= p.decay;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size * 0.6);
      this.ctx.restore();
    }

    if (activeCount > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.isConfettiActive = false;
      this.ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.careerSizeSortingGame = new CareerSizeSortingGame();
});
