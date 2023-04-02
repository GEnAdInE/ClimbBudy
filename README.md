# ClimbBudy

Projet Libre 5A

Cette application a été développée dans le cadre du projet libre de la 5ème année de Polytech. Elle a pour but de permettre aux grimpeurs d'avoir plus d'info sur les voies qu'ils grimpent.
Avec cette application, les grimpeurs peuvent consulter les voies et les salles, ajouter des commentaires et des photos. Scanner des QRCode afin d'avoir des infos sur une voie precise ou naviguer sur une liste pour trouver une salle.

Elle a été développée en Ionic 6 et VueJS. Elle utilise le service de Firebase pour la base de données et l'authentification.
Nous avous utilisé le framework Ionic 6 car il permet de créer des applications mobiles multiplateformes (Android, IOS, Web) en utilisant le framework VueJS. Mais aussi car Ionic possede un systeme de composants qui permet de créer des applications plus rapidement.

Un utilisateur peut etre soit invité , sois grimpeur ou ouvreur.
Un invité peut consulter les voies et les salles.
Un grimpeur peut consulter les voies et les salles, ajouter des commentaires et des photos.
Un ouvreur peut consulter les voies et les salles, ajouter des commentaires et des photos, ajouter des voies et des salles.

 La base de données est composée de 2 collections :
- Les salles
- Les utilisateurs

Pour les salles, nous avons choisi de stocker les informations suivantes :
- Nom de la salle
- Adresse de la salle
- Description de la salle
- Liste des voies de la salle

Pour chaque voie, nous avons choisi de stocker les informations suivantes :
- Nom de la voie
- Description de la voie
- Niveau de la voie
- Tips de la voie
- Liste des commentaires de la voie
- Ce qui est interdit et ce qui est autorisé sur la voie
- Qui a ouvert la voie
- Secteur de la voie
- Details du ressenti de la voie (plus technique ou plus physique etc)

Pour les utilisateurs, nous avons choisi de stocker les informations suivantes :
- Nom de l'utilisateur
- Role de l'utilisateur


Dans le futur nous aimerions ajouter des fonctionnalités comme :
- Ajouter des photos de la salle
- Ajouter un filtre de recherche pour les salles et les voies
- Une meilleure gestion des utilisateurs (ajouter des roles, ajouter des utilisateurs, supprimer des utilisateurs)

