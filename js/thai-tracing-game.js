/**
 * Thai Consonant Tracing Game Logic (เกมฝึกเขียนตามรอยเส้นประ พยัญชนะไทย ก - ฮ)
 * Version: v1.3.7
 * Features:
 * - Standard Looped Thai Kindergarten Fonts ('Sarabun', 'Noto Sans Thai', 'Thonburi')
 * - 1.5x Enlarged Template with gray outline & dashed centerline
 * - Smart multi-criteria drawing evaluation:
 *   1. Evaluates ONLY upon pointerup (no premature popup while drawing)
 *   2. Comprehensive checkpoint coverage (>= 82% overall)
 *   3. Quadrant-based structure check (>= 65% in all active quadrants)
 *   4. Scribble / out-of-bounds noise penalty filter (>= 55% on-template ratio)
 *   5. Minimum stroke path length check
 * - All 44 Thai consonants have dedicated illustration pictures (no emoji fallback)
 * - Auto-fitting 100% viewport (zero vertical overflow)
 */

class ThaiTracingGame {
  constructor() {
    this.consonants = typeof THAI_CONSONANTS_DATA !== 'undefined' ? THAI_CONSONANTS_DATA : [];
    this.currentIndex = 0;
    this.mode = 'sequential'; // 'sequential' | 'random'
    this.currentColor = 'rainbow'; // 'rainbow' | hex code
    this.rainbowHue = 0;

    // Checkpoint & Tracing State
    this.checkpoints = [];
    this.passedCheckpointsCount = 0;
    this.quadrantCounts = { top_left: 0, top_right: 0, bottom_left: 0, bottom_right: 0 };
    this.isDrawing = false;
    this.lastPoint = null;
    this.userStrokes = []; // Array of strokes: [{ color, points: [{x, y}] }]
    this.currentStroke = null;
    this.isCompleted = false;
    this.successTimer = null;

    // Internal canvas resolution
    this.canvasWidth = 400;
    this.canvasHeight = 400;

    // DOM Elements
    this.initDOMElements();
    this.setupCanvas();
    this.bindEvents();

    // Start with first consonant
    this.loadConsonant(this.currentIndex);

    // Re-sample checkpoints when web fonts are fully loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.setupCheckpoints(this.consonants[this.currentIndex]);
      });
    }
  }

  initDOMElements() {
    // Canvas & Slate
    this.canvas = document.getElementById('tracingCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.guideSvg = document.getElementById('guideSvg');

    // Template SVG Elements (Outline, Dashed Centerline, Start & End Markers)
    this.tplTextBase = document.getElementById('tplTextBase');
    this.tplTextOutline = document.getElementById('tplTextOutline');
    this.tplCenterlineDashed = document.getElementById('tplCenterlineDashed');
    this.startMarkerGroup = document.getElementById('startMarkerGroup');
    this.endMarkerGroup = document.getElementById('endMarkerGroup');
    this.headHintBubble = document.getElementById('headHintBubble');
    this.hintTimer = null;
    this.startPoint = null;
    this.endPoint = null;
    this.hasStartedAtHead = false;
    this.currentCheckpointIndex = 0;

    // Progress
    this.progressFill = document.getElementById('progressFill');
    this.progressPercentText = document.getElementById('progressPercentText');

    // Navigation & Badges
    this.currentLetterBadge = document.getElementById('currentLetterBadge');
    this.modeBadge = document.getElementById('modeBadge');
    this.btnPrevLetter = document.getElementById('btnPrevLetter');
    this.btnNextLetter = document.getElementById('btnNextLetter');
    this.btnRandomLetter = document.getElementById('btnRandomLetter');
    this.btnModeSeq = document.getElementById('btnModeSeq');
    this.btnModeRand = document.getElementById('btnModeRand');
    this.btnOpenLetterPicker = document.getElementById('btnOpenLetterPicker');

    // Tools
    this.btnClear = document.getElementById('btnClear');
    this.btnResetBoard = document.getElementById('btnResetBoard');
    this.btnUndo = document.getElementById('btnUndo');
    this.crayonBtns = document.querySelectorAll('.crayon-btn');

    // Letter Card
    this.cardLetterBadge = document.getElementById('cardLetterBadge');
    this.cardLetterName = document.getElementById('cardLetterName');
    this.cardLetterPhonetic = document.getElementById('cardLetterPhonetic');
    this.cardLetterRhyme = document.getElementById('cardLetterRhyme');
    this.cardMascotImg = document.getElementById('cardMascotImg');
    this.cardWritingTip = document.getElementById('cardWritingTip');
    this.btnPlaySpeech = document.getElementById('btnPlaySpeech');

    // Modals
    this.letterPickerModal = document.getElementById('letterPickerModal');
    this.btnClosePicker = document.getElementById('btnClosePicker');
    this.letterGrid44 = document.getElementById('letterGrid44');

    this.celebrationModal = document.getElementById('celebrationModal');
    this.celebrationChar = document.getElementById('celebrationChar');
    this.btnNextCelebration = document.getElementById('btnNextCelebration');
    this.btnRetryCelebration = document.getElementById('btnRetryCelebration');

    // Confetti
    this.confettiCanvas = document.getElementById('confettiCanvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;
  }

  setupCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  bindEvents() {
    // Drawing Pointer Events
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
      this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
      this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
      this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
    }

    // Crayons
    this.crayonBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.crayonBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentColor = btn.getAttribute('data-color') || 'rainbow';
        if (window.soundManager) window.soundManager.playPop();
      });
    });

    // Tools
    if (this.btnClear) {
      this.btnClear.addEventListener('click', () => {
        this.clearCanvas();
        if (window.soundManager) window.soundManager.playPop();
      });
    }
    if (this.btnResetBoard) {
      this.btnResetBoard.addEventListener('click', () => {
        this.clearCanvas();
        if (window.soundManager) window.soundManager.playPop();
      });
    }
    if (this.btnUndo) {
      this.btnUndo.addEventListener('click', () => {
        this.undoStroke();
        if (window.soundManager) window.soundManager.playPop();
      });
    }

    // Navigation
    if (this.btnPrevLetter) {
      this.btnPrevLetter.addEventListener('click', () => this.prevLetter());
    }
    if (this.btnNextLetter) {
      this.btnNextLetter.addEventListener('click', () => this.nextLetter());
    }
    if (this.btnRandomLetter) {
      this.btnRandomLetter.addEventListener('click', () => this.randomLetter());
    }

    // Mode Toggle
    if (this.btnModeSeq) {
      this.btnModeSeq.addEventListener('click', () => this.setMode('sequential'));
    }
    if (this.btnModeRand) {
      this.btnModeRand.addEventListener('click', () => this.setMode('random'));
    }

    // Speech Audio
    if (this.btnPlaySpeech) {
      this.btnPlaySpeech.addEventListener('click', () => this.speakCurrentLetter());
    }

    // Letter Picker Modal
    if (this.btnOpenLetterPicker) {
      this.btnOpenLetterPicker.addEventListener('click', () => this.openLetterPicker());
    }
    if (this.btnClosePicker) {
      this.btnClosePicker.addEventListener('click', () => this.closeLetterPicker());
    }
    if (this.letterPickerModal) {
      this.letterPickerModal.addEventListener('click', (e) => {
        if (e.target === this.letterPickerModal) this.closeLetterPicker();
      });
    }

    // Celebration Modal
    if (this.btnNextCelebration) {
      this.btnNextCelebration.addEventListener('click', () => {
        this.closeCelebration();
        this.nextLetter();
      });
    }
    if (this.btnRetryCelebration) {
      this.btnRetryCelebration.addEventListener('click', () => {
        this.closeCelebration();
        this.clearCanvas();
      });
    }

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn && window.soundManager) {
      audioBtn.addEventListener('click', () => {
        const isMuted = window.soundManager.toggleSound();
        audioBtn.classList.toggle('active', !isMuted);
      });
    }
  }

  // =========================================================================
  // Consonant Loading & Setup
  // =========================================================================
  loadConsonant(index) {
    if (index < 0 || index >= this.consonants.length) return;
    if (this.successTimer) {
      clearTimeout(this.successTimer);
      this.successTimer = null;
    }

    this.currentIndex = index;
    const item = this.consonants[index];

    // Update Header & Badge
    if (this.currentLetterBadge) {
      this.currentLetterBadge.innerHTML = `
        <span class="index-badge">${index + 1}/44</span>
        <span>${item.name}</span>
      `;
    }

    // Update Letter Card with Looped Font
    if (this.cardLetterBadge) {
      this.cardLetterBadge.textContent = item.letter;
      this.cardLetterBadge.style.background = `linear-gradient(135deg, ${item.color} 0%, #db2777 100%)`;
    }
    if (this.cardLetterName) {
      this.cardLetterName.textContent = item.name;
    }
    if (this.cardLetterPhonetic) {
      this.cardLetterPhonetic.textContent = `(${item.phonetic})`;
    }
    if (this.cardLetterRhyme) {
      this.cardLetterRhyme.textContent = item.rhyme;
    }
    if (this.cardWritingTip) {
      this.cardWritingTip.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284c7" style="flex-shrink: 0;"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
        <span><strong>วิธีเขียน:</strong> ${item.instruction}</span>
      `;
    }

    // Mascot Illustration Image (Dedicated 3D Pixar Cartoon file for all 44 consonants)
    if (this.cardMascotImg) {
      this.cardMascotImg.src = item.img || `assets/images/thai_letters/${item.id}.jpg`;
      this.cardMascotImg.alt = item.name;
    }

    // Update SVG Template Texts (Adjusted dynamically so descenders & ascenders fit cleanly)
    const layout = this.getLetterLayout(item.letter);
    [this.tplTextBase, this.tplTextOutline].forEach((el) => {
      if (el) {
        el.textContent = item.letter;
        el.setAttribute('y', layout.baselineY);
        el.setAttribute('font-size', layout.fontSize);
        el.style.fontSize = `${layout.fontSize}px`;
      }
    });

    // Update Dashed Centerline Guide & Start/End Markers
    this.updateTemplateGuide(item);

    // Setup Sequential Checkpoints along the Stroke Path starting from Head 🟢
    this.setupCheckpoints(item);

    // Reset Canvas and Tracing State
    this.clearCanvas();
    this.isCompleted = false;

    // Update Prev/Next button disabled state in sequential mode
    if (this.btnPrevLetter) {
      this.btnPrevLetter.style.opacity = (this.mode === 'sequential' && index === 0) ? '0.5' : '1';
      this.btnPrevLetter.style.pointerEvents = (this.mode === 'sequential' && index === 0) ? 'none' : 'auto';
    }
    if (this.btnNextLetter) {
      this.btnNextLetter.style.opacity = (this.mode === 'sequential' && index === this.consonants.length - 1) ? '0.5' : '1';
      this.btnNextLetter.style.pointerEvents = (this.mode === 'sequential' && index === this.consonants.length - 1) ? 'none' : 'auto';
    }
  }

  // Update Centerline SVG Path and Position Start Dot (Green) and End Arrow (Red)
  updateTemplateGuide(item) {
    if (!this.tplCenterlineDashed) return;

    this.tplCenterlineDashed.setAttribute('d', item.path || '');

    try {
      const totalLen = this.tplCenterlineDashed.getTotalLength();
      if (totalLen > 0) {
        // 1. Head Start Point (Green Dot 🟢)
        const pStart = this.tplCenterlineDashed.getPointAtLength(0);
        this.startPoint = { x: Math.round(pStart.x), y: Math.round(pStart.y) };
        if (this.startMarkerGroup) {
          this.startMarkerGroup.setAttribute('transform', `translate(${this.startPoint.x}, ${this.startPoint.y})`);
          this.startMarkerGroup.style.display = 'block';
        }

        // 2. End Point & Tangent Direction Arrow (Red Arrow 🔺)
        const pEnd = this.tplCenterlineDashed.getPointAtLength(totalLen);
        const pPre = this.tplCenterlineDashed.getPointAtLength(Math.max(0, totalLen - 8));
        const angle = Math.atan2(pEnd.y - pPre.y, pEnd.x - pPre.x) * (180 / Math.PI) + 90;
        this.endPoint = { x: Math.round(pEnd.x), y: Math.round(pEnd.y) };
        if (this.endMarkerGroup) {
          this.endMarkerGroup.setAttribute('transform', `translate(${this.endPoint.x}, ${this.endPoint.y}) rotate(${angle})`);
          this.endMarkerGroup.style.display = 'block';
        }
      }
    } catch (e) {
      console.warn('Centerline guide error:', e);
      if (item.startPoint) {
        this.startPoint = item.startPoint;
        if (this.startMarkerGroup) {
          this.startMarkerGroup.setAttribute('transform', `translate(${item.startPoint.x}, ${item.startPoint.y})`);
        }
      }
    }
  }

  // Calculate tailored font size & baseline so characters with long tails/pedestals fit perfectly
  getLetterLayout(letter) {
    // Characters with bottom descenders / pedestals (หางยาวลงล่าง / มีเชิง)
    // ญ, ฎ, ฏ, ฐ: Scale down to 255px and raise baseline to y=255 so body sits on line 3 and descender reaches line 4
    if (['ญ', 'ฎ', 'ฏ', 'ฐ'].includes(letter)) {
      return { fontSize: 255, baselineY: 255 };
    }
    // Characters with tall top ascenders (หางยาวขึ้นบน)
    // ป, ฝ, ฟ, ฬ, ช, ซ, ศ: Scale to 325px and baseline y=352 so top tail does not clip
    if (['ป', 'ฝ', 'ฟ', 'ฬ', 'ช', 'ซ', 'ศ'].includes(letter)) {
      return { fontSize: 325, baselineY: 352 };
    }
    // Standard characters: generous 375px filling guidelines
    return { fontSize: 375, baselineY: 348 };
  }

  // Sample Checkpoints Sequentially along the Centerline Stroke Path (Start from Head 🟢 to End 🔺)
  setupCheckpoints(item) {
    this.checkpoints = [];
    this.passedCheckpointsCount = 0;
    this.currentCheckpointIndex = 0;
    this.hasStartedAtHead = false;
    this.quadrantCounts = { top_left: 0, top_right: 0, bottom_left: 0, bottom_right: 0 };

    try {
      if (this.tplCenterlineDashed) {
        const totalLen = this.tplCenterlineDashed.getTotalLength();
        if (totalLen > 0) {
          const step = 7; // Dense checkpoints ~7px apart along the stroke path
          const numPoints = Math.max(35, Math.floor(totalLen / step));
          for (let i = 0; i <= numPoints; i++) {
            const len = (i / numPoints) * totalLen;
            const pt = this.tplCenterlineDashed.getPointAtLength(len);
            const quad = (pt.y < 200 ? 'top' : 'bottom') + '_' + (pt.x < 200 ? 'left' : 'right');
            this.quadrantCounts[quad] = (this.quadrantCounts[quad] || 0) + 1;
            this.checkpoints.push({
              x: Math.round(pt.x),
              y: Math.round(pt.y),
              index: i,
              quad,
              passed: false
            });
          }
        }
      }
    } catch (e) {
      console.warn('Checkpoint sampling error:', e);
    }

    // Fallback if SVG measurement delayed
    if (this.checkpoints.length === 0) {
      const fallbackPoints = [
        { x: 120, y: 120, index: 0, quad: 'top_left', passed: false },
        { x: 280, y: 120, index: 1, quad: 'top_right', passed: false },
        { x: 120, y: 320, index: 2, quad: 'bottom_left', passed: false },
        { x: 280, y: 320, index: 3, quad: 'bottom_right', passed: false }
      ];
      this.checkpoints = fallbackPoints;
      this.quadrantCounts = { top_left: 1, top_right: 1, bottom_left: 1, bottom_right: 1 };
    }

    this.updateProgressBar(0);
  }

  // =========================================================================
  // Touch / Pointer Drawing Engine
  // =========================================================================
  getCanvasCoords(e) {
    if (!this.canvas) return { x: 0, y: 0 };
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvasWidth / rect.width;
    const scaleY = this.canvasHeight / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  handlePointerDown(e) {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
      this.successTimer = null;
    }

    const pt = this.getCanvasCoords(e);

    // Validate start position: MUST begin at the head (หัวของพยัญชนะ)
    const startPt = this.startPoint || (this.checkpoints[0] ? { x: this.checkpoints[0].x, y: this.checkpoints[0].y } : { x: 200, y: 200 });
    const distToStart = Math.hypot(pt.x - startPt.x, pt.y - startPt.y);

    if (this.passedCheckpointsCount === 0) {
      // First stroke: must touch near the head (generous 65px radius for toddlers)
      if (distToStart > 65) {
        this.isDrawing = false;
        this.showHeadHint('🟢 เริ่มเขียนจากหัวสีเขียวก่อนนะจ๊ะ!');
        return;
      }
      this.hasStartedAtHead = true;
      this.hideHeadHint();
    } else {
      // Resuming subsequent stroke
      const activeIdx = Math.min(this.currentCheckpointIndex, this.checkpoints.length - 1);
      const activeCp = this.checkpoints[activeIdx];
      const distToActive = activeCp ? Math.hypot(pt.x - activeCp.x, pt.y - activeCp.y) : 999;
      if (distToActive > 80 && distToStart > 70) {
        this.isDrawing = false;
        this.showHeadHint('ลากเส้นต่อจากจุดเดิมนะจ๊ะ ✨');
        return;
      }
      this.hideHeadHint();
    }

    this.isDrawing = true;
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch (err) {}

    this.lastPoint = pt;

    // Determine stroke color
    let strokeColor = this.currentColor;
    if (strokeColor === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 40) % 360;
      strokeColor = `hsl(${this.rainbowHue}, 90%, 55%)`;
    }

    this.currentStroke = {
      color: strokeColor,
      points: [pt]
    };
    this.userStrokes.push(this.currentStroke);

    // Initial dot
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, 18, 0, Math.PI * 2);
    this.ctx.fillStyle = strokeColor;
    this.ctx.fill();

    this.checkHitPoints(pt);
  }

  handlePointerMove(e) {
    if (!this.isDrawing || !this.lastPoint) return;
    const pt = this.getCanvasCoords(e);

    let strokeColor = this.currentStroke ? this.currentStroke.color : '#0284c7';
    if (this.currentColor === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 4) % 360;
      strokeColor = `hsl(${this.rainbowHue}, 90%, 55%)`;
      this.currentStroke.color = strokeColor;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(pt.x, pt.y);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 34; // Generous smooth brush
    this.ctx.stroke();

    this.lastPoint = pt;
    if (this.currentStroke) {
      this.currentStroke.points.push(pt);
    }

    this.checkHitPoints(pt);
  }

  handlePointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.lastPoint = null;
    this.currentStroke = null;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (err) {}

    // Evaluate drawing quality only on pointer release
    this.evaluateDrawing();
  }

  checkHitPoints(pt) {
    if (this.isCompleted || this.checkpoints.length === 0) return;

    // 38px hit radius matches the 34px brush width accurately
    const hitRadius = 38;
    let newlyHit = false;

    // Sequential forward tracking: check window around current active checkpoint
    const startIdx = Math.max(0, this.currentCheckpointIndex - 2);
    const endIdx = Math.min(this.checkpoints.length, this.currentCheckpointIndex + 10);

    for (let i = startIdx; i < endIdx; i++) {
      const cp = this.checkpoints[i];
      if (!cp.passed) {
        const dx = pt.x - cp.x;
        const dy = pt.y - cp.y;
        if ((dx * dx + dy * dy) <= (hitRadius * hitRadius)) {
          cp.passed = true;
          this.passedCheckpointsCount++;
          if (i >= this.currentCheckpointIndex) {
            this.currentCheckpointIndex = i + 1;
          }
          newlyHit = true;
        }
      }
    }

    if (newlyHit) {
      const ratio = this.passedCheckpointsCount / this.checkpoints.length;
      this.updateProgressBar(ratio);
    }
  }

  showHeadHint(msg = '🟢 เริ่มเขียนจากหัวสีเขียวก่อนนะจ๊ะ!') {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }

    if (this.headHintBubble) {
      const span = this.headHintBubble.querySelector('span');
      if (span) span.textContent = msg;
      this.headHintBubble.style.display = 'block';
    }

    if (this.startMarkerGroup) {
      this.startMarkerGroup.classList.remove('head-nudge');
      void this.startMarkerGroup.offsetWidth;
      this.startMarkerGroup.classList.add('head-nudge');
    }

    this.hintTimer = setTimeout(() => {
      this.hideHeadHint();
    }, 2400);
  }

  hideHeadHint() {
    if (this.hintTimer) {
      clearTimeout(this.hintTimer);
      this.hintTimer = null;
    }
    if (this.headHintBubble) {
      this.headHintBubble.style.display = 'none';
    }
    if (this.startMarkerGroup) {
      this.startMarkerGroup.classList.remove('head-nudge');
    }
  }

  // =========================================================================
  // Professional Intelligent Tracing Evaluation System
  // =========================================================================
  evaluateDrawing() {
    if (this.isCompleted || this.checkpoints.length === 0) return;

    const totalCP = this.checkpoints.length;
    const overallRatio = this.passedCheckpointsCount / totalCP;

    // 1. Overall Checkpoint Coverage Requirement (Must reach at least 82%)
    if (overallRatio < 0.82) {
      return; // Still drawing or incomplete
    }

    // 2. Structural Quadrant Distribution Check
    // If a quadrant has significant template strokes (>= 6 points),
    // user must have covered at least 65% of that quadrant.
    const quadPassed = { top_left: 0, top_right: 0, bottom_left: 0, bottom_right: 0 };
    for (const cp of this.checkpoints) {
      if (cp.passed) {
        quadPassed[cp.quad] = (quadPassed[cp.quad] || 0) + 1;
      }
    }

    for (const quad of ['top_left', 'top_right', 'bottom_left', 'bottom_right']) {
      const totalInQuad = this.quadrantCounts[quad] || 0;
      if (totalInQuad >= 6) {
        const passedInQuad = quadPassed[quad] || 0;
        const quadRatio = passedInQuad / totalInQuad;
        if (quadRatio < 0.65) {
          // Incomplete quadrant detected (e.g. child skipped top or bottom)
          return;
        }
      }
    }

    // 3. Anti-Scribble / Noise Penalty Check
    // Verify that user's drawn points are mostly inside or close to the letter template,
    // rather than scribbles everywhere across the board.
    let onTargetPoints = 0;
    let totalDrawnPoints = 0;
    let totalStrokeLength = 0;

    for (const stroke of this.userStrokes) {
      const pts = stroke.points;
      totalDrawnPoints += pts.length;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (i > 0) {
          const prev = pts[i - 1];
          totalStrokeLength += Math.hypot(p.x - prev.x, p.y - prev.y);
        }

        // Test if drawn point is near any letter checkpoint (within 46px)
        let nearLetter = false;
        for (const cp of this.checkpoints) {
          const d2 = (p.x - cp.x) ** 2 + (p.y - cp.y) ** 2;
          if (d2 <= 46 * 46) {
            nearLetter = true;
            break;
          }
        }
        if (nearLetter) onTargetPoints++;
      }
    }

    // Ratio of drawn points that are actually on/near the letter
    const onTargetRatio = totalDrawnPoints > 0 ? (onTargetPoints / totalDrawnPoints) : 0;
    if (onTargetRatio < 0.55) {
      // Scribbles outside the template detected
      return;
    }

    // 4. Minimum Stroke Path Length Check (Prevent single big blotches)
    if (totalStrokeLength < 180) {
      return;
    }

    // All evaluation criteria satisfied with excellence!
    // Short 350ms buffer to allow multi-stroke letters (like ญ, ฐ, ษ) before popping modal
    if (this.successTimer) clearTimeout(this.successTimer);
    this.successTimer = setTimeout(() => {
      if (!this.isDrawing && !this.isCompleted) {
        this.onLetterSuccess();
      }
    }, 350);
  }

  updateProgressBar(ratio) {
    const percent = Math.min(100, Math.round(ratio * 100));
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
    if (this.progressPercentText) {
      this.progressPercentText.textContent = `${percent}%`;
    }
  }

  clearCanvas() {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
      this.successTimer = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    this.userStrokes = [];
    this.currentStroke = null;
    this.passedCheckpointsCount = 0;
    this.currentCheckpointIndex = 0;
    this.hasStartedAtHead = false;
    this.hideHeadHint();
    this.checkpoints.forEach((cp) => (cp.passed = false));
    this.updateProgressBar(0);
    this.isCompleted = false;
  }

  undoStroke() {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
      this.successTimer = null;
    }
    if (this.userStrokes.length === 0) return;
    this.userStrokes.pop();
    this.redrawCanvas();
    this.recalcPassedCheckpoints();
  }

  redrawCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.userStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return;

      if (stroke.points.length === 1) {
        this.ctx.beginPath();
        this.ctx.arc(stroke.points[0].x, stroke.points[0].y, 18, 0, Math.PI * 2);
        this.ctx.fillStyle = stroke.color;
        this.ctx.fill();
        return;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      this.ctx.strokeStyle = stroke.color;
      this.ctx.lineWidth = 34;
      this.ctx.stroke();
    });
  }

  recalcPassedCheckpoints() {
    this.passedCheckpointsCount = 0;
    this.currentCheckpointIndex = 0;
    const hitRadius = 38;
    this.checkpoints.forEach((cp, idx) => {
      cp.passed = false;
      for (const stroke of this.userStrokes) {
        for (const pt of stroke.points) {
          const dx = pt.x - cp.x;
          const dy = pt.y - cp.y;
          if ((dx * dx + dy * dy) <= (hitRadius * hitRadius)) {
            cp.passed = true;
            this.passedCheckpointsCount++;
            this.currentCheckpointIndex = Math.max(this.currentCheckpointIndex, idx + 1);
            return;
          }
        }
      }
    });
    this.hasStartedAtHead = this.passedCheckpointsCount > 0;
    const ratio = this.checkpoints.length ? this.passedCheckpointsCount / this.checkpoints.length : 0;
    this.updateProgressBar(ratio);
  }

  // =========================================================================
  // Completion & Celebration
  // =========================================================================
  onLetterSuccess() {
    this.isCompleted = true;
    this.updateProgressBar(1);

    // Audio chime
    if (window.soundManager) {
      window.soundManager.playMatchSuccess();
    }

    // Trigger Speech
    setTimeout(() => {
      this.speakCurrentLetter();
    }, 250);

    // Confetti and celebration modal
    this.triggerConfetti();
    setTimeout(() => {
      this.openCelebration();
    }, 600);
  }

  openCelebration() {
    const item = this.consonants[this.currentIndex];
    if (this.celebrationChar) {
      this.celebrationChar.textContent = item.letter;
    }
    if (this.celebrationModal) {
      this.celebrationModal.classList.add('open');
    }
  }

  closeCelebration() {
    if (this.celebrationModal) {
      this.celebrationModal.classList.remove('open');
    }
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;

    const colors = ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ec4899', '#eab308'];
    const particles = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const renderConfetti = () => {
      if (frame > 90) {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        return;
      }
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.01;

        if (p.alpha > 0) {
          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.globalAlpha = Math.max(0, p.alpha);
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();
        }
      });

      frame++;
      requestAnimationFrame(renderConfetti);
    };

    requestAnimationFrame(renderConfetti);
  }

  // =========================================================================
  // Speech & Pronunciation
  // =========================================================================
  speakCurrentLetter() {
    const item = this.consonants[this.currentIndex];
    if (!item) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = item.speech || `${item.letter} ${item.name}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'th-TH';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;

      const voices = window.speechSynthesis.getVoices();
      const thaiVoice = voices.find((v) => v.lang.startsWith('th'));
      if (thaiVoice) utterance.voice = thaiVoice;

      window.speechSynthesis.speak(utterance);
    } else if (window.soundManager) {
      window.soundManager.playPop();
    }
  }

  // =========================================================================
  // Navigation & Mode Switching
  // =========================================================================
  prevLetter() {
    if (this.mode === 'sequential') {
      if (this.currentIndex > 0) {
        this.loadConsonant(this.currentIndex - 1);
        if (window.soundManager) window.soundManager.playPop();
      }
    } else {
      this.randomLetter();
    }
  }

  nextLetter() {
    if (this.mode === 'sequential') {
      if (this.currentIndex < this.consonants.length - 1) {
        this.loadConsonant(this.currentIndex + 1);
        if (window.soundManager) window.soundManager.playPop();
      } else {
        this.loadConsonant(0);
        if (window.soundManager) window.soundManager.playPop();
      }
    } else {
      this.randomLetter();
    }
  }

  randomLetter() {
    if (this.consonants.length <= 1) return;
    let nextIdx = this.currentIndex;
    while (nextIdx === this.currentIndex) {
      nextIdx = Math.floor(Math.random() * this.consonants.length);
    }
    this.loadConsonant(nextIdx);
    if (window.soundManager) window.soundManager.playPop();
  }

  setMode(mode) {
    this.mode = mode;
    if (this.btnModeSeq) this.btnModeSeq.classList.toggle('active', mode === 'sequential');
    if (this.btnModeRand) this.btnModeRand.classList.toggle('active', mode === 'random');
    if (this.modeBadge) {
      this.modeBadge.textContent = mode === 'sequential' ? 'โหมดเรียงตามตัวอักษร' : 'โหมดสุ่มตัวอักษร';
    }
    if (this.btnRandomLetter) {
      this.btnRandomLetter.style.display = mode === 'random' ? 'inline-flex' : 'none';
    }
    if (this.btnPrevLetter) {
      this.btnPrevLetter.style.display = mode === 'sequential' ? 'inline-flex' : 'none';
    }
    if (mode === 'random') {
      this.randomLetter();
    }
  }

  // =========================================================================
  // 44-Consonant Grid Picker Modal
  // =========================================================================
  openLetterPicker() {
    if (!this.letterPickerModal || !this.letterGrid44) return;
    this.renderPickerGrid();
    this.letterPickerModal.classList.add('open');
    if (window.soundManager) window.soundManager.playPop();
  }

  closeLetterPicker() {
    if (this.letterPickerModal) {
      this.letterPickerModal.classList.remove('open');
    }
  }

  renderPickerGrid() {
    if (!this.letterGrid44) return;
    this.letterGrid44.innerHTML = '';

    this.consonants.forEach((c, idx) => {
      const itemEl = document.createElement('div');
      itemEl.className = `letter-grid-item ${idx === this.currentIndex ? 'current' : ''}`;
      itemEl.innerHTML = `
        <span class="item-char" style="color: ${c.color}">${c.letter}</span>
        <span class="item-sub">${c.name.split(' ')[1] || c.name}</span>
      `;
      itemEl.addEventListener('click', () => {
        this.loadConsonant(idx);
        this.closeLetterPicker();
        if (window.soundManager) window.soundManager.playPop();
      });
      this.letterGrid44.appendChild(itemEl);
    });
  }
}

// Auto Initialize
window.addEventListener('DOMContentLoaded', () => {
  window.thaiTracingGame = new ThaiTracingGame();
});
