import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    year: {
      type: Number,
      required: true
    },
    mileage: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    shortDescription: {
      type: String,
      default: ''
    },
    quantity: {
      type: Number,
      default: 1
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available'
    },
    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

const Car = mongoose.model('Car', carSchema);

export default Car;
