import { Tour } from '../models/tourModel.js';

export const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      staus: 'fail',
      message: 'Missing name or price!',
    });
  }
  next();
};

export const getAllTours = (req, res) => {
  // res.status(200).json({
  //   staus: 'success',
  //   requestAt: req.requestTime,
  //   results: tours.length,
  //   data: {
  //     tours,
  //   },
  // });
};

export const getTourByID = (req, res) => {
  res.status(200).json({
    staus: 'success',
    // data: {
    //   tour,
    // },
  });
};

export const deleteTour = (req, res) => {
  res.status(204).json({
    staus: 'success',
    data: null,
  });
};

export const updateTour = (req, res) => {
  res.status(200).json({
    staus: 'success',
    data: {
      tour: '<Updated Tour....>',
    },
  });
};

export const createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};
