import { Router } from 'express';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourByID,
  updateTour,
} from '../controllers/tourController.js';

export const tourRouter = Router();

// tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);
