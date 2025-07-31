// RUGS AND ROOTS - E-commerce Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Newsletter Popup Management
    const popup = document.getElementById('newsletter-popup');
    const popupClose = document.querySelector('.popup-close');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    // Show popup after 3 seconds
    setTimeout(() => {
        popup.classList.add('active');
    }, 3000);
    
    // Close popup when clicking close button
    popupClose.addEventListener('click', function() {
        popup.classList.remove('active');
    });
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
    
    // Handle newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate subscription process
            const submitBtn = this.querySelector('.continue-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Welcome!';
                submitBtn.style.backgroundColor = '#2c2c2c';
                
                setTimeout(() => {
                    popup.classList.remove('active');
                    // Reset form
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 1500);
            }, 1000);
        }
    });
    
    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const cartBtn = document.querySelector('.cart-btn');
    
    // Add smooth scroll for CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // Simulate adding to cart or navigating to shop
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add animation to cart
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Show feedback
        showNotification('Item added to collection!');
    });
    
    // Navigation interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for anchor links that don't have actual pages
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const linkText = this.textContent;
                showNotification(`${linkText} section coming soon!`);
            }
            // Let actual page links (about.html, contact.html) work normally
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function() {
        showNotification('Search feature coming soon!');
    });
    
    // Account functionality
    const accountBtn = document.querySelector('.account-btn');
    accountBtn.addEventListener('click', function() {
        showNotification('Account login coming soon!');
    });
    
    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2c2c2c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 400;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Smooth scrolling for internal links
    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    }
    
    // Add loading states for buttons
    function addLoadingState(button, originalText, loadingText) {
        button.textContent = loadingText;
        button.disabled = true;
        button.style.opacity = '0.7';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        }, 1500);
    }
    
    // Lazy loading effect for hero section
    const heroText = document.querySelector('.hero-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Initial styling for animation
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(30px)';
    heroText.style.transition = 'all 0.8s ease';
    
    observer.observe(heroText);
    
    // Add hover effects to feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }
    
    .hero-text h2, .hero-text h3 {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .hero-text h3 {
        animation-delay: 0.2s;
    }
    
    .hero-text p {
        animation: fadeInUp 0.8s ease forwards;
        animation-delay: 0.4s;
    }
    
    .cta-button {
        animation: fadeInUp 0.8s ease forwards;
        animation-delay: 0.6s;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);