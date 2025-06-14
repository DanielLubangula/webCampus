const express = require('express');
const TP = require('../models/tp.model');
const { tpUpload } = require('../middlewares/tp.middleware');
const { verifyTeacherToken } = require('../middlewares/isTeacher.middleware');

const router = express.Router();

// Route pour publier un TP
router.post('/', verifyTeacherToken, tpUpload.single('file'), async (req, res) => {
  try {
    const { title, description, promotion, level } = req.body;
    const file = req.file ? req.file.path : null;

    if (!title || !description || !promotion || !level) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
    }

    // Vérifier si le niveau est valide
    const validLevels = ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ message: 'Le niveau d\'études est invalide.' });
    }

    const tp = new TP({
      title,
      description,
      promotion,
      level,
      file,
      teacher: req.teacher.id, // ID du professeur récupéré via le middleware
    });

    await tp.save();

    res.status(201).json({ message: 'TP publié avec succès.', tp });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la publication du TP.', error: err.message });
  }
});

// Route pour récupérer les TPs par promotion et niveau
router.get('/:promotion/:level', async (req, res) => {
  try {
    const { promotion, level } = req.params;

    // Vérifier si le niveau est valide
    const validLevels = ['G1', 'G2', 'L1', 'L2', 'L3', 'M1', 'M2'];
    if (!validLevels.includes(level)) {
      return res.status(400).json({ message: 'Le niveau d\'études est invalide.' });
    }

    const tps = await TP.find({ promotion, level });
    res.status(200).json(tps);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des TPs.', error: err.message });
  }
});

module.exports = router;