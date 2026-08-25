import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from 'mongoose';
import { app } from './app.js';

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

export const tourSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have name!'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price!'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: 'The Park Camper',
  price: 997,
});

testTour
  .save()
  .then((doc) => console.log(doc))
  .catch((err) => console.log('ERROR:', err));

app.listen(port, () => {
  console.log(`App is Running on ${port}...`);
});
