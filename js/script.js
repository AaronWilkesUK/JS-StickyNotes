const notesContainer = document.getElementById("notes-container");
const writeNotesContainer = document.getElementById("write-note-container");
const checkCircle = document.getElementById("check-circle");
const crossCircle = document.getElementById("cross-circle");
const addButton = document.getElementById("add-button");
const newNoteText = document.getElementById("new-note-text");

const margin_values = ["-5px", "1px", "5px", "10px", "15px", "20px"];
const rotate_values = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-10deg)"];
const colour_values = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];

let colourIndex = 0;
let noteIndex = 0;

let notesArray = [];

const StickyNotes = {
    newNote() {
        this.enableDisableButton(addButton, false);
        writeNotesContainer.style.display = "block";
    },
    createNote(text = null) {
        const noteText = text ? text : newNoteText.value;
        if(!noteText) {
            return;
        }
        const note = document.createElement("div");
        const noteTextEl = document.createElement("h1");
        noteTextEl.innerHTML = noteText;
        note.appendChild(noteTextEl);
        note.classList.add("note");
        note.style.margin = this.margin();
        note.style.transform = this.rotate();
        note.style.backgroundColor = this.colour();
        notesContainer.insertAdjacentElement("beforeend", note);
        notesArray[noteIndex] = noteText;
        noteIndex++;
        note.addEventListener("mouseenter", ()=> {
            note.style.transform = "scale(1.1)";
        });
        note.addEventListener("mouseleave", ()=> {
            note.style.transform = "scale(1.0)";
        });
        note.addEventListener("dblclick", (e)=> {
            note.remove();
            notesArray.splice(notesArray.indexOf(note.innerText), 1);
            noteIndex = notesArray.length;
            this.saveNotes();
        })
        newNoteText.value = "";
        this.saveNotes();
    },
    closeNote(){
        newNoteText.value = "";
        writeNotesContainer.style.display = "none";
        this.enableDisableButton(addButton, true);
    },
    margin() {
        return margin_values[Math.floor(Math.random() * margin_values.length)];
    },
    rotate() {
        return rotate_values[Math.floor(Math.random() * rotate_values.length)];
    },
    colour() {
        if(colourIndex > colour_values.length - 1) {
            colourIndex = 0;
        }
        return colour_values[colourIndex++]
    },
    enableDisableButton(button, enable) {
        if(enable) {
            button.removeAttribute("disabled");
            button.classList.add("btn-enabled")
            button.classList.remove("btn-disabled")
        } else {
            button.setAttribute("disabled", '');
            button.classList.add("btn-disabled")
            button.classList.remove("btn-enabled")
        }
    },
    saveNotes() {
        localStorage.setItem("stickyNotes", JSON.stringify(notesArray));
    },
    loadNotes() {
        const newArray = JSON.parse(localStorage.getItem("stickyNotes"));
        this.createNotesFromArray(newArray);
    },
    createNotesFromArray(array) {
        if(array.length > 0) {
            array.map((note) => {
                this.createNote(note);
            })
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=> {
    checkCircle && checkCircle.addEventListener("click", (e) => {
        StickyNotes.createNote();
    })
    crossCircle && crossCircle.addEventListener("click", (e) => {
        StickyNotes.closeNote();
    })
    addButton && addButton.addEventListener("click", (e)=> {
        StickyNotes.newNote();
    })
    StickyNotes.loadNotes();
});