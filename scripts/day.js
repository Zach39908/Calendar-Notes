function setDateHeading(month, day, weekday, year) {
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    headingItems[0].textContent = year;
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
}

function loadNotes(editor, month, day) {
    const userNotes = localStorage.getItem(`${month} ${day}`);

    if(userNotes)
        editor.innerHTML = userNotes;
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');
const tinyEditor = document.querySelector('[data-tiny-editor]');

setDateHeading(month, day, weekday, year);
loadNotes(tinyEditor, month, day);

if(window.screen.width < 750) {
    // Remove separator bars for better readability on mobile devices
    document.querySelectorAll('.__toolbar-separator')
            .forEach(item => item.remove());

    // Override tiny-editor inline style on toolbar items for improved layout on mobile devices
    document.querySelectorAll('.__toolbar *')
            .forEach(item => {
                item.style.margin = '0.1em';
             });
}

// Override tiny-editor inline style for aesthetic
document.querySelector('.__editor').style.backgroundColor = 'var(--bg-medium)';

tinyEditor.addEventListener('input', () => localStorage.setItem(`${month} ${day}`, tinyEditor.innerHTML));
