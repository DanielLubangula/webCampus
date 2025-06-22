const express = require("express")
const router = express.Router()
const studentController = require("../controllers/student.controller")
const authMiddleware = require("../middlewares/auth.middleware")

// Connexion d'un étudiant
router.post("/login", studentController.login)

// Récupération des infos d'un étudiant
router.get("/me", authMiddleware, studentController.getMe)

// Modification du mot de passe d'un étudiant
router.put("/me/password", authMiddleware, studentController.updatePassword)

// Récupération de la liste des professeurs
router.get("/professors", authMiddleware, studentController.getProfessors)

// Suppression du compte d'un étudiant
// router.delete("/me", authMiddleware, studentController.deleteMe)

module.exports = router