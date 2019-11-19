require('dotenv').config();

const app = require('./app');
const db = require('./db/db');

const PORT = process.env.PORT || 8000;

db.sync()
  .then(
    app.listen(PORT, () =>
      console.log(`\nApplication running on port ${PORT}\n`)
    )
  )
  .catch(e =>
    console.error(
      `Failed to load app on port ${PORT} with error: ${e}`
    )
  );
