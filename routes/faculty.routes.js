const express = require('express');
const {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require('../controllers/faculty.controller');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour sécuriser les routes

const router = express.Router();

// Route pour créer une faculté
router.post('/', isAdmin, createFaculty);

// Route pour récupérer toutes les facultés
router.get('/', getAllFaculties);

// Route pour récupérer une faculté par ID
router.get('/:id', getFacultyById);

// Route pour mettre à jour une faculté
router.put('/:id', isAdmin, updateFaculty);

// Route pour supprimer une faculté
router.delete('/:id', isAdmin, deleteFaculty);

module.exports = router;