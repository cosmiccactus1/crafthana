const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Dobijanje podataka iz zahteva
    const orderData = req.body;

    // Konfiguracija Zoho transportera
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_MAIL_USER,
        pass: process.env.ZOHO_MAIL_PASSWORD,
      },
    });

    // Email za vlasnike (vama)
    const adminMailOptions = {
      from: process.env.ZOHO_MAIL_USER,
      to: process.env.ZOHO_MAIL_USER, // može biti i drugi email ako želite
      subject: `Nova narudžba #${orderData.orderId}`,
      html: `
        <h1>Nova narudžba #${orderData.orderId}</h1>
        <h2>Podaci o kupcu</h2>
        <p>Ime i prezime: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}</p>
        <p>Email: ${orderData.customerInfo.email}</p>
        <p>Telefon: ${orderData.customerInfo.phone}</p>
        <p>Adresa: ${orderData.customerInfo.address}</p>
        <p>Grad: ${orderData.customerInfo.city}</p>
        <p>Poštanski broj: ${orderData.customerInfo.postalCode}</p>
        
        <h2>Naručeni proizvodi</h2>
        <table border="1" cellpadding="5" style="border-collapse:collapse;">
          <tr>
            <th>Proizvod</th>
            <th>Bazno ulje</th>
            <th>Količina</th>
            <th>Cijena</th>
          </tr>
          ${orderData.items.map(item => `
            <tr>
              <td>${item.name}</td>
              <td>${item.baseOil || 'N/A'}</td>
              <td>${item.quantity}</td>
              <td>${item.itemTotal} KM</td>
            </tr>
          `).join('')}
        </table>
        
        <p>Ukupan iznos: ${orderData.total} KM</p>
        <p>Način dostave: ${orderData.shippingMethod}</p>
      `,
    };

    // Email za kupca
    const customerMailOptions = {
      from: process.env.ZOHO_MAIL_USER,
      to: orderData.customerInfo.email,
      subject: `Potvrda narudžbe #${orderData.orderId}`,
      html: `
        <h1>Hvala na vašoj narudžbi!</h1>
        <p>Poštovani/a ${orderData.customerInfo.firstName},</p>
        <p>Vaša narudžba #${orderData.orderId} je uspješno zaprimljena.</p>
        <p>Kontaktirat ćemo vas uskoro radi potvrde detalja.</p>
        <p>Hvala što kupujete kod nas!</p>
      `,
    };

    // Slanje email-a vama
    await transporter.sendMail(adminMailOptions);
    
    // Slanje email-a kupcu
    await transporter.sendMail(customerMailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Greška pri slanju email-a:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
