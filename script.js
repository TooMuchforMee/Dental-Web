document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamically Render Services ---
    const servicesList = [
        { title: "Dental Checkup & X-Rays", icon: "&#128300;" },
        { title: "Orthodontics (Braces)", icon: "&#128522;" },
        { title: "Dental Implants", icon: "&#129463;" },
        { title: "Crowns and Bridges", icon: "&#128142;" },
        { title: "Root Canal Treatment (RCT)", icon: "&#128300;" },
        { title: "Teeth Whitening & Bleaching", icon: "&#10024;" },
        { title: "Teeth Cleaning & Polishing", icon: "&#129524;" },
        { title: "Smile Designing", icon: "&#128522;" },
        { title: "Kids Dentistry", icon: "&#128102;" },
        { title: "Wisdom Teeth Extraction", icon: "&#129463;" },
        { title: "Tooth Colored Fillings", icon: "&#127912;" },
        { title: "Aligners and Gum Surgery", icon: "&#128137;" },
        { title: "Full Mouth Rehabilitation", icon: "&#129463;" },
        { title: "Facial Aesthetic", icon: "&#128135;" },
        { title: "Cosmetic & Laser Dental Treatment", icon: "&#10024;" },
        { title: "Dental Veneers and Laminates", icon: "&#128142;" }
    ];

    const servicesGrid = document.getElementById('services-grid');
    if (servicesGrid) {
        servicesList.forEach((service, index) => {
            let delayClass = "";
            if (index % 4 === 1) delayClass = "delay-1";
            else if (index % 4 === 2) delayClass = "delay-2";
            else if (index % 4 === 3) delayClass = "delay-1";
            
            const cardHtml = `
                <div class="service-card fade-in-up ${delayClass}">
                    <div class="icon-wrapper">${service.icon}</div>
                    <h3>${service.title}</h3>
                </div>
            `;
            servicesGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animation
                entry.target.classList.add('visible');
                // Unobserve after showing so it only animates once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements we want to animate
    const animateElements = document.querySelectorAll('.fade-in-up');
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // --- Form Submission Prevention Details ---
    const form = document.getElementById('bookingForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            // Simple visual feedback for the user
            btn.textContent = 'Request Sent!';
            btn.style.backgroundColor = 'var(--color-secondary)';
            btn.style.color = 'white';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

    // --- Hero Hover Gradient Tracking ---
    const heroHeading = document.getElementById('heroHeading');
    if (heroHeading) {
        heroHeading.addEventListener('mousemove', (e) => {
            const rect = heroHeading.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroHeading.style.setProperty('--mouse-x', `${x}px`);
            heroHeading.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // --- Spotlight Tracking ---
    const spotlightSections = document.querySelectorAll('.spotlight-section');
    spotlightSections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            section.style.setProperty('--mouse-x', `${x}px`);
            section.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Number Counter Animation ---
    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'), 10);
                const duration = 2000; // ms
                const increment = target / (duration / 16); 
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                updateCounter();
                
                observer.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Testimonials GSAP Animation ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const tSection = document.getElementById('testimonials');
        if (tSection) {
            // ScrollTrigger for entering the section
            const tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: tSection,
                    start: "top 80%",
                }
            });

            tlScroll.to(".testimonial-left", {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            });

            // Set up the carousel timeline
            const cards = gsap.utils.toArray('.t-card');
            const indicators = gsap.utils.toArray('.indicator');
            let currentIndex = 0;
            let autoPlayTimer;

            // Initial state: hide all except first
            gsap.set(cards, { visibility: "hidden", opacity: 0, x: 50, scale: 0.95 });
            gsap.set(cards[0], { visibility: "visible", opacity: 1, x: 0, scale: 1 });

            function showCard(index) {
                if (index === currentIndex || cards.length === 0) return;

                const prevCard = cards[currentIndex];
                const nextCard = cards[index];

                // Animate out previous card (slide left)
                gsap.to(prevCard, {
                    x: -50,
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => gsap.set(prevCard, { visibility: "hidden" })
                });

                // Prepare next card (start from right)
                gsap.set(nextCard, { visibility: "visible", x: 50, opacity: 0, scale: 0.95 });
                
                // Animate in next card
                gsap.to(nextCard, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.inOut",
                    delay: 0.1
                });

                if (indicators[currentIndex] && indicators[index]) {
                    indicators[currentIndex].classList.remove('active');
                    indicators[index].classList.add('active');
                }

                currentIndex = index;
            }

            function nextCard() {
                let nextIdx = (currentIndex + 1) % cards.length;
                showCard(nextIdx);
            }

            function startAutoPlay() {
                // Clear any existing timer first
                stopAutoPlay();
                autoPlayTimer = setInterval(nextCard, 4000);
            }

            function stopAutoPlay() {
                if (autoPlayTimer) clearInterval(autoPlayTimer);
            }

            // Start auto play only when section is visible
            ScrollTrigger.create({
                trigger: tSection,
                start: "top 80%",
                onEnter: startAutoPlay,
                onEnterBack: startAutoPlay,
                onLeave: stopAutoPlay,
                onLeaveBack: stopAutoPlay
            });

            // Pause on hover
            const carousel = document.getElementById('t-carousel');
            if (carousel) {
                carousel.addEventListener('mouseenter', stopAutoPlay);
                carousel.addEventListener('mouseleave', startAutoPlay);
                
                // Also add touch events for mobile hover-like behavior
                carousel.addEventListener('touchstart', stopAutoPlay, {passive: true});
                carousel.addEventListener('touchend', startAutoPlay, {passive: true});
                
                // Basic swipe support for mobile
                let touchStartX = 0;
                let touchEndX = 0;
                
                carousel.addEventListener('touchstart', e => {
                    touchStartX = e.changedTouches[0].screenX;
                }, {passive: true});
                
                carousel.addEventListener('touchend', e => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, {passive: true});
                
                function handleSwipe() {
                    if (touchEndX < touchStartX - 50) {
                        // swipe left (next)
                        stopAutoPlay();
                        nextCard();
                        startAutoPlay();
                    }
                    if (touchEndX > touchStartX + 50) {
                        // swipe right (prev)
                        stopAutoPlay();
                        let prevIdx = (currentIndex - 1 + cards.length) % cards.length;
                        showCard(prevIdx);
                        startAutoPlay();
                    }
                }
            }

            // Clickable indicators
            indicators.forEach((ind, i) => {
                ind.addEventListener('click', () => {
                    stopAutoPlay();
                    showCard(i);
                    startAutoPlay();
                });
            });
        }
    }
});
