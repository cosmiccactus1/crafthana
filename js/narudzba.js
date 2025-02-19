document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    
    function renderOrderSummary() {
        // ...
        // Kod za prikaz sažetka narudžbe ostaje nepromijenjen
        // ...
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
                const total = document.querySelector('.summary-row.total span:last-child').textContent;
                
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
                    items: cartItems,
                    total: total
                };

                // Inicijalizacija EmailJS-a
                emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

                // Slanje emaila putem EmailJS-a
                emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, orderData)
                    .then(function(response) {
                        console.log('Narudžba uspješno poslana', response.status, response.text);
                        localStorage.removeItem('cartItems');
                        alert('Hvala na narudžbi!');
                        window.location.href = 'index.html';
                    }, function(error) {
                        console.error('Greška pri slanju narudžbe', error);
                        alert('Došlo je do greške pri obradi narudžbe');
                    });
            } else {
                alert('Molimo popunite sva obavezna polja');
            }
        });
    }

    // Ažuriranje broja artikala u headeru
    // ...
    // Kod za ažuriranje broja artikala u headeru ostaje nepromijenjen
    // ...

    // Inicijalno renderiranje
    renderOrderSummary();
});
