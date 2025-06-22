const express = require('express');
const Deliberation = require('../models/deliberation');
const Student = require('../models/student');
const { verifyStudentToken } = require('../middlewares/isStudent.middleware'); // Middleware pour vérifier si l'utilisateur est étudiant

const router = express.Router();

// Route pour récupérer les délibérations de la promotion
router.get('/', verifyStudentToken, async (req, res) => {
  try {
    // Récupérer l'étudiant connecté
    const student = await Student.findById(req.student.id).populate('promotion');
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    // Récupérer les délibérations de la promotion et du   br
    const deliberations = await Deliberation.find()
      .populate({
        path: 'student',
        match: { promotion: student.promotion._id }
      })
      .populate({
        path: 'course',
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      });

    // Filtrer les délibérations pour la promotion et le niveau de l'étudiant
    const filteredDeliberations = deliberations.filter(
      (deliberation) => deliberation.student && deliberation.student.promotion.toString() === student.promotion._id.toString()
    );

    res.status(200).json(filteredDeliberations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des délibérations.', error: err.message });
  }
});

// Route pour récupérer une seule délibération pour l'étudiant connecté
router.get('/student/deliberation', verifyStudentToken, async (req, res) => {
  try {
    // Récupérer l'étudiant connecté
    const student = await Student.findById(req.student.id);
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé.' });
    }

    // Récupérer la délibération pour l'étudiant connecté
    const deliberation = await Deliberation.findOne({ student: student._id })
      .populate('student', '-password') // Peupler les informations de l'étudiant sans le mot de passe
      .populate({
        path: 'course',
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      });

    if (!deliberation) {
      return res.status(404).json({ message: 'Aucune délibération trouvée pour cet étudiant.' });
    }

    res.status(200).json(deliberation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la délibération.', error: err.message });
  }
});



module.exports = router;