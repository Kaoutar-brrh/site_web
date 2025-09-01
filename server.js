const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5501;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Route HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour traiter le formulairettsllcxpscbjpbks
app.post('/send_email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kaoutarbrahimi28@gmail.com',
      pass: 'ptwm zjnl dbiz lnpk' 
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

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});


console.log("JS chargé !");
