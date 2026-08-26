import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { Tour } from '../../models/tourModel.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// READ JSON FILE
const tours = JSON.parse(
  readFileSync(path.join(__dirname, 'tours-simple.json'), 'utf8'),
);

// ADD DATA TO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Add Successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// DELETE OLD DATA FROM DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Add Successfully');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
