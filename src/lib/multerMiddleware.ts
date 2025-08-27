import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads"); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  
  // Filtrar archivos por tipo, si es necesario
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no permitido"), false);
    }
  };
  
  const upload = multer({ storage, fileFilter });
  export default upload;