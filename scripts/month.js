function setDateHeading(today, month) {
    document.querySelector('.prevPage').textContent = today.getFullYear(); // set year text
    document.querySelector('.title').textContent = month; // set month text
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
    /* 
      - Offset is an integer index for the weekday of the selected month's first day
      - Example:  month = July, year = 2023  -->  July 1st, 2023 is a Saturday (6)  -->  offset = 6
      - This is needed to place dates on the calendar under the correct weekday (for wide-screen devices) 
    */
    const getOffset = new Date(`${selectedMonth} 1, ${today.getFullYear()} 00:00:00`);
    const offset = getOffset.getDay();
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
        for(let i = 0; i < daysInMonth; i++) {
            dayCells[i].dataset.number = `${i+1}`; // add date to each cell
            const getWeekday = new Date(`${selectedMonth} ${i + 1}, ${today.getFullYear()} 00:00:00`);
            dayCells[i].dataset.weekday = weekdays[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (visible)
        }
    }
}

const today = new Date();
const month = localStorage.getItem('month');
setDateHeading(today, month);

if(window.screen.width >= 750)
    extendCalendar();

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayCells = document.querySelectorAll('li.day');
populateCalendar(today, month, weekdays, Array.from(dayCells));

// Save date to local storage when selected
dayCells.forEach(day => day.addEventListener('click', () => {
    localStorage.setItem('day', day.dataset.number);
    localStorage.setItem('weekday', weekdays.find(elem => elem.slice(0, 3) === day.dataset.weekday));
}));
