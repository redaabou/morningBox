import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = 'uploads/';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: fileFilter
});

export const uploadMiddleware = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (req.file) {
            req.body.image = `/uploads/${req.file.filename}`;
          }
        next();
    });
};