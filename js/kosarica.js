document.addEventListener('DOMContentLoaded', function() {
    console.log("Kosarica.js učitan");
    const cartContainer = document.querySelector('.cart-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

    // Kreiramo overlay za prikaz slika - odmah na početku stranice
    function setupImageOverlay() {
        // Ako overlay već postoji, ne stvaramo novi
        if (document.getElementById('image-overlay')) {
            return document.getElementById('image-overlay');
        }
        
        console.log("Kreiranje overlay-a za slike");
        const overlay = document.createElement('div');
        overlay.id = 'image-overlay';
        
        const img = document.createElement('img');
        img.className = 'overlay-image';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-overlay';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        overlay.appendChild(img);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        
        // Event za zatvaranje overlay-a
        closeBtn.addEventListener('click', function() {
            console.log("Klik na X za zatvaranje");
            overlay.classList.remove('active');
        });
        
        // Zatvaranje overlaya na klik izvan slike
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                console.log("Klik izvan slike za zatvaranje");
                overlay.classList.remove('active');
            }
        });
        
        // Zatvaranje na Escape tipku
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                console.log("Escape tipka za zatvaranje");
                overlay.classList.remove('active');
            }
        });
        
        console.log("Overlay kreiran i dodan u DOM");
        return overlay;
    }
    
    // Pozivamo odmah na početku
    const imageOverlay = setupImageOverlay();
    
    // Funkcija za otvaranje overlay-a sa slikom
    function openImageOverlay(imgSrc) {
        if (!imgSrc) return;
        
        console.log("Otvaranje slike u overlay-u:", imgSrc);
        const overlayImg = imageOverlay.querySelector('.overlay-image');
        overlayImg.src = imgSrc;
        
        // Dodajemo klasu active nakon kratkog delay-a da se DOM ažurira
        setTimeout(function() {
            imageOverlay.classList.add('active');
            console.log("Overlay je aktivan");
        }, 50);
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
                        <div class="product-image-container">
                            <img src="${item.image}" alt="${item.name}" data-full-image="${item.image}">
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
        addImageListeners();
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

    // Dodavanje listenera za prikaz slike u punoj veličini
    function addImageListeners() {
        console.log("Dodavanje event listenera za slike");
        
        // Dodajemo click event na sve kontejnere slika
        document.querySelectorAll('.product-image-container').forEach(container => {
            // Uklanjamo prethodni listener ako postoji
            container.removeEventListener('click', imageClickHandler);
            
            // Dodajemo novi listener
            container.addEventListener('click', imageClickHandler);
        });
    }
    
    // Handler za klik na sliku
    function imageClickHandler(e) {
        console.log("Klik na sliku");
        // Pronalazimo sliku unutar kontejnera
        const img = this.querySelector('img');
        
        if (img && img.src) {
            console.log("Pronađena slika:", img.src);
            openImageOverlay(img.src);
        }
        
        // Zaustavljamo event da ne bi aktivirao druge elemente
        e.stopPropagation();
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

    // Inicijalno renderiranje košarice
    if (cartContainer) {
        console.log("Pokretanje inicijalizacije košarice");
        renderCart();
        updateCartCount();
    }
});
