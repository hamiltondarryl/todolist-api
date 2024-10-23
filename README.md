
## Description

Api de gestion des taches pour un projet d'ecole . 
Cet api permetttra au etudiants de pour voir gerer des taches des utilisateur 

## Installation

```bash
$ npm install
```

## Lancer l'application

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```
## Lancer les migrations

```bash
# Initialisation de la migration
$ npx prisma migrate dev --name init

# Regenerer les tables (apres modification des tables )
$ npx prisma generate  

# Mettre à plat la base de données
$ npx prisma migrate reset

# Prise en compte des seeder
$ npm run seed
```

## Lancer les tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
Nest is [MIT licensed](LICENSE).
