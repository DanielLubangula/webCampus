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

    // Récupérer les délibérations de la promotion et du niveau
    const deliberations = await Deliberation.find()
      .populate('student')
      .populate({
        path: 'student',
        match: { promotion: student.promotion._id, level: student.level },
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

module.exports = router;