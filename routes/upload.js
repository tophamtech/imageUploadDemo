const express = require('express');
const uploadController = require('../controllers/uploadController')

const router = express.Router();

// Route for uploading new image
// Image should be passed in form-data with key="imagefile"
router.post('/newimage', function (req, res, next) {
    uploadController.uploader(req,res,next)    
  })

module.exports = router;