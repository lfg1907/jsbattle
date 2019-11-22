# Goose Teeth
Multiplayer JS trivia.

To get started:
- Run `npm ci` to install all dependencies
- Create PSQL database `jsbattle_db`
- Run `npm run start:dev` to start a dev server and bundle all frontend code

App is served locally at `http://localhost:3000`

**`.env` file is not included in repo. If you need it, ask someone who has it**

## API Endpoints
Currently available endpoints:

### Questions
**`GET` all available questions.**
```
GET /api/questions
```

**`GET` a random quesiton (doesn't work yet).**
```
GET /api/questions/random
```

**`GET` a question by ID.**
```
GET /api/questions/:id
```

**`POST` the answer to a question by ID.**
```
POST /api/questions/:id
```
- Expected payload: `{ code: 'someFunctionDefinition'}`
- Currently, response is an array of all test case results, both correct and incorrect.
```json
[
  {
    "result": 3,
    "consoles": []
  },
  {
    "wrong": "Expected 2, got 3",
    "consoles": []
  }
]
```

Any `console.log()` sent from the client will be returned as an array. For example, if the code run looks like this:
```javascript
for (let i = 0; i < 3, i++) {
  console.log("NUM", i)
}
```

The response would look like:
```json
[
  {
    "result": "",
    "consoles": ["NUM 0", "NUM 1", "NUM 2"]
  }
]
```
