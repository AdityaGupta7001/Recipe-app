const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    if (req.file) {

      res.status(200).json({
        message: "Image uploaded successfully",
        image: `/uploads/${req.file.filename}`
      });

    } else {

      res.status(400).json({
        message: "No image uploaded"
      });

    }

  }
);

module.exports = router;