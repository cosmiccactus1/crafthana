document.addEventListener('DOMContentLoaded', function() {
    console.log("Kosarica.js učitan");
    
    const cartContainer = document.querySelector('.cart-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

    // Kreiramo magnifier element - jednostavnije i direktnije
    let magnifier = document.querySelector('.magnifier');
    
    if (!magnifier) {
        console.log("Kreiranje magnifier elementa");
        magnifier = document.createElement('div');
        magnifier.className = 'magnifier';
        
        const img = document.createElement('img');
        magnifier.appendChild(img);
        
        document.body.appendChild(magnifier);
        console.log("Magnifier dodan u DOM:", magnifier);
    }
    
    // Funkcija za provjeru da li je uređaj mobilan
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0);
    }

    // Funkcija za dohvaćanje newsletter popusta iz localStorage
    function getNewsletterDiscount() {
        const discountCode = localStorage.getItem('discountCode');
        return discountCode ? 0.1 : null; // 10% popust ako postoji kod
    }

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
        console.log("Renderiranje košarice");
        
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
                        <div class="product-image-container" data-zoom="true">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="product-details">
                            <div>
                                <h2>${item.name}</h2>
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
        
        // Dodajemo listenere za zumiranje nakon malog odgađanja da se DOM ažurira
        setTimeout(function() {
            addMagnifierListeners();
        }, 100);
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

    // Funkcija za dodavanje event listenera za magnifier efekt
    function addMagnifierListeners() {
        console.log("Dodavanje magnifier listenera");
        
        // Preskačemo ako je mobilan uređaj
        if (isMobileDevice()) {
            console.log("Mobilan uređaj detektiran, preskačem magnifier");
            return;
        }
        
        const magnifierImg = magnifier.querySelector('img');
        if (!magnifierImg) {
            console.error("Nije pronađena slika unutar magnifier elementa");
            return;
        }
        
        document.querySelectorAll('.product-image-container[data-zoom="true"]').forEach(container => {
            console.log("Postavljanje zoom listenera za kontejner:", container);
            
            const img = container.querySelector('img');
            if (!img || !img.src) {
                console.error("Nema slike ili src atributa unutar kontejnera");
                return;
            }
            
            // Kada miš uđe u kontejner slike
            container.addEventListener('mouseenter', function(e) {
                console.log("Mouse enter na slici");
                magnifierImg.src = img.src;
                magnifier.style.display = 'block';
                
                // Postavljamo zoom faktor za sliku u magnifieru
                magnifierImg.style.transform = 'scale(2.5)';
                magnifierImg.style.transformOrigin = '0 0';
                
                // Simuliramo mousemove da se odmah postavi pozicija
                const mouseEvent = new MouseEvent('mousemove', {
                    clientX: e.clientX,
                    clientY: e.clientY
                });
                container.dispatchEvent(mouseEvent);
            });
            
            // Kada miš izađe iz kontejnera slike
            container.addEventListener('mouseleave', function() {
                console.log("Mouse leave sa slike");
                magnifier.style.display = 'none';
            });
            
            // Kada se miš pomjera unutar kontejnera slike
            container.addEventListener('mousemove', function(e) {
                // Potrebno izračunati relativnu poziciju miša unutar kontejnera
                const rect = container.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                
                // Izračunavanje postotka pozicije miša unutar slike
                const xPercent = mouseX / rect.width * 100;
                const yPercent = mouseY / rect.height * 100;
                
                // Pomak da magnifier ne pokriva kursor
                const offsetX = 30;
                const offsetY = 30;
                
                // Dimenzije magnifiera
                const magnifierWidth = magnifier.offsetWidth;
                const magnifierHeight = magnifier.offsetHeight;
                
                // Pozicioniranje - prvo desno od kursora
                let left = e.clientX + offsetX;
                let top = e.clientY + offsetY;
                
                // Provjera da ne izlazi izvan ekrana
                if (left + magnifierWidth > window.innerWidth) {
                    left = e.clientX - magnifierWidth - offsetX;
                }
                
                if (top + magnifierHeight > window.innerHeight) {
                    top = e.clientY - magnifierHeight - offsetY;
                }
                
                // Postavlja poziciju magnifiera
                magnifier.style.left = left + 'px';
                magnifier.style.top = top + 'px';
                
                // Pomičemo sliku unutar magnifiera da simuliramo zoom efekt
                magnifierImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
            });
        });
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

    // Event listener za promjenu veličine prozora
    window.addEventListener('resize', function() {
        // Ako je prozor smanjen na mobilnu veličinu, sakrijemo magnifier
        if (isMobileDevice()) {
            magnifier.style.display = 'none';
        }
    });

    // Inicijalno renderiranje košarice
    if (cartContainer) {
        console.log("Pokretanje inicijalizacije košarice");
        renderCart();
        updateCartCount();
    }
});
