// ============================================
// OCCASION 365 - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.mobile-menu-close');
    
    function openMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openMenu);
    }
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        if (dots.length) {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function startSlideshow() {
        if (slides.length > 1) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Dot navigation
    if (dots.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideshow();
                startSlideshow();
            });
        });
    }
    
    // Start slideshow
    startSlideshow();
    
    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }
    
    // Horizontal Scroll Controls
    const scrollContainer = document.getElementById('chainScroll');
    const scrollLeft = document.querySelector('.scroll-left');
    const scrollRight = document.querySelector('.scroll-right');
    
    if (scrollContainer) {
        const scrollAmount = 380;
        
        if (scrollLeft) {
            scrollLeft.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
        
        if (scrollRight) {
            scrollRight.addEventListener('click', () => {
                scrollContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }
        
        // Drag to scroll
        let isDown = false;
        let startX;
        let scrollLeftPos;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeftPos = scrollContainer.scrollLeft;
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeftPos - walk;
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert('Thank you! You are now subscribed.');
            this.reset();
        });
    }
    
    // Sticky Header
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
});

// Simple Cart (LocalStorage)
const Cart = {
    items: [],
    
    init() {
        const saved = localStorage.getItem('ocassion365_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
        this.updateCount();
    },
    
    add(product) {
        this.items.push(product);
        this.save();
        this.updateCount();
    },
    
    remove(index) {
        this.items.splice(index, 1);
        this.save();
        this.updateCount();
    },
    
    save() {
        localStorage.setItem('ocassion365_cart', JSON.stringify(this.items));
    },
    
    updateCount() {
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
            countEl.textContent = this.items.length;
        }
    }
};

Cart.init();
