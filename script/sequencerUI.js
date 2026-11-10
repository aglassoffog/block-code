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
      updateUI();
    });
    row4.appendChild(deleteBtn);
  }

  pattern.forEach((track, trackIndex) => {
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

function highlightStep(step, note1, note2) {
  for(let i=0;i<2;i++){
    rows3.forEach((row, trackIndex) => {
      row.querySelectorAll(":scope > .step").forEach((cell, s) => {
        cell.classList.toggle("playing", s === step);
      });
    });
  }
  for (let i = 0; i < ROWS; i++) {
    for (let k = 0; k < COLS; k++) {
      cells[i*COLS+k].classList.toggle("playing", i*COLS+k === note1);
      cells[i*COLS+k].classList.toggle("playing2", i*COLS+k === note2);
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
      if (pattern[trackIndex][stepIndex] >= 0) {
        cell.textContent = names[pattern[trackIndex][stepIndex]];
      } else {
        cell.textContent = "";
      }
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
  pattern[2][pushIndex] = y * COLS + x;
  pattern[1][pushIndex] = y2 * COLS + x2;
  pushIndex++;
  if (pushIndex >= 15) {
    pushIndex = 15;
  }
  updateUI();
}

function deleteCode() {
  pattern[2][deleteIndex] = -1;
  pattern[1][deleteIndex] = -1;
  updateUI();
}
