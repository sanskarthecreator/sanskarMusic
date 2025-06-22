// Get DOM elements
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const carousel = document.querySelector('.carousel');
const listHTML = document.querySelector('.carousel .list');
const seeMoreButtons = document.querySelectorAll('.seeMore'); // Select all "See More" buttons
const backButton = document.getElementById('back');

let clickTimeoutId; // Renamed for clarity: tracks the timeout for re-enabling clicks

// --- Event Listeners ---

// Handle "Next" button click
nextButton.addEventListener('click', () => {
    showSlider('next');
});

// Handle "Previous" button click
prevButton.addEventListener('click', () => {
    showSlider('prev');
});

// Handle "See More" buttons click (for each one)
seeMoreButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Remove navigation classes and add detail view class
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');

        // Disable navigation arrows when in detail view
        nextButton.style.pointerEvents = 'none';
        prevButton.style.pointerEvents = 'none';
        backButton.style.pointerEvents = 'auto'; // Ensure back button is clickable
    });
});

// Handle "Back" button click
backButton.addEventListener('click', () => {
    carousel.classList.remove('showDetail');

    // Re-enable navigation arrows when exiting detail view
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
    backButton.style.pointerEvents = 'none'; // Make back button non-interactive until showDetail again
});

// --- Core Slider Logic Function ---

/**
 * Handles the logic for showing the next or previous slider item.
 * @param {string} type - 'next' for next slide, 'prev' for previous slide.
 */
const showSlider = (type) => {
    // Temporarily disable buttons to prevent rapid clicks during animation
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    // Clear any previous animation classes
    carousel.classList.remove('next', 'prev');

    // Get all items (live NodeList)
    let items = document.querySelectorAll('.carousel .list .item');

    if (type === 'next') {
        // Move the first item to the end of the list
        listHTML.appendChild(items[0]);
        // Add 'next' class to trigger CSS animation
        carousel.classList.add('next');
    } else {
        // Move the last item to the beginning of the list
        listHTML.prepend(items[items.length - 1]);
        // Add 'prev' class to trigger CSS animation
        carousel.classList.add('prev');
    }

    // Clear any existing timeout to prevent re-enabling clicks too soon
    clearTimeout(clickTimeoutId);

    // Set a timeout to re-enable buttons after the animation duration (2 seconds)
    clickTimeoutId = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000); // This duration should match your CSS transition/animation times
};