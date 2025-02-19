document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');

    function renderOrderSummary() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

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

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!cartItems.length) {
                alert('Vaša košarica je prazna');
                return;
            }

            if (this.checkValidity()) {
                const totalElement = document.querySelector('.summary-row.total span:last-child');
                const total = totalElement ? totalElement.textContent : '0 KM';

                const orderData = {
                    customerInfo: {
                        firstName: this.firstName.value,
                        lastName: this.lastName.value,
                        email: this.email.value,
                        phone: this.phone.value,
                        address: this.address.value,
                        city: this.city.value,
                        postalCode: this.postalCode.value
                    },
                    items: cartItems.map(item => `${item.name} x ${item.quantity} - ${item.price} KM`).join(', '),
                    total: total
                };

                // Inicijalizacija EmailJS-a
                emailjs.init(import.meta.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

                // Slanje emaila putem EmailJS-a
                emailjs.send(
                    import.meta.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                    import.meta.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                    orderData
                ).then(response => {
                    console.log('Narudžba uspješno poslana', response.status, response.text);
                    localStorage.removeItem('cartItems');
                    alert('Hvala na narudžbi! Vaš email je poslan.');
                    window.location.href = 'index.html';
                }).catch(error => {
                    console.error('Greška pri slanju narudžbe', error);
                    alert('Došlo je do greške pri obradi narudžbe.');
                });
            } else {
                alert('Molimo popunite sva obavezna polja.');
            }
        });
    }

    renderOrderSummary();
});
