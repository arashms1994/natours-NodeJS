import { Tour } from '../models/tourModel.js';

export const getAllTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));

    const tours = await query;
    // {duration:'easy', difficulty:{$gte:5}}

    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // RESPONSE
    res.status(200).json({
      staus: 'success',
      requestAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      staus: 'fail',
      message: err,
    });
  }
};

export const getTourByID = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      staus: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      staus: 'fail',
      message: err,
    });
  }
};

export const deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      staus: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      staus: 'fail',
      message: err,
    });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      staus: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      staus: 'fail',
      message: err,
    });
  }
};

export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      staus: 'fail',
      message: 'Invalid Data Sent!',
    });
  }
};
