# Goose Teeth
Multiplayer JS trivia.

To get started:
- Run `npm ci` to install all dependencies
- Create PSQL database `jsbattle_db`
- Run `npm run start:dev` to start a dev server and bundle all frontend code

App is served locally at `http://localhost:3000`

**`.env` file is not included in repo. If you need it, ask someone who has it**

## Data Models
Diagram of data models

![Diagram of data models relationship](/docs/data_models_relationship.png)

## API Endpoints
Currently available endpoints:
- [`/api/games`](#games)
- [`/api/questions`](#questions)
- [`/api/users`](#users)
- [`/api/players`](#players)

## Games
### `GET`
### Return all games
```
GET /api/games
```

#### Response
Status `200`
```json
[
    {
        "id": "f8c18e16-2a74-4634-ac35-37c77721ae84",
        "difficulty": "EASY",
        "name": "JS Trivia @ Kilarney & Rose",
        "numOfPlayers": 3,
        "status": "STARTING"
    },
    {
        "id": "90e8c3af-4a49-4e5e-882d-0cdbe048c026",
        "difficulty": "MEDIUM",
        "name": "Best Game Ever",
        "numOfPlayers": 2,
        "status": "IN_PROGRESS"
    }
]
```

### Return a game by `id`
```
GET /api/games/:id
```

### Return all players in a game
```
GET /api/games/:id/players
```

### Return winner of a game
Game has to be finished for there to be a winner (ie. `"status": "COMPLETED"`).
```
GET /api/games/:id/winner
```

### Return all questions in a specific game
```
GET /api/games/:id/questions
```

#### Response
Status `200`. **When a game is created, it is popuplated with 5 game questions that are randomly selected from the `Question` table. There should be no duplicates.**
```json
[
    {
        "id": "2eadf1ef-6524-4d82-aa7f-517b46debc7b",
        "completed": true,
        "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
        "questionId": "30a41bb8-a780-4d29-8852-bcfee555bee8",
        "question": {
            "id": "30a41bb8-a780-4d29-8852-bcfee555bee8",
            "difficulty": "MEDIUM",
            "title": "Find Maximum",
            "prompt": "Given an unsorted array of numbers, find a maximum",
            "examples": "",
            "functionName": "findMax",
            "params": "arr"
        }
    },
    {
        "id": "6e288cb5-21d9-4231-8bd1-2cee3e3935d1",
        "completed": false,
        "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
        "questionId": "15aaeef3-0779-4002-b2d2-754334360a24",
        "question": { }
    },
    {
        "id": "37d00a7b-93c5-4a65-9f4d-008476d4b516",
        "completed": false,
        "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
        "questionId": "33279dc6-3474-4a68-8082-7bd8c273b84c",
        "question": { }
    },
    {
        "id": "b9940687-3165-4628-8e14-ae2a5734dbd6",
        "completed": false,
        "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
        "questionId": "bb765293-a322-4dfc-8a6b-d2b14fa4cdd3",
        "question": { }
    },
    {
        "id": "15acdacf-0933-4d65-a171-16b358645440",
        "completed": false,
        "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
        "questionId": "a325d4d5-33ca-43fd-b26e-34b251696ac8",
        "question": { }
    }
]
```

### `POST`
### Start a new game.
```
POST /api/games
```

#### Payloads
This route takes 1 mandatory property (`name`) and 2 optional property (`playerId`, `difficulty`) as a payload. 

**If `playerId` is sent, that player will be made the new game's host.** `difficulty` is an ENUM and can accept one of the following: `EASY`, `MEDIUM`, `HARD`.

```json
{
    "name": "Flex 1907 Trivia",
    "playerId": "a6934cb9-aeaa-43a0-bf8c-8f03119a5ccb",
    "difficulty": "MEDIUM"
}
```

#### Response
Status `201`. A new game object is sent back. If there is a host, `numOfPlayers` will reflect this. `status` defaults to `STARTING`.
```json
{
    "id": "a70dbf49-61f2-4740-a8b7-5547f8bdd30a",
    "numOfPlayers": 1,
    "status": "STARTING",
    "name": "Flex 1907 Trivia"
}
```

### `PUT`
### Edit a game by `id`
```
PUT /api/games/:id
```

#### Payload
To edit a specific property, send it as a payload.
```json
{
    "name": "Prof's Trivia"
}
```

#### Response
Status `200`. The updated game object is sent back.
```json
{
    "id": "a70dbf49-61f2-4740-a8b7-5547f8bdd30a",
    "numOfPlayers": 1,
    "status": "STARTING",
    "name": "Prof's Trivia"
}
```

### Join a game by `id`
Only an `STARTING` game can be joined; each game can have up to 3 players.

**If a player tries to join a full game or a game that's already `IN_PROGRESS` or `COMPLETED`, an error will be sent back.**
```
PUT /api/games/:id/join
```

#### Payload
Takes 1 mandatory property (`playerId`--ie. player to join game) as payload.
```json
{
    "playerId": "4e714832-f37f-4655-a92f-353dacc123af"
}
```

#### Response
Status `200`. The updated game is sent back. `numOfPlayers` is updated automatically.
```json
{
    "id": "a70dbf49-61f2-4740-a8b7-5547f8bdd30a",
    "name": "Prof's Trivia",
    "numOfPlayers": 2,
    "status": "STARTING"
}
```

### Edit a game question's property
Used to mark question as `complete`. `id` is `gameQuestionId`. **When all game questions in a game have been answered, the game will be marked as complete (`"status": "COMPLETED"`).**

*This is here partly for convenience (same route as `api/games/`), but maybe should be moved?*
```
PUT /api/games/question/:id
```

#### Payload
The only accepted payload:
```json
{
    "completed": true
}
```

#### Response
The updated game question is sent back:
```json
{
    "id": "2eadf1ef-6524-4d82-aa7f-517b46debc7b",
    "completed": true,
    "gameId": "f42364f3-bfe9-4bfd-a5c1-6a1637bf1367",
    "questionId": "30a41bb8-a780-4d29-8852-bcfee555bee8"
}
```

### `DELETE`
### Delete a game by `id`
```
DELETE /api/games/:id
```

#### Response
Status `204` (No Content)


## Questions
### `GET`
### Return all available questions
```
GET /api/questions
```

#### Response
Status `200`.
```json
[
    {
        "id": "6f89602e-606d-49ef-b5f2-8e50ea60ac32",
        "title": "Find Maximum",
        "difficulty": "EASY",
        "prompt": "Given an unsorted array of numbers, find a maximum",
        "examples": "",
        "functionName": "findMax",
        "params": "arr"
    },
    {
        "id": "a325d4d5-33ca-43fd-b26e-34b251696ac8",
        "title": "Sort",
        "difficulty": "EASY",
        "prompt": "Sort an array in ascending order. You can assume all every element in the given array is a number.",
        "examples": "",
        "functionName": "sort",
        "params": "arr"
    },
    {
        "id": "583b67c9-d207-4b5c-a36c-43169eb8a5fe",
        "title": "Calculate Sum",
        "difficulty": "MEDIUM",
        "prompt": "Return the sum of all numbers in an array. Not all entries in an array will be a number. For example, this is a valid input: ['1', 2, 3.5, [3]]. In this case, the sum should be 5.5 (2 + 3.5).",
        "examples": "",
        "functionName": "sum",
        "params": "a, b"
    }
]
```

### Return a random question
```
GET /api/questions/random
```

### Return a random question
```
GET /api/questions/:id
```

### `POST`
### Answer a question by `id`
```
POST /api/questions/:id
```

#### Payload
This route expects a payload:
```json
{
    "code": "function findMax(arr){return Math.max(...arr)}"
}
```

#### Response
Status `201`. Currently, response is an array of the result of all test case results, both correct and incorrect.
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

## Users
### `GET`
### Return all users
```
GET /api/users
```

### Return a specific user by `id`
```
GET /api/users/:id
```

### `POST`
### Create a new user
```
POST /api/users
```

### `PUT`
### Edit properties of a user by `id`
```
PUT /api/users/:id
```

### `DELETE`
### Delete a user by `id`
```
DELETE /api/users/:id
```

## Players
### `GET`
### Return all players
```
GET /api/players
```

### Response
Status `200`.

*Currently there's no way of telling whether a player is in an active game or not. Not sure if necessary yet.**
```json
[
    {
        "id": "9c1ad7f5-96fe-4b4d-b649-07f4d99c2d55",
        "score": "20",
        "isHost": true,
        "gameId": "9d509ae2-cd88-4f84-93af-59f034ab16b2",
        "userId": "50d7d4d4-3fe3-4ef9-9fb1-98b3a4d9af90"
    },
    {
        "id": "f2dffbf5-5f00-425a-aae3-02e9a71884e3",
        "score": "100",
        "isHost": false,
        "gameId": "78206fde-8a70-4b2c-bdb1-45436f12a15d",
        "userId": "81b24852-7eab-4a48-81e5-a131d8df3f0f"
    },
    {
        "id": "72714fb5-1baf-4312-a068-076a2b747146",
        "score": "0",
        "isHost": false,
        "gameId": null,
        "userId": "4b1ba17e-8a7e-491e-a070-b8fc406a9a6c"
    }
]
```

### Return a specific player by `id`
```
GET /api/players/:id
```

### `POST`
### Create a new player
```
POST /api/players
```

#### Payload
This route takes 1 mandatory property. Hosting and joining games is taken care of by the [`/api/games`](#games) route
```json
{
    "userId": "dbbd5c42-0309-43d9-a063-421663ae9aab"
}
```

#### Response
Status `201`. The newly-created player is returned.
```json
{
    "id": "72714fb5-1baf-4312-a068-076a2b747146",
    "score": "0",
    "isHost": false,
    "userId": "dbbd5c42-0309-43d9-a063-421663ae9aab",
    "gameId": null
}
```

### `DELETE`
### Delete a player by `id`
```
DELETE /api/players/:id
```
