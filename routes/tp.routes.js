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

// Route pour récupérer un seul TP par ID
router.get('/:tpId', async (req, res) => {
  try {
    const { tpId } = req.params;

    // Rechercher le TP par ID
    const tp = await TP.findById(tpId)
      .populate('teacher') // Populate teacher information
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section', model: 'Section' }, // Populate section from promotion
          { path: 'faculty', model: 'Faculty' }  // Populate faculty from promotion
        ]
      });

    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé.' });
    }

    res.status(200).json({ tp });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération du TP.', error: err.message });
    console.log(err);
  }
});

// Route pour récupérer tous les TPs liés à une promotion
router.get('/promotion/:promotionId/section/:idnonutile', async (req, res) => {
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

// Route pour supprimer un TP
router.delete('/:tpId', verifyTeacherToken, async (req, res) => {
  try {
    const { tpId } = req.params; // ID du TP à supprimer
    const teacherId = req.teacher.id; // ID du professeur connecté extrait du token

    // Vérifier si le TP existe
    const tp = await TP.findById(tpId);
    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé.' });
    }

    // Vérifier si le professeur connecté est celui qui a créé le TP
    if (tp.teacher.toString() !== teacherId) {
      return res.status(403).json({ message: 'Accès refusé : seul le créateur du TP peut le supprimer.' });
    }

    // Supprimer le TP
    await TP.findByIdAndDelete(tpId);

    res.status(200).json({ message: 'TP supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du TP.', error: err.message });
    console.log(err);
  }
});

// Route pour modifier un TP
router.put('/:tpId', verifyTeacherToken, async (req, res) => {
  try {
    const { tpId } = req.params; // ID du TP à modifier
    const teacherId = req.teacher.id; // ID du professeur connecté extrait du token
    const updates = req.body; // Données à mettre à jour

    // Vérifier si le TP existe
    const tp = await TP.findById(tpId);
    if (!tp) {
      return res.status(404).json({ message: 'TP non trouvé.' });
    }

    // Vérifier si le professeur connecté est celui qui a créé le TP
    if (tp.teacher.toString() !== teacherId) {
      return res.status(403).json({ message: 'Accès refusé : seul le créateur du TP peut le modifier.' });
    }

    // Mettre à jour le TP
    const updatedTP = await TP.findByIdAndUpdate(tpId, updates, { new: true });

    res.status(200).json({ message: 'TP modifié avec succès.', tp: updatedTP });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification du TP.', error: err.message });
    console.log(err);
  }
});


module.exports = router;