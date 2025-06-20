const express = require('express');
const adminController = require('../controllers/admin.controller');
const studentController = require('../controllers/student.controller');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin

const router = express.Router();


// Connexion de l'admin
router.post('/login', adminController.login);

// Inscription d'un étudiant
router.post('/students', isAdmin, adminController.registerStudent);


// Récupération de tous les étudiants
router.get('/students', isAdmin, adminController.getAllStudents);

// Récupération d'un étudiant par ID
router.get('/students/:id', isAdmin, adminController.getStudentById);

// Modification des infos d'un étudiant
router.put('/students/:id', isAdmin, adminController.updateStudent);

// Suppression d'un étudiant
router.delete('/students/:id', isAdmin, adminController.deleteStudent);

// Partie pour les enseignants

// Inscription d'un enseignant
router.post('/teachers', isAdmin, adminController.registerTeacher);

// Récupération de tous les enseignants
router.get('/teachers', isAdmin, adminController.getAllTeachers);

// Modification des infos d'un enseignant
router.get('/teachers/:id', isAdmin, adminController.getTeacherById);

// Modification des infos d'un enseignant
router.put('/teachers/:id', isAdmin, adminController.updateTeacher);

// Suppression d'un enseignant
router.delete('/teachers/:id', isAdmin, adminController.deleteTeacher);
// Récupérer un professeur par ID
router.get('/teachers/:id', isAdmin, adminController.getTeacherById);

// Récupérer les cours d'un professeur
router.get('/teachers/:id/courses', isAdmin, adminController.getTeacherCourses);

// Ajouter un cours à un professeur
router.post('/teachers/:id/courses', isAdmin, adminController.addCourseToTeacher);

// Retirer un cours d'un professeur
router.delete('/teachers/:id/courses', isAdmin, adminController.removeCourseFromTeacher);

router.post( '/', isAdmin, adminController.removeCourseFromTeacher);

// Route pour récupérer les étudiants par promotion
router.get('/students/promotion/:promotionId', isAdmin, adminController.getStudentPromotion);

// Route pour récupérer les statistiques 
router.get("/statistique", isAdmin, adminController.getStatistics);

module.exports = router;