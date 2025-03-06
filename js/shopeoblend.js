document.addEventListener('DOMContentLoaded', function() {
    console.log('Essential Oil Shop Script Loaded');
    
    // 1. Cart functions
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

    const addToCart = (clickedButton) => {
        const productContainer = clickedButton.closest('.oil-item');
        if (!productContainer) {
            console.error('Product container not found');
            return;
        }

        // Check if all required elements exist
        const productId = productContainer.dataset.productId;
        const nameElement = productContainer.querySelector('h4');
        const priceElement = productContainer.querySelector('.price');
        const imageElement = productContainer.querySelector('.oil-image');
        const volumeElement = productContainer.querySelector('.volume');
        const descriptionElement = productContainer.querySelector('.blend-character');

        // Log the elements for debugging
        console.log('Product ID:', productId);
        console.log('Name Element:', nameElement);
        console.log('Price Element:', priceElement);
        console.log('Image Element:', imageElement);
        console.log('Volume Element:', volumeElement);
        console.log('Description Element:', descriptionElement);

        if (!nameElement || !priceElement || !imageElement || !volumeElement || !descriptionElement) {
            console.error('Required elements not found');
            return;
        }

        const name = nameElement.textContent;
        const price = priceElement.textContent;
        const image = imageElement.src;
        const volume = volumeElement.textContent;
        const description = descriptionElement.textContent;

        // Log the extracted values for debugging
        console.log('Name:', name);
        console.log('Price:', price);
        console.log('Image:', image);
        console.log('Volume:', volume);
        console.log('Description:', description);

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Generate a unique ID for this cart item
        const itemId = `${productId}-${Date.now()}`;
        
        const newItem = {
            id: itemId,
            productId: productId,
            name: name,
            price: price,
            image: image,
            volume: volume,
            description: description,
            quantity: 1,
            addedAt: new Date().toISOString()
        };

        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        showNotification('Proizvod dodan u košaricu ✨');
        console.log('Added item to cart:', newItem);
    };

    // 2. Favorite functions
    const updateFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelectorAll('.favorite-icon').forEach(button => {
            const productId = button.closest('.oil-item')?.dataset.productId;
            if (!productId) return;
            
            const icon = button.querySelector('i');
            if (icon) {
                const isFavorite = favorites.some(item => item.id === productId);
                icon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
            }
        });
        
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

    const toggleFavorite = (button) => {
        const productContainer = button.closest('.oil-item');
        if (!productContainer) {
            console.error('Product container not found');
            return;
        }

        // Check if all required elements exist
        const productId = productContainer.dataset.productId;
        const nameElement = productContainer.querySelector('h4');
        const priceElement = productContainer.querySelector('.price');
        const imageElement = productContainer.querySelector('.oil-image');
        const volumeElement = productContainer.querySelector('.volume');
        const descriptionElement = productContainer.querySelector('.blend-character');

        if (!nameElement || !priceElement || !imageElement || !volumeElement || !descriptionElement) {
            console.error('Required elements not found');
            return;
        }

        const name = nameElement.textContent;
        const price = priceElement.textContent;
        const image = imageElement.src;
        const volume = volumeElement.textContent;
        const description = descriptionElement.textContent;
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            favorites.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                volume: volume,
                description: description,
                addedAt: new Date().toISOString()
            });
            showNotification('Dodano u favorite ❤️');
        } else {
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
    };

    // 3. Link handler for product details pages
    const initializeProductLinks = () => {
        document.querySelectorAll('.oil-item').forEach(item => {
            const productId = item.dataset.productId;
            const imageContainer = item.querySelector('.image-container');
            const image = imageContainer.querySelector('img');
            
            // If there's already an anchor tag, update its href
            const existingAnchor = imageContainer.querySelector('a');
            if (existingAnchor) {
                existingAnchor.href = `product-eo.html?id=${productId}`;
            } 
            // Otherwise wrap the image in a new anchor tag
            else if (image) {
                const anchor = document.createElement('a');
                anchor.href = `product-eo.html?id=${productId}`;
                
                // Clone the image and replace it with the wrapped version
                const imageClone = image.cloneNode(true);
                image.parentNode.replaceChild(anchor, image);
                anchor.appendChild(imageClone);
            }
        });
    };

    // 4. Event Listeners
    const initializeEventListeners = () => {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(button);
            });
        });

        // Favorite buttons
        document.querySelectorAll('.favorite-icon').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                toggleFavorite(button);
            });
        });
    };

    // 5. Helper functions
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

    // 6. Initialize everything
    initializeProductLinks();
    initializeEventListeners();
    updateCartCount();
    updateFavoriteStatus();
});
