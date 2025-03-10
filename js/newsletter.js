document.addEventListener('DOMContentLoaded', function() {
    // Inicijalizacija Supabase klijenta
    const { createClient } = supabase;
    const supabaseUrl = 'https://quydipftbewilamjsska.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eWRpcGZ0YmV3aWxhbWpzc2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NTg2OTMsImV4cCI6MjA1NjEzNDY5M30.zZXIrEObmx1P_mep8uzCPvhM1wCoA8Cc7Go3fvmkfW0';
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Newsletter form handling
    document.getElementById('newsletterForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('newsletterEmail').value.trim();
        
        if (!email) {
            alert('Molimo unesite valjanu email adresu');
            return;
        }
        
        try {
            // Provjera da li email već postoji u bazi - poboljšana provjera
            const { data, error: checkError } = await supabaseClient
                .from('newsletter_subscribers')
                .select('email')
                .eq('email', email);
                
            if (checkError) {
                console.error('Greška pri provjeri emaila:', checkError);
                alert('Došlo je do greške pri provjeri emaila');
                return;
            }
            
            // Ako postoji barem jedan rezultat, email već postoji
            if (data && data.length > 0) {
                alert('Ovaj email je već pretplaćen na naš newsletter!');
                return;
            }
            
            // Ako email ne postoji, dodajemo ga u bazu
            const { error: insertError } = await supabaseClient
                .from('newsletter_subscribers')
                .insert([{ email: email }]);
                
            if (insertError) {
                console.error('Greška pri dodavanju emaila:', insertError);
                alert('Došlo je do greške pri prijavi na newsletter');
                return;
            }
            
            // Generiranje koda za popust samo za nove pretplatnike
            const discountCode = 'WELCOME' + Math.floor(1000 + Math.random() * 9000);
            
            // Spremanje koda u localStorage za kasnije korištenje u košarici
            localStorage.setItem('discountCode', discountCode);
            
            // Prikaz modala s kodom za popust
            const modal = document.getElementById('newsletter-modal');
            const discountCodeElement = modal.querySelector('.discount-code');
            discountCodeElement.textContent = discountCode; 
            modal.style.display = 'block';
            
            // Resetiranje forme
            document.getElementById('newsletterEmail').value = '';
            
        } catch (err) {
            console.error('Greška:', err);
            alert('Došlo je do greške pri prijavi na newsletter');
        }
    });

    // Modal close handlers
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('newsletter-modal').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        const modal = document.getElementById('newsletter-modal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
