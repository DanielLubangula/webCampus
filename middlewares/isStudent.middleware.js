const jwt = require('jsonwebtoken');

exports.verifyStudentToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    if (decoded.role !== 'student') return res.status(403).json({ message: 'Accès refusé.' });

    req.student = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide.' });
  }
};