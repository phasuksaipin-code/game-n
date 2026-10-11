/**
 * Occupation Matching Game Logic (เกมจับคู่อาชีพและสถานที่ 10 หน้า)
 * Smooth Drag & Drop, Sound FX, Confetti, and Thai Speech Synthesis
 */

document.addEventListener('DOMContentLoaded', () => {
  // Sound Manager
  const sound = new SoundManager();
  
  // Game State
  let currentLevelIdx = 0;
  let matchedInRound = new Set();
  const completedLevels = new Set(JSON.parse(localStorage.getItem('occ_completed_levels') || '[]'));
  let speechEnabled = true;

  // DOM Elements
  const levelsBar = document.getElementById('levelsBar');
  const levelBadge = document.getElementById('currentLevelBadge');
  const levelHeroText = document.getElementById('levelHeroText');
  const stageArea = document.getElementById('stageArea');
  const dockTray = document.getElementById('dockTray');
  const audioBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const btnResetBoard = document.getElementById('btnResetBoard');
  const celebrationOverlay = document.getElementById('celebrationOverlay');
  const celebrationTitle = document.getElementById('celebrationTitle');
  const celebrationDesc = document.getElementById('celebrationDesc');
  const btnNextLevel = document.getElementById('btnNextLevel');
  const btnReplayLevel = document.getElementById('btnReplayLevel');

  // Audio start on first touch/click
  const startAudioOnce = () => {
    sound.init();
    sound.startBGM();
    if (audioBtn) audioBtn.classList.add('active');
    window.removeEventListener('pointerdown', startAudioOnce);
  };
  window.addEventListener('pointerdown', startAudioOnce);

  // Audio mute toggle
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      if (isMuted) {
        audioBtn.classList.remove('active');
        audioIcon.innerHTML = `<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>`;
      } else {
        audioBtn.classList.add('active');
        audioIcon.innerHTML = `<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>`;
      }
    });
  }

  // Thai Speech Synthesis helper
  function speakThai(text) {
    if (!speechEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'th-TH';
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.log('Speech error:', e);
    }
  }

  // Confetti Animation System
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiParticles = [];
  let confettiAnimId = null;

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeConfetti);
  resizeConfetti();

  function triggerConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    resizeConfetti();
    confettiParticles = [];
    const colors = ['#38bdf8', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#facc15'];
    for (let i = 0; i < 90; i++) {
      confettiParticles.push({
        x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 200,
        y: confettiCanvas.height / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 9 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

    function updateConfetti() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let alive = false;
      confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          confettiCtx.save();
          confettiCtx.globalAlpha = Math.max(0, p.alpha);
          confettiCtx.translate(p.x, p.y);
          confettiCtx.rotate((p.rotation * Math.PI) / 180);
          confettiCtx.fillStyle = p.color;
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.75);
          confettiCtx.restore();
        }
      });

      if (alive) {
        confettiAnimId = requestAnimationFrame(updateConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    updateConfetti();
  }

  // ==========================================================================
  // Render Navigation Bar (10 Levels / Pages)
  // ==========================================================================
  function renderLevelsBar() {
    levelsBar.innerHTML = '';
    OCCUPATION_LEVELS.forEach((lvl, idx) => {
      const btn = document.createElement('button');
      btn.className = `level-nav-pill ${idx === currentLevelIdx ? 'active' : ''} ${completedLevels.has(idx) ? 'completed' : ''}`;
      btn.textContent = `หน้า ${lvl.level}`;
      btn.title = lvl.title;
      btn.addEventListener('click', () => {
        sound.playPop();
        loadLevel(idx);
      });
      levelsBar.appendChild(btn);
    });

    // Auto scroll active pill into view
    const activePill = levelsBar.querySelector('.level-nav-pill.active');
    if (activePill) {
      activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  // ==========================================================================
  // Load & Render Selected Level
  // ==========================================================================
  function loadLevel(idx) {
    currentLevelIdx = idx;
    matchedInRound.clear();
    const lvl = OCCUPATION_LEVELS[idx];

    // Update Header & Navigation
    levelBadge.textContent = `หน้า ${lvl.level} / ${OCCUPATION_LEVELS.length}`;
    levelHeroText.textContent = `✨ ${lvl.subTitle} ✨`;
    renderLevelsBar();

    // Close any celebration overlay
    celebrationOverlay.classList.remove('active');

    // Clear Stage & Dock
    stageArea.innerHTML = '';
    dockTray.innerHTML = '';

    // Render Stage (4 Workstation Cards per Page)
    renderCardsArena(lvl);

    // Render Dock Tray (Shuffled Draggable Characters)
    renderDockTray(lvl);
  }

  // ==========================================================================
  // Active Drag & Selection State (Directly modeled on ASEAN games architecture)
  // ==========================================================================
  let activeDrag = null;
  let selectedPaletteCard = null;

  // Global Pointer Event Listeners (Registered ONCE!)
  window.addEventListener('pointermove', onGlobalPointerMove, { passive: false });
  window.addEventListener('pointerup', onGlobalPointerUp);
  window.addEventListener('pointercancel', onGlobalPointerUp);

  function onGlobalPointerMove(e) {
    if (!activeDrag) return;
    if (e.cancelable) e.preventDefault();

    const dist = Math.hypot(e.clientX - activeDrag.startX, e.clientY - activeDrag.startY);
    if (dist > 5) {
      activeDrag.hasMoved = true;
    }

    if (activeDrag.ghost) {
      activeDrag.ghost.style.left = `${e.clientX}px`;
      activeDrag.ghost.style.top = `${e.clientY}px`;
    }

    // Find workstation card under pointer using elementsFromPoint
    let hoverCard = null;
    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    for (const el of elements) {
      const wCard = el.closest('.workstation-card:not(.matched)');
      if (wCard) {
        hoverCard = wCard;
        break;
      }
    }

    document.querySelectorAll('.workstation-card:not(.matched)').forEach(wCard => {
      if (wCard === hoverCard) {
        wCard.classList.add('drag-over');
        const slot = wCard.querySelector('.drop-slot');
        if (slot) slot.classList.add('drag-over');
      } else {
        wCard.classList.remove('drag-over');
        const slot = wCard.querySelector('.drop-slot');
        if (slot) slot.classList.remove('drag-over');
      }
    });

    activeDrag.hoverCard = hoverCard;
  }

  function onGlobalPointerUp(e) {
    if (!activeDrag) return;

    const { card, occ, ghost, hoverCard, hasMoved } = activeDrag;

    // 1. ALWAYS REMOVE GHOST IMMEDIATELY AND SYNCHRONOUSLY!
    if (ghost && ghost.parentNode) {
      ghost.parentNode.removeChild(ghost);
    }
    document.querySelectorAll('.drag-ghost-element, .floating-drag-clone').forEach(el => el.remove());

    // 2. Clean up drag styles
    card.classList.remove('is-dragging', 'dragging');
    document.querySelectorAll('.workstation-card').forEach(wCard => {
      wCard.classList.remove('drag-over');
      const slot = wCard.querySelector('.drop-slot');
      if (slot) slot.classList.remove('drag-over');
    });

    // 3. Drop handling
    if (hasMoved) {
      if (hoverCard) {
        const targetOccId = hoverCard.getAttribute('data-occ-id');
        if (targetOccId === occ.id) {
          // MATCH! Correct workstation
          handleSuccessMatch(card, hoverCard, occ);
        } else {
          // WRONG: Like ASEAN game! Ghost is ALREADY gone! Card stays in palette!
          sound.playError();
          hoverCard.classList.add('wrong-drop');
          setTimeout(() => hoverCard.classList.remove('wrong-drop'), 400);
        }
      } else {
        // Dropped outside: Ghost is already gone! Card stays in palette!
        sound.playError();
      }
      if (selectedPaletteCard) {
        selectedPaletteCard.classList.remove('is-selected');
        selectedPaletteCard = null;
      }
    } else {
      // Simple click/tap: Tap-to-Match handling
      handlePaletteCardTap(card, occ);
    }

    activeDrag = null;
  }

  function handlePaletteCardTap(card, occ) {
    sound.playPop();
    if (selectedPaletteCard === card) {
      card.classList.remove('is-selected');
      selectedPaletteCard = null;
    } else {
      if (selectedPaletteCard) {
        selectedPaletteCard.classList.remove('is-selected');
      }
      card.classList.add('is-selected');
      selectedPaletteCard = card;
    }
  }

  function handleWorkstationClick(wCard) {
    if (wCard.classList.contains('matched') || !selectedPaletteCard) return;

    const selectedOccId = selectedPaletteCard.getAttribute('data-occ-id');
    const targetOccId = wCard.getAttribute('data-occ-id');
    const occ = OCCUPATIONS_MASTER[selectedOccId];

    if (selectedOccId === targetOccId) {
      // MATCH!
      handleSuccessMatch(selectedPaletteCard, wCard, occ);
      selectedPaletteCard.classList.remove('is-selected');
      selectedPaletteCard = null;
    } else {
      // WRONG
      sound.playError();
      wCard.classList.add('wrong-drop');
      setTimeout(() => wCard.classList.remove('wrong-drop'), 400);
    }
  }

  // --------------------------------------------------------------------------
  // Render Mode 1: Cards Arena Grid
  // --------------------------------------------------------------------------
  function renderCardsArena(lvl) {
    const grid = document.createElement('div');
    grid.className = `occ-cards-grid count-${lvl.occupations.length}`;

    lvl.occupations.forEach(occId => {
      const occ = OCCUPATIONS_MASTER[occId];
      const card = document.createElement('div');
      card.className = 'workstation-card';
      card.id = `workstation-${occ.id}`;
      card.setAttribute('data-occ-id', occ.id);

      card.innerHTML = `
        <div class="building-wrap">
          <img src="${occ.placeImg}" alt="${occ.workplaceTh}" class="building-img" draggable="false">
        </div>
        <div class="drop-slot" data-occ-id="${occ.id}">
          <img src="${occ.shadowImg}" alt="เงา${occ.nameTh}" class="drop-slot-shadow" draggable="false">
        </div>
        <div class="workplace-label-pill">
          <span class="title-th">${occ.emoji} ${occ.workplaceTh}</span>
          <span class="title-en">${occ.workplaceEn}</span>
        </div>
      `;

      card.addEventListener('click', () => handleWorkstationClick(card));
      grid.appendChild(card);
    });

    stageArea.appendChild(grid);
  }

  // --------------------------------------------------------------------------
  // Render Right Palette Sidebar (Draggable Characters)
  // --------------------------------------------------------------------------
  function renderDockTray(lvl) {
    dockTray.innerHTML = '';
    selectedPaletteCard = null;
    activeDrag = null;
    document.querySelectorAll('.drag-ghost-element, .floating-drag-clone').forEach(el => el.remove());

    // Shuffle characters in dock for fun engagement
    const shuffledIds = [...lvl.occupations].sort(() => Math.random() - 0.5);

    shuffledIds.forEach(occId => {
      const occ = OCCUPATIONS_MASTER[occId];
      const card = document.createElement('div');
      card.className = 'drag-char-card';
      card.id = `dock-char-${occ.id}`;
      card.setAttribute('data-occ-id', occ.id);

      card.innerHTML = `
        <img src="${occ.charImg}" alt="${occ.nameTh}" class="drag-char-img" draggable="false">
        <span class="drag-char-name">${occ.nameTh}</span>
      `;

      // Pointer Down Starts Drag
      card.addEventListener('pointerdown', (e) => {
        if (card.classList.contains('matched')) return;
        e.preventDefault();

        // Clean up prior ghosts
        document.querySelectorAll('.drag-ghost-element, .floating-drag-clone').forEach(el => el.remove());

        const ghost = document.createElement('div');
        ghost.className = 'drag-ghost-element';
        ghost.innerHTML = `<img src="${occ.charImg}" alt="${occ.nameTh}" draggable="false">`;
        document.body.appendChild(ghost);

        ghost.style.left = `${e.clientX}px`;
        ghost.style.top = `${e.clientY}px`;

        card.classList.add('is-dragging');

        activeDrag = {
          card,
          occ,
          ghost,
          startX: e.clientX,
          startY: e.clientY,
          hasMoved: false,
          hoverCard: null
        };
      });

      dockTray.appendChild(card);
    });
  }

  // --------------------------------------------------------------------------
  // Handle Successful Match
  // --------------------------------------------------------------------------
  function handleSuccessMatch(dockCard, targetCard, occ) {
    // 1. Mark dock card in right palette as matched
    dockCard.classList.add('matched');
    dockCard.classList.remove('is-selected', 'is-dragging', 'dragging');

    // 2. Mark workstation card and drop slot as matched
    targetCard.classList.add('matched');
    const slot = targetCard.querySelector('.drop-slot');
    if (slot) {
      slot.classList.add('matched');
      const placedImg = document.createElement('img');
      placedImg.src = occ.charImg;
      placedImg.alt = occ.nameTh;
      placedImg.className = 'drop-slot-placed-char';
      slot.appendChild(placedImg);
    }

    // 3. Audio & Speech
    sound.playMatchSuccess();
    speakThai(`${occ.nameTh} ทำงานที่ ${occ.workplaceTh}`);

    // 4. Update matched count
    matchedInRound.add(occ.id);

    // 5. Check if level is complete (all 4 matched)
    const currentLevel = OCCUPATION_LEVELS[currentLevelIdx];
    if (matchedInRound.size === currentLevel.occupations.length) {
      setTimeout(() => {
        handleLevelComplete();
      }, 550);
    }
  }

  // ==========================================================================
  // Level Complete Celebration
  // ==========================================================================
  function handleLevelComplete() {
    completedLevels.add(currentLevelIdx);
    localStorage.setItem('occ_completed_levels', JSON.stringify([...completedLevels]));
    renderLevelsBar();

    sound.playCelebration();
    triggerConfetti();

    const currentLvl = OCCUPATION_LEVELS[currentLevelIdx];
    const isLastLevel = currentLevelIdx === OCCUPATION_LEVELS.length - 1;

    if (isLastLevel) {
      celebrationTitle.textContent = '🏆 ยินดีด้วยครับ/ค่ะ! ผ่านครบ 10 หน้าแล้ว! 🌟';
      celebrationDesc.textContent = 'เก่งมากๆ เลยครับ! หนูๆ รู้จักอาชีพและสถานที่ทำงานครบทั้ง 10 หน้าแล้ว';
      btnNextLevel.innerHTML = '<span>เล่นใหม่อีกครั้ง</span> <span>🔄</span>';
    } else {
      celebrationTitle.textContent = '🌟 เก่งมากครับ/ค่ะ! 🎈';
      celebrationDesc.textContent = `ผ่านหน้า ${currentLvl.level}: ${currentLvl.title} เรียบร้อยแล้ว`;
      btnNextLevel.innerHTML = '<span>หน้าถัดไป</span> <span>➔</span>';
    }

    celebrationOverlay.classList.add('active');
  }

  // Next level button
  btnNextLevel.addEventListener('click', () => {
    sound.playPop();
    const nextIdx = (currentLevelIdx + 1) % OCCUPATION_LEVELS.length;
    loadLevel(nextIdx);
  });

  // Replay level button
  btnReplayLevel.addEventListener('click', () => {
    sound.playPop();
    loadLevel(currentLevelIdx);
  });

  // Reset current board button in header
  if (btnResetBoard) {
    btnResetBoard.addEventListener('click', () => {
      sound.playPop();
      loadLevel(currentLevelIdx);
    });
  }

  // Load Initial Level (Level 1)
  loadLevel(0);
});
