import path from 'path';
import fs from 'fs';
import multer from 'multer';

export const uploadDir = process.env.VERCEL
  ? path.join('/tmp', 'uploads')
  : path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }, (error) => cb(error, uploadDir));
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
    return;
  }

  cb(new Error('Only image uploads are allowed'));
};

export const uploadImages = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5
  }
}).array('images', 5);
