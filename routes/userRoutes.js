import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByID,
  updateUser,
} from '../controllers/userController.js';

export const userRouter = Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUserByID).patch(updateUser).delete(deleteUser);
