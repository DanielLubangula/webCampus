
# 📘 Documentation API — WebCampus

**Base URL** : `http://localhost:5000/api`

---

## 🔐 1. Authentification Administrateur

### 🔹 Connexion Admin
- **URL** : `/admin/login`
- **Méthode** : `POST`
- **Description** : Permet à l'administrateur de se connecter.
- **Body** :
```json
{
  "username": "admin_username",
  "password": "admin_password"
}
```
- **Réponse** :
```json
{
  "role": "admin",
  "token": "JWT_TOKEN"
}
```

---

## 👨‍🎓 2. Gestion des Étudiants (Admin)

### 🔹 Inscription d'un étudiant
- **URL** : `/admin/students`
- **Méthode** : `POST`
- **Body** :
```json
{
  "fullName": "Jean Dupont",
  "cardNumber": "ETU123",
  "email": "jean.dupont@example.com",
  "password": "password123"
}
```
- **Réponse** :
```json
{
  "message": "Étudiant inscrit avec succès",
  "newStudent": { ... }
}
```

### 🔹 Liste de tous les étudiants
- **URL** : `/admin/students`
- **Méthode** : `GET`

### 🔹 Détails d’un étudiant
- **URL** : `/admin/students/:id`
- **Méthode** : `GET`

### 🔹 Modifier un étudiant
- **URL** : `/admin/students/:id`
- **Méthode** : `PUT`
- **Body** :
```json
{
  "fullName": "Jean Dupont",
  "email": "jean.dupont@example.com"
}
```

### 🔹 Supprimer un étudiant
- **URL** : `/admin/students/:id`
- **Méthode** : `DELETE`

---

## 👨‍🏫 3. Gestion des Enseignants (Admin)

### 🔹 Inscription d’un enseignant
- **URL** : `/admin/teachers`
- **Méthode** : `POST`
- **Body** :
```json
{
  "fullName": "Prof. Mavungu",
  "email": "mavungu@upc.cd",
  "password": "password123",
  "courses": ["60d5f9b8c2a4f12d8c8e4b9e"]
}
```

### 🔹 Liste de tous les enseignants
- **URL** : `/admin/teachers`
- **Méthode** : `GET`

### 🔹 Modifier un enseignant
- **URL** : `/admin/teachers/:id`
- **Méthode** : `PUT`

### 🔹 Supprimer un enseignant
- **URL** : `/admin/teachers/:id`
- **Méthode** : `DELETE`

---

## 📝 4. Délibérations

### ➤ Récupérer les délibérations (étudiant connecté)

* **URL** : `/deliberation`

* **Méthode** : `GET`

* **Headers** :
  `Authorization: Bearer JWT_TOKEN`

* **Réponse** :

```json
[
  {
    "student": { "fullName": "Alice Mambu", "cardNumber": "ETU124" },
    "course": "Anglais",
    "grade": 11,
    "credit": 2,
    "status": "Validé"
  },
  {
    "student": { "fullName": "Jean Kongo", "cardNumber": "ETU123" },
    "course": "Mathématiques",
    "grade": 14,
    "credit": 4,
    "status": "Validé"
  }
]
```

---

## 📊 5. Tableau de Bord Enseignant

### ➤ Voir le tableau de bord

* **URL** : `/teacher/:id/dashboard`
* **Méthode** : `GET`

```json
{
  "profile": {
    "fullName": "Prof. Mavungu",
    "email": "mavungu@upc.cd",
    "totalCourses": 3
  },
  "courses": [
    { "title": "Réseaux Informatiques", "description": "Cours sur les réseaux", "credits": 5 },
    { "title": "Programmation Web", "description": "Cours sur le développement web", "credits": 4 }
  ],
  "reclamations": {
    "total": 5
  }
}
```

---

## 💼 6. Travaux Pratiques (TP)

### ➤ Publier un TP

* **URL** : `/tp`
* **Méthode** : `POST`

```json
{
  "title": "TP Réseaux",
  "description": "Travaux pratiques sur les réseaux informatiques.",
  "promotion": "L2 Informatique",
  "level": "L2"
}
```

* **Réponse** :

```json
{
  "message": "TP publié avec succès.",
  "tp": { ... }
}
```

---

## 🎓 7. Promotion

### ➤ Créer une promotion

* **URL** : `/promotion`
* **Méthode** : `POST`

```json
{
  "level": "L2",
  "name": "Informatique",
  "academicYear": "2024-2025"
}
```

* **Réponse** :

```json
{
  "message": "Promotion créée avec succès.",
  "promotion": { ... }
}
```

---

## 📩 8. Réclamation Étudiant

### ➤ Soumettre une réclamation

* **URL** : `/reclamation`
* **Méthode** : `POST`

```json
{
  "type": "Note",
  "subject": "Erreur dans ma note de math",
  "message": "La note affichée est incorrecte.",
  "teacher": "60d5f9b8c2a4f12d8c8e4b9e"
}
```

* **Réponse** :

```json
{
  "message": "Réclamation soumise avec succès.",
  "reclamation": { ... }
}
```

---

## 📰 9. Actualités

### ➤ Créer une actualité

* **URL** : `/actualite`
* **Méthode** : `POST`

```json
{
  "title": "Nouvelle actualité",
  "description": "Description de l'actualité",
  "image": "image_path"
}
```

* **Réponse** :

```json
{
  "message": "Actualité créée avec succès.",
  "actualite": { ... }
}
```

---

## ⏰ 10. Horaire

### ➤ Créer un horaire

* **URL** : `/schedule`
* **Méthode** : `POST`

```json
{
  "promotion": "60d5f9b8c2a4f12d8c8e4b9e",
  "level": "L2",
  "courses": [
    {
      "day": "Lundi",
      "time": "08:00 - 10:00",
      "title": "Programmation Web",
      "teacher": "60d5f9b8c2a4f12d8c8e4b9e",
      "room": "B201"
    }
  ]
}
```

* **Réponse** :

```json
{
  "message": "Horaire créé avec succès.",
  "schedule": { ... }
}
```

---

> 🧠 **Conseil** : Assurez-vous d’inclure le header `Authorization: Bearer <token>` pour toutes les routes sécurisées.

> 📌 **Astuce** : Ajoutez un fichier `.env` pour centraliser l’URL de base de l’API (`BASE_URL=http://localhost:5000/api`) côté frontend.

---

© 2025 WebCampus | Tous droits réservés.

```

... (suite dans prochaine cellule)
