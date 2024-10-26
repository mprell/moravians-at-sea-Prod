document.addEventListener("DOMContentLoaded", function() {
    const quotesDiv = document.querySelector('div[id="quotes"]');
    const paragraphs = quotesDiv.querySelectorAll('p');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    
    let currentIndex = 0;

    // Hide all paragraphs initially
    paragraphs.forEach(p => p.style.display = 'none');

    // Show the first paragraph
    paragraphs[currentIndex].style.display = 'block';

    function showRandomParagraph() {
        // Hide the current paragraph
        paragraphs[currentIndex].style.display = 'none';

        // Get a random index different from the current one
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * paragraphs.length);
        } while (randomIndex === currentIndex);

        // Show the new random paragraph
        currentIndex = randomIndex;
        paragraphs[currentIndex].style.display = 'block';
    }

    leftArrow.addEventListener('click', showRandomParagraph);
    rightArrow.addEventListener('click', showRandomParagraph);
});