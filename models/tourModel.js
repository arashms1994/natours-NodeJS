import mongoose from 'mongoose';

export const tourSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A tour must have name!'],
  },
  price: {
    type: Number,
    required: [true, 'A tour must have price!'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

export const Tour = mongoose.model('Tour', tourSchema);
