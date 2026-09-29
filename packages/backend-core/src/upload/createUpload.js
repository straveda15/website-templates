const multer = require("multer");
const path = require("path");

// Local-disk storage under <uploadsDir>/. Generated client backends serve
// this directory statically at /uploads (see createApp.js).
function createUpload(uploadsDir) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (/^image\//.test(file.mimetype)) return cb(null, true);
      cb(new Error("Only image uploads are allowed"));
    },
  });
}

module.exports = { createUpload };
