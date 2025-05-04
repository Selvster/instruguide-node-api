import Instrument from "../models/InstrumentModel.js";
import fs from "fs";

export const getAllInstruments = async (req, res, next) => {
  try {
    const instruments = await Instrument.find();
    res.status(200).json(instruments);
  } catch (error) {
    next(error);
  }
};

export const getInstrumentById = async (req, res, next) => {
  try {
    const instrument = await Instrument.findById(req.params.id);
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }
    res.status(200).json(instrument);
  } catch (error) {
    next(error);
  }
};

export const createInstrument = async (req, res, next) => {
  const { name, description, category, video } = req.body;
  const image = req.file ? req.file.filename : ""; // Get the image filename

  try {
    const newInstrument = new Instrument({
      name,
      image,
      description,
      category,
      video
    });

    await newInstrument.save();
    res.status(201).json(newInstrument);
  } catch (error) {
    next(error);
  }
};

// Update instrument function
export const updateInstrument = async (req, res, next) => {
  const { name, description, category, video } = req.body;
  let image = req.body.image;
  if (req.file) {
    image = req.file.filename;
  }

  try {
    const updatedInstrument = await Instrument.findByIdAndUpdate(
      req.params.id,
      { name, image, description, category, video },
      { new: true }
    );

    if (!updatedInstrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    res.status(200).json(updatedInstrument);
  } catch (error) {
    next(error);
  }
};

export const deleteInstrument = async (req, res, next) => {
  try {
    const deletedInstrument = await Instrument.findByIdAndDelete(req.params.id);
    if (!deletedInstrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }
    res.status(200).json({ message: "Instrument deleted successfully" });
  } catch (error) {
    next(error);
  }
};
