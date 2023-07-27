const MONTH = localStorage.getItem('month'),
      DAY = localStorage.getItem('day'),
      WEEKDAY = localStorage.getItem('weekday'),
      YEAR = localStorage.getItem('year'),
      WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let activeNote = null;

// -- FUNCTIONS --
function setDateHeading() {
    const headingLinks = Array.from(document.querySelectorAll('.link'));

    document.title = `SnapShots - ${MONTH} ${DAY}`;
    headingLinks[0].textContent = YEAR;
    headingLinks[1].textContent = WEEKDAY;
    document.querySelector('.date-heading').textContent = `${MONTH} ${DAY}`;
}

function loadNotes() {
    const regex = new RegExp(`${MONTH} ${DAY} ${YEAR} - [0-9]+ - text`);

    for(const key in localStorage) {
        if(regex.test(key)) {
            const noteID = key.split(' - ')[1],
                  noteTitle = localStorage.getItem(`${MONTH} ${DAY} ${YEAR} - ${noteID} - title`),
                  noteText = localStorage.getItem(`${MONTH} ${DAY} ${YEAR} - ${noteID} - text`);

            addNote(noteID, noteTitle, noteText, false);
        }
    }
}

function saveNote(note) {
    const noteTitle = note.children.item(0).innerText,
          noteID = note.dataset.ID,
          titleKey = `${MONTH} ${DAY} ${YEAR} - ${noteID} - title`,
          textKey = `${MONTH} ${DAY} ${YEAR} - ${noteID} - text`;

    let noteText = undefined;
    if(note === activeNote)
        noteText = note.children.item(4).innerText;
    else
        noteText = note.children.item(2).innerText;

    localStorage.setItem(titleKey, noteTitle);
    localStorage.setItem(textKey, noteText);
}

function openNote(note) {
    note.classList.add('active');
    activeNote = note;

    const title = note.children.item(0),
          trashBin = note.children.item(1),
          text = note.children.item(2),
          saveBtn = document.createElement('button'),
          closeBtn = document.createElement('button');

    saveBtn.textContent = 'Save';
    closeBtn.textContent = 'Close';
    note.insertBefore(closeBtn, trashBin);
    note.insertBefore(saveBtn, closeBtn);
    title.contentEditable = text.contentEditable = true;
}

function closeNote() {
    if(!activeNote)
        return;

    saveNote(activeNote);

    const noteTitle = activeNote.children.item(0),
          saveBtn = activeNote.children.item(1),
          closeBtn = activeNote.children.item(2),
          noteText = activeNote.children.item(4);

    activeNote.removeChild(saveBtn);
    activeNote.removeChild(closeBtn);
    activeNote.classList.remove('active');
    noteTitle.contentEditable = noteText.contentEditable = false;
    activeNote = null;
}

function createNote(noteID, title, text) {
    const note = document.createElement('div');
    note.classList.add('note');
    const noteTitle = document.createElement('h3');
    noteTitle.innerText = title;
    const trashBin = document.createElement('img');
    trashBin.src = '../icons/trash.png';
    trashBin.alt = 'Delete note';
    const noteText = document.createElement('p');
    noteText.innerText = text;

    note.appendChild(noteTitle);
    note.appendChild(trashBin);
    note.appendChild(noteText);
    note.dataset.ID = noteID;

    return note;
}

function addNote(noteID, noteTitle = 'Title', noteText = 'Enter notes...', save = true) {
    const notesContainer = document.querySelector('.notes'),
          note = createNote(noteID, noteTitle, noteText);

    if(save)
        saveNote(note);
        
    notesContainer.appendChild(note);
}

function deleteNote(note) {
    if(!confirm('Are you sure you want to delete this note?'))
        return;
    if(note === activeNote)
        closeNote();

    const noteID = note.dataset.ID,
          titleKey = `${MONTH} ${DAY} ${YEAR} - ${noteID} - title`,
          textKey = `${MONTH} ${DAY} ${YEAR} - ${noteID} - text`;

    localStorage.removeItem(titleKey);
    localStorage.removeItem(textKey);
    document.querySelector('.notes').removeChild(note);
}

function searchNotes() {
    const dropdown = document.querySelector('.dropdown');
    while(dropdown.hasChildNodes())
         dropdown.removeChild(dropdown.firstChild);

    if(this.value === '')
         return;

    for(const key in localStorage) {
         if(key.includes('text') || key.includes('title')) {
              const noteInfo = localStorage.getItem(key);
              if(noteInfo.toLowerCase().includes(this.value.toLowerCase()))
                   createSearchResult(noteInfo, key, dropdown);
         }
    }
}

function createSearchResult(noteInfo, key, dropdown) {
    const partsOfDate = key.split(' - ')[0].split(' '),
          month = partsOfDate[0],
          day = partsOfDate[1],
          year = partsOfDate[2],
          getWeekday = new Date(`${month} ${day}, ${year} 00:00:00`),
          weekday = WEEKDAYS[getWeekday.getDay()];
    const listItem = document.createElement('li'),
          itemLink = document.createElement('a'),
          itemSpan = document.createElement('span');
    
    itemSpan.textContent = `- ${month} ${day}, ${year}`;
    itemLink.textContent = noteInfo;
    itemLink.href = 'day.html';
    itemLink.appendChild(itemSpan);
    listItem.appendChild(itemLink);
    dropdown.appendChild(listItem);

    listItem.addEventListener('click', () => {
         localStorage.setItem('month', month);
         localStorage.setItem('day', day);
         localStorage.setItem('year', year);
         localStorage.setItem('weekday', weekday);
    });
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

    Example:  localStorage('July 18 - 4 - title') = 'Title'
              localStorage('July 18 - 4 - text') = 'Enter notes...'
              corresponds with:
                   <div class="note" data-ID="4">
                      <h3>Title</h3>
                      <img src="../icons/trash.png" alt="Delete note">
                      <p>Enter notes...</p>
                   </div>
*/
const counterKey = `${MONTH} ${DAY} ${YEAR} - counter`;
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
            if(e.target.tagName === 'BUTTON' && e.target.textContent === 'Close') {
                closeNote();
                return;
            }
            if(e.target.tagName === 'BUTTON' && e.target.textContent === 'Save') {
                saveNote(activeNote);
                alert('Note Saved');
                return;
            }
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

document.querySelector('header input').addEventListener('input', searchNotes);
