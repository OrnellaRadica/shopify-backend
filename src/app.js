import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'

import { PORT } from "./config.js";
const app = express();

app.get("/", (req, res) => {
  res.status(200).send('Ok')
});

app.get('*', (req, res)  => {
  return res.status(404).send('Not found')
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
