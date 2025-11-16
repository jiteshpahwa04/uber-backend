import express from 'express';
import { createBooking } from '../controllers/passenger.controller';
import authMiddleware from '../middlewares/auth.middleware';
const passengerRouter = express.Router();

passengerRouter.post('/ride', authMiddleware, createBooking);

export default passengerRouter;