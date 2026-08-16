import express from 'express';
import { readFileSync, writeFile } from 'fs';
import morgan from 'morgan';

const app = express();
const port = 3000;

// MMIDDLEWARES ==================
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

// ROUTE FNS ====================
//=============== TOURS ====================
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

  if (!tour) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).json({
    staus: 'success',
    data: {
      tour,
    },
  });
};

export const deleteTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(204).json({
    staus: 'success',
    data: null,
  });
};

export const updateTour = (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      staus: 'fail',
      message: 'invalid ID',
    });
  }

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

//=============== USERS ====================
export const getAllUsers = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This Route is not yet defined!',
  });
};

export const getUserByID = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This Route is not yet defined!',
  });
};

export const deleteUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This Route is not yet defined!',
  });
};

export const updateUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This Route is not yet defined!',
  });
};

export const createUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This Route is not yet defined!',
  });
};

// ROUTES ======================
//=============== TOURS ====================
app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

//=============== USERS ====================
app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUserByID)
  .patch(updateUser)
  .delete(deleteUser);

// START SERVER ================
app.listen(port, () => {
  console.log(`App is Running on ${port}...`);
});
