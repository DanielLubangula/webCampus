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
    const { course, grade, student } = req.body;

    if (!course || !grade || !student) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const deliberation = await Deliberation.findByIdAndUpdate(
      id,
      { course, grade, student },
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
        select: '-password', // Exclure le mot de passe des étudiants
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      })
      .populate('course');
    res.status(200).json(deliberations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des délibérations.', error: err.message });
  }
});

// Route pour récupérer une délibération par ID
router.get('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deliberation = await Deliberation.findById(id).populate({
      path: 'student',
      select: '-password', // Exclure le mot de passe des étudiants
      populate: {
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      }
    })
    .populate('course');

    if (!deliberation) {
      return res.status(404).json({ message: 'Délibération non trouvée.' });
    }

    res.status(200).json(deliberation);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la délibération.', error: err.message });
  }
});

// Route pour récupérer les délibérations par promotion
router.get('/promotion/:promotionId', verifyAdminToken, async (req, res) => {
  try {
    const { promotionId } = req.params;

    const deliberations = await Deliberation.find()
      .populate({
        path: 'student',
        select: '-password',
        populate: {
          path: 'promotion',
          match: { _id: promotionId }, // Filtrer par l'ID de la promotion
          populate: [
            { path: 'section' },
            { path: 'faculty' }
          ]
        }
      })
      .populate('course');

    // Filtrer les délibérations où la promotion correspond
    const filteredDeliberations = deliberations.filter(deliberation => 
      deliberation.student?.promotion?._id?.toString() === promotionId
    );

    res.status(200).json(filteredDeliberations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des délibérations par promotion.', error: err.message });
  }
});

module.exports = router;