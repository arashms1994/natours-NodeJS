import { Tour } from '../models/tourModel.js';

export const aliasTopTours = (req, res, next) => {
  req.aliasQuery = {
    limit: '5',
    sort: '-ratingsAverage,price',
    fields: 'name,price,ratingsAverage,summary,difficulty',
  };

  next();
};

export const getAllTours = async (req, res) => {
  try {
    const queryParams = req.aliasQuery || req.query;

    const queryObj = { ...queryParams };

    const excludedFields = ['page', 'limit', 'sort', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // SORTING
    if (queryParams.sort) {
      const sortBy = queryParams.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // FIELD LIMITING
    if (queryParams.fields) {
      const fields = queryParams.fields.split(',').join(' ');

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION
    const page = +queryParams.page || 1;
    const limit = +queryParams.limit || 100;

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
