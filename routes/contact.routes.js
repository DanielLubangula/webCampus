const express = require('express');
const { createContactMessage, getAllContactMessages } = require('../controllers/contact.controller');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour sécuriser l'accès admin

const router = express.Router();

// Route pour envoyer un message de contact
router.post('/', createContactMessage);

// Route pour récupérer tous les messages de contact (admin uniquement)
router.get('/', isAdmin, getAllContactMessages);

module.exports = router;