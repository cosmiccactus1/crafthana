/**
 * Skripta za učitavanje podataka o Essential Oil proizvodima na stranici proizvoda
 */

// Funkcija za učitavanje slika u galeriju
function loadProductImages(images) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    // Postavi glavnu sliku
    mainImage.src = images[0].src;
    mainImage.alt = images[0].alt;
    
    // Očisti postojeće thumbnailove
    thumbnailsContainer.innerHTML = '';
    
    // Dodaj thumbnailove
    images.forEach((image, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumbnail';
        
        // Dodavanje klase 'active' za prvu sliku
        if (index === 0) {
            thumbDiv.classList.add('active');
        }
        
        const thumbImg = document.createElement('img');
        thumbImg.src = image.src;
        thumbImg.alt = image.alt;
        
        // Event listener za klik na thumbnail
        thumbDiv.addEventListener('click', () => {
            // Promjena glavne slike
            mainImage.src = image.src;
            mainImage.alt = image.alt;
            
            // Resetiranje active klase na svim thumbnailima
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Postavljanje active klase na kliknuti thumbnail
            thumbDiv.classList.add('active');
        });
        
        thumbDiv.appendChild(thumbImg);
        thumbnailsContainer.appendChild(thumbDiv);
    });
}

// Funkcija za prikaz prednosti proizvoda
function loadProductBenefits(benefits) {
    const benefitsList = document.getElementById('product-benefits');
    benefitsList.innerHTML = ''; // Očisti postojeće prednosti
    
    benefits.forEach(benefit => {
        const benefitItem = document.createElement('li');
        benefitItem.textContent = benefit;
        benefitsList.appendChild(benefitItem);
    });
}

// Glavna funkcija za učitavanje proizvoda
function loadProduct() {
    // Dohvati ID proizvoda iz URL-a
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Ako nema ID-a, preusmjeri na stranicu kategorije
    if (!productId) {
        window.location.href = 'essential-oil.html';
        return;
    }
    
    // Dohvati podatke o proizvodu
    const product = allEOProducts[productId];
    
    // Ako proizvod ne postoji, preusmjeri na stranicu kategorije
    if (!product) {
        window.location.href = 'essential-oil.html';
        return;
    }
    
    // Postavi naslov dokumenta
    document.getElementById('document-title').textContent = product.title + ' | Crafthana';
    
    // Postavi breadcrumb
    document.getElementById('product-breadcrumb').textContent = product.title;
    document.getElementById('category-link').textContent = 'Essential Oil';
    document.getElementById('category-link').href = product.categoryLink;
    
    // Postavi detalje proizvoda
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-usage').textContent = product.usage;
    document.getElementById('product-ingredients').textContent = product.ingredients;
    document.getElementById('product-price').textContent = product.price.toFixed(2) + ' KM';
    
    // Učitaj slike
    loadProductImages(product.images);
    
    // Učitaj prednosti
    loadProductBenefits(product.benefits);
    
    // Postavi funkcionalnost za favorit i dodavanje u košaricu
    setupFavoriteFunctionality(productId);
    setupCartFunctionality(productId, product);
}

// Funkcija za postavljanje funkcionalnosti favorita
function setupFavoriteFunctionality(productId) {
    const favoriteBtn = document.getElementById('favorite-btn');
    
    // Provjeri je li proizvod već u favoritima
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isInFavorites = favorites.some(item => item.id === productId);
    
    // Postavi odgovarajuću ikonu
    if (isInFavorites) {
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
    
    // Event listener za klik na gumb favorita
    favoriteBtn.addEventListener('click', () => {
        toggleFavorite(productId, favoriteBtn);
    });
}

// Funkcija za dodavanje/uklanjanje iz favorita
function toggleFavorite(productId, button) {
    const product = allEOProducts[productId];
    if (!product) return;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = favorites.findIndex(item => item.id === productId);
    
    if (index > -1) {
        // Ukloni iz favorita
        favorites.splice(index, 1);
        button.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Uklonjeno iz favorita 💔');
    } else {
        // Dodaj u favorite s formatom podataka koji se koristi na drugim stranicama
        favorites.push({
            id: productId,
            name: product.title,
            price: product.price.toFixed(2) + " KM",
            priceValue: product.price,
            image: product.images[0].src,
            volume: product.volume,
            description: product.tagline,
            category: product.categoryType,
            addedAt: new Date().toISOString()
        });
        button.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Dodano u favorite ❤️');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteCount();
}

// Funkcija za ažuriranje broja favorita
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCount = document.getElementById('favorite-count');
    if (favorites.length > 0) {
        favoriteCount.style.display = 'flex';
        favoriteCount.textContent = favorites.length;
    } else {
        favoriteCount.style.display = 'none';
    }
}

// Funkcionalnost za košaricu
function setupCartFunctionality(productId, product) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const quantityInput = document.getElementById('quantity');
    
    // Event listener za klik na gumb za dodavanje u košaricu
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        addToCart(productId, product, quantity);
    });
}

// Funkcija za dodavanje u košaricu
function addToCart(productId, product, quantity) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Format koji odgovara ostalim stranicama
    const itemId = `${productId}-${Date.now()}`;
    const newItem = {
        id: itemId,
        productId: productId,
        name: product.title,
        description: product.tagline,
        price: product.price.toFixed(2) + " KM",
        priceValue: product.price,
        image: product.images[0].src,
        volume: product.volume,
        quantity: quantity,
        totalPrice: (product.price * quantity).toFixed(2) + " KM",
        type: "essential-oil",
        category: product.categoryType,
        addedAt: new Date().toISOString()
    };
    
    cartItems.push(newItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Ažuriraj broj proizvoda u košarici
    updateCartCount();
    
    // Prikaži obavještenje
    showNotification('Proizvod dodan u košaricu ✨');
}

// Funkcija za ažuriranje broja proizvoda u košarici
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    const totalCount = cartItems.reduce((total, item) => total + (parseInt(item.quantity) || 1), 0);
    if (totalCount > 0) {
        cartCount.style.display = 'flex';
        cartCount.textContent = totalCount;
    } else {
        cartCount.style.display = 'none';
    }
}

// Funkcije za povećanje i smanjenje količine
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
        quantityInput.value = quantity + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
}

// Funkcija za prikaz obavještenja (dodana)
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

// Inicijalizacija kada se stranica učita
document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    updateCartCount();
    updateFavoriteCount();
});
