import multer from "multer";
import path from "path";

const generateRandomString = (length = 8) => {
  return Math.random().toString(36).substr(2, length); 
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/imgs/instruments"); 
  },
  filename: (req, file, cb) => {
    const randomString = generateRandomString(); 
    const fileExt = path.extname(file.originalname);
    const fileName = `${randomString}-${Date.now()}${fileExt}`;
    cb(null, fileName); 
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
});
