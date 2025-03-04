document.addEventListener('DOMContentLoaded', function() {
    console.log('Product Page Script loaded');
    
    // 1. Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }
    
    // Universal method to get product data
    const getProductData = () => {
        // Try multiple sources of product data
        if (window.allProducts && window.allProducts[productId]) {
            return window.allProducts[productId];
        }
        
        if (window.products && window.products[productId]) {
            return window.products[productId];
        }
        
        // Fallback: try to extract data from page elements
        return {
            id: productId,
            title: document.querySelector('.product-title')?.textContent || 'Unknown Product',
            volume: document.querySelector('.product-volume')?.textContent || '10 ml',
            images: [{ 
                src: document.querySelector('.product-images img')?.src || 'default-image.png', 
                alt: document.querySelector('.product-images img')?.alt || 'Product Image' 
            }],
            prices: {
                classic: 5.99,
                silk: 6.99,
                ultimate: 8.99
            }
        };
    };

    // Ensure buttons exist before adding event listeners
    const addToCartButton = document.querySelector('.add-to-cart');
    const favoriteButton = document.querySelector('.favorite-button');
    
    if (!addToCartButton || !favoriteButton) {
        console.warn('Add to Cart or Favorite buttons not found');
        return;
    }

    // Rest of the existing script remains the same
    const formatBaseOilName = (baseOil) => {
        const names = {
            'classic': 'Classic (Jojoba)',
            'silk': 'Silk (Japanska Kamelija)',
            'ultimate': 'Ultimate (Jojoba + Kamelija)'
        };
        return names[baseOil] || baseOil;
    };
    
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
    
    const addToCart = () => {
        const product = getProductData();
        
        if (!product) {
            console.error('Could not retrieve product data');
            return;
        }
        
        const selectedBaseOil = document.querySelector('input[name="base-oil"]:checked')?.value || 'classic';
        const priceValue = product.prices[selectedBaseOil] || 5.99;
        const formattedBaseOil = formatBaseOilName(selectedBaseOil);
        
        const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        const itemId = `${productId}-${selectedBaseOil}-${Date.now()}`;
        const newItem = {
            id: itemId,
            productId: productId,
            name: product.title,
            price: `${priceValue.toFixed(2)} KM (${formattedBaseOil})`,
            numericPrice: priceValue,
            image: product.images[0]?.src || 'default-image.png',
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
    
    const updateFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (favoriteButton) {
            const icon = favoriteButton.querySelector('i');
            if (icon) {
                const isFavorite = favorites.some(item => item.id === productId);
                icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
            }
        }
        
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
        const product = getProductData();
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            favorites.push({
                ...product,
                addedAt: new Date().toISOString(),
                price: Object.values(product.prices).join('-') + " KM"
            });
            showNotification('Dodano u favorite ❤️');
        } else {
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
    };
    
    // Quantity controls
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
    
    // Event listeners
    addToCartButton.addEventListener('click', addToCart);
    favoriteButton.addEventListener('click', toggleFavorite);
    
    // Initialize
    updateCartCount();
    updateFavoriteStatus();
});
