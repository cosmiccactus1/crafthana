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

                const orderData = {
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
                    total: total.toFixed(2)
                };

                fetch('https://crafthana.store/order-confirmation.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        localStorage.removeItem('cartItems');
                        localStorage.removeItem('newsletterDiscount');
                        alert(`Hvala na narudžbi! Provjerite svoj email.`);
                        window.location.href = 'index.html';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Došlo je do greške pri obradi narudžbe');
                });
            } else {
                alert('Molimo popunite sva obavezna polja');
            }
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
