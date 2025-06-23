const express = require('express');
const Reclamation = require('../models/reclamation');
const { verifyStudentToken } = require('../middlewares/isStudent.middleware'); // Middleware pour vérifier si l'utilisateur est étudiant

const router = express.Router();

// Route pour soumettre une réclamation
router.post('/', verifyStudentToken, async (req, res) => {
  try {
    const { type, subject, message, teacher } = req.body;

    if (!type || !subject || !message || !teacher) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const reclamation = new Reclamation({
      student: req.student.id, // ID de l'étudiant récupéré via le middleware
      teacher,
      type,
      subject,
      message,
    });

    await reclamation.save();

    res.status(201).json({ message: 'Réclamation soumise avec succès.', reclamation });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la soumission de la réclamation.', error: err.message });
  }
});

// Route pour récupérer les réclamations d'un étudiant
router.get('/', verifyStudentToken, async (req, res) => {
  try {
    const reclamations = await Reclamation.find({ student: req.student.id }).populate('teacher');
    res.status(200).json(reclamations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réclamations.', error: err.message });
  }
});

// Route pour récupérer une réclamation par ID
router.get('/:id', verifyStudentToken, async (req, res) => {
  try {
    const { id } = req.params;
    const reclamation = await Reclamation.findById(id).populate('teacher');
    if (!reclamation || reclamation.student.toString() !== req.student.id) {
      return res.status(404).json({ message: 'Réclamation non trouvée ou accès refusé.' });
    }
    res.status(200).json(reclamation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la réclamation.', error: err.message });
  }
});

module.exports = router;