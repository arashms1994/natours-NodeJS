import { Tour } from '../models/tourModel.js';

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
