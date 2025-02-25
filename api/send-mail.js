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
    const { email, subject, message } = req.body;

    // Provjera ulaznih podataka
    if (!email || !subject || !message) {
      return res.status(400).json({ message: "Nedostaju obavezni podaci" });
    }

    // Pošalji email
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: email,
      subject: subject,
      html: message
    });

    res.status(200).json({ message: "Email uspješno poslan" });
  } catch (error) {
    console.error('Greška pri slanju emaila:', error);
    res.status(500).json({ 
      message: "Greška pri slanju emaila", 
      error: error.toString() 
    });
  }
};
