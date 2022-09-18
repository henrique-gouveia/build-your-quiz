# Build Your Quiz App

Build Your Quiz App is a full-stack system to demonstrate the use of technologies like VueJs, NodeJs, Express and PostgreSQL that allows you to apply quizzes with your customized questions.

The main feature are:

- `Questions`: It allows insert the questions to compose a questionnaire
- `Quizes`: It allows generate quizzes with random questions from the customized questions
- `Quiz`: It allows to reply a questionnaire and see your punctuation

## Quick Start

```shell
# Install dependencies for app & api
npm install && npm run install:api

# Run app & api with concurrently
npm run dev

# App run on http://localhost:8080 and Api on http://localhost:3000
```

## Stack

### Frontend

- [Vue](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [BootstrapVue](https://bootstrap-vue.org/)
- [Typescript](https://www.typescriptlang.org/)

### Backend

- [Node](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Knex.js](https://knexjs.org/)

## Configuration

Make sure to start your own `Postgres` database server, create the database (e.g. `byquiz`) and configure the following `environments variables` in the your `./src/api/.env` file.

```
DATABASE_HOST=""
DATABASE_PORT=""
DATABASE_NAME=""
DATABASE_USER=""
DATABASE_PASSWORD=""
```
