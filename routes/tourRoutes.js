import { Router } from 'express';
import {
  checkBody,
  checkID,
  createTour,
  deleteTour,
  getAllTours,
  getTourByID,
  updateTour,
} from '../controllers/tourController.js';

export const tourRouter = Router();

tourRouter.param('id', checkID);

tourRouter.route('/').get(getAllTours).post(checkBody, createTour);

tourRouter.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);
