// ===================================
// Faith Defense Ministry - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
    
    // Close mobile menu when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // ===================================
    // Navbar Scroll Effect
    // ===================================
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on page load
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu after clicking
                    if (navToggle) navToggle.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const animateOnScrollObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = document.querySelectorAll(
        '.card, .pillar-card, .purpose-card, .witness-card, .session-card, ' +
        '.includes-card, .step, .case-step, .response-item, .scripture-card, ' +
        '.issue-card, .answer-card, .evidence-icon-item'
    );
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        animateOnScrollObserver.observe(element);
    });
    
    // Add animation styles dynamically
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation for grid items */
        .cards-container .animate-on-scroll:nth-child(1),
        .sessions-grid .animate-on-scroll:nth-child(1),
        .witness-grid .animate-on-scroll:nth-child(1),
        .response-grid .animate-on-scroll:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .cards-container .animate-on-scroll:nth-child(2),
        .sessions-grid .animate-on-scroll:nth-child(2),
        .witness-grid .animate-on-scroll:nth-child(2),
        .response-grid .animate-on-scroll:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .cards-container .animate-on-scroll:nth-child(3),
        .sessions-grid .animate-on-scroll:nth-child(3),
        .witness-grid .animate-on-scroll:nth-child(3),
        .response-grid .animate-on-scroll:nth-child(3) {
            transition-delay: 0.3s;
        }
        
        .cards-container .animate-on-scroll:nth-child(4),
        .sessions-grid .animate-on-scroll:nth-child(4),
        .response-grid .animate-on-scroll:nth-child(4) {
            transition-delay: 0.4s;
        }
        
        .sessions-grid .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
        .sessions-grid .animate-on-scroll:nth-child(6) { transition-delay: 0.6s; }
        .sessions-grid .animate-on-scroll:nth-child(7) { transition-delay: 0.7s; }
        .sessions-grid .animate-on-scroll:nth-child(8) { transition-delay: 0.8s; }
    `;
    document.head.appendChild(animationStyles);
    
    // ===================================
    // Active Navigation Link Highlighting
    // ===================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === currentPage) {
                link.classList.add('active');
                
                // If it's a dropdown item, also highlight parent
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const parentToggle = parentDropdown.querySelector('.dropdown-toggle');
                    if (parentToggle) {
                        parentToggle.classList.add('active');
                    }
                }
            }
        });
    }
    
    setActiveNavLink();
    
    // ===================================
    // Back to Top Button
    // ===================================
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.setAttribute('title', 'Back to top');
        document.body.appendChild(backToTopBtn);
        
        // Add styles for back to top button
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #c9a227, #d4b94a);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(201, 162, 39, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .back-to-top:hover {
                background: linear-gradient(135deg, #d4b94a, #e0c65c);
                transform: translateY(-5px);
                box-shadow: 0 6px 20px rgba(201, 162, 39, 0.5);
            }
            
            .back-to-top:active {
                transform: translateY(-2px);
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    createBackToTopButton();
    
    // ===================================
    // Form Validation
    // ===================================
    function initFormValidation() {
        const contactForm = document.querySelector('.contact-form, #contact-form, form[name="contact"]');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form fields
                const name = this.querySelector('input[name="name"], #name');
                const email = this.querySelector('input[name="email"], #email');
                const subject = this.querySelector('input[name="subject"], #subject');
                const message = this.querySelector('textarea[name="message"], #message');
                
                let isValid = true;
                
                // Validate name
                if (name && name.value.trim() === '') {
                    showError(name, 'Please enter your name');
                    isValid = false;
                } else if (name) {
                    removeError(name);
                }
                
                // Validate email
                if (email && !isValidEmail(email.value)) {
                    showError(email, 'Please enter a valid email address');
                    isValid = false;
                } else if (email) {
                    removeError(email);
                }
                
                // Validate subject (if exists)
                if (subject && subject.value.trim() === '') {
                    showError(subject, 'Please enter a subject');
                    isValid = false;
                } else if (subject) {
                    removeError(subject);
                }
                
                // Validate message
                if (message && message.value.trim() === '') {
                    showError(message, 'Please enter a message');
                    isValid = false;
                } else if (message && message.value.trim().length < 10) {
                    showError(message, 'Please enter at least 10 characters');
                    isValid = false;
                } else if (message) {
                    removeError(message);
                }
                
                // If valid, submit form
                if (isValid) {
                    // Show success message
                    showSuccessMessage(this);
                    
                    // Reset form
                    this.reset();
                    
                    // Here you would typically send the form data to a server
                    // Example: sendFormData(this);
                }
            });
            
            // Real-time validation on blur
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('error')) {
                        validateField(this);
                    }
                });
            });
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
    }
    
    function validateField(field) {
        const name = field.getAttribute('name') || field.id;
        const value = field.value.trim();
        
        if (name === 'name' && value === '') {
            showError(field, 'Please enter your name');
            return false;
        } else if (name === 'email' && !isValidEmail(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        } else if (name === 'message' && value === '') {
            showError(field, 'Please enter a message');
            return false;
        } else {
            removeError(field);
            return true;
        }
    }
    
    function showError(field, message) {
        removeError(field);
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #e53e3e; font-size: 0.875rem; margin-top: 5px;';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#e53e3e';
    }
    
    function removeError(field) {
        field.classList.remove('error');
        field.style.borderColor = '';
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function showSuccessMessage(form) {
        // Remove any existing success message
        const existingSuccess = form.querySelector('.success-message');
        if (existingSuccess) {
            existingSuccess.remove();
        }
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Thank you for your message! We will get back to you soon.</span>
        `;
        successDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 20px;
            background: linear-gradient(135deg, #c6f6d5, #9ae6b4);
            color: #22543d;
            border-radius: 8px;
            margin-top: 20px;
            font-weight: 500;
        `;
        
        form.appendChild(successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }
    
    initFormValidation();
    
    // ===================================
    // Accordion Functionality
    // ===================================
    function initAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const isOpen = this.classList.contains('active');
                const accordionContainer = this.closest('.accordion-container');
                
                // Close all other accordions in the same container
                if (accordionContainer) {
                    const allHeaders = accordionContainer.querySelectorAll('.accordion-header');
                    allHeaders.forEach(h => {
                        if (h !== this) {
                            h.classList.remove('active');
                            const hContent = h.nextElementSibling;
                            if (hContent) {
                                hContent.style.maxHeight = null;
                            }
                        }
                    });
                }
                
                // Toggle current accordion
                if (!isOpen) {
                    this.classList.add('active');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                } else {
                    this.classList.remove('active');
                    if (content) {
                        content.style.maxHeight = null;
                    }
                }
            });
        });
    }
    
    initAccordions();
    
    // ===================================
    // Tab Functionality
    // ===================================
    function initTabs() {
        const tabContainers = document.querySelectorAll('.tabs-container');
        
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab');
            const tabPanels = container.querySelectorAll('.tab-panel');
            
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const targetId = this.getAttribute('data-tab');
                    
                    // Remove active class from all tabs and panels
                    tabs.forEach(t => t.classList.remove('active'));
                    tabPanels.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked tab and corresponding panel
                    this.classList.add('active');
                    const targetPanel = container.querySelector(`#${targetId}`);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });
        });
    }
    
    initTabs();
    
    // ===================================
    // Image Lazy Loading
    // ===================================
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    initLazyLoading();
    
    // ===================================
    // Counter Animation
    // ===================================
    function initCounters() {
        const counters = document.querySelectorAll('.counter, [data-counter]');
        
        const counterObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                    const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                    const suffix = counter.getAttribute('data-suffix') || '';
                    const prefix = counter.getAttribute('data-prefix') || '';
                    
                    animateCounter(counter, target, duration, prefix, suffix);
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    function animateCounter(element, target, duration, prefix, suffix) {
        const startTime = performance.now();
        const startValue = 0;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = prefix + currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = prefix + target.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    initCounters();
    
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    function initParallax() {
        const hero = document.querySelector('.hero');
        
        if (hero && window.innerWidth > 768) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                if (scrolled < window.innerHeight) {
                    hero.style.backgroundPositionY = rate + 'px';
                }
            });
        }
    }
    
    initParallax();
    
    // ===================================
    // Scroll Progress Indicator
    // ===================================
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #c9a227, #d4b94a);
                z-index: 9999;
                transition: width 0.1s ease;
                width: 0%;
            }
        `;
        document.head.appendChild(style);
        
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    initScrollProgress();
    
    // ===================================
    // Keyboard Navigation Support
    // ===================================
    function initKeyboardNav() {
        // Add focus styles
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Add keyboard navigation styles
        const keyboardStyles = document.createElement('style');
        keyboardStyles.textContent = `
            body:not(.keyboard-nav) *:focus {
                outline: none;
            }
            
            body.keyboard-nav *:focus {
                outline: 2px solid #c9a227;
                outline-offset: 2px;
            }
            
            body.keyboard-nav a:focus,
            body.keyboard-nav button:focus {
                outline: 2px solid #c9a227;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(keyboardStyles);
        
        // ESC key to close mobile menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (navToggle) navToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    }
    
    initKeyboardNav();
    
    // ===================================
    // Print Functionality
    // ===================================
    function initPrint() {
        const printButtons = document.querySelectorAll('.print-btn, [data-print]');
        
        printButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.print();
            });
        });
    }
    
    initPrint();
    
    // ===================================
    // Copy to Clipboard (for sharing)
    // ===================================
    function initCopyToClipboard() {
        const copyButtons = document.querySelectorAll('.copy-link, [data-copy]');
        
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const textToCopy = this.getAttribute('data-copy') || window.location.href;
                
                navigator.clipboard.writeText(textToCopy).then(function() {
                    // Show tooltip or feedback
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    btn.classList.add('copied');
                    
                    setTimeout(function() {
                        btn.innerHTML = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                }).catch(function(err) {
                    console.error('Could not copy text: ', err);
                });
            });
        });
    }
    
    initCopyToClipboard();
    
    // ===================================
    // External Links - Open in New Tab
    // ===================================
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    
    initExternalLinks();
    
    // ===================================
    // Session Cards Hover Effect
    // ===================================
    function initSessionCardEffects() {
        const sessionCards = document.querySelectorAll('.session-card');
        
        sessionCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    initSessionCardEffects();
    
    // ===================================
    // Scripture Reference Tooltips
    // ===================================
    function initScriptureTooltips() {
        const scriptureRefs = document.querySelectorAll('.scripture-reference, [data-scripture]');
        
        scriptureRefs.forEach(ref => {
            ref.style.cursor = 'pointer';
            ref.setAttribute('title', 'Click to view full scripture');
            
            ref.addEventListener('click', function() {
                const scripture = this.getAttribute('data-scripture') || this.textContent;
                // You could open a modal or navigate to a Bible reference site
                const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(scripture)}&version=NASB`;
                window.open(bibleGatewayUrl, '_blank', 'noopener,noreferrer');
            });
        });
    }
    
    initScriptureTooltips();
    
    // ===================================
    // Loading State Management
    // ===================================
    function hidePageLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        }
    }
    
    // Hide loader when page is fully loaded
    window.addEventListener('load', hidePageLoader);
    
    // ===================================
    // Error Handling
    // ===================================
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.message);
    });
    
    // ===================================
    // Performance Monitoring (Optional)
    // ===================================
    function logPerformance() {
        if (window.performance && window.performance.timing) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const timing = window.performance.timing;
                    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                    const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
                    
                    console.log('Page Load Time:', pageLoadTime + 'ms');
                    console.log('DOM Ready Time:', domReadyTime + 'ms');
                }, 0);
            });
        }
    }
    
    // Uncomment to enable performance logging
    // logPerformance();
    
    // ===================================
    // Service Worker Registration (PWA Support)
    // ===================================
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('ServiceWorker registration successful');
                    })
                    .catch(function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
            });
        }
    }
    
    // Uncomment to enable service worker
    // registerServiceWorker();
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c Faith Defense Ministry ', 'background: #1a365d; color: #c9a227; font-size: 20px; padding: 10px;');
    console.log('%c Defending Faith. Making Disciples. ', 'color: #4a5568; font-size: 14px;');
    console.log('%c Website by Faith Defense Ministry ', 'color: #718096; font-size: 12px;');

});

// ===================================
// Utility Functions (Global Scope)
// ===================================

/**
 * Debounce function to limit how often a function can fire
 * @param {Function} func - Function to debounce
 * @param {number} wait - Time to wait in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit how often a function can fire
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name to get
 * @returns {string|null} Parameter value or null
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector for target element
 * @param {number} offset - Offset from top in pixels
 */
function scrollToElement(selector, offset = 80) {
    const element = document.querySelector(selector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Add class after delay
 * @param {HTMLElement} element - Element to add class to
 * @param {string} className - Class name to add
 * @param {number} delay - Delay in milliseconds
 */
function addClassAfterDelay(element, className, delay) {
    setTimeout(function() {
        element.classList.add(className);
    }, delay);
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Element to toggle class on
 * @param {string} className - Class name to toggle
 */
function toggleClass(element, className) {
    element.classList.toggle(className);
}

/**
 * Create element with attributes
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Attributes to set
 * @param {string} innerHTML - Inner HTML content
 * @returns {HTMLElement} Created element
 */
function createElement(tag, attributes = {}, innerHTML = '') {
    const element = document.createElement(tag);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'style' && typeof attributes[key] === 'object') {
            Object.assign(element.style, attributes[key]);
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    if (innerHTML) {
        element.innerHTML = innerHTML;
    }
    
    return element;
}