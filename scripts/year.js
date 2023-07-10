// Display current year in heading
const today = new Date();
document.querySelector('h1.title').textContent = today.getFullYear();

// Save month to local storage when selected
document.querySelectorAll('li.month').forEach(month => month.addEventListener('click', () => {
    const monthTxt = month.children.item(0).textContent;
    localStorage.setItem('month', monthTxt);
}));
