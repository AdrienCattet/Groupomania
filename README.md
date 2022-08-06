# Projet 7 "Développeur web" d'OpenClassrooms - Créez un réseau social d’entreprise - Groupomania

## Objectif

Développer le front-end et le back-end d'un réseau social pour l'entreprise Groupomania.

## Installation

### Prérequis

- Node
- React
- MongoDB

### Code du réseau social

Cloner ou télécharger le repository

### Lancement du Backend

- Dans un terminal, se déplacer dans le dossier backend
- Exécuter `npm install`
- Créer un fichier `.env`
- Ajouter une variable d'environnement `jwtToken` dont la valeur est une chaîne de caractère complexe
- Exécuter `npm start`

### Base de données MongoDB

- Créer un compte MongoDB (https://mongodb.com/)
- Créer un utilisateur de la base donnée
- Dans le fichier `.env`, créer les variables `acc` et `pw` correspondant à l'utilisateur de la base de donnée


### Lancement du Frontend

- Dans un nouveau terminal, se déplacer dans le dossier frontend
- Exécuter `npm install`
- Exécuter `nodemon server`

### Adresse de l'application Groupomania

http://localhost:4000

## Spécifications fonctionnelles

### Page de connexion

Une page de connexion permettant à l’utilisateur de se connecter, ou bien
de créer un compte s’il n’en possède pas. Ici il faut demander le minimum
d’informations, la connexion doit se faire à partir de deux éléments : le mail
de l’employé, et un mot de passe. Rien de plus à prévoir pour le moment.

### Détails de la fonctionnalité de connexion

- Un utilisateur doit avoir la possibilité de se déconnecter.
- La session de l’utilisateur persiste pendant qu’il est connecté.
- Les données de connexion doivent être sécurisées.

### Page d’accueil

La page d’accueil doit lister les posts créés par les différents utilisateurs.
On voudra que les posts soient listés de façon antéchronologique (du plus
récent au plus ancien).

### Création d’un post

- Un utilisateur doit pouvoir créer un post.
- Un post doit pouvoir contenir du texte et une image.
- Un utilisateur doit aussi pouvoir modifier et supprimer ses posts.

### Système de like

Un utilisateur doit pouvoir liker un post, une seule fois pour chaque post.

### Rôle administrateur

Dans le but de pouvoir faire de la modération si nécessaire, il faudra créer
un utilisateur “administrateur” ; celui-ci aura les droits de modification /
suppression sur tous les posts du réseau social. Il faudra donc nous
communiquer les identifiants de cet administrateur.

## Identité graphique

Police d’écriture : Lato.
Couleurs:
 - Primaire : #FD2D01
 - Secondaire : #FFD7D7
 - Tertiaire : #4E5166