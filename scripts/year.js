// Display current year as title
const today = new Date();
document.querySelector('h1.title').textContent = today.getFullYear();

// Save selected month to local storage
document.querySelectorAll('li.month').forEach(month => month.addEventListener('click', () => {
    const monthTxt = month.children.item(0).textContent;
    localStorage.setItem('month', monthTxt);
}));