const MONTH = localStorage.getItem('month'),
      DAY = localStorage.getItem('day'),
      WEEKDAY = localStorage.getItem('weekday'),
      YEAR = localStorage.getItem('year');

let activeNote = null;

// -- FUNCTIONS --
function setDateHeading() {
    const today = new Date(),
          headingLinks = Array.from(document.querySelectorAll('.link'));

    document.title = `Calendar Notes - ${MONTH} ${DAY}`;
    headingLinks[0].textContent = YEAR;
    headingLinks[1].textContent = WEEKDAY;
    document.querySelector('.date-heading').textContent = `${MONTH} ${DAY}`;
}

function loadNotes() {
    for(const key in localStorage) {
        if(key.includes(`${MONTH} ${DAY}`) && key !== `${MONTH} ${DAY} - counter`) {
            const partsOfKey = key.split(' - '),
                  noteTitle = partsOfKey[1],
                  noteID = partsOfKey[2],
                  noteText = localStorage.getItem(key);
    
            addNote(noteID, noteTitle, noteText);
        }
    }
}

function saveNote(note) {
    const noteTitle = note.children.item(0).textContent,
          noteText = note.children.item(2).textContent,
          noteID = note.dataset.ID,
          noteKey = `${MONTH} ${DAY} - ${noteTitle} - ${noteID}`;

    localStorage.setItem(noteKey, noteText);
}

function openNote(note) {
    note.classList.add('active');
    activeNote = note;

    const title = note.children.item(0),
          trashBin = note.children.item(1),
          text = note.children.item(2),
          closeBtn = document.createElement('button');

    closeBtn.textContent = 'Close';
    note.insertBefore(closeBtn, trashBin);
    title.contentEditable = text.contentEditable = true;
    closeBtn.addEventListener('click', () => closeNote(note));
}

function closeNote() {
    if(!activeNote)
        return;

    const noteTitle = activeNote.children.item(0),
          closeBtn = activeNote.children.item(1),
          noteText = activeNote.children.item(3);

    activeNote.removeChild(closeBtn);
    activeNote.classList.remove('active');
    noteTitle.contentEditable = noteText.contentEditable = false;
    activeNote = null;
}

function createNote(noteID, noteTitle, noteText) {
    const note = document.createElement('div');
    note.classList.add('note');
    const noteTitle = document.createElement('h3');
    noteTitle.textContent = noteTitle;
    const trashBin = document.createElement('img');
    trashBin.src = '../icons/trash.png';
    trashBin.alt = 'Delete note';
    const noteText = document.createElement('p');
    noteText.textContent = noteText;

    note.appendChild(noteTitle);
    note.appendChild(trashBin);
    note.appendChild(noteText);
    note.dataset.ID = noteID;

    return note;
}

function addNote(noteID, noteTitle = 'Title', noteText = 'Enter notes...') {
    const notesContainer = document.querySelector('.notes'),
          note = createNote(noteID, noteTitle, noteText);

    saveNote(note);
    notesContainer.appendChild(note);
}

function deleteNote(note) {
    if(!confirm('Are you sure you want to delete this note?'))
        return;
    if(note === activeNote)
        closeNote();

    const noteTitle = note.children.item(0).textContent,
          noteID = note.dataset.ID,
          noteKey = `${MONTH} ${DAY} - ${noteTitle} - ${noteID}`;

    localStorage.removeItem(noteKey);
    document.querySelector('.notes').removeChild(note);
}
// -- END OF FUNCTIONS --

setDateHeading();
loadNotes();

/*
    - A counter is saved in localStorage to give a unique ID to each note on the page
    - This allows for accurate saving/loading mechanisms
    - localStorage contains the specific ID value for each note
    - Each note element has a data-attribute with the same ID
        - This allows for local storage entries to correspond with HTML elements when loading

    Example:  localStorage('July 18 - Title - 4') = 'Enter notes...'
              corresponds with:
                   <div class="note" data-ID="4">
                      <h3>Title</h3>
                      <img src="../icons/trash.png" alt="Delete note">
                      <p>Enter notes...</p>
                   </div>
*/
const counterKey = `${MONTH} ${DAY} - counter`;

if(!localStorage.getItem(counterKey))
    localStorage.setItem(counterKey, 1);

document.querySelector('.addNote')
        .addEventListener('click', () => {
            const counterVal = parseInt(localStorage.getItem(counterKey));
            addNote(counterVal);
            localStorage.setItem(counterKey, counterVal + 1);
        });

const notesContainer = document.querySelector('.notes')
notesContainer.addEventListener('click', e => {
            // Empty space around notes could be selected
            if(e.target === notesContainer)
                return;
            // Delete icon is an 'img' element
            if(e.target.tagName === 'IMG') {
                deleteNote(e.target.parentNode);
                return;
            }
            // Don't open any notes if a 'Close' button is selected
            if(e.target.tagName === 'BUTTON')
                return;
            // Don't open note if it is already active
            if(e.target === activeNote || e.target.parentNode === activeNote)
                return;
            // Close any other active notes before opening selected note
            if(activeNote)
                closeNote();

            // A child element of the 'note' tile could be selected
            if(e.target.classList[0] !== 'note') 
                openNote(e.target.parentNode);
            else
                openNote(e.target);
        });
