// product-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // If no product ID found, redirect to shop page
    if (!productId || !allProducts[productId]) {
        console.error('Product not found');
        // Optional: redirect to the shop page
        // window.location.href = 'shop.html';
        return;
    }
    
    // 2. Load product data
    const product = allProducts[productId];
    
    // Update page title
    document.getElementById('document-title').textContent = `${product.title} | Crafthana`;
    
    // 3. Update breadcrumbs
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('category-link').href = product.categoryLink;
    document.getElementById('product-breadcrumb').textContent = product.title;
    
    // 4. Update product details
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-usage').textContent = product.usage;
    document.getElementById('product-ingredients').textContent = product.ingredients;
    
    // 5. Update price options
    document.getElementById('classic-price').textContent = `Ulje hladno prešane jojobe - ${product.prices.classic.toFixed(2)} KM`;
    document.getElementById('silk-price').textContent = `Ulje japanske kamelije - ${product.prices.silk.toFixed(2)} KM`;
    document.getElementById('ultimate-price').textContent = `Ulje jojobe i japanske kamelije - ${product.prices.ultimate.toFixed(2)} KM`;
    
    // 6. Load product images
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = '';
    
    // Create main image element
    const mainImage = document.createElement('div');
    mainImage.className = 'main-image';
    const img = document.createElement('img');
    img.src = product.images[0].src;
    img.alt = product.images[0].alt;
    mainImage.appendChild(img);
    imageGallery.appendChild(mainImage);
    
    // Create thumbnails if there are multiple images
    if (product.images.length > 1) {
        const thumbnails = document.createElement('div');
        thumbnails.className = 'thumbnails';
        
        product.images.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumbnail';
            if (index === 0) thumb.classList.add('active');
            
            const thumbImg = document.createElement('img');
            thumbImg.src = image.src;
            thumbImg.alt = image.alt;
            thumb.appendChild(thumbImg);
            
            // Add click event to change the main image
            thumb.addEventListener('click', function() {
                mainImage.querySelector('img').src = image.src;
                mainImage.querySelector('img').alt = image.alt;
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            
            thumbnails.appendChild(thumb);
        });
        
        imageGallery.appendChild(thumbnails);
    }
    
    // 7. Quantity controls
    window.decreaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    };
    
    window.increaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let quantity = parseInt(quantityInput.value);
        if (quantity < 10) {
            quantityInput.value = quantity + 1;
        }
    };
    
    // 8. Favorites functionality
    const updateFavoriteButton = function() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteBtn = document.getElementById('favorite-btn');
        const icon = favoriteBtn.querySelector('i');
        
        if (favorites.some(item => item.id === productId)) {
            icon.className = 'fas fa-heart';
        } else {
            icon.className = 'far fa-heart';
        }
    };
    
    // Initialize favorite button state
    updateFavoriteButton();
    
    // Toggle favorite
    document.getElementById('favorite-btn').addEventListener('click', function() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            // Add to favorites
            favorites.push({
                id: productId,
                title: product.title,
                image: product.images[0].src,
                priceRange: `${product.prices.classic.toFixed(2)}-${product.prices.ultimate.toFixed(2)} KM`,
                description: product.tagline,
                volume: product.volume,
                addedAt: new Date().toISOString()
            });
            showNotification('Dodano u favorite ❤️');
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteButton();
        updateFavoriteCount();
    });
    
    // 9. Add to cart functionality
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const baseOilRadios = document.querySelectorAll('input[name="base-oil"]');
        let selectedBaseOil;
        
        baseOilRadios.forEach(radio => {
            if (radio.checked) {
                selectedBaseOil = radio.value;
            }
        });
        
        if (!selectedBaseOil) {
            showNotification('Molimo odaberite bazno ulje');
            return;
        }
        
        const quantity = parseInt(document.getElementById('quantity').value);
        
        // Format base oil name for display
        const baseOilNames = {
            'classic': 'Classic (Jojoba)',
            'silk': 'Silk (Japanska Kamelija)',
            'ultimate': 'Ultimate (Jojoba + Kamelija)'
        };
        
        const formattedBaseOil = baseOilNames[selectedBaseOil];
        const priceValue = product.prices[selectedBaseOil];
        
        // Create cart item
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemId = `${productId}-${selectedBaseOil}-${Date.now()}`;
        
        const newItem = {
            id: itemId,
            productId: productId,
            name: product.title,
            price: `${priceValue.toFixed(2)} KM (${formattedBaseOil})`,
            numericPrice: priceValue,
            image: product.images[0].src,
            volume: product.volume,
            quantity: quantity,
            baseOil: formattedBaseOil,
            addedAt: new Date().toISOString()
        };
        
        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showNotification('Proizvod dodan u košaricu ✨');
    });
    
    // 10. Helper functions
    // Update cart count in the header
    const updateCartCount = function() {
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
    
    // Update favorite count in the header
    const updateFavoriteCount = function() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteCount = document.getElementById('favorite-count');
        
        if (favorites.length > 0) {
            favoriteCount.style.display = 'flex';
            favoriteCount.textContent = favorites.length;
        } else {
            favoriteCount.style.display = 'none';
        }
    };
    
    // Show notification
    const showNotification = function(message) {
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
    
    // Initialize counters
    updateCartCount();
    updateFavoriteCount();
});
