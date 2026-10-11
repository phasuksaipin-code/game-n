/**
 * Event Sequencing Game Logic (เกมเรียงลำดับเหตุการณ์ก่อน - หลัง)
 * 5 Rich Educational Stories with 5 Chronological Steps Each
 * Features:
 * - Unified SoundManager integration & Web Speech API Thai voiceover
 * - Touch & Mouse Drag-and-Drop and Tap-to-Select / Tap-to-Place
 * - Snappy card placement with colored border matching
 * - Fullscreen Confetti & Celebration Modal with level progression
 */

class EventSequencingGame {
  constructor() {
    this.sound = new SoundManager();
    this.currentStoryIdx = 0;
    this.stories = typeof EVENT_SEQUENCING_DATA !== 'undefined' ? EVENT_SEQUENCING_DATA : [];

    // State
    this.placedSlots = [null, null, null, null, null]; // 5 slots
    this.trayCardsList = [];
    this.selectedTrayCard = null;

    // DOM Elements
    this.boardFrame = document.getElementById('eventBoardFrame');
    this.storiesBar = document.getElementById('storiesSelectorBar');
    this.headerLevelBadge = document.getElementById('headerLevelBadge');
    this.boardStoryEmoji = document.getElementById('boardStoryEmoji');
    this.boardStoryName = document.getElementById('boardStoryName');
    this.slotsGrid = document.getElementById('eventSlotsGrid');
    this.trayCardsCol = document.getElementById('eventTrayCardsCol');
    this.trayProgress = document.getElementById('trayProgressText');

    // Controls
    this.audioBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.resetBtn = document.getElementById('btnResetBoard');

    // Celebration
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationDesc = document.getElementById('celebrationDesc');
    this.btnCelebrationReplay = document.getElementById('btnCelebrationReplay');
    this.btnCelebrationNext = document.getElementById('btnCelebrationNext');
    this.confettiCanvas = document.getElementById('confettiCanvas');

    this.initAudio();
    this.initStoryTabs();
    this.initCelebrationControls();
    this.initConfetti();

    // Load first story
    this.loadStory(0);
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
        this.loadStory(this.currentStoryIdx);
      });
    }
  }

  initStoryTabs() {
    if (!this.storiesBar) return;
    this.storiesBar.innerHTML = '';

    this.stories.forEach((story, idx) => {
      const btn = document.createElement('button');
      btn.className = `story-tab-btn ${idx === 0 ? 'active' : ''}`;
      btn.dataset.idx = idx;
      btn.innerHTML = `
        <span class="story-tab-emoji">${story.emoji}</span>
        <span class="story-tab-label">เรื่องที่ ${idx + 1}: ${story.shortTitle}</span>
      `;

      btn.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (err) {}
        this.loadStory(idx);
      });

      this.storiesBar.appendChild(btn);
    });
  }

  loadStory(storyIdx) {
    if (storyIdx < 0 || storyIdx >= this.stories.length) return;
    this.currentStoryIdx = storyIdx;
    const story = this.stories[storyIdx];

    // Reset state
    this.placedSlots = [null, null, null, null, null];
    this.selectedTrayCard = null;

    // 1. Update header level badge
    if (this.headerLevelBadge) {
      this.headerLevelBadge.innerText = `เรื่องที่ ${storyIdx + 1} / ${this.stories.length}`;
    }

    // 2. Update Story Tabs
    if (this.storiesBar) {
      const tabs = this.storiesBar.querySelectorAll('.story-tab-btn');
      tabs.forEach((tab, i) => {
        if (i === storyIdx) {
          tab.classList.add('active');
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          tab.classList.remove('active');
        }
      });
    }

    // 3. Update Board Story Pill
    if (this.boardStoryEmoji) this.boardStoryEmoji.innerText = story.emoji;
    if (this.boardStoryName) this.boardStoryName.innerText = story.title;

    // 4. Render 5 Slots on Board Frame
    this.renderSlots(story);

    // 5. Shuffle and Render Tray Cards
    this.renderTray(story);

    // 6. Voice Announcement
    setTimeout(() => {
      this.speakThai(story.speechIntro);
    }, 250);
  }

  renderSlots(story) {
    if (!this.slotsGrid) return;
    this.slotsGrid.innerHTML = '';

    for (let slotIdx = 0; slotIdx < 5; slotIdx++) {
      const targetOrder = slotIdx + 1;
      const cardInfo = story.cards[slotIdx];

      const slotBox = document.createElement('div');
      slotBox.className = 'event-slot-box';
      slotBox.dataset.slotIndex = slotIdx;
      slotBox.dataset.targetOrder = targetOrder;
      slotBox.dataset.color = cardInfo.color;

      // Slot Click (Tap-to-Place)
      slotBox.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleSlotClick(slotIdx);
      });

      // Pointer Drag-over target setup
      this.setupSlotDropEvents(slotBox, slotIdx);

      this.slotsGrid.appendChild(slotBox);
    }
  }

  setupSlotDropEvents(slotBox, slotIdx) {
    slotBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      slotBox.classList.add('drag-over');
    });

    slotBox.addEventListener('dragleave', () => {
      slotBox.classList.remove('drag-over');
    });

    slotBox.addEventListener('drop', (e) => {
      e.preventDefault();
      slotBox.classList.remove('drag-over');
      const order = parseInt(e.dataTransfer.getData('text/plain'), 10);
      if (!isNaN(order)) {
        this.attemptPlacement(order, slotIdx);
      }
    });
  }

  renderTray(story) {
    if (!this.trayCardsCol) return;
    this.trayCardsCol.innerHTML = '';

    // Clone and shuffle cards
    const shuffled = [...story.cards].sort(() => Math.random() - 0.5);
    this.trayCardsList = shuffled;

    shuffled.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'sortable-event-card';
      cardEl.dataset.order = card.order;
      cardEl.draggable = true;

      cardEl.innerHTML = `
        <img src="${card.img}?v=1.2.8" alt="${card.title}" class="event-card-img" draggable="false">
      `;

      // Setup Drag & Drop and Tap interactions
      this.setupCardDragEvents(cardEl, card);
      this.setupCardTapEvents(cardEl, card);

      this.trayCardsCol.appendChild(cardEl);
    });

    this.updateTrayProgress();
  }

  setupCardDragEvents(cardEl, card) {
    let ghost = null;

    // HTML5 Drag for desktop
    cardEl.addEventListener('dragstart', (e) => {
      if (cardEl.classList.contains('is-placed')) return;
      e.dataTransfer.setData('text/plain', card.order);
      cardEl.classList.add('dragging');
      this.selectTrayCard(card.order);
    });

    cardEl.addEventListener('dragend', () => {
      cardEl.classList.remove('dragging');
    });

    // Unified Pointer Drag for Touch & Mouse
    cardEl.addEventListener('pointerdown', (e) => {
      if (cardEl.classList.contains('is-placed')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const startX = e.clientX;
      const startY = e.clientY;
      let hasDragged = false;

      const onPointerMove = (moveEvt) => {
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;

        if (!hasDragged && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
          hasDragged = true;
          this.selectTrayCard(card.order);

          // Create floating drag ghost
          ghost = document.createElement('div');
          ghost.className = 'event-drag-ghost';
          ghost.style.width = `${cardEl.offsetWidth}px`;
          ghost.style.height = `${cardEl.offsetHeight}px`;
          ghost.innerHTML = `<img src="${card.img}?v=1.2.8" alt="drag">`;
          document.body.appendChild(ghost);
        }

        if (hasDragged && ghost) {
          ghost.style.left = `${moveEvt.clientX}px`;
          ghost.style.top = `${moveEvt.clientY}px`;

          // Detect slot hover
          this.checkSlotHover(moveEvt.clientX, moveEvt.clientY);
        }
      };

      const onPointerUp = (upEvt) => {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);

        if (ghost) {
          ghost.remove();
          ghost = null;
        }

        if (hasDragged) {
          this.clearAllSlotHovers();
          const targetSlotIdx = this.findSlotUnderPointer(upEvt.clientX, upEvt.clientY);
          if (targetSlotIdx !== null) {
            this.attemptPlacement(card.order, targetSlotIdx);
          }
        }
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    });
  }

  setupCardTapEvents(cardEl, card) {
    cardEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (cardEl.classList.contains('is-placed')) return;

      if (this.selectedTrayCard === card.order) {
        this.deselectTrayCard();
      } else {
        this.selectTrayCard(card.order);
        this.highlightMatchingOrEmptySlots();
      }
    });
  }

  selectTrayCard(order) {
    this.selectedTrayCard = order;
    if (!this.trayCardsCol) return;

    this.trayCardsCol.querySelectorAll('.sortable-event-card').forEach((el) => {
      if (parseInt(el.dataset.order, 10) === order) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });

    try { this.sound.playPop(); } catch (e) {}
  }

  deselectTrayCard() {
    this.selectedTrayCard = null;
    if (this.trayCardsCol) {
      this.trayCardsCol.querySelectorAll('.sortable-event-card').forEach((el) => {
        el.classList.remove('selected');
      });
    }
    this.clearAllSlotHovers();
  }

  highlightMatchingOrEmptySlots() {
    if (!this.slotsGrid || !this.selectedTrayCard) return;

    this.slotsGrid.querySelectorAll('.event-slot-box').forEach((box) => {
      const slotIdx = parseInt(box.dataset.slotIndex, 10);
      if (this.placedSlots[slotIdx] === null) {
        box.classList.add('tap-target-active');
      } else {
        box.classList.remove('tap-target-active');
      }
    });
  }

  handleSlotClick(slotIdx) {
    if (this.selectedTrayCard !== null) {
      this.attemptPlacement(this.selectedTrayCard, slotIdx);
    }
  }

  checkSlotHover(clientX, clientY) {
    if (!this.slotsGrid) return;
    this.slotsGrid.querySelectorAll('.event-slot-box').forEach((box) => {
      const rect = box.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        box.classList.add('drag-over');
      } else {
        box.classList.remove('drag-over');
      }
    });
  }

  clearAllSlotHovers() {
    if (!this.slotsGrid) return;
    this.slotsGrid.querySelectorAll('.event-slot-box').forEach((box) => {
      box.classList.remove('drag-over');
      box.classList.remove('tap-target-active');
    });
  }

  findSlotUnderPointer(clientX, clientY) {
    if (!this.slotsGrid) return null;
    const boxes = this.slotsGrid.querySelectorAll('.event-slot-box');
    for (let i = 0; i < boxes.length; i++) {
      const rect = boxes[i].getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return parseInt(boxes[i].dataset.slotIndex, 10);
      }
    }
    return null;
  }

  attemptPlacement(cardOrder, slotIdx) {
    const expectedOrder = slotIdx + 1; // Slot 0 requires Order 1, Slot 1 requires Order 2, etc.
    const slotBox = this.slotsGrid.querySelector(`[data-slot-index="${slotIdx}"]`);

    if (cardOrder === expectedOrder) {
      // Correct placement!
      this.placedSlots[slotIdx] = cardOrder;

      // Find story card data
      const story = this.stories[this.currentStoryIdx];
      const cardData = story.cards.find((c) => c.order === cardOrder);

      // Render placed card in slot
      this.renderPlacedCard(slotBox, cardData, slotIdx);

      // Mark card in tray as placed
      const trayCard = this.trayCardsCol.querySelector(`[data-order="${cardOrder}"]`);
      if (trayCard) {
        trayCard.classList.add('is-placed');
        trayCard.classList.remove('selected');
      }

      this.deselectTrayCard();
      this.updateTrayProgress();

      // Sound and speech
      try { this.sound.playSnap(); } catch (e) {}
      if (cardData) {
        this.speakThai(cardData.speech);
      }

      // Check if all 5 slots are placed
      if (this.placedSlots.every((s) => s !== null)) {
        setTimeout(() => {
          this.triggerCelebration();
        }, 600);
      }
    } else {
      // Incorrect placement! Shake slot
      if (slotBox) {
        slotBox.classList.add('shake-error');
        setTimeout(() => {
          slotBox.classList.remove('shake-error');
        }, 400);
      }

      try { this.sound.playPop(); } catch (e) {}
      this.speakThai("ลองสังเกตสีขอบหรือขั้นตอนอีกครั้งนะคะ");
    }
  }

  renderPlacedCard(slotBox, cardData, slotIdx) {
    slotBox.innerHTML = `
      <div class="slot-placed-card" data-order="${cardData.order}" title="คลิกเพื่อยกเลิก">
        <img src="${cardData.img}?v=1.2.8" alt="${cardData.title}" class="slot-placed-img">
        <button class="slot-remove-btn" title="นำออก" aria-label="นำออก">✕</button>
      </div>
    `;

    const placedCardEl = slotBox.querySelector('.slot-placed-card');
    const removeBtn = slotBox.querySelector('.slot-remove-btn');

    const removeHandler = (e) => {
      e.stopPropagation();
      this.removePlacedCard(slotIdx);
    };

    if (removeBtn) removeBtn.addEventListener('click', removeHandler);
    if (placedCardEl) placedCardEl.addEventListener('click', removeHandler);
  }

  removePlacedCard(slotIdx) {
    const order = this.placedSlots[slotIdx];
    if (order === null) return;

    this.placedSlots[slotIdx] = null;
    const slotBox = this.slotsGrid.querySelector(`[data-slot-index="${slotIdx}"]`);
    if (slotBox) slotBox.innerHTML = '';

    // Re-enable in tray
    const trayCard = this.trayCardsCol.querySelector(`[data-order="${order}"]`);
    if (trayCard) {
      trayCard.classList.remove('is-placed');
    }

    try { this.sound.playPop(); } catch (e) {}
    this.updateTrayProgress();
  }

  updateTrayProgress() {
    if (!this.trayProgress) return;
    const remaining = this.placedSlots.filter((s) => s === null).length;
    if (remaining === 0) {
      this.trayProgress.innerText = 'ครบถ้วน! 🎉';
      this.trayProgress.style.background = '#dcfce7';
      this.trayProgress.style.color = '#15803d';
    } else {
      this.trayProgress.innerText = `เหลืออีก ${remaining} ชิ้น`;
      this.trayProgress.style.background = '#e0f2fe';
      this.trayProgress.style.color = '#0284c7';
    }
  }

  triggerCelebration() {
    try { this.sound.playCheer(); } catch (e) {}
    const story = this.stories[this.currentStoryIdx];

    if (this.celebrationTitle) {
      this.celebrationTitle.innerText = `เก่งมากเลยค่ะ! 🌟`;
    }
    if (this.celebrationDesc) {
      this.celebrationDesc.innerText = `หนูเรียงลำดับเหตุการณ์ "${story.title}" ถูกต้องครบทั้ง 5 ขั้นตอนแล้ว ยอดเยี่ยมที่สุดเลย!`;
    }

    if (this.celebrationOverlay) {
      this.celebrationOverlay.classList.add('active');
    }

    this.startConfetti();
    this.speakThai(`เก่งมากเลยค่ะ! หนูเรียงลำดับเหตุการณ์ ${story.title} ถูกต้องครบถ้วนแล้วค่ะ`);
  }

  initCelebrationControls() {
    if (this.btnCelebrationReplay) {
      this.btnCelebrationReplay.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.closeCelebration();
        this.loadStory(this.currentStoryIdx);
      });
    }

    if (this.btnCelebrationNext) {
      this.btnCelebrationNext.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.closeCelebration();
        const nextIdx = (this.currentStoryIdx + 1) % this.stories.length;
        this.loadStory(nextIdx);
      });
    }
  }

  closeCelebration() {
    if (this.celebrationOverlay) {
      this.celebrationOverlay.classList.remove('active');
    }
    this.stopConfetti();
  }

  initConfetti() {
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.confettiParticles = [];
    this.confettiAnimId = null;

    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  startConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    this.confettiParticles = [];
    const colors = ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#a855f7'];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: -10 - Math.random() * 40,
        w: 8 + Math.random() * 8,
        h: 12 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 3,
        vy: 2.5 + Math.random() * 4,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    const render = () => {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      this.confettiParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.rotSpeed;

        this.confettiCtx.save();
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rot * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        this.confettiCtx.restore();

        if (p.y > this.confettiCanvas.height + 20) {
          p.y = -10;
          p.x = Math.random() * this.confettiCanvas.width;
        }
      });
      this.confettiAnimId = requestAnimationFrame(render);
    };

    if (this.confettiAnimId) cancelAnimationFrame(this.confettiAnimId);
    this.confettiAnimId = requestAnimationFrame(render);
  }

  stopConfetti() {
    if (this.confettiAnimId) {
      cancelAnimationFrame(this.confettiAnimId);
      this.confettiAnimId = null;
    }
    if (this.confettiCtx && this.confettiCanvas) {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// Instantiate game on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.eventSequencingGame = new EventSequencingGame();
});
