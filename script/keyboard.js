document.addEventListener("keydown", (event) => {
    event.preventDefault();
    switch (event.key) {

        case " ":
            playNow();
            break;

        case "a":
            osc2NoteOffset++;
            if (osc2NoteOffset > 7) {
                osc2NoteOffset = -7;
            }
            break;

        case "b":
            osc2NoteOffset--;
            if (osc2NoteOffset < -7) {
                osc2NoteOffset = 7;
            }
            break;

        case "c":
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
            break;

        case "I":
            const index1 = y * COLS + x;
            const index2 = y2 * COLS + x2;
            pushCode(index1, index2);
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

        case "D":
            deleteCode();
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
            x--;
            if (x < 0) {
                x = COLS -1;
                y++;
            }
            break;

        case "ArrowRight":
            x++;
            if (x >= COLS) {
                x = 0;
                y--;
            }
            break;

        case "ArrowUp":
            y--;
            break;

        case "ArrowDown":
            y++;
            break;        
    }
    if (y < 0) {
        y = ROWS -1;
    }
    if (y >= ROWS) {
        y = 0;
    }

    updateSelection();
});
