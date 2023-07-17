function setDateHeading(month, day, weekday) {
    const today = new Date();
    const headingItems = Array.from(document.querySelectorAll('.prevPage'));

    headingItems[0].textContent = today.getFullYear();
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${month} ${day}`;
    document.title = `Calendar Notes - ${month} ${day}`;
}

const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
const year = localStorage.getItem('year');

setDateHeading(month, day, weekday);
