import express from 'express';
import { db } from "./util/database";
import { app } from "./app";
import swaggerDocs from "./config/swagger";

const PORT = process.env.PORT ?? '8080';

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

// Start express server
app.listen(PORT, () => {
    console.log(`Server Express is listening on port ${PORT}`);
    swaggerDocs(app, PORT);
});

