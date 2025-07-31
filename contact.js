// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Get submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission
            setTimeout(() => {
                // Show success state
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                
                // Show success notification
                showContactNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
                
                // Reset form after success
                setTimeout(() => {
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.backgroundColor = '#2c2c2c';
                }, 2000);
                
            }, 1500);
        });
        
        // Form validation styling
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#ff4757';
                } else {
                    this.style.borderColor = '#e5e5e5';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(255, 71, 87)') {
                    this.style.borderColor = '#e5e5e5';
                }
            });
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const title = item.querySelector('h4');
        const content = item.querySelector('p');
        
        // Initially hide content
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.transition = 'max-height 0.3s ease';
        
        title.style.cursor = 'pointer';
        title.addEventListener('click', function() {
            const isOpen = content.style.maxHeight !== '0px';
            
            if (isOpen) {
                content.style.maxHeight = '0px';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
                content.style.marginTop = '0';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingTop = '';
                content.style.paddingBottom = '';
                content.style.marginTop = '0.5rem';
            }
        });
    });
    
    // Contact info interactions
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f8f8';
            this.style.padding = '1rem';
            this.style.borderRadius = '8px';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.padding = '0';
            this.style.paddingBottom = '2rem';
        });
    });
});

// Contact-specific notification function
function showContactNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        font-size: 0.9rem;
        font-weight: 400;
        z-index: 1001;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 350px;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}