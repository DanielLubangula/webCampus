const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/admin.controller');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin


const router = express.Router();

// Créer un nouveau cours
router.post('/',isAdmin, createCourse);

// Obtenir la liste de tous les cours
router.get('/',isAdmin, getAllCourses);

// Obtenir un cours par ID
router.get('/:id',isAdmin, getCourseById);

// Mettre à jour un cours
router.put('/:id',isAdmin, updateCourse);

// Supprimer un cours
router.delete('/:id',isAdmin, deleteCourse);

module.exports = router;