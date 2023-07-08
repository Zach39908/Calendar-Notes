// Display current year
const today = new Date();
const headerLinks = Array.from(document.querySelectorAll('.prevPage'));
headerLinks[0].textContent = today.getFullYear();
const month = localStorage.getItem('month');
const day = localStorage.getItem('day');
const weekday = localStorage.getItem('weekday');
document.querySelector('.title').textContent = `${month} ${day}`;
headerLinks[1].textContent = weekday;