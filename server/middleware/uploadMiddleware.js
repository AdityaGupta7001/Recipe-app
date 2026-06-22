const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, "uploads/");

  },

  filename(req, file, cb) {

    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );

  }

});


function checkFileType(file, cb) {

  const fileTypes = /jpg|jpeg|png|webp/;

  const extName = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Images only! Please upload jpg, jpeg, png, or webp files."
      )
    );

  }

}


const upload = multer({

  storage,

  fileFilter(req, file, cb) {

    checkFileType(file, cb);

  }

});

module.exports = upload;