const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à MongoDB
require('./config/db')();

// Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/student', require('./routes/student.routes'));
// app.use('/api/journalier', require('./routes/journalier.route'));
// app.use('/api/entreprise', require('./routes/entreprise.route'));
// app.use('/api/candidature', require('./routes/candidature.route'));
// app.use('/api/missions', require('./routes/mission.routes'));
// app.use('/api/image', require('./routes/updateProfile.route'))
// app.use('/api/candidatures', require('./routes/candidature.routes'));

// Démarrage serveur
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Serveur backend démarré sur le port ${PORT}`));
  