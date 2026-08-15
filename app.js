import express from 'express';
import { readFileSync, writeFile } from 'fs';

const app = express();
const port = 3000;
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You Can Post To this Endpoint...');
// });

const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    staus: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App is Running on ${port}...`);
});
