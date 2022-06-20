const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");
const app = require("../server");
const chaiImage = require("chai-image").chaiImage;



var request = require("request");

const { expect } = chai;

chai.use(chaiImage);

const imageStream = fs.createReadStream(
  `${__dirname}/../test/resources/platypus.gif`
);

let imageLocation = "";

var options = {
  method: "POST",
  url: "http://localhost:3001/upload/newimage",
  headers: {
    "postman-token": "46f199b6-443b-d2a3-69c4-0853b287107b",
    "cache-control": "no-cache",
    "content-type":
      "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
  },
  formData: {
    imagefile: {
      value: imageStream,
      options: { filename: "platypus.gif", contentType: null }
    }
  }
};

describe("Test for upload route", () => {
  it("should return 200 and upload image", function(done) {
    request(options, function(error, response, body) {
      bodyResult = body;
      gifImageLocation = "http://" + JSON.parse(body).gif_location;
      jpgImageLocation = "http://" + JSON.parse(body).jpg_location;
      pngImageLocation = "http://" + JSON.parse(body).png_location;
      expect(bodyResult).to.include('upload":"ok"');
      done();
    });
  });
});

describe("Test for download route", () => {
  it("should return test gif image", function(done) {
    request(gifImageLocation, function(error, response, body) {
      let testImage = fs
        .readFileSync(`${__dirname}/../test/resources/platypus.gif`)
        .toString();
      let returnImage = response.body.toString();
      expect(testImage).to.contain(returnImage);
      done();
    });
  });
  it("should return test jpg image", function(done) {
    request(jpgImageLocation, function(error, response, body) {
      let testImage = fs
        .readFileSync(`${__dirname}/../test/resources/platypus.jpg`)
        .toString();
      let returnImage = response.body.toString();
      expect(testImage).to.contain(returnImage);
      done();
    });
  });

  it("should return test png image", function(done) {
    request(pngImageLocation, function(error, response, body) {
      let testImage = fs
        .readFileSync(`${__dirname}/../test/resources/platypus.png`)
        .toString();
      let returnImage = response.body.toString();
      expect(testImage).to.contain(returnImage);
      done();
    });
    });
});
