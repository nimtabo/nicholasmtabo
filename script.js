document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.year').textContent = (new Date()).getFullYear()
  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');

  document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
          cursorFollower.style.left = e.clientX + 'px';
          cursorFollower.style.top = e.clientY + 'px';
      }, 100);
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference or default to dark theme
  const currentTheme = localStorage.getItem('theme') || 'dark';
  body.classList.toggle('light-mode', currentTheme === 'light');
  
  // Update toggle button icon
  updateToggleIcon();

  themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      updateToggleIcon();
  });

  function updateToggleIcon() {
      const icon = themeToggle.querySelector('i');
      if (body.classList.contains('light-mode')) {
          icon.classList.remove('fa-sun');
          icon.classList.add('fa-moon');
      } else {
          icon.classList.remove('fa-moon');
          icon.classList.add('fa-sun');
      }
  }

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animation
  gsap.from('.hero h1', {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: 'power3.out'
  });

  gsap.from('.hero p', {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.3
  });

  gsap.from('.hero .cta-button', {
      duration: 1,
      y: 50,
      opacity: 1,
      ease: 'power3.out',
      delay: 0.6
  });

  // Animate sections on scroll
  gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
          opacity: 1,
          y: 50,
          duration: 1,
          scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 20%',
              scrub: 1
          }
      });
  });

  // Animate skill progress
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
      const circle = item.querySelector('.progress-ring__circle');
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const percentage = item.dataset.skill;

      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      circle.style.strokeDashoffset = circumference;

      gsap.to(circle, {
          strokeDashoffset: circumference - (percentage / 100) * circumference,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
              trigger: item,
              start: 'top 80%'
          }
      });
  });

  // Particle animation in hero background
  const particlesContainer = document.querySelector('.particles');
  for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particlesContainer.appendChild(particle);

      gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5
      });

      gsap.to(particle, {
          x: '+=100',
          y: '+=100',
          repeat: -1,
          yoyo: true,
          ease: 'none',
          duration: Math.random() * 5 + 5
      });
  }

  // Form submission
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Here you would typically send the form data to a server
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
  });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {          
            // testimonial.classList.toggle('active', i === index);
            if (i === index) {
              testimonial.style.opacity = 1;
            }else{
              testimonial.style.opacity = 0;
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize the first testimonial
    showTestimonial(currentTestimonial);

    // Change testimonial every 5 seconds
    setInterval(nextTestimonial, 5000);

    // GSAP Animations for new sections
    gsap.from('#about-lesson', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '#about-lesson',
            start: 'top 80%'
        }
    });

    gsap.from('#why-choose .benefits-list li', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#why-choose',
            start: 'top 80%'
        }
    });

    gsap.from('#what-i-teach .skill-item', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '#what-i-teach',
            start: 'top 80%'
        }
    });

    gsap.from('#testimonials .testimonial-slide', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%'
        }
    });

    gsap.from('#availability .availability-card', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#availability',
            start: 'top 80%'
        }
    });

     // Animate profile SVG
     const codeLines = document.querySelectorAll('.code-lines line');
 
     function animateTyping() {
         codeLines.forEach((line, index) => {
             setTimeout(() => {
                 line.style.strokeDashoffset = '0';
                 if (index === codeLines.length - 1) {
                     setTimeout(resetAnimation, 1000);
                 }
             }, index * 600);
         });
     }
 
     function resetAnimation() {
         codeLines.forEach(line => {
             line.style.strokeDashoffset = '120';
         });
         setTimeout(animateTyping, 500);
     }
 
     animateTyping();
 
     // Move cursor
     let cursorPosition = 0;
     const cursorPositions = [35, 65, 95, 125, 155];
 
     function moveCursor() {
         cursor.setAttribute('y', cursorPositions[cursorPosition]);
         cursorPosition = (cursorPosition + 1) % cursorPositions.length;
     }
 
     setInterval(moveCursor, 600);
});