// Progress bar animation with realistic loading simulation
let progress = 0;
let progressElement = document.getElementById('progress-percentage');
let statusElement = document.querySelector('.progress-status');

const loadingMessages = [
    "Connecting to server...",
    "Loading product catalog...",
    "Fetching inventory data...",
    "Connecting to payment gateway...",
    "Loading shopping cart...",
    "Initializing checkout system...",
    "Connection timeout... retrying...",
    "Database error... reconnecting...",
    "Server overloaded... please wait...",
    "Still loading... this is taking longer than expected..."
];

let messageIndex = 0;

function updateProgress() {
    // Simulate realistic loading with variable speed
    const increment = Math.random() * 3 + 0.5; // Random increment between 0.5 and 3.5
    progress += increment;
    
    if (progress > 100) {
        progress = 0; // Reset for infinite loading
        messageIndex = 0; // Reset messages
    }
    
    // Update progress percentage
    progressElement.textContent = Math.floor(progress) + '%';
    
    // Update loading message based on progress
    const messageThreshold = 100 / loadingMessages.length;
    const currentMessageIndex = Math.floor(progress / messageThreshold);
    
    if (currentMessageIndex !== messageIndex && currentMessageIndex < loadingMessages.length) {
        messageIndex = currentMessageIndex;
        statusElement.textContent = loadingMessages[messageIndex];
        
        // Add a subtle animation to the status text change
        statusElement.style.opacity = '0.5';
        setTimeout(() => {
            statusElement.style.opacity = '0.8';
        }, 200);
    }
}

// Update progress every 100ms for smooth animation
setInterval(updateProgress, 100);

// Add interactive hover effects to loading elements
document.addEventListener('DOMContentLoaded', function() {
    const loadingSpinner = document.querySelector('.loading-spinner');
    const progressBar = document.querySelector('.progress-bar');
    const pulseLoader = document.querySelector('.pulse-loader');
    
    // Add hover effect to spinner
    loadingSpinner.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    loadingSpinner.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Add click effect to progress bar
    progressBar.addEventListener('click', function() {
        const fill = this.querySelector('.progress-fill');
        fill.style.animationDuration = '2s'; // Speed up animation temporarily
        
        setTimeout(() => {
            fill.style.animationDuration = '8s'; // Reset to normal speed
        }, 2000);
    });
    
    // Create floating text animations
    createFloatingText();
});

function createFloatingText() {
    const container = document.querySelector('.container');
    const floatingTexts = ['Connection lost...', 'Retrying...', 'Server error...', 'Please wait...', 'Loading failed...', 'Timeout...'];
    
    setInterval(() => {
        const text = document.createElement('div');
        text.textContent = floatingTexts[Math.floor(Math.random() * floatingTexts.length)];
        text.style.cssText = `
            position: absolute;
            color: rgba(255, 255, 255, 0.3);
            font-size: 0.8rem;
            pointer-events: none;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatText 4s ease-out forwards;
            z-index: 5;
        `;
        
        container.appendChild(text);
        
        // Remove element after animation
        setTimeout(() => {
            if (text.parentNode) {
                text.parentNode.removeChild(text);
            }
        }, 4000);
    }, 3000);
}

// Add CSS for floating text animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatText {
        0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
        }
        20% {
            opacity: 0.6;
            transform: translateY(0) scale(1);
        }
        80% {
            opacity: 0.3;
            transform: translateY(-30px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Add particle interaction
document.addEventListener('mousemove', function(e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.transition = 'transform 0.3s ease';
    });
});

// Site title glitch effect
const welcomeTitle = document.querySelector('.welcome-title');
const titleMessages = ['root - rug', 'r00t - rug', 'root - r?g', 'ro?t - rug', 'ERROR: 404', 'root - rug'];
let titleIndex = 0;

setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of glitch
        welcomeTitle.style.opacity = '0';
        setTimeout(() => {
            titleIndex = (titleIndex + 1) % titleMessages.length;
            welcomeTitle.textContent = titleMessages[titleIndex];
            welcomeTitle.style.opacity = '1';
            
            // Reset to normal after glitch
            if (titleMessages[titleIndex] !== 'root - rug') {
                setTimeout(() => {
                    welcomeTitle.textContent = 'root - rug';
                    titleIndex = 0;
                }, 1000);
            }
        }, 200);
    }
}, 3000);

// Add random error popups
function showRandomError() {
    const errors = [
        "⚠️ Failed to load product images",
        "❌ Payment gateway disconnected", 
        "⚠️ Inventory service unavailable",
        "❌ Unable to process requests",
        "⚠️ Database connection lost"
    ];
    
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 71, 87, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    errorDiv.textContent = errors[Math.floor(Math.random() * errors.length)];
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => errorDiv.remove(), 500);
    }, 3000);
}

// Show random errors occasionally
setInterval(() => {
    if (Math.random() > 0.8) { // 20% chance
        showRandomError();
    }
}, 8000);

// Add CSS for error animations
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(errorStyle); 