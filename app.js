import express from 'express';
import { readFileSync } from 'fs';

const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`App is Running on ${port}...`);
});
