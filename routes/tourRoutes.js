import { Router } from 'express';

export const tourRouter = Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);
