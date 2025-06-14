const express = require('express');
const Promotion = require('../models/promotion');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin

const router = express.Router();

// Route pour créer une promotion
router.post('/', isAdmin, async (req, res) => {
  try {
    const { level, name, academicYear } = req.body;

    if (!level || !name || !academicYear) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si une promotion avec le même niveau et domaine existe déjà
    const existingPromotion = await Promotion.findOne({ level, name });
    if (existingPromotion) {
      return res.status(400).json({ message: 'Une promotion avec ce niveau et domaine existe déjà.' });
    }

    const promotion = new Promotion({ level, name, academicYear });
    await promotion.save();

    res.status(201).json({ message: 'Promotion créée avec succès.', promotion });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la promotion.', error: err.message });
  }
});

// Route pour récupérer toutes les promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des promotions.', error: err.message });
  }
});

// Route pour récupérer une promotion par ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée.' });
    }
    res.status(200).json(promotion);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la promotion.', error: err.message });
  }
});

// Route pour modifier une promotion
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { level, name, academicYear } = req.body;

    if (!level || !name || !academicYear) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const promotion = await Promotion.findByIdAndUpdate(
      id,
      { level, name, academicYear },
      { new: true }
    );
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée.' });
    }

    res.status(200).json({ message: 'Promotion modifiée avec succès.', promotion });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification de la promotion.', error: err.message });
  }
});

// Route pour supprimer une promotion
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const promotion = await Promotion.findByIdAndDelete(id);
    if (!promotion) {
      return res.status(404).json({ message: 'Promotion non trouvée.' });
    }

    res.status(200).json({ message: 'Promotion supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la promotion.', error: err.message });
  }
});

module.exports = router;