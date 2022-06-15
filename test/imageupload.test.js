const chai = require("chai");
const fs = require("fs");
const chaiHttp = require("chai-http");
const app = require("../server");

var request = require("request");

const { expect } = chai;

chai.use(chaiHttp);

const imageStream = fs.createReadStream(`${__dirname}/../test/resources/platypus.gif`)

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
      options: { filename: "platypus.jpg", contentType: null }
    }
  }
};


describe("Test for upload route", () => {
  it("should return 200 and upload image", function(done) {
        request(options, function(error, response, body) {
        bodyResult = body;
        expect(bodyResult).to.include("upload\":\"ok\"") 
        done()
    })
 });
});
