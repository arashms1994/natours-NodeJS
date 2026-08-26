import mongoose from 'mongoose';

export const tourSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'A tour must have name!'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration!'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have group size!'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty!'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price!'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have summary!'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have cover image!'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

export const Tour = mongoose.model('Tour', tourSchema);
