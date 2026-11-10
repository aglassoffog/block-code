document.addEventListener("keydown", (event) => {
    event.preventDefault();
    switch (event.key) {

        case " ":
            playNow();
            break;

        case "3":
            initBlockUI(3);
            break;

        case "4":
            initBlockUI(4);
            break;

        case "5":
            initBlockUI(5);
            break;

        case "a":
            secondNoteUp();
            break;

        case "b":
            secondNoteDown();
            break;

        case "c":
            secondNoteCircle();
            break;

        case "I":
            pushCode();
            break;

        case "D":
            deleteCode();
            break;

        case "i":
            pushIndex++;
            if (pushIndex > 15) {
                pushIndex = 0;
            }
            updateUI();            
            break;

        case "d":
            deleteIndex++;
            if (deleteIndex > 15) {
                deleteIndex = 0;
            }
            updateUI();
            break;

        case "l":
            steps++;
            if (steps > 16) {
                steps = 1;
            }
            updateUI();
            break;

        case "ArrowLeft":
            xs[0]--;
            break;

        case "ArrowRight":
            xs[0]++;
            break;

        case "ArrowUp":
            ys[0]--;
            break;

        case "ArrowDown":
            ys[0]++;
            break;        
    }

    updateSelection();
});

function secondNoteUp() {
    noteOffsets[0]++;
    if (noteOffsets[0] > 12) {
        noteOffsets[0] = -12;
    }
}

function secondNoteDown() {
    noteOffsets[0]--;
    if (noteOffsets[0] < -12) {
        noteOffsets[0] = 12;
    }
}

function thirdNoteUp() {
    noteOffsets[1]++;
    if (noteOffsets[1] > 12) {
        noteOffsets[1] = -12;
    }
}

function thirdNoteDown() {
    noteOffsets[1]--;
    if (noteOffsets[1] < -12) {
        noteOffsets[1] = 12;
    }
}

function secondNoteCircle() {
    if (COLS == 3) {

    } else if (COLS == 4) {
        if (osc2NoteOffset === 5) {
            osc2NoteOffset = -3;
        } else if (osc2NoteOffset === -3) {
            osc2NoteOffset = -5;
        } else if (osc2NoteOffset === -5) {
            osc2NoteOffset = 3;
        } else if (osc2NoteOffset === 3) {
            osc2NoteOffset = 5;

        } else if (osc2NoteOffset === 7) {
            osc2NoteOffset = -7;
        } else if (osc2NoteOffset === -7) {
            osc2NoteOffset = 7;

        } else if (osc2NoteOffset === 4) {
            osc2NoteOffset = -4;
        } else if (osc2NoteOffset === -4) {
            osc2NoteOffset = 4;
        } else if (osc2NoteOffset === 1) {
            osc2NoteOffset = -1;
        } else if (osc2NoteOffset === -1) {
            osc2NoteOffset = 1;

        } else if (osc2NoteOffset === 6) {
            osc2NoteOffset = 2;
        } else if (osc2NoteOffset === 2) {
            osc2NoteOffset = -2;
        } else if (osc2NoteOffset === -2) {
            osc2NoteOffset = -6;
        } else if (osc2NoteOffset === -6) {
            osc2NoteOffset = 6;
        }
    } else if (COLS == 5) {

    }
}


btnA.addEventListener("click", () => {
    secondNoteUp();
    updateSelection();
});

btnB.addEventListener("click", () => {
    secondNoteDown();
    updateSelection();
});

btnC.addEventListener("click", () => {
    secondNoteCircle();
    updateSelection();
});

btn3.addEventListener("click", () => {
    initBlockUI(3);
    updateSelection();
});

btn4.addEventListener("click", () => {
    initBlockUI(4);
    updateSelection();
});

btn5.addEventListener("click", () => {
    initBlockUI(5);
    updateSelection();
});

btnI.addEventListener("click", () => {
    pushCode();
});

btnD.addEventListener("click", () => {
    deleteCode();
});
