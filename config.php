<?php
// Povezivanje s varijablama okruženja u Vercelu
define('SMTP_HOST', 'smtp.zoho.eu');
define('SMTP_PORT', '587');
define('SMTP_USER', getenv('SMTP_USER'));  // Zoho korisničko ime
define('SMTP_PASS', getenv('SMTP_PASS'));  // Zoho lozinka
define('SMTP_SECURE', 'tls');
?>
