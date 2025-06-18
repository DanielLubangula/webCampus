const express = require('express');
const Annonce = require('../models/annonce.model');

const router = express.Router();

// Route pour créer une nouvelle annonce
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const annonce = new Annonce({ title, description });
    await annonce.save();

    res.status(201).json({ message: 'Annonce créée avec succès.', annonce });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'annonce.', error: err.message });
  }
});

// Route pour récupérer toutes les annonces avec pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query; // Pagination par défaut : 5 annonces par page
    const annonces = await Annonce.find()
      .sort({ publishedAt: -1 }) // Trier par date de publication (plus récent en premier)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalAnnonces = await Annonce.countDocuments();

    res.status(200).json({
      annonces,
      totalPages: Math.ceil(totalAnnonces / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces.', error: err.message });
  }
});

// Route pour supprimer une annonce
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'annonce existe
    const annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée.' });
    }

    // Supprimer l'annonce
    await Annonce.findByIdAndDelete(id);

    res.status(200).json({ message: 'Annonce supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'annonce.', error: err.message });
  }
});

// Route pour récupérer une annonce par son ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée.' });
    }

    res.status(200).json(annonce);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'annonce.', error: err.message });
  }
});

// Route pour mettre à jour une annonce
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const annonce = await Annonce.findById(id);
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce non trouvée.' });
    }

    annonce.title = title;
    annonce.description = description;
    await annonce.save();

    res.status(200).json({ message: 'Annonce mise à jour avec succès.', annonce });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'annonce.', error: err.message });
  }
});

module.exports = router;