let isPlaying = false;
const scheduleAheadTime = 0.1;
const lookahead = 25;
let tempo = 60;
let steps = 16;
let patternFreaqs = [
  Array(16).fill(-1),
  Array(16).fill(-1),
  Array(16).fill(-1)
];
let patternNames = [
  Array(16).fill(""),
  Array(16).fill(""),
  Array(16).fill("")
]

let currentStep;
let nextNoteTime = 0;
let timerID;

function scheduleStep(step, time) {
  if (patternFreaqs[2][step] >= 0) {
    playSound(patternFreaqs[2][step], patternFreaqs[1][step], patternFreaqs[0][step], time);
  }
  highlightStep(step, patternNames[2][step], patternNames[1][step], patternNames[0][step]);
}

function stepDuration() {
  return (60 / tempo);
}

function nextStep() {
  return (currentStep + 1) % steps;
}

function nextStepTime() {
  nextNoteTime += stepDuration();
  currentStep = nextStep();
}

async function scheduler() {
  while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    await scheduleStep(currentStep, nextNoteTime);
    nextStepTime();
  }
}

playBtn.addEventListener("click", async () => {
  if (!isRunning) {
    await initAudio();
    isRunning = true;
  }
  if (!isPlaying) {
    currentStep = 0;
    nextNoteTime = audioCtx.currentTime;
    timerID = setInterval(scheduler, lookahead);
  } else {
    clearInterval(timerID);
    highlightStep(-1, -1, -1);
  }
  isPlaying = !isPlaying;
  playBtn.classList.toggle("playing", isPlaying);
  playBtn.textContent = isPlaying ? "Stop" : "Start";
});
