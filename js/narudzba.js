document.addEventListener('DOMContentLoaded', function() {
    // Configuration for EmailJS
    const EMAIL_CONFIG = {
        publicKey: 'UmDvCPqSLQJ-W2tn4',
        serviceId: 'service_6v5pha9',
        templateId: 'template_skhct09'
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
                from_name: 'Vaša Online Trgovina',
                to_name: `${form.firstName.value} ${form.lastName.value}`,
                first_name: form.firstName.value,
                last_name: form.lastName.value,
                customer_email: form.email.value,
                phone: form.phone.value,
                address: form.address.value,
                city: form.city.value,
                postal_code: form.postalCode.value,
                order_items: itemsList,
                total_price: total
            };
        },

        // Send order via EmailJS
        async sendOrder(orderData) {
            try {
                // Validate email data
                console.log('Preparing to send order data:', orderData);

                // Ensure EmailJS is properly initialized
                if (typeof emailjs === 'undefined') {
                    throw new Error('EmailJS is not loaded');
                }

                // Use the latest EmailJS send method
                const response = await emailjs.send(
                    EMAIL_CONFIG.serviceId, 
                    EMAIL_CONFIG.templateId, 
                    orderData,
                    {
                        publicKey: EMAIL_CONFIG.publicKey
                    }
                );

                console.log('Order successfully sent', response);
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

    // Initialize EmailJS
    try {
        emailjs.init({
            publicKey: EMAIL_CONFIG.publicKey
        });
    } catch (error) {
        console.error('Error initializing EmailJS:', error);
    }

    // Initialize components
    CartManager.renderOrderSummary();
    OrderProcessor.setupOrderFormSubmission();
});
