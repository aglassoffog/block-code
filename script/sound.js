async function playNow() {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }

  const freq = freaqs[ys[0] * COLS + xs[0]];
  const freq2 = freaqs[ys[1] * COLS + xs[1]];
  const freq3 = freaqs[ys[2] * COLS + xs[2]];
  const now = audioCtx.currentTime;

  playSound(freq, freq2, freq3, now);
}

function playSound(freq, freq2, freq3, time) {
  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const osc3 = audioCtx.createOscillator();
  //osc.type = "triangle";
  //osc2.type = "triangle";
  // console.log(freq, freq2, freq3);

  osc.frequency.setValueAtTime(freq, time);
  osc.connect(gain1);
  if (freq2) {
    osc2.frequency.setValueAtTime(freq2, time);
    osc2.connect(gain2);
    osc2.start(time);
    osc2.stop(time + 1);
  }
  if (freq3) {
    osc3.frequency.setValueAtTime(freq3, time);
    osc3.connect(gain3);
    osc3.start(time);
    osc3.stop(time + 1);
  }
  osc.start(time);
  osc.stop(time + 1);
}
