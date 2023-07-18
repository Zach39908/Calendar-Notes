let activeNote = null;

function setDateHeading(month, day, weekday) {
    const today = new Date();
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    document.title = `Calendar Notes - ${month} ${day}`;
    headingItems[0].textContent = year;
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
}

function loadNotes(month, day) {
    for(const key in localStorage) {
        if(key.includes(`${month} ${day}`) && key !== `${month} ${day} - counter`) {
            const partsOfKey = key.split(' - ');
            const noteText = localStorage.getItem(key);
            addNote(partsOfKey[2], month, day, partsOfKey[1], noteText);
        }
    }
}

function saveNote(note, month, day) {
    const noteTitle = note.children.item(0).textContent;
    const noteText = note.children.item(2).textContent;
    const identifier = note.dataset.identifier;
    const noteKey = `${month} ${day} - ${noteTitle} - ${identifier}`;
    localStorage.setItem(noteKey, noteText);
}

function openNote(note, month, day) {
    note.classList.add('active');
    activeNote = note;

    const title = note.children.item(0);
    const trashBin = note.children.item(1);
    const text = note.children.item(2);
    const closeBtn = document.createElement('button');

    closeBtn.textContent = 'Close';
    note.insertBefore(closeBtn, trashBin);
    title.contentEditable = text.contentEditable = true;
    closeBtn.addEventListener('click', () => closeNote(note));
}

function closeNote() {
    if(!activeNote)
        return;

    const title = activeNote.children.item(0);
    const closeBtn = activeNote.children.item(1);
    const text = activeNote.children.item(3);

    activeNote.removeChild(closeBtn);
    activeNote.classList.remove('active');
    title.contentEditable = text.contentEditable = false;
    activeNote = null;
}

function createNote(identifier, title, text) {
    const note = document.createElement('div');
    note.classList.add('note');
    const noteTitle = document.createElement('h3');
    noteTitle.textContent = title;
    const trashBin = document.createElement('img');
    trashBin.src = '../icons/trash.png';
    trashBin.alt = 'Delete note';
    const noteText = document.createElement('p');
    noteText.textContent = text;

    note.appendChild(noteTitle);
    note.appendChild(trashBin);
    note.appendChild(noteText);
    note.dataset.identifier = identifier;

    return note;
}

function addNote(identifier, month, day, title = 'Title', text = 'Enter notes...') {
    const notesContainer = document.querySelector('.notes');
    const note = createNote(identifier, title, text);
    saveNote(note, month, day);
    notesContainer.appendChild(note);
}

function deleteNote(note, month, day) {
    if(!confirm('Are you sure you want to delete this note?'))
        return;
    if(note === activeNote)
        closeNote();

    const noteTitle = note.children.item(0).textContent;
    const identifier = note.dataset.identifier;
    const noteKey = `${month} ${day} - ${noteTitle} - ${identifier}`;
    localStorage.removeItem(noteKey);
    document.querySelector('.notes').removeChild(note);
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');
const counterKey = `${month} ${day} - counter`;

setDateHeading(month, day, weekday);
loadNotes(month, day);

if(!localStorage.getItem(counterKey))
    localStorage.setItem(counterKey, 1);

document.querySelector('.addNote')
        .addEventListener('click', () => {
            const counterVal = parseInt(localStorage.getItem(counterKey));
            addNote(counterVal, month, day);
            localStorage.setItem(counterKey, counterVal + 1);
        });

const notesContainer = document.querySelector('.notes')
notesContainer.addEventListener('click', e => {
            // Empty space around notes could be selected
            if(e.target === notesContainer)
                return;
            // Delete icon is an 'img' element
            if(e.target.tagName === 'IMG') {
                deleteNote(e.target.parentNode, month, day);
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
                openNote(e.target.parentNode, month, day);
            else
                openNote(e.target, month, day);
        });
