<?php
// process-order.php - skripta za obradu narudžbi i slanje e-mailova

// Omogućimo CORS da možemo pristupiti skripti s našeg domene
header("Access-Control-Allow-Origin: https://crafthana.store");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Ako je zahtjev OPTIONS, završi (preflight CORS zahtjev)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Provjeri je li metoda POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Metoda nije dopuštena']);
    exit;
}

// Dohvati JSON podatke iz tijela zahtjeva
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Provjeri jesu li podaci uspješno dekodirani
if ($data === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Neispravan JSON format']);
    exit;
}

// Provjeri obavezna polja
if (empty($data['customerInfo']) || empty($data['items'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Nedostaju podaci o kupcu ili proizvodi']);
    exit;
}

// Osnovni podaci
$customerInfo = $data['customerInfo'];
$items = $data['items'];
$orderId = $data['orderId'];
$subtotal = $data['subtotal'];
$hasDiscount = $data['hasDiscount'];
$discountAmount = $data['discountAmount'];
$shipping = $data['shipping'];
$shippingMethod = $data['shippingMethod'];
$total = $data['total'];
$orderDate = $data['orderDate'];
$itemsHtml = $data['itemsHtml'];

// Spremi narudžbu u bazu podataka (primjer - prilagodite svojim potrebama)
// saveOrderToDatabase($data);

// Pripremi email za kupca
$customerEmail = $customerInfo['email'];
$customerName = $customerInfo['firstName'] . ' ' . $customerInfo['lastName'];

// HTML za email kupcu
$customerEmailHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Potvrda narudžbe - Crafthana</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #f7f7f7;
        }
        .header img {
            max-width: 200px;
        }
        h1 {
            color: #2D4F2D;
        }
        .order-details {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
            padding: 10px;
        }
        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #eee;
            margin-top: 30px;
        }
        .social {
            margin: 20px 0;
        }
        .social a {
            margin: 0 10px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://crafthana.store/images/logojez.png" alt="Crafthana Logo">
            <h1>Hvala na vašoj narudžbi!</h1>
        </div>
        
        <p>Poštovani/a ' . $customerName . ',</p>
        
        <p>Primili smo vašu narudžbu i trenutno je obrađujemo. Evo pregleda vaše narudžbe:</p>
        
        <div class="order-details">
            <p><strong>Broj narudžbe:</strong> ' . $orderId . '</p>
            <p><strong>Datum:</strong> ' . $orderDate . '</p>
        </div>
        
        <h2>Naručeni proizvodi</h2>
        <table>
            <thead>
                <tr>
                    <th>Proizvod</th>
                    <th>Bazno ulje</th>
                    <th>Količina</th>
                    <th>Cijena</th>
                    <th>Ukupno</th>
                </tr>
            </thead>
            <tbody>
                ' . $itemsHtml . '
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Međuzbroj:</strong></td>
                    <td style="text-align: right; padding: 10px;">' . $subtotal . ' KM</td>
                </tr>
                ' . ($hasDiscount ? '
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Popust:</strong></td>
                    <td style="text-align: right; padding: 10px;">-' . $discountAmount . ' KM</td>
                </tr>' : '') . '
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Dostava (' . $shippingMethod . '):</strong></td>
                    <td style="text-align: right; padding: 10px;">' . ($shipping > 0 ? $shipping . ' KM' : 'Besplatno') . '</td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px; font-weight: bold;"><strong>Ukupno:</strong></td>
                    <td style="text-align: right; padding: 10px; font-weight: bold;">' . $total . ' KM</td>
                </tr>
            </tfoot>
        </table>
        
        <h2>Podaci za dostavu</h2>
        <div class="order-details">
            <p><strong>Ime i prezime:</strong> ' . $customerName . '</p>
            <p><strong>Email:</strong> ' . $customerInfo['email'] . '</p>
            <p><strong>Telefon:</strong> ' . $customerInfo['phone'] . '</p>
            <p><strong>Adresa:</strong> ' . $customerInfo['address'] . '</p>
            <p><strong>Grad:</strong> ' . $customerInfo['city'] . '</p>
            <p><strong>Poštanski broj:</strong> ' . $customerInfo['postalCode'] . '</p>
            <p><strong>Način dostave:</strong> ' . $shippingMethod . '</p>
            <p><strong>Način plaćanja:</strong> Plaćanje pouzećem</p>
        </div>
        
        <p>Kontaktirat ćemo vas uskoro kako bismo potvrdili vašu narudžbu i dogovorili detalje dostave.</p>
        
        <p>Ako imate bilo kakva pitanja, slobodno nas kontaktirajte na <a href="mailto:info@crafthana.store">info@crafthana.store</a>.</p>
        
        <p>Srdačan pozdrav,<br>Tim Crafthana</p>
        
        <div class="footer">
            <div class="social">
                <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">TikTok</a>
            </div>
            <p>&copy; 2025 Crafthana. Sva prava pridržana.</p>
            <p>Email: info@crafthana.store | Online narudžbe 24/7</p>
        </div>
    </div>
</body>
</html>
';

// HTML za email administratoru
$adminEmailHtml = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nova narudžba - Crafthana</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            padding: 20px 0;
            background-color: #2D4F2D;
            color: white;
            text-align: center;
        }
        h1 {
            margin: 0;
        }
        .order-details {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
            padding: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Nova narudžba: ' . $orderId . '</h1>
        </div>
        
        <p>Upravo je stigla nova narudžba. Detalji su navedeni ispod:</p>
        
        <div class="order-details">
            <p><strong>Broj narudžbe:</strong> ' . $orderId . '</p>
            <p><strong>Datum:</strong> ' . $orderDate . '</p>
            <p><strong>Ukupno:</strong> ' . $total . ' KM</p>
        </div>
        
        <h2>Naručeni proizvodi</h2>
        <table>
            <thead>
                <tr>
                    <th>Proizvod</th>
                    <th>Bazno ulje</th>
                    <th>Količina</th>
                    <th>Cijena</th>
                    <th>Ukupno</th>
                </tr>
            </thead>
            <tbody>
                ' . $itemsHtml . '
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Međuzbroj:</strong></td>
                    <td style="text-align: right; padding: 10px;">' . $subtotal . ' KM</td>
                </tr>
                ' . ($hasDiscount ? '
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Popust:</strong></td>
                    <td style="text-align: right; padding: 10px;">-' . $discountAmount . ' KM</td>
                </tr>' : '') . '
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px;"><strong>Dostava (' . $shippingMethod . '):</strong></td>
                    <td style="text-align: right; padding: 10px;">' . ($shipping > 0 ? $shipping . ' KM' : 'Besplatno') . '</td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: right; padding: 10px; font-weight: bold;"><strong>Ukupno:</strong></td>
                    <td style="text-align: right; padding: 10px; font-weight: bold;">' . $total . ' KM</td>
                </tr>
            </tfoot>
        </table>
        
        <h2>Podaci kupca</h2>
        <div class="order-details">
            <p><strong>Ime i prezime:</strong> ' . $customerName . '</p>
            <p><strong>Email:</strong> ' . $customerInfo['email'] . '</p>
            <p><strong>Telefon:</strong> ' . $customerInfo['phone'] . '</p>
            <p><strong>Adresa:</strong> ' . $customerInfo['address'] . '</p>
            <p><strong>Grad:</strong> ' . $customerInfo['city'] . '</p>
            <p><strong>Poštanski broj:</strong> ' . $customerInfo['postalCode'] . '</p>
            <p><strong>Način dostave:</strong> ' . $shippingMethod . '</p>
            <p><strong>Način plaćanja:</strong> Plaćanje pouzećem</p>
        </div>
    </div>
</body>
</html>
';

// Učitavanje PHPMailer-a iz lokalnog direktorija
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
require_once 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Funkcija za slanje e-maila koristeći PHPMailer
function sendEmailWithPHPMailer($to, $toName, $subject, $htmlBody) {
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.zoho.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'info@crafthana.store';
        $mail->Password = '4amwscp8u4Uw';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        
        // Recipients
        $mail->setFrom('info@crafthana.store', 'Crafthana');
        $mail->addAddress($to, $toName);
        $mail->addReplyTo('info@crafthana.store', 'Crafthana Info');
        
        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $htmlBody;
        $mail->CharSet = 'UTF-8';
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Greška pri slanju e-maila: " . $mail->ErrorInfo);
        return false;
    }
}

// Pošalji email kupcu
$subject = "Potvrda narudžbe #" . $orderId . " - Crafthana";
$result1 = sendEmailWithPHPMailer($customerEmail, $customerName, $subject, $customerEmailHtml);

// Pošalji email administratoru
$adminEmail = "info@crafthana.store";
$adminName = "Crafthana Admin";
$adminSubject = "Nova narudžba #" . $orderId . " - Crafthana";
$result2 = sendEmailWithPHPMailer($adminEmail, $adminName, $adminSubject, $adminEmailHtml);

// Odgovori s rezultatom
if ($result1 && $result2) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Narudžba uspješno obrađena i e-mailovi poslani']);
} else {
    // Ako je slanje e-maila neuspješno, još uvijek možemo smatrati narudžbu uspješnom
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Narudžba uspješno obrađena, ali postoji problem sa slanjem e-maila']);
}
?>
