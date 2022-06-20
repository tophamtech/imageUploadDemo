const multer = require("multer");
const path = require("path");
const config = require("../config.json");
const convertFile = require("./imageConversion")

// Validate only image types can be uploaded
function validateType(file) {
  const mimeArr = file.mimetype.split("/");
  const mimeType = mimeArr[0];
  const imageType = mimeArr[1];
  if (mimeType != "image") {
    return false;
  } else return true;
}

// Specify the storage location and unique filename (date and rand number)
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    validateType(file);
    let customFileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, customFileName);
  }
});

// Configure multer to use storage options and for single upload
const upload = multer({ storage: storage }).single("imagefile");

// Entry function for controller
function uploadEntry(req, res, next) {
  console.log(req.file)
  upload(req, res, function(err) {
    console.log(req.file)

    let uploadedFilename = req.file.filename;
    if (!validateType(req.file)) {
      res.status(400).send("Invalid file type");
    } else {
      convertFile(uploadedFilename);
      let fileID = path.parse(uploadedFilename).name
      let baselocation = `${config.baseurl}/${config.downloadpath}/${path.parse(uploadedFilename).name}`
      let png_location = `${baselocation}.png`
      let jpg_location = `${baselocation}.jpg`
      let gif_location = `${baselocation}.gif`
      res.json({
          "upload":"ok",
          "fileID": fileID,
          "png_location": png_location,
          "gif_location": gif_location,
          "jpg_location": jpg_location
      })
    }
  });
}

module.exports = uploadEntry;
