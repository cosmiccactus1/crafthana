document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    // Dodajemo event listenere za opcije dostave
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            renderOrderSummary(); // Ponovno renderiramo summary kada se promijeni opcija dostave
        });
    });
    
    function renderOrderSummary() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Vaša košarica je prazna</p>';
            document.querySelector('.summary-details').innerHTML = '';
            return;
        }
        
        cartItems.forEach(item => {
            const priceMatch = item.price.match(/(\d+\.?\d*)/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
            const quantity = parseInt(item.quantity) || 1;
            const itemTotal = price * quantity;
            
            if (!isNaN(itemTotal)) {
                subtotal += itemTotal;
            }
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Bazno ulje: ${item.baseOil}</p>
                    <p>Količina: ${quantity}</p>
                    <p>Cijena po komadu: ${price.toFixed(2)} KM</p>
                    <p>Ukupno za artikl: ${itemTotal.toFixed(2)} KM</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Provjera i kalkulacija popusta
        const hasDiscount = localStorage.getItem('newsletterDiscount') === 'true';
        const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
        
        // Provjera za besplatnu dostavu
        const isFreeShipping = subtotal > 50;
        
        // Onemogućimo opcije dostave ako je dostava besplatna
        toggleDeliveryOptions(!isFreeShipping);
        
        // Dohvatimo odabranu opciju dostave
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        
        // Određivanje cijene dostave ovisno o odabranoj opciji
        let shippingCost = 4; // Default za BH Poštu
        
        if (!isFreeShipping) {
            if (selectedDelivery) {
                // Postavimo cijenu dostave ovisno o odabranoj opciji
                shippingCost = selectedDelivery.value.includes('10km') ? 10 : 4;
            } else {
                // Postavimo defaultnu opciju ako korisnik nije ništa odabrao
                const defaultDelivery = document.getElementById('delivery4km');
                if (defaultDelivery) defaultDelivery.checked = true;
            }
        }
        
        // Besplatna dostava ako je cijena iznad 50 KM
        const shipping = isFreeShipping ? 0 : shippingCost;
        
        const total = subtotal - discountAmount + shipping;

        document.querySelector('.summary-details').innerHTML = `
            <div class="summary-row">
                <span>Međuzbroj:</span>
                <span id="subtotal">${subtotal.toFixed(2)} KM</span>
            </div>
            ${hasDiscount ? `
            <div class="summary-row discount">
                <span>Newsletter popust (10%):</span>
                <span class="discount-amount">-${discountAmount.toFixed(2)} KM</span>
            </div>` : ''}
            <div class="summary-row">
                <span>Dostava:</span>
                <span id="shipping">${shipping === 0 ? 'Besplatno' : shipping.toFixed(2) + ' KM'}</span>
            </div>
            <div class="summary-row total">
                <span>Ukupno:</span>
                <span id="total">${total.toFixed(2)} KM</span>
            </div>
        `;
    }
    
    // Funkcija za omogućavanje/onemogućavanje opcija dostave
    function toggleDeliveryOptions(enable) {
        const deliverySection = document.querySelector('.form-section:nth-of-type(2)');
        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        const deliveryLabels = document.querySelectorAll('.delivery-option label');
        
        if (deliverySection) {
            if (enable) {
                // Omogući opcije dostave
                deliverySection.style.opacity = '1';
                deliverySection.style.pointerEvents = 'auto';
                deliveryOptions.forEach(option => {
                    option.disabled = false;
                });
                deliveryLabels.forEach(label => {
                    label.style.textDecoration = 'none';
                    label.style.color = '#333';
                });
                
                // Ukloni poruku ako postoji
                const freeShippingMessage = deliverySection.querySelector('.free-shipping-message');
                if (freeShippingMessage) {
                    freeShippingMessage.remove();
                }
            } else {
                // Onemogući opcije dostave
                deliverySection.style.opacity = '0.7';
                deliverySection.style.pointerEvents = 'none';
                deliveryOptions.forEach(option => {
                    option.disabled = true;
                });
                deliveryLabels.forEach(label => {
                    label.style.textDecoration = 'line-through';
                    label.style.color = '#999';
                });
                
                // Dodaj poruku o besplatnoj dostavi ako već ne postoji
                if (!deliverySection.querySelector('.free-shipping-message')) {
                    const message = document.createElement('p');
                    message.className = 'free-shipping-message';
                    message.style.color = '#2D4F2D';
                    message.style.fontWeight = 'bold';
                    message.style.marginTop = '10px';
                    message.innerHTML = '<i class="fas fa-check-circle"></i> Čestitamo! Vaša narudžba ispunjava uvjete za besplatnu dostavu!';
                    
                    // Dodaj poruku nakon opcija dostave
                    const deliveryOptions = deliverySection.querySelector('.delivery-options');
                    if (deliveryOptions) {
                        deliveryOptions.after(message);
                    } else {
                        deliverySection.appendChild(message);
                    }
                }
            }
        }
    }

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!cartItems.length) {
                alert('Vaša košarica je prazna');
                return;
            }
            
            if (this.checkValidity()) {
                // Prikaz loading indikatora
                const submitBtn = this.querySelector('.submit-btn');
                const originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Obrađujemo vašu narudžbu...';
                
                const hasDiscount = localStorage.getItem('newsletterDiscount') === 'true';
                const subtotal = cartItems.reduce((sum, item) => {
                    const price = parseFloat(item.price.match(/(\d+\.?\d*)/)[1]);
                    return sum + (price * (parseInt(item.quantity) || 1));
                }, 0);
                
                const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
                
                // Provjera za besplatnu dostavu
                const isFreeShipping = subtotal > 50;
                
                // Dohvatimo odabranu opciju dostave za izračun finalne cijene
                const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
                const shippingCost = selectedDelivery && selectedDelivery.value.includes('10km') ? 10 : 4;
                
                // Besplatna dostava iznad 50 KM
                const shipping = isFreeShipping ? 0 : shippingCost;
                
                const total = subtotal - discountAmount + shipping;

                // Generirajmo jedinstveni ID narudžbe
                const timestamp = new Date().getTime();
                const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
                const orderId = `CR-${timestamp.toString().slice(-6)}${randomDigits}`;
                
                const orderData = {
                    orderId: orderId,
                    customerInfo: {
                        firstName: this.firstName.value,
                        lastName: this.lastName.value,
                        email: this.email.value,
                        phone: this.phone.value,
                        address: this.address.value,
                        city: this.city.value,
                        postalCode: this.postalCode.value,
                        delivery: isFreeShipping ? 'free-shipping' : (selectedDelivery ? selectedDelivery.value : '4km-bh-posta')
                    },
                    items: cartItems.map(item => ({
                        ...item,
                        itemTotal: (parseFloat(item.price.match(/(\d+\.?\d*)/)[1]) * (parseInt(item.quantity) || 1)).toFixed(2)
                    })),
                    subtotal: subtotal.toFixed(2),
                    hasDiscount: hasDiscount,
                    discountAmount: discountAmount.toFixed(2),
                    shipping: shipping.toFixed(2),
                    shippingMethod: isFreeShipping ? 'Besplatna dostava' : (selectedDelivery ? 
                        (selectedDelivery.value.includes('10km') ? 'BH Express' : 'BH Pošta') : 
                        'BH Pošta'),
                    isFreeShipping: isFreeShipping,
                    total: total.toFixed(2),
                    orderDate: new Date().toLocaleDateString('hr-BA')
                };

                // Koristite fetch za poziv API-ja
                fetch('/api/send-order-mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Email uspješno poslan!');
                        // Prikaži modal s potvrdom narudžbe
                        showOrderConfirmation(orderId, orderData.customerInfo.email);
                        
                        // Očisti košaricu i popuste
                        localStorage.removeItem('cartItems');
                        localStorage.removeItem('newsletterDiscount');
                        
                        // Nakon 5 sekundi, preusmjeri korisnika na početnu stranicu
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 5000);
                    } else {
                        throw new Error('Greška pri slanju emaila');
                    }
                })
                .catch((error) => {
                    console.error('Greška pri slanju emaila:', error);
                    alert('Došlo je do greške pri slanju potvrde narudžbe. Molimo pokušajte ponovno.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
            } else {
                alert('Molimo popunite sva obavezna polja');
            }
        });
    }

    // Funkcija za prikazivanje potvrde narudžbe
    function showOrderConfirmation(orderId, email) {
        // Kreirajmo modal element
        const modal = document.createElement('div');
        modal.className = 'order-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Hvala na vašoj narudžbi!</h2>
                <p>Vaša narudžba je uspješno primljena.</p>
                <p>Broj narudžbe: <strong>${orderId}</strong></p>
                <p>Poslali smo potvrdu na vašu e-mail adresu: <strong>${email}</strong></p>
                <p>Kontaktirat ćemo vas uskoro radi potvrde narudžbe.</p>
                <p>Preusmjerit ćemo vas na početnu stranicu za nekoliko sekundi...</p>
            </div>
        `;

        // Dodajmo modal u body
        document.body.appendChild(modal);

        // Stilovi za modal
        const style = document.createElement('style');
        style.textContent = `
            .order-confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .modal-content {
                background-color: white;
                padding: 40px;
                border-radius: 10px;
                text-align: center;
                max-width: 500px;
                position: relative;
            }
            .modal-close {
                position: absolute;
                top: 10px;
                right: 15px;
                font-size: 24px;
                cursor: pointer;
                color: #999;
            }
            .modal-icon {
                font-size: 60px;
                color: #2D4F2D;
                margin-bottom: 20px;
            }
            .modal-content h2 {
                color: #2D4F2D;
                margin-bottom: 20px;
            }
            .modal-content p {
                margin-bottom: 10px;
            }
        `;
        document.head.appendChild(style);

        // Dodajmo event listener za zatvaranje
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', function() {
            modal.remove();
            style.remove();
            window.location.href = 'index.html';
        });
    }

    // Ažuriranje broja artikala u headeru
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cartItems.reduce((sum, item) => sum + parseInt(item.quantity || 1), 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Inicijalno renderiranje
    renderOrderSummary();
});
