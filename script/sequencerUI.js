const rows3 = document.querySelectorAll(".row3");
let pushIndex = 0;
let deleteIndex = 0;

function initSequencerUI() {
  for(let i=0;i<16;i++){
    const lenBtn = document.createElement("button");
    lenBtn.classList.add("button", "step-btn");
    if ((i + 1) % 4 === 0) {
      lenBtn.classList.add("group-end");
    }
    lenBtn.addEventListener("click", () => {
      steps = i+1;
      updateUI();
    });
    row1.appendChild(lenBtn);

    const insertBtn = document.createElement("button");
    insertBtn.classList.add("button", "step-btn");
    if ((i + 1) % 4 === 0) {
      insertBtn.classList.add("group-end");
    }
    insertBtn.addEventListener("click", () => {
      pushIndex = i;
      updateUI();
    });
    row2.appendChild(insertBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("button", "step-btn");
    if ((i + 1) % 4 === 0) {
      deleteBtn.classList.add("group-end");
    }
    deleteBtn.addEventListener("click", () => {
      deleteIndex = i;
      deleteCode();
    });
    row4.appendChild(deleteBtn);
  }

  patternFreaqs.forEach((track, trackIndex) => {
    const row = rows3[trackIndex];

    track.forEach((_, stepIndex) => {
      const div = document.createElement("div");
      div.className = "step";

      if ((stepIndex + 1) % 4 === 0) {
        div.classList.add("group-end");
      }

      row.appendChild(div);
    });
  })

  updateUI();
}

function highlightStep(step, note1, note2, note3) {
  for(let i=0;i<2;i++){
    rows3.forEach((row, trackIndex) => {
      row.querySelectorAll(":scope > .step").forEach((cell, s) => {
        cell.classList.toggle("playing", s === step);
      });
    });
  }
  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      cells[i*COLS+k].classList.toggle("playing", names[i*COLS+k] === note1);
      cells[i*COLS+k].classList.toggle("playing2", names[i*COLS+k] === note2);
      cells[i*COLS+k].classList.toggle("playing3", names[i*COLS+k] === note3);
    }
  }
}

function updateUI() {
  row1.querySelectorAll(":scope > .button").forEach((btn, stepIndex) => {
    if (stepIndex == steps - 1) {
      btn.classList.toggle("active", true);
    } else {
      btn.classList.toggle("active", false);
    }
  });
  row2.querySelectorAll(":scope > .button").forEach((btn, stepIndex) => {
    if (stepIndex == pushIndex) {
      btn.classList.toggle("active", true);
    } else {
      btn.classList.toggle("active", false);
    }
  });
  rows3.forEach((row, trackIndex) => {
    row.querySelectorAll(":scope > .step").forEach((cell, stepIndex) => {
      if (stepIndex >= steps) {
        cell.style.opacity = 0.5;
      } else {
        cell.style.opacity = 1;
      }
      cell.textContent = patternNames[trackIndex][stepIndex];
    });
  });
  row4.querySelectorAll(":scope > .button").forEach((btn, stepIndex) => {
    if (stepIndex == deleteIndex) {
      btn.classList.toggle("active", true);
    } else {
      btn.classList.toggle("active", false);
    }
  });
}

function pushCode() {
  patternFreaqs[2][pushIndex] = freaqs[ys[0] * COLS + xs[0]];
  patternFreaqs[1][pushIndex] = freaqs[ys[1] * COLS + xs[1]];
  patternFreaqs[0][pushIndex] = freaqs[ys[2] * COLS + xs[2]];
  patternNames[2][pushIndex] = names[ys[0] * COLS + xs[0]];
  patternNames[1][pushIndex] = names[ys[1] * COLS + xs[1]];
  patternNames[0][pushIndex] = names[ys[2] * COLS + xs[2]];
  pushIndex++;
  if (pushIndex >= 15) {
    pushIndex = 15;
  }
  updateUI();
}

function deleteCode() {
  patternFreaqs[2][deleteIndex] = -1;
  patternFreaqs[1][deleteIndex] = -1;
  patternFreaqs[0][deleteIndex] = -1;
  patternNames[2][deleteIndex] = "";
  patternNames[1][deleteIndex] = "";
  patternNames[0][deleteIndex] = "";
  updateUI();
}
