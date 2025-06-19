const jwt = require('jsonwebtoken');

exports.verifyTeacherToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token manquant" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    if (decoded.role !== 'teacher') return res.status(403).json({ message: "Accès refusé" });

    req.teacher = decoded;
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Token invalide", err });
  }
};


