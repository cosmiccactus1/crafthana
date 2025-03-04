// product-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Dohvaćanje ID-a proizvoda iz URL-a
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    // Ako proizvod nije pronađen, preusmjeri na stranicu trgovine
    if (!productId || !allProducts[productId]) {
        console.error('Proizvod nije pronađen');
        // Opcionalno: preusmjeri na shop stranicu
        // window.location.href = 'shop.html';
        return;
    }
    
    // 2. Učitavanje podataka o proizvodu
    const product = allProducts[productId];
    
    // Ažuriranje naslova stranice
    document.getElementById('document-title').textContent = `${product.title} | Crafthana`;
    
    // 3. Ažuriranje putanje (breadcrumbs)
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('category-link').href = product.categoryLink;
    document.getElementById('product-breadcrumb').textContent = product.title;
    
    // 4. Ažuriranje detalja o proizvodu
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-usage').textContent = product.usage;
    document.getElementById('product-ingredients').textContent = product.ingredients;
    
    // 5. Ažuriranje opcija cijena
    document.getElementById('classic-price').textContent = `Ulje hladno prešane jojobe - ${product.prices.classic.toFixed(2)} KM`;
    document.getElementById('silk-price').textContent = `Ulje japanske kamelije - ${product.prices.silk.toFixed(2)} KM`;
    document.getElementById('ultimate-price').textContent = `Ulje jojobe i japanske kamelije - ${product.prices.ultimate.toFixed(2)} KM`;
    
    // 6. Učitavanje slika proizvoda - ISPRAVLJENO: samo jedna slika po kontejneru
    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = ''; // Očisti galeriju

    // Provjera ima li proizvod slika
    if (product.images && product.images.length > 0) {
        // Za svaku sliku kreiramo zaseban kontejner
        product.images.forEach((image, index) => {
            const imageContainer = document.createElement('div');
            
            // Prva slika nema okvir, ostale imaju
            if (index === 0) {
                imageContainer.className = 'main-image';
            } else {
                imageContainer.className = 'additional-image';
            }
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            
            imageContainer.appendChild(img);
            imageGallery.appendChild(imageContainer);
        });
    } else {
        // Rezervna opcija ako nema slika
        const noImageDiv = document.createElement('div');
        noImageDiv.className = 'no-image';
        noImageDiv.textContent = 'Slika nije dostupna';
        imageGallery.appendChild(noImageDiv);
    }
    
    // 7. Kontrole za količinu
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
    
    // 8. Funkcionalnost favorita
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
    
    // Inicijalizacija stanja dugmeta za favorite
    updateFavoriteButton();
    
    // Promjena stanja favorita
    document.getElementById('favorite-btn').addEventListener('click', function() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            // Dodaj u favorite
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
            // Ukloni iz favorita
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteButton();
        updateFavoriteCount();
    });
    
    // 9. Funkcionalnost dodavanja u korpu
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
        
        // Formatiranje naziva baznog ulja za prikaz
        const baseOilNames = {
            'classic': 'Classic (Jojoba)',
            'silk': 'Silk (Japanska Kamelija)',
            'ultimate': 'Ultimate (Jojoba + Kamelija)'
        };
        
        const formattedBaseOil = baseOilNames[selectedBaseOil];
        const priceValue = product.prices[selectedBaseOil];
        
        // Kreiranje stavke za korpu
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
    
    // 10. Pomoćne funkcije
    // Ažuriranje broja stavki u korpi
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
    
    // Ažuriranje broja favorita
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
    
    // Prikaz notifikacije
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
    
    // Inicijalizacija brojača
    updateCartCount();
    updateFavoriteCount();
});
