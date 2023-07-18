const today = new Date();
document.querySelector('.date-heading').textContent = today.getFullYear(); // set year text
localStorage.setItem('year', today.getFullYear()); // year value used for saving user entered notes

// Save month to local storage when selected
document.querySelectorAll('.month')
        .forEach(month => month.addEventListener('click', () => {
             const monthTxt = month.children.item(0).textContent;
             localStorage.setItem('month', monthTxt);
        }));
