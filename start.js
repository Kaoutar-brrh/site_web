const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5501;

// Sert les fichiers statiques du dossier "public"
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
