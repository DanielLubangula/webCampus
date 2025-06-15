const express = require('express');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Reclamation = require('../models/reclamation');
const { loginTeacher } = require('../controllers/teacher.controller');
const isTeacher = require('../middlewares/isTeacher.middleware'); // Middleware pour vérifier si l'utilisateur est un enseignant

const router = express.Router();

// Route pour la connexion des professeurs
router.post('/login', loginTeacher);

// Route pour récupérer le tableau de bord de l'enseignant
router.get('/:id/dashboard', async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer les informations de l'enseignant
    const teacher = await Teacher.findById(id).populate('courses');
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé.' });
    }

    // Récupérer les réclamations associées
    const reclamations = await Reclamation.find({ teacher: id });

    // Construire la réponse
    const dashboard = {
      profile: {
        fullName: teacher.fullName,
        email: teacher.email,
        totalCourses: teacher.courses.length,
      },
      courses: teacher.courses.map(course => ({
        title: course.title,
        description: course.description,
        credits: course.credits,
      })),
      reclamations: {
        total: reclamations.length,
      },
    };

    res.status(200).json(dashboard);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du tableau de bord.', error: err.message });
  }
});

module.exports = router;