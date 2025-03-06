document.addEventListener('DOMContentLoaded', () => {
    // Initialize slider functionality
    initializeSlider();
    
    // Initialize all typewriter animations
    initializeTypewriter();
    
    // Setup nature hero section animations with Intersection Observer
    setupNatureHeroAnimations();
});

/**
 * Initializes the slider functionality for the hero section
 */
function initializeSlider() {
    const slides = document.querySelectorAll('.slider-slide');
    
    // Make sure we have slides to work with
    if (slides.length < 2) return;
    
    // CSS animations are already handling the transitions,
    // but we'll add a class to help identify the active slide for potential JS interactions
    let currentSlide = 0;
    
    // Function to toggle between slides (as backup if CSS animations fail)
    function toggleSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update current slide index
        currentSlide = (currentSlide + 1) % slides.length;
    }
    
    // Initial setup - first slide active
    toggleSlides();
    
    // Set interval as backup if CSS animations don't work
    setInterval(toggleSlides, 12000); // Match the 12s from CSS animations
}

/**
 * Initializes typewriter animations for all text elements
 */
function initializeTypewriter() {
    // Get all typewriter text elements in the first hero section
    const firstHeroTexts = document.querySelectorAll('.hero-section:first-child .typewriter-text');
    
    // Animate each element with a delay between them
    firstHeroTexts.forEach((text, index) => {
        // Start with a clean animation state
        text.style.animation = 'none';
        
        // Force reflow
        void text.offsetWidth;
        
        // Apply animation with delay based on index
        text.style.animation = `typing 1s steps(40, end) forwards ${index * 0.5}s`;
    });
    
    // For elements in the second slide, we add a delayed animation
    const secondSlideTexts = document.querySelectorAll('.slider-slide:nth-child(2) .typewriter-text');
    secondSlideTexts.forEach((text, index) => {
        // We'll set up the animation to start after the first slide animations finish
        setTimeout(() => {
            // When it's time for the second slide to show
            text.style.animation = `typing 1s steps(40, end) forwards ${index * 0.5}s`;
        }, 6000); // Half the slider transition time
    });
}

/**
 * Sets up Intersection Observer for the nature hero section
 */
function setupNatureHeroAnimations() {
    const natureHero = document.querySelector('.nature-hero');
    
    if (!natureHero) return;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When the nature hero is in view, animate its text elements
                    const texts = entry.target.querySelectorAll('.typewriter-text');
                    texts.forEach((text, index) => {
                        // Start with a clean animation state
                        text.style.animation = 'none';
                        
                        // Force reflow
                        void text.offsetWidth;
                        
                        // Apply animation with delay based on index
                        text.style.animation = `typing 1s steps(40, end) forwards ${index * 0.5}s`;
                    });
                    
                    // Stop observing once animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
    );
    
    // Start observing the nature hero section
    observer.observe(natureHero);
}
