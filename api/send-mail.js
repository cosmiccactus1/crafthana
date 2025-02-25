const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Prihvati samo POST metodu
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metoda nije dopuštena' });
  }

  // Provjera environment varijabli
  if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORD) {
    return res.status(500).json({ message: 'Nedostaju email kredencijali' });
  }

  // Konfiguriraj transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 587,
    secure: false, // TLS
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_APP_PASSWORD
    }
  });

  try {
    const { 
      orderId,
      customerInfo, 
      items, 
      itemsHtml,
      subtotal,
      hasDiscount,
      discountAmount,
      shipping,
      shippingMethod,
      total,
      orderDate
    } = req.body;

    // HTML za email kupcu
    const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <body>
      <h1>Potvrda narudžbe</h1>
      <p>Broj narudžbe: ${orderId}</p>
      <p>Datum: ${orderDate}</p>
      
      <h2>Detalji narudžbe:</h2>
      <table>
        <thead>
          <tr>
            <th>Artikl</th>
            <th>Količina</th>
            <th>Cijena</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p>Ukupno: ${total} KM</p>
    </body>
    </html>
    `;

    // Pošalji email kupcu
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: customerInfo.email,
      subject: `Potvrda narudžbe #${orderId}`,
      html: customerEmailHtml
    });

    // Pošalji email administratoru
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_EMAIL, // isti kao pošiljatelj
      subject: `Nova narudžba #${orderId}`,
      html: `
        <h1>Nova narudžba</h1>
        <p>Detalji:</p>
        <pre>${JSON.stringify(req.body, null, 2)}</pre>
      `
    });

    res.status(200).json({ 
      success: true, 
      message: 'Narudžba uspješno obrađena i emailovi poslani' 
    });

  } catch (error) {
    console.error('Greška pri slanju emaila:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Greška pri obradi narudžbe',
      error: error.toString() 
    });
  }
};
