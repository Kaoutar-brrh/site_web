require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ➕ Utilise le PORT fourni par Railway
const PORT = process.env.PORT || 5502;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Route HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour traiter le formulaire
app.post('/send_email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: 'kaoutarbrahimi28@gmail.com',
    subject: `Message de ${name}`,
    text: `Téléphone : ${phone}\n\nMessage : ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erreur lors de l’envoi');
    } else {
      console.log('Email envoyé : ' + info.response);
      res.redirect('/');
    }
  });
});

// ✅ Change ici : Railway a besoin de 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});

console.log("JS chargé !");
