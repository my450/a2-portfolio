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
    const minRadiusPercent = 4; // Minimum radius
    const maxRadiusPercent = 5; // Maximum radius
    const finalXPercent = 80; // Final x2 value of the arrow when circle is clicked
    let animatingRadius = true; // Flag to control the radius animation

    // Function to animate the radius of the circle
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

    // Trigger the default radius animation for the circle
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
    
      // Scale the current slide down and the new slide up
      function scaleSlides(newIndex) {
        const currentSlide = slides[currentIndex];
        const newSlide = slides[newIndex];
    
        // Scale down the current slide
        currentSlide.style.transition = 'transform 1s ease';
        currentSlide.style.transform = 'scale(0.7)'; 
    
        // Move the slider to the new index
        currentIndex = newIndex;
    
        // Scale up the new slide
        newSlide.style.transition = 'transform 1s ease';
        newSlide.style.transform = 'scale(1)'; 
      }
    
      // Go to the next slide
      function nextSlide() {
        const newIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide if at the last
        scaleSlides(newIndex);
        updateSlider();
      }
    
      // Go to the previous slide
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
            // Scale up the slide only after 50% of it is in view
            if (entry.intersectionRatio >= 0.5) {
              slide.style.transition = 'transform 0.5s ease';
              slide.style.transform = 'scale(1)';
            }
          } else {
            // Scale down immediately when the slide is less than 50% in view (leaving)
            slide.style.transition = 'transform 0.5s ease';
            slide.style.transform = 'scale(0.7)';
          }
        });
      }
    
      const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
      // Observe each slide
      slides.forEach(slide => {
        observer.observe(slide);
      });
    
      // Initialize the slider on page load
      // Set the first slide to be scaled up immediately when the page loads
      const firstSlide = slides[currentIndex];
      firstSlide.style.transition = 'transform 0.5s ease'; 
      firstSlide.style.transform = 'scale(1)';  // Scale up the first slide
      updateSlider();
});
