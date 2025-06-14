const express = require('express');
const Actualite = require('../models/actualite.model');
const multer = require('../config/multer.config');

const router = express.Router();

// Route pour créer une nouvelle actualité
router.post('/', multer.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!image || !title || !description) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const actualite = new Actualite({ image, title, description });
    await actualite.save();

    res.status(201).json({ message: 'Actualité créée avec succès.', actualite });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'actualité.', error: err.message });
  }
});

// Route pour récupérer toutes les actualités
router.get('/', async (req, res) => {
  try {
    const actualites = await Actualite.find().sort({ createdAt: -1 });
    res.status(200).json(actualites);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des actualités.', error: err.message });
  }
});

// Route pour supprimer une actualité
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Vérifier si l'actualité existe
      const actualite = await Actualite.findById(id);
      if (!actualite) {
        return res.status(404).json({ message: 'Actualité non trouvée.' });
      }
  
      // Supprimer l'actualité
      await Actualite.findByIdAndDelete(id);
  
      res.status(200).json({ message: 'Actualité supprimée avec succès.' });
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'actualité.', error: err.message });
    }
  });

module.exports = router;