
const Contact = require('../models/contact.model');

exports.createContactMessage = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const contactMessage = new Contact({ fullName, email, subject, message });
    await contactMessage.save();

    res.status(201).json({ message: 'Message envoyé avec succès.', contactMessage });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'envoi du message.', error: err.message });
  }
};

exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages.', error: err.message });
  }
};