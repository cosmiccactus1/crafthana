<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

function sendMail($to, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.eu';
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USER');  // Dohvata varijablu okruženja za korisničko ime
        $mail->Password = getenv('SMTP_PASS');  // Dohvata varijablu okruženja za lozinku
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587; // ili 465 za SSL
        $mail->CharSet = 'UTF-8';

        // Dodajemo ove postavke za bolje izbjegavanje spam filtera
        $mail->XMailer = 'Crafthana Mailer';
        $mail->addCustomHeader('List-Unsubscribe', '<mailto:info@crafthana.xyz>');
        $mail->Sender = 'info@crafthana.xyz';
        $mail->addReplyTo('info@crafthana.xyz', 'Crafthana Support');
        
        // Recipients
        $mail->setFrom('info@crafthana.xyz', 'Crafthana', false);
        $mail->addAddress($to);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AltBody = strip_tags($body);

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mail Error: {$mail->ErrorInfo}");
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $orderNumber = 'CRA' . date('Ymd') . rand(1000, 9999);
    
    // Email za kupca
    $customerBody = "
    <html>
    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
        <div style='max-width: 600px; margin: auto; padding: 20px;'>
            <h2>Hvala na narudžbi!</h2>
            <p>Broj narudžbe: " . $orderNumber . "</p>
            <p>Ukupno: " . $data['total'] . "</p>
            <p>Dostavit ćemo na adresu:<br>
            " . $data['customerInfo']['address'] . "<br>
            " . $data['customerInfo']['city'] . "</p>
        </div>
    </body>
    </html>";

    // Email za admin
    $adminBody = "
    <html>
    <body>
        <h2>Nova narudžba #" . $orderNumber . "</h2>
        <h3>Podaci o kupcu:</h3>
        <p>Ime i prezime: " . $data['customerInfo']['firstName'] . " " . $data['customerInfo']['lastName'] . "<br>
           Email: " . $data['customerInfo']['email'] . "<br>
           Telefon: " . $data['customerInfo']['phone'] . "<br>
           Adresa: " . $data['customerInfo']['address'] . "<br>
           Grad: " . $data['customerInfo']['city'] . "</p>
    </body>
    </html>";

    // Slanje emailova
    $customerEmail = sendMail($data['customerInfo']['email'], 
                            "Vaša narudžba #" . $orderNumber . " - Crafthana", 
                            $customerBody);
                            

    $adminEmail = sendMail('info@crafthana.xyz', 
                          "Nova narudžba #" . $orderNumber, 
                          $adminBody);

    if ($customerEmail && $adminEmail) {
        echo json_encode([
            'success' => true,
            'orderNumber' => $orderNumber
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Došlo je do greške pri slanju emaila'
        ]);
    }
}
?>
