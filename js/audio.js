// Sound System using Web Audio API for 100% offline, zero-latency, high quality audio

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.bgmNotes = [
      261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25, // C4 to C5
      392.00, 329.63, 349.23, 392.00, 523.25, 440.00, 392.00
    ];
    this.bgmIndex = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play soft cute pop when picking up a card
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Play happy chime arpeggio when matching correctly
  playMatchSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Notes: C5, E5, G5, C6 (Major arpeggio with shimmer)
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm chime harmonic
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.22, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.45);

        // Add bright sparkle overtone
        const sparkle = this.ctx.createOscillator();
        const sGain = this.ctx.createGain();
        sparkle.type = 'sine';
        sparkle.frequency.setValueAtTime(freq * 2, now + idx * 0.07);
        sGain.gain.setValueAtTime(0.06, now + idx * 0.07);
        sGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
        sparkle.connect(sGain);
        sGain.connect(this.ctx.destination);
        sparkle.start(now + idx * 0.07);
        sparkle.stop(now + idx * 0.07 + 0.25);
      });
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Alias for playMatchSuccess
  playMatch() {
    this.playMatchSuccess();
  }

  // Play celebration fanfare when round completes
  playLevelComplete() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Joyous victory fanfare: G4, C5, E5, G5, E5, G5 (extended)
      const notes = [
        { f: 392.00, d: 0.12, t: 0.0 },
        { f: 523.25, d: 0.12, t: 0.12 },
        { f: 659.25, d: 0.12, t: 0.24 },
        { f: 783.99, d: 0.25, t: 0.36 },
        { f: 659.25, d: 0.12, t: 0.62 },
        { f: 1046.50, d: 0.6, t: 0.74 }
      ];

      const now = this.ctx.currentTime;
      notes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.linearRampToValueAtTime(0.25, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + n.d + 0.05);
      });
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Alias for playLevelComplete
  playCelebration() {
    this.playLevelComplete();
  }

  // Play gentle boing when misplaced
  playMismatch() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.14);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }

  // Toggle background gentle music box
  toggleBgm() {
    this.init();
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  startBgm() {
    if (!this.ctx) return;
    this.bgmPlaying = true;
    if (this.bgmInterval) clearInterval(this.bgmInterval);

    // Simple sweet lullaby melody for toddlers
    const melody = [
      { note: 261.63, dur: 0.3 }, // C4
      { note: 261.63, dur: 0.3 }, // C4
      { note: 392.00, dur: 0.3 }, // G4
      { note: 392.00, dur: 0.3 }, // G4
      { note: 440.00, dur: 0.3 }, // A4
      { note: 440.00, dur: 0.3 }, // A4
      { note: 392.00, dur: 0.6 }, // G4
      { note: 349.23, dur: 0.3 }, // F4
      { note: 349.23, dur: 0.3 }, // F4
      { note: 329.63, dur: 0.3 }, // E4
      { note: 329.63, dur: 0.3 }, // E4
      { note: 293.66, dur: 0.3 }, // D4
      { note: 293.66, dur: 0.3 }, // D4
      { note: 261.63, dur: 0.6 }, // C4
    ];
    let step = 0;

    const playNote = () => {
      if (!this.bgmPlaying || this.isMuted || !this.ctx) return;
      const m = melody[step % melody.length];
      step++;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(m.note, this.ctx.currentTime);

        // Very soft music box volume
        gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + m.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + m.dur);
      } catch (e) {
        // ignore
      }
    };

    playNote();
    this.bgmInterval = setInterval(playNote, 520);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBgm();
    }
    return !this.isMuted;
  }
}

window.soundManager = new SoundManager();
