const MONTH = localStorage.getItem('month'),
      YEAR = localStorage.getItem('year'),
      WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// -- FUNCTIONS --
function setDateHeading() {
    document.querySelector('.link').textContent = YEAR // set year text
    document.querySelector('.date-heading').textContent = MONTH; // set month text
    document.title = `SnapShots - ${MONTH}`;
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

function populateCalendar(dayCells) {
    /* 
      - Offset is an integer index for the weekday of the selected month's first day
      - Example:  month = July, year = 2023  -->  July 1st, 2023 is a Saturday (6)  -->  offset = 6
      - This is needed to place dates on the calendar under the correct weekday (for wide-screen devices) 
    */
    const getOffset = new Date(`${MONTH} 1, ${YEAR} 00:00:00`),
          offset = getOffset.getDay(),
          getDays = new Date(YEAR, getOffset.getMonth() + 1, 0),
          daysInMonth = parseInt(getDays.getDate());
    
    if(window.screen.width >= 750) { // use offset for wide-screen devices
        for(let i = offset; i < daysInMonth + offset; i++) {
            dayCells[i].dataset.number = `${i - offset + 1}`; // add date to each cell
            const getWeekday = new Date(`${MONTH} ${i - offset +  1}, ${YEAR} 00:00:00`);
            dayCells[i].dataset.weekday = WEEKDAYS[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (not visible)
        }
    }
    else { // disregard offset for mobile devices
        for(let i = 0; i < daysInMonth; i++) {
            dayCells[i].dataset.number = `${i+1}`; // add date to each cell
            const getWeekday = new Date(`${MONTH} ${i + 1}, ${YEAR} 00:00:00`);
            dayCells[i].dataset.weekday = WEEKDAYS[getWeekday.getDay()].slice(0, 3); // add weekday to each cell (visible)
        }
    }
}

function disableBlankCells(dayCells) {
    dayCells.forEach(day => {
        if(!day.dataset.number) {
            const dayLink = day.children.item(0);
            dayLink.removeAttribute('href');
            dayLink.removeAttribute('alt');
            day.style.backgroundColor = 'var(--bg-opaque)';
        }
    });
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
if(window.screen.width >= 750)
    extendCalendar();

const dayCells = document.querySelectorAll('li.day');

populateCalendar(Array.from(dayCells));
disableBlankCells(dayCells);

// Save date to local storage when selected
dayCells.forEach(day => day.addEventListener('click', () => {
    localStorage.setItem('day', day.dataset.number);
    localStorage.setItem('weekday', weekdays.find(elem => elem.slice(0, 3) === day.dataset.weekday));
}));

document.querySelector('header input').addEventListener('input', searchNotes);
