import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from 'mongoose';
import { app } from './app.js';

app.set('query parser', 'extended');

const port = process.env.PORT;
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(process.env.DATABASE_LOCAL)
  .connect(DB)
  .then(() => console.log('DB Connection successful'))
  .catch((err) => {
    console.log('DB Connection error:', err);
  });

app.listen(port, () => {
  console.log(`App is Running on ${port}...`);
});
