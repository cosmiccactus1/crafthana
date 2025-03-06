document.addEventListener('DOMContentLoaded', function() {
    console.log('Essential Oil Shop Script Loaded');
    
    // 1. Modalni prozori
    const openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('Modal nije pronađen:', modalId);
            return;
        }
        
        modal.style.display = 'block';
        
        // Dugmad za količinu
        const minusBtn = modal.querySelector('.quantity-btn.minus');
        const plusBtn = modal.querySelector('.quantity-btn.plus');
        const quantityInput = modal.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && quantityInput) {
            minusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantityInput.value);
                if (quantity < 10) {
                    quantityInput.value = quantity + 1;
                }
            });
        }
        
        // Zatvaranje modala klikom na X
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };
        }
        
        // Zatvaranje modala klikom izvan njega
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
        
        // Dodavanje u korpu
        const form = modal.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Dobijanje informacija o proizvodu iz data atributa
                const productId = modalId.replace('modal-', '');
                const oilItem = document.querySelector(`.oil-item[data-product-id="${productId}"]`);
                
                if (!oilItem) {
                    console.error('Proizvod nije pronađen:', productId);
                    return;
                }
                
                // Dobijanje informacija o proizvodu
                const name = oilItem.querySelector('h4').textContent;
                const description = oilItem.querySelector('.blend-character').textContent;
                const volume = oilItem.querySelector('.volume').textContent;
                const image = oilItem.querySelector('.oil-image').src;
                
                // Dobijanje odabrane opcije i cijene
                const selectedOption = form.querySelector('input[name="bottle-size"]:checked');
                const priceLabel = selectedOption.parentElement.textContent.trim();
                const priceRegex = /(\d+(\.\d+)?) KM/;
                const priceMatch = priceLabel.match(priceRegex);
                const price = priceMatch ? priceMatch[1] : "0.00";
                
                // Dobijanje količine
                const quantity = parseInt(quantityInput.value);
                
                // Kreiranje objekta za korpu
                const cartItem = {
                    id: `${productId}-${Date.now()}`,
                    productId: productId,
                    name: name,
                    price: price,
                    image: image,
                    volume: volume,
                    description: description,
                    quantity: quantity,
                    addedAt: new Date().toISOString()
                };
                
                // Dodavanje u lokalnu memoriju
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                cartItems.push(cartItem);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                
                // Ažuriranje brojača korpe
                updateCartCount();
                
                // Zatvaranje modala
                modal.style.display = 'none';
                
                // Prikazivanje obavještenja
                showNotification('Proizvod dodan u košaricu ✨');
            });
        }
    };
    
    // 2. Funkcije za korpu
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const count = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
        
        document.querySelectorAll('.cart-count').forEach(el => {
            if (count > 0) {
                el.style.display = 'flex';
                el.textContent = count;
            } else {
                el.style.display = 'none';
            }
        });
    };
    
    // 3. Funkcije za favorite
    const updateFavoriteStatus = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        
        document.querySelectorAll('.favorite-icon').forEach(button => {
            const productContainer = button.closest('.oil-item');
            if (!productContainer) return;
            
            const productId = productContainer.dataset.productId;
            const icon = button.querySelector('i');
            
            if (productId && icon) {
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
        const nameElement = productContainer.querySelector('h4');
        const priceElement = productContainer.querySelector('.price');
        const imageElement = productContainer.querySelector('.oil-image');
        const volumeElement = productContainer.querySelector('.volume');
        const descriptionElement = productContainer.querySelector('.blend-character');
        
        if (!nameElement || !priceElement || !imageElement || !volumeElement || !descriptionElement) {
            console.error('Potrebni elementi nisu pronađeni');
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
    
    // 4. Pomoćne funkcije
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
    
    // 5. Inicijalizacija event listenera
    const initializeEventListeners = () => {
        // Dugmad za dodavanje u korpu
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const productContainer = button.closest('.oil-item');
                if (!productContainer) return;
                
                const productId = productContainer.dataset.productId;
                if (!productId) return;
                
                const modalId = `modal-${productId}`;
                openModal(modalId);
            });
        });
        
        // Dugmad za favorite
        document.querySelectorAll('.favorite-icon').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                toggleFavorite(button);
            });
        });
    };
    
    // 6. Inicijalizacija stranice
    updateCartCount();
    updateFavoriteStatus();
    initializeEventListeners();
});
