import { readFileSync, writeFile } from 'fs';

const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

export const checkID = (req, res, next, val) => {
  console.log(`ID is ${val}`);

  if (+req.params.id > tours.length) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};

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
  res.status(200).json({
    staus: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

export const getTourByID = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((t) => t.id === id);

  res.status(200).json({
    staus: 'success',
    data: {
      tour,
    },
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
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};
