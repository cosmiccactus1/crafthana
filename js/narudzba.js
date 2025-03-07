document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija EmailJS
    emailjs.init('UmDvCPqSLQJ-W2tn4');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    // Event listeneri za dostavu
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', () => renderOrderSummary());
    });
    
    function renderOrderSummary() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;
        
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Vaša košarica je prazna</p>';
            const summaryDetails = document.querySelector('.summary-details');
            if (summaryDetails) summaryDetails.innerHTML = '';
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

    const hasDiscount = !!localStorage.getItem('discountCode');
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

        const summaryDetailsElement = document.querySelector('.summary-details');
        if (summaryDetailsElement) {
            summaryDetailsElement.innerHTML = `
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
                    <span id="total">${total.toFixed(2)} KM</span>
                </div>
            `;
        }

        return { subtotal, total, shipping, discountAmount };
    }

    function toggleDeliveryOptions(enable) {
        const deliverySection = document.querySelector('.form-section:nth-of-type(2)');
        const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
        
        if (deliverySection) {
            deliverySection.style.opacity = enable ? '1' : '0.7';
            deliverySection.style.pointerEvents = enable ? 'auto' : 'none';
            deliveryOptions.forEach(option => option.disabled = !enable);
            
            // Ukloni postojeću poruku ako postoji
            const existingMessage = deliverySection.querySelector('.free-shipping-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            if (!enable) {
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
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Slanje...';
                }

                // Priprema podataka za EmailJS
                const orderId = `CR-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
                const formData = new FormData(this);
                
                // Izračunaj totale
                const orderSummary = renderOrderSummary();
                if (!orderSummary) {
                    alert('Greška pri izračunu narudžbe');
                    return;
                }

                // Formatiranje trenutnog datuma
                const today = new Date();
                const dateStr = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
                
                // Priprema proizvoda za ljepši prikaz u emailu
                const formattedItems = cartItems.map(item => {
                    const price = parseFloat(item.price.match(/(\d+\.?\d*)/)[1]);
                    const quantity = parseInt(item.quantity) || 1;
                    return `${item.name} - ${item.baseOil} (${quantity}x ${price.toFixed(2)} KM)`;
                }).join('<br>');
                
                const templateParams = {
                    order_id: orderId,
                    customer_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    address: `${formData.get('address')}, ${formData.get('city')} ${formData.get('postalCode')}`,
                    delivery_method: document.querySelector('input[name="delivery"]:checked')?.value || 'Nije odabrano',
                    items: formattedItems,
                    subtotal: `${orderSummary.subtotal.toFixed(2)} KM`,
                    total: `${orderSummary.total.toFixed(2)} KM`,
                    shipping: `${orderSummary.shipping === 0 ? 'Besplatno' : `${orderSummary.shipping.toFixed(2)} KM`}`,
                    date: dateStr,
                    // Parametri za dynamičko slanje emaila
                    to_email: formData.get('email'),
                    bcc_email: 'info@crafthana.store'
                };
                
                // Dodaj popust u parametre ako postoji
                if (orderSummary.discountAmount > 0) {
                    templateParams.discount = `${orderSummary.discountAmount.toFixed(2)} KM`;
                }

                // Slanje emaila preko EmailJS (jedan email s BCC opcijom)
                emailjs.send('service_g39f1h3', 'template_za_kupca', templateParams)
                    .then((response) => {
                        console.log('Email uspješno poslan:', response);
                        showCelebrationModal(orderId, formData.get('email'));
                        localStorage.removeItem('cartItems');
                        localStorage.removeItem('discountCode');;
                        // Preusmjeravanje na početnu stranicu nakon 7 sekundi (dovoljno za uživanje u animaciji)
                        setTimeout(() => window.location.href = 'index.html', 7000);
                    })
                    .catch((error) => {
                        console.error('Greška:', error);
                        alert('Greška pri slanju narudžbe');
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Pošalji narudžbu';
                        }
                    });
            }
        });
    }

    // Funkcija za prikazivanje animiranog pop-up prozora s vatromet efektom
    function showCelebrationModal(orderId, email) {
        // Dodajemo CSS ako već ne postoji
        if (!document.getElementById('celebration-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'celebration-styles';
            styleElement.innerHTML = `
                .celebration-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    overflow: hidden;
                }
                .celebration-content {
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                    z-index: 10;
                    animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    opacity: 0;
                    transform: scale(0.8);
                }
                @keyframes pop-in {
                    0% { opacity: 0; transform: scale(0.8); }
                    100% { opacity: 1; transform: scale(1); }
                }
                .celebration-content h2 {
                    color: #34495e;
                    font-size: 28px;
                    margin-bottom: 20px;
                    animation: colorChange 3s infinite;
                }
                @keyframes colorChange {
                    0% { color: #34495e; }
                    25% { color: #16a085; }
                    50% { color: #2980b9; }
                    75% { color: #8e44ad; }
                    100% { color: #34495e; }
                }
                .celebration-content p {
                    margin: 10px 0;
                    font-size: 16px;
                    color: #333;
                }
                .celebration-content .highlight {
                    font-weight: bold;
                    color: #34495e;
                }
                .celebration-icon {
                    font-size: 60px;
                    margin-bottom: 20px;
                    color: #16a085;
                    animation: bounce 2s infinite;
                }
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-30px); }
                    60% { transform: translateY(-15px); }
                }
                .firework {
                    position: absolute;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.8);
                    animation: explosion 1s ease-out forwards;
                    opacity: 0;
                }
                @keyframes explosion {
                    0% { transform: scale(0); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: scale(20); opacity: 0; }
                }
                .countdown {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #7f8c8d;
                }
                .order-details {
                    background-color: #f8f8f8;
                    border-radius: 5px;
                    padding: 15px;
                    margin: 15px 0;
                    text-align: left;
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        // Kreiramo modalni prozor
        const modal = document.createElement('div');
        modal.className = 'celebration-modal';
        modal.innerHTML = `
            <div class="celebration-content">
                <div class="celebration-icon">🎉</div>
                <h2>Hvala na narudžbi!</h2>
                <div class="order-details">
                    <p><strong>Broj narudžbe:</strong> <span class="highlight">${orderId}</span></p>
                    <p><strong>Potvrda je poslana na:</strong> ${email}</p>
                </div>
                <p>Vaša narudžba je uspješno zaprimljena!</p>
                <p>Vaši proizvodi će uskoro biti spremni za isporuku.</p>
                <div class="countdown">Preusmjeravanje na početnu stranicu za <span id="countdown">7</span> sekundi...</div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Dodajemo vatromet efekt
        function createFirework() {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            modal.appendChild(firework);
            
            // Uklanjamo vatromet nakon animacije
            setTimeout(() => {
                if (firework && firework.parentNode) {
                    firework.parentNode.removeChild(firework);
                }
            }, 1000);
        }
        
        // Kreiramo vatromet na različitim mjestima
        let fireworkInterval = setInterval(createFirework, 300);
        
        // Zaustavimo vatromet nakon 5 sekundi
        setTimeout(() => {
            clearInterval(fireworkInterval);
        }, 5000);
        
        // Odbrojavanje
        let seconds = 7;
        const countdownElement = document.getElementById('countdown');
        const countdownInterval = setInterval(() => {
            seconds--;
            if (countdownElement) {
                countdownElement.textContent = seconds;
            }
            if (seconds <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // Ažuriranje košarice
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 1), 0);
        cartCount.style.display = cartItems.length > 0 ? 'flex' : 'none';
    }

    // Inicijalno renderovanje sumarnog pregleda
    renderOrderSummary();
});
