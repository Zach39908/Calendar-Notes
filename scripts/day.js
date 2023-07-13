function setDateHeading(month, day, weekday) {
    const today = new Date();
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    headingItems[0].textContent = today.getFullYear();
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
}

function loadNotes(editor, date) {
    const userNotes = localStorage.getItem(date);

    if(userNotes)
        editor.innerHTML = userNotes;
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');
const fullDate = `${weekday}, ${month} ${day}, ${year}`;
const tinyEditor = document.querySelector('[data-tiny-editor]');

setDateHeading(month, day, weekday);
loadNotes(tinyEditor, fullDate);

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

tinyEditor.addEventListener('input', () => localStorage.setItem(fullDate, tinyEditor.innerHTML));
