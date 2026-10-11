// jamneak-game.js - ระบบการเล่นเกมจำแนกสิ่งมีชีวิตและสิ่งไม่มีชีวิต
// รองรับการลากวาง (Drag & Drop), คลิกเลือก, เสียงพากย์ไทย, และสลับตำแหน่งพาเลตซ้าย/ขวา

class JamneakGame {
  constructor() {
    this.round = 1;
    this.totalRounds = 12;
    this.score = 0;
    this.currentCards = []; // 3 cards for the round
    this.palettePosition = 'left'; // 'left' or 'right'
    this.selectedCard = null;
    this.isProcessing = false;
    this.livingSortedCount = 0;
    this.nonlivingSortedCount = 0;

    // Web Audio Sound Manager
    this.soundManager = typeof SoundManager !== 'undefined' ? new SoundManager() : null;

    // DOM Elements
    this.arena = document.getElementById('jamneakArena');
    this.paletteList = document.getElementById('paletteCardsList');
    this.boxLiving = document.getElementById('boxLiving');
    this.boxNonLiving = document.getElementById('boxNonLiving');
    this.roundBadge = document.getElementById('roundBadgeText');
    this.scoreBadge = document.getElementById('scoreBadgeText');
    this.paletteSideTag = document.getElementById('paletteSideTag');
    this.audioToggleBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.btnResetBoard = document.getElementById('btnResetBoard');
    this.roundClearModal = document.getElementById('roundClearModal');
    this.btnNextRound = document.getElementById('btnNextRound');
    this.countLivingText = document.getElementById('countLivingText');
    this.countNonLivingText = document.getElementById('countNonLivingText');
    this.stackLiving = document.getElementById('stackLiving');
    this.stackNonLiving = document.getElementById('stackNonLiving');

    // Drag tracking
    this.activeDrag = null;

    this.init();
  }

  init() {
    // Sound init
    if (this.soundManager) {
      this.soundManager.init();
    }

    // Sound toggle
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', () => {
        if (!this.soundManager) return;
        this.soundManager.isMuted = !this.soundManager.isMuted;
        this.updateAudioIcon();
        if (!this.soundManager.isMuted) {
          this.soundManager.playPop();
        }
      });
    }

    // Reset current round button
    if (this.btnResetBoard) {
      this.btnResetBoard.addEventListener('click', () => {
        if (this.soundManager) this.soundManager.playPop();
        this.setupRound(true);
      });
    }

    // Next round button in modal
    if (this.btnNextRound) {
      this.btnNextRound.addEventListener('click', () => {
        if (this.roundClearModal) this.roundClearModal.style.display = 'none';
        this.nextRound();
      });
    }

    // Setup Target Boxes Click & Pointer Listeners
    this.setupBoxTarget(this.boxLiving, 'living');
    this.setupBoxTarget(this.boxNonLiving, 'nonliving');

    // Strict zero-scroll lock for 100% viewport compliance
    window.addEventListener('scroll', () => {
      if (window.scrollX !== 0 || window.scrollY !== 0) {
        window.scrollTo(0, 0);
      }
    }, { passive: false });

    // Start first round
    this.setupRound();
  }

  updateAudioIcon() {
    if (!this.audioIcon || !this.soundManager) return;
    if (this.soundManager.isMuted) {
      this.audioIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
    } else {
      this.audioIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    }
  }

  // Setup a round with 3 random choices and randomized palette side
  setupRound(isRestart = false) {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (!isRestart) {
      // Randomize palette side: 'left' or 'right'
      this.palettePosition = Math.random() < 0.5 ? 'left' : 'right';
    }

    // Apply layout class
    this.arena.classList.remove('layout-palette-left', 'layout-palette-right');
    this.arena.classList.add(`layout-palette-${this.palettePosition}`);

    if (this.paletteSideTag) {
      this.paletteSideTag.textContent = this.palettePosition === 'left' ? 'พาเลตอยู่ด้านซ้าย' : 'พาเลตอยู่ด้านขวา';
    }

    // Pick 3 random cards from pool
    // Ensure we have a lively mix of living and non-living cards
    const pool = [...JAMNEAK_CARDS];
    this.shuffleArray(pool);

    // Pick 3 distinct cards
    this.currentCards = pool.slice(0, 3).map(card => ({
      ...card,
      uid: card.id + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
    }));

    this.selectedCard = null;
    this.updateBadges();
    this.renderPaletteCards();
  }

  updateBadges() {
    if (this.roundBadge) {
      this.roundBadge.textContent = `รอบที่ ${this.round} / ${this.totalRounds}`;
    }
    if (this.scoreBadge) {
      this.scoreBadge.textContent = `${this.score} คะแนน`;
    }
    if (this.countLivingText) {
      this.countLivingText.textContent = `หย่อนแล้ว ${this.livingSortedCount} ใบ`;
    }
    if (this.countNonLivingText) {
      this.countNonLivingText.textContent = `หย่อนแล้ว ${this.nonlivingSortedCount} ใบ`;
    }
  }

  renderPaletteCards() {
    this.paletteList.innerHTML = '';

    if (this.currentCards.length === 0) {
      this.paletteList.innerHTML = '<div style="text-align:center; padding: 20px; color:#10b981; font-weight:700;">✨ จำแนกครบทุกใบแล้ว! ยอดเยี่ยมมาก ✨</div>';
      return;
    }

    this.currentCards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'choice-card-item';
      cardEl.id = `card-${card.uid}`;
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('tabindex', '0');
      cardEl.setAttribute('aria-label', `${card.name} ${card.hint}`);

      cardEl.innerHTML = `
        <div class="choice-card-img-wrap">
          <img src="${card.img}" alt="${card.name}" class="choice-card-img" draggable="false">
        </div>
        <div class="choice-card-info">
          <div class="choice-card-name">${card.name}</div>
          <div class="choice-card-hint">${card.hint}</div>
        </div>
        <button class="choice-card-audio-btn" title="ฟังเสียงอ่าน">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
        </button>
      `;

      // Listeners
      const audioBtn = cardEl.querySelector('.choice-card-audio-btn');
      audioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.speakThai(card.name);
      });

      // Click to select
      cardEl.addEventListener('click', () => {
        this.selectCard(card, cardEl);
      });

      // Pointer drag setup (Cross-platform touch + mouse)
      this.setupPointerDrag(cardEl, card);

      this.paletteList.appendChild(cardEl);
    });
  }

  selectCard(card, cardEl) {
    if (this.isProcessing) return;

    if (this.selectedCard && this.selectedCard.uid === card.uid) {
      // Toggle deselect
      this.selectedCard = null;
      cardEl.classList.remove('selected');
      return;
    }

    // Deselect other cards
    document.querySelectorAll('.choice-card-item').forEach(el => el.classList.remove('selected'));

    this.selectedCard = card;
    cardEl.classList.add('selected');

    if (this.soundManager) {
      this.soundManager.playPop();
    }
    this.speakThai(card.name);
  }

  // Setup Box Target (Drop zone and click target)
  setupBoxTarget(boxEl, boxType) {
    boxEl.addEventListener('click', () => {
      if (!this.selectedCard || this.isProcessing) return;
      this.processPlacement(this.selectedCard, boxType, boxEl);
    });

    const dropSlot = boxEl.querySelector('.box-drop-slot');
    if (dropSlot) {
      dropSlot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.selectedCard || this.isProcessing) return;
        this.processPlacement(this.selectedCard, boxType, boxEl);
      });
    }
  }

  // Cross-platform pointer drag implementation
  setupPointerDrag(cardEl, card) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let dragProxy = null;

    const onPointerDown = (e) => {
      if (this.isProcessing) return;
      if (e.target.closest('.choice-card-audio-btn')) return;

      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      cardEl.setPointerCapture(e.pointerId);

      const onPointerMove = (moveEv) => {
        const dx = moveEv.clientX - startX;
        const dy = moveEv.clientY - startY;

        if (!isDragging && Math.hypot(dx, dy) > 8) {
          isDragging = true;
          this.selectCard(card, cardEl);

          // Create floating proxy
          dragProxy = document.createElement('div');
          dragProxy.className = 'drag-flying-proxy';
          dragProxy.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
          document.body.appendChild(dragProxy);
          cardEl.classList.add('is-dragging');
        }

        if (isDragging && dragProxy) {
          dragProxy.style.left = `${moveEv.clientX}px`;
          dragProxy.style.top = `${moveEv.clientY}px`;

          // Check if hovering over living or non-living box
          const elementsUnder = document.elementsFromPoint(moveEv.clientX, moveEv.clientY);
          const isOverLiving = elementsUnder.some(el => el.closest('#boxLiving'));
          const isOverNonLiving = elementsUnder.some(el => el.closest('#boxNonLiving'));

          this.boxLiving.classList.toggle('drag-target-hover', isOverLiving);
          this.boxNonLiving.classList.toggle('drag-target-hover', isOverNonLiving);
        }
      };

      const onPointerUp = (upEv) => {
        cardEl.removeEventListener('pointermove', onPointerMove);
        cardEl.removeEventListener('pointerup', onPointerUp);
        cardEl.removeEventListener('pointercancel', onPointerUp);

        this.boxLiving.classList.remove('drag-target-hover');
        this.boxNonLiving.classList.remove('drag-target-hover');
        cardEl.classList.remove('is-dragging');

        if (dragProxy) {
          dragProxy.remove();
          dragProxy = null;
        }

        if (isDragging) {
          // Drop check
          const elementsUnder = document.elementsFromPoint(upEv.clientX, upEv.clientY);
          const overLiving = elementsUnder.some(el => el.closest('#boxLiving'));
          const overNonLiving = elementsUnder.some(el => el.closest('#boxNonLiving'));

          if (overLiving) {
            this.processPlacement(card, 'living', this.boxLiving);
          } else if (overNonLiving) {
            this.processPlacement(card, 'nonliving', this.boxNonLiving);
          }
        }
      };

      cardEl.addEventListener('pointermove', onPointerMove);
      cardEl.addEventListener('pointerup', onPointerUp);
      cardEl.addEventListener('pointercancel', onPointerUp);
    };

    cardEl.addEventListener('pointerdown', onPointerDown);
  }

  // Process placing a card into target box
  processPlacement(card, targetBoxType, targetBoxEl) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const cardEl = document.getElementById(`card-${card.uid}`);
    const isCorrect = card.type === targetBoxType;

    if (isCorrect) {
      // Correct Match!
      if (this.soundManager) {
        this.soundManager.playMatchSuccess();
      }

      const typeLabel = card.type === 'living' ? 'สิ่งมีชีวิต' : 'สิ่งไม่มีชีวิต';
      this.speakThai(`ถูกต้อง! ${card.name} คือ ${typeLabel}`);

      // Animate card dropping into the box slot
      this.animateCardDropIntoBox(card, cardEl, targetBoxEl, () => {
        // Increment Score
        this.score += 10;
        if (targetBoxType === 'living') {
          this.livingSortedCount++;
          this.addSortedChip(this.stackLiving, card);
        } else {
          this.nonlivingSortedCount++;
          this.addSortedChip(this.stackNonLiving, card);
        }

        // Box bounce
        targetBoxEl.classList.add('box-bounce-anim');
        setTimeout(() => targetBoxEl.classList.remove('box-bounce-anim'), 500);

        // Remove card from round list
        this.currentCards = this.currentCards.filter(c => c.uid !== card.uid);
        this.selectedCard = null;
        this.updateBadges();
        this.renderPaletteCards();
        this.isProcessing = false;

        // Check if all 3 cards in the round are completed
        if (this.currentCards.length === 0) {
          this.handleRoundComplete();
        }
      });

    } else {
      // Wrong Match
      if (this.soundManager) {
        this.soundManager.playMismatch();
      }

      this.speakThai(`ยังไม่ใช่นะจ๊ะ ${card.name} ไม่ใช่สิ่งนี้ ลองใหม่อีกครั้งนะ`);

      if (cardEl) {
        cardEl.classList.add('card-shake-anim');
        setTimeout(() => {
          cardEl.classList.remove('card-shake-anim');
          this.isProcessing = false;
        }, 550);
      } else {
        this.isProcessing = false;
      }
    }
  }

  // Fly animation into slot
  animateCardDropIntoBox(card, sourceCardEl, targetBoxEl, callback) {
    if (!sourceCardEl) {
      callback();
      return;
    }

    const sourceRect = sourceCardEl.getBoundingClientRect();
    const slotEl = targetBoxEl.querySelector('.box-drop-slot') || targetBoxEl;
    const slotRect = slotEl.getBoundingClientRect();

    const flyingEl = document.createElement('div');
    flyingEl.className = 'card-dropping-anim';
    flyingEl.style.left = `${sourceRect.left + sourceRect.width / 2}px`;
    flyingEl.style.top = `${sourceRect.top + sourceRect.height / 2}px`;
    flyingEl.style.width = '120px';
    flyingEl.style.height = '92px';
    flyingEl.style.background = '#ffffff';
    flyingEl.style.borderRadius = '12px';
    flyingEl.style.border = '2px solid #0284c7';
    flyingEl.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    flyingEl.style.display = 'flex';
    flyingEl.style.alignItems = 'center';
    flyingEl.style.justifyContent = 'center';
    flyingEl.style.padding = '4px';

    flyingEl.innerHTML = `<img src="${card.img}" style="width:100%;height:100%;object-fit:contain;">`;
    document.body.appendChild(flyingEl);

    // Fade out source card immediately
    sourceCardEl.style.opacity = '0';

    // Transition coordinates to slot
    setTimeout(() => {
      flyingEl.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      flyingEl.style.left = `${slotRect.left + slotRect.width / 2}px`;
      flyingEl.style.top = `${slotRect.top + slotRect.height / 2}px`;
    }, 10);

    setTimeout(() => {
      flyingEl.remove();
      callback();
    }, 550);
  }

  addSortedChip(stackEl, card) {
    if (!stackEl) return;
    const chip = document.createElement('div');
    chip.className = 'sorted-card-chip';
    chip.title = card.name;
    chip.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
    stackEl.appendChild(chip);

    // Keep maximum 6 chips in preview stack
    while (stackEl.children.length > 6) {
      stackEl.removeChild(stackEl.firstChild);
    }
  }

  handleRoundComplete() {
    if (this.soundManager) {
      if (typeof this.soundManager.playCelebration === 'function') {
        this.soundManager.playCelebration();
      } else if (typeof this.soundManager.playLevelComplete === 'function') {
        this.soundManager.playLevelComplete();
      }
    }

    setTimeout(() => {
      if (this.round < this.totalRounds) {
        // Show cheerful overlay briefly or auto advance
        if (this.roundClearModal) {
          const title = document.getElementById('clearModalTitle');
          const desc = document.getElementById('clearModalDesc');
          if (title) title.textContent = `🎉 ผ่านรอบที่ ${this.round} แล้ว!`;
          if (desc) desc.textContent = `เก่งมากๆ จำแนกทั้ง 3 ตัวเลือกได้ถูกต้องทั้งหมด! ไปต่อรอบถัดไปกันเลย`;
          this.roundClearModal.style.display = 'flex';
        } else {
          this.nextRound();
        }
      } else {
        // Finished all rounds!
        if (this.roundClearModal) {
          const title = document.getElementById('clearModalTitle');
          const desc = document.getElementById('clearModalDesc');
          if (title) title.textContent = `🏆 ยอดนักวิทยาศาสตร์ตัวจริง!`;
          if (desc) desc.textContent = `หนูๆ จำแนกสิ่งมีชีวิตและสิ่งไม่มีชีวิตครบทุกรอบแล้ว รวม ${this.score} คะแนน`;
          if (this.btnNextRound) this.btnNextRound.textContent = 'เล่นใหม่อีกครั้ง 🔄';
          this.roundClearModal.style.display = 'flex';
        }
      }
    }, 600);
  }

  nextRound() {
    if (this.round >= this.totalRounds) {
      this.round = 1;
      this.score = 0;
      this.livingSortedCount = 0;
      this.nonlivingSortedCount = 0;
      if (this.stackLiving) this.stackLiving.innerHTML = '';
      if (this.stackNonLiving) this.stackNonLiving.innerHTML = '';
      if (this.btnNextRound) this.btnNextRound.textContent = 'ไปรอบถัดไป ➔';
    } else {
      this.round++;
    }

    this.setupRound();
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  speakThai(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const thVoice = voices.find(v => v.lang && v.lang.startsWith('th'));
      if (thVoice) utterance.voice = thVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech error:', e);
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.jamneakGame = new JamneakGame();
});
