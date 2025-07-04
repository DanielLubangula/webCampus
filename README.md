
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
  "password": "password123",
  "promotion": "id_de_la_promotion",// donc ici il faut créer d'abord les promotion, tu trouvera la route pour promotion dans ##7
  "level" : "L2"
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
  "courses": ["60d5f9b8c2a4f12d8c8e4b9e"] // il faut créer d'abord les cours et qui se trouve dans ##13
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

## 👨‍🏫 Connexion Professeur

### ➤ Connexion

* **URL** : `/teacher/login`
* **Méthode** : `POST`
* **Description** : Permet à un professeur de se connecter.
* **Body** :
```json
  {
    "email": "professeur@example.com",
    "password": "password123"
  }
```
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


## 🛠️ 5. Gestion des Délibérations (Admin)

### ➤ Ajouter une délibération

* **URL** : `/deliberation/admin`
* **Méthode** : `POST`
* **Description** : Permet à un administrateur d'ajouter une nouvelle délibération.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "student": "id_etudiant",
  "course": "id_cours",
  "grade": 12,
  "credit": 3
}
```
* **Réponse** :
```json
{
  "message": "Délibération ajoutée avec succès.",
  "deliberation": { ... }
}
```

---

### ➤ Modifier une délibération

* **URL** : `/deliberation/admin/:id`
* **Méthode** : `PUT`
* **Description** : Permet à un administrateur de modifier une délibération existante.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "course": "id_cours",
  "grade": 15,
  "credit": 4
}
```
* **Réponse** :
```json
{
  "message": "Délibération modifiée avec succès.",
  "deliberation": { ... }
}
```

---

### ➤ Supprimer une délibération

* **URL** : `/deliberation/admin/:id`
* **Méthode** : `DELETE`
* **Description** : Permet à un administrateur de supprimer une délibération via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "message": "Délibération supprimée avec succès."
}
```

---

### ➤ Récupérer toutes les délibérations

* **URL** : `/deliberation/admin`
* **Méthode** : `GET`
* **Description** : Permet à un administrateur de récupérer la liste de toutes les délibérations.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
[
  {
    "_id": "id_deliberation",
    "student": { "fullName": "Jean Dupont", "cardNumber": "ETU123" },
    "course": "Mathématiques",
    "grade": 14,
    "credit": 4,
    "status": "Validé"
  },
  ...
]
```

---

### ➤ Récupérer une délibération par ID

* **URL** : `/deliberation/admin/:id`
* **Méthode** : `GET`
* **Description** : Permet à un administrateur de récupérer une délibération spécifique via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "_id": "id_deliberation",
  "student": { "fullName": "Jean Dupont", "cardNumber": "ETU123" },
  "course": "Mathématiques",
  "grade": 14,
  "credit": 4,
  "status": "Validé"
}
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
  "name": "L2",
  "section": "section_id",
  "faculty": "faculty_id"
}
```

* **Réponse** :

```json
{
  "message": "Promotion créée avec succès.",
  "promotion": {
    "_id": "promotion_id",
    "name": "L2",
    "section": "Informatique",
    "faculty": "faculty_id"
  }
}
```

---

### ➤ Récupérer toutes les promotions

* **URL** : `/promotion`
* **Méthode** : `GET`
* **Description** : Permet de récupérer la liste de toutes les promotions.
* **Réponse** :

```json
[
  {
    "_id": "promotion_id_1",
    "nom": "L2",
    "section": {
      "_id": "section_id_1",
      "nom": "Informatique",
      "description": "Section dédiée aux sciences informatiques."
    },
    "faculty": {
      "_id": "faculty_id_1",
      "nom": "Sciences Informatiques"
    }
  },
  {
    "_id": "promotion_id_2",
    "nom": "L3",
    "section": {
      "_id": "section_id_2",
      "nom": "Économie",
      "description": "Section dédiée aux sciences économiques."
    },
    "faculty": {
      "_id": "faculty_id_2",
      "nom": "Sciences Économiques"
    }
  }
]
```

---

### ➤ Récupérer une promotion par ID

* **URL** : `/promotion/:id`
* **Méthode** : `GET`
* **Description** : Permet de récupérer une promotion spécifique via son ID.
* **Réponse** :

```json
{
  "_id": "promotion_id",
  "name": "L2",
  "section": "Informatique",
  "faculty": "faculty_id"
}
```

---

### ➤ Modifier une promotion

* **URL** : `/promotion/:id`
* **Méthode** : `PUT`
* **Description** : Permet de modifier une promotion existante.
* **Body** :

```json
{
  "name": "L2 Avancée",
  "section": "Informatique",
  "faculty": "faculty_id"
}
```

* **Réponse** :

```json
{
  "message": "Promotion modifiée avec succès.",
  "promotion": {
    "_id": "promotion_id",
    "name": "L2 Avancée",
    "section": "Informatique",
    "faculty": "faculty_id"
  }
}
```

---

### ➤ Supprimer une promotion

* **URL** : `/promotion/:id`
* **Méthode** : `DELETE`
* **Description** : Permet de supprimer une promotion via son ID.
* **Réponse** :

```json
{
  "message": "Promotion supprimée avec succès."
}
```


### ➤ Créer une promotion

* **URL** : `/promotion`
* **Méthode** : `POST`

```json
{
  "name": "Informatique"
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

### ➤ Récupérer toutes les promotions

* **URL** : `/promotion`
* **Méthode** : `GET`
* **Description** : Permet de récupérer la liste de toutes les promotions.
* **Réponse** :

```json
[
  {
    "_id": "60d5f9b8c2a4f12d8c8e4b9e",
    "name": "Informatique"
  },
  {
    "_id": "60d5f9b8c2a4f12d8c8e4b9f",
    "name": "Mathématiques"
  }
]
```

---

### ➤ Récupérer une promotion par ID

* **URL** : `/promotion/:id`
* **Méthode** : `GET`
* **Description** : Permet de récupérer une promotion spécifique via son ID.
* **Réponse** :

```json
{
  "_id": "60d5f9b8c2a4f12d8c8e4b9e",
  "name": "Informatique"
}
```

---

### ➤ Modifier une promotion

* **URL** : `/promotion/:id`
* **Méthode** : `PUT`
* **Description** : Permet de modifier une promotion existante.
* **Body** :

```json
{
  "name": "Informatique Avancée"
}
```

* **Réponse** :

```json
{
  "message": "Promotion modifiée avec succès.",
  "promotion": {
    "_id": "60d5f9b8c2a4f12d8c8e4b9e",
    "name": "Informatique Avancée"
  }
}
```

---

### ➤ Supprimer une promotion

* **URL** : `/promotion/:id`
* **Méthode** : `DELETE`
* **Description** : Permet de supprimer une promotion via son ID.
* **Réponse** :

```json
{
  "message": "Promotion supprimée avec succès."
}
```


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


## ⏰ 10. Gestion des Horaires

### ➤ Créer un horaire

* **URL** : `/schedule`
* **Méthode** : `POST`
* **Description** : Permet à un administrateur de créer un nouvel horaire.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "jour": "Lundi",
  "heure_debut": "08:00",
  "heure_fin": "10:00",
  "salle": "B201",
  "cours": "course_id"
}
```
* **Réponse** :
```json
{
  "message": "Horaire créé avec succès.",
  "schedule": {
    "_id": "schedule_id",
    "jour": "Lundi",
    "heure_debut": "08:00",
    "heure_fin": "10:00",
    "salle": "B201",
    "cours": "course_id"
  }
}
```

---

### ➤ Récupérer tous les horaires

* **URL** : `/schedule`
* **Méthode** : `GET`
* **Description** : Permet à un administrateur de récupérer la liste de tous les horaires.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
[
  {
    "_id": "schedule_id",
    "jour": "Lundi",
    "heure_debut": "08:00",
    "heure_fin": "10:00",
    "salle": "B201",
    "cours": {
      "_id": "course_id",
      "title": "Programmation Web",
      "description": "Cours sur le développement web",
      "credits": 4
    }
  },
  ...
]
```


### ➤ Récupérer les horaires en fonction de l'étudiant connecté

* **URL** : `/schedule/student`
* **Méthode** : `GET`
* **Description** : Permet à un étudiant connecté de récupérer les horaires correspondant à sa promotion et sa faculté.
* **Headers** :  
  `Authorization: Bearer JWT_TOKEN`
* **Réponse** :
```json
[
  {
    "_id": "schedule_id",
    "jour": "Lundi",
    "heure_debut": "08:00",
    "heure_fin": "10:00",
    "salle": "B201",
    "cours": {
      "_id": "course_id",
      "title": "Programmation Web",
      "description": "Cours sur le développement web",
      "credits": 4,
      "promotion": {
        "_id": "promotion_id",
        "name": "L2",
        "faculty": {
          "_id": "faculty_id",
          "nom": "Faculté des Sciences"
        }
      }
    }
  },
  ...
]
```


---

### ➤ Récupérer un horaire par ID

* **URL** : `/schedule/:id`
* **Méthode** : `GET`
* **Description** : Permet à un administrateur de récupérer un horaire spécifique via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "_id": "schedule_id",
  "jour": "Lundi",
  "heure_debut": "08:00",
  "heure_fin": "10:00",
  "salle": "B201",
  "cours": {
    "_id": "course_id",
    "title": "Programmation Web",
    "description": "Cours sur le développement web",
    "credits": 4
  }
}
```

---

### ➤ Modifier un horaire

* **URL** : `/schedule/:id`
* **Méthode** : `PUT`
* **Description** : Permet à un administrateur de modifier un horaire existant.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "jour": "Mardi",
  "heure_debut": "10:00",
  "heure_fin": "12:00",
  "salle": "B202",
  "cours": "course_id"
}
```
* **Réponse** :
```json
{
  "message": "Horaire mis à jour avec succès.",
  "schedule": {
    "_id": "schedule_id",
    "jour": "Mardi",
    "heure_debut": "10:00",
    "heure_fin": "12:00",
    "salle": "B202",
    "cours": "course_id"
  }
}
```

---

### ➤ Supprimer un horaire

* **URL** : `/schedule/:id`
* **Méthode** : `DELETE`
* **Description** : Permet à un administrateur de supprimer un horaire via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "message": "Horaire supprimé avec succès."
}
```

---

### 11. Annonces

#### Créer une annonce

* **URL** : `/annonce`
* **Méthode** : `POST`
* **Description** : Permet de créer une nouvelle annonce.
* **Body** :

```json
{
  "title": "Nouvelle annonce",
  "description": "Contenu de l'annonce.",
  "publishedAt": "2025-06-14T08:00:00.000Z" // Facultatif, sinon la date actuelle est utilisée
}
```

* **Réponse** :

```json
{
  "message": "Annonce créée avec succès.",
  "annonce": {
    "_id": "...",
    "title": "Nouvelle annonce",
    "description": "Contenu de l'annonce.",
    "publishedAt": "..."
  }
}
```

#### Récupérer les annonces (avec pagination)

* **URL** : `/annonce`
* **Méthode** : `GET`
* **Description** : Récupère les annonces par ordre de publication, avec pagination.
* **Query Params** :

  * `page` (optionnel, par défaut 1)
  * `limit` (optionnel, par défaut 5)
* **Réponse** :

```json
{
  "annonces": [
    { "_id": "...", "title": "...", "description": "...", "publishedAt": "..." },
    ...
  ],
  "totalPages": 3,
  "currentPage": 1
}
```

#### Supprimer une annonce

* **URL** : `/annonce/:id`
* **Méthode** : `DELETE`
* **Description** : Supprime une annonce spécifique via son ID.
* **Réponse** :

```json
{
  "message": "Annonce supprimée avec succès."
}
```

---

## 📊 12. Statistiques des Annonces

### ➤ Récupérer les statistiques des annonces

* **URL** : `/annonce/stats`
* **Méthode** : `GET`
* **Description** :  Récupère les statistiques globales de l'application, incluant le nombre total d'étudiants, d'enseignants, de TP publiés, et de promotions actives
* **Headers** :  
  ` Aucun header spécifique requis.`

* **Réponse** :

```json
{
  "studentsConnected": 100, // Nombre total d'étudiants inscrits
  "teachers": 10,          // Nombre total d'enseignants inscrits
  "tpsPublished": 50,      // Nombre total de TP publiés
  "activePromotions": 5    // Nombre total de promotions actives
}
```

--- 


## 📚 13. Gestion des Cours

### ➤ Créer un nouveau cours

* **URL** : `/course`
* **Méthode** : `POST`
* **Description** : Permet de créer un nouveau cours.
* **Body** :

```json
{
  "_id": "...",
  "title": "Programmation Web",
  "description": "Cours sur le développement web",
  "credits": 4,
  "promotion": "promotion_id"
}
```

* **Réponse** :

```json
{
  "message": "Cours créé avec succès",
  "course": {
    "_id": "...",
  "title": "Programmation Web",
  "description": "Cours sur le développement web",
  "credits": 4,
  "promotion": "promotion_id"
}
}
```

---

### ➤ Obtenir la liste de tous les cours

* **URL** : `/course`
* **Méthode** : `GET`
* **Description** : Récupère la liste de tous les cours disponibles.
* **Réponse** :

```json
[
  {
  "_id": "...",
  "title": "Programmation Web",
  "description": "Cours sur le développement web",
  "credits": 4,
  "promotion": "promotion_id"
},
  {
    "_id": "...",
    "title": "Réseaux Informatiques",
    "description": "Cours sur les réseaux.",
    "credit": 5,
    "promotion": "promotion_id"
  }
]
```

---

### ➤ Obtenir un cours par ID

* **URL** : `/course/:id`
* **Méthode** : `GET`
* **Description** : Permet de récupérer un cours spécifique via son ID.
* **Réponse** :

```json
{
  "_id": "...",
  "title": "Programmation Web",
  "description": "Introduction au développement web.",
  "credit": 4,
  "promotion": "promotion_id"
}
```

---

### ➤ Mettre à jour un cours

* **URL** : `/course/:id`
* **Méthode** : `PUT`
* **Description** : Permet de modifier un cours existant.
* **Body** :

```json
{
  "title": "Programmation Web Avancée",
  "description": "Approfondissement du développement web.",
  "credit": 5,
  "promotion": "promotion_id"
}
```

* **Réponse** :

```json
{
  "message": "Cours mis à jour avec succès",
  "course": {
    "_id": "...",
    "title": "Programmation Web Avancée",
    "description": "Approfondissement du développement web.",
    "credit": 5,
    "promotion": "promotion_id"
  }
}
```

---

### ➤ Supprimer un cours

* **URL** : `/course/:id`
* **Méthode** : `DELETE`
* **Description** : Permet de supprimer un cours via son ID.
* **Réponse** :

```json
{
  "message": "Cours supprimé"
}
```
---

## 👨‍🎓 14. Gestion des Étudiants (Étudiant)

### 🔹 Connexion Étudiant
- **URL** : `/student/login`
- **Méthode** : `POST`
- **Description** : Permet à un étudiant de se connecter.
- **Body** :
```json
{
  "cardNumber": "ETU123",
  "password": "password123"
}
```
- **Réponse** :
```json
{
  "token": "JWT_TOKEN",
  "student": {
    "id": "student_id",
    "fullName": "Jean Dupont",
    "cardNumber": "ETU123",
    "email": "jean.dupont@example.com"
  }
}
```

---

### 🔹 Récupérer les informations de l'étudiant
- **URL** : `/student/me`
- **Méthode** : `GET`
- **Description** : Permet de récupérer les informations de l'étudiant connecté.
- **Headers** :
  `Authorization: Bearer JWT_TOKEN`
- **Réponse** :
```json
{
  "id": "student_id",
  "fullName": "Jean Dupont",
  "cardNumber": "ETU123",
  "email": "jean.dupont@example.com"
}
```

---

### 🔹 Modifier le mot de passe
- **URL** : `/student/me/password`
- **Méthode** : `PUT`
- **Description** : Permet à un étudiant de modifier son mot de passe.
- **Headers** :
  `Authorization: Bearer JWT_TOKEN`
- **Body** :
```json
{
  "password": "new_password123"
}
```
- **Réponse** :
```json
{
  "message": "Mot de passe mis à jour avec succès"
}
```

--- 

## 📬 15. Système de Contact

### ➤ Envoyer un message de contact

* **URL** : `/contact`
* **Méthode** : `POST`
* **Description** : Permet à un utilisateur d'envoyer un message à l'administration.
* **Body** :
  ````json
  {
    "fullName": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "subject": "Demande d'information",
    "message": "Bonjour, je voudrais avoir plus d'informations sur les inscriptions."
  }

  ````

  ### ➤ Récupérer tous les messages de contact

  * **URL** : `/contact`
  * **Méthode** : `GET`
  * **Description** : Permet à un administrateur de récupérer tous les messages de contact.
  * **Headers** :
    `Authorization: Bearer ADMIN_JWT_TOKEN`
  * **Réponse** :
  ```json
  [
    {
      "id": "message_id",
      "fullName": "Jean Dupont",
      "email": "jean.dupont@example.com",
      "subject": "Demande d'information",
      "message": "Bonjour, je voudrais avoir plus d'informations sur les inscriptions.",
      "createdAt": "2025-06-14T08:00:00.000Z"
    },
    ...
  ]
  ```


---
## 🎓 16. Gestion des Facultés

### ➤ Créer une faculté

* **URL** : `/faculty`
* **Méthode** : `POST`
* **Description** : Permet de créer une nouvelle faculté.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "nom": "Faculté des Sciences"
}
```
* **Réponse** :
```json
{
  "message": "Faculté créée avec succès.",
  "faculty": {
    "_id": "faculty_id",
    "nom": "Faculté des Sciences"
  }
}
```

---

### ➤ Récupérer toutes les facultés

* **URL** : `/faculty`
* **Méthode** : `GET`
* **Description** : Permet de récupérer la liste de toutes les facultés.
* **Réponse** :
```json
[
  {
    "_id": "faculty_id",
    "nom": "Faculté des Sciences"
  },
  {
    "_id": "faculty_id_2",
    "nom": "Faculté des Lettres"
  }
]
```

---

### ➤ Récupérer une faculté par ID

* **URL** : `/faculty/:id`
* **Méthode** : `GET`
* **Description** : Permet de récupérer une faculté spécifique via son ID.
* **Réponse** :
```json
{
  "_id": "faculty_id",
  "nom": "Faculté des Sciences"
}
```

---

### ➤ Modifier une faculté

* **URL** : `/faculty/:id`
* **Méthode** : `PUT`
* **Description** : Permet de modifier une faculté existante.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "nom": "Faculté des Sciences Avancées"
}
```
* **Réponse** :
```json
{
  "message": "Faculté mise à jour avec succès.",
  "faculty": {
    "_id": "faculty_id",
    "nom": "Faculté des Sciences Avancées"
  }
}
```

---

### ➤ Supprimer une faculté

* **URL** : `/faculty/:id`
* **Méthode** : `DELETE`
* **Description** : Permet de supprimer une faculté via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "message": "Faculté supprimée avec succès."
}
```

---

## 📂 17. Gestion des Sections

### ➤ Créer une section

* **URL** : `/section`
* **Méthode** : `POST`
* **Description** : Permet à un administrateur de créer une nouvelle section.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "nom": "Section Informatique",
  "description": "Section dédiée aux études informatiques."
}
```
* **Réponse** :
```json
{
  "message": "Section créée avec succès.",
  "section": {
    "_id": "section_id",
    "nom": "Section Informatique",
    "description": "Section dédiée aux études informatiques."
  }
}
```

---

### ➤ Récupérer toutes les sections

* **URL** : `/section`
* **Méthode** : `GET`
* **Description** : Permet de récupérer la liste de toutes les sections.
* **Réponse** :
```json
[
  {
    "_id": "section_id",
    "nom": "Section Informatique",
    "description": "Section dédiée aux études informatiques."
  },
  {
    "_id": "section_id_2",
    "nom": "Section Mathématiques",
    "description": "Section dédiée aux études mathématiques."
  }
]
```

---

### ➤ Récupérer une section par ID

* **URL** : `/section/:id`
* **Méthode** : `GET`
* **Description** : Permet de récupérer une section spécifique via son ID.
* **Réponse** :
```json
{
  "_id": "section_id",
  "nom": "Section Informatique",
  "description": "Section dédiée aux études informatiques."
}
```

---

### ➤ Modifier une section

* **URL** : `/section/:id`
* **Méthode** : `PUT`
* **Description** : Permet à un administrateur de modifier une section existante.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Body** :
```json
{
  "nom": "Section Informatique Avancée",
  "description": "Section dédiée aux études informatiques avancées."
}
```
* **Réponse** :
```json
{
  "message": "Section mise à jour avec succès.",
  "section": {
    "_id": "section_id",
    "nom": "Section Informatique Avancée",
    "description": "Section dédiée aux études informatiques avancées."
  }
}
```

---

### ➤ Supprimer une section

* **URL** : `/section/:id`
* **Méthode** : `DELETE`
* **Description** : Permet à un administrateur de supprimer une section via son ID.
* **Headers** :  
  `Authorization: Bearer ADMIN_JWT_TOKEN`
* **Réponse** :
```json
{
  "message": "Section supprimée avec succès."
}
```


© 2025 WebCampus | Tous droits réservés.

```

