// Display current year and month
const today = new Date();
const thisYear = today.getFullYear();
document.querySelector('.prevPage').textContent = thisYear; // set year text on page
const month = localStorage.getItem('month');
document.querySelector('.title').textContent = month; // set month text on page

// Add extra row of cells for wide-screen devices
if(window.screen.width >= 750) {
    for(let i=0; i < 7; i++) {
        let listItem = document.createElement('li'); // create new list item
        listItem.classList.add('day');
        let dayCell = document.createElement('a'); // create new link
        dayCell.href = 'day.html';
        listItem.appendChild(dayCell); // add link to list item
        document.querySelector('.days').appendChild(listItem); // add list item to calendar
    }
}

// Add date numbers and weekdays to cells in calendar
const getOffset = new Date(`${month} 1, ${today.getFullYear()} 00:00:00`);
const weekdayOffset = getOffset.getDay(); // get offset (weekday of the current month's first day)
const getDays = new Date(today.getFullYear(), today.getMonth(), 0);
const daysInMonth = parseInt(getDays.getDate()) + 1; // get total days in current month
const dayCells = Array.from(document.querySelectorAll('li.day')); // array of day cells (list items)
const weekdays = ['Sunday', 'Monday', 'Tueday', 'Wedday', 'Thursday', 'Friday', 'Saturday'];

if(window.screen.width >= 750) { // use offset for wide-screen devices
    for(let i = weekdayOffset; i < daysInMonth + weekdayOffset; i++) {
        dayCells[i].dataset.number = `${i - weekdayOffset + 1}`; // add day number to each cell
        const getWeekday = new Date(`${month} ${i - weekdayOffset +  1}, ${today.getFullYear()} 00:00:00`);
        dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (not visible)
    }
}
else { // mobile screens disregard offset
    for(let i=0; i < daysInMonth; i++) {
        dayCells[i].dataset.number = `${i+1}`; // add day number to each cell
        const getWeekday = new Date(`${month} ${i + 1}, ${today.getFullYear()} 00:00:00`);
        dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()].slice(0, 3); // add weekday to each cell
    }
}

document.querySelectorAll('li.day').forEach(day => day.addEventListener('click', () => {
    localStorage.setItem('day', day.dataset.number);
    localStorage.setItem('weekday', weekdays.find(elem => elem.slice(0, 3) === day.dataset.weekday));
}));