/**
 * Jigsaw Puzzle Game Logic
 * Supports Touch Drag & Drop, Mouse Drag & Drop, and Tap-to-Select for preschoolers.
 * Auto-scales and hit-tests accurately on all device screen resolutions.
 */

class JigsawGame {
  constructor() {
    this.sound = new SoundManager();
    this.currentSeasonIdx = 0;
    this.seasons = typeof JIGSAW_SEASONS !== 'undefined' ? JIGSAW_SEASONS : [];
    this.placedCount = 0;
    this.selectedPieceId = null;

    // DOM Elements
    this.boardSvg = document.getElementById('jigsawBoardSvg');
    this.defsContainer = document.getElementById('jigsawDefs');
    this.ghostImage = document.getElementById('boardGhostImage');
    this.slotsGroup = document.getElementById('boardSlotsGroup');
    this.placedGroup = document.getElementById('boardPlacedGroup');
    this.trayCards = document.getElementById('trayCardsContainer');
    this.seasonTabs = document.getElementById('seasonSelectorBar');
    this.trayCountText = document.getElementById('trayPiecesCount');
    this.levelBadge = document.getElementById('currentLevelBadge');
    this.boardTip = document.getElementById('boardTipText');

    // Celebration Modal
    this.celebrationOverlay = document.getElementById('celebrationOverlay');
    this.celebrationTitle = document.getElementById('celebrationTitle');
    this.celebrationSubtitle = document.getElementById('celebrationSubtitle');
    this.celebrationImage = document.getElementById('celebrationPreviewImg');
    this.btnNextSeason = document.getElementById('btnCelebrationNext');
    this.btnReplay = document.getElementById('btnCelebrationReplay');
    this.confettiCanvas = document.getElementById('confettiCanvas');

    // Controls
    this.audioBtn = document.getElementById('audioToggleBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.resetBtn = document.getElementById('btnResetBoard');

    this.initAudioControls();
    this.initSeasonTabs();
    this.initCelebrationControls();
    this.initTrayScroll();
    this.loadSeason(0);
  }

  initTrayScroll() {
    const trayPanel = document.querySelector('.jigsaw-tray-panel');
    if (!trayPanel || !this.trayCards) return;
    trayPanel.addEventListener('wheel', (e) => {
      if (this.trayCards.scrollHeight > this.trayCards.clientHeight) {
        this.trayCards.scrollTop += e.deltaY;
      }
    }, { passive: true });
  }

  initAudioControls() {
    if (!this.audioBtn) return;
    
    const unlockAudio = () => {
      this.sound.init();
      this.sound.startBGM();
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

    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.loadSeason(this.currentSeasonIdx);
      });
    }
  }

  initSeasonTabs() {
    if (!this.seasonTabs) return;
    this.seasonTabs.innerHTML = this.seasons.map((season, idx) => `
      <button class="season-tab-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
        <span>${season.emoji}</span>
        <span>${season.name}</span>
        <span class="tab-count">${season.pieces.length} ชิ้น</span>
      </button>
    `).join('');

    this.seasonTabs.querySelectorAll('.season-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (idx !== this.currentSeasonIdx) {
          try { this.sound.playPop(); } catch (e) {}
          this.loadSeason(idx);
        }
      });
    });
  }

  initCelebrationControls() {
    if (this.btnNextSeason) {
      this.btnNextSeason.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.celebrationOverlay.classList.remove('active');
        const nextIdx = (this.currentSeasonIdx + 1) % this.seasons.length;
        this.loadSeason(nextIdx);
      });
    }

    if (this.btnReplay) {
      this.btnReplay.addEventListener('click', () => {
        try { this.sound.playPop(); } catch (e) {}
        this.celebrationOverlay.classList.remove('active');
        this.loadSeason(this.currentSeasonIdx);
      });
    }
  }

  loadSeason(idx) {
    this.currentSeasonIdx = idx;
    const season = this.seasons[idx];
    if (!season) return;

    this.placedCount = 0;
    this.selectedPieceId = null;

    if (this.levelBadge) {
      this.levelBadge.innerText = `ด่าน ${idx + 1}/${this.seasons.length}`;
      this.levelBadge.style.background = season.badgeColor;
    }

    this.seasonTabs.querySelectorAll('.season-tab-btn').forEach((btn, bIdx) => {
      if (bIdx === idx) {
        btn.classList.add('active');
        btn.style.background = season.badgeColor;
        btn.style.borderColor = season.badgeColor;
      } else {
        btn.classList.remove('active');
        btn.style.background = '';
        btn.style.borderColor = '';
      }
    });

    if (this.boardTip) {
      this.boardTip.innerText = `✨ ลากหรือแตะชิ้นส่วนมาวางบนกระดาน ${season.name} (${season.pieces.length} ชิ้น)`;
    }

    // 1. Setup SVG Defs inside Board SVG
    this.defsContainer.innerHTML = '';
    season.pieces.forEach(p => {
      const clip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
      clip.setAttribute('id', `jigsaw-clip-${p.id}`);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', p.path);
      clip.appendChild(path);
      this.defsContainer.appendChild(clip);
    });

    // 2. Setup Ghost Image on Board
    this.ghostImage.setAttribute('href', season.image);
    this.ghostImage.setAttribute('opacity', '0.22');
    this.ghostImage.style.filter = 'grayscale(0.1)';

    // 3. Clear Placed Group
    this.placedGroup.innerHTML = '';
    this.placedGroup.style.display = '';

    // 4. Render Slot outlines on Board
    let slotsHtml = '';
    season.pieces.forEach(p => {
      slotsHtml += `
        <path class="board-slot" id="board-slot-${p.id}" data-slot-id="${p.id}" d="${p.path}" />
      `;
    });
    this.slotsGroup.innerHTML = slotsHtml;

    // Attach slot tap-to-place listeners
    this.slotsGroup.querySelectorAll('.board-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        const slotId = parseInt(slot.dataset.slotId, 10);
        this.handleSlotClick(slotId);
      });
    });

    // 5. Setup Pieces in Tray (Shuffled)
    this.renderTray(season);
    this.updateTrayCount();
  }

  renderTray(season) {
    const shuffledPieces = [...season.pieces].sort(() => Math.random() - 0.5);

    this.trayCards.innerHTML = shuffledPieces.map(piece => {
      const b = piece.bbox;
      const pad = 12;
      const vb = `${b.minX - pad} ${b.minY - pad} ${b.width + pad * 2} ${b.height + pad * 2}`;
      return `
        <div class="piece-card" id="piece-card-${piece.id}" data-piece-id="${piece.id}" title="${piece.title}">
          <span class="piece-number-tag">${piece.id + 1}</span>
          <svg viewBox="${vb}" class="piece-svg-preview">
            <defs>
              <clipPath id="tray-clip-${piece.id}">
                <path d="${piece.path}" />
              </clipPath>
            </defs>
            <image href="${season.image}" x="0" y="0" width="1536" height="1024" clip-path="url(#tray-clip-${piece.id})" />
            <path d="${piece.path}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="3" />
          </svg>
        </div>
      `;
    }).join('');

    this.trayCards.querySelectorAll('.piece-card').forEach(card => {
      this.attachCardInteractions(card, season);
    });
  }

  updateTrayCount() {
    const season = this.seasons[this.currentSeasonIdx];
    if (!season || !this.trayCountText) return;
    const remaining = season.pieces.length - this.placedCount;
    this.trayCountText.innerText = `เหลือ ${remaining} ชิ้น`;
  }

  attachCardInteractions(card, season) {
    const pieceId = parseInt(card.dataset.pieceId, 10);
    const piece = season.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let ghostEl = null;

    const onPointerDown = (e) => {
      if (card.classList.contains('is-placed')) return;
      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      // Prepare Ghost Element
      const b = piece.bbox;
      const pad = 12;
      const vb = `${b.minX - pad} ${b.minY - pad} ${b.width + pad * 2} ${b.height + pad * 2}`;
      
      const rect = card.getBoundingClientRect();
      let ghostW = Math.max(110, Math.min(200, rect.width * 1.25));
      let ghostH = ghostW * ((b.height + pad * 2) / (b.width + pad * 2));
      if (ghostH > 220) {
        ghostH = 220;
        ghostW = ghostH * ((b.width + pad * 2) / (b.height + pad * 2));
      }

      ghostEl = document.createElement('div');
      ghostEl.className = 'jigsaw-drag-ghost';
      ghostEl.style.width = `${ghostW}px`;
      ghostEl.style.height = `${ghostH}px`;
      ghostEl.style.left = `${e.clientX}px`;
      ghostEl.style.top = `${e.clientY}px`;
      ghostEl.style.pointerEvents = 'none';
      ghostEl.innerHTML = `
        <svg viewBox="${vb}" style="width: 100%; height: 100%; display: block; overflow: visible;">
          <defs>
            <clipPath id="ghost-clip-${piece.id}">
              <path d="${piece.path}" />
            </clipPath>
          </defs>
          <image href="${season.image}" x="0" y="0" width="1536" height="1024" clip-path="url(#ghost-clip-${piece.id})" />
          <path d="${piece.path}" fill="none" stroke="#f59e0b" stroke-width="5" />
        </svg>
      `;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      window.addEventListener('pointercancel', onPointerCancel);
    };

    const onPointerMove = (e) => {
      const dist = Math.hypot(e.clientX - startX, e.clientY - startY);
      if (!isDragging && dist > 7) {
        isDragging = true;
        document.body.appendChild(ghostEl);
        card.style.opacity = '0.3';
        try { this.sound.playPop(); } catch (err) {}
      }

      if (isDragging && ghostEl) {
        ghostEl.style.left = `${e.clientX}px`;
        ghostEl.style.top = `${e.clientY}px`;

        const target = this.getSlotUnderPointer(e.clientX, e.clientY);
        this.slotsGroup.querySelectorAll('.board-slot').forEach(s => s.classList.remove('drag-over'));
        if (target && target.element) {
          target.element.classList.add('drag-over');
        }
      }
    };

    const onPointerUp = (e) => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);

      this.slotsGroup.querySelectorAll('.board-slot').forEach(s => s.classList.remove('drag-over'));

      if (!isDragging) {
        // Was a tap/click!
        if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl);
        card.style.opacity = '1';
        this.handleCardTap(card, pieceId);
        return;
      }

      // Drag released
      if (ghostEl && ghostEl.parentNode) {
        ghostEl.parentNode.removeChild(ghostEl);
      }
      card.style.opacity = '1';

      const target = this.getSlotUnderPointer(e.clientX, e.clientY);
      if (target) {
        if (target.pieceId === pieceId) {
          // Correct match!
          this.placePiece(pieceId);
        } else {
          // Wrong slot!
          if (target.element) {
            target.element.classList.add('shake-error');
            setTimeout(() => target.element.classList.remove('shake-error'), 400);
          }
          try { this.sound.playMismatch(); } catch (err) {}
        }
      } else {
        // Released outside board
        try { this.sound.playMismatch(); } catch (err) {}
      }
    };

    const onPointerCancel = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerCancel);
      if (ghostEl && ghostEl.parentNode) ghostEl.parentNode.removeChild(ghostEl);
      card.style.opacity = '1';
    };

    card.addEventListener('pointerdown', onPointerDown);
  }

  handleCardTap(card, pieceId) {
    if (this.selectedPieceId === pieceId) {
      this.selectedPieceId = null;
      card.classList.remove('selected');
      try { this.sound.playPop(); } catch (e) {}
    } else {
      this.selectedPieceId = pieceId;
      this.trayCards.querySelectorAll('.piece-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      try { this.sound.playPop(); } catch (e) {}

      // Highlight target slot gently to assist toddlers
      const targetSlot = document.getElementById(`board-slot-${pieceId}`);
      if (targetSlot) {
        targetSlot.classList.add('drag-over');
        setTimeout(() => targetSlot.classList.remove('drag-over'), 900);
      }
    }
  }

  handleSlotClick(slotId) {
    if (this.selectedPieceId === null) return;

    if (this.selectedPieceId === slotId) {
      this.placePiece(slotId);
      this.selectedPieceId = null;
    } else {
      const slot = document.getElementById(`board-slot-${slotId}`);
      if (slot) {
        slot.classList.add('shake-error');
        setTimeout(() => slot.classList.remove('shake-error'), 400);
      }
      try { this.sound.playMismatch(); } catch (e) {}
    }
  }

  /**
   * Translates screen coords to SVG viewBox coords using getScreenCTM()
   * Works accurately on ANY screen resolution and orientation.
   */
  getSlotUnderPointer(clientX, clientY) {
    if (!this.boardSvg) return null;

    const pt = this.boardSvg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = this.boardSvg.getScreenCTM();
    if (!ctm) return null;

    const svgPt = pt.matrixTransform(ctm.inverse());

    // Check if within board viewBox with tolerance
    if (svgPt.x < -80 || svgPt.x > 1616 || svgPt.y < -80 || svgPt.y > 1104) {
      return null;
    }

    const season = this.seasons[this.currentSeasonIdx];

    // 1. Precise Geometric Hit-Test on unplaced slots using isPointInFill
    for (const p of season.pieces) {
      const slotEl = document.getElementById(`board-slot-${p.id}`);
      if (!slotEl || slotEl.style.display === 'none') continue;

      if (typeof slotEl.isPointInFill === 'function') {
        try {
          if (slotEl.isPointInFill(svgPt)) {
            return {
              element: slotEl,
              pieceId: p.id
            };
          }
        } catch (e) {}
      }
    }

    // 2. Proximity Hit-Test fallback with toddler-friendly margin
    let bestSlot = null;
    let minDistance = Infinity;

    season.pieces.forEach(p => {
      const slotEl = document.getElementById(`board-slot-${p.id}`);
      if (!slotEl || slotEl.style.display === 'none') return;

      const b = p.bbox;
      // Generous bounding box tolerance for toddlers (+80px)
      const inBbox = (
        svgPt.x >= b.minX - 80 &&
        svgPt.x <= b.minX + b.width + 80 &&
        svgPt.y >= b.minY - 80 &&
        svgPt.y <= b.minY + b.height + 80
      );

      const dist = Math.hypot(svgPt.x - p.targetCenter.x, svgPt.y - p.targetCenter.y);
      if (inBbox && dist < minDistance) {
        minDistance = dist;
        bestSlot = {
          element: slotEl,
          pieceId: p.id
        };
      }
    });

    return bestSlot;
  }

  placePiece(pieceId) {
    const season = this.seasons[this.currentSeasonIdx];
    const piece = season.pieces.find(p => p.id === pieceId);
    if (!piece) return;

    if (document.getElementById(`placed-piece-${pieceId}`)) return;

    // Sound feedback
    try {
      if (this.sound && typeof this.sound.playMatch === 'function') {
        this.sound.playMatch();
      } else if (this.sound && typeof this.sound.playMatchSuccess === 'function') {
        this.sound.playMatchSuccess();
      }
    } catch (err) {
      console.warn('Audio error:', err);
    }

    // 1. Mark tray card as placed
    const card = document.getElementById(`piece-card-${pieceId}`);
    if (card) {
      card.classList.remove('selected');
      card.classList.add('is-placed');
    }

    // 2. Hide slot outline on board
    const slot = document.getElementById(`board-slot-${pieceId}`);
    if (slot) {
      slot.style.display = 'none';
    }

    // 3. Add Placed Piece SVG group to Board directly using createElementNS
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'placed-piece');
    g.setAttribute('id', `placed-piece-${pieceId}`);

    const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttribute('href', season.image);
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', season.image);
    img.setAttribute('x', '0');
    img.setAttribute('y', '0');
    img.setAttribute('width', '1536');
    img.setAttribute('height', '1024');
    img.setAttribute('clip-path', `url(#jigsaw-clip-${piece.id})`);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', piece.path);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'rgba(255,255,255,0.85)');
    path.setAttribute('stroke-width', '3');

    g.appendChild(img);
    g.appendChild(path);
    this.placedGroup.appendChild(g);

    this.placedCount++;
    this.updateTrayCount();

    // 4. Check if Level Complete!
    if (this.placedCount >= season.pieces.length) {
      setTimeout(() => {
        this.triggerCelebration(season);
      }, 350);
    }
  }

  triggerCelebration(season) {
    try {
      if (this.sound && typeof this.sound.playLevelComplete === 'function') {
        this.sound.playLevelComplete();
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }

    try {
      this.startConfetti();
    } catch (e) {
      console.warn('Confetti error:', e);
    }

    // Reveal full board without seams
    this.ghostImage.setAttribute('opacity', '1');
    this.ghostImage.style.filter = 'none';
    this.placedGroup.style.display = 'none';

    if (this.celebrationTitle) {
      this.celebrationTitle.innerText = `เก่งมากเลยคนเก่ง! 🎉`;
    }
    if (this.celebrationSubtitle) {
      this.celebrationSubtitle.innerText = `ต่อภาพจิ๊กซอว์ "${season.name}" (${season.pieces.length} ชิ้น) สำเร็จเรียบร้อยแล้ว`;
    }
    if (this.celebrationImage) {
      this.celebrationImage.src = season.image;
      this.celebrationImage.alt = season.name;
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

    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#fbbf24'];
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
  window.jigsawGame = new JigsawGame();
});
