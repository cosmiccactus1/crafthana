/**
 * Script koji dinamički učitava podatke o proizvodu na temelju ID-a iz URL-a
 */
document.addEventListener('DOMContentLoaded', function() {
    // 1. Dohvati ID proizvoda iz URL-a
    const productId = getProductIdFromUrl();
    
    // 2. Ako nema ID-a, prikaži poruku o grešci
    if (!productId) {
        showErrorMessage('Proizvod nije pronađen. Molimo provjerite URL.');
        return;
    }
    
    // 3. Dohvati podatke o proizvodu iz baze podataka
    const product = allProducts[productId];
    
    // 4. Ako proizvod ne postoji, prikaži poruku o grešci
    if (!product) {
        showErrorMessage(`Proizvod s ID-om "${productId}" nije pronađen.`);
        return;
    }
    
    // 5. Popuni stranicu s podacima o proizvodu
    populateProductPage(product);
    
    // 6. Postavi event listenere za interakcije
    setupEventListeners(product);
    
    // 7. Inicijaliziraj brojače korpe i favorita
    updateCartCount();
    updateFavoriteCount();
    
    // 8. Provjeri je li proizvod već u favoritima
    checkIfFavorite(product.id);
});

/**
 * Dohvaća ID proizvoda iz URL-a
 * Na primjer, iz URL-a product.html?id=patchouli-cedarwood dohvaća "patchouli-cedarwood"
 */
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * Prikazuje poruku o grešci
 */
function showErrorMessage(message) {
    const productContainer = document.querySelector('.product-container');
    productContainer.innerHTML = `
        <div class="error-message">
            <h2>Greška</h2>
            <p>${message}</p>
            <p>Vratite se na <a href="shop.html">shop stranicu</a> i pokušajte ponovo.</p>
        </div>
    `;
}

/**
 * Popunjava stranicu s podacima o proizvodu
 */
function populateProductPage(product) {
    // Postavi naslov stranice (tab u browseru)
    document.getElementById('document-title').textContent = `${product.title} - Essential Oil Roll On | Crafthana`;
    
    // Postavi breadcrumbs
    document.getElementById('product-breadcrumb').textContent = product.title;
    document.getElementById('category-link').textContent = product.category;
    document.getElementById('category-link').href = product.categoryLink;
    
    // Postavi osnovne informacije o proizvodu
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-tagline').textContent = product.tagline;
    document.getElementById('product-volume').textContent = product.volume;
    document.getElementById('product-description').textContent = product.description;
    
    // Ako postoji prilagođeni tekst za način korištenja, postavi ga
    if (product.usage) {
        document.getElementById('
