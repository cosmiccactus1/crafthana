document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

    // Funkcija za generiranje konzistentnog ID-a za proizvod
    function generateProductId(product) {
        // Generirajte konzistentan ID bez vremenskih oznaka
        // Koristite naziv proizvoda i bazno ulje ako postoji
        let id = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        
        // Ako postoji bazno ulje, dodajte ga u ID
        if (product.baseOil) {
            // Izvucite samo naziv ulja bez "Bazno ulje: " dijela
            const oilName = product.baseOil.replace('Bazno ulje: ', '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            id += `-${oilName}`;
        }
        
        return id;
    }

    // Postavljanje magnifier funkcionalnosti
    function setupMagnifier() {
        // Kreiraj magnifier element ako ne postoji
        let magnifier = document.querySelector('.magnifier');
        if (!magnifier) {
            magnifier = document.createElement('div');
            magnifier.className = 'magnifier';
            
            const img = document.createElement('img');
            magnifier.appendChild(img);
            
            document.body.appendChild(magnifier);
        }
        
        // Dohvati sliku u magnifieru
        const magnifierImg = magnifier.querySelector('img');
        
        // Dodaj event listenere na sve kontejnere slika
        document.querySelectorAll('.product-image-container').forEach(container => {
            const img = container.querySelector('img');
            
            // Kad miš uđe u kontejner
            container.onmouseenter = function() {
                if (img && img.src) {
                    magnifierImg.src = img.src;
                    magnifier.style.display = 'block';
                }
            };
            
            // Kad miš izađe iz kontejnera
            container.onmouseleave = function() {
                magnifier.style.display = 'none';
            };
            
            // Kad se miš kreće unutar kontejnera
            container.onmousemove = function(e) {
                // Pozicioniraj magnifier pored kursora
                magnifier.style.left = (e.pageX + 20) + 'px';
                magnifier.style.top = (e.pageY - 50) + 'px';
            };
        });
    }

    // Funkcija za dohvaćanje newsletter popusta iz localStorage
    function getNewsletterDiscount() {
        const discountCode = localStorage.getItem('discountCode');
        return discountCode ? 0.1 : null; // 10% popust ako postoji kod
    }

    // Funkcija za dodavanje proizvoda u košaricu - globalna za korištenje na drugim stranicama
    window.addToCart = function(product) {
        // Generirajte konzistentan ID za proizvod
        const productId = generateProductId(product);
        
        // Postavite konzistentan ID na proizvod
        product.id = productId;
        
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Provjeravamo postoji li već isti proizvod u košarici
        const existingItemIndex = cartItems.findIndex(item => {
            // Uspoređujemo samo ID-ove jer su sada konzistentni
            return item.id === product.id;
        });
        
        if (existingItemIndex !== -1) {
            // Ako proizvod već postoji, samo povećamo količinu
            cartItems[existingItemIndex].quantity = (cartItems[existingItemIndex].quantity || 1) + 1;
        } else {
            // Ako proizvod ne postoji, dodajemo ga s količinom 1
            product.quantity = 1;
            cartItems.push(product);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        
        // Prikaz potvrde dodavanja
        alert('Proizvod je dodan u košaricu!');
    };

    // Primjena koda za popust
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const codeInput = document.getElementById('discountCode');
            const code = codeInput.value.trim();
            
            // Provjera je li kod valjan (počinje s WELCOME)
            if (code.startsWith('WELCOME')) {
                localStorage.setItem('discountCode', code);
                discountMessage.textContent = 'Kod je uspješno primijenjen!';
                discountMessage.style.color = '#27ae60';
                renderCart(); // Ponovno renderiranje košarice s popustom
            } else {
                discountMessage.textContent = 'Nevažeći kod za popust.';
                discountMessage.style.color = '#e74c3c';
            }
        });
    }

    // Renderiranje košarice
    function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const discountPercent = getNewsletterDiscount();
        let cartHTML = '';
        let subtotal = 0;
        let discount = 0;

        if (cartItems.length === 0) {
            cartHTML = '<div class="empty-cart"><p>Vaš ceger je prazan</p></div>';
        } else {
            cartItems.forEach(item => {
                // Pretvaramo cijenu iz stringa u broj (uklanjamo "KM" i zamjenjujemo zarez s točkom)
                const priceText = item.price || '0';
                const price = parseFloat(priceText.replace('KM', '').replace(',', '.').trim());
                const quantity = item.quantity || 1;
                const itemTotal = price * quantity;
                subtotal += itemTotal;
                
                cartHTML += `
                    <div class="selected-product" data-id="${item.id}">
                        <button class="remove-item" aria-label="Ukloni proizvod">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="product-image-container">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="product-details">
                            <div>
                                <h2>${item.name}</h2>
                                ${item.baseOil ? `<p class="base-oil">${item.baseOil}</p>` : ''}
                                <p class="price">${priceText}</p>
                            </div>
                            <div class="quantity-selector">
                                <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                                <input type="number" value="${quantity}" min="1">
                                <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        // Izračun popusta ako postoji kod
        if (discountPercent) {
            discount = subtotal * discountPercent; // 10% popust
        }

        const total = subtotal - discount;

        // Dodavanje informacija o košarici i cijenama
        cartContainer.innerHTML = `
            <div class="cart-items">
                ${cartHTML}
            </div>
            <div class="checkout-section">
                <div class="subtotal">
                    <span>Međuzbroj:</span>
                    <span class="subtotal-price">${subtotal.toFixed(2)} KM</span>
                </div>
                ${discountPercent ? `
                <div class="discount">
                    <span>Newsletter popust (10%):</span>
                    <span class="discount-amount">-${discount.toFixed(2)} KM</span>
                </div>
                ` : ''}
                <div class="total">
                    <span>Ukupno:</span>
                    <span class="total-price">${total.toFixed(2)} KM</span>
                </div>
                <button class="checkout-btn" ${cartItems.length === 0 ? 'disabled' : ''}>
                    Nastavi na narudžbu
                </button>
            </div>
        `;

        // Automatski popunjavamo input za kod ako postoji u localStorage
        const discountCode = localStorage.getItem('discountCode');
        if (discountCode && document.getElementById('discountCode')) {
            document.getElementById('discountCode').value = discountCode;
            discountMessage.textContent = 'Kod za popust je primijenjen.';
            discountMessage.style.color = '#27ae60';
        }

        // Dodajemo event listenere nakon renderiranja
        addQuantityListeners();
        addRemoveListeners();
        addCheckoutListener();
        
        // Postavljamo zoom funkcionalnost
        setupMagnifier();
    }

    // Funkcija za ažuriranje količine proizvoda
    function updateQuantity(productId, newQuantity) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.id === productId);
        
        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = Math.max(1, newQuantity);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCart();
            updateCartCount();
        }
    }

    // Funkcija za uklanjanje proizvoda iz košarice
    function removeItem(productId) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = cartItems.filter(item => item.id !== productId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        renderCart();
        updateCartCount();
    }

    // Funkcija za ažuriranje broja artikala u košarici
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCountElements = document.querySelectorAll('.cart-count');
        if (cartCountElements.length > 0) {
            const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
            cartCountElements.forEach(element => {
                element.textContent = totalItems;
                element.style.display = totalItems > 0 ? 'flex' : 'none';
            });
        }
    }

    // Event listeneri za gumbe za količinu (+/-)
    function addQuantityListeners() {
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const product = selector.closest('.selected-product');
            const productId = product.dataset.id;
            const input = selector.querySelector('input');
            const minusBtn = selector.querySelector('.minus');
            const plusBtn = selector.querySelector('.plus');

            input.addEventListener('change', () => {
                updateQuantity(productId, parseInt(input.value));
            });

            minusBtn.addEventListener('click', () => {
                updateQuantity(productId, parseInt(input.value) - 1);
            });

            plusBtn.addEventListener('click', () => {
                updateQuantity(productId, parseInt(input.value) + 1);
            });
        });
    }

    // Event listeneri za gumbe za uklanjanje proizvoda
    function addRemoveListeners() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const product = button.closest('.selected-product');
                const productId = product.dataset.id;
                removeItem(productId);
            });
        });
    }

    // Event listener za gumb za nastavak na narudžbu
    function addCheckoutListener() {
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                if (cartItems.length > 0) {
                    window.location.href = 'narudzba.html';
                } else {
                    alert('Vaš ceger je prazan!');
                }
            });
        }
    }

    // Popravljamo postojeće artikle u košarici (ako postoje)
    function fixExistingCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length > 0) {
            // Prvo popravimo ID-ove
            cartItems.forEach(item => {
                item.id = generateProductId(item);
            });
            
            // Zatim grupiramo identične artikle
            const groupedItems = [];
            const processedIds = [];
            
            cartItems.forEach(item => {
                // Ako je ovaj ID već obrađen, preskačemo
                if (processedIds.includes(item.id)) return;
                
                // Pronađimo sve artikle s istim ID-om
                const sameItems = cartItems.filter(i => i.id === item.id);
                
                // Ako ima više istih artikala, zbrojimo količine
                if (sameItems.length > 1) {
                    const totalQuantity = sameItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
                    item.quantity = totalQuantity;
                }
                
                // Dodajmo artikl u novu grupu
                groupedItems.push(item);
                processedIds.push(item.id);
            });
            
            // Spremimo grupirane artikle natrag u localStorage
            localStorage.setItem('cartItems', JSON.stringify(groupedItems));
        }
    }

    // Inicijalno renderiranje košarice
    if (cartContainer) {
        // Prvo popravimo postojeće artikle u košarici
        fixExistingCartItems();
        
        renderCart();
        updateCartCount();
    }
});
