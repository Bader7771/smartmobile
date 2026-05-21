import fs from 'fs/promises';
import path from 'path';
import express from 'express';
import Car from '../models/Car.js';
import { requireAuth } from '../middleware/auth.js';
import { uploadDir, uploadImages } from '../middleware/upload.js';

const router = express.Router();

const numberOrUndefined = (value) => {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const carPayload = (body) => ({
  name: body.name,
  brand: body.brand,
  model: body.model,
  year: numberOrUndefined(body.year),
  mileage: numberOrUndefined(body.mileage) ?? 0,
  price: numberOrUndefined(body.price),
  description: body.description || '',
  shortDescription: body.shortDescription || '',
  quantity: numberOrUndefined(body.quantity) ?? 1,
  status: body.status === 'sold' ? 'sold' : 'available'
});

const uploadedImagePaths = (files = []) => files.map((file) => `/uploads/${file.filename}`);

const removeUploadFiles = async (images = []) => {
  await Promise.all(
    images
      .filter((image) => image.startsWith('/uploads/'))
      .map((image) => fs.unlink(path.join(uploadDir, path.basename(image))).catch(() => undefined))
  );
};

router.get('/', async (req, res, next) => {
  try {
    const query = {};
    const { brand, model, maxPrice, minYear } = req.query;

    if (brand) query.brand = new RegExp(`^${escapeRegex(String(brand).trim())}$`, 'i');
    if (model) query.model = new RegExp(escapeRegex(String(model).trim()), 'i');
    if (maxPrice) query.price = { $lte: Number(maxPrice) };
    if (minYear) query.year = { $gte: Number(minYear) };

    const cars = await Car.find(query).sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    return res.json(car);
  } catch (error) {
    return next(error);
  }
});

router.post('/', requireAuth, uploadImages, async (req, res, next) => {
  try {
    const car = await Car.create({
      ...carPayload(req.body),
      images: uploadedImagePaths(req.files)
    });

    return res.status(201).json(car);
  } catch (error) {
    await removeUploadFiles(uploadedImagePaths(req.files));
    return next(error);
  }
});

router.put('/:id', requireAuth, uploadImages, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      await removeUploadFiles(uploadedImagePaths(req.files));
      return res.status(404).json({ message: 'Car not found' });
    }

    const newImages = uploadedImagePaths(req.files);
    const shouldKeepImages = req.body.keepImages === 'true' || newImages.length === 0;
    const previousImages = car.images;

    Object.assign(car, carPayload(req.body));
    if (!shouldKeepImages) {
      car.images = newImages;
    }

    await car.save();

    if (!shouldKeepImages) {
      await removeUploadFiles(previousImages);
    }

    return res.json(car);
  } catch (error) {
    await removeUploadFiles(uploadedImagePaths(req.files));
    return next(error);
  }
});

router.patch('/:id/status', requireAuth, async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    car.status = car.status === 'available' ? 'sold' : 'available';
    await car.save();

    return res.json(car);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await removeUploadFiles(car.images);
    return res.json({ message: 'Car deleted' });
  } catch (error) {
    return next(error);
  }
});

export default router;
