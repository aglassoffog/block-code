async function playNow() {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }

  const index1 = y * COLS + x;
  const index2 = y2 * COLS + x2;
  const now = audioCtx.currentTime;

  playSound(index1, index2, now);
}

function playSound(index1, index2, time) {
  const freq = freaqs[index1];
  const freq2 = freaqs[index2];
  // console.log(freq, freq2);
  const osc = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  //osc.type = "triangle";
  //osc2.type = "triangle";

  osc.frequency.setValueAtTime(freq, time);
  osc.connect(gain1);
  if (freq2) {
    osc2.frequency.setValueAtTime(freq2, time);
    osc2.connect(gain2);
    osc2.start(time);
    osc2.stop(time + 1);
  }
  osc.start(time);
  osc.stop(time + 1);
}
