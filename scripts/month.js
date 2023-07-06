// Display current year and month
const today = new Date();
const thisYear = today.getFullYear();
document.querySelector('.prevPage').textContent = thisYear; // set year text on page
const selectedMonth = localStorage.getItem('month');
document.querySelector('.title').textContent = selectedMonth; // set month text on page

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
const getOffset = new Date(`${selectedMonth} 1, ${today.getFullYear()} 00:00:00`);
const weekdayOffset = getOffset.getDay(); // get offset (weekday of the current month's first day)
const getDays = new Date(today.getFullYear(), today.getMonth(), 0);
const daysInMonth = parseInt(getDays.getDate()) + 1; // get total days in current month
const dayCells = Array.from(document.querySelectorAll('li.day')); // array of day cells (list items)
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

if(window.screen.width >= 750) { // use offset for wide-screen devices
    for(let i=0; i < daysInMonth; i++) {
        dayCells[i + weekdayOffset].dataset.number = `${i+1}`; // add day number to each cell
    }
}
else { // mobile screens disregard offset
    for(let i=0; i < daysInMonth; i++) {
        dayCells[i].dataset.number = `${i+1}`; // add day number to each cell
        const getWeekday = new Date(`${selectedMonth} ${i+1}, ${today.getFullYear()} 00:00:00`);
        dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()];
    }
}