import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Instrument from './../models/InstrumentModel.js';

dotenv.config({ path: './config.env' });


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`./dev-data/instruments.json`, 'utf-8'));


// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Instrument.create(tours);

    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Instrument.deleteMany();

    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
