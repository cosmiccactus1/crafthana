/**
 * Script koji dinamički učitava podatke o proizvodu na temelju ID-a iz URL-a
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Dohvati ID proizvoda iz URL-a
    const productId = getProductIdFromUrl();
    
    // 2. Ako nema ID-a, prikaži poruku o grešci
    if (!productId) {
        showErrorMessage('Proizvod nije pronađen. Molimo provjerite URL.');
        return;
    }
    
    // 3. Dohvati podatke o proizvodu iz baze podataka
    const product = allProducts[productId];
    
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

/**
 * Dohvaća ID proizvoda iz URL-a
 * Na primjer, iz URL-a product.html?id=patchouli-cedarwood dohvaća "patchouli-cedarwood"
 */
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Prikazuje poruku o grešci
 */
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

/**
 * Popunjava stranicu s podacima o proizvodu
 */
function populateProductPage(product) {
    // Postavi naslov stranice (tab u browseru)
    document.getElementById('document-title').textContent = `${product.title} - Essential Oil Roll On | Crafthana`;
    
    // Postavi breadcrumbs
    document.getElementById('product-breadcrumb').textContent = product.title;
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('category-link').href = product.categoryLink;
    
    // Postavi osnovne informacije o proizvodu
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    
    // Postavi način korištenja
    if (product.usage) {
        document.getElementById('product-usage').textContent = product.usage;
    }
    
    // Postavi sastojke
    document.getElementById('product-ingredients').textContent = product.ingredients;
    
    // Postavi cijene za različite opcije baznog ulja
    document.getElementById('classic-price').textContent = `Ulje hladno prešane jojobe - ${product.prices.classic.toFixed(2)} KM`;
    document.getElementById('silk-price').textContent = `Ulje japanske kamelije - ${product.prices.silk.toFixed(2)} KM`;
    document.getElementById('ultimate-price').textContent = `Ulje jojobe i japanske kamelije - ${product.prices.ultimate.toFixed(2)} KM`;
    
    // Postavi ID-eve za gumbe
    document.getElementById('add-to-cart-btn').setAttribute('data-product-id', product.id);
    document.getElementById('favorite-btn').setAttribute('data-product-id', product.id);
    
    // Generiraj galeriju slika
    createImageGallery(product.images);
}

/**
 * Kreira galeriju slika za proizvod
 */
function createImageGallery(images) {
    const galleryContainer = document.getElementById('image-gallery');
    galleryContainer.innerHTML = ''; // Očisti postojeće slike
    
    // Dodaj svaku sliku u galeriju
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

/**
 * Postavlja event listenere za interaktivne elemente
 */
function setupEventListeners(product) {
    // Dodavanje u košaricu
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        const baseOil = document.querySelector('input[name="base-oil"]:checked').value;
        
        addToCart(product, quantity, baseOil);
    });
    
    // Dodavanje u favorite
    const favoriteBtn = document.getElementById('favorite-btn');
    favoriteBtn.addEventListener('click', function() {
        toggleFavorite(product.id);
    });
}

/**
 * Dodaje proizvod u košaricu
 */
function addToCart(product, quantity, baseOil) {
    // Dohvati postojeću košaricu iz localStorage ili inicijaliziraj praznu
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Izračunaj cijenu ovisno o odabranom baznom ulju
    const price = product.prices[baseOil];
    
    // Provjeri je li proizvod s istim baznim uljem već u košarici
    const existingItemIndex = cart.findIndex(item => 
        item.productId === product.id && item.baseOil === baseOil
    );
    
    if (existingItemIndex !== -1) {
        // Ako je proizvod već u košarici, samo povećaj količinu
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Ako nije, dodaj novi proizvod u košaricu
        cart.push({
            productId: product.id,
            title: product.title,
            baseOil: baseOil,
            baseOilName: getBaseOilName(baseOil),
            price: price,
            quantity: quantity,
            image: product.images[0].src,
            dateAdded: new Date().toISOString()
        });
    }
    
    // Spremi ažuriranu košaricu u localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Ažuriraj brojač košarice
    updateCartCount();
    
    // Prikaži poruku o uspjehu
    showToast(`${product.title} je dodan u vašu košaricu!`);
}

/**
 * Vraća naziv baznog ulja na osnovu koda
 */
function getBaseOilName(baseOilCode) {
    const baseOils = {
        'classic': 'Classic - Ulje hladno prešane jojobe',
        'silk': 'Silk - Ulje japanske kamelije',
        'ultimate': 'Ultimate - Ulje jojobe i japanske kamelije'
    };
    
    return baseOils[baseOilCode] || baseOilCode;
}

/**
 * Dodaje/uklanja proizvod iz favorita
 */
function toggleFavorite(productId) {
    // Dohvati postojeće favorite iz localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Provjeri je li proizvod već u favoritima
    const index = favorites.indexOf(productId);
    const favoriteBtn = document.getElementById('favorite-btn');
    const heartIcon = favoriteBtn.querySelector('i');
    
    if (index !== -1) {
        // Ako je proizvod već u favoritima, ukloni ga
        favorites.splice(index, 1);
        heartIcon.className = 'far fa-heart';
        showToast('Proizvod je uklonjen iz favorita');
    } else {
        // Ako nije, dodaj ga u favorite
        favorites.push(productId);
        heartIcon.className = 'fas fa-heart';
        showToast('Proizvod je dodan u favorite');
    }
    
    // Spremi ažurirane favorite u localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Ažuriraj brojač favorita
    updateFavoriteCount();
}

/**
 * Provjeri je li proizvod već u favoritima i ažuriraj ikonu srca
 */
function checkIfFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        const favoriteBtn = document.getElementById('favorite-btn');
        const heartIcon = favoriteBtn.querySelector('i');
        heartIcon.className = 'fas fa-heart';
    }
}

/**
 * Ažurira brojač proizvoda u košarici
 */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    
    const countElements = document.querySelectorAll('.cart-count');
    countElements.forEach(element => {
        element.textContent = count;
    });
}

/**
 * Ažurira brojač favorita
 */
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const count = favorites.length;
    
    const favoriteCountElement = document.getElementById('favorite-count');
    if (favoriteCountElement) {
        favoriteCountElement.textContent = count;
    }
}

/**
 * Funkcija za povećanje količine
 */
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

/**
 * Funkcija za smanjenje količine
 */
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

/**
 * Prikazuje toast poruku
 */
function showToast(message, duration = 3000) {
    // Ako već postoji toast, ukloni ga
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Kreiraj novi toast
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    // Dodaj toast u DOM
    document.body.appendChild(toast);
    
    // Animiraj prikazivanje toasta
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Sakrij toast nakon određenog vremena
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}
