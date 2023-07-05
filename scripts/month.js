// Display current year and month
today = new Date();
document.querySelector('.prevPage').textContent = today.getFullYear();
document.querySelector('.title').textContent = localStorage.getItem('month');

