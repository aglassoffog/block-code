let masterGain;
let gain1;
let gain2;
let analyser;
let timeData = new Float32Array(2048);
const triggerLevel = 0;
const samplesToDraw = 1000;
const sctx = scope.getContext("2d");

async function initAudio() {

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.8;
  const destination = audioCtx.createMediaStreamDestination();
  audioEl.srcObject = destination.stream;
  audioEl.play();
  masterGain.connect(destination);

  gain1 = audioCtx.createGain();
  gain2 = audioCtx.createGain();
  gain1.gain.value = 0.4;
  gain2.gain.value = 0.4;
  gain1.connect(masterGain);
  gain2.connect(masterGain);

  await audioCtx.resume();

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  masterGain.connect(analyser);

  drawLoop();
}

function drawLoop() {
  requestAnimationFrame(drawLoop);
  if(!audioCtx) return;
  analyser.getFloatTimeDomainData(timeData);

  const start = findTriggerIndex(timeData);
  sctx.clearRect(0,0,scope.width,scope.height);
  sctx.strokeStyle="gray";
  sctx.lineWidth=2;
  sctx.beginPath();
  if(start !== 0) {
    for(let i=0;i<samplesToDraw;i++){
      const idx=(start+i)%timeData.length;
      const v=timeData[idx];
      const x=(i/samplesToDraw)*scope.width;
      const y=scope.height/2 - v*scope.height/2;
      i===0 ? sctx.moveTo(x,y) : sctx.lineTo(x,y);
    }
    sctx.stroke();
  }
}

function findTriggerIndex(data){
  let over = false;
  for(let i=1;i<data.length;i++){
    if(data[i-1] < -0.01){
      over = true;
    }
    if(data[i-1]<triggerLevel && data[i]>triggerLevel){
      if (over) {
        return i;
      }
    }
  }
  return 0;
}
