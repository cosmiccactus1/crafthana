// shoprollon.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script is loaded');
    const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active'); // Koristimo 'active' jer već imate taj CSS
        console.log('Menu toggled');
    });
}
    
    // 1. Products object
    const products = {
        'vanilla-jasmine': {
            id: 'vanilla-jasmine',
            name: 'Vanilla • Jasmine',
            prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
            priceRange: '5.99-8.99 KM',
            image: 'images/2blend1.png',
            volume: '10 ml',
            description: 'Slatka, cvjetna harmonija',
            category: '2-blend'
        },
        'patchouli-cedarwood': {
            id: 'patchouli-cedarwood',
            name: 'Patchouli • Cedarwood',
            prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
            priceRange: '5.99-8.99 KM',
            image: 'images/2blend2.png',
            volume: '10 ml',
            description: 'Zemljana nota sa drvenastim prizvukom',
            category: '2-blend'
        },
        'bergamot-ylang': {
            id: 'bergamot-ylang',
            name: 'Bergamot • Ylang Ylang',
            prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
            priceRange: '5.99-8.99 KM',
            image: 'images/2blend3.png',
            volume: '10 ml',
            description: 'Slatka, cvjetna harmonija',
            category: '2-blend'
        },
        'pine-cedarwood': {
    id: 'pine-cedarwood',
    name: 'Pine Needle • Cedarwood',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend4.png',
    volume: '10 ml',
    description: 'Šumska svježina s drvenastom dubinom',
    category: '2-blend'
},
        'sandalwood-jasmine': {
    id: 'sandalwood-jasmine',
    name: 'Sandalwood • Jasmine',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend5.png',
    volume: '10 ml',
    description: 'Slatka, cvjetna harmonija',
    category: '2-blend'
        },
        'patchouli-bergamot': {
    id: 'patchouli-bergamot',
    name: 'Patchouli • Bergamot',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend6.png',
    volume: '10 ml',
    description: 'Zemljana svježina citrus nota',
    category: '2-blend'
},

'frankincense-myrrh': {
    id: 'frankincense-myrrh',
    name: 'Frankincense • Myrrh',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend7.png',
    volume: '10 ml',
    description: 'Drevna mistična harmonija',
    category: '2-blend'
},

'bergamot-vanilla': {
    id: 'bergamot-vanilla',
    name: 'Bergamot • Vanilla',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend8.png',
    volume: '10 ml',
    description: 'Slatka citrusna elegancija',
    category: '2-blend'
},

'ylang-frankincense': {
    id: 'ylang-frankincense',
    name: 'Ylang • Frankincense',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend9.png',
    volume: '10 ml',
    description: 'Egzotična drevna čarolija',
    category: '2-blend'
},

'myrrh-vanilla': {
    id: 'myrrh-vanilla',
    name: 'Myrrh • Vanilla',
    prices: { classic: 5.99, silk: 6.99, ultimate: 8.99 },
    priceRange: '5.99-8.99 KM',
    image: 'images/2blend10.png',
    volume: '10 ml',
    description: 'Topla orijentalna slatkoća',
    category: '2-blend'
},
     // 3 BLEND PRODUCTS - CORRECTED
        'bergamot-ylang-sandalwood': {
            id: 'bergamot-ylang-sandalwood',
            name: 'Bergamot • Ylang Ylang • Sandalwood',
            prices: { classic: 6.99, silk: 7.99, ultimate: 9.99 },
            priceRange: '6.99-9.99 KM',
            image: 'images/3blend1.png',
            volume: '10 ml',
            description: 'Luksuzna tropska kompozicija',
            category: '3-blend'
        },
        'frankincense-myrrh-vanilla': {
            id: 'frankincense-myrrh-vanilla',
            name: 'Frankincense • Myrrh • Vanilla',
            prices: { classic: 6.99, silk: 7.99, ultimate: 9.99 },
            priceRange: '6.99-9.99 KM',
            image: 'images/3blend2.png',
            volume: '10 ml',
            description: 'Drevna spiritualna harmonija sa slatkoćom',
            category: '3-blend'
        },
        'jasmine-bergamot-vanilla': {
            id: 'jasmine-bergamot-vanilla',
            name: 'Jasmine • Bergamot • Vanilla',
            prices: { classic: 6.99, silk: 7.99, ultimate: 9.99 },
            priceRange: '6.99-9.99 KM',
            image: 'images/3blend3.png',
            volume: '10 ml',
            description: 'Cvjetna orijentalska harmonija',
            category: '3-blend'
        },
        'patchouli-cedarwood-jasmine': {
            id: 'patchouli-cedarwood-jasmine',
            name: 'Patchouli • Cedarwood • Jasmine',
            prices: { classic: 6.99, silk: 7.99, ultimate: 9.99 },
            priceRange: '6.99-9.99 KM',
            image: 'images/3blend4.png',
            volume: '10 ml',
            description: 'Šumska zemljana meditacija',
            category: '3-blend'
        },
        'jasmine-myrrh-ylang': {
            id: 'jasmine-myrrh-ylang',
            name: 'Jasmine • Myrrh • Ylang Ylang',
            prices: { classic: 6.99, silk: 7.99, ultimate: 9.99 },
            priceRange: '6.99-9.99 KM',
            image: 'images/3blend5.png',
            volume: '10 ml',
            description: 'Egzotična senzualna esencija',
            category: '3-blend'
        },

        // 4 BLEND PRODUCTS - CORRECTED
        'jasmine-patchouli-ylang-cedarwood': {
            id: 'jasmine-patchouli-ylang-cedarwood',
            name: 'Jasmine • Patchouli • Ylang Ylang • Cedarwood',
            prices: { classic: 8.99, silk: 10.99, ultimate: 11.99 },
            priceRange: '8.99-11.99 KM',
            image: 'images/4blend1.png',
            volume: '10 ml',
            description: 'Bogata egzotična harmonija',
            category: '4-blend'
        },
        'pine-cedarwood-bergamot-vanilla': {
            id: 'pine-cedarwood-bergamot-vanilla',
            name: 'Pine • Cedarwood • Bergamot • Vanilla',
            prices: { classic: 8.99, silk: 10.99, ultimate: 11.99 },
            priceRange: '8.99-11.99 KM',
            image: 'images/4blend2.png',
            volume: '10 ml',
            description: 'Šumsko-slatka harmonija',
            category: '4-blend'
        },
        'jasmine-ylang-bergamot-cedarwood': {
            id: 'jasmine-ylang-bergamot-cedarwood',
            name: 'Jasmine • Ylang Ylang • Bergamot • Cedarwood',
            prices: { classic: 8.99, silk: 10.99, ultimate: 11.99 },
            priceRange: '8.99-11.99 KM',
            image: 'images/4blend3.png',
            volume: '10 ml',
            description: 'Luksuzna cvjetno-drvenasta kompozicija',
            category: '4-blend'
        },

        // 5 BLEND PRODUCT - CORRECTED
        'patchouli-frankincense-myrrh-sandalwood-vanilla': {
            id: 'patchouli-frankincense-myrrh-sandalwood-vanilla',
            name: 'Patchouli • Frankincense • Myrrh • Sandalwood • Vanilla',
            prices: { classic: 8.99, silk: 10.99, ultimate: 12.99 },
            priceRange: '8.99-12.99 KM',
            image: 'images/5blend1.png',
            volume: '10 ml',
            description: 'Luksuzni orijentalni parfem',
            category: '5-blend'
        }
    };

    // Helper funkcija za formatiranje imena baznog ulja
    const formatBaseOilName = (baseOil) => {
        const names = {
            'classic': 'Classic (Jojoba)',
            'silk': 'Silk (Japanska Kamelija)',
            'ultimate': 'Ultimate (Jojoba + Kamelija)'
        };
        return names[baseOil] || baseOil;
    };

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
    const addToCart = (productId, baseOil) => {
        const product = products[productId];
        if (!product) return;

        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const priceValue = product.prices[baseOil];
        const formattedBaseOil = formatBaseOilName(baseOil);
        
        const itemId = `${productId}-${baseOil}-${Date.now()}`;
        const newItem = {
            id: itemId,
            productId: productId,
            name: product.name,
            price: `${priceValue.toFixed(2)} KM (${formattedBaseOil})`,
            numericPrice: priceValue,
            image: product.image,
            volume: product.volume,
            quantity: 1,
            baseOil: formattedBaseOil,
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
    const toggleFavorite = (productId) => {
        const product = products[productId];
        if (!product) return;
        
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = favorites.findIndex(item => item.id === productId);
        
        if (index === -1) {
            favorites.push({
                ...product,
                addedAt: new Date().toISOString(),
                price: product.priceRange
            });
            showNotification('Dodano u favorite ❤️');
        } else {
            favorites.splice(index, 1);
            showNotification('Uklonjeno iz favorita 💔');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteStatus();
    };

    // 4. Modal handling
    const openModal = (productId) => {
        const modal = document.getElementById(`modal-${productId}`);
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            
            const form = modal.querySelector('form');
            if (form) {
                form.onsubmit = (e) => {
                    e.preventDefault();
                    const baseOil = form.querySelector('input[name="base-oil"]:checked')?.value;
                    if (baseOil) {
                        addToCart(productId, baseOil);
                        modal.style.display = 'none';
                        modal.classList.remove('active');
                        document.body.classList.remove('modal-open');
                    }
                };
            }
        }
    };

    // 5. Event Listeners
    const initializeEventListeners = () => {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.closest('.oil-item').dataset.productId;
                if (products[productId]) {
                    openModal(productId);
                }
            });
        });

        // Favorite buttons
        document.querySelectorAll('.favorite-icon').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.closest('.oil-item').dataset.productId;
                if (productId) {
                    toggleFavorite(productId);
                }
            });
        });

        // Modal close buttons
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const modal = closeBtn.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
                e.target.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    };

    // 6. Helper functions
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

    // 7. Initialize everything
    initializeEventListeners();
    updateCartCount();
    updateFavoriteStatus();
});
