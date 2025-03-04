document.addEventListener('DOMContentLoaded', function() {
    // 1. Dohvati ID proizvoda iz URL-a
    const productId = getProductIdFromUrl();
    
    // 2. Ako nema ID-a, prikaži poruku o grešci
    if (!productId) {
        showErrorMessage('Proizvod nije pronađen. Molimo provjerite URL.');
        return;
    }
    
    // 3. Dohvati podatke o proizvodu iz različitih izvora
    const product = 
        window.allProducts?.[productId] || 
        window.products?.[productId];
    
    // 4. Ako proizvod ne postoji, prikaži poruku o grešci
    if (!product) {
        showErrorMessage(`Proizvod s ID-om "${productId}" nije pronađen.`);
        return;
    }
    
    // 5. Popuni stranicu s podacima o proizvodu
    populateProductPage(product);
    
    // 6. Postavi event listenere za interakcije
    setupEventListeners(product);
    
    // 7. Inicijaliziraj brojače korpe i favorita
    updateCartCount();
    updateFavoriteCount();
    
    // 8. Provjeri je li proizvod već u favoritima
    checkIfFavorite(product.id);
});

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function showErrorMessage(message) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = `
        <div class="error-message">
            <h2>Greška</h2>
            <p>${message}</p>
            <p>Vratite se na <a href="shop.html">shop stranicu</a> i pokušajte ponovo.</p>
        </div>
    `;
}

function populateProductPage(product) {
    document.getElementById('document-title').textContent = `${product.title} - Essential Oil Roll On | Crafthana`;
    
    document.getElementById('product-breadcrumb').textContent = product.title;
    document.getElementById('category-link').textContent = product.categoryType || product.category;
    document.getElementById('category-link').href = product.categoryLink || 'rollon-eo.html';
    
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    
    if (product.usage) {
        document.getElementById('product-usage').textContent = product.usage;
    }
    
    document.getElementById('product-ingredients').textContent = product.ingredients;
    
    document.getElementById('classic-price').textContent = `Ulje hladno prešane jojobe - ${product.prices.classic.toFixed(2)} KM`;
    document.getElementById('silk-price').textContent = `Ulje japanske kamelije - ${product.prices.silk.toFixed(2)} KM`;
    document.getElementById('ultimate-price').textContent = `Ulje jojobe i japanske kamelije - ${product.prices.ultimate.toFixed(2)} KM`;
    
    createImageGallery(product.images);
}

function createImageGallery(images) {
    const galleryContainer = document.getElementById('image-gallery');
    galleryContainer.innerHTML = '';
    
    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-image';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.className = 'product-image';
        
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });
}

function setupEventListeners(product) {
    document.getElementById('add-to-cart-btn').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        const baseOil = document.querySelector('input[name="base-oil"]:checked').value;
        
        addToCart(product, quantity, baseOil);
    });
    
    document.getElementById('favorite-btn').addEventListener('click', function() {
        toggleFavorite(product);
    });
}

function addToCart(product, quantity, baseOil) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const price = product.prices[baseOil];
    const baseOilName = getBaseOilName(baseOil);
    
    const existingItemIndex = cartItems.findIndex(item => 
        item.productId === product.id && item.baseOil === baseOil
    );
    
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push({
            id: `${product.id}-${baseOil}-${Date.now()}`,
            productId: product.id,
            name: product.title,
            baseOil: baseOil,
            baseOilName: baseOilName,
            price: `${price.toFixed(2)} KM (${baseOilName})`,
            numericPrice: price,
            quantity: quantity,
            image: product.images[0].src,
            volume: product.volume,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    showToast(`${product.title} je dodan u vašu košaricu!`);
}

function toggleFavorite(product) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = favoriteBtn.querySelector('i');
    
    const existingIndex = favorites.findIndex(fav => fav.id === product.id);
    
    if (existingIndex !== -1) {
        favorites.splice(existingIndex, 1);
        heartIcon.className = 'far fa-heart';
        showToast('Proizvod je uklonjen iz favorita');
    } else {
        favorites.push({
            id: product.id,
            name: product.title,
            image: product.images[0].src,
            price: `${Object.values(product.prices).join('-')} KM`,
            addedAt: new Date().toISOString()
        });
        heartIcon.className = 'fas fa-heart';
        showToast('Proizvod je dodan u favorite');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();
}

function checkIfFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = favoriteBtn.querySelector('i');
    
    const isFavorite = favorites.some(fav => fav.id === productId);
    heartIcon.className = isFavorite ? 'fas fa-heart' : 'far fa-heart';
}

function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'flex' : 'none';
    });
}

function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCountElement = document.getElementById('favorite-count');
    
    if (favoriteCountElement) {
        favoriteCountElement.textContent = favorites.length;
        favoriteCountElement.style.display = favorites.length > 0 ? 'flex' : 'none';
    }
}

function getBaseOilName(baseOilCode) {
    const baseOils = {
        'classic': 'Classic (Jojoba)',
        'silk': 'Silk (Japanska Kamelija)',
        'ultimate': 'Ultimate (Jojoba + Kamelija)'
    };
    
    return baseOils[baseOilCode] || baseOilCode;
}

function showToast(message, duration = 3000) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}
