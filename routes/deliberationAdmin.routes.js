const express = require('express');
const Deliberation = require('../models/deliberation');
const Student = require('../models/student');
const  verifyAdminToken  = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin

const router = express.Router();

// Route pour ajouter une délibération
router.post('/', verifyAdminToken, async (req, res) => {
  try {
    const { student, course, grade } = req.body;

    if (!student || !course || !grade) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const deliberation = new Deliberation({
      student,
      course,
      grade
    });

    await deliberation.save();

    res.status(201).json({ message: 'Délibération ajoutée avec succès.', deliberation });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la délibération.', error: err.message });
  }
});

// Route pour modifier une délibération
router.put('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { course, grade, credit } = req.body;

    if (!course || !grade || !credit) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const status = grade >= 10 ? 'Validé' : 'Échec'; // Déterminer le statut en fonction de la note

    const deliberation = await Deliberation.findByIdAndUpdate(
      id,
      { course, grade, credit, status },
      { new: true }
    );

    if (!deliberation) {
      return res.status(404).json({ message: 'Délibération non trouvée.' });
    }

    res.status(200).json({ message: 'Délibération modifiée avec succès.', deliberation });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification de la délibération.', error: err.message });
  }
});

// Route pour supprimer une délibération
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deliberation = await Deliberation.findByIdAndDelete(id);
    if (!deliberation) {
      return res.status(404).json({ message: 'Délibération non trouvée.' });
    }

    res.status(200).json({ message: 'Délibération supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la délibération.', error: err.message });
  }
});

// Route pour récupérer toutes les délibérations
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const deliberations = await Deliberation.find()
      .populate({
        path: 'student',
        select: '-password' // Exclure le mot de passe des étudiants
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
    res.status(200).json(deliberations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des délibérations.', error: err.message });
  }
});

// Route pour récupérer une délibération par ID
router.get('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deliberation = await Deliberation.findById(id).populate('student');
    if (!deliberation) {
      return res.status(404).json({ message: 'Délibération non trouvée.' });
    }

    res.status(200).json(deliberation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la délibération.', error: err.message });
  }
});

module.exports = router;