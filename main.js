// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Handles all click events on the page using event delegation.
     * This is more efficient than adding a listener to every button.
     */
    document.body.addEventListener('click', (event) => {
        // Find the closest ancestor with a `data-action` attribute
        const actionTarget = event.target.closest('[data-action]');

        if (actionTarget) {
            const action = actionTarget.dataset.action;

            if (action === 'book-demo') {
                // In a real application, this would open a modal with a Calendly embed or a contact form.
                alert('Thank you for your interest! A demo booking form will be available soon.');
            }
        }
        
        // You could add more 'if (action === ...)' blocks here for other buttons.
    });


    /**
     * Animates elements when they scroll into view using the Intersection Observer API.
     * This is much more performant than scroll event listeners.
     */
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                // Add the .is-visible class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Stop observing the element so the animation only happens once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Find all elements that should be animated on scroll and start observing them.
    const elementsToAnimate = document.querySelectorAll('.fade-in, [data-animate]');
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
    
    /**
     * Placeholder for mobile menu functionality.
     * You would add the logic here to toggle a 'hidden' class on your mobile menu container.
     */
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            // Example: const mobileMenu = document.getElementById('mobile-menu');
            // mobileMenu.classList.toggle('hidden');
            alert('Mobile menu functionality would be implemented here!');
        });
    }

});