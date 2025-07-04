const express = require('express');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Reclamation = require('../models/reclamation');
const { loginTeacher } = require('../controllers/teacher.controller');
const { verifyTeacherToken } = require('../middlewares/isTeacher.middleware'); // Middleware pour vérifier si l'utilisateur est un enseignant

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

// Route pour récupérer tous les cours enseignés par un professeur
router.get('/:id/courses', verifyTeacherToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le professeur existe
    const teacher = await Teacher.findById(id).populate('courses');
    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé.' });
    }

    // Récupérer les cours associés au professeur avec les informations complètes des promotions, sections et facultés
    const courses = await Course.find({ _id: { $in: teacher.courses } })
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      });

    // Construire la réponse enrichie
    const enrichedCourses = courses.map(course => ({
      title: course.title,
      description: course.description,
      credits: course.credits,
      promotion: {
        id : course.promotion.id,
        nom: course.promotion.nom,
        section: course.promotion.section,
        faculty: course.promotion.faculty,
      },
    }));

    res.status(200).json({
      teacher: {
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone,
      },
      courses: enrichedCourses,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours.', error: err.message });
    console.log(err)
  }
});

// Route pour récupérer les informations du professeur connecté via le token
router.get('/me', verifyTeacherToken, async (req, res) => {
  try {
    const teacherId = req.teacher.id; // L'ID du professeur est extrait du token

    // Récupérer les informations du professeur avec les cours peuplés
    const teacher = await Teacher.findById(teacherId).populate({
      path: 'courses',
      populate: {
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      }
    });

    if (!teacher) {
      return res.status(404).json({ message: 'Enseignant non trouvé.' });
    }

    // Construire la réponse enrichie
    const teacherInfo = {
      _id: teacher._id,
      fullName: teacher.fullName,
      email: teacher.email,
      phone: teacher.phone,
      totalCourses: teacher.courses.length,
      courses: teacher.courses.map(course => ({
        _id: course._id,
        title: course.title,
        description: course.description,
        credits: course.credits,
        promotion: {
          _id: course.promotion._id,
          nom: course.promotion.nom,
          section: course.promotion.section,
          faculty: course.promotion.faculty,
        },
      })),
    };

    res.status(200).json(teacherInfo);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des informations du professeur.', error: err.message });
  }
});

// Route pour récupérer toutes les réclamations de l'enseignant connecté
router.get('/me/reclamations', verifyTeacherToken, async (req, res) => {
  try {
    const teacherId = req.teacher.id; // L'ID du professeur est extrait du token

    // Récupérer les réclamations associées à l'enseignant
    const reclamations = await Reclamation.find({ teacher: teacherId })
      .populate({
        path: 'student',
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      });

    res.status(200).json(reclamations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réclamations.', error: err.message });
  }
});

// Route pour récupérer les détails d'une réclamation spécifique
router.get('/reclamations/:idReclamation', verifyTeacherToken, async (req, res) => {
  try {
    const { idReclamation } = req.params;

    // Récupérer la réclamation par son ID
    const reclamation = await Reclamation.findById(idReclamation)
      .populate('teacher') // Peupler les informations du professeur
      .populate({
        path: 'student',
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      });

    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée.' });
    }

    res.status(200).json(reclamation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des détails de la réclamation.', error: err.message });
  }
});

module.exports = router;