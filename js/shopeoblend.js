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
        'patchouli-cedarwood': {
            id: 'patchouli-cedarwood',
            name: 'Patchouli • Cedarwood',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Zemljana nota sa drvenastim prizvukom',
            category: '2 Blend Roll On'
        },
        'bergamot-ylang': {
            id: 'bergamot-ylang',
            name: 'Bergamot • Ylang Ylang',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Svježa cvjetna harmonija',
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
        'sandalwood-jasmine': {
            id: 'sandalwood-jasmine',
            name: 'Sandalwood • Jasmine',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Orijentalna cvjetna harmonija',
            category: '2 Blend Roll On'
        },
        'patchouli-bergamot': {
            id: 'patchouli-bergamot',
            name: 'Patchouli • Bergamot',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Zemljana svježina citrus nota',
            category: '2 Blend Roll On'
        },
        'frankincense-myrrh': {
            id: 'frankincense-myrrh',
            name: 'Frankincense • Myrrh',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Drevna mistična harmonija',
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
        'ylang-frankincense': {
            id: 'ylang-frankincense',
            name: 'Ylang Ylang • Frankincense',
            price: 8.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Egzotična drevna čarolija',
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
        
        // 3 Blend proizvodi
        'bergamot-ylang-sandalwood': {
            id: 'bergamot-ylang-sandalwood',
            name: 'Bergamot • Ylang Ylang • Sandalwood',
            price: 9.59,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Luksuzna tropska kompozicija',
            category: '3 Blend Roll On'
        },
        'frankincense-myrrh-vanilla': {
            id: 'frankincense-myrrh-vanilla',
            name: 'Frankincense • Myrrh • Vanilla',
            price: 9.59,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Drevna mistična harmonija',
            category: '3 Blend Roll On'
        },
        'jasmine-bergamot-sandalwood': {
            id: 'jasmine-bergamot-sandalwood',
            name: 'Jasmine • Bergamot • Sandalwood',
            price: 9.59,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Cvjetna orijentalska harmonija',
            category: '3 Blend Roll On'
        },
        'patchouli-cedarwood-jasmine': {
            id: 'patchouli-cedarwood-jasmine',
            name: 'Patchouli • Cedarwood • Jasmine',
            price: 9.59,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Šumska zemljana meditacija',
            category: '3 Blend Roll On'
        },
        'jasmine-myrrh-ylang': {
            id: 'jasmine-myrrh-ylang',
            name: 'Jasmine • Myrrh • Ylang Ylang',
            price: 9.59,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Egzotična senzualna esencija',
            category: '3 Blend Roll On'
        },
        
        // 4 Blend proizvodi
        'jasmine-patchouli-ylang-cedarwood': {
            id: 'jasmine-patchouli-ylang-cedarwood',
            name: 'Jasmine • Patchouli • Ylang Ylang • Cedarwood',
            price: 9.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Bogata egzotična harmonija',
            category: '4 Blend Roll On'
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
        'jasmine-ylang-bergamot-cedarwood': {
            id: 'jasmine-ylang-bergamot-cedarwood',
            name: 'Jasmine • Ylang Ylang • Bergamot • Cedarwood',
            price: 9.89,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Luksuzna cvjetno-drvenasta kompozicija',
            category: '4 Blend Roll On'
        },
        
        // 5 Blend proizvod
        'patchouli-frankincense-myrrh-sandalwood-vanilla': {
            id: 'patchouli-frankincense-myrrh-sandalwood-vanilla',
            name: 'Patchouli • Frankincense • Myrrh • Sandalwood • Vanilla',
            price: 10.99,
            image: 'images/EOtest.jpg',
            volume: '10 ml',
            description: 'Luksuzni orijentalni parfem',
            category: '5 Blend Roll On'
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
    
    // Debugiranje - provjera da li su svi proizvodi ispravno definirani
    console.log('Loaded products:', Object.keys(products).length);
    
    // 2. Cart functions
    const updateCartCount = () => {
        try {
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
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    };
    
    const addToCart = (productId, quantity = 1) => {
        try {
            console.log('Adding to cart:', productId);
            
            // Provjera postojanja proizvoda
            const product = products[productId];
            if (!product) {
                console.error('Product not found in products object:', productId);
                console.log('Available products:', Object.keys(products));
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
        } catch (error) {
            console.error('Error adding to cart:', error, 'Product ID:', productId);
        }
    };
    
    // 3. Favorite functions
    const updateFavoriteStatus = () => {
        try {
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
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };
    
    const toggleFavorite = (productId) => {
        try {
            console.log('Toggling favorite for:', productId);
            
            // Provjera postojanja proizvoda
            const product = products[productId];
            if (!product) {
                console.error('Product not found for favorite:', productId);
                console.log('Available products:', Object.keys(products));
                return;
            }
            
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const index = favorites.findIndex(item => item.id === productId);
            
            if (index === -1) {
                favorites.push({
                    id: productId,
                    name: product.name,
                    price: product.price.toFixed(2) + " KM",
                    priceValue: product.price,
                    image: product.image,
                    volume: product.volume,
                    description: product.description,
                    category: product.category,
                    addedAt: new Date().toISOString()
                });
                showNotification('Dodano u favorite ❤️');
            } else {
                favorites.splice(index, 1);
                showNotification('Uklonjeno iz favorita 💔');
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoriteStatus();
        } catch (error) {
            console.error('Error toggling favorite:', error, 'Product ID:', productId);
        }
    };
    
    // 4. Helper functions
    const showNotification = (message) => {
        try {
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
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    };
    
    // 5. Event Listeners
    const initializeEventListeners = () => {
        try {
            console.log('Initializing event listeners');
            
            // Debug - prikaži sve gumbe
            const allButtons = document.querySelectorAll('.add-to-cart, .favorite-icon');
            console.log('Found buttons:', allButtons.length);
            
            // Check all product containers
            document.querySelectorAll('.oil-item').forEach(container => {
                console.log('Oil item:', container.dataset.productId);
            });
            
            // Dugmad za dodavanje u korpu
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // Spriječi event bubbling
                    
                    const productContainer = this.closest('.oil-item');
                    if (!productContainer) {
                        console.error('Product container not found');
                        return;
                    }
                    
                    const productId = productContainer.dataset.productId;
                    if (!productId) {
                        console.error('Product ID not found in container:', productContainer);
                        return;
                    }
                    
                    console.log('Kliknuto na "Dodaj u ceger" za proizvod:', productId);
                    addToCart(productId, 1);
                });
            });
            
            // Dugmad za favorite
            document.querySelectorAll('.favorite-icon').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation(); // Spriječi event bubbling
                    
                    const productContainer = this.closest('.oil-item');
                    if (!productContainer) {
                        console.error('Product container not found for favorite');
                        return;
                    }
                    
                    const productId = productContainer.dataset.productId;
                    if (!productId) {
                        console.error('Product ID not found for favorite in container:', productContainer);
                        return;
                    }
                    
                    console.log('Kliknuto na favorit za proizvod:', productId);
                    toggleFavorite(productId);
                });
            });
            
            console.log('Event listeners initialized');
        } catch (error) {
            console.error('Error initializing event listeners:', error);
        }
    };
    
    // 6. Inicijalizacija stranice
    try {
        console.log('Starting initialization');
        updateCartCount();
        updateFavoriteStatus();
        
        // Dodaj malo odgode za inicijalizaciju event listenera
        setTimeout(() => {
            initializeEventListeners();
        }, 100);
        
        console.log('Essential Oil Shop Script has been initialized');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});
