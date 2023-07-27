const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// -- FUNCTIONS --
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
     itemLink.href = 'pages/day.html';
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

const date = new Date();
document.querySelector('.date-heading').textContent = date.getFullYear(); // set year text
localStorage.setItem('year', date.getFullYear()); // year value used for saving user entered notes

// Save month to local storage when selected
document.querySelectorAll('.month')
        .forEach(month => month.addEventListener('click', () => {
             const monthTxt = month.children.item(0).textContent;
             localStorage.setItem('month', monthTxt);
        }));

document.querySelector('header input').addEventListener('input', searchNotes);
