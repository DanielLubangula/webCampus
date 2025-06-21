const Student = require('../models/student'); // à adapter selon ton modèle
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /login
exports.login = async (req, res) => {
    try {
        const { cardNumber, password } = req.body;
        // const student = await Student.findOne({ cardNumber }).populate({
        //     path : 'promotion',
        //     populate : [
        //         { path: 'section' }, // Récupérer les informations complètes de la section
        //         { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        //       ]
        // });
         const student = await Student.findOne({ cardNumber }).populate("promotion")
         console.log('student', student.promotion._id.toString())
        if (!student) return res.status(401).json({ message: "Numéro de carte ou mot de passe incorrect" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(401).json({ message: "Numéro de carte ou mot de passe incorrect" });

        const token = jwt.sign({ id: student._id , role : 'student', promotion : student.promotion}, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, student: { id: student._id, fullName: student.fullName, cardNumber: student.cardNumber, email: student.email, role : "student", idPromotion : student.promotion._id.toString() } });
    } catch (err) { 
        res.status(500).json({ message: "Erreur serveur" }); 
    }
};

// GET /me
exports.getMe = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select('-password').populate('promotion');
        if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
        console.log(err)
    }
};

// PUT /me
exports.updatePassword = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ message: "Le mot de passe est requis" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true, runValidators: true }
        ).select('-password');
        if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });
        res.json({ message: "Mot de passe mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// DELETE /me
// exports.deleteMe = async (req, res) => {
//     try {
//         const student = await Student.findByIdAndDelete(req.user.id);
//         if (!student) return res.status(404).json({ message: "Étudiant non trouvé" });
//         res.json({ message: "Compte supprimé avec succès" });
//     } catch (err) {
//         res.status(500).json({ message: "Erreur serveur" });
//     }
// };