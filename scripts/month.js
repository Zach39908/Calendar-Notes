// Display current year and month
const today = new Date();
const thisYear = today.getFullYear();
document.querySelector('.prevPage').textContent = thisYear; // set year text on page
const thisMonth = localStorage.getItem('month');
document.querySelector('.title').textContent = thisMonth; // set month text on page

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

// Add date numbers to cells in calendar
const getWeekdayOffset = new Date(`${thisMonth} 1, ${today.getFullYear()} 00:00:00`); // create date object for offset
const weekdayOffset = getWeekdayOffset.getDay(); // get offset (weekday of the current month's first day)
const getDays = new Date(today.getFullYear(), today.getMonth(), 0); // create date object for days in the month
const daysInMonth = parseInt(getDays.getDate()) + 1; // get total days in current month
const dayCells = Array.from(document.querySelectorAll('li.day')); // get Array of day cells (list items)

if(window.screen.width >= 750) { // use offset for wide-screen devices
    for(let i=0; i < daysInMonth; i++) {
        dayCells[i + weekdayOffset].dataset.content = `${i+1}`; // add day number to each cell
    }
}
else { // mobile screens disregard offset
    for(let i=0; i < daysInMonth; i++) {
        dayCells[i].dataset.content = `${i+1}`; // add day number to each cell
    }
}