document.addEventListener('DOMContentLoaded', function() {
    // Configuration for EmailJS
    const EMAIL_CONFIG = {
        serviceId: 'service_6v5pha9',
        templateId: 'template_skcht09',
        userId: 'UmDvCPqSLQJ-W2tn4'
    };

    // Cart Management
    const CartManager = {
        // Get cart items from local storage
        getCartItems() {
            return JSON.parse(localStorage.getItem('cartItems')) || [];
        },

        // Render cart items in the summary
        renderOrderSummary() {
            const cartItemsContainer = document.getElementById('cartItems');
            if (!cartItemsContainer) return;

            cartItemsContainer.innerHTML = '';
            const cartItems = this.getCartItems();
            let total = 0;

            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `<p>${item.name} x ${item.quantity} - ${item.price} KM</p>`;
                cartItemsContainer.appendChild(itemElement);
                total += item.quantity * parseFloat(item.price);
            });

            const totalElement = document.querySelector('.summary-row.total span:last-child');
            if (totalElement) {
                totalElement.textContent = `${total.toFixed(2)} KM`;
            }
        }
    };

    // Order Processing
    const OrderProcessor = {
        // Validate form inputs
        validateForm(form) {
            const requiredFields = [
                'firstName', 'lastName', 'email', 
                'phone', 'address', 'city', 'postalCode'
            ];

            return requiredFields.every(fieldName => {
                const field = form[fieldName];
                return field && field.value.trim() !== '';
            });
        },

        // Prepare order data for submission
        prepareOrderData(form, cartItems) {
            const totalElement = document.querySelector('.summary-row.total span:last-child');
            const total = totalElement ? totalElement.textContent : '0 KM';

            // Detailed cart items list
            const itemsList = cartItems.map(item => 
                `${item.name} (Količina: ${item.quantity}, Cijena: ${item.price} KM)`
            ).join('\n');

            return {
                service_id: EMAIL_CONFIG.serviceId,
                template_id: EMAIL_CONFIG.templateId,
                user_id: EMAIL_CONFIG.userId,
                template_params: {
                    to_email: form.email.value,
                    from_name: 'Vaša Online Trgovina',
                    from_email: 'noreply@vasaonlinetrovina.com', // Replace with your actual email
                    subject: 'Potvrda Vaše Narudžbe',
                    full_name: `${form.firstName.value} ${form.lastName.value}`,
                    ime: form.firstName.value,
                    prezime: form.lastName.value,
                    email: form.email.value,
                    telefon: form.phone.value,
                    adresa: form.address.value,
                    grad: form.city.value,
                    postanski_broj: form.postalCode.value,
                    artikli: itemsList,
                    ukupno: total
                }
            };
        },

        // Send order via EmailJS REST API
        async sendOrder(orderData) {
            try {
                console.log('Sending order data:', orderData);

                const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }

                console.log('Order successfully sent');
                localStorage.removeItem('cartItems');
                alert('Hvala na narudžbi! Vaš email je poslan.');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Detailed error sending order:', {
                    message: error.message,
                    name: error.name,
                    stack: error.stack
                });
                
                // More detailed error alert
                alert(`Greška pri slanju narudžbe: ${error.message}`);
            }
        },

        // Setup order form submission handler
        setupOrderFormSubmission() {
            const orderForm = document.getElementById('orderForm');
            if (!orderForm) return;

            orderForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const cartItems = CartManager.getCartItems();
                if (!cartItems.length) {
                    alert('Vaša košarica je prazna');
                    return;
                }

                if (this.validateForm(orderForm)) {
                    try {
                        const orderData = this.prepareOrderData(orderForm, cartItems);
                        await this.sendOrder(orderData);
                    } catch (error) {
                        console.error('Order submission error:', error);
                        alert('Došlo je do greške pri pripremi narudžbe.');
                    }
                } else {
                    alert('Molimo popunite sva obavezna polja.');
                }
            });
        }
    };

    // Initialize components
    CartManager.renderOrderSummary();
    OrderProcessor.setupOrderFormSubmission();
});
