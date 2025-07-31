// Products functionality for RUGS AND ROOTS

document.addEventListener('DOMContentLoaded', function() {
    
    // Cart functionality with sessionStorage
    let cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
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
    console.log('Found add-to-cart buttons:', addToCartBtns.length); // Debug log
    console.log('Button elements:', addToCartBtns); // Debug log
    
    addToCartBtns.forEach((btn, index) => {
        console.log(`Setting up button ${index}:`, btn); // Debug log
        btn.addEventListener('click', function(e) {
            console.log('Add to cart button clicked!', this); // Debug log
            alert('Add to cart button clicked!'); // Debug alert
            e.preventDefault(); // Prevent any default behavior
            e.stopPropagation(); // Stop event bubbling
            
            const productCard = this.closest('.product-card') || this.closest('.featured-product');
            if (!productCard) {
                console.error('Product card not found!');
                return;
            }
            
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price, .price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            console.log('Product details:', { productName, productPrice, productImage }); // Debug log
            
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
            
            // Save to sessionStorage
            sessionStorage.setItem('rugsCart', JSON.stringify(cart));
            console.log('Cart updated:', cart); // Debug log
            
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
    
    // Cart button click (show view cart)
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            showViewCart();
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
        // Get current cart
        let cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
        
        // Create product object
        const product = {
            id: Date.now() + Math.random(),
            name: name,
            price: price,
            image: image,
            quantity: 1
        };
        
        // Check if product already exists in cart
        const existingProduct = cart.find(item => item.name === name);
        
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(product);
        }
        
        // Save to sessionStorage
        sessionStorage.setItem('rugsCart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCountFromStorage();
        
        // Visual feedback
        const originalText = this.textContent;
        this.textContent = 'Added!';
        this.style.backgroundColor = '#28a745';
        this.disabled = true;
        
        // Animate cart icon
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Show notification
        showProductNotification(`${name} added to cart!`);
        
        // Reset button after 1 second, then close modal
        setTimeout(() => {
            this.textContent = originalText;
            this.style.backgroundColor = '#2c2c2c';
            this.disabled = false;
            setTimeout(() => {
                closeModal();
            }, 500);
        }, 1000);
    });
}

// View Cart display
function showViewCart() {
    const cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
    
    if (cart.length === 0) {
        showProductNotification('Your cart is empty');
        return;
    }
    
    // Create modal overlay
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal-overlay';
    cartModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const cartContent = document.createElement('div');
    cartContent.className = 'cart-modal-content';
    cartContent.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    `;
    
    let total = 0;
    let cartHTML = `
        <div style="padding: 2rem; border-bottom: 1px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center;">
            <h2 style="margin: 0; color: #2c2c2c; font-size: 1.5rem;">Shopping Cart (${cart.length} items)</h2>
            <button class="cart-close-btn" style="
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            ">&times;</button>
        </div>
        <div class="cart-items" style="padding: 1rem 2rem; max-height: 400px; overflow-y: auto;">
    `;
    
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item" data-id="${item.id}" style="
                display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                border: 1px solid #f0f0f0;
                border-radius: 8px;
                transition: all 0.3s ease;
            ">
                <img src="${item.image}" alt="${item.name}" style="
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 6px;
                    flex-shrink: 0;
                ">
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: #2c2c2c; font-size: 1rem;">${item.name}</h4>
                        <p style="margin: 0; color: #666; font-size: 0.9rem;">Price: ${item.price}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button class="qty-btn decrease" data-id="${item.id}" style="
                                width: 30px;
                                height: 30px;
                                border: 1px solid #ddd;
                                background: white;
                                border-radius: 4px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                            ">−</button>
                            <span style="
                                min-width: 40px;
                                text-align: center;
                                font-weight: 500;
                                font-size: 1rem;
                            ">${item.quantity}</span>
                            <button class="qty-btn increase" data-id="${item.id}" style="
                                width: 30px;
                                height: 30px;
                                border: 1px solid #ddd;
                                background: white;
                                border-radius: 4px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.3s ease;
                            ">+</button>
                        </div>
                        <div style="flex: 1; text-align: right;">
                            <span style="font-weight: 600; color: #2c2c2c; font-size: 1rem;">₹${itemTotal.toLocaleString()}</span>
                        </div>
                        <button class="remove-item" data-id="${item.id}" style="
                            background: #dc3545;
                            color: white;
                            border: none;
                            padding: 0.5rem;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 0.8rem;
                            transition: all 0.3s ease;
                        ">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartHTML += `
        </div>
        <div style="padding: 2rem; border-top: 1px solid #f0f0f0; background: #f9f9f9;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <span style="font-size: 1.2rem; font-weight: 600; color: #2c2c2c;">Total: ₹${total.toLocaleString()}</span>
                <button class="clear-cart" style="
                    background: #6c757d;
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                ">Clear Cart</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <button class="continue-shopping" style="
                    background: white;
                    color: #2c2c2c;
                    border: 2px solid #2c2c2c;
                    padding: 1rem;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Continue Shopping</button>
                <button class="checkout-btn" style="
                    background: #2c2c2c;
                    color: white;
                    border: none;
                    padding: 1rem;
                    border-radius: 6px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Checkout</button>
            </div>
        </div>
    `;
    
    cartContent.innerHTML = cartHTML;
    cartModal.appendChild(cartContent);
    document.body.appendChild(cartModal);
    
    // Animate in
    setTimeout(() => {
        cartModal.style.opacity = '1';
        cartContent.style.transform = 'scale(1)';
    }, 10);
    
    // Add event listeners
    setupCartEventListeners(cartModal);
}

// Setup event listeners for cart modal
function setupCartEventListeners(modal) {
    const cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
    
    // Close modal
    const closeBtn = modal.querySelector('.cart-close-btn');
    const continueShoppingBtn = modal.querySelector('.continue-shopping');
    
    function closeCart() {
        modal.style.opacity = '0';
        modal.querySelector('.cart-modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    }
    
    closeBtn.addEventListener('click', closeCart);
    continueShoppingBtn.addEventListener('click', closeCart);
    
    // Close when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeCart();
    });
    
    // Quantity buttons
    modal.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            const isIncrease = this.classList.contains('increase');
            updateCartQuantity(itemId, isIncrease);
            closeCart();
            setTimeout(() => showViewCart(), 100); // Refresh cart display
        });
    });
    
    // Remove item buttons
    modal.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.dataset.id;
            removeFromCart(itemId);
            closeCart();
            if (JSON.parse(sessionStorage.getItem('rugsCart') || '[]').length > 0) {
                setTimeout(() => showViewCart(), 100);
            }
        });
    });
    
    // Clear cart
    modal.querySelector('.clear-cart').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            closeCart();
        }
    });
    
    // Checkout
    modal.querySelector('.checkout-btn').addEventListener('click', function() {
        showProductNotification('Checkout functionality coming soon!');
        closeCart();
    });
}

// Helper functions for cart operations
function updateCartQuantity(itemId, increase) {
    let cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
    const item = cart.find(item => item.id == itemId);
    
    if (item) {
        if (increase) {
            item.quantity += 1;
        } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.id != itemId);
            }
        }
        
        sessionStorage.setItem('rugsCart', JSON.stringify(cart));
        updateCartCountFromStorage();
    }
}

function removeFromCart(itemId) {
    let cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
    cart = cart.filter(item => item.id != itemId);
    sessionStorage.setItem('rugsCart', JSON.stringify(cart));
    updateCartCountFromStorage();
    showProductNotification('Item removed from cart');
}

function clearCart() {
    sessionStorage.removeItem('rugsCart');
    updateCartCountFromStorage();
    showProductNotification('Cart cleared');
}

function updateCartCountFromStorage() {
    const cart = JSON.parse(sessionStorage.getItem('rugsCart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
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