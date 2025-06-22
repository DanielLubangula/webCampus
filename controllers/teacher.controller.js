const TP = require('../models/tp.model');
const Teacher = require('../models/teacher');
const Course = require('../models/course');
const Promotion = require('../models/promotion');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.loginTeacher = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'email existe
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: teacher._id, role: 'teacher' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      teacher: {
        id: teacher._id,
        fullName: teacher.fullName,
        email: teacher.email,
      },
      role : "teacher" 
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.createTP = async (req, res) => {
  const { title, description, deadline, course, promotion, students } = req.body;

  try {
    const tp = new TP({
      title,
      description,
      deadline,
      course,
      teacher: req.teacher.id,
      promotion,
      students
    });

    await tp.save();
    res.status(201).json({ message: "TP créé avec succès", tp });
  } catch (err) {
    res.status(500).json({ message: "Erreur création TP", error: err.message });
  }
};

exports.updateTP = async (req, res) => {
  const { tpId } = req.params;

  try {
    const tp = await TP.findByIdAndUpdate(tpId, req.body, { new: true });
    res.json({ message: "TP mis à jour", tp });
  } catch (err) {
    res.status(500).json({ message: "Erreur mise à jour TP" });
  }
};

exports.deleteTP = async (req, res) => {
  const { tpId } = req.params;

  try {
    await TP.findByIdAndDelete(tpId);
    res.json({ message: "TP supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression TP" });
  }
};

exports.getMyTPs = async (req, res) => {
  try {
    const tps = await TP.find({ teacher: req.teacher.id })
      .populate('course')
      .populate('promotion');
    res.json(tps);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération TPs" });
  }
};

exports.getTPDetails = async (req, res) => {
  const { tpId } = req.params;

  try {
    const tp = await TP.findById(tpId)
      .populate('course')
      .populate('promotion')
      .populate('students', 'fullName cardNumber');
    res.json(tp);
  } catch (err) {
    res.status(500).json({ message: "Erreur détail TP" });
  }
};


