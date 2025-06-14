const express = require('express');
const Student = require('../models/student'); // Modèle pour les étudiants
const Teacher = require('../models/teacher'); // Modèle pour les enseignants
const TP = require('../models/tp.model'); // Modèle pour les TP
const Promotion = require('../models/promotion'); // Modèle pour les promotions

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const studentCount = await Student.countDocuments(); // Nombre total d'étudiants
    const teacherCount = await Teacher.countDocuments(); // Nombre total d'enseignants
    const tpCount = await TP.countDocuments(); // Nombre total de TP publiés
    const promotionCount = await Promotion.countDocuments(); // Nombre total de promotions actives

    res.json({  
      studentsConnected: studentCount,
      teachers: teacherCount,
      tpsPublished: tpCount,
      activePromotions: promotionCount,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des statistiques', error: err.message });
  }
});

module.exports = router;