const express = require('express');
const {
  createSection,
  getAllSections,
  getSectionById,
  updateSection,
  deleteSection,
} = require('../controllers/section.controller');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour sécuriser les routes

const router = express.Router();

// Route pour créer une section
router.post('/', isAdmin, createSection);

// Route pour récupérer toutes les sections
router.get('/', getAllSections);

// Route pour récupérer une section par ID
router.get('/:id', getSectionById);

// Route pour mettre à jour une section
router.put('/:id', isAdmin, updateSection);

// Route pour supprimer une section
router.delete('/:id', isAdmin, deleteSection);

module.exports = router;