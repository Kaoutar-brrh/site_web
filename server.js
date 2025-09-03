require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5502;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sert les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route d'envoi de mail
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
    to: process.env.EMAIL_USER,
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

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
