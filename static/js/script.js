// Hero Carousel Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Hero banner arrows
    const leftArrow = document.querySelector('.hero-banner .left-arrow');
    const rightArrow = document.querySelector('.hero-banner .right-arrow');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentSlide = 0;

    function updateCarousel() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    leftArrow?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + dots.length) % dots.length;
        updateCarousel();
    });

    rightArrow?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateCarousel();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto-rotate carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateCarousel();
    }, 5000);

    // Content row scrolling
    const rowContainers = document.querySelectorAll('.anime-cards-container');
    
    rowContainers.forEach(container => {
        const row = container.closest('.content-row');
        const leftArrow = row?.querySelector('.row-arrow.left');
        const rightArrow = row?.querySelector('.row-arrow.right');

        leftArrow?.addEventListener('click', () => {
            container.scrollBy({ left: -220, behavior: 'smooth' });
        });

        rightArrow?.addEventListener('click', () => {
            container.scrollBy({ left: 220, behavior: 'smooth' });
        });
    });

    // Updates list scrolling
    const updatesList = document.querySelector('.updates-list');
    const updateUpArrow = document.querySelector('.update-arrow.up');
    const updateDownArrow = document.querySelector('.update-arrow.down');

    updateUpArrow?.addEventListener('click', () => {
        if (updatesList) {
            updatesList.scrollBy({ top: -100, behavior: 'smooth' });
        }
    });

    updateDownArrow?.addEventListener('click', () => {
        if (updatesList) {
            updatesList.scrollBy({ top: 100, behavior: 'smooth' });
        }
    });

    // Smooth scroll for anime cards on hover
    const animeCards = document.querySelectorAll('.anime-card');
    animeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
