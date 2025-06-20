// controllers/adminController.js
require('dotenv').config();
const Student = require('../models/student');
const Teacher = require('../models/teacher');

const jwt = require('jsonwebtoken');
const Course = require('../models/course');

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: 'admin', isAdmin: true }, // Tu peux ajouter plus d'infos ici
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({
      role: "admin",
      token
    });
  }

  return res.status(401).json({ message: 'Identifiants incorrects' });
};


exports.registerStudent = async (req, res) => {
  try {
    const { fullName, cardNumber, email, password, promotion } = req.body;

    // Vérification des champs
    if (!fullName || !cardNumber || !email || !password || !promotion) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    }

    // Vérifier doublon email ou cardNumber
    const exists = await Student.findOne({ $or: [{ email }, { cardNumber }] });
    if (exists) {
      return res.status(409).json({ message: 'Email ou numéro de carte déjà utilisé' });
    }

    const newStudent = new Student({
      fullName,
      cardNumber,
      email,
      password,
      promotion

    });

    await newStudent.save();

    return res.status(201).json({ message: 'Étudiant inscrit avec succès', newStudent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Liste de tous les étudiants
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password').populate({
      path: 'promotion',
      populate: [
        { path: 'section' }, // Récupérer les informations complètes de la section
        { path: 'faculty' }  // Récupérer les informations complètes de la faculté
      ]
    });;
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un étudiant par ID
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.status(200).json({ message: 'Étudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Modifier les infos d’un étudiant
exports.updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updates = req.body;

    // Empêcher modification du mot de passe directement ici
    if (updates.password) delete updates.password;

    const updated = await Student.findByIdAndUpdate(studentId, updates, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).select('-password').populate({
      path: 'promotion',
      populate: [
        { path: 'section' }, // Récupérer les informations complètes de la section
        { path: 'faculty' }  // Récupérer les informations complètes de la faculté
      ]
    });
    if (!student) {
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ******************************************************
//*******************************************************
//*******************************************************
//*******************************************************
//*******************************************************
// Gestion des enseignants  

exports.registerTeacher = async (req, res) => {
  const { fullName, email, password, courses, phone } = req.body;

  try {
    const teacher = new Teacher({ fullName, email, password, courses, phone });
    await teacher.save();

      // Supprimer le mot de passe de l'objet avant de l'envoyer dans la réponse
      const teacherWithoutPassword = await Teacher.findById(teacher._id).select('-password');

    res.status(201).json({ message: "Professeur inscrit avec succès", teacherWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .select('-password')
      .populate({
        path: 'courses',
        populate: {
          path: 'promotion',
          populate: [
            { path: 'section' }, // Récupérer les informations complètes de la section
            { path: 'faculty' }  // Récupérer les informations complètes de la faculté
          ]
        }
      });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    await Teacher.findByIdAndDelete(teacherId);
    res.status(200).json({ message: 'Professeur supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const updates = req.body;

    const updated = await Teacher.findByIdAndUpdate(teacherId, updates, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId)
    .select('-password')
    .populate({
      path: 'courses',
      populate: {
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      }
    });;
    if (!teacher) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


exports.getTeacherCourses = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId).populate('courses');
    if (!teacher) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }
    res.status(200).json(teacher.courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.addCourseToTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { courseId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }

    if (teacher.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Le cours est déjà associé à ce professeur' });
    }

    teacher.courses.push(courseId);
    await teacher.save();

    res.status(200).json({ message: 'Cours ajouté avec succès', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.removeCourseFromTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { courseId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Professeur non trouvé' });
    }

    if (!teacher.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Le cours n\'est pas associé à ce professeur' });
    }

    teacher.courses.pull(courseId);
    await teacher.save();

    res.status(200).json({ message: 'Cours retiré avec succès', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};



// ******************************************************
//*******************************************************
//*******************************************************
//*******************************************************
//*******************************************************
// Gestion des cours  
// Créer un nouveau cours
exports.createCourse = async (req, res) => {
  try {
    const { title, description, credits, promotion } = req.body;

    if (!title || !credits || !promotion) {
      return res.status(400).json({ message: 'Le titre et le crédit sont obligatoires' });
    }

    // Vérifier si le titre existe déjà
    const titleExists = await Course.findOne({ title });
    if (titleExists) {
      if (promotion == titleExists._id.toString()){
        return res.status(409).json({ message: 'Ce titre de cours existe déjà dans cette promotion' });
      }
    }

    const course = new Course({ title, description, credits, promotion });
    await course.save();

    res.status(201).json({ message: 'Cours créé avec succès', course });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir la liste de tous les cours
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      });
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: 'Aucun cours trouvé' });
    }
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Obtenir un cours par ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
      .populate({
        path: 'promotion',
        populate: [
          { path: 'section' }, // Récupérer les informations complètes de la section
          { path: 'faculty' }  // Récupérer les informations complètes de la faculté
        ]
      });
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Mettre à jour un cours
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updates = req.body;

    const updated = await Course.findByIdAndUpdate(courseId, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Supprimer un cours
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ message: 'Cours supprimé' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

