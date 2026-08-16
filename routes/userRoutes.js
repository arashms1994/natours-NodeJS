import { Router } from 'express';

export const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);
