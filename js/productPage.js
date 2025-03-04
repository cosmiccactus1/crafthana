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
    document.getElementById('product-usage').textContent = product.usage;
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

    // Dodavanje eventa za dodavanje u košaricu
    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const baseOil = document.querySelector('input[name="base-oil"]:checked')?.value || 'classic';
        const quantity = parseInt(document.getElementById('quantity')?.value) || 1;

        if (window.addToCart && typeof window.addToCart === 'function') {
            window.addToCart(productId, baseOil, quantity);
        } else {
            // Fallback mehanizam ako global funkcija nije dostupna
            console.warn('Global addToCart function not found. Using local implementation.');
            addToCartLocally(product, baseOil, quantity);
        }
    });

    // Dodavanje eventa za favorite
    document.getElementById('favorite-btn').addEventListener('click', () => {
        if (window.toggleFavorite && typeof window.toggleFavorite === 'function') {
            window.toggleFavorite(productId);
        } else {
            // Fallback mehanizam
            console.warn('Global toggleFavorite function not found. Using local implementation.');
            toggleFavoriteLocally(product);
        }
    });

    // Lokalna implementacija dodavanja u košaricu (fallback)
    function addToCartLocally(product, baseOil, quantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const priceValue = product.prices[baseOil];

        const newItem = {
            id: `${productId}-${baseOil}-${Date.now()}`,
            productId: productId,
            name: product.title || product.name,
            price: `${priceValue.toFixed(2)} KM`,
            quantity: quantity,
            baseOil: baseOil
        };

        cartItems.push(newItem);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Osnovno osvježavanje broja artikala
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
            cartCount.style.display = 'block';
        }

        alert('Artikal dodan u košaricu!');
    }

    // Lokalna implementacija dodavanja u favorite (fallback)
    function toggleFavoriteLocally(product) {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(fav => fav.id === productId);

        if (index === -1) {
            favorites.push({
                id: productId,
                name: product.title || product.name,
                image: product.images ? product.images[0].src : '',
                addedAt: new Date().toISOString()
            });
            alert('Dodano u favorite!');
        } else {
            favorites.splice(index, 1);
            alert('Uklonjeno iz favorita!');
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Osvježavanje ikone srca
        const favoriteIcon = document.querySelector('.favorite-button i');
        if (favoriteIcon) {
            favoriteIcon.classList.toggle('fas');
            favoriteIcon.classList.toggle('far');
        }

        // Osvježavanje broja favorita
        const favoriteCount = document.getElementById('favorite-count');
        if (favoriteCount) {
            favoriteCount.textContent = favorites.length;
            favoriteCount.style.display = favorites.length > 0 ? 'block' : 'none';
        }
    }

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
});
