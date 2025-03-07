document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.querySelector('.cart-container');
    const newsletterForm = document.getElementById('newsletterForm');
    const discountMessage = document.querySelector('.discount-message');

    // Kreiramo magnifier element koji će pratiti miš
    function setupMagnifier() {
        if (document.querySelector('.magnifier')) {
            return document.querySelector('.magnifier');
        }
        
        const magnifier = document.createElement('div');
        magnifier.className = 'magnifier';
        
        const img = document.createElement('img');
        magnifier.appendChild(img);
        
        document.body.appendChild(magnifier);
        return magnifier;
    }
    
    // Kreiramo magnifier odmah
    const magnifier = setupMagnifier();
    
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
            <div
