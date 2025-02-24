<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Primanje JSON podataka
$jsonData = file_get_contents('php://input');
$orderData = json_decode($jsonData, true);

// Generiranje broja narudžbe
$orderNumber = 'ORD-' . date('Ymd') . '-' . rand(1000, 9999);

// Funkcija za slanje emaila
function sendMail($to, $subject, $body) {
   $mail = new PHPMailer(true);

   try {
       // Server settings
       $mail->isSMTP();
       $mail->Host = 'smtp.zoho.eu';
       $mail->SMTPAuth = true;
       $mail->Username = 'info@crafthana.store';
       $mail->Password = '4amwscp8u4Uw';
       $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
       $mail->Port = 465;
       $mail->CharSet = 'UTF-8';

       // Recipients
       $mail->setFrom('info@crafthana.store', 'Crafthana');
       $mail->addAddress($to);

       // Content
       $mail->isHTML(true);
       $mail->Subject = $subject;
       $mail->Body = $body;

       $mail->send();
       return true;
   } catch (Exception $e) {
       error_log("Mail Error: {$e->getMessage()}");
       return false;
   }
}

// Formatiranje artikala za email
function formatItemsHtml($items) {
   $html = '<table style="width:100%; border-collapse: collapse; margin: 20px 0;">';
   $html .= '<tr style="background-color: #f3f3f3;">
               <th style="padding: 10px; text-align: left;">Proizvod</th>
               <th style="padding: 10px; text-align: center;">Bazno ulje</th>
               <th style="padding: 10px; text-align: right;">Količina</th>
               <th style="padding: 10px; text-align: right;">Cijena</th>
             </tr>';
             
   foreach ($items as $item) {
       $html .= "<tr>
                   <td style='padding: 10px; border-bottom: 1px solid #ddd;'>{$item['name']}</td>
                   <td style='padding: 10px; text-align: center; border-bottom: 1px solid #ddd;'>{$item['baseOil']}</td>
                   <td style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>{$item['quantity']}</td>
                   <td style='padding: 10px; text-align: right; border-bottom: 1px solid #ddd;'>{$item['itemTotal']} KM</td>
                 </tr>";
   }
   
   $html .= '</table>';
   return $html;
}

// Email za kupca
$customerMessage = "
   <h2>Hvala vam na narudžbi!</h2>
   <p>Poštovani/a {$orderData['customerInfo']['firstName']},</p>
   <p>Vaša narudžba broj {$orderNumber} je uspješno zaprimljena.</p>
   <p>Detalji vaše narudžbe:</p>
   " . formatItemsHtml($orderData['items']) . "
   <div style='margin-top: 20px; text-align: right;'>
       <p>Ukupno za platiti: {$orderData['total']} KM</p>
   </div>
   <p>Vaša narudžba će biti dostavljena na adresu:<br>
   {$orderData['customerInfo']['address']}<br>
   {$orderData['customerInfo']['city']} {$orderData['customerInfo']['postalCode']}</p>
   <p>Plaćanje: Pouzećem prilikom dostave</p>
";

// Email za admin
$adminMessage = "
   <h2>Nova narudžba #{$orderNumber}</h2>
   <h3>Podaci o kupcu:</h3>
   <p>Ime i prezime: {$orderData['customerInfo']['firstName']} {$orderData['customerInfo']['lastName']}</p>
   <p>Email: {$orderData['customerInfo']['email']}</p>
   <p>Telefon: {$orderData['customerInfo']['phone']}</p>
   <p>Adresa: {$orderData['customerInfo']['address']}</p>
   <p>Grad: {$orderData['customerInfo']['city']} {$orderData['customerInfo']['postalCode']}</p>
   
   <h3>Naručeni artikli:</h3>
   " . formatItemsHtml($orderData['items']) . "
   <div style='margin-top: 20px; text-align: right;'>
       <p style='font-weight: bold;'>Ukupno za naplatu: {$orderData['total']} KM</p>
   </div>
";

try {
   // Slanje emaila kupcu
   $customerSent = sendMail(
       $orderData['customerInfo']['email'],
       'Potvrda narudžbe - Crafthana',
       $customerMessage
   );
   
   // Slanje emaila adminu
   $adminSent = sendMail(
       'info@crafthana.store',
       'Nova narudžba #' . $orderNumber,
       $adminMessage
   );
   
   if ($customerSent && $adminSent) {
       echo json_encode([
           'success' => true,
           'orderNumber' => $orderNumber,
           'message' => 'Narudžba je uspješno primljena'
       ]);
   } else {
       throw new Exception('Greška pri slanju emaila');
   }
   
} catch (Exception $e) {
   http_response_code(500);
   echo json_encode([
       'success' => false,
       'message' => 'Došlo je do greške prilikom obrade narudžbe'
   ]);
}
?>