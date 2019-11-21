# Goose Teeth
Multiplayer JS trivia.

To get started:
- Run `npm i` to install all dependencies
- Create PSQL database `jsbattle_db`
- Run `npm run start:dev` to start a dev server and bundle all frontend code

App is served locally at `http://localhost:3000`

**`.env` file is not included in repo. If you need it, ask someone who has it**

## API Endpoints
Currently available endpoints:

### Questions
`GET` all available questions.
```
GET /api/questions
```

`GET` a random quesiton (doesn't work yet).
```
GET /api/questions/random
```

`GET` a question by ID.
```
GET /api/questions/:id
```

`POST` the answer to a question by ID. Client needs to send `{ code }`.
```
POST /api/questions/:id
```

