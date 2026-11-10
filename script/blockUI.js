const offsets = document.querySelectorAll(".offset");
let pressTimer = null;
const LONG_PRESS_DURATION = 800;

const selection = ["selected2", "selected3"];
const noteNames = [
  "C2", "C2#", "D2", "D2#", "E2", "F2", "F2#", "G2", "G2#", "A2", "A2#", "B2",
  "C3", "C3#", "D3", "D3#", "E3", "F3", "F3#", "G3", "G3#", "A3", "A3#", "B3",
  "C4", "C4#", "D4", "D4#", "E4", "F4", "F4#", "G4", "G4#", "A4", "A4#", "B4"
]

const freaqNumbers = [
    65.4064, 69.2957, 73.4162, 77.7817, 82.4069, 87.3071, 92.4986, 97.9989, 103.8262, 110.0000, 116.5409, 123.4708,
    130.8128, 138.5913, 146.8324, 155.5635, 164.8138, 174.6141, 184.9972, 195.9977, 207.6523, 220.0000, 233.0819, 246.9417,
    261.6256, 277.1826, 293.6648, 311.1270, 329.6276, 349.2282, 369.9944, 391.9954, 415.3047, 440.0000, 466.1638, 493.8833
]

const reverseNames = noteNames.toReversed();
const reversFreqs = freaqNumbers.toReversed();
let COLS = 4;
let ROWS = 9;
const noteOffsets = [4,3]; // 3度,5度
const xs = [0,0,0];
const ys = [1,0,0];
let cells  = [];
let freaqs = [];
let names  = [];

const cancelPress = () => {
  if (pressTimer) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
};

function initBlockUI(c=4) {
  COLS = c;
  if (COLS == 3) {
    ROWS = 12;
    grid.style.setProperty('--column-count', 3);
    grid.style.setProperty('--row-count', 12);
  } else if (COLS == 4) {
    ROWS = 9;
    grid.style.setProperty('--column-count', 4);
    grid.style.setProperty('--row-count', 9);
  } else if (COLS == 5) {
    ROWS = 7;
    grid.style.setProperty('--column-count', 5);
    grid.style.setProperty('--row-count', 7);
  }
  cells  = [];
  freaqs = [];
  names  = [];
  grid.replaceChildren();
  for (let i = 0; i < ROWS; i++) {
    let lastIndex;
    for (let k = 0; k < COLS; k++) {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.addEventListener("dblclick", () => {
        playNow();
      });
      cell.addEventListener('pointerdown', () => {
        x = COLS - k - 1;
        y = i;
        updateSelection();
        if (pressTimer) clearTimeout(pressTimer);
        pressTimer = setTimeout(() => {
          const index1 = y * COLS + x;
          const index2 = y2 * COLS + x2;
          pushCode(index1, index2);
        }, LONG_PRESS_DURATION);
      });
      cell.addEventListener('pointerup', cancelPress);
      cell.addEventListener('pointerleave', cancelPress);
      cell.addEventListener('pointercancel', cancelPress);
      const nameSpan = document.createElement("span");
      nameSpan.textContent = reverseNames[i*COLS+k];
      nameSpan.className = "note";
      const freq = reversFreqs[i*COLS+k];
      cell.appendChild(nameSpan);
      if(lastIndex == null) {
          grid.appendChild(cell);
          cells.push(cell);
          freaqs.push(freq);
          names.push(nameSpan.textContent);
          lastIndex = i*COLS+k;
      } else {
          grid.insertBefore(cell, grid.children[lastIndex]);
          cells.splice(lastIndex, 0, cell);
          freaqs.splice(lastIndex, 0, freq);
          names.splice(lastIndex, 0, nameSpan.textContent);
      }
    }
  }
}

function updateSelection() {
    cells.forEach(cell => {
        cell.classList.remove("selected");
        cell.classList.remove("selected2");
        cell.classList.remove("selected3");
    });

    if (xs[0] < 0) {
        ys[0] += 1;
        xs[0] += COLS;
    } else if (xs[0] >= COLS) {
        ys[0] -= 1;
        xs[0] -= COLS;
    }
    if (ys[0] < 0) {
        ys[0] = ROWS -1;
    } else if (ys[0] >= ROWS) {
        ys[0] = 0;
    }
    const index = ys[0] * COLS + xs[0];
    cells[index].classList.add("selected");

    for (let i = 0; i < 2; i++) {
        ys[i+1] = ys[i] - Math.trunc(noteOffsets[i] / COLS);
        xs[i+1] = xs[i] + noteOffsets[i] % COLS;

        if (xs[i+1] < 0) {
          ys[i+1] += 1;
          xs[i+1] += COLS;
        } else if (xs[i+1] >= COLS) {
          ys[i+1] -= 1;
          xs[i+1] -= COLS;
        }
        if (ys[i+1] < 0) {
            xs[i+1] = COLS - 1;
            ys[i+1] = 0;
        } else if (ys[i+1] >= ROWS) {
            xs[i+1] = 0;
            ys[i+1] = ROWS - 1;
        }

        const idx =  ys[i+1] * COLS + xs[i+1];
        cells[idx].classList.add(selection[i]);
    }

    offsets[0].textContent = noteOffsets[0];
    offsets[1].textContent = noteOffsets[0] + noteOffsets[1];
}
