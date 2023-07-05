// Display current year as title
today = new Date();
document.querySelector('h1.title').textContent = today.getFullYear();

// Save selected month to local storage
document.querySelectorAll('li.month').forEach(listItem => listItem.addEventListener('click', () => {
    const itemText = listItem.children.item(0).textContent;
    localStorage.setItem('month', itemText);
}));