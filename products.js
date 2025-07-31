// Products functionality for RUGS AND ROOTS

document.addEventListener('DOMContentLoaded', function() {
    
    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('rugsCart')) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count display
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }
    }
    
    // Initialize cart count
    updateCartCount();
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card') || this.closest('.featured-product');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price, .price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Create product object
            const product = {
                id: Date.now() + Math.random(), // Simple ID generation
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            
            // Check if product already exists in cart
            const existingProduct = cart.find(item => item.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push(product);
            }
            
            // Update cart count
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            updateCartCount();
            
            // Save to localStorage
            localStorage.setItem('rugsCart', JSON.stringify(cart));
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#28a745';
            this.disabled = true;
            
            // Animate cart icon
            const cartBtn = document.querySelector('.cart-btn');
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
            
            // Show notification
            showProductNotification(`${productName} added to cart!`);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#2c2c2c';
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Create and show modal
            showQuickView(productName, productPrice, productDescription, productImage);
        });
    });
    
    // Cart button click (show mini cart)
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showMiniCart();
        });
    }
    
    // Collection cards hover effects
    const collectionCards = document.querySelectorAll('.collection-card');
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Product filtering (if needed)
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[src*="images_raw"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                
                // Check if image is already loaded
                if (img.complete && img.naturalHeight !== 0) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                }
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Quick view modal
function showQuickView(name, price, description, image) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <button class="modal-close" style="
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #999;
            z-index: 1001;
        ">&times;</button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
            <div>
                <img src="${image}" alt="${name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px;">
            </div>
            <div>
                <h2 style="font-size: 1.8rem; font-weight: 600; color: #2c2c2c; margin-bottom: 1rem;">${name}</h2>
                <p style="font-size: 1.3rem; font-weight: 600; color: #2c2c2c; margin-bottom: 1rem;">${price}</p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 2rem;">${description}</p>
                <button class="modal-add-to-cart" style="
                    width: 100%;
                    background-color: #2c2c2c;
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 4px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Add to Cart</button>
            </div>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.7)';
        setTimeout(() => modal.remove(), 300);
    }
    
    // Add to cart from modal
    const modalAddToCart = modal.querySelector('.modal-add-to-cart');
    modalAddToCart.addEventListener('click', function() {
        // Trigger add to cart (similar to regular add to cart)
        showProductNotification(`${name} added to cart!`);
        closeModal();
    });
}

// Mini cart display
function showMiniCart() {
    const cart = JSON.parse(localStorage.getItem('rugsCart')) || [];
    
    if (cart.length === 0) {
        showProductNotification('Your cart is empty');
        return;
    }
    
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    miniCart.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        max-width: 350px;
        width: 90%;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        padding: 1.5rem;
        animation: slideInRight 0.3s ease;
    `;
    
    let cartHTML = '<h3 style="margin-bottom: 1rem; color: #2c2c2c;">Shopping Cart</h3>';
    let total = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        total += price * item.quantity;
        
        cartHTML += `
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
                <div style="flex: 1;">
                    <h4 style="font-size: 0.9rem; margin-bottom: 0.5rem;">${item.name}</h4>
                    <p style="color: #666; font-size: 0.8rem;">Qty: ${item.quantity}</p>
                    <p style="font-weight: 600; color: #2c2c2c;">${item.price}</p>
                </div>
            </div>
        `;
    });
    
    cartHTML += `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid #f0f0f0;">
            <p style="font-size: 1.1rem; font-weight: 600; color: #2c2c2c; margin-bottom: 1rem;">
                Total: ₹${total.toLocaleString()}
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                width: 100%;
                background-color: #2c2c2c;
                color: white;
                border: none;
                padding: 0.75rem;
                border-radius: 4px;
                font-weight: 500;
                cursor: pointer;
            ">Checkout</button>
        </div>
    `;
    
    miniCart.innerHTML = cartHTML;
    document.body.appendChild(miniCart);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (miniCart.parentNode) {
            miniCart.remove();
        }
    }, 5000);
}

// Product-specific notification function
function showProductNotification(message) {
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