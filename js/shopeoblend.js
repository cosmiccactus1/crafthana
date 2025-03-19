// shopeoblend.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Essential Oil Shop Script Loaded');
    
    // 1. Products object
    const products = {
        'vanilla-jasmine': {
            id: 'vanilla-jasmine',
            name: 'Vanilla • Jasmine',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Slatka, cvjetna harmonija',
            category: '2 Blend Roll On'
        },
        'pine-cedarwood': {
            id: 'pine-cedarwood',
            name: 'Pine Needle • Cedarwood',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Svježa šumska harmonija',
            category: '2 Blend Roll On'
        },
        'bergamot-vanilla': {
            id: 'bergamot-vanilla',
            name: 'Bergamot • Vanilla',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Slatka citrusna elegancija',
            category: '2 Blend Roll On'
        },
        'myrrh-vanilla': {
            id: 'myrrh-vanilla',
            name: 'Myrrh • Vanilla',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Topla orijentalna slatkoća',
            category: '2 Blend Roll On'
        },
        'pine-cedarwood-bergamot-vanilla': {
            id: 'pine-cedarwood-bergamot-vanilla',
            name: 'Pine • Cedarwood • Bergamot • Vanilla',
            price: 9.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Šumsko-slatka harmonija',
            category: '4 Blend Roll On'
        },
        
        // Special Blendovi
        'planinska-koliba': {
            id: 'planinska-koliba',
            name: 'Planinska Koliba',
            price: 11.99,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Prirodna harmonija borova i topline',
            category: 'Special Blendovi'
        },
        'special-narandza': {
            id: 'special-narandza',
            name: 'Special narandža',
            price: 11.99,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Nostalgična kombinacija čokolade i naranče',
            category: 'Special Blendovi'
        },
        'cejf': {
            id: 'cejf',
            name: 'Ćejf',
            price: 11.99,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Bosanska riječ koja opisuje najveći stepen zadovoljstva',
            category: 'Special Blendovi'
        }
    };
    
    // 2. Cart functions
    const updateCartCount = () => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const count = cartItems.reduce((total, item) => total + (parseInt(item.quantity) || 1), 0);
        
        document.querySelectorAll('.cart-count').forEach(el => {
            if (count > 0) {
                el.style.display = 'flex';
                el.textContent = count;
            } else {
                el.style.display = 'none';
            }
        });
    };
    
    const addToCart = (productId, quantity = 1) => {
        const product = products[productId];
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Dodajemo u format koji koristimo na drugim stranicama
        const itemId = `${productId}-${Date.now()}`;
        const newItem = {
            id: itemId,
            productId: productId,
            name: product.name,
            description: product.description,
            price: product.price.toFixed(2) + " KM",
            priceValue: product.price,
            image: product.image,
            volume: product.volume,
            quantity: quantity,
            totalPrice: (product.price * quantity).toFixed(2) + " KM",
            type: "essential-oil-blend",
            category: product.category,
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
    
    const toggleFavorite = (productId) => {
        const product = products[productId];
        if (!product) {
            console.error('Proizvod nije pronađen:', productId);
            return;
        }
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            favorites.push({
                ...product,
                price: product.price.toFixed(2) + " KM",
                priceValue: product.price,
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
    
    // 4. Helper functions
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
    
    // 5. Event Listeners
    const initializeEventListeners = () => {
        // Dugmad za dodavanje u korpu
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const productContainer = button.closest('.oil-item');
                if (!productContainer) return;
                
                const productId = productContainer.dataset.productId;
                if (!productId) return;
                
                console.log('Kliknuto na "Dodaj u ceger" za proizvod:', productId);
                
                // Direktno dodaj u korpu bez modalnog prozora
                addToCart(productId, 1);
            });
        });
        
        // Dugmad za favorite
        document.querySelectorAll('.favorite-icon').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const productContainer = button.closest('.oil-item');
                if (!productContainer) return;
                
                const productId = productContainer.dataset.productId;
                if (productId) {
                    toggleFavorite(productId);
                }
            });
        });
    };
    
    // 6. Inicijalizacija stranice
    updateCartCount();
    updateFavoriteStatus();
    initializeEventListeners();
    
    console.log('Essential Oil Shop Script has been initialized');
});
