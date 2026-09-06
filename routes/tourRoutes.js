import { Router } from 'express';
import {
  aliasTopTours,
  createTour,
  deleteTour,
  getAllTours,
  getTourByID,
  updateTour,
} from '../controllers/tourController.js';

export const tourRouter = Router();

// tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours);

tourRouter.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);
