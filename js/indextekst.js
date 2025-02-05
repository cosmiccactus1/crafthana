document.addEventListener('DOMContentLoaded', () => {
    // Prvo provjerimo učitavanje stranice i animiramo prvi hero
    const firstHeroTexts = document.querySelectorAll('.hero-section:first-child .typewriter-text');
    firstHeroTexts.forEach((text, index) => {
        text.style.animation = `typing 1s steps(40, end) forwards ${index * 0.5}s`;
    });

    // Za drugi hero koristimo Intersection Observer
    const natureHero = document.querySelector('.nature-hero');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const texts = entry.target.querySelectorAll('.typewriter-text');
                    texts.forEach((text, index) => {
                        text.style.animation = `typing 1s steps(40, end) forwards ${index * 0.5}s`;
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    if (natureHero) {
        observer.observe(natureHero);
    }
});
