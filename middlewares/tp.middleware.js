const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Vérifier si le dossier existe, sinon le créer
const tpUploadPath = path.join(__dirname, '../uploads/tp');
if (!fs.existsSync(tpUploadPath)) {
  fs.mkdirSync(tpUploadPath, { recursive: true });
}

// Configuration de multer pour le stockage des fichiers TP
const tpStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tpUploadPath); // Dossier de stockage
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nom unique pour chaque fichier
  },
});

// Filtrage des fichiers (facultatif, si tu veux limiter les types de fichiers)
const tpFileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé'), false);
  }
};

const tpUpload = multer({ storage: tpStorage, fileFilter: tpFileFilter });

module.exports = { tpUpload };