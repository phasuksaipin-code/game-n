/**
 * Number Matching Game Logic (เกมโยงเส้นจับคู่ตัวเลขอารบิกกับเลขไทย 1-99)
 * Supports Touch Drag-to-Connect, Mouse Drag, and Tap-to-Select for preschoolers.
 * Auto-scales and hit-tests accurately on all device screen resolutions.
 */

const THAI_DIGITS = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
const THAI_ONES = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];

const PAIR_COLORS = [
  '#8b5cf6', // Violet
  '#0284c7', // Sky Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899'  // Pink
];

function toThaiNumber(num) {
  return String(num).split('').map(d => THAI_DIGITS[parseInt(d, 10)] || d).join('');
}

function getThaiWord(num) {
  if (num === 0) return 'ศูนย์';
  if (num < 10) return THAI_ONES[num];
  if (num === 10) return 'สิบ';
  if (num < 20) {
    return 'สิบ' + (num === 11 ? 'เอ็ด' : THAI_ONES[num % 10]);
  }
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  const tensWord = (tens === 2 ? 'ยี่' : THAI_ONES[tens]) + 'สิบ';
  const onesWord = ones === 0 ? '' : (ones === 1 ? 'เอ็ด' : THAI_ONES[ones]);
  return tensWord + onesWord;
}

class NumberMatchingGame {
  constructor() {
    this.sound = typeof soundManager !== 'undefined' ? soundManager : new SoundManager();
    this.round = 1;
    this.pairCount = 5;
    this.currentNumbers = []; // Array of 5 numbers [n1, n2, n3, n4, n5]
    this.matchedPairs = [];   // Array of matched numbers
    this.selectedCard = null; // { type: 'arabic'|'thai', value: number, element: HTMLElement }

    // DOM Elements
    this.arena = document.getElementById('matchingArena');
    this.linesSvg = document.getElementById('linesSvgOverlay');
    this.arabicStack = document.getElementById('arabicCardsStack');
    this.thaiStack = document.getElementById('thaiCardsStack');
    this.roundBadge = document.getElementById('currentRoundBadge');
    this.counterBadge = document.getElementById('matchedCounterBadge');
    this.btnReset = document.getElementById('btnResetGame');
    this.audioBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');

    // Celebration Modal
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationSubtitle = document.getElementById('celebrationSubtitle');
    this.summaryWrap = document.getElementById('matchedSummaryWrap');
    this.btnNextRound = document.getElementById('btnCelebrationNext');
    this.btnReplay = document.getElementById('btnCelebrationReplay');
    this.confettiCanvas = document.getElementById('confettiCanvas');

    // Drag-line state
    this.activeDrag = null; // { fromType, fromVal, startX, startY, pathEl }

    this.initAudioControls();
    this.initCelebrationControls();
    this.bindWindowEvents();
    this.startNewRound();
  }

  initAudioControls() {
    if (!this.audioBtn) return;
    const unlockAudio = () => {
      this.sound.init();
      this.sound.startBgm();
      this.audioBtn.classList.add('active');
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio);

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

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.startNewRound();
      });
    }
  }

  initCelebrationControls() {
    if (this.btnNextRound) {
      this.btnNextRound.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.celebrationOverlay.classList.remove('active');
        this.round++;
        this.startNewRound();
      });
    }

    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.celebrationOverlay.classList.remove('active');
        this.startNewRound();
      });
    }
  }

  bindWindowEvents() {
    // Redraw matched lines when window resizes, screen rotates, or page scrolls
    window.addEventListener('resize', () => {
      this.redrawAllMatchedLines();
    });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.redrawAllMatchedLines(), 150);
    });
    window.addEventListener('scroll', () => {
      this.redrawAllMatchedLines();
    }, { passive: true });

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', () => {
        this.redrawAllMatchedLines();
      });
      window.visualViewport.addEventListener('scroll', () => {
        this.redrawAllMatchedLines();
      });
    }
  }

  startNewRound() {
    this.matchedPairs = [];
    this.selectedCard = null;
    this.activeDrag = null;

    if (this.roundBadge) {
      this.roundBadge.innerText = `รอบที่ ${this.round}`;
    }
    this.updateCounter();

    // 1. Generate 5 unique random numbers between 1 and 99
    const pool = new Set();
    while (pool.size < this.pairCount) {
      const r = Math.floor(Math.random() * 99) + 1; // 1 to 99
      pool.add(r);
    }
    this.currentNumbers = Array.from(pool);

    // 2. Shuffle Arabic side and Thai side independently
    const arabicList = [...this.currentNumbers].sort(() => Math.random() - 0.5);
    const thaiList = [...this.currentNumbers].sort(() => Math.random() - 0.5);

    // 3. Clear SVG lines
    this.linesSvg.innerHTML = '';

    // 4. Render Arabic Cards (Left)
    this.arabicStack.innerHTML = arabicList.map(val => `
      <div class="number-card card-arabic" data-type="arabic" data-value="${val}" id="card-arabic-${val}">
        <div class="connector-dot" data-type="arabic" data-value="${val}"></div>
        <div class="card-inner">
          <span class="num-display">${val}</span>
          <span class="num-word-pill">(${getThaiWord(val)})</span>
        </div>
      </div>
    `).join('');

    // 5. Render Thai Cards (Right)
    this.thaiStack.innerHTML = thaiList.map(val => `
      <div class="number-card card-thai" data-type="thai" data-value="${val}" id="card-thai-${val}">
        <div class="connector-dot" data-type="thai" data-value="${val}"></div>
        <div class="card-inner">
          <span class="num-display">${toThaiNumber(val)}</span>
          <span class="num-word-pill">(${getThaiWord(val)})</span>
        </div>
      </div>
    `).join('');

    // 6. Attach Pointer Interactions
    this.arena.querySelectorAll('.number-card').forEach(card => {
      this.attachCardInteractions(card);
    });
  }

  updateCounter() {
    if (!this.counterBadge) return;
    this.counterBadge.innerText = `จับคู่สำเร็จ ${this.matchedPairs.length}/${this.pairCount} คู่`;
  }

  attachCardInteractions(card) {
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let dragPath = null;

    const type = card.dataset.type;
    const value = parseInt(card.dataset.value, 10);

    const onPointerDown = (e) => {
      if (card.classList.contains('is-matched')) return;

      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      // Start position from card's connector dot
      const anchor = this.getCardAnchorPoint(card, type);

      dragPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      dragPath.setAttribute('class', 'connection-line drawing');
      dragPath.setAttribute('stroke', '#f59e0b');
      dragPath.setAttribute('stroke-width', '5');
      dragPath.setAttribute('id', 'active-drag-line');
      this.linesSvg.appendChild(dragPath);

      this.activeDrag = {
        fromType: type,
        fromVal: value,
        anchorX: anchor.x,
        anchorY: anchor.y,
        pathEl: dragPath
      };

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    };

    const onPointerMove = (e) => {
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (!isDragging && dist > 7) {
        isDragging = true;
        try { this.sound.playPop(); } catch (err) {}
      }

      if (isDragging && this.activeDrag && this.activeDrag.pathEl) {
        const liveAnchor = this.getCardAnchorPoint(card, type);
        const svgCoords = this.screenToSvg(e.clientX, e.clientY);
        const lineStartX = liveAnchor.x;
        const lineStartY = liveAnchor.y;

        const d = this.calculateBezierPath(lineStartX, lineStartY, svgCoords.x, svgCoords.y, type === 'arabic');
        this.activeDrag.pathEl.setAttribute('d', d);

        // Highlight card under pointer if valid target
        const target = this.getCardUnderPointer(e.clientX, e.clientY);
        this.arena.querySelectorAll('.number-card').forEach(c => {
          if (!c.classList.contains('is-matched') && c !== this.selectedCard?.element) {
            c.classList.remove('selected');
          }
        });
        if (target && target.type !== type && !target.element.classList.contains('is-matched')) {
          target.element.classList.add('selected');
        }
      }
    };

    const onPointerUp = (e) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);

      if (dragPath && dragPath.parentNode) {
        dragPath.parentNode.removeChild(dragPath);
      }
      this.activeDrag = null;

      this.arena.querySelectorAll('.number-card').forEach(c => {
        if (!c.classList.contains('is-matched') && c !== this.selectedCard?.element) {
          c.classList.remove('selected');
        }
      });

      if (!isDragging) {
        // Was a simple Tap!
        this.handleCardTap(card, type, value);
        return;
      }

      // Drag released: check target card under pointer
      const target = this.getCardUnderPointer(e.clientX, e.clientY);
      if (target && target.type !== type) {
        if (target.value === value) {
          // Correct Match!
          this.commitMatch(value);
        } else {
          // Wrong Match!
          this.triggerMismatch(card, target.element);
        }
      } else {
        // Dropped outside target
        try { this.sound.playMismatch(); } catch (err) {}
      }
    };

    const onPointerCancel = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      if (dragPath && dragPath.parentNode) {
        dragPath.parentNode.removeChild(dragPath);
      }
      this.activeDrag = null;
    };

    card.addEventListener('pointerdown', onPointerDown);
  }

  handleCardTap(card, type, value) {
    if (card.classList.contains('is-matched')) return;

    if (!this.selectedCard) {
      // First card tapped
      this.selectedCard = { type, value, element: card };
      card.classList.add('selected');
      try { this.sound.playPop(); } catch (e) {}
    } else {
      // Same card tapped again: Deselect
      if (this.selectedCard.element === card) {
        this.selectedCard = null;
        card.classList.remove('selected');
        try { this.sound.playPop(); } catch (e) {}
        return;
      }

      // Card of same column tapped: Switch selection
      if (this.selectedCard.type === type) {
        this.selectedCard.element.classList.remove('selected');
        this.selectedCard = { type, value, element: card };
        card.classList.add('selected');
        try { this.sound.playPop(); } catch (e) {}
        return;
      }

      // Card of opposing column tapped: Check match!
      if (this.selectedCard.value === value) {
        const firstEl = this.selectedCard.element;
        this.selectedCard = null;
        firstEl.classList.remove('selected');
        card.classList.remove('selected');
        this.commitMatch(value);
      } else {
        const firstEl = this.selectedCard.element;
        this.selectedCard = null;
        firstEl.classList.remove('selected');
        card.classList.remove('selected');
        this.triggerMismatch(firstEl, card);
      }
    }
  }

  commitMatch(val) {
    if (this.matchedPairs.includes(val)) return;

    this.matchedPairs.push(val);
    this.updateCounter();

    const arabicCard = document.getElementById(`card-arabic-${val}`);
    const thaiCard = document.getElementById(`card-thai-${val}`);
    if (!arabicCard || !thaiCard) return;

    const color = PAIR_COLORS[(this.matchedPairs.length - 1) % PAIR_COLORS.length];

    // 1. Mark cards as matched with color theme
    [arabicCard, thaiCard].forEach(card => {
      card.classList.add('is-matched');
      card.classList.remove('selected');
      card.style.borderColor = color;
      card.style.background = `${color}14`; // 8% opacity tint

      // Add checkmark badge
      const badge = document.createElement('div');
      badge.className = 'match-check-badge';
      badge.style.background = color;
      badge.innerText = '✓';
      card.appendChild(badge);
    });

    // 2. Draw permanent connection line
    this.drawPermanentLine(val, arabicCard, thaiCard, color);

    // 3. Audio feedback
    try {
      if (this.sound && typeof this.sound.playMatch === 'function') {
        this.sound.playMatch();
      } else if (this.sound && typeof this.sound.playMatchSuccess === 'function') {
        this.sound.playMatchSuccess();
      }
    } catch (e) {}

    // 4. Check if Round Complete!
    if (this.matchedPairs.length >= this.pairCount) {
      setTimeout(() => {
        this.triggerCelebration();
      }, 450);
    }
  }

  drawPermanentLine(val, arabicCard, thaiCard, color) {
    const aAnchor = this.getCardAnchorPoint(arabicCard, 'arabic');
    const tAnchor = this.getCardAnchorPoint(thaiCard, 'thai');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'connection-line permanent');
    path.setAttribute('id', `matched-line-${val}`);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '6');

    const d = this.calculateBezierPath(aAnchor.x, aAnchor.y, tAnchor.x, tAnchor.y, true);
    path.setAttribute('d', d);

    this.linesSvg.appendChild(path);
  }

  redrawAllMatchedLines() {
    this.matchedPairs.forEach((val, idx) => {
      const line = document.getElementById(`matched-line-${val}`);
      const aCard = document.getElementById(`card-arabic-${val}`);
      const tCard = document.getElementById(`card-thai-${val}`);
      if (line && aCard && tCard) {
        const aAnchor = this.getCardAnchorPoint(aCard, 'arabic');
        const tAnchor = this.getCardAnchorPoint(tCard, 'thai');
        const d = this.calculateBezierPath(aAnchor.x, aAnchor.y, tAnchor.x, tAnchor.y, true);
        line.setAttribute('d', d);
      }
    });
  }

  triggerMismatch(cardA, cardB) {
    try {
      if (this.sound && typeof this.sound.playMismatch === 'function') {
        this.sound.playMismatch();
      }
    } catch (e) {}

    [cardA, cardB].forEach(card => {
      if (card) {
        card.classList.add('shake-error');
        setTimeout(() => card.classList.remove('shake-error'), 450);
      }
    });
  }

  getCardAnchorPoint(card, type) {
    const dot = card.querySelector('.connector-dot') || card;
    const dotRect = dot.getBoundingClientRect();
    const cx = dotRect.left + dotRect.width / 2;
    const cy = dotRect.top + dotRect.height / 2;
    return this.screenToSvg(cx, cy);
  }

  screenToSvg(screenX, screenY) {
    const svgRect = this.linesSvg.getBoundingClientRect();
    return {
      x: screenX - svgRect.left,
      y: screenY - svgRect.top
    };
  }

  calculateBezierPath(x1, y1, x2, y2, fromLeft = true) {
    const dx = Math.abs(x2 - x1) * 0.45;
    if (fromLeft) {
      return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    } else {
      return `M ${x1} ${y1} C ${x1 - dx} ${y1}, ${x2 + dx} ${y2}, ${x2} ${y2}`;
    }
  }

  getCardUnderPointer(clientX, clientY) {
    const cards = this.arena.querySelectorAll('.number-card:not(.is-matched)');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const pad = 12; // Toddler touch tolerance
      if (
        clientX >= rect.left - pad &&
        clientX <= rect.right + pad &&
        clientY >= rect.top - pad &&
        clientY <= rect.bottom + pad
      ) {
        return {
          element: card,
          type: card.dataset.type,
          value: parseInt(card.dataset.value, 10)
        };
      }
    }
    return null;
  }

  triggerCelebration() {
    try {
      if (this.sound && typeof this.sound.playLevelComplete === 'function') {
        this.sound.playLevelComplete();
      }
    } catch (e) {}

    try {
      this.startConfetti();
    } catch (e) {}

    if (this.celebrationTitle) {
      this.celebrationTitle.innerText = `เก่งมากเลยคนเก่ง! 🎉`;
    }
    if (this.celebrationSubtitle) {
      this.celebrationSubtitle.innerText = `โยงเส้นจับคู่ตัวเลขอารบิกกับเลขไทยครบทั้ง 5 คู่ถูกต้องทั้งหมดแล้ว`;
    }

    if (this.summaryWrap) {
      this.summaryWrap.innerHTML = this.matchedPairs.map(num => `
        <div class="summary-pill">
          <span>${num}</span>
          <span>↔</span>
          <span>${toThaiNumber(num)}</span>
          <span style="font-size: 0.8rem; font-weight: 600; color: #7c3aed;">(${getThaiWord(num)})</span>
        </div>
      `).join('');
    }

    if (this.celebrationOverlay) {
      this.celebrationOverlay.classList.add('active');
    }
  }

  startConfetti() {
    if (!this.confettiCanvas) return;
    const canvas = this.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#f43f5e', '#a855f7'];
    const particles = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.2) * 16,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.3);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 180) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    requestAnimationFrame(animate);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.numberMatchingGame = new NumberMatchingGame();
});
