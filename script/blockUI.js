let osc2NoteOffset = 5; // 4度
let pressTimer = null;
const LONG_PRESS_DURATION = 800;

const noteNames = [
  "C2", "C2#", "D2", "D2#", "E2", "F2", "F2#", "G2", "G2#", "A2", "A2#", "B2",
  "C3", "C3#", "D3", "D3#", "E3", "F3", "F3#", "G3", "G3#", "A3", "A3#", "B3",
  "C4", "C4#", "D4", "D4#", "E4", "F4", "F4#", "G4", "G4#", "A4", "A4#", "B4"
]

const freaqNumbers = [
    65.4064, 69.2957, 73.4162, 77.7817, 82.4069, 87.3071, 92.4986, 97.9989, 103.8262, 110.0000, 116.5409, 123.4708,
    130.8128, 138.5913, 146.8324, 155.5635, 164.8138, 174.6141, 184.9972 , 195.9977, 207.6523, 220.0000, 233.0819, 246.9417,
    261.6256, 277.1826, 293.6648, 311.1270, 329.6276, 349.2282, 369.9944, 391.9954, 415.3047, 440.0000, 466.1638, 493.8833
]

const reverseNames = noteNames.toReversed();
const reversFreqs = freaqNumbers.toReversed();
const COLS = 4;
const ROWS = 9;

let x = 0;
let y = 8;
let x2 = 0;
let y2 = 0;
const cells  = [];
const freaqs = [];
const names  = [];

const cancelPress = () => {
  if (pressTimer) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
};

function initBlockUI() {
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
    });

    const index = y * COLS + x;
    cells[index].classList.add("selected");
    y2 = y;
    x2 = x + osc2NoteOffset;

    if (x2 < 0) {
        if (x2 < -COLS) {
            y2 = y + 2;
            x2 = COLS * 2 + x2;
        } else {
            y2 = y + 1;
            x2 = COLS + x2;
        }
        if (y2 >= ROWS) {
            x2 = 0;
            y2 = ROWS - 1;
        }
    } else if (x2 >= COLS) {
        if (x2 >= COLS * 2) {
            y2 = y - 2;
            x2 = x2 - COLS * 2;
        } else {
            y2 = y - 1;
            x2 = x2 - COLS;
        }
        if (y2 < 0) {
            x2 = COLS - 1;
            y2 = 0;
        }
    }
    const index2 =  y2 * COLS + x2;
    cells[index2].classList.add("selected2");
}
