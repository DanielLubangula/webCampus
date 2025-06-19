const express = require('express');
const Promotion = require('../models/promotion');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin

const router = express.Router();

// Route pour créer une nouvelle promotion
router.post('/', isAdmin, async (req, res) => {
  try {
    const { nom, section, faculty } = req.body;
    const promotion = new Promotion({ nom, section, faculty });
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer toutes les promotions
// Route pour récupérer toutes les promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .populate('faculty') // Récupérer les informations liées à la faculté
      .populate('section'); // Récupérer les informations liées à la section

    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour récupérer une promotion par ID
router.get('/:id', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id).populate('faculty').populate('section');
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour mettre à jour une promotion par ID
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { nom, section, faculty } = req.body;
    const promotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      { nom, section, faculty },
      { new: true, runValidators: true }
    );
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer une promotion par ID
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;