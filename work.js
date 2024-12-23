
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider-2');
    const slides = document.querySelectorAll('.circle-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const textWrapper8 = document.querySelector('.text-wrapper-8');
    

    const slideTexts = {
        'slide-1': 'Chicky Wacky',
        'slide-2': 'The Rose',
        'slide-3': 'Call Of The Abyss',
    };

    let currentIndex = 0;
    function isSmallScreen() {
        return window.innerWidth <= 768;
    }
    function updateSlider() {
        const offset = -50 * currentIndex;
        slider.style.transition = 'transform 1s ease-in-out';
        slider.style.transform = `translateX(${offset}%)`;
        updateText();
    }

    function updateText() {
        const currentSlide = slides[currentIndex];
        const slideId = currentSlide.id;

        textWrapper8.classList.add('hidden');
        setTimeout(() => {
            textWrapper8.textContent = slideTexts[slideId] || '';
            textWrapper8.classList.remove('hidden');
        }, 500);
    }

    function scaleSlides(newIndex) {
        if (isSmallScreen()) {
            // If screen width is 768px or smaller, avoid scaling effect but still update currentIndex
            currentIndex = newIndex;
            updateSlider();
            return;
        }
    
        // Disable pointer events on all slides
        slides.forEach(slide => slide.style.pointerEvents = 'none');
        
        // Reset scaling of all slides
        slides.forEach(slide => slide.style.transform = 'scale(0.5)');
        
        // Enable pointer events on the new active slide
        slides[newIndex].style.pointerEvents = 'auto';
        
        // Apply scaling to the new active slide
        slides[newIndex].style.transform = 'scale(1)';
        
        currentIndex = newIndex;
    }
    

    function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length;
        scaleSlides(newIndex);
        updateSlider();
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + slides.length) % slides.length;
        scaleSlides(newIndex);
        updateSlider();
    }

    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
    }

    const observerOptions = {
        root: null,
        threshold: 0.2,
    };

    function handleIntersection(entries) {
        entries.forEach(entry => {
            const slide = entry.target;
            if (entry.isIntersecting) {
                slide.style.transform = 'scale(1)';
            } else {
                slide.style.transform = 'scale(0.5)';
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    slides.forEach(slide => observer.observe(slide));

    scaleSlides(currentIndex);
    updateText();
});






document.addEventListener('DOMContentLoaded', () => {
    const nextProject = document.querySelector('.next-project');
    const topElement = document.querySelector('#top');
    const bottomElement = document.querySelector('#bottom');

    const observerOptions = {
        root: null,
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger opacity and animation for top and bottom elements
                topElement.style.visibility = 'visible';
                bottomElement.style.visibility = 'visible';

                // Apply clip-path animations for top and bottom elements
                topElement.style.animation = 'opacity 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
                bottomElement.style.animation = 'opacity-reverse 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
            
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (nextProject) {
        observer.observe(nextProject);
    }
});




