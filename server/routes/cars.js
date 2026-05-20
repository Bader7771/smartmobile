const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @route   GET /api/cars
 * @desc    Get all cars with optional filters
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { brand, model, maxPrice, minYear, status } = req.query;
    const filter = {};

    if (brand) filter.brand = new RegExp(brand, 'i');
    if (model) filter.model = new RegExp(model, 'i');
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };
    if (minYear) filter.year = { $gte: Number(minYear) };
    if (status) filter.status = status;

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/cars/:id
 * @desc    Get single car by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   POST /api/cars
 * @desc    Create a new car
 * @access  Admin
 */
router.post('/', protect, upload.array('images', 5), async (req, res) => {
  try {
    const { name, brand, model, year, mileage, price, description, shortDescription, quantity, status } = req.body;

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const car = await Car.create({
      name,
      brand,
      model,
      year: Number(year),
      mileage: Number(mileage) || 0,
      price: Number(price),
      description,
      shortDescription,
      images,
      quantity: Number(quantity) || 1,
      status: status || 'available'
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   PUT /api/cars/:id
 * @desc    Update a car
 * @access  Admin
 */
router.put('/:id', protect, upload.array('images', 5), async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const { name, brand, model, year, mileage, price, description, shortDescription, quantity, status, keepImages } = req.body;

    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.year = year ? Number(year) : car.year;
    car.mileage = mileage !== undefined ? Number(mileage) : car.mileage;
    car.price = price ? Number(price) : car.price;
    car.description = description !== undefined ? description : car.description;
    car.shortDescription = shortDescription !== undefined ? shortDescription : car.shortDescription;
    car.quantity = quantity !== undefined ? Number(quantity) : car.quantity;
    car.status = status || car.status;

    /* If new images uploaded, add them; if keepImages is false, replace */
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      if (keepImages === 'true') {
        car.images = [...car.images, ...newImages];
      } else {
        car.images = newImages;
      }
    }

    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   DELETE /api/cars/:id
 * @desc    Delete a car
 * @access  Admin
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   PATCH /api/cars/:id/status
 * @desc    Toggle car status (available / sold)
 * @access  Admin
 */
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.status = req.body.status || (car.status === 'available' ? 'sold' : 'available');
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
