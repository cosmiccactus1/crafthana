document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija EmailJS
    emailjs.init('Crafthana'); // Zamijenite sa vašim User ID

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    // Event listeneri za dostavu
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => renderOrderSummary());
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
            const price = parseFloat(item.price.match(/(\d+\.?\d*)/)[1]);
            const quantity = parseInt(item.quantity) || 1;
            const itemTotal = price * quantity;
            subtotal += itemTotal;
            
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

        const hasDiscount = localStorage.getItem('newsletterDiscount') === 'true';
        const discountAmount = hasDiscount ? subtotal * 0.1 : 0;
        const isFreeShipping = subtotal > 50;
        
        toggleDeliveryOptions(!isFreeShipping);
        
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');
        let shippingCost = 4;
        
        if (!isFreeShipping && selectedDelivery) {
            shippingCost = selectedDelivery.value.includes('10km') ? 10 : 4;
        }
        
        const shipping = isFreeShipping ? 0 : shippingCost;
        const total = subtotal - discountAmount + shipping;

        document.querySelector('.summary-details').innerHTML = `
            <div class="summary-row">
                <span>Međuzbroj:</span>
                <span>${subtotal.toFixed(2)} KM</span>
            </div>
            ${hasDiscount ? `
            <div class="summary-row discount">
                <span>Popust (10%):</span>
                <span>-${discountAmount.toFixed(2)} KM</span>
            </div>` : ''}
            <div class="summary-row">
                <span>Dostava:</span>
                <span>${shipping === 0 ? 'Besplatno' : shipping.toFixed(2) + ' KM'}</span>
            </div>
            <div class="summary-row total">
                <span>Ukupno:</span>
                <span>${total.toFixed(2)} KM</span>
            </div>
        `;
    }

    function toggleDeliveryOptions(enable) {
        const deliverySection = document.querySelector('.form-section:nth-of-type(2)');
        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        
        if (deliverySection) {
            deliverySection.style.opacity = enable ? '1' : '0.7';
            deliverySection.style.pointerEvents = enable ? 'auto' : 'none';
            deliveryOptions.forEach(option => option.disabled = !enable);
            
            if (!enable && !deliverySection.querySelector('.free-shipping-message')) {
                const message = document.createElement('p');
                message.className = 'free-shipping-message';
                message.innerHTML = '<i class="fas fa-check-circle"></i> Besplatna dostava!';
                deliverySection.appendChild(message);
            }
        }
    }

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cartItems.length === 0) {
                alert('Košarica je prazna');
                return;
            }

            if (this.checkValidity()) {
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Slanje...';

                // Priprema podataka za EmailJS
                const orderId = `CR-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
                const formData = new FormData(this);
                
                const templateParams = {
                    order_id: orderId,
                    customer_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    address: `${formData.get('address')}, ${formData.get('city')} ${formData.get('postalCode')}`,
                    delivery_method: document.querySelector('input[name="delivery"]:checked').value,
                    items: cartItems.map(item => 
                        `${item.name} (${item.quantity}x ${item.price})`
                    ).join(', '),
                    total: document.getElementById('total').textContent
                };

                // Slanje emaila preko EmailJS
                emailjs.send('service_4v7sweg', 'template_kmo6h5i', templateParams)
                    .then(() => {
                        showOrderConfirmation(orderId, formData.get('email'));
                        localStorage.removeItem('cartItems');
                        localStorage.removeItem('newsletterDiscount');
                        setTimeout(() => window.location.href = 'index.html', 5000);
                    }, (error) => {
                        console.error('Greška:', error);
                        alert('Greška pri slanju narudžbe');
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Pošalji narudžbu';
                    });
            }
        });
    }

    function showOrderConfirmation(orderId, email) {
        const modal = document.createElement('div');
        modal.className = 'order-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Hvala na narudžbi!</h2>
                <p>Broj narudžbe: ${orderId}</p>
                <p>Potvrda je poslana na: ${email}</p>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Ažuriranje košarice
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }

    renderOrderSummary();
});
