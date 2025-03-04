document.addEventListener('DOMContentLoaded', function() {
    console.log('Product Page Script loaded');
    
    // Import products data from shoprollon.js
    // This assumes the products object is accessible globally
    
    // 1. Get product ID from the page
    const addToCartButton = document.querySelector('.add-to-cart');
    const favoriteButton = document.querySelector('.favorite-button');
    
    if (!addToCartButton || !favoriteButton) {
        console.error('Cart or favorite buttons not found on the page');
        return;
    }
    
    const productId = addToCartButton.dataset.productId;
    
    if (!productId) {
        console.error('Product ID not found on buttons');
        return;
    }
    
    console.log('Product page for:', productId);
    
    // 2. Helper functions (replicated from shoprollon.js)
    const formatBaseOilName = (baseOil) => {
        const names = {
            'classic': 'Classic (Jojoba)',
            'silk': 'Silk (Japanska Kamelija)',
            'ultimate': 'Ultimate (Jojoba + Kamelija)'
        };
        return names[baseOil] || baseOil;
    };
    
    // Update cart count badges
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            if (count > 0) {
                el.style.display = 'flex';
                el.textContent = count;
            } else {
                el.style.display = 'none';
            }
        });
    };
    
    // Show notification
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        }, 100);
    };
    
    // 3. Add to cart functionality
    const addToCart = () => {
        // Get products data from window.products (imported from shoprollon.js)
        // If it's not available, we'll try to fetch it directly
        const products = window.products || {};
        
        const product = products[productId];
        if (!product) {
            console.error('Product data not found:', productId);
            // Fallback to manually creating product data from the page elements
            const fallbackProduct = createProductDataFromPage();
            addProductToCart(fallbackProduct);
            return;
        }
        
        addProductToCart(product);
    };
    
    // Create product data from page elements if products object isn't available
    const createProductDataFromPage = () => {
        const name = document.querySelector('.product-title').textContent;
        const volume = document.querySelector('.product-volume').textContent;
        const image = document.querySelector('.product-image').src;
        
        // Get selected base oil
        const radioButtons = document.querySelectorAll('input[name="base-oil"]');
        let selectedBaseOil = 'classic'; // Default
        let priceValue = 5.99; // Default
        
        radioButtons.forEach(radio => {
            if (radio.checked) {
                selectedBaseOil = radio.value;
                // Extract price from the label
                const detailsText = radio.closest('.oil-option').querySelector('.option-details').textContent;
                const priceMatch = detailsText.match(/(\d+\.\d+)/);
                if (priceMatch) {
                    priceValue = parseFloat(priceMatch[0]);
                }
            }
        });
        
        return {
            id: productId,
            name: name,
            prices: { [selectedBaseOil]: priceValue },
            volume: volume,
            image: image
        };
    };
    
    // Add product to cart based on selected options
    const addProductToCart = (product) => {
        // Get selected base oil
        const selectedBaseOil = document.querySelector('input[name="base-oil"]:checked').value;
        const priceValue = product.prices[selectedBaseOil];
        const formattedBaseOil = formatBaseOilName(selectedBaseOil);
        
        // Get quantity
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const itemId = `${productId}-${selectedBaseOil}-${Date.now()}`;
        const newItem = {
            id: itemId,
            productId: productId,
            name: product.name,
            price: `${priceValue.toFixed(2)} KM (${formattedBaseOil})`,
            numericPrice: priceValue,
            image: product.image,
            volume: product.volume,
            quantity: quantity,
            baseOil: formattedBaseOil,
            addedAt: new Date().toISOString()
        };
        
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showNotification('Proizvod dodan u košaricu ✨');
        console.log('Added item to cart:', newItem);
    };
    
    // 4. Favorite functionality
    const updateFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Update favorite button
        if (favoriteButton) {
            const icon = favoriteButton.querySelector('i');
            if (icon) {
                const isFavorite = favorites.some(item => item.id === productId);
                icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
            }
        }
        
        // Update favorite count in header
        const favoriteCount = document.getElementById('favorite-count');
        if (favoriteCount) {
            if (favorites.length > 0) {
                favoriteCount.style.display = 'flex';
                favoriteCount.textContent = favorites.length;
            } else {
                favoriteCount.style.display = 'none';
            }
        }
    };
    
    const toggleFavorite = () => {
        const products = window.products || {};
        const product = products[productId];
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            // If product data isn't available from window.products, create it from the page
            if (!product) {
                const fallbackProduct = {
                    id: productId,
                    name: document.querySelector('.product-title').textContent,
                    priceRange: document.querySelector('.oil-base-form').textContent.match(/(\d+\.\d+)/g)[0] + "-" + 
                               document.querySelector('.oil-base-form').textContent.match(/(\d+\.\d+)/g)[2] + " KM",
                    image: document.querySelector('.product-image').src,
                    volume: document.querySelector('.product-volume').textContent,
                    description: document.querySelector('.product-tagline').textContent,
                    addedAt: new Date().toISOString()
                };
                favorites.push(fallbackProduct);
            } else {
                favorites.push({
                    ...product,
                    addedAt: new Date().toISOString(),
                    price: product.priceRange
                });
            }
            showNotification('Dodano u favorite ❤️');
        } else {
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
    };
    
    // 5. Quantity controls
    window.increaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            let currentVal = parseInt(quantityInput.value);
            if (!isNaN(currentVal)) {
                quantityInput.value = Math.min(currentVal + 1, 10);
            }
        }
    };
    
    window.decreaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            let currentVal = parseInt(quantityInput.value);
            if (!isNaN(currentVal) && currentVal > 1) {
                quantityInput.value = currentVal - 1;
            }
        }
    };
    
    // 6. Initialize event listeners
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
    
    if (favoriteButton) {
        favoriteButton.addEventListener('click', toggleFavorite);
    }
    
    // 7. Initialize
    updateCartCount();
    updateFavoriteStatus();
});
