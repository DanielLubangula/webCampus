const Section = require('../models/section');

// Créer une nouvelle section
exports.createSection = async (req, res) => {
  try {
    const { nom, description } = req.body;

    if (!nom) {
      return res.status(400).json({ message: 'Le nom de la section est requis.' });
    }

    const section = new Section({ nom, description });
    await section.save();

    res.status(201).json({ message: 'Section créée avec succès.', section });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la section.', error: err.message });
  }
};

// Récupérer toutes les sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des sections.', error: err.message });
  }
};

// Récupérer une section par ID
exports.getSectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const section = await Section.findById(id);

    if (!section) {
      return res.status(404).json({ message: 'Section non trouvée.' });
    }

    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la section.', error: err.message });
  }
};

// Mettre à jour une section
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    if (!nom) {
      return res.status(400).json({ message: 'Le nom de la section est requis.' });
    }

    const section = await Section.findByIdAndUpdate(id, { nom, description }, { new: true });

    if (!section) {
      return res.status(404).json({ message: 'Section non trouvée.' });
    }

    res.status(200).json({ message: 'Section mise à jour avec succès.', section });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la section.', error: err.message });
  }
};

// Supprimer une section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const section = await Section.findByIdAndDelete(id);

    if (!section) {
      return res.status(404).json({ message: 'Section non trouvée.' });
    }

    res.status(200).json({ message: 'Section supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la section.', error: err.message });
  }
};