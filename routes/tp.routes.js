const express = require('express');
const TP = require('../models/tp.model');
const { tpUpload } = require('../middlewares/tp.middleware');
const { verifyTeacherToken } = require('../middlewares/isTeacher.middleware');

const router = express.Router();

// Route pour publier un TP
router.post('/', verifyTeacherToken, tpUpload.single('file'), async (req, res) => {
  try {
    console.log('******** *  promotion   : ', req.body.promotion)
    const { title, description, promotion, deadline } = req.body;

    // const file = req.file ? req.file.path : null;
    const file = req.file ? `/uploads/tp/${req.file.filename}` : null

    if (!title || !description || !promotion || !deadline) {
      return res.status(400).json({ message: 'Tous les champs requis doivent être remplis.' });
    }


    const tp = new TP({
      title,
      description,
      promotion,
      file,
      deadline,
      teacher: req.teacher.id, // ID du professeur récupéré via le middleware
    });

    await tp.save();

    res.status(201).json({ message: 'TP publié avec succès.', tp });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la publication du TP.', error: err.message });
    console.log(err)
  }
});

// Route pour récupérer tous les TPs liés à une promotion
router.get('/promotion/:promotionId', async (req, res) => {
  try {
    const { id } = req.params;
    const tps = await TP.find({ promotion: id })
      .populate('teacher') // Populate teacher information
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section', model: 'Section' }, // Populate section from promotion
          { path: 'faculty', model: 'Faculty' }  // Populate faculty from promotion
        ]
      });
    if (!tps || tps.length === 0) {
      return res.status(404).json({ message: 'Aucun TP trouvé pour cette promotion.' });
    }

    res.status(200).json({ tps });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des TPs.', error: err.message });
    console.log(err);
  }
});

// Route pour récupérer tous les TPs existants
router.get('/', async (req, res) => {
  try {
    const tps = await TP.find()
      .populate('teacher') // Populate teacher information
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section', model: 'Section' }, // Populate section from promotion
          { path: 'faculty', model: 'Faculty' }  // Populate faculty from promotion
        ]
      });

    if (!tps || tps.length === 0) {
      return res.status(404).json({ message: 'Aucun TP trouvé.' });
    }

    res.status(200).json({ tps });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des TPs.', error: err.message });
    console.log(err);
  }
});


module.exports = router;