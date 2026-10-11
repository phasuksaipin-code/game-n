// ASEAN Landmark Matching Game for Kindergarten
// Features: Drag & Drop (Touch/Mouse), Tap-to-Match, Realistic Silhouettes,
// Sound Effects, Level Transitions, and Confetti Celebrations.

class AseanMatchingGame {
  constructor() {
    this.currentLevel = 1;
    this.maxLevels = 3;
    this.matchedCount = 0;
    this.currentCards = [];
    this.selectedClueCard = null;
    this.dragState = null;
    this.countdownTimer = null;
    this.confettiActive = false;

    // DOM Elements
    this.leftContainer = document.getElementById('leftCardsContainer');
    this.rightContainer = document.getElementById('rightCardsContainer');
    this.levelBadgeText = document.getElementById('levelBadgeText');
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationSubtitle = document.getElementById('celebrationSubtitle');
    this.matchedSummaryList = document.getElementById('matchedSummaryList');
    this.btnNextLevel = document.getElementById('btnNextLevel');
    this.autoCountdownText = document.getElementById('autoCountdownText');
    this.audioToggleBtn = document.getElementById('audioToggleBtn');
    this.reloadRoundBtn = document.getElementById('reloadRoundBtn');
    this.aseanEmblemBtn = document.getElementById('aseanEmblemBtn');
    this.confettiCanvas = document.getElementById('confetti-canvas');
    this.aseanModalOverlay = document.getElementById('aseanModalOverlay');
    this.aseanCountriesGrid = document.getElementById('aseanCountriesGrid');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.modalFooterCloseBtn = document.getElementById('modalFooterCloseBtn');

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initConfetti();
    this.startLevel(1);
  }

  setupEventListeners() {
    // Audio Toggle Button
    this.audioToggleBtn.addEventListener('click', () => {
      const isPlaying = window.soundManager.toggleBgm();
      if (isPlaying) {
        this.audioToggleBtn.classList.add('active');
        this.audioToggleBtn.title = "ปิดเพลงดนตรี";
      } else {
        this.audioToggleBtn.classList.remove('active');
        this.audioToggleBtn.title = "เปิดเพลงดนตรี";
      }
    });

    // Reload Round Button
    this.reloadRoundBtn.addEventListener('click', () => {
      window.soundManager.playPop();
      this.startLevel(this.currentLevel);
    });

    // ASEAN Emblem click: Open Member Countries Modal
    this.aseanEmblemBtn.addEventListener('click', () => {
      this.showAseanModal();
    });

    // Close ASEAN Modal handlers
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.hideAseanModal());
    }
    if (this.modalFooterCloseBtn) {
      this.modalFooterCloseBtn.addEventListener('click', () => this.hideAseanModal());
    }
    if (this.aseanModalOverlay) {
      this.aseanModalOverlay.addEventListener('click', (e) => {
        if (e.target === this.aseanModalOverlay) {
          this.hideAseanModal();
        }
      });
    }

    // ESC key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideAseanModal();
      }
    });

    // Next Level Button in Celebration Modal
    this.btnNextLevel.addEventListener('click', () => {
      window.soundManager.playPop();
      this.hideCelebration();
      if (this.currentLevel < this.maxLevels) {
        this.startLevel(this.currentLevel + 1);
      } else {
        this.startLevel(1);
      }
    });

    // Lock touchmove to prevent screen scrolling/pull-to-refresh while dragging
    document.addEventListener('touchmove', (e) => {
      if (!e.target.closest('.asean-countries-grid')) {
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    // Window resize for confetti canvas
    window.addEventListener('resize', () => {
      if (this.confettiCanvas) {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      }
    });
  }

  // Pick 3 random countries from ASEAN_LANDMARKS
  pickRandomThree() {
    const pool = [...ASEAN_LANDMARKS];
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, 3);
  }

  startLevel(levelNumber) {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.stopConfetti();

    this.currentLevel = levelNumber;
    this.matchedCount = 0;
    this.selectedClueCard = null;
    this.levelBadgeText.textContent = `ด่านที่ ${this.currentLevel} / ${this.maxLevels}`;

    // Select 3 random countries
    this.currentCards = this.pickRandomThree();

    // Render Left Cards (Numbers 1, 2, 3)
    this.renderLeftCards();

    // Render Right Cards (Shuffled Silhouettes)
    this.renderRightCards();
  }

  renderLeftCards() {
    this.leftContainer.innerHTML = '';
    const badgeColors = ['badge-1', 'badge-2', 'badge-3'];

    this.currentCards.forEach((country, index) => {
      const card = document.createElement('div');
      card.className = 'game-card clue-card';
      card.dataset.id = country.id;
      card.dataset.index = index;

      card.innerHTML = `
        <div class="card-number-badge ${badgeColors[index]}">${index + 1}</div>
        <div class="clue-visual">
          ${getColoredLandmarkSvg(country)}
        </div>
        <div class="clue-info">
          <div class="country-flag-box">
            ${country.flag_svg}
          </div>
          <div class="country-name-th">${country.country_th}</div>
          <div class="landmark-name-th">${country.landmark_th}</div>
        </div>
      `;

      this.bindDragAndTapEvents(card);
      this.leftContainer.appendChild(card);
    });
  }

  renderRightCards() {
    this.rightContainer.innerHTML = '';

    // Create a shuffled copy of the 3 countries for the right column
    let shuffled = [...this.currentCards];
    // Ensure the order is shuffled so it doesn't trivially match 1-1, 2-2, 3-3
    if (shuffled.length > 1) {
      for (let attempt = 0; attempt < 5; attempt++) {
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // If not completely identical in all positions, good!
        const identical = shuffled.every((c, idx) => c.id === this.currentCards[idx].id);
        if (!identical) break;
      }
    }

    shuffled.forEach((country) => {
      const card = document.createElement('div');
      card.className = 'game-card silhouette-card';
      card.dataset.id = country.id;

      card.innerHTML = `
        <div class="silhouette-inner">
          ${getSilhouetteLandmarkSvg(country)}
        </div>
        <div class="matched-content" style="display: none;">
          <div class="clue-visual">
            ${getColoredLandmarkSvg(country)}
          </div>
          <div class="clue-info">
            <div class="country-flag-box">
              ${country.flag_svg}
            </div>
            <div class="country-name-th">${country.country_th}</div>
          </div>
        </div>
      `;

      // Tap-to-match on silhouette
      card.addEventListener('pointerup', () => {
        if (card.classList.contains('is-matched')) return;
        if (this.selectedClueCard && !this.dragState) {
          if (this.selectedClueCard.dataset.id === card.dataset.id) {
            this.handleMatchSuccess(this.selectedClueCard, card);
          } else {
            // "ถ้าไม่ตรง ไม่ต้องมีอะไรเกิดขึ้น"
            this.selectedClueCard.classList.remove('is-selected');
            this.selectedClueCard = null;
          }
        }
      });

      this.rightContainer.appendChild(card);
    });
  }

  // Unified Drag & Drop (Touch + Mouse with Pointer Events)
  bindDragAndTapEvents(card) {
    let startX = 0;
    let startY = 0;
    let hasMoved = false;
    let ghostElement = null;

    const onPointerDown = (e) => {
      if (card.classList.contains('is-matched')) return;
      window.soundManager.init();

      if (e.cancelable) {
        e.preventDefault();
      }

      startX = e.clientX;
      startY = e.clientY;
      hasMoved = false;

      this.dragState = {
        card: card,
        id: card.dataset.id
      };

      window.addEventListener('pointermove', onPointerMove, { passive: false });
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerUp);
    };

    const onPointerMove = (e) => {
      if (!this.dragState) return;

      if (e.cancelable) {
        e.preventDefault();
      }

      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (dist > 6 && !hasMoved) {
        hasMoved = true;
        window.soundManager.playPop();

        // Create Drag Ghost
        ghostElement = document.createElement('div');
        ghostElement.className = 'drag-ghost';
        ghostElement.innerHTML = `
          <div class="clue-visual" style="height: 100%; border-radius: 12px; overflow: hidden; width: 55%; pointer-events: none;">
            ${card.querySelector('.clue-visual').innerHTML}
          </div>
          <div class="clue-info" style="width: 45%; pointer-events: none;">
            <div style="width: 50px; height: 32px; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
              ${card.querySelector('.country-flag-box').innerHTML}
            </div>
            <div style="font-weight: 800; font-size: 1.1rem; color: #0f172a; margin-top: 4px;">
              ${card.querySelector('.country-name-th').textContent}
            </div>
          </div>
        `;
        document.body.appendChild(ghostElement);
      }

      if (ghostElement) {
        ghostElement.style.left = `${e.clientX}px`;
        ghostElement.style.top = `${e.clientY}px`;

        // Check if hovering over a silhouette card
        const target = this.getSilhouetteTargetUnderPointer(e.clientX, e.clientY);
        document.querySelectorAll('.silhouette-card').forEach(sc => {
          if (sc === target && !sc.classList.contains('is-matched')) {
            sc.classList.add('drag-hover');
          } else {
            sc.classList.remove('drag-hover');
          }
        });
      }
    };

    const onPointerUp = (e) => {
      window.removeEventListener('pointermove', onPointerMove, { passive: false });
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      // Clean up drag hover outlines
      document.querySelectorAll('.silhouette-card').forEach(sc => sc.classList.remove('drag-hover'));

      if (ghostElement) {
        ghostElement.remove();
        ghostElement = null;
      }

      if (hasMoved) {
        // Drag Drop finished: Check target
        const target = this.getSilhouetteTargetUnderPointer(e.clientX, e.clientY);
        if (target && !target.classList.contains('is-matched')) {
          if (target.dataset.id === card.dataset.id) {
            // Correct Match!
            this.handleMatchSuccess(card, target);
          } else {
            // "ถ้าไม่ตรง ไม่ต้องมีอะไรเกิดขึ้น" (smooth snap back, no punishment)
          }
        }
      } else {
        // Was a simple Tap / Click: handle Tap-to-Match
        window.soundManager.playPop();
        if (this.selectedClueCard === card) {
          card.classList.remove('is-selected');
          this.selectedClueCard = null;
        } else {
          if (this.selectedClueCard) {
            this.selectedClueCard.classList.remove('is-selected');
          }
          card.classList.add('is-selected');
          this.selectedClueCard = card;
        }
      }

      this.dragState = null;
    };

    card.addEventListener('pointerdown', onPointerDown);
  }

  getSilhouetteTargetUnderPointer(x, y) {
    const elements = document.elementsFromPoint(x, y);
    for (const el of elements) {
      const card = el.closest('.silhouette-card');
      if (card) return card;
    }
    return null;
  }

  // Handle Match Success: Morph silhouette into color, trigger sparks & sounds
  handleMatchSuccess(clueCard, silhouetteCard) {
    window.soundManager.playMatchSuccess();

    // Mark Clue Card as matched
    clueCard.classList.remove('is-selected');
    clueCard.classList.add('is-matched');
    this.selectedClueCard = null;

    // Transform Silhouette Card to Full Color
    silhouetteCard.classList.add('is-matched');
    const matchedContent = silhouetteCard.querySelector('.matched-content');
    if (matchedContent) {
      matchedContent.style.display = 'flex';
    }

    // Sparkle burst at the silhouette card
    const rect = silhouetteCard.getBoundingClientRect();
    this.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    this.matchedCount++;

    // "ถ้าทำครบทั้งสามภาพแล้วให้มีหน้ายินดีและเปลี่ยนเป็นเกมส์หน้าถัดไป"
    if (this.matchedCount === 3) {
      setTimeout(() => {
        this.handleLevelComplete();
      }, 550);
    }
  }

  createSparkleBurst(cx, cy) {
    const sparkles = ['⭐', '✨', '🌟', '🎉', '💖'];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement('div');
      p.className = 'sparkle-particle';
      p.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];

      const angle = (i / 8) * (Math.PI * 2) + (Math.random() - 0.5) * 0.4;
      const dist = 60 + Math.random() * 50;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;

      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.left = `${cx}px`;
      p.style.top = `${cy}px`;

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 800);
    }
  }

  // Celebration Modal when all 3 pairs are matched
  handleLevelComplete() {
    window.soundManager.playLevelComplete();
    this.startConfetti();

    // Fill matched countries summary badges
    this.matchedSummaryList.innerHTML = '';
    this.currentCards.forEach(c => {
      const chip = document.createElement('div');
      chip.className = 'matched-summary-chip';
      chip.innerHTML = `
        <div style="width: 24px; height: 16px; border-radius: 3px; overflow: hidden; display: inline-block;">
          ${c.flag_svg}
        </div>
        <span>${c.country_th}</span>
      `;
      this.matchedSummaryList.appendChild(chip);
    });

    if (this.currentLevel < this.maxLevels) {
      this.celebrationTitle.textContent = "เก่งมากเลยคนเก่ง! 🎉";
      this.celebrationSubtitle.textContent = `หนูจับคู่สถานที่สำคัญใน ด่านที่ ${this.currentLevel} ถูกต้องครบทั้ง 3 ภาพแล้ว!`;
      this.btnNextLevel.innerHTML = `<span>เล่นด่านต่อไป</span><span>➔</span>`;

      // Auto countdown 4 seconds
      let remaining = 4;
      this.autoCountdownText.textContent = `เปลี่ยนด่านถัดไปอัตโนมัติใน ${remaining} วินาที...`;

      this.countdownTimer = setInterval(() => {
        remaining--;
        if (remaining > 0) {
          this.autoCountdownText.textContent = `เปลี่ยนด่านถัดไปอัตโนมัติใน ${remaining} วินาที...`;
        } else {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
          this.hideCelebration();
          this.startLevel(this.currentLevel + 1);
        }
      }, 1000);

    } else {
      // Completed all 3 levels: Grand Victory!
      this.celebrationTitle.textContent = "🏆 ยอดเยี่ยมที่สุดเลย! 🏆";
      this.celebrationSubtitle.textContent = "หนูเล่นครบทั้ง 3 ด่านแล้ว! รู้จักสถานที่สำคัญของประเทศสมาชิกอาเซียนครบถ้วน เก่งมากๆ จ้า";
      this.btnNextLevel.innerHTML = `<span>เล่นใหม่อีกครั้ง</span><span>🔄</span>`;
      this.autoCountdownText.textContent = "แตะปุ่มเพื่อเริ่มเล่นใหม่ได้ตลอดเวลา";
    }

    this.celebrationOverlay.classList.add('active');
  }

  hideCelebration() {
    this.celebrationOverlay.classList.remove('active');
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
  }

  // Confetti Animation Canvas
  initConfetti() {
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.particles = [];
  }

  startConfetti() {
    this.confettiActive = true;
    this.particles = [];
    const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 200,
        r: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 20 - 10,
        tiltAngle: 0,
        tiltAngleInc: 0.05 + Math.random() * 0.08,
        vy: 2.5 + Math.random() * 4,
        vx: Math.random() * 3 - 1.5
      });
    }

    const animate = () => {
      if (!this.confettiActive) {
        this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }

      this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.vy;
        p.x += Math.sin(p.tiltAngle) * 1.5 + p.vx;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        this.confettiCtx.beginPath();
        this.confettiCtx.lineWidth = p.r / 1.5;
        this.confettiCtx.strokeStyle = p.color;
        this.confettiCtx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        this.confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        this.confettiCtx.stroke();

        // Wrap particles back to top
        if (p.y > window.innerHeight) {
          p.x = Math.random() * window.innerWidth;
          p.y = -20;
        }
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  stopConfetti() {
    this.confettiActive = false;
    if (this.confettiCtx) {
      this.confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // ASEAN Countries List Modal (30% Transparent Glassmorphism)
  showAseanModal() {
    window.soundManager.playPop();
    this.renderAseanCountriesList();

    if (this.aseanModalOverlay) {
      this.aseanModalOverlay.classList.add('active');
      this.aseanModalOverlay.setAttribute('aria-hidden', 'false');
    }

    // Sparkle burst at the logo
    if (this.aseanEmblemBtn) {
      const rect = this.aseanEmblemBtn.getBoundingClientRect();
      this.createSparkleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }

  hideAseanModal() {
    window.soundManager.playPop();
    if (this.aseanModalOverlay) {
      this.aseanModalOverlay.classList.remove('active');
      this.aseanModalOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  renderAseanCountriesList() {
    if (!this.aseanCountriesGrid || this.aseanCountriesGrid.children.length > 0) return;
    this.aseanCountriesGrid.innerHTML = '';

    ASEAN_LANDMARKS.forEach((country, index) => {
      const card = document.createElement('div');
      card.className = 'country-info-card';
      card.innerHTML = `
        <div class="country-card-num">${index + 1}</div>
        <div class="country-card-flag">
          ${country.flag_svg}
        </div>
        <div class="country-card-text">
          <span class="country-card-name-th">${country.country_th}</span>
          <span class="country-card-name-en">${country.country_en}</span>
          <span class="country-card-landmark">📍 ${country.landmark_th}</span>
        </div>
      `;

      // Fun interaction: Clicking country card makes sound and sparkles
      card.addEventListener('click', () => {
        window.soundManager.playPop();
        const r = card.getBoundingClientRect();
        this.createSparkleBurst(r.left + r.width / 2, r.top + r.height / 2);
      });

      this.aseanCountriesGrid.appendChild(card);
    });
  }
}

// Start game when page loads
window.addEventListener('DOMContentLoaded', () => {
  window.game = new AseanMatchingGame();
});
