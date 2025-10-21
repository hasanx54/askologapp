// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// SMOOTH SCROLLING
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" or external link
        if (href === '#' || href.startsWith('http')) return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// FAQ ACCORDION
// ===================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// ANIMATED COUNTER
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
}

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const text = stat.textContent;
                    let target = 0;

                    if (text.includes('M')) {
                        target = parseFloat(text) * 1000000;
                    } else if (text.includes('K')) {
                        target = parseFloat(text) * 1000;
                    } else {
                        target = parseInt(text);
                    }

                    stat.classList.add('animated');
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===================================
// PARALLAX EFFECT FOR HERO SHAPES
// ===================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// TESTIMONIAL CAROUSEL AUTO HIGHLIGHT
// ===================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function highlightTestimonial() {
    testimonialCards.forEach((card, index) => {
        if (index === currentTestimonial) {
            card.style.transform = 'scale(1.05)';
            card.style.zIndex = '10';
        } else {
            card.style.transform = 'scale(1)';
            card.style.zIndex = '1';
        }
    });

    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
}

// Start testimonial highlighting
if (testimonialCards.length > 0) {
    setInterval(highlightTestimonial, 3000);
}

// ===================================
// FORM VALIDATION (for future contact forms)
// ===================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+90|0)?[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// ===================================
// LAZY LOADING IMAGES
// ===================================

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// COOKIE CONSENT (Optional)
// ===================================

function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-consent';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>Bu web sitesi, deneyiminizi geliştirmek için çerezler kullanmaktadır.
                <a href="pages/cerez-politikasi.html">Çerez Politikası</a></p>
                <button class="btn btn-primary" id="acceptCookies">Kabul Et</button>
            </div>
        `;

        document.body.appendChild(cookieBanner);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .cookie-consent {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--white);
                box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.1);
                padding: 1.5rem;
                z-index: 9999;
                animation: slideUp 0.3s ease;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                }
                to {
                    transform: translateY(0);
                }
            }

            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 2rem;
                flex-wrap: wrap;
            }

            .cookie-content p {
                margin: 0;
                color: var(--text-dark);
            }

            .cookie-content a {
                color: var(--primary-color);
                text-decoration: underline;
            }

            @media (max-width: 768px) {
                .cookie-content {
                    flex-direction: column;
                    text-align: center;
                }

                .cookie-content button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);

        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => {
                cookieBanner.remove();
            }, 300);
        });

        // Add slideDown animation
        const slideDownStyle = document.createElement('style');
        slideDownStyle.textContent = `
            @keyframes slideDown {
                from {
                    transform: translateY(0);
                }
                to {
                    transform: translateY(100%);
                }
            }
        `;
        document.head.appendChild(slideDownStyle);
    }
}

// Show cookie consent on page load
window.addEventListener('load', () => {
    setTimeout(showCookieConsent, 1000);
});

// ===================================
// PRICING CARD INTERACTION
// ===================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        pricingCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
                c.style.transform = 'scale(0.95)';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
            c.style.transform = 'scale(1)';
        });
    });
});

// ===================================
// FEATURE CARD TILT EFFECT
// ===================================

const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===================================
// STEP CARDS ANIMATION ON SCROLL
// ===================================

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.step').forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(50px)';
    step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    stepObserver.observe(step);
});

// ===================================
// PHONE MOCKUP INTERACTIVE SWIPE
// ===================================

const profileCard = document.querySelector('.profile-card');
let startX = 0;
let currentX = 0;
let isDragging = false;

if (profileCard) {
    profileCard.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        profileCard.style.transition = 'none';
    });

    profileCard.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        currentX = e.clientX - startX;
        const rotation = currentX / 10;

        profileCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;

        // Color feedback
        if (currentX > 50) {
            profileCard.style.borderColor = '#27ae60';
        } else if (currentX < -50) {
            profileCard.style.borderColor = '#e74c3c';
        } else {
            profileCard.style.borderColor = 'transparent';
        }
    });

    profileCard.addEventListener('mouseup', () => {
        isDragging = false;
        profileCard.style.transition = 'transform 0.3s ease';

        if (Math.abs(currentX) > 100) {
            // Swipe animation
            const direction = currentX > 0 ? 1 : -1;
            profileCard.style.transform = `translateX(${direction * 500}px) rotate(${direction * 30}deg)`;

            setTimeout(() => {
                profileCard.style.transition = 'none';
                profileCard.style.transform = 'translateX(0) rotate(0)';
                setTimeout(() => {
                    profileCard.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        } else {
            profileCard.style.transform = 'translateX(0) rotate(0)';
        }

        profileCard.style.borderColor = 'transparent';
        currentX = 0;
    });

    profileCard.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            profileCard.style.transition = 'transform 0.3s ease';
            profileCard.style.transform = 'translateX(0) rotate(0)';
            profileCard.style.borderColor = 'transparent';
            currentX = 0;
        }
    });

    // Touch events for mobile
    profileCard.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        profileCard.style.transition = 'none';
    });

    profileCard.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        currentX = e.touches[0].clientX - startX;
        const rotation = currentX / 10;

        profileCard.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    });

    profileCard.addEventListener('touchend', () => {
        isDragging = false;
        profileCard.style.transition = 'transform 0.3s ease';

        if (Math.abs(currentX) > 100) {
            const direction = currentX > 0 ? 1 : -1;
            profileCard.style.transform = `translateX(${direction * 500}px) rotate(${direction * 30}deg)`;

            setTimeout(() => {
                profileCard.style.transition = 'none';
                profileCard.style.transform = 'translateX(0) rotate(0)';
                setTimeout(() => {
                    profileCard.style.transition = 'transform 0.3s ease';
                }, 50);
            }, 300);
        } else {
            profileCard.style.transform = 'translateX(0) rotate(0)';
        }

        currentX = 0;
    });
}

// ===================================
// LOADING ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Add loading class styles
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }

        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--white);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        body.loaded::before {
            animation: fadeOut 0.5s ease forwards;
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
                visibility: hidden;
            }
        }
    `;
    document.head.appendChild(loadingStyle);
});

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c👋 Merhaba Geliştirici!', 'font-size: 20px; font-weight: bold; color: #FF4458;');
console.log('%cAşkolog ekibine katılmak ister misin?', 'font-size: 14px; color: #666;');
console.log('%ckariyer@askolog.com adresine CV\'ini gönder!', 'font-size: 14px; color: #FF4458; font-weight: bold;');

// ===================================
// PERFORMANCE MONITORING
// ===================================

if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
                console.warn(`Slow operation detected: ${entry.name} took ${entry.duration}ms`);
            }
        }
    });

    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Keyboard navigation for FAQ
faqItems.forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');

    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        }
    });
});

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Ana içeriğe geç';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===================================
// ANALYTICS PLACEHOLDER
// ===================================

function trackEvent(category, action, label) {
    // Google Analytics veya başka bir analytics servisine event gönderimi
    console.log('Event tracked:', { category, action, label });

    // Örnek: Google Analytics 4
    // gtag('event', action, {
    //     event_category: category,
    //     event_label: label
    // });
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        trackEvent('Button', 'Click', btnText);
    });
});

// Track download button clicks specifically
document.querySelectorAll('.app-button').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.querySelector('i').classList.contains('fa-apple') ? 'iOS' : 'Android';
        trackEvent('Download', 'Click', platform);
    });
});

console.log('%c✨ Aşkolog Landing Page Loaded Successfully!', 'font-size: 16px; font-weight: bold; color: #27ae60;');
