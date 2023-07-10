function setDateHeading(today, selectedMonth) {
    document.querySelector('.prevPage').textContent = today.getFullYear(); // set year text
    document.querySelector('.title').textContent = selectedMonth; // set month text
}

function extendCalendar() {
    for(let i=0; i < 7; i++) {
        let listItem = document.createElement('li');
        listItem.classList.add('day');
        let itemLink = document.createElement('a');
        itemLink.href = 'day.html';

        listItem.appendChild(itemLink);
        document.querySelector('.days').appendChild(listItem);
    }
}

function populateCalendar(today, selectedMonth, weekdays, dayCells) {
    const getOffset = new Date(`${selectedMonth} 1, ${today.getFullYear()} 00:00:00`);
    const offset = getOffset.getDay(); // offset = weekday of the current month's first day
    const getDays = new Date(today.getFullYear(), today.getMonth(), 0);
    const daysInMonth = parseInt(getDays.getDate()) + 1;
    
    if(window.screen.width >= 750) { // use offset for wide-screen devices
        for(let i = offset; i < daysInMonth + offset; i++) {
            dayCells[i].dataset.number = `${i - offset + 1}`; // add date to each cell
            const getWeekday = new Date(`${selectedMonth} ${i - offset +  1}, ${today.getFullYear()} 00:00:00`);
            dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (not visible)
        }
    }
    else { // disregard offset for mobile devices
        for(let i=0; i < daysInMonth; i++) {
            dayCells[i].dataset.number = `${i+1}`; // add day number to each cell
            const getWeekday = new Date(`${selectedMonth} ${i + 1}, ${today.getFullYear()} 00:00:00`);
            dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (visible)
        }
    }
}



// Display year and month in heading
const today = new Date();
const selectedMonth = localStorage.getItem('month');
setDateHeading(today, selectedMonth);

// Add row of cells for wide-screen devices
if(window.screen.width >= 750)
    extendCalendar();

// Add dates and weekdays to calendar cells
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayCells = Array.from(document.querySelectorAll('li.day'));
populateCalendar(today, selectedMonth, weekdays, dayCells);

// Save date and weekday to local storage when selected
for(day in dayCells) {
    localStorage.setItem('day', day.dataset.number);
    localStorage.setItem('weekday', weekdays.find(elem => elem.slice(0, 3) === day.dataset.weekday));
}
