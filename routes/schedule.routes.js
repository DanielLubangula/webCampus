const express = require('express');
const Schedule = require('../models/schedule');
const isAdmin = require('../middlewares/isAdmin.middleware'); // Middleware pour vérifier si l'utilisateur est admin

const router = express.Router();

// Route pour créer ou modifier un horaire de cours
/*ex json

{
  "promotion": "60d5f9b8c2a4f12d8c8e4b9e",
  "level": "L2",
  "courses": [
    {
      "day": "Lundi",
      "time": "08:00 - 10:00",
      "title": "Programmation Web",
      "teacher": "60d5f9b8c2a4f12d8c8e4b9e",
      "room": "B201"
    },
    {
      "day": "Mercredi",
      "time": "10:00 - 12:00",
      "title": "Réseaux",
      "teacher": "60d5f9b8c2a4f12d8c8e4b9e",
      "room": "B103"
    }
  ]
}
*/
router.post('/', isAdmin, async (req, res) => {
  try {
    const { promotion, level, courses } = req.body;

    if (!promotion || !level || !courses || courses.length === 0) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si un horaire existe déjà pour cette promotion
    const existingSchedule = await Schedule.findOne({ promotion });
    if (existingSchedule) {
      return res.status(400).json({ message: 'Un horaire existe déjà pour cette promotion.' });
    }

    const schedule = new Schedule({ promotion, level, courses });
    await schedule.save();

    res.status(201).json({ message: 'Horaire créé avec succès.', schedule });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'horaire.', error: err.message });
  }
});

// Route pour modifier un horaire existant
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { courses } = req.body;

    if (!courses || courses.length === 0) {
      return res.status(400).json({ message: 'Les cours sont requis pour modifier l\'horaire.' });
    }

    const schedule = await Schedule.findByIdAndUpdate(id, { courses }, { new: true });
    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé.' });
    }

    res.status(200).json({ message: 'Horaire modifié avec succès.', schedule });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification de l\'horaire.', error: err.message });
  }
});

// Route pour récupérer l'horaire d'une promotion
router.get('/:promotionId', async (req, res) => {
  try {
    const { promotionId } = req.params;

    const schedule = await Schedule.findOne({ promotion: promotionId }).populate('promotion').populate('courses.teacher');
    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé.' });
    }

    res.status(200).json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'horaire.', error: err.message });
  }
});

module.exports = router;