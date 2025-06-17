const Faculty = require('../models/faculty');

// Créer une nouvelle faculté
exports.createFaculty = async (req, res) => {
  try {
    const { nom } = req.body;

    if (!nom) {
      return res.status(400).json({ message: 'Le nom de la faculté est requis.' });
    }

    const faculty = new Faculty({ nom });
    await faculty.save();

    res.status(201).json({ message: 'Faculté créée avec succès.', faculty });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de la faculté.', error: err.message });
  }
};

// Récupérer toutes les facultés
exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des facultés.', error: err.message });
  }
};

// Récupérer une faculté par ID
exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;
    const faculty = await Faculty.findById(id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculté non trouvée.' });
    }

    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la faculté.', error: err.message });
  }
};

// Mettre à jour une faculté
exports.updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    if (!nom) {
      return res.status(400).json({ message: 'Le nom de la faculté est requis.' });
    }

    const faculty = await Faculty.findByIdAndUpdate(id, { nom }, { new: true });

    if (!faculty) {
      return res.status(404).json({ message: 'Faculté non trouvée.' });
    }

    res.status(200).json({ message: 'Faculté mise à jour avec succès.', faculty });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la faculté.', error: err.message });
  }
};

// Supprimer une faculté
exports.deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findByIdAndDelete(id);

    if (!faculty) {
      return res.status(404).json({ message: 'Faculté non trouvée.' });
    }

    res.status(200).json({ message: 'Faculté supprimée avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la faculté.', error: err.message });
  }
};