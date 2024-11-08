import multer from "multer"

const storage = multer.diskStorage({
    filename: function (req,file,cb) {
      cb(null, file.originalname)
    },
    
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    }
  });
  
const upload = multer({storage: storage});

export default upload;
