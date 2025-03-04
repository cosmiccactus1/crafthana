document.addEventListener('DOMContentLoaded', function() {
    console.log('Product Page Script loaded');
    
    // 1. Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        console.error('Product ID not found in URL');
        return;
    }

    // Pronađi proizvod iz različitih izvora
    const product = 
        (window.allProducts && window.allProducts[productId]) || 
        (window.products && window.products[productId]);

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Popunjavanje detalja stranice
    document.getElementById('product-title').textContent = product.title || product.name;
    document.getElementById('product-tagline').textContent = product.tagline || product.description;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-usage').textContent = product.usage || 'Nanesite na pulsne tačke.';
    document.getElementById('product-ingredients').textContent = product.ingredients;
    document.getElementById('product-volume').textContent = product.volume;

    // Popunjavanje galerije slika
    const imageGallery = document.getElementById('image-gallery');
    if (product.images) {
        product.images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imageGallery.appendChild(imgElement);
        });
    }

    // Ažuriranje cijena baznih ulja
    if (product.prices) {
        document.getElementById('classic-price').textContent = `Ulje hladno prešane jojobe - ${product.prices.classic.toFixed(2)} KM`;
        document.getElementById('silk-price').textContent = `Ulje japanske kamelije - ${product.prices.silk.toFixed(2)} KM`;
        document.getElementById('ultimate-price').textContent = `Ulje jojobe i japanske kamelije - ${product.prices.ultimate.toFixed(2)} KM`;
    }

    // Osvježavanje breadcrumb-a
    document.getElementById('product-breadcrumb').textContent = product.title || product.name;
    document.getElementById('category-link').textContent = product.categoryType || 'Roll On EO';
    document.getElementById('category-link').href = product.categoryLink || 'rollon-eo.html';

    // Postavljanje naslova dokumenta
    document.title = `${product.title || product.name} | Crafthana`;

    // Dodavanje u košaricu
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const baseOil = document.querySelector('input[name="base-oil"]:checked')?.value || 'classic';
        const quantity = parseInt(document.getElementById('quantity')?.value) || 1;

        if (window.addToCart) {
            window.addToCart(productId, baseOil, quantity);
        } else {
            console.warn('Add to cart function not available');
            localAddToCart(product, baseOil, quantity);
        }
    });

    // Dodavanje u favorite
    document.getElementById('favorite-btn').addEventListener('click', () => {
        if (window.toggleFavorite) {
            window.toggleFavorite(productId);
        } else {
            console.warn('Toggle favorite function not available');
            localToggleFavorite(product);
        }
    });

    // Quantity kontrole
    window.increaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let currentVal = parseInt(quantityInput.value);
        quantityInput.value = Math.min(currentVal + 1, 10);
    };

    window.decreaseQuantity = function() {
        const quantityInput = document.getElementById('quantity');
        let currentVal = parseInt(quantityInput.value);
        quantityInput.value = Math.max(currentVal - 1, 1);
    };

    // Lokalna implementacija dodavanja u košaricu (fallback)
    function localAddToCart(product, baseOil, quantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const priceValue = product.prices[baseOil];

        const existingItemIndex = cartItems.findIndex(
            item => item.productId === productId && item.baseOil === baseOil
        );

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            const newItem = {
                id: `${productId}-${baseOil}-${Date.now()}`,
                productId: productId,
                name: product.title || product.name,
                price: `${priceValue.toFixed(2)} KM`,
                numericPrice: priceValue,
                image: product.images ? product.images[0].src : '',
                volume: product.volume,
                quantity: quantity,
                baseOil: baseOil,
                addedAt: new Date().toISOString()
            };
            cartItems.push(newItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount(cartItems);
        showNotification('Artikal dodan u košaricu!');
    }

    // Lokalna implementacija dodavanja u favorite (fallback)
    function localToggleFavorite(product) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);

        if (index === -1) {
            favorites.push({
                id: productId,
                name: product.title || product.name,
                image: product.images ? product.images[0].src : '',
                addedAt: new Date().toISOString()
            });
            showNotification('Dodano u favorite!');
        } else {
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita!');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus(favorites);
    }

    // Pomoćne funkcije za fallback mehanizme
    function updateCartCount(cartItems) {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    function updateFavoriteStatus(favorites) {
        const favoriteBtn = document.getElementById('favorite-btn');
        const favoriteIcon = favoriteBtn.querySelector('i');
        const favoriteCount = document.getElementById('favorite-count');

        // Osvježavanje ikone srca
        favoriteIcon.classList.toggle('fas', favorites.some(f => f.id === productId));
        favoriteIcon.classList.toggle('far', !favorites.some(f => f.id === productId));

        // Osvježavanje broja favorita
        if (favoriteCount) {
            favoriteCount.textContent = favorites.length;
            favoriteCount.style.display = favorites.length > 0 ? 'flex' : 'none';
        }
    }

    function showNotification(message) {
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
    }
});
