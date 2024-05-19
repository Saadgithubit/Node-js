import express from 'express';
import cros from 'cors'; // Fixed typo here

import routes from './routes/index.mjs';
import db from './config/db.mjs';
import { PORT } from './config/environment.mjs';

const app = express();

const port = PORT || 3002;

db.connection.once('open', () => console.log("Connected to database"))
  .on("error", (err) => console.error("Error connecting to database:", err)); // Handle DB connection errors

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    
});

app.get("/message", (req, res) => {
  res.send({ message: "Hello from server!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.use(cros()); 

app.use(express.json());

app.use('/', routes);
