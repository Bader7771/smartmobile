const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  mileage: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  description: {
    type: String,
    default: ''
  },
  shortDescription: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  quantity: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
