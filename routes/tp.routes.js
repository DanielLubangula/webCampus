const express = require('express');
const TP = require('../models/tp.model');
const { tpUpload } = require('../middlewares/tp.middleware');
const { verifyTeacherToken } = require('../middlewares/isTeacher.middleware');

const router = express.Router();

// Route pour publier un TP
router.post('/', verifyTeacherToken, tpUpload.single('file'), async (req, res) => {
  try {
    const { title, description, promotion } = req.body;

    // const file = req.file ? req.file.path : null;
    const file = req.file ? `/uploads/tp/${req.file.filename}` : null

    if (!title || !description || !promotion) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
    }


    const tp = new TP({
      title,
      description,
      promotion,
      file,
      teacher: req.teacher.id, // ID du professeur récupéré via le middleware
    });

    await tp.save();

    res.status(201).json({ message: 'TP publié avec succès.', tp });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la publication du TP.', error: err.message });
    console.log(err)
  }
});

// Route pour récupérer tous les TPs liés à une promotion et une section
router.get('/promotion/:promotionId/section/:sectionId', async (req, res) => {
  try {
    const { promotionId, sectionId } = req.params;

    // Récupérer les TPs correspondant à la promotion et à la section spécifiées
    const tps = await TP.find({ promotion: promotionId })
      .populate({
        path: 'promotion',
        match: { section: sectionId }, // Filtrer par section
        populate: { path: 'section' }, // Récupérer les informations complètes de la section
      });

    if (!tps || tps.length === 0) {
      return res.status(404).json({ message: 'Aucun TP trouvé pour cette promotion et section.' });
    }

    res.status(200).json(tps);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des TPs.', error: err.message });
  }
});

module.exports = router;