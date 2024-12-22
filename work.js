document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider-2');
    const slides = document.querySelectorAll('.circle-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const textWrapper8 = document.querySelector('.text-wrapper-8'); // Select the element to update text

    // Mapping of slide IDs to their associated text
    const slideTexts = {
        'slide-1': 'Chicky Wacky',
        'slide-2': 'The Rose',
        'slide-3': 'Call Of The Abyss',
    };

    let currentIndex = 0;

    function updateSlider() {
        const offset = -50 * currentIndex; // Move the slider based on the current index
        slider.style.transition = 'transform 1s ease-in-out'; // Add smooth transition for the slider movement
        slider.style.transform = `translateX(${offset}%)`;
        updateText(); // Update text whenever the slider moves
    }

    function updateText() {
        const currentSlide = slides[currentIndex];
        const slideId = currentSlide.id;
    
        // Temporarily hide the text for the transition
        textWrapper8.classList.add('hidden');
    
        setTimeout(() => {
            // Update the text after the fade-out effect
            textWrapper8.textContent = slideTexts[slideId] || '';
    
            // Show the text with the fade-in effect
            textWrapper8.classList.remove('hidden');
        }, 500); // Half of the transition time (fade-out effect duration)
    }
    

    function scaleSlides(newIndex) {
        const currentSlide = slides[currentIndex];
        const newSlide = slides[newIndex];

        // Scale down the current slide
        currentSlide.style.transition = 'transform 1s ease';
        currentSlide.style.transform = 'scale(0.5)';

        // Move the slider to the new index
        currentIndex = newIndex;

        // Scale up the new slide
        newSlide.style.transition = 'transform 1s ease';
        newSlide.style.transform = 'scale(1)';
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide if at the last
        scaleSlides(newIndex);
        updateSlider();
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length; // Loop back to the last slide if at the first
        scaleSlides(newIndex);
        updateSlider();
    }

    // Add event listeners to the arrow buttons
    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
    }

    // Set up IntersectionObserver to scale slides when they are 50% in view
    const observerOptions = {
        root: null, // Observe in the viewport
        threshold: 0.5 // Trigger when 50% of the slide is in view
    };

    function handleIntersection(entries) {
        entries.forEach(entry => {
            const slide = entry.target;
            if (entry.isIntersecting) {
                if (entry.intersectionRatio >= 0.5) {
                    slide.style.transition = 'transform 0.5s ease';
                    slide.style.transform = 'scale(1)';
                }
            } else {
                slide.style.transition = 'transform 0.5s ease';
                slide.style.transform = 'scale(0.5)';
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each slide
    slides.forEach(slide => {
        observer.observe(slide);
    });

    // Initialize the slider on page load
    const firstSlide = slides[currentIndex];
    firstSlide.style.transition = 'transform 0.5s ease';
    firstSlide.style.transform = 'scale(1)';
    updateText(); // Update the text for the first slide
    updateSlider();
});
