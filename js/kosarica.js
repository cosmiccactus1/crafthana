document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

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

    // Funkcija za provjeru da li je uređaj mobilan
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) ||
               (navigator.msMaxTouchPoints > 0);
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
        
        // Postavimo efekt povećanja slike nakon renderiranja košarice
        setTimeout(setupImageMagnifier, 100);
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

    // Funkcija za postavljanje efekta povećanja slike
    function setupImageMagnifier() {
        // Provjera da li je mobilni uređaj - ako jest, ne postavljamo magnifier
        if (isMobileDevice()) {
            return;
        }
        
        // Kreiranje kontejnera za uvećanu sliku ako već ne postoji
        let magnifiedContainer = document.getElementById('magnified-image-container');
        if (!magnifiedContainer) {
            magnifiedContainer = document.createElement('div');
            magnifiedContainer.id = 'magnified-image-container';
            magnifiedContainer.className = 'magnified-image-container';
            document.body.appendChild(magnifiedContainer);
        }

        // Dodavanje uvećane slike unutar kontejnera
        if (!magnifiedContainer.querySelector('img')) {
            const magnifiedImg = document.createElement('img');
            magnifiedImg.id = 'magnified-image';
            magnifiedContainer.appendChild(magnifiedImg);
        }

        // Dohvat reference na uvećanu sliku
        const magnifiedImg = magnifiedContainer.querySelector('img');

        // Dodavanje event listenera na sve kontejnere slika u košarici
        document.querySelectorAll('.product-image-container').forEach(container => {
            // Provjeri da li već ima event listenere
            if (container.dataset.hasMagnifier === 'true') {
                return;
            }
            
            container.dataset.hasMagnifier = 'true';
            const originalImg = container.querySelector('img');
            
            // Kada miš uđe u kontejner slike
            container.addEventListener('mouseenter', function() {
                if (originalImg && originalImg.src) {
                    magnifiedImg.src = originalImg.src;
                    magnifiedContainer.style.opacity = '1';
                }
            });
            
            // Kada miš izađe iz kontejnera slike
            container.addEventListener('mouseleave', function() {
                magnifiedContainer.style.opacity = '0';
            });
            
            // Kada se miš pomjera unutar kontejnera slike
            container.addEventListener('mousemove', function(e) {
                // Pozicioniranje uvećane slike da prati kursor
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Pomak da slika ne pokriva kursor
                const offsetX = 20; 
                const offsetY = 20;
                
                // Dimenzije uvećane slike
                const imgWidth = magnifiedContainer.offsetWidth;
                const imgHeight = magnifiedContainer.offsetHeight;
                
                // Pozicioniranje tako da slika ostane unutar prozora
                let left = mouseX + offsetX;
                let top = mouseY + offsetY;
                
                // Provjera da slika ne izlazi iz desne strane ekrana
                if (left + imgWidth > window.innerWidth) {
                    left = mouseX - imgWidth - offsetX;
                }
                
                // Provjera da slika ne izlazi iz donje strane ekrana
                if (top + imgHeight > window.innerHeight) {
                    top = mouseY - imgHeight - offsetY;
                }
                
                // Postavlja poziciju
                magnifiedContainer.style.left = left + 'px';
                magnifiedContainer.style.top = top + 'px';
            });
        });
    }

    // Inicijalno renderiranje košarice
    if (cartContainer) {
        renderCart();
        updateCartCount();
    }
});
