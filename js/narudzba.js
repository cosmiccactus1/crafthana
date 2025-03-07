document.addEventListener('DOMContentLoaded', function() {
    console.log("Narudzba.js učitan");
    
    // Inicijalizacija EmailJS
    (function() {
        emailjs.init("YOUR_USER_ID"); // Zamijenite s vašim EmailJS User ID
    })();
    
    const cartItemsContainer = document.getElementById('cartItems');
    const summaryDetailsContainer = document.querySelector('.summary-details');
    const orderForm = document.getElementById('orderForm');
    
    // Funkcija za dohvaćanje newsletter popusta iz localStorage
    function getNewsletterDiscount() {
        const discountCode = localStorage.getItem('discountCode');
        return discountCode ? 0.1 : null; // 10% popust ako postoji kod
    }
    
    // Funkcija za renderiranje košarice
    function renderCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const discountPercent = getNewsletterDiscount();
        let cartHTML = '';
        let subtotal = 0;
        let discount = 0;
        let deliveryFee = 0; // Početno postavljen na 0, bit će ažuriran kada korisnik odabere način dostave
        
        if (cartItems.length === 0) {
            cartHTML = '<p class="empty-cart">Vaša košarica je prazna.</p>';
            // Preusmjeri korisnika na stranicu košarice ako košarica nije prazna
            window.location.href = 'kosarica.html';
        } else {
            cartItems.forEach(item => {
                // Pretvaramo cijenu iz stringa u broj (uklanjamo "KM" i zamjenjujemo zarez s točkom)
                const priceText = item.price || '0';
                const price = parseFloat(priceText.replace('KM', '').replace(',', '.').trim());
                const quantity = item.quantity || 1;
                const itemTotal = price * quantity;
                subtotal += itemTotal;
                
                cartHTML += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>Količina: ${quantity}</p>
                        </div>
                        <div class="cart-item-price">${price.toFixed(2)} KM</div>
                    </div>
                `;
            });
        }
        
        // Izračun popusta ako postoji kod
        if (discountPercent) {
            discount = subtotal * discountPercent; // 10% popust
        }
        
        cartItemsContainer.innerHTML = cartHTML;
        updateSummary(subtotal, discount, deliveryFee);
        
        // Dodaj eventListenere na opcije dostave
        addDeliveryListeners(subtotal, discount);
    }
    
    // Funkcija za ažuriranje sažetka narudžbe
    function updateSummary(subtotal, discount, deliveryFee) {
        const total = subtotal - discount + deliveryFee;
        
        let summaryHTML = `
            <div class="summary-row">
                <span>Međuzbroj:</span>
                <span>${subtotal.toFixed(2)} KM</span>
            </div>
        `;
        
        if (discount > 0) {
            summaryHTML += `
                <div class="summary-row">
                    <span>Newsletter popust (10%):</span>
                    <span class="discount-amount">-${discount.toFixed(2)} KM</span>
                </div>
            `;
        }
        
        summaryHTML += `
            <div class="summary-row">
                <span>Dostava:</span>
                <span>${deliveryFee.toFixed(2)} KM</span>
            </div>
            <div class="summary-row total">
                <span>Ukupno:</span>
                <span>${total.toFixed(2)} KM</span>
            </div>
        `;
        
        summaryDetailsContainer.innerHTML = summaryHTML;
    }
    
    // Funkcija za dodavanje listener-a na opcije dostave
    function addDeliveryListeners(subtotal, discount) {
        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        
        deliveryOptions.forEach(option => {
            option.addEventListener('change', function() {
                let deliveryFee = 0;
                
                if (this.value === '4km-bh-posta') {
                    deliveryFee = 5;
                } else if (this.value === '10km-bh-express') {
                    deliveryFee = 10;
                }
                
                updateSummary(subtotal, discount, deliveryFee);
            });
        });
    }
    
    // Funkcija za slanje narudžbe
    function submitOrder(e) {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const customerData = {};
        
        formData.forEach((value, key) => {
            customerData[key] = value;
        });
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const discountPercent = getNewsletterDiscount();
        let subtotal = 0;
        let discount = 0;
        let deliveryFee = 0;
        
        // Izračunavanje ukupne cijene
        cartItems.forEach(item => {
            const priceText = item.price || '0';
            const price = parseFloat(priceText.replace('KM', '').replace(',', '.').trim());
            const quantity = item.quantity || 1;
            subtotal += price * quantity;
        });
        
        if (discountPercent) {
            discount = subtotal * discountPercent;
        }
        
        // Dohvaćanje odabrane opcije dostave
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        if (selectedDelivery) {
            if (selectedDelivery.value === '4km-bh-posta') {
                deliveryFee = 5;
            } else if (selectedDelivery.value === '10km-bh-express') {
                deliveryFee = 10;
            }
        }
        
        const total = subtotal - discount + deliveryFee;
        
        const orderDetails = {
            customer: customerData,
            items: cartItems,
            summary: {
                subtotal: subtotal.toFixed(2),
                discount: discount.toFixed(2),
                deliveryFee: deliveryFee.toFixed(2),
                total: total.toFixed(2)
            }
        };
        
        sendOrderEmail(orderDetails);
    }
    
    // Funkcija za slanje email-a s narudžbom
    function sendOrderEmail(orderDetails) {
        // Priprema podataka o narudžbi
        let itemsHTML = '';
        orderDetails.items.forEach(item => {
            const priceText = item.price || '0';
            const price = parseFloat(priceText.replace('KM', '').replace(',', '.').trim());
            const quantity = item.quantity || 1;
            itemsHTML += `
                ${item.name} (${quantity}x) - ${price.toFixed(2)} KM<br>
            `;
        });
        
        const templateParams = {
            to_name: 'Crafthana',
            from_name: `${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`,
            customer_email: orderDetails.customer.email,
            customer_phone: orderDetails.customer.phone,
            customer_address: `${orderDetails.customer.address}, ${orderDetails.customer.postalCode} ${orderDetails.customer.city}`,
            delivery_method: orderDetails.customer.delivery,
            items: itemsHTML,
            subtotal: orderDetails.summary.subtotal,
            discount: orderDetails.summary.discount,
            delivery_fee: orderDetails.summary.deliveryFee,
            total: orderDetails.summary.total
        };
        
        // Za demonstraciju, samo ispisujemo u konzolu
        console.log("Narudžba poslana:", templateParams);
        
        // Ovdje bi trebali koristiti EmailJS za slanje emaila
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        //    .then(function(response) {
        //        console.log('SUCCESS!', response.status, response.text);
        //        orderSuccess();
        //    }, function(error) {
        //        console.log('FAILED...', error);
        //        alert('Došlo je do greške pri slanju narudžbe. Molimo pokušajte ponovno.');
        //    });
        
        // Za demonstraciju, bez slanja emaila
        orderSuccess();
    }
    
    // Funkcija koja se poziva nakon uspješne narudžbe
    function orderSuccess() {
        // Čistimo košaricu
        localStorage.removeItem('cartItems');
        
        // Preusmjeravanje na stranicu za uspjeh
        window.location.href = 'uspjesna-narudzba.html';
        
        // Ako stranica za uspjeh ne postoji, prikazujemo poruku
        // setTimeout(function() {
        //     alert('Vaša narudžba je uspješno zaprimljena! Hvala Vam na povjerenju.');
        //     window.location.href = 'index.html';
        // }, 500);
    }
    
    // Inicijalno renderiranje košarice
    if (cartItemsContainer && summaryDetailsContainer) {
        renderCart();
    }
    
    // Dodavanje event listenera na formu
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
    
    // Event listener za promjenu veličine prozora za responzivni dizajn
    window.addEventListener('resize', function() {
        // Ovdje možete dodati kod za responzivni dizajn ako je potrebno
    });
    
    // Inicijalno ažuriranje broja artikala u košarici
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
    
    updateCartCount();
});
