document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // 20px gap
    
    // Create indicators
    cards.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
    
    // Optional: Auto-advance slides
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 5000);
    
    // Pause auto-slide on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        cardWidth = cards[0].offsetWidth + 20;
        updateCarousel();
    });
});