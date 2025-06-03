const multer = require('multer');
const path = require('path');

// Configuration de multer pour le stockage local
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profil'); // dossier local où seront enregistrés les fichiers
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `image-profil-by-Daniel-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const uploadProof = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } // Limite de taille : 5Mo
}).single('paymentProof');

module.exports = uploadProof;
