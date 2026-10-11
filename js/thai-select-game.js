/**
 * Thai Consonant Picture Matching Game Logic (เกมเลือกพยัญชนะตรงกับรูปภาพ)
 * Preschool Clothespin Flashcard Matching (บัตรคำหนีบพยัญชนะไทย ก - ฮ 44 ตัว)
 * Complete 44 Consonants, Audio Speech, Zero-Emoji UI
 * Version: v1.3.7
 */

class ThaiSelectGame {
  constructor() {
    this.cards = (typeof THAI_SELECT_CARDS !== 'undefined') ? THAI_SELECT_CARDS : [];
    this.currentIndex = 0;
    this.mode = 'sequential'; // 'sequential' | 'random'
    this.isTransitioning = false;
    this.completedCount = 0;
    this.answeredCards = new Set();

    this.initDOM();
    this.bindEvents();
    this.setupConfetti();
    this.renderPickerGrid();
    this.loadCard(this.currentIndex);
  }

  initDOM() {
    // Navigation & Headers
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.currentCardPill = document.getElementById('currentCardPill');
    this.cardIndexBadge = document.getElementById('cardIndexBadge');
    this.cardNameText = document.getElementById('cardNameText');
    this.tabSequential = document.getElementById('tabSequential');
    this.tabRandom = document.getElementById('tabRandom');
    this.modeBadge = document.getElementById('modeBadge');
    this.audioToggleBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.btnResetBoard = document.getElementById('btnResetBoard');

    // Stage & Card
    this.stageWrapper = document.getElementById('flashcardStage');
    this.flashcardImg = document.getElementById('flashcardImg');
    this.choiceTargets = document.querySelectorAll('.choice-target');

    // Audio & Tip
    this.btnSpeakQuestion = document.getElementById('btnSpeakQuestion');
    this.promptTipText = document.getElementById('promptTipText');

    // Modals
    this.pickerModal = document.getElementById('pickerModal');
    this.btnClosePicker = document.getElementById('btnClosePicker');
    this.letterGrid44 = document.getElementById('letterGrid44');

    this.celebrationModal = document.getElementById('celebrationModal');
    this.btnRestartCelebration = document.getElementById('btnRestartCelebration');
    this.celebrationScoreText = document.getElementById('celebrationScoreText');

    // Confetti
    this.confettiCanvas = document.getElementById('confettiCanvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;
  }

  bindEvents() {
    // Choice Targets Over Card Boxes (Direct Touch on Flashcard)
    this.choiceTargets.forEach((target) => {
      target.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(target.getAttribute('data-index'), 10);
        this.handleSelect(idx);
      });
    });

    // Navigation
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => this.prevCard());
    }
    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.nextCard());
    }

    // Current Card Pill opens 44 Quick Jump Modal
    if (this.currentCardPill) {
      this.currentCardPill.addEventListener('click', () => this.openPickerModal());
    }
    if (this.btnClosePicker) {
      this.btnClosePicker.addEventListener('click', () => this.closePickerModal());
    }
    if (this.pickerModal) {
      this.pickerModal.addEventListener('click', (e) => {
        if (e.target === this.pickerModal) this.closePickerModal();
      });
    }

    // Mode Tabs
    if (this.tabSequential) {
      this.tabSequential.addEventListener('click', () => this.setMode('sequential'));
    }
    if (this.tabRandom) {
      this.tabRandom.addEventListener('click', () => this.setMode('random'));
    }

    // Audio Reading
    if (this.btnSpeakQuestion) {
      this.btnSpeakQuestion.addEventListener('click', () => this.speakQuestion());
    }

    // Audio Music / Sound Toggle
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', () => this.toggleAudio());
    }

    // Reset / Restart Current Card
    if (this.btnResetBoard) {
      this.btnResetBoard.addEventListener('click', () => {
        if (window.soundManager) window.soundManager.playPop();
        this.loadCard(this.currentIndex);
      });
    }

    // Celebration Restart
    if (this.btnRestartCelebration) {
      this.btnRestartCelebration.addEventListener('click', () => {
        this.celebrationModal.classList.remove('active');
        this.answeredCards.clear();
        this.loadCard(0);
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevCard();
      if (e.key === 'ArrowRight') this.nextCard();
      if (e.key === '1') this.handleSelect(0);
      if (e.key === '2') this.handleSelect(1);
      if (e.key === '3') this.handleSelect(2);
    });
  }

  loadCard(index) {
    if (index < 0 || index >= this.cards.length) return;
    this.currentIndex = index;
    const card = this.cards[this.currentIndex];

    this.isTransitioning = false;

    // Reset Visual States
    if (this.stageWrapper) {
      this.stageWrapper.classList.remove('card-shake', 'card-success');
    }
    this.choiceTargets.forEach((target) => {
      target.classList.remove('correct', 'incorrect', 'selected');
    });

    // Update Image
    if (this.flashcardImg) {
      this.flashcardImg.src = card.img;
      this.flashcardImg.alt = card.name;
    }

    // Update Header Text & Index Badge
    if (this.cardIndexBadge) {
      this.cardIndexBadge.textContent = `${card.order} / 44`;
    }
    if (this.cardNameText) {
      this.cardNameText.textContent = card.name;
    }

    // Update Question Tip Text
    if (this.promptTipText) {
      this.promptTipText.textContent = `รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย? (${card.name})`;
    }

    // Update Clothespin Icons inside overlay targets
    this.choiceTargets.forEach((target) => {
      let pin = target.querySelector('.clothespin-marker');
      if (!pin) {
        pin = document.createElement('div');
        pin.className = 'clothespin-marker';
        pin.innerHTML = `
          <svg viewBox="0 0 36 54" width="32" height="48" style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
            <path d="M12 2 L24 2 L21 34 L15 34 Z" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
            <circle cx="18" cy="22" r="5" fill="#d97706"/>
            <path d="M13 34 L11 50 M23 34 L25 50" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="18,10 21,17 28,17 22,21 24,28 18,24 12,28 14,21 8,17 15,17" fill="#fef08a"/>
          </svg>
        `;
        target.appendChild(pin);
      }
    });

    // Update Navigation Disabled States
    if (this.btnPrev) {
      this.btnPrev.style.opacity = (this.mode === 'sequential' && this.currentIndex === 0) ? '0.5' : '1';
      this.btnPrev.style.pointerEvents = (this.mode === 'sequential' && this.currentIndex === 0) ? 'none' : 'auto';
    }
    if (this.btnNext) {
      this.btnNext.style.opacity = (this.mode === 'sequential' && this.currentIndex === this.cards.length - 1) ? '0.5' : '1';
      this.btnNext.style.pointerEvents = (this.mode === 'sequential' && this.currentIndex === this.cards.length - 1) ? 'none' : 'auto';
    }

    // Highlight current in picker grid
    this.updatePickerHighlight();
  }

  handleSelect(choiceIndex) {
    if (this.isTransitioning) return;
    const card = this.cards[this.currentIndex];
    const isCorrect = (choiceIndex === card.correctIndex);

    const targetEl = this.choiceTargets[choiceIndex];

    if (isCorrect) {
      this.isTransitioning = true;
      this.answeredCards.add(card.id);

      // Visuals
      if (targetEl) targetEl.classList.add('correct');
      if (this.stageWrapper) this.stageWrapper.classList.add('card-success');

      // Audio
      if (window.soundManager) {
        window.soundManager.playMatchSuccess();
      }
      this.speakText(`ถูกต้องครับ! ${card.speech}`);

      // Confetti
      this.fireConfetti();

      // Check Completion or Auto-Advance
      setTimeout(() => {
        if (this.answeredCards.size >= this.cards.length) {
          this.showCelebration();
        } else {
          this.nextCard();
        }
      }, 1250);

    } else {
      // Incorrect
      if (targetEl) targetEl.classList.add('incorrect');
      if (this.stageWrapper) this.stageWrapper.classList.add('card-shake');

      if (window.soundManager) {
        window.soundManager.playWrong();
      }
      this.speakText('ลองดูใหม่อีกครั้งนะจ๊ะ');

      // Allow retry after gentle wiggle
      setTimeout(() => {
        if (targetEl) targetEl.classList.remove('incorrect');
        if (this.stageWrapper) this.stageWrapper.classList.remove('card-shake');
      }, 550);
    }
  }

  nextCard() {
    if (this.mode === 'sequential') {
      if (this.currentIndex < this.cards.length - 1) {
        this.loadCard(this.currentIndex + 1);
        if (window.soundManager) window.soundManager.playPop();
      }
    } else {
      // Random Mode
      let nextIdx = Math.floor(Math.random() * this.cards.length);
      if (nextIdx === this.currentIndex && this.cards.length > 1) {
        nextIdx = (nextIdx + 1) % this.cards.length;
      }
      this.loadCard(nextIdx);
      if (window.soundManager) window.soundManager.playPop();
    }
  }

  prevCard() {
    if (this.currentIndex > 0) {
      this.loadCard(this.currentIndex - 1);
      if (window.soundManager) window.soundManager.playPop();
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (this.tabSequential) this.tabSequential.classList.toggle('active', mode === 'sequential');
    if (this.tabRandom) this.tabRandom.classList.toggle('active', mode === 'random');
    if (this.modeBadge) {
      this.modeBadge.textContent = mode === 'sequential' ? 'โหมดเรียงพยัญชนะ ก - ฮ' : 'โหมดสุ่มบัตรคำ';
    }
    if (window.soundManager) window.soundManager.playPop();
    if (mode === 'random') {
      this.nextCard();
    }
  }

  // =========================================================================
  // Quick Jump Modal (44 Letters Grid)
  // =========================================================================
  renderPickerGrid() {
    if (!this.letterGrid44) return;
    this.letterGrid44.innerHTML = '';

    this.cards.forEach((card, idx) => {
      const btn = document.createElement('button');
      btn.className = 'grid-letter-btn';
      btn.setAttribute('data-idx', idx);
      btn.innerHTML = `
        <span>${card.letter}</span>
        <span style="font-size: 0.65rem; color: #64748b; font-weight: normal;">${card.order}</span>
      `;
      btn.addEventListener('click', () => {
        this.loadCard(idx);
        this.closePickerModal();
        if (window.soundManager) window.soundManager.playPop();
      });
      this.letterGrid44.appendChild(btn);
    });
  }

  updatePickerHighlight() {
    if (!this.letterGrid44) return;
    const btns = this.letterGrid44.querySelectorAll('.grid-letter-btn');
    btns.forEach((btn, idx) => {
      btn.classList.toggle('current', idx === this.currentIndex);
    });
  }

  openPickerModal() {
    if (this.pickerModal) {
      this.pickerModal.classList.add('active');
      if (window.soundManager) window.soundManager.playPop();
    }
  }

  closePickerModal() {
    if (this.pickerModal) {
      this.pickerModal.classList.remove('active');
    }
  }

  // =========================================================================
  // Victory Celebration
  // =========================================================================
  showCelebration() {
    if (this.celebrationModal) {
      if (this.celebrationScoreText) {
        this.celebrationScoreText.textContent = `ตอบถูกครบทั้ง 44 พยัญชนะ (ก - ฮ) เก่งที่สุดเลย!`;
      }
      this.celebrationModal.classList.add('active');
      if (window.soundManager) window.soundManager.playLevelComplete();
      this.fireConfetti();
      this.speakText('ยินดีด้วยครับ ตอบถูกครบทั้งสี่สิบสี่พยัญชนะแล้ว เก่งมากๆ เลยครับ');
    }
  }

  // =========================================================================
  // Web Speech API Thai TTS
  // =========================================================================
  speakQuestion() {
    const card = this.cards[this.currentIndex];
    this.speakText(`${card.speech} รูปนี้ตรงกับพยัญชนะตัวไหนเอ่ย?`);
  }

  speakText(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.95;
      utterance.pitch = 1.15; // friendly cute tone for kids
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('TTS Error:', e);
    }
  }

  toggleAudio() {
    if (window.soundManager) {
      window.soundManager.toggleMute();
      const muted = window.soundManager.isMuted;
      if (this.audioIcon) {
        this.audioIcon.innerHTML = muted
          ? '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>'
          : '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
      }
    }
  }

  // =========================================================================
  // Confetti Particle Physics
  // =========================================================================
  setupConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    this.particles = [];
    const resize = () => {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  }

  fireConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#fbbf24'];
    const count = 50;
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight * 0.45;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 8 + 4;
      this.particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }

    if (!this.confettiAnimating) {
      this.confettiAnimating = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25; // gravity
      p.rotation += p.vr;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.confettiCtx.save();
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.globalAlpha = p.life;
      this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      this.confettiCtx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.confettiAnimating = false;
    }
  }
}

// Auto-Launch on Load
window.addEventListener('DOMContentLoaded', () => {
  window.thaiSelectGame = new ThaiSelectGame();
});
