const express = require('express');
const Schedule = require('../models/schedule');
const Course = require('../models/course');
const isAdmin = require('../middlewares/isAdmin.middleware');
const Student = require('../models/student'); // Importer le modèle Student

const router = express.Router();

// Route pour créer un horaire
router.post('/', isAdmin, async (req, res) => {
  try {
    const { jour, heure_debut, heure_fin, salle, cours } = req.body;

    if (!jour || !heure_debut || !heure_fin || !salle || !cours) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    // Vérifier si le cours existe
    const course = await Course.findById(cours).populate('promotion');
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé.' });
    }

    // Vérifier si le champ promotion est défini
    if (!course.promotion) {
      return res.status(400).json({ message: 'Le cours spécifié n\'a pas de promotion associée.' });
    }


    const schedule = new Schedule({ jour, heure_debut, heure_fin, salle, cours });
    await schedule.save();

    res.status(201).json({ message: 'Horaire créé avec succès.', schedule });
  } catch (err) {
    console.log('Erreur', err)
    res.status(500).json({ message: 'Erreur lors de la création de l\'horaire.', error: err.message });
  }
});


// Route pour récupérer tous les horaires
router.get('/', isAdmin, async (req, res) => {
  try {
    const schedules = await Schedule.find().populate({
      path: 'cours',
      populate: {
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      }
    });

    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des horaires.', error: err.message });
    console.log("Erreur", err)
  }
});

// Route pour récupérer un horaire par ID
// router.get('/:id', isAdmin, async (req, res) => {
//   try {
//     const schedule = await Schedule.findById(req.params.id).populate('cours');
//     if (!schedule) {
//       return res.status(404).json({ message: 'Horaire non trouvé.' });
//     }
//     res.status(200).json(schedule);
//   } catch (err) {
//     res.status(500).json({ message: 'Erreur lors de la récupération de l\'horaire.', error: err.message });
//   }
// });

// Route pour mettre à jour un horacèraaaa  ire
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { jour, heure_debut, heure_fin, salle, cours } = req.body;

    if (!jour || !heure_debut || !heure_fin || !salle || !cours) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const course = await Course.findById(cours);
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé.' });
    }

    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { jour, heure_debut, heure_fin, salle, cours },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé.' });
    }

    res.status(200).json({ message: 'Horaire mis à jour avec succès.', schedule });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'horaire.', error: err.message });
  }
});

// Route pour supprimer un horaire
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Horaire non trouvé.' });
    }
    res.status(200).json({ message: 'Horaire supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'horaire.', error: err.message });
  }
});

const { verifyStudentToken } = require('../middlewares/isStudent.middleware'); // Middleware pour vérifier l'étudiant connecté

// Route pour récupérer les horaires en fonction de l'étudiant connecté
// router.get('/by-student', verifyStudentToken, async (req, res) => {
//   try {
//     // Récupérer l'étudiant connecté avec la promotion + section + faculty
//     const student = await Student.findById(req.student.id)
//       .populate({
//         path: 'promotion',
//         populate: ['section', 'faculty']
//       });

//     if (!student) {
//       return res.status(404).json({ message: 'Étudiant non trouvé.' });
//     }

//     if (!student.promotion || !student.promotion._id) {
//       return res.status(400).json({ message: 'L’étudiant n’a pas de promotion associée.' });
//     }

//     // Récupérer les horaires correspondant à la promotion de l'étudiant
//     const schedules = await Schedule.find({})
//       .populate('cours');

//       console.log('schedules', schedules)

//     if (!schedules || schedules.length === 0) {
//       return res.status(404).json({ message: 'Aucun horaire trouvé pour cette promotion.' });
//     }

//     res.status(200).json(schedules);
//   } catch (err) {
//     console.error('Erreur lors de la récupération des horaires :', err);
//     res.status(500).json({ message: 'Erreur lors de la récupération des horaires.', error: err.message });
//   }
// });


// // Route pour récupérer les horaires en fonction de l'étudiant connecté
// router.get('/by-student', verifyStudentToken, async (req, res) => {
//   try {
//     // Récupérer l'étudiant connecté
//     const student = await Student.findById(req.student.id).populate('promotion');
//     if (!student) {
//       return res.status(404).json({ message: 'Étudiant non trouvé.' });
//     }

//     console.log('R ', student.promotion )
//     // Récupérer les horaires correspondant à la promotion et à la faculté de l'étudiant
//     const schedules = await Schedule.find()
//       .populate({
//         path: 'cours',
//         populate: {
//           path: 'promotion',
//           match: { _id: student.promotion._id },
//           populate: { path: 'section', match: { _id: student.section._id } },
//         },
//       });
//     if (!schedules || schedules.length === 0) {
//       return res.status(404).json({ message: 'Aucun horaire trouvé pour cet étudiant.' });
//     }

//     // Filtrer les horaires pour lesquels la promotion et la faculté correspondent
//     const filteredSchedules = schedules.filter(schedule => schedule.cours.promotion && schedule.cours.promotion.faculty);

//     res.status(200).json(filteredSchedules);
//   } catch (err) {
//     console.log("Err", err)
//     res.status(500).json({ message: 'IErreur lors de la récupération des horaires.', error: err.message });
//   }
// });

module.exports = router;