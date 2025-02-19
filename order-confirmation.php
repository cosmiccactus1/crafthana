<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.eu';
        $mail->SMTPAuth = true;
        $mail->Username = getenv('ZOHO_EMAIL');
        $mail->Password = getenv('ZOHO_PASSWORD');
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';
        
        // Anti-spam postavke
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
    try {
        $data = json_decode(file_get_contents('php://input'), true);
        
        if (!$data || !isset($data['customerInfo']) || !isset($data['items']) || !isset($data['total'])) {
            throw new Exception('Nepotpuni podaci u zahtjevu');
        }
        
        $orderNumber = 'CRA' . date('Ymd') . rand(1000, 9999);
        
        // Email za kupca
        $customerBody = "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: auto; padding: 20px;'>
                <h2 style='color: #2c3e50;'>Hvala na narudžbi!</h2>
                <p>Poštovani/a " . htmlspecialchars($data['customerInfo']['firstName']) . ",</p>
                <p>Uspješno smo zaprimili Vašu narudžbu.</p>
                
                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                    <strong>Broj narudžbe:</strong> " . htmlspecialchars($orderNumber) . "<br>
                    <strong>Datum:</strong> " . date('d.m.Y.') . "
                </div>
                
                <div style='margin-top: 20px; text-align: right;'>
                    <strong>Ukupno za platiti:</strong> " . htmlspecialchars($data['total']) . "
                </div>
                
                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                    <strong>Adresa za dostavu:</strong><br>
                    " . htmlspecialchars($data['customerInfo']['firstName']) . " " . 
                    htmlspecialchars($data['customerInfo']['lastName']) . "<br>
                    " . htmlspecialchars($data['customerInfo']['address']) . "<br>
                    " . htmlspecialchars($data['customerInfo']['postalCode']) . " " . 
                    htmlspecialchars($data['customerInfo']['city']) . "
                </div>
                
                <p>Za sva pitanja slobodno nas kontaktirajte na info@crafthana.xyz</p>
                
                <p style='margin-top: 30px;'>Srdačan pozdrav,<br>Vaš Crafthana tim</p>
            </div>
        </body>
        </html>";
        
        // Email za admin
        $adminBody = "
        <html>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: auto; padding: 20px;'>
                <h2 style='color: #2c3e50;'>Nova narudžba #" . htmlspecialchars($orderNumber) . "</h2>
                
                <h3>Podaci o kupcu:</h3>
                <p>
                    Ime i prezime: " . htmlspecialchars($data['customerInfo']['firstName']) . " " . 
                    htmlspecialchars($data['customerInfo']['lastName']) . "<br>
                    Email: " . htmlspecialchars($data['customerInfo']['email']) . "<br>
                    Telefon: " . htmlspecialchars($data['customerInfo']['phone']) . "<br>
                    Adresa: " . htmlspecialchars($data['customerInfo']['address']) . "<br>
                    Grad: " . htmlspecialchars($data['customerInfo']['postalCode']) . " " . 
                    htmlspecialchars($data['customerInfo']['city']) . "
                </p>
                
                <h3>Ukupno: " . htmlspecialchars($data['total']) . "</h3>
            </div>
        </body>
        </html>";
        
        // Slanje emailova
        $customerEmail = sendMail(
            $data['customerInfo']['email'],
            "Vaša narudžba #" . $orderNumber . " - Crafthana",
            $customerBody
        );
        
        $adminEmail = sendMail(
            'info@crafthana.xyz',
            "Nova narudžba #" . $orderNumber,
            $adminBody
        );
        
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
        
    } catch (Exception $e) {
        error_log("Greška u obradi narudžbe: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Došlo je do greške u obradi narudžbe'
        ]);
    }
}
?>
