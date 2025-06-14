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
app.use('/api/stats', require('./routes/stats.routes'));
app.use('/api/actualite', require('./routes/actualite.routes'));
app.use('/api/annonce', require('./routes/annonce.routes'));
app.use('/api/teacher', require('./routes/teacher.routes'));
app.use('/api/tp', require('./routes/tp.routes'));
app.use('/api/schedule', require('./routes/schedule.routes'));
app.use('/api/promotion', require('./routes/promotion.routes'));
app.use('/api/reclamation', require('./routes/reclamation.routes'));
app.use('/api/deliberation', require('./routes/deliberation.routes'));
app.use('/api/deliberation/admin', require('./routes/deliberationAdmin.routes'));
// app.use('/api/journalier', require('./routes/journalier.route'));
// app.use('/api/entreprise', require('./routes/entreprise.route'));
// app.use('/api/candidature', require('./routes/candidature.route'));
// app.use('/api/missions', require('./routes/mission.routes'));
// app.use('/api/image', require('./routes/updateProfile.route'))
// app.use('/api/candidatures', require('./routes/candidature.routes'));

// Démarrage serveur
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => console.log(`Serveur backend démarré sur le port ${PORT}`));
