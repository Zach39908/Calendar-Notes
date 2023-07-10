function setDateHeading(today, headingItems) {
    const selectedMonth = localStorage.getItem('month');
    const selectedDay = localStorage.getItem('day');
    const weekday = localStorage.getItem('weekday');

    headingItems[0].textContent = today.getFullYear();
    headingItems[1].textContent = weekday;
    document.querySelector('.title').textContent = `${selectedMonth} ${selectedDay}`;
}



// Display date in heading
const today = new Date();
const headingItems = Array.from(document.querySelectorAll('.prevPage'));
setDateHeading(today, headingItems);
