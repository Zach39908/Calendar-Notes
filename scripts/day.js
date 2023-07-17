let noteCount = 1;
let activeNote = null;

function setDateHeading(month, day, weekday) {
    const today = new Date();
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    headingItems[0].textContent = year;
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
    document.title = `Calendar Notes - ${month} ${day}`;
}

function openNote(note) {
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

function addNote() {
    const notesContainer = document.querySelector('.notes');
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    const title = document.createElement('h3');
    title.textContent = 'Title';
    const trashBin = document.createElement('img');
    trashBin.src = '../icons/trash.png';
    trashBin.alt = 'delete note';
    const text = document.createElement('p');
    text.textContent = 'Enter notes...';

    newNote.appendChild(title);
    newNote.appendChild(trashBin);
    newNote.appendChild(text);
    notesContainer.appendChild(newNote);
}

function deleteNote(note) {
    if(!confirm('Are you sure you want to delete this note?'))
        return;
    if(note === activeNote)
        closeNote();
        
    document.querySelector('.notes').removeChild(note);
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');

setDateHeading(month, day, weekday);

document.querySelector('.addNote')
        .addEventListener('click', () => {
            addNote();
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
