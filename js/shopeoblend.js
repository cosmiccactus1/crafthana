document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is loaded');
    
    // 2. Cart functions
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
        if (!productContainer) return;

        const productId = productContainer.dataset.productId;
        const name = productContainer.querySelector('h4').textContent;
        const price = productContainer.querySelector('.price').textContent;
        const image = productContainer.querySelector('.oil-image').src;
        const volume = productContainer.querySelector('.volume').textContent;
        const description = productContainer.querySelector('.blend-character').textContent;

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
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

    // 3. Favorite functions
    const updateFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelectorAll('.favorite-icon').forEach(button => {
            const productId = button.closest('.oil-item').dataset.productId;
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
        if (!productContainer) return;

        const productId = productContainer.dataset.productId;
        const name = productContainer.querySelector('h4').textContent;
        const price = productContainer.querySelector('.price').textContent;
        const image = productContainer.querySelector('.oil-image').src;
        const volume = productContainer.querySelector('.volume').textContent;
        const description = productContainer.querySelector('.blend-character').textContent;
        
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
    initializeEventListeners();
    updateCartCount();
    updateFavoriteStatus();
});
