import express from 'express';
import { db } from "./util/database";


// initialize the express server
export const app = express();
const PORT = process.env.PORT ?? 3000;

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));


app.get('/healthcheck', (req, res) => {
    res.send('¡Okay!');
});

app.listen(PORT, () => {
    console.log(`Server Express is listening on port ${PORT}`);
});

