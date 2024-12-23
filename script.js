document.addEventListener('DOMContentLoaded', function () {
    const circle = document.getElementById('circle');
    const line = document.getElementById('arrowLine');
    const container = document.getElementById('container');
    const jobPage = document.querySelector('.job-page');
    const workLink = document.querySelector('.navbar.work'); // Work navbar link
    const contactLink = document.querySelector('.navbar.contact'); // Contact navbar link
    const workSection = document.getElementById('work');
    const contactSection = document.getElementById('contact');

    let radiusPercent = 4; // Initial radius of the circle in percentage
    let minRadiusPercent = 4; // Declare as `let` to allow updates
    let maxRadiusPercent = 5; // Declare as `let` to allow updates
    let animatingRadius = true;

    function updateCircleRadiusPercent() {
        if (window.matchMedia("(max-width: 576px)").matches) {
            minRadiusPercent = 2; // Smaller radius for mobile
            maxRadiusPercent = 3;
        } else if (window.matchMedia("(max-width: 768px)").matches) {
            minRadiusPercent = 2; // Medium radius for tablets
            maxRadiusPercent = 3;
        } else if (window.matchMedia("(max-width: 992px)").matches) {
            minRadiusPercent = 3; // Larger radius for desktops
            maxRadiusPercent = 4;
        } else {
            minRadiusPercent = 4; // Default radius for larger screens
            maxRadiusPercent = 5;
        }
    }
    // Initial call to set `minRadiusPercent` and `maxRadiusPercent` based on screen size
    updateCircleRadiusPercent();
    const radiusBreakpoints = ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"];
    radiusBreakpoints.forEach(breakpoint => {
    window.matchMedia(breakpoint).addEventListener("change", updateCircleRadiusPercent);
    }); // Flag to control the radius animation

    let finalXPercent = 80; // Declare `finalXPercent` as `let` to allow updates
    function updateFinalXPercent() {
        if (window.matchMedia("(max-width: 576px)").matches) {
            finalXPercent = 60; // Smaller screen (mobile)
        } else if (window.matchMedia("(max-width: 768px)").matches) {
            finalXPercent = 57; // Medium screen (tablet)
        } else if (window.matchMedia("(max-width: 992px)").matches) {
            finalXPercent = 60; // Large screen (small desktop)
        } else {
            finalXPercent = 80; // Default for larger screens
        }
    }
    // Initial call to set `finalXPercent` based on current screen size
    updateFinalXPercent();
    const breakpoints = ["(max-width: 576px)", "(max-width: 768px)", "(max-width: 992px)"];
    breakpoints.forEach(breakpoint => {
    window.matchMedia(breakpoint).addEventListener("change", updateFinalXPercent);
    });

    function animateCircleRadius() {
        const duration = 1800; // Full animation duration (increase + decrease)
    
        function updateRadius() {
            if (!animatingRadius) return; // Stop if animation is not active
    
            const elapsedTime = Date.now() % duration; // Loop within duration
            const progress = (elapsedTime / (duration / 2)) % 2; // Loop for half duration
            if (progress < 1) {
                // Increasing phase
                radiusPercent = minRadiusPercent + progress * (maxRadiusPercent - minRadiusPercent);
            } else {
                // Decreasing phase
                radiusPercent = maxRadiusPercent - (progress - 1) * (maxRadiusPercent - minRadiusPercent);
            }
            circle.setAttribute('r', `${radiusPercent}%`); // Update the radius
            requestAnimationFrame(updateRadius); // Continue animation
        }
    
        requestAnimationFrame(updateRadius); // Start the radius animation
    }
    
    // Initial call to start the circle animation
    animateCircleRadius();

    // On click, stop the radius animation and change the x2 value of the arrow
    circle.addEventListener('click', () => {
        animatingRadius = false; // Stop the radius animation
        animateArrowToFinalPosition(); // Animate the arrow to the final x2 position
        container.style.transform = 'translateX(-100vw)'; // Slide div1 to the left to reveal div2
        document.body.style.overflowY = 'scroll'; // Enable vertical scrolling
    });

    // Animate x2 of the line to the final position
    function animateArrowToFinalPosition() {
        const duration = 2000; // Duration in ms
        const startXPercent = 20; // Initial x2 position in percentage
        const endXPercent = finalXPercent; // Final x2 value in percentage
        let xPositionPercent = startXPercent; // Initial xPosition value
        const startTime = Date.now();

        function moveToFinalPosition() {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < duration) {
                // Animate the X value from startX to finalX
                xPositionPercent = startXPercent + (elapsedTime / duration) * (endXPercent - startXPercent);
                line.setAttribute('x2', `${xPositionPercent}%`); // Update the line's x2 value
                requestAnimationFrame(moveToFinalPosition); // Continue animation
            } else {
                line.setAttribute('x2', `${endXPercent}%`); // Set final x2 value
            }
        }

        moveToFinalPosition(); // Start the animation to the final position
    }
  
    function enableBodyScroll() {
      document.body.style.overflowY = 'scroll';
      container.style.overflowY = 'scroll';
    }
    function scrollToSection(section) {
      enableBodyScroll(); // Enable scrolling for vertical sections
      section.scrollIntoView({ behavior: 'smooth' }); // Smoothly scroll to the section
    }
    
    let isAnimating = false;

    // Function to animate the arrow
    function animateArrowToPosition(startX, endX, duration = 0.8) {
        const startTime = Date.now();

        function updateArrowPosition() {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < duration * 1000) {
                const progress = elapsedTime / (duration * 1000);
                const currentX = startX + progress * (endX - startX);
                lineArrow.setAttribute('x2', `${currentX}%`);
                requestAnimationFrame(updateArrowPosition);
            } else {
                lineArrow.setAttribute('x2', `${endX}%`); // Ensure final position is set
            }
        }

        requestAnimationFrame(updateArrowPosition);
    }

    // Function to slide to a specific position
    function slideTo(position, duration = 0.8) {
        if (isAnimating) return; // Prevent multiple animations at the same time
        isAnimating = true;

        container.style.transition = `transform ${duration}s ease-in-out`;
        container.style.transform = `translateX(${position})`;

        if (position === '0px') {
            // Move arrow back to initial position when sliding to landing-page
            animateArrowToPosition(80, 25, duration); // Adjust values as per your layout
        }

        setTimeout(() => {
            container.style.transition = ''; // Reset transition
            isAnimating = false;
        }, duration * 1000); // Convert seconds to milliseconds
    }

    // Handle the wheel event
    window.addEventListener('wheel', (event) => {
        const scrollUp = event.deltaY < 0; // Detect upward scroll
        const currentScroll = window.scrollY;

        if (scrollUp && !isAnimating) {
            if (currentScroll === 0 && container.style.transform === 'translateX(-100vw)') {
                // Scroll up from the job-page to the landing-page
                slideTo('0px', 2); // Slide to landing-page and move arrow
                document.body.style.overflowY = 'hidden'; // Disable vertical scrolling
            }
        }
    });

    // Circle click handler to slide to the job-page
    if (circle) {
        circle.addEventListener('click', () => {
            slideTo('-100vw', 2); // Slide to the job-page
            animateArrowToPosition(25, 80, 0.6); // Move arrow to final position
            document.body.style.overflowY = 'scroll'; // Enable vertical scrolling
        });
    }

    // Handle Work navbar link click
    if (workLink) {
        workLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            scrollToSection(workSection); // Scroll to the Work section
        });
    }
  
    // Handle Contact navbar link click
    if (contactLink) {
        contactLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            scrollToSection(contactSection); // Scroll to the Contact section
        });
    }

    const hash = window.location.hash.replace('#', ''); // Get the hash part of the URL
    if (hash === 'work') {
        scrollToSection(workSection);
    } else if (hash === 'contact') {
        scrollToSection(contactSection);
    }

    // Ensure body scrolling is enabled if navigating to vertical sections directly
    window.addEventListener('hashchange', () => {
        const updatedHash = window.location.hash.replace('#', '');
        if (updatedHash === 'work') {
            scrollToSection(workSection);
        } else if (updatedHash === 'contact') {
            scrollToSection(contactSection);
        }
    });

    container.addEventListener('scroll', () => {
        const scrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        console.log(`ScrollLeft: ${scrollLeft}, MaxScrollLeft: ${maxScrollLeft}`); // Debug log

        if (scrollLeft >= maxScrollLeft) {
            container.style.overflowY = 'scroll'; // Enable vertical scrolling
        } else if (scrollLeft === 0) {
            container.style.overflowY = 'hidden'; // Restrict vertical scrolling
        }
    });


    function updateSVGAttributes() {
        const arrowLine = document.getElementById("arrowLine");
        const circle = document.getElementById("circle");

        if (window.matchMedia("(max-width: 576px)").matches) {
            // For screens smaller than 576px
            arrowLine.setAttribute("x1", "35%");
            arrowLine.setAttribute("y1", "130%");
            arrowLine.setAttribute("x2", "40%");
            arrowLine.setAttribute("y2", "130%");
            circle.setAttribute("cx", "40%");
            circle.setAttribute("cy", "130%");
        } else if (window.matchMedia("(max-width: 768px)").matches) {
            // For screens between 576px and 768px
            arrowLine.setAttribute("x1", "20%");
            arrowLine.setAttribute("y1", "80%");
            arrowLine.setAttribute("x2", "30%");
            arrowLine.setAttribute("y2", "80%");
            circle.setAttribute("cx", "30%");
            circle.setAttribute("cy", "80%");
        } else if (window.matchMedia("(max-width: 992px)").matches) {
            // For screens between 768px and 992px
            arrowLine.setAttribute("x1", "19%");
            arrowLine.setAttribute("y1", "72%");
            arrowLine.setAttribute("x2", "29%");
            arrowLine.setAttribute("y2", "72%");
            circle.setAttribute("cx", "29%");
            circle.setAttribute("cy", "72%");
        } else {
            // Default for screens larger than 992px
            arrowLine.setAttribute("x1", "10%");
            arrowLine.setAttribute("y1", "67%");
            arrowLine.setAttribute("x2", "25%");
            arrowLine.setAttribute("y2", "67%");
            circle.setAttribute("cx", "25%");
            circle.setAttribute("cy", "67%");
        }
    }

    // Run on page load and when resizing
    window.addEventListener("resize", updateSVGAttributes);
    window.addEventListener("DOMContentLoaded", updateSVGAttributes);
  
});



function drawArcText(ctx, text, centerX, centerY, radius, startAngle, color, fontSize) {
        const chars = text.split('');
        const angleStep = (Math.PI * 2) / chars.length; // Equal angle step for each character
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = color;
  
        ctx.save(); // Save the initial state
        ctx.translate(centerX, centerY); // Move to the center of the canvas
        ctx.rotate(startAngle); // Rotate to the starting angle 
        chars.forEach((char) => {
          ctx.save(); // Save rotation state
          ctx.translate(0, -radius); // Move up to the radius
          ctx.fillText(char, 0, 0); // Draw character
          ctx.restore(); // Restore previous rotation state
          ctx.rotate(angleStep); // Rotate for the next character
        });
  
        ctx.restore(); // Restore the initial state
      }
  
      // Animation loop
      function animate() {
        // Clear and redraw Canvas 1
        if (ctx1) {
          ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // Clear canvas
          drawArcText(ctx1, "UI design   Figma design   Responsive website   ", 70, 70, 50, angle1, "#f7f1ea", 16); // Draw text
          angle1 += 0.01; // Increment angle for rotation
        }
  
        // Clear and redraw Canvas 2
        if (ctx2) {
          ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Clear canvas
          drawArcText(ctx2, "Education game design   Figma design   ", 70, 70, 50, angle2, "#f7f1ea", 16); // Draw text
          angle2 += 0.01; // Increment angle for rotation (counter-clockwise)
        }
        if (ctx3) {
            ctx3.clearRect(0, 0, canvas3.width, canvas3.height); // Clear canvas
            drawArcText(ctx3, "HTML CSS Javasript   UI design   ", 70, 70, 50, angle3, "#f7f1ea", 16); // Draw text
            angle3 += 0.01; // Increment angle for rotation (counter-clockwise)
          }
  
        // Loop the animation
        requestAnimationFrame(animate);
      }
  
      // Setup for Canvas 1
      const canvas1 = document.getElementById("canvas-1");
      const ctx1 = canvas1 ? canvas1.getContext("2d") : null;
      let angle1 = 0; // Initial angle for canvas 1
  
      // Setup for Canvas 2
      const canvas2 = document.getElementById("canvas-2");
      const ctx2 = canvas2 ? canvas2.getContext("2d") : null;
      let angle2 = 0; // Initial angle for canvas 2

      const canvas3 = document.getElementById("canvas-3");
      const ctx3 = canvas3 ? canvas3.getContext("2d") : null;
      let angle3 = 0; // Initial angle for canvas 2
  
      // Start the animation
animate();


document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentIndex = 0;

    function updateSlider() {
        const offset = -33 * currentIndex; // Move the slider based on the current index
        slider.style.transition = 'transform 1s ease-in-out'; // Add smooth transition for the slider movement
        slider.style.transform = `translateX(${offset}%)`;
    }

    function scaleSlides(newIndex) {
        const currentSlide = slides[currentIndex];
        const newSlide = slides[newIndex];

        // Scale down the current slide
        currentSlide.style.transition = 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
        currentSlide.style.transform = 'scale(0.7)';

        // Move the slider to the new index
        currentIndex = newIndex;

        // Scale up the new slide
        newSlide.style.transition = 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
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

    if (nextArrow && prevArrow) {
        nextArrow.addEventListener('click', nextSlide);
        prevArrow.addEventListener('click', prevSlide);
    }

    // IntersectionObserver for triggering text animations and visibility
    const observerOptions = {
        root: null, // Observe within the viewport
        threshold: 0.5 // Trigger when 50% of the slide is in view
    };

    function resetAnimation(element) {
        const animationName = window.getComputedStyle(element).animationName;

        // Remove the animation
        element.style.animation = 'none';

        // Trigger reflow (restarts the animation timeline)
        element.offsetHeight;

        // Reapply the animation
        element.style.animation = `${animationName} 1s ease`;
    }

    function handleIntersection(entries) {
        entries.forEach(entry => {
            const slide = entry.target;
            const texts = slide.querySelectorAll('.small-title, .p, .large-title');
            const canvases = slide.querySelectorAll('#canvas-1, #canvas-2, #canvas-3'); // Separate canvases

            const largeText = slide.querySelector('.large-title'); // Target large text specifically
            const paragraph = slide.querySelector('.p'); // Target paragraph specifically

            if (entry.isIntersecting) {
                // Restart animations and fade in text elements when the slide is in view
                texts.forEach(text => {
                    setTimeout(() => {
                        resetAnimation(text); // Reset and restart animation
                        text.style.animationPlayState = 'running'; // Ensure the animation runs
                        if (largeText) largeText.style.opacity = '1'; // Make the large text visible
                        if (paragraph) paragraph.style.opacity = '1'; // Make the paragraph visible
                    }, 0);
                });
    
                // Ensure canvases are visible
                canvases.forEach(canvas => {
                    canvas.style.opacity = '1';
                    canvas.style.transition = 'opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
                });
            } else {
                // Pause animations and hide the large text and paragraph when the slide exits the view
                texts.forEach(text => {
                    text.style.animationPlayState = 'paused';
                });
    
                if (largeText) {
                    largeText.style.opacity = '0'; // Hide the large text
                    largeText.style.transition = 'opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
                }
    
                if (paragraph) {
                    paragraph.style.opacity = '0'; // Hide the paragraph
                    paragraph.style.transition = 'opacity 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
                }
    
                // Optionally, keep canvases visible even when the slide is not active
                //canvases.forEach(canvas => {
                    //canvas.style.opacity = '1'; // Comment this line if you want canvases to hide
                //});
            }
        });
    }


    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    slides.forEach(slide => {
        observer.observe(slide);

        // Pause animations initially and hide large text and paragraph
        const texts = slide.querySelectorAll('.small-title, .p, .large-title, #canvas-1, #canvas-2, #canvas-3');
        const largeText = slide.querySelector('.large-title');
        const paragraph = slide.querySelector('.p');

        texts.forEach(text => {
            text.style.animationPlayState = 'paused';
        });

        if (largeText) {
            largeText.style.opacity = '0';
        }

        if (paragraph) {
            paragraph.style.opacity = '0';
        }
    });

    // Initialize the slider on page load
    const firstSlide = slides[currentIndex];
    firstSlide.style.transition = 'transform 1s cubic-bezier(0.075, 0.82, 0.165, 1)';
    firstSlide.style.transform = 'scale(1)';
    updateSlider();
});



document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.link');

  links.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault(); // Prevent default navigation

          const slide = link.closest('.slide');
          const smallTitle = slide.querySelector('.small-title');
          const largeTitle = slide.querySelector('.large-title');
          const pContainer = slide.querySelector('.p-container');
          const canvas = slide.querySelector('#canvas-1');
          const arch = slide.querySelector('.arch');

          smallTitle.classList.add('reset-animation');
          largeTitle.classList.add('reset-animation');

          smallTitle.classList.add('move-left');
          largeTitle.classList.add('move-left');

          // Add animation classes
          smallTitle.classList.add('move-left');
          largeTitle.classList.add('move-left');
          pContainer.classList.add('move-right');
          if (canvas) canvas.classList.add('move-right');
          arch.style.transform = 'scale(1.2)';

          void smallTitle.offsetWidth;
          void largeTitle.offsetWidth;
          smallTitle.classList.remove('reset-animation');
          largeTitle.classList.remove('reset-animation');

          // Navigate to the link's href after the animation completes
          const href = link.getAttribute('href');
          setTimeout(() => {
              window.location.href = href;
          }, 350); // Match this duration to your animation length
      });
  });
});

var choosePill;

const move = function(pill){
    const elements = document.querySelectorAll('.pill');

    elements.forEach((element) => {
        element.addEventListener("mousedown", function(){
            element.style.position = "absolute";
            choosePill = element;

            document.onmousemove = function(e){
                choosePill.style.left = e.clientX + 'px';
                choosePill.style.top = e.clientY + 'px';
                console.log(choosePill);
            }
        });
    });
    document.onmouseup = function(){
       choosePill = null;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const nextProject = document.querySelector('.self-image-container');
    const topElement = document.querySelector('.image');
    const bottomElement = document.querySelector('.i-strive-for-two');

    const observerOptions = {
        root: null, 
        threshold: 0.5,  // Trigger when 50% of the element is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topElement.style.visibility = 'visible';
                topElement.style.animation = 'opacity 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
                bottomElement.style.animation = 'm-animation 4s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (nextProject) {
        observer.observe(nextProject);
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const blurZone = document.createElement('div');
    blurZone.classList.add('blur-zone');
    document.body.appendChild(blurZone);

    

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('blurred');
                } else {
                    entry.target.classList.remove('blurred');
                }
            });
        },
        {
            root: null,
            rootMargin: `-60px 0px 0px 0px`, // Match navbar height
            threshold: [0],
        }
    );

});











